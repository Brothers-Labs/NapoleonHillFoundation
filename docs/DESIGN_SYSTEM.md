# Design system

Fonte única: [`src/styles/_tokens.scss`](../src/styles/_tokens.scss). Componentes consomem
apenas custom properties. Valores literais de cor, espaço ou tipografia não entram em
componentes.

## Cores

| Token | Valor | Uso |
| --- | --- | --- |
| `--nh-midnight` | `#071426` | Fundos escuros de seção |
| `--nh-deep-navy` | `#0C1B30` | Superfícies, cards, drawer |
| `--nh-black` | `#05080C` | Fundo base, hero, footer |
| `--nh-ivory` | `#F5F1E8` | Texto em fundo escuro; seções claras |
| `--nh-warm-white` | `#FAF9F6` | Seções claras alternadas |
| `--nh-gold` | `#C6A15B` | Destaques, ícones, CTAs primários, divisores |
| `--nh-antique-gold` | `#A87C32` | Gradientes de destaque |
| `--nh-gold-ink` | `#7D5B21` | Dourado para texto pequeno em fundo claro (contraste AA) |
| `--nh-charcoal` | `#161616` | Texto em fundo claro |

O dourado é usado com moderação: legado, detalhes, separadores, ícones e CTAs importantes.

### Temas de seção

As classes `.nh-theme-dark`, `.nh-theme-midnight`, `.nh-theme-navy`, `.nh-theme-light` e
`.nh-theme-paper` redefinem os tokens semânticos (`--nh-text`, `--nh-text-muted`, `--nh-line`,
`--nh-accent`). Os componentes não sabem em que fundo estão e funcionam em qualquer um.

## Tipografia

| Papel | Família | Observação |
| --- | --- | --- |
| Títulos | Cormorant Garamond (300–500, itálico) | Editorial, serifada |
| Interface e texto | Inter (400–600) | Alta legibilidade |

Fontes do Google Fonts com `display=swap`; o Angular inlina o CSS das fontes no build.

| Token | Escala |
| --- | --- |
| `--nh-display-hero` | `clamp(3.125rem, 1.9rem + 5.6vw, 6.875rem)`: ~51 px no mobile, até 110 px |
| `--nh-heading-1` / `-2` / `-3` | Títulos de página e de seção |
| `--nh-text-*` | `2xs` a `xl` para interface |

## Espaço e layout

- Escala `--nh-space-1` a `--nh-space-10` (0,25 a 8 rem).
- `--nh-section-space`: espaçamento vertical fluido entre seções.
- Containers: `--nh-container` (76 rem), `--wide` (90 rem), `--narrow` (46 rem).
- `--nh-gutter`: margem lateral fluida.
- Breakpoints mobile first (`_breakpoints.scss`): `sm` 480, `md` 768, `lg` 1024, `xl` 1280,
  `xxl` 1600.

## Componentes globais

| Classe | Uso |
| --- | --- |
| `.nh-button` | Botão base com preenchimento em *sweep* no hover |
| `--primary`, `--outline`, `--light`, `--block` | Variantes |
| `.nh-link` | Link de texto com sublinhado animado |
| `.nh-eyebrow`, `.nh-rule` | Sobretítulo e divisor dourado curto |
| `.nh-field__control` (`--boxed`) | Campos de formulário |
| `.nh-grain` | Textura de grão de filme (SVG inline) |

## Motion

| Token | Valor |
| --- | --- |
| `--nh-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--nh-duration-fast` / `base` / `slow` / `reveal` | 180 / 320 / 700 / 1100 ms |

## Acessibilidade

- Contraste AA em todos os pares de texto; dourado pequeno em fundo claro usa `--nh-gold-ink`.
- `:focus-visible` dourado em todos os elementos interativos.
- Alvos de toque de no mínimo 44 px (`--nh-touch-target`).
- Skip link, landmarks, um H1 por página e hierarquia de títulos consistente.
