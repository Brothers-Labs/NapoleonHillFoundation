# Assets

## Situação atual

As imagens restantes da Fundação e da linha do tempo em `public/images/` foram **recortadas dos mocks visuais** entregues em
07/10/2026 (`Legado de Napoleon Hill no Brasil.png`, 1536×1024, e
`Napoleon Hill Foundation Brasil_ Legado e Sucesso.png`, 864×1821). Elas reproduzem o visual
aprovado, mas:

- **têm baixa resolução** (de 182 a 285 px de largura) e aparecem pixeladas em telas grandes;
- **podem ter sido geradas por IA** para o mock e devem ser trocadas por fotografias autorizadas.

As fotografias de **Napoleon Hill** e de **Jamil Albuquerque** foram enviadas em 08/10/2026 e já
substituíram os recortes do mock. Os direitos de uso das fotografias históricas de Napoleon Hill
devem ser confirmados com a fundação antes da publicação.

## Inventário

| Arquivo | Recorte (px) | Uso | Substituto recomendado |
| --- | --- | --- | --- |
| `hero/napoleon-hill-young-portrait.jpg` | 688×540 · **fornecida** | Hero da home (tratada em P&B) | Mesma foto em ≥ 1600 px, se houver |
| `napoleon-hill/napoleon-hill-portrait-bw.webp` | 480×601 · **fornecida** | "Quem foi Napoleon Hill?" | Mesma foto em ≥ 1200 px, se houver |
| `napoleon-hill/napoleon-hill-portrait-color.jpg` | 447×447 · **fornecida** | Hero de `/fundacao` e JSON-LD `Person` | Mesma foto em ≥ 800 px, se houver |
| `napoleon-hill/napoleon-hill-colorized.jpg` | 489×627 · **fornecida** (colorizada) | Hero de `/napoleon-hill` | Mesma foto em ≥ 1200 px, se houver |
| `napoleon-hill/think-and-grow-rich.jpg` | 285×162 | Linha do tempo | Capa licenciada, ≥ 900 px |
| `foundation/foundation-building.jpg` | 245×207 | Seção Fundação e fundo de "Quem foi" | Fotografia autorizada da sede, ≥ 1800 px |
| `foundation/law-of-success-compass.jpg` | 182×110 | "Nossa missão" | ≥ 1400 px |
| `jamil/jamil-albuquerque.webp` | 887×620 · **oficial** | Seção Jamil (home) e hero de `/jamil-albuquerque` | Versão ≥ 1600 px, se houver |
| `jamil/jamil-albuquerque-square.jpg` | 400×400 · **oficial** | JSON-LD `Person` (imagem quadrada) | Versão ≥ 800 px, se houver |
| `jamil/jamil-albuquerque-mastermind-stage.jpg` | 525×348 · **oficial** (recorte da área nítida) | Seção Napoleon Hill no Brasil | Arquivo original sem a moldura desfocada |

O favicon (`public/favicon.svg`) é neutro e provisório. O logo oficial ainda não foi entregue;
enquanto isso, o nome institucional é composto em tipografia (`BrandMark`), sem redesenhar a
marca.

## Como substituir uma imagem

1. Exporte em **AVIF** ou **WebP** (com JPEG de fallback, se preferir), em duas larguras.
2. Coloque os arquivos em `public/images/<pasta>/`.
3. Atualize o `ImageAsset` correspondente em `src/app/data/*.data.ts`, com `src`, `width` e
   `height` reais, `alt` descritivo e, opcionalmente, `srcset` e `credit`.
4. Rode `npm run build` e confira a página.

```ts
image: {
  src: '/images/hero/napoleon-hill-hero-2400.avif',
  srcset: '/images/hero/napoleon-hill-hero-1200.avif 1200w, /images/hero/napoleon-hill-hero-2400.avif 2400w',
  alt: '',            // decorativa no hero; descreva nas demais
  width: 2400,
  height: 1100,
  credit: '© The Napoleon Hill Foundation',
}
```

## Regras

- Usar só imagens oficiais, licenciadas ou autorizadas. Nunca imagens aleatórias da internet.
- Não distorcer, recolorir nem redesenhar o logo oficial.
- Não disponibilizar PDFs de obras protegidas.
