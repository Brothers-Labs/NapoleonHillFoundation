import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';

export type ParticleFieldVariant = 'dust' | 'embers';

export interface ParticleFieldOptions {
  readonly variant: ParticleFieldVariant;
  readonly isCompact: boolean;
}

interface VariantSettings {
  readonly count: number;
  readonly compactCount: number;
  readonly size: number;
  readonly rise: number;
  readonly opacity: number;
}

const VARIANTS: Readonly<Record<ParticleFieldVariant, VariantSettings>> = {
  // Archive dust drifting through a projector beam.
  dust: { count: 1400, compactCount: 520, size: 3.2, rise: 0.05, opacity: 0.85 },
  // Slow rising embers for the closing call to action.
  embers: { count: 900, compactCount: 380, size: 3.6, rise: 0.22, opacity: 0.9 },
};

const FIELD = { width: 22, height: 12, nearZ: 4, farZ: -9 } as const;
const MAX_PIXEL_RATIO = 1.5;
const MAX_FRAME_DELTA_SECONDS = 0.05;
const STATIC_FRAME_TIME = 12;

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uRise;
  uniform float uHeight;
  attribute vec4 aSeed;
  attribute float aScale;
  varying float vAlpha;
  varying float vTint;

  const float TAU = 6.2831853;

  void main() {
    vec3 p = position;
    float t = uTime * (0.35 + aSeed.x * 0.65);
    p.x += sin(t * 0.21 + aSeed.y * TAU) * 0.45 + sin(t * 0.07 + aSeed.z * TAU) * 0.9;
    p.z += cos(t * 0.17 + aSeed.x * TAU) * 0.35;
    float drift = uTime * uRise * (0.4 + aSeed.w) + sin(t * 0.13 + aSeed.w * TAU) * 0.4;
    p.y = mod(p.y + drift + uHeight * 0.5, uHeight) - uHeight * 0.5;

    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uSize * aScale * uPixelRatio * (10.0 / -viewPosition.z);

    float twinkle = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed.y) + aSeed.z * TAU);
    float edgeFade = smoothstep(uHeight * 0.5, uHeight * 0.32, abs(p.y));
    float depthFade = smoothstep(-9.0, 2.0, p.z);
    vAlpha = twinkle * edgeFade * (0.25 + 0.75 * depthFade);
    vTint = aSeed.y;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uGold;
  uniform vec3 uIvory;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vTint;

  void main() {
    float distanceToCenter = length(gl_PointCoord - 0.5);
    float softness = pow(smoothstep(0.5, 0.0, distanceToCenter), 1.8);
    vec3 color = mix(uGold, uIvory, step(0.78, vTint) * 0.7);
    float alpha = softness * vAlpha * uOpacity;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`;

function createGeometry(count: number): BufferGeometry {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 4);
  const scales = new Float32Array(count);

  for (let index = 0; index < count; index++) {
    positions[index * 3] = (Math.random() - 0.5) * FIELD.width;
    positions[index * 3 + 1] = (Math.random() - 0.5) * FIELD.height;
    positions[index * 3 + 2] = FIELD.farZ + Math.random() * (FIELD.nearZ - FIELD.farZ);
    for (let channel = 0; channel < 4; channel++) {
      seeds[index * 4 + channel] = Math.random();
    }
    // Cubic bias: mostly fine grains, with a few large out-of-focus motes.
    scales[index] = 0.5 + Math.random() ** 3 * 2.5;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 4));
  geometry.setAttribute('aScale', new BufferAttribute(scales, 1));
  return geometry;
}

/**
 * Self-contained WebGL particle scene. Owns its render loop and GPU resources; callers drive it
 * through `start`, `stop`, `resize`, `setPointer` and must call `dispose`.
 */
export class ParticleFieldRenderer {
  private readonly renderer: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(50, 1, 0.1, 40);
  private readonly geometry: BufferGeometry;
  private readonly material: ShaderMaterial;

  private frameId: number | null = null;
  private lastFrameTime = 0;
  private elapsed = 0;
  private readonly pointerTarget = { x: 0, y: 0 };

  /** Throws when WebGL is unavailable; callers keep the CSS backdrop in that case. */
  constructor(canvas: HTMLCanvasElement, options: ParticleFieldOptions) {
    const settings = VARIANTS[options.variant];
    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    this.renderer.setClearColor(0x000000, 0);
    const pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);
    this.renderer.setPixelRatio(pixelRatio);

    this.geometry = createGeometry(options.isCompact ? settings.compactCount : settings.count);
    this.material = new ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uSize: { value: settings.size },
        uRise: { value: settings.rise },
        uHeight: { value: FIELD.height },
        uOpacity: { value: settings.opacity },
        uGold: { value: new Color('#c6a15b') },
        uIvory: { value: new Color('#f5f1e8') },
      },
    });

    this.scene.add(new Points(this.geometry, this.material));
    this.camera.position.set(0, 0, 10);
  }

  resize(width: number, height: number): void {
    if (width === 0 || height === 0) {
      return;
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    if (this.frameId === null) {
      this.render();
    }
  }

  /** Pointer position normalized to [-1, 1] on both axes. */
  setPointer(x: number, y: number): void {
    this.pointerTarget.x = x;
    this.pointerTarget.y = y;
  }

  start(): void {
    if (this.frameId !== null) {
      return;
    }
    this.lastFrameTime = performance.now();
    this.frameId = requestAnimationFrame(this.tick);
  }

  stop(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  /** Renders a single, representative frame for reduced-motion users. */
  renderStaticFrame(): void {
    this.elapsed = STATIC_FRAME_TIME;
    this.render();
  }

  dispose(): void {
    this.stop();
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }

  private readonly tick = (now: number): void => {
    const delta = Math.min((now - this.lastFrameTime) / 1000, MAX_FRAME_DELTA_SECONDS);
    this.lastFrameTime = now;
    this.elapsed += delta;

    // Ease the camera toward the pointer for a gentle depth parallax.
    this.camera.position.x += (this.pointerTarget.x * 0.6 - this.camera.position.x) * 0.04;
    this.camera.position.y += (this.pointerTarget.y * 0.35 - this.camera.position.y) * 0.04;
    this.camera.lookAt(0, 0, 0);

    this.render();
    this.frameId = requestAnimationFrame(this.tick);
  };

  private render(): void {
    this.material.uniforms['uTime'].value = this.elapsed;
    this.renderer.render(this.scene, this.camera);
  }
}
