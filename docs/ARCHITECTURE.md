# Arquitetura

## Visão geral

```text
           ┌───────────────────────── build ─────────────────────────┐
 data/*.ts │  scripts/generate-seo-files.mts → robots.txt, sitemap.xml │
 config/*  │  ng build → prerender de 14 rotas → HTML estático + JS     │
           └───────────────────────────────────────────────────────────┘
                                   │
                           CDN / hospedagem estática
                                   │
  navegador: HTML completo (SEO) → hidratação → motion (GSAP) → partículas (Three.js, em idle)
```

## Decisões principais

| Decisão | Alternativa descartada | Motivo |
| --- | --- | --- |
| Angular 21.2 | Angular 22 | O Angular 22 exige Node ≥ 24.15; o ambiente usa 24.14. Ver [upgrade](#upgrade-para-angular-22) |
| `outputMode: static` + prerender | SSR com servidor Express | Conteúdo não depende de requisição; CDN pura é mais rápida, barata e segura |
| Zoneless + Signals + OnPush | Zone.js | Padrão do Angular 21; menos trabalho de change detection |
| Conteúdo em `data/` e `core/config/` | Texto nos templates | Edição sem tocar em componentes; migração futura para CMS |
| `<dialog>` nativo | Biblioteca de modal | Focus trap, Esc, fundo inerte e restauração de foco nativos |
| Entrada do hero em CSS | Entrada em GSAP | O headline (LCP) pinta sem esperar JavaScript |
| GSAP e Three.js via `import()` | Import estático | Ficam fora do bundle inicial (≈ 111 kB transferidos) |
| Ícones SVG próprios | Lucide | Zero dependência para ~40 ícones de linha |

## Camadas

| Pasta | Responsabilidade | Pode depender de |
| --- | --- | --- |
| `core/config` | Valores de configuração (site, contato, integrações) | `core/models` (tipos) |
| `core/models` | Tipos de conteúdo | nada |
| `core/seo` | Metadados por rota, JSON-LD, `SeoService` | config, data |
| `core/analytics` | Consentimento, analytics, loaders de terceiros | config, utils |
| `core/animations` | `MotionService` (GSAP, reveal, reduced motion) | utils |
| `core/services` | Formulários, storage, seção ativa | config, models |
| `data` | Conteúdo editorial | `core/models` (tipos) |
| `shared` | Componentes e diretivas sem regra de negócio | core |
| `layout` | Moldura do app: header, footer, menus, banners | core, shared |
| `features` | Seções e páginas por domínio | core, data, shared |

> `site.config.ts` e `page-metadata.ts` aceitam apenas `import type`: o gerador de sitemap os
> importa diretamente via *type stripping* do Node.

## Renderização e SSR

- `app.routes.server.ts` prerenderiza todas as rotas conhecidas (`RenderMode.Prerender`).
- `SeoService` roda no prerender e grava título, description, robots, OpenGraph, Twitter Card,
  canonical e JSON-LD no HTML estático.
- APIs de navegador (`window`, `localStorage`, `matchMedia`, `IntersectionObserver`) são
  acessadas só via `injectBrowserWindow()`, que retorna `null` no servidor.
- O banner de cookies renderiza só **depois** da hidratação, porque o HTML prerenderizado é o
  mesmo para todos os visitantes.

## Motion

| Recurso | Implementação |
| --- | --- |
| Entrada do hero | Keyframes CSS escalonados (headline em *mask reveal*) |
| Reveal de seções | `nhReveal`, com um único `IntersectionObserver` compartilhado e transições CSS |
| Parallax | `nhParallax`: GSAP ScrollTrigger com `scrub`, só em desktop com ponteiro fino |
| Linha do tempo | Preenchimento do trilho atrelado ao scroll |
| Saída do hero / CTA final | Opacidade e escala atreladas ao scroll |
| Progresso de leitura | CSS `animation-timeline: scroll()`, sem JavaScript |

Garantias:

- **`prefers-reduced-motion`:** o script inline de `index.html` só adiciona `html.nh-motion`
  quando há permissão. Sem essa classe nenhum estado oculto se aplica, e `MotionService.animate`
  não executa.
- **Cleanup:** `MotionService.animate(scope, destroyRef, setup)` cria um `gsap.context` e
  reverte tweens, ScrollTriggers e `matchMedia` no destroy, inclusive se o componente for
  destruído antes de o GSAP terminar de carregar.
- **Fallback de boot:** se a aplicação falhar ao iniciar, `main.ts` remove `nh-motion` e todo o
  conteúdo fica visível.
- Só `transform` e `opacity` são animados.

## Three.js: campo de partículas

`shared/components/particle-field` em duas peças:

- `particle-field.ts` (componente): espera `requestIdleCallback` e então importa o renderer.
  Pausa fora da viewport (`IntersectionObserver`) e com a aba oculta, ajusta-se via
  `ResizeObserver`, aplica parallax de ponteiro só em ponteiro fino e libera a GPU no destroy.
- `particle-field.renderer.ts`: cena com `Points` e `ShaderMaterial` próprio (sprites suaves,
  cintilação, *drift*, fade por profundidade, *blending* aditivo). DPR limitado a 1,5. Densidade
  reduzida em telas pequenas e ponteiro touch.

Variantes: `dust` (poeira de arquivo sob um feixe de luz, no hero) e `embers` (brasas
ascendentes, no CTA "O legado continua."). Sem WebGL, ou com *save-data*, o fundo CSS
permanece. Com reduced motion, renderiza um único quadro estático.

## Upgrade para Angular 22

1. Atualizar o Node para ≥ 24.15.
2. `npx ng update @angular/core@22 @angular/cli@22 @angular/ssr@22 angular-eslint@22`.
3. Rodar `npm run lint`, `npm test` e `npm run build`.
