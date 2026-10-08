# The Napoleon Hill Foundation Brasil

Experiência digital institucional que apresenta, em português, o legado, a filosofia e os
princípios de Napoleon Hill, além da representação oficial no Brasil.

> **O sucesso começa na mente.** · **O legado continua.**

Site estático, prerenderizado rota a rota, construído em Angular com foco em autoridade
editorial, performance, acessibilidade e SEO.

---

## Sumário

- [Stack](#stack)
- [Começando](#começando)
- [Scripts](#scripts)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Rotas](#rotas)
- [Conteúdo editável](#conteúdo-editável)
- [Qualidade](#qualidade)
- [Deploy](#deploy)
- [Antes de publicar](#antes-de-publicar)
- [Documentação](#documentação)

---

## Stack

| Camada | Escolha | Motivo |
| --- | --- | --- |
| Framework | Angular 21.2 (standalone, zoneless, Signals) | LTS compatível com o Node 24.14 do ambiente; ver [upgrade](docs/ARCHITECTURE.md#upgrade-para-angular-22) |
| Renderização | `@angular/ssr` com `outputMode: static` | Todas as rotas são prerenderizadas: HTML completo, metadados e JSON-LD sem servidor Node |
| Estilo | SCSS + design tokens em CSS custom properties | Tema único, mobile first, sem framework de UI |
| Motion | GSAP 3 + ScrollTrigger (carregados sob demanda) | Scroll-linked com cleanup garantido |
| 3D | Three.js (chunk lazy, em idle) | Partículas douradas no hero e no CTA final |
| Testes | Vitest via `@angular/build:unit-test` | Builder oficial do Angular 21 |
| Lint | angular-eslint (flat config) | Regras de TypeScript, templates e acessibilidade |

Nenhuma biblioteca de ícones, carrossel ou formulário foi adicionada: ícones são SVG próprios
e modais usam o `<dialog>` nativo.

## Começando

Requisitos: **Node.js ≥ 24** e **npm**.

```bash
npm install
npm start            # http://localhost:4200
```

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm start` | Servidor de desenvolvimento |
| `npm run build` | Gera `robots.txt`/`sitemap.xml` e faz o build de produção com prerender de todas as rotas |
| `npm test` | Executa os testes unitários uma vez (Vitest) |
| `npm run test:watch` | Testes em modo watch |
| `npm run lint` | ESLint em TypeScript e templates |
| `npm run format` / `format:check` | Prettier |
| `npm run preview` | Serve `dist/napoleon-hill-foundation/browser` em `http://localhost:4300` |
| `npm run seo:generate` | Regenera apenas `robots.txt` e `sitemap.xml` |

## Estrutura do projeto

```text
src/
├── app/
│   ├── core/            # Configuração, modelos e serviços transversais
│   │   ├── analytics/   # AnalyticsService, ConsentService (LGPD), loaders de terceiros
│   │   ├── animations/  # MotionService (GSAP sob demanda, reveal, cleanup)
│   │   ├── config/      # site, navegação, contato, redes sociais, integrações
│   │   ├── models/      # Tipos de conteúdo (Program, Book, VideoItem…)
│   │   ├── seo/         # Metadados por rota, SeoService, JSON-LD
│   │   ├── services/    # Formulários, storage, seção ativa
│   │   └── utils/       # WhatsApp, embeds de vídeo, acesso seguro ao window
│   ├── data/            # Todo o conteúdo editorial (pronto para migrar para CMS)
│   ├── features/        # Seções e páginas por domínio (home, napoleon-hill, foundation…)
│   ├── layout/          # Header, menu mobile, tab bar, footer, cookies, WhatsApp
│   └── shared/          # Componentes, diretivas e formulários reutilizáveis
├── styles/              # Tokens, base, tipografia, layout, botões, formulários, motion
└── index.html
public/images/           # Imagens do site (ver docs/ASSETS.md)
scripts/                 # Gerador de robots.txt e sitemap.xml
docs/                    # Documentação do projeto
```

A arquitetura completa está em [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Home: a narrativa institucional completa |
| `/napoleon-hill` | Biografia, linha do tempo e obras |
| `/fundacao` | Missão, pilares e história da fundação |
| `/filosofia` | Os 17 princípios do sucesso |
| `/brasil` | Representação oficial no Brasil |
| `/jamil-albuquerque` | Jamil Albuquerque: trajetória, números e frase |
| `/programas` | Formatos de programas |
| `/galeria`, `/videos`, `/materiais` | Conteúdos (estrutura pronta, aguardando acervo) |
| `/contato` | Canais, mapa e formulário |
| `/privacidade`, `/termos` | Documentos legais (LGPD) |
| `/404` e `**` | Página não encontrada (`noindex`) |

## Conteúdo editável

**Nenhum texto institucional fica espalhado pelos templates.** Para alterar conteúdo, edite:

| Arquivo | Conteúdo |
| --- | --- |
| `src/app/core/config/site.config.ts` | Nome, domínio, logo, imagem de compartilhamento, site internacional |
| `src/app/core/config/contact.config.ts` | Telefones, WhatsApp, e-mail, endereço, mapa |
| `src/app/core/config/social.config.ts` | Perfis oficiais nas redes sociais |
| `src/app/core/config/integrations.config.ts` | IDs de GA4, GTM, Meta Pixel, Clarity e endpoints dos formulários |
| `src/app/core/config/navigation.config.ts` | Menus, footer e tab bar |
| `src/app/data/*.data.ts` | Textos, linha do tempo, princípios, programas, livros, galeria, vídeos, materiais |
| `src/app/core/seo/page-metadata.ts` | Título e descrição de cada rota |

Itens ainda não confirmados estão marcados com `TODO: validar com Jamil Albuquerque antes da
publicação`. A lista consolidada está em [docs/CONTENT.md](docs/CONTENT.md).

## Qualidade

| Gate | Comando | Resultado atual |
| --- | --- | --- |
| Build + prerender | `npm run build` | 14 rotas prerenderizadas; bundle inicial ≈ 111 kB transferidos |
| Testes | `npm test` | 12 arquivos, 72 testes passando |
| Lint | `npm run lint` | Sem erros |
| QA visual | Playwright (Chrome) em 375–1920 px | Sem overflow horizontal; 1 H1 por página |

Evidências e detalhes em [docs/QA_REPORT.md](docs/QA_REPORT.md).

## Deploy

O build gera um site 100% estático em `dist/napoleon-hill-foundation/browser`, publicável em
qualquer CDN (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront). Instruções em
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Antes de publicar

1. Definir `siteUrl` em `site.config.ts` para ativar canonical, `og:url` e `sitemap.xml`.
2. Validar com Jamil Albuquerque todos os itens de [docs/CONTENT.md](docs/CONTENT.md).
3. Substituir as imagens recortadas do mock pelos originais em alta resolução ([docs/ASSETS.md](docs/ASSETS.md)).
4. Configurar os endpoints dos formulários e os IDs de analytics.
5. Submeter a Política de Privacidade e os Termos à revisão jurídica.

## Documentação

| Documento | Conteúdo |
| --- | --- |
| [docs/PROJECT.md](docs/PROJECT.md) | Sobre o projeto: objetivo, conceito, público e jornada |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Decisões técnicas, camadas, SSR, motion, Three.js |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Tokens, tipografia, cores, componentes e motion |
| [docs/CONTENT.md](docs/CONTENT.md) | Mapa de conteúdo, origem de cada dado e pendências |
| [docs/ASSETS.md](docs/ASSETS.md) | Imagens em uso, origem, especificações de substituição |
| [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md) | SEO, analytics, LGPD, formulários e WhatsApp |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Build, hospedagem, 404, cache e checklist |
| [docs/QA_REPORT.md](docs/QA_REPORT.md) | Gates executados e resultados |
| [docs/PROMPT.md](docs/PROMPT.md) | Prompt mestre usado na criação da landing page |
| [CHANGELOG.md](CHANGELOG.md) | Histórico de versões |
