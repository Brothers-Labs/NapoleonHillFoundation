# Integrações: SEO, analytics, LGPD, formulários e WhatsApp

## SEO

| Recurso | Implementação |
| --- | --- |
| Título e description por rota | `core/seo/page-metadata.ts` (fonte única) |
| Robots | `index, follow, max-image-preview:large`; `noindex` em `/404` |
| OpenGraph e Twitter Card | Gerados por `SeoService` em toda navegação e no prerender |
| Canonical e `og:url` | Ativados quando `SITE_CONFIG.siteUrl` estiver definido |
| `sitemap.xml` | Gerado no `prebuild` a partir de `page-metadata.ts`; omitido enquanto não houver domínio |
| `robots.txt` | Gerado no `prebuild`; inclui `Sitemap:` quando houver domínio |
| Google Search Console | `SITE_CONFIG.searchConsoleVerification` gera a meta `google-site-verification` |

### JSON-LD (`core/seo/structured-data.ts`)

| Página | Schemas |
| --- | --- |
| Home | `Organization`, `WebSite` |
| `/napoleon-hill` | `Person` (Napoleon Hill), `Book` (obras) |
| `/materiais` | `Book` |
| `/jamil-albuquerque` | `Person` (somente com biografia configurada) |
| `/videos` | `VideoObject` (somente vídeos com `uploadDate`) |
| Páginas internas | `BreadcrumbList` (quando houver domínio) |

Os valores `null` são removidos antes da serialização, e o `<` é escapado para evitar quebra da
tag `<script>`. Nenhum schema é emitido com dado fictício.

## Analytics

`AnalyticsService` é uma fachada desacoplada de fornecedor. Componentes chamam apenas
`track('evento', params)`, de forma declarativa com a diretiva `nhTrack`.

| Fornecedor | Configuração (`integrations.config.ts`) | Carrega após |
| --- | --- | --- |
| Google Tag Manager | `gtmContainerId` (`GTM-XXXXXXX`) | Consentimento de análise |
| Google Analytics 4 | `ga4MeasurementId` (`G-XXXXXXX`), ignorado se houver GTM | Consentimento de análise |
| Microsoft Clarity | `clarityProjectId` | Consentimento de análise |
| Meta Pixel | `metaPixelId` | Consentimento de marketing |

Os IDs são validados por expressão regular antes de qualquer script ser injetado. Sem
consentimento, os eventos são **descartados**, não enfileirados.

**Eventos:** `hero_philosophy_click`, `hero_brazil_click`, `program_click`, `jamil_profile_click`,
`video_play`, `gallery_open`, `material_download`, `newsletter_start`, `newsletter_submit`,
`whatsapp_click`, `contact_start`, `contact_submit`, `external_foundation_click`, `scroll_25`,
`scroll_50`, `scroll_75` e `scroll_90`. As trocas de página SPA geram `nh_page_view` no
`dataLayer`.

## LGPD

- Banner com **Aceitar todos**, **Somente necessários** e **Personalizar** (análise e marketing).
- A decisão fica em `localStorage` (`nh.consent`) com a versão da política. Ao alterar a política,
  incremente `consentVersion` e o consentimento é pedido de novo.
- "Preferências de cookies" no footer reabre o banner.
- Formulários exigem consentimento explícito (checkbox) e enviam `consentVersion` e
  `consentedAt` junto do payload.
- Política de Privacidade e Termos em `data/legal.data.ts`. **Revisão jurídica obrigatória.**

## Formulários

`FormSubmissionService` envia JSON por `POST` para os endpoints configurados:

| Formulário | Endpoint | Payload |
| --- | --- | --- |
| Newsletter | `forms.newsletter` | `NewsletterSubmission` |
| Contato | `forms.contact` | `ContactSubmission` |

- Endpoint `null` → status `not-configured`, com mensagem honesta ao usuário. **Nunca simula
  sucesso.**
- Aceita apenas HTTPS ou caminho da mesma origem; timeout de 15 s.
- Erros não registram dados pessoais em log.
- Honeypot anti-spam e validação de nome, e-mail, telefone brasileiro, assunto e mensagem.

## WhatsApp

`CONTACT_CONFIG.whatsapp` alimenta o botão flutuante, o footer e a página de contato.
`buildWhatsAppUrl` valida o número e falha nos testes se o formato estiver errado. O botão
respeita a *safe area*, fica acima da tab bar mobile e se esconde enquanto o banner de cookies
estiver aberto.
