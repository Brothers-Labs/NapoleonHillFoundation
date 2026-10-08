# Relatório de QA (v0.1.0, 07/10/2026)

Todos os resultados abaixo vêm de comandos executados e de saídas lidas.

## Gates

| Gate | Comando | Resultado |
| --- | --- | --- |
| Build de produção + prerender | `npm run build` | ✅ 14 rotas prerenderizadas; bundle inicial 392 kB brutos, **≈ 111 kB transferidos** |
| Testes unitários | `npm test` | ✅ 12 arquivos, **72 testes passando** |
| Lint | `npm run lint` | ✅ "All files pass linting." |
| Qualidade de texto | `.ai-team/scripts/check-text-quality.ps1` | ✅ 0 achados de acentuação ou mojibake. 16 avisos `html-sem-charset` são falso positivo em templates de componente Angular; o `index.html` declara `<meta charset="utf-8">` |

### Chunks lazy relevantes

| Chunk | Transferido | Carregado quando |
| --- | --- | --- |
| `particle-field-renderer` (Three.js) | ≈ 111 kB | Em idle, depois do primeiro paint |
| `ScrollTrigger` + GSAP | ≈ 41 kB | Após hidratação, se houver permissão de motion |

## Cobertura de testes

| Área | O que é verificado |
| --- | --- |
| `whatsapp.ts` | Link `wa.me`, codificação da mensagem, rejeição de números inválidos, validade do número configurado |
| `video-embed.ts` | URLs do youtube-nocookie e do Vimeo (dnt), rejeição de IDs maliciosos |
| `form-validators.ts` | Telefone brasileiro, campos em branco, valores opcionais |
| `ConsentService` | Estado inicial, persistência com versão, restauração, reconsentimento por versão, storage corrompido, reabertura |
| `AnalyticsService` | Descarte sem consentimento, envio ao `dataLayer`, GTM carregado só após consentimento, recusa de ID malformado |
| `FormSubmissionService` | `not-configured` honesto, POST correto, erro HTTP sem vazar dados pessoais, recusa de endpoint inseguro |
| `SeoService` / JSON-LD | Title, description, robots, OpenGraph, noindex do 404, ausência de canonical sem domínio, bloco JSON-LD único, schemas `Person` e `Book` |
| Integridade dos dados | Ordem dos princípios, cronologia, categorias da galeria, IDs únicos, links de navegação apontando para rotas existentes, limites de título e description |
| `NewsletterSection` | Bloqueio de envio inválido com mensagens, estado honesto sem backend, honeypot |
| `PrinciplesSection` | Destaques da home, lista completa, drawer com navegação circular |
| `App` | Skip link, landmarks, botão de WhatsApp com o número configurado |

## QA visual (Playwright + Chrome)

Executado contra o build estático servido localmente.

| Verificação | Larguras | Resultado |
| --- | --- | --- |
| Overflow horizontal da página | 375, 390, 430, 768, 1024, 1366, 1440, 1920 | ✅ Nenhum (`scrollWidth == clientWidth`) |
| Todas as 14 rotas | 390 e 1440 | ✅ 1 H1 por página; o único erro de console é o 404 esperado de `/rota-inexistente` |
| Motion real (WebGL ativo) | 390 e 1440 | ✅ Campo de partículas inicializa; sem erros ou warnings de console |
| Drawer dos princípios | 390 e 1440 | ✅ Abre e fecha com Esc |
| Menu mobile | 390 | ✅ Tela cheia, links numerados, CTA |
| Fidelidade ao mock | Home desktop e mobile | ✅ Ordem, layout e conteúdo das seções conferem com o mock |

Elementos que excedem a largura **por design** (sem causar overflow da página): o carrossel de
swipe da faixa de legado no mobile e a capa do livro que sangra na seção da linha do tempo.

## Não executado

- **Lighthouse:** deve ser medido no ambiente de produção (CDN, HTTPS, compressão).
- **Navegadores reais em iOS e Android:** recomendado antes do lançamento.
- **Envio real de formulários:** depende dos endpoints a configurar.

## Pendências conhecidas

- As imagens recortadas do mock têm baixa resolução e aparecem pixeladas em telas grandes
  ([ASSETS.md](ASSETS.md)).
- Galeria, vídeos e materiais aguardam acervo real ([CONTENT.md](CONTENT.md)).
