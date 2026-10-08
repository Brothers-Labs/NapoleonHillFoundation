# Prompt de criação da landing page

Este documento registra, na íntegra, o prompt mestre usado para projetar e desenvolver a
experiência digital da The Napoleon Hill Foundation Brasil, além das instruções
complementares dadas durante a construção. Ele serve como especificação original do projeto:
use-o para entender o porquê das decisões e para orientar evoluções futuras.

## Contexto de execução

| Item | Valor |
| --- | --- |
| Data | 07/10/2026 |
| Ferramenta | Claude Code |
| Repositório | `Brothers-Labs/NapoleonHillFoundation` (vazio no início) |
| Pedido inicial | Criar a landing page com este prompt, README completo, documentação, prompt documentado, responsivo mobile first, efeitos Three.js, commit em `staging` e merge para `main` |
| Instrução complementar | "Segue mock do site landing page, usar esse modelo e imagens para montar o site completo. Continuar com as imagens e prompt anterior até terminar 100% a demanda." |

## Como o prompt foi interpretado

- **Seção 1 (não inventar):** foi tratada como regra máxima. Todo dado vem de fato histórico
  público, do mock fornecido ou fica pendente. Ver [CONTENT.md](CONTENT.md).
- **Seção 3 (stack):** foi usado o Angular 21.2 em vez do 22, porque o Angular 22 exige
  Node ≥ 24.15 e o ambiente tem 24.14. Ver [ARCHITECTURE.md](ARCHITECTURE.md#upgrade-para-angular-22).
- **Three.js** foi adicionado a pedido do usuário, como campo de partículas carregado em idle.
- **Mock visual:** passou a ser a referência de layout e de conteúdo. A ordem da home, a
  tipografia em caixa mista, a faixa de legado com ícones, os cards de princípios e programas, o
  footer em quatro colunas e a tab bar mobile seguem o mock. As fotografias foram recortadas do
  próprio mock e precisam ser substituídas ([ASSETS.md](ASSETS.md)).

## Prompt mestre (íntegra)

```text
# CLAUDE CODE — MASTER PROMPT
# NAPOLEON HILL FOUNDATION BRASIL
# LANDING PAGE INSTITUCIONAL PREMIUM

Você é um:

Senior Staff Frontend Engineer
Software Architect
Product Designer
UX/UI Designer
Creative Developer
Motion Designer
SEO Specialist
Performance Engineer

Sua missão é PROJETAR E DESENVOLVER uma experiência digital institucional
PREMIUM para:

THE NAPOLEON HILL FOUNDATION BRASIL

Este projeto representa no Brasil o legado, a filosofia e os princípios
de Napoleon Hill.

NÃO quero um template genérico.

NÃO quero aparência de:
- landing page de infoproduto;
- site de coach;
- página genérica de curso;
- template SaaS;
- site institucional antigo;
- WordPress genérico.

Quero uma experiência com percepção de:

LEGADO
HISTÓRIA
AUTORIDADE
CONHECIMENTO
SOFISTICAÇÃO
INSTITUIÇÃO
TRANSFORMAÇÃO
ATEMPORALIDADE

A referência conceitual deve ser algo como:

Apple
+
MasterClass
+
instituição centenária
+
documentário histórico
+
editorial premium
+
museu digital
+
experiência web contemporânea

SEM copiar nenhum desses produtos.

==========================================================
1. REGRA MAIS IMPORTANTE
==========================================================

Não inventar informações institucionais.

Não inventar:
- números;
- datas;
- parceiros;
- depoimentos;
- estatísticas;
- cargos;
- endereços;
- telefones;
- programas;
- certificações;
- relações institucionais;
- direitos sobre obras;
- números de países;
- quantidade de pessoas impactadas.

Quando uma informação ainda não estiver disponível,
centralizá-la em arquivo de configuração com TODO explícito.

Exemplo:

// TODO: validar com Jamil Albuquerque antes da publicação

Todo conteúdo institucional definitivo deverá poder ser
facilmente substituído posteriormente.

==========================================================
2. ANTES DE CODIFICAR
==========================================================

ANTES de alterar qualquer código:

1. auditar o repositório completo;
2. identificar framework e versão;
3. verificar package.json;
4. entender arquitetura existente;
5. localizar assets existentes;
6. localizar logos;
7. localizar imagens;
8. verificar fontes;
9. verificar estilos globais;
10. identificar componentes reutilizáveis;
11. verificar configuração de deploy;
12. verificar SEO existente;
13. verificar testes;
14. verificar lint;
15. verificar TypeScript;
16. verificar responsividade existente.

NÃO recriar o projeto se já existir uma base válida.

NÃO alterar stack sem necessidade.

NÃO quebrar funcionalidades existentes.

Depois da auditoria, criar mentalmente o plano de implementação
e somente então começar.

==========================================================
3. STACK
==========================================================

Se o projeto ainda não estiver iniciado, utilizar:

Angular latest stable
TypeScript strict
Standalone Components
SCSS
Angular Signals quando fizer sentido
GSAP
GSAP ScrollTrigger
Lucide Icons ou SVG próprios

Smooth scrolling somente se agregar valor real.

Evitar dependências desnecessárias.

Priorizar APIs nativas e CSS moderno.

Preparar arquitetura para SSR / prerender para SEO.

==========================================================
4. ARQUITETURA
==========================================================

Criar arquitetura limpa, escalável e production-ready.

Referência:

src/app/

  core/
    config/
    models/
    services/
    seo/
    analytics/
    animations/
    utils/

  shared/
    components/
    directives/
    pipes/
    ui/

  layout/
    header/
    mobile-menu/
    footer/
    cookie-consent/

  features/
    home/
    napoleon-hill/
    foundation/
    philosophy/
    brazil/
    jamil/
    programs/
    gallery/
    videos/
    materials/
    contact/

  data/

  models/

Não criar HomeComponent gigante.

Não criar componentes de 1.000+ linhas.

Não componentizar cada div inutilmente.

Encontrar equilíbrio arquitetural.

==========================================================
5. ROTAS
==========================================================

Preparar:

/
 /napoleon-hill
 /fundacao
 /filosofia
 /brasil
 /jamil-albuquerque
 /programas
 /galeria
 /videos
 /materiais
 /contato
 /privacidade
 /termos

IMPORTANTE:

A HOME deve funcionar como a grande experiência institucional
e apresentar um resumo de todo o ecossistema.

As páginas internas poderão aprofundar o conteúdo.

Se nesta primeira implementação algumas páginas ainda não tiverem
conteúdo oficial suficiente, criar estrutura consistente sem inventar
informações.

==========================================================
6. CONCEITO CRIATIVO
==========================================================

Conceito:

"O LEGADO CONTINUA."

Mensagem principal:

"O sucesso começa na mente."

A experiência deve conectar:

PASSADO
↓
LEGADO
↓
CONHECIMENTO
↓
PRINCÍPIOS
↓
APLICAÇÃO
↓
BRASIL
↓
NOVA GERAÇÃO

A interface deve criar uma ponte visual entre:

1920 / 1930
e
2026.

Fotografias históricas + tecnologia contemporânea.

==========================================================
7. IDENTIDADE VISUAL
==========================================================

Paleta principal:

--nh-midnight: #071426;
--nh-deep-navy: #0C1B30;
--nh-black: #05080C;

--nh-ivory: #F5F1E8;
--nh-warm-white: #FAF9F6;

--nh-gold: #C6A15B;
--nh-antique-gold: #A87C32;

--nh-charcoal: #161616;
--nh-muted: #8D9298;

O DOURADO deve ser utilizado com inteligência.

Não transformar tudo em dourado.

Dourado deve comunicar:
- legado;
- detalhes;
- separadores;
- ícones;
- CTAs importantes;
- pequenos highlights.

A base deve ser:

NAVY
BLACK
CREAM
WHITE
GOLD.

==========================================================
8. TIPOGRAFIA
==========================================================

Combinar:

SERIF EDITORIAL
+
SANS-SERIF CONTEMPORÂNEA.

Sugestões:

Cormorant Garamond
+
Inter

OU

DM Serif Display
+
Manrope

No máximo 2 famílias.

Headlines:
elegantes, editoriais e grandes.

Interface:
extremamente legível.

Evitar bold excessivo.

Desktop hero:

usar clamp responsivo aproximadamente entre 64px e 110px,
dependendo do viewport.

==========================================================
9. DESIGN TOKENS
==========================================================

Centralizar:

colors
spacing
typography
containers
radius
shadows
z-index
motion
breakpoints

Criar variáveis SCSS/CSS.

Exemplo:

--nh-background
--nh-surface
--nh-gold
--nh-gold-muted
--nh-text
--nh-text-muted
--nh-ivory
--nh-container
--nh-header-height

Evitar magic numbers espalhados.

==========================================================
10. HEADER
==========================================================

Desktop:

logo oficial à esquerda.

Menu:

INÍCIO
A FUNDAÇÃO
NAPOLEON HILL
FILOSOFIA
BRASIL
JAMIL ALBUQUERQUE
CONTEÚDOS
CONTATO

CONTEÚDOS pode abrir:

Livros / Materiais
Vídeos
Galeria

CTA destacado:

CONHEÇA OS PROGRAMAS

Header inicialmente transparente.

Ao scroll:

background navy quase opaco
+
backdrop-filter
+
border inferior extremamente sutil.

Criar estado ativo conforme seção.

==========================================================
11. HEADER MOBILE
==========================================================

Mobile:

logo
+
hamburger elegante.

Menu deve abrir fullscreen.

Exemplo:

01 Início
02 Napoleon Hill
03 A Fundação
04 Filosofia
05 Brasil
06 Jamil Albuquerque
07 Programas
08 Conteúdos
09 Contato

CTA:

CONHEÇA OS PROGRAMAS

Animação elegante de entrada dos links.

Touch targets >= 44px.

==========================================================
12. HERO — PRINCIPAL WOW EFFECT
==========================================================

Esta é a seção mais importante.

Altura aproximada:

100svh.

Visual:

Napoleon Hill em fotografia histórica de altíssima qualidade.

Pode existir:

biblioteca
livros
manuscritos
Think and Grow Rich
textura de papel
escrita histórica
luz cinematográfica

desde que os assets estejam autorizados/disponíveis.

Overlay navy/preto.

Evitar aparência artificial exagerada.

Eyebrow:

THE NAPOLEON HILL FOUNDATION
BRASIL

Headline:

O SUCESSO
COMEÇA NA MENTE.

Destacar:

"COMEÇA NA MENTE."

com dourado elegante.

Subheadline:

"O legado de Napoleon Hill apresentado para uma nova geração no Brasil."

CTAs:

[ CONHEÇA A FILOSOFIA ]

[ ASSISTA AO VÍDEO ]

ou, caso não exista vídeo oficial configurado:

[ NAPOLEON HILL NO BRASIL ]

Nunca deixar CTA quebrado.

No rodapé:

DESCUBRA O LEGADO
↓


==========================================================
13. HERO MOTION
==========================================================

Criar entrada cinematográfica:

logo
→
eyebrow
→
headline
→
texto
→
CTAs
→
imagem.

Pode utilizar:

mask reveal
opacity
translateY
subtle scale
parallax discreto.

Nada exagerado.

O usuário deve sentir sofisticação, não perceber "um monte de animação".

==========================================================
14. LEGACY STRIP
==========================================================

Logo abaixo do hero criar uma faixa institucional.

Exemplos de conteúdo somente quando validado:

1883–1970
NAPOLEON HILL

1937
THINK AND GROW RICH

17
PRINCÍPIOS DO SUCESSO

BRASIL
REPRESENTAÇÃO / LICENCIAMENTO

IMPORTANTE:

validar terminologia institucional antes de publicar.

Se algum dado não estiver confirmado, marcar como conteúdo pendente
no config e não inventar.

Layout desktop horizontal.

Mobile:
2 colunas ou horizontal swipe elegante.

==========================================================
15. QUEM FOI NAPOLEON HILL
==========================================================

Criar seção editorial clara.

Desktop:

imagem histórica grande à esquerda.

Conteúdo à direita.

Eyebrow:

QUEM FOI

Headline:

Napoleon Hill?

Texto institucional.

CTA:

CONHEÇA SUA HISTÓRIA

A fotografia pode receber um pequeno botão de vídeo somente se existir
vídeo real configurado.

Utilizar bastante espaço negativo.

==========================================================
16. TIMELINE — UMA OBRA QUE ATRAVESSOU GERAÇÕES
==========================================================

Criar seção dark extremamente elegante.

Headline:

UMA OBRA QUE ATRAVESSOU GERAÇÕES.

Criar timeline histórica.

Somente inserir eventos/datas confirmados.

Estrutura visual:

1908
↓

1928
↓

1937
↓

HOJE

A linha progride conforme o scroll.

No desktop:
horizontal.

No mobile:
vertical.

Pode utilizar ScrollTrigger.

Adicionar imagem de obra histórica somente se asset estiver autorizado.

==========================================================
17. PRINCÍPIOS DO SUCESSO
==========================================================

Headline:

OS PRINCÍPIOS DO SUCESSO

Sub:

"Uma filosofia construída sobre princípios de realização pessoal,
liderança e propósito."

Criar experiência sofisticada para os princípios.

Exemplo visual:

01
PROPÓSITO DEFINIDO

02
MASTERMIND

03
FÉ APLICADA

04
AUTODISCIPLINA

05
INICIATIVA

etc.

Não inventar a lista definitiva.

Centralizar em arquivo:

success-principles.data.ts

Cards podem abrir:

drawer
modal
expandable content.

Desktop:
grid editorial / horizontal experience.

Mobile:
lista vertical ou swipe.

CTA:

CONHEÇA OS PRINCÍPIOS

==========================================================
18. THE NAPOLEON HILL FOUNDATION
==========================================================

Criar seção institucional.

Eyebrow:

THE NAPOLEON HILL FOUNDATION

Headline:

Preservando um legado.
Inspirando novas gerações.

Explicar:

história
missão
educação
preservação do legado
publicações
iniciativas

Somente conteúdo confirmado.

Criar composição visual com:

arquivos históricos
livros
documentos
fotografias
arquitetura institucional

CTA:

CONHEÇA A FUNDAÇÃO

CTA secundário:

VISITAR SITE INTERNACIONAL ↗

URL deve vir do config.

==========================================================
19. NAPOLEON HILL NO BRASIL
==========================================================

Esta é uma seção estratégica.

Background navy cinematográfico.

Headline:

NAPOLEON HILL
NO BRASIL

Subheadline:

"O legado de Napoleon Hill encontra uma nova geração."

Apresentar a representação brasileira conforme informações oficiais
fornecidas no projeto.

Se Master Mind estiver oficialmente confirmado no conteúdo recebido,
apresentar:

MASTER MIND
TREINAMENTOS DE ALTA PERFORMANCE

Não inventar relação institucional além do material validado.

Pode utilizar fotografia sofisticada de São Paulo/Brasil de forma discreta.

Evitar:
bandeira gigante;
verde/amarelo excessivo;
clichês brasileiros.

CTA:

CONHEÇA A REPRESENTAÇÃO NO BRASIL

==========================================================
20. JAMIL ALBUQUERQUE
==========================================================

Criar uma das principais seções da landing.

Headline:

JAMIL
ALBUQUERQUE

Subheadline:

O legado de Napoleon Hill no Brasil.

Utilizar foto profissional REAL fornecida no projeto.

NÃO gerar pessoa falsa caso não exista foto.

Se ainda não houver asset:

criar placeholder visual elegante claramente configurável.

Apresentar:

biografia
trajetória
relação com a filosofia Napoleon Hill
atuação
projetos
livros
conteúdos

Somente dados oficiais.

CTA:

CONHEÇA SUA HISTÓRIA

Criar possibilidade futura para:

/jamil-albuquerque

==========================================================
21. PROGRAMAS
==========================================================

Headline:

TRANSFORME
CONHECIMENTO EM AÇÃO.

Criar categorias configuráveis.

Exemplos somente se confirmados:

Treinamentos
Formações
Eventos
Palestras
Masterclasses
Certificações

Cada item:

imagem
categoria
nome
descrição
CTA

Não criar cursos fictícios.

Se ainda não existirem dados:

usar estrutura pronta alimentada por config,
sem fingir programas reais.

==========================================================
22. LIVROS / OBRAS
==========================================================

Criar seção editorial.

Headline:

IDEIAS QUE ATRAVESSARAM GERAÇÕES.

Apresentar obras autorizadas.

Card editorial:

capa
nome original
nome em português se aplicável
ano
descrição curta
CTA

Exemplos conhecidos só devem ser adicionados caso estejam validados
para utilização neste projeto.

Não disponibilizar PDFs protegidos.

Não criar downloads de livros protegidos.

==========================================================
23. GALERIA DE FOTOS
==========================================================

Headline:

MOMENTOS QUE INSPIRAM
E TRANSFORMAM.

Criar masonry/editorial grid.

Categorias configuráveis:

Todos
Eventos
Treinamentos
Palestras
Institucional

Somente utilizar fotos reais fornecidas.

Click:

lightbox fullscreen.

Desktop:
hover elegante.

Mobile:
swipe.

Lazy load obrigatório.

==========================================================
24. GALERIA DE VÍDEOS
==========================================================

Headline:

ASSISTA.
APRENDA.
APLIQUE.

Cards:

thumbnail
play
título
categoria
duração se disponível

Suportar configuração futura para:

YouTube
Vimeo
URL própria.

Abrir modal de vídeo.

Não carregar iframes pesados antes da interação.

Utilizar thumbnail/poster.

==========================================================
25. MATERIAIS
==========================================================

Headline:

CONHECIMENTO PARA
CONTINUAR SUA JORNADA.

Criar cards de materiais autorizados.

Tipos:

E-book
Guia
Artigo
Checklist
Material de evento

Cada item:

capa
tipo
nome
descrição
formato
CTA

BAIXAR MATERIAL

Arquivos devem vir de config.

Não inventar PDFs.

Não disponibilizar obras protegidas sem autorização.

==========================================================
26. NEWSLETTER / LEAD CAPTURE
==========================================================

Criar seção premium.

Headline:

COMECE SUA JORNADA.

Texto:

"Receba conteúdos, reflexões, eventos e novidades sobre a filosofia
de Napoleon Hill no Brasil."

Campos:

Nome
E-mail
WhatsApp opcional

Checkbox LGPD.

CTA:

QUERO RECEBER CONTEÚDOS

Front-end inicialmente.

Criar interface/service preparado para futura API.

Não fingir envio bem-sucedido para backend inexistente.

Se não houver API:

usar comportamento claramente configurável/demo.

==========================================================
27. CTA MASTER
==========================================================

Criar seção quase fullscreen antes do contato.

Headline:

O LEGADO CONTINUA.

Sub:

"Conhecimento só transforma quando se torna ação."

CTA:

CONHEÇA OS PROGRAMAS

CTA secundário:

FALE COM NOSSA EQUIPE

Background:

fotografia histórica / livros / arquivo
com tratamento cinematográfico.

==========================================================
28. CONTATO
==========================================================

Criar seção completa.

Headline:

FALE CONOSCO.

Dados devem vir de:

contact.config.ts

Campos configuráveis:

telefone
WhatsApp
e-mail
endereço
Instagram
YouTube
LinkedIn
Facebook

Nunca hardcode espalhado.

Mapa:

Google Maps embed ou alternativa.

Só usar endereço confirmado.

Adicionar formulário:

Nome
E-mail
WhatsApp
Assunto
Mensagem

CTA:

ENVIAR MENSAGEM

Preparar service para futura API.

==========================================================
29. WHATSAPP
==========================================================

Criar botão floating elegante.

Não deve cobrir conteúdo importante.

Mobile:
respeitar safe-area.

Mensagem configurável:

"Olá! Conheci a Napoleon Hill Brasil pelo site e gostaria de saber mais."

Registrar evento de analytics.

==========================================================
30. FOOTER
==========================================================

Footer premium.

Logo.

Mensagem:

O LEGADO CONTINUA.

ou conteúdo institucional aprovado.

Colunas:

FUNDAÇÃO
- A Fundação
- Napoleon Hill
- Filosofia
- Brasil
- Jamil Albuquerque

CONTEÚDOS
- Programas
- Livros
- Vídeos
- Galeria
- Materiais

CONTATO
- WhatsApp
- E-mail
- Redes sociais

LEGAL
- Privacidade
- Termos
- Cookies

Copyright dinâmico.

Adicionar:

Napoleon Hill Foundation — USA ↗

somente com URL oficial configurada.

==========================================================
31. MOBILE FIRST — REGRA CRÍTICA
==========================================================

A versão mobile NÃO é desktop comprimido.

Criar experiência própria.

Prioridade de QA:

375px
390px
430px

Depois:

768px
1024px
1366px
1440px
1920px

Mobile deve possuir:

hero próprio
crop correto das imagens
headline controlada
CTAs full/large
menu fullscreen
timeline vertical
cards touch-friendly
galerias swipeáveis quando adequado
modal mobile
vídeo otimizado
safe-area
WhatsApp sem sobreposição.

Touch targets >= 44px.

Nenhum overflow horizontal.

==========================================================
32. MOTION DESIGN
==========================================================

Utilizar GSAP de maneira sofisticada.

Possibilidades:

hero reveal
text reveal
mask reveal
parallax sutil
image scale
timeline progress
pinned storytelling
stagger
section reveal
counter quando houver dados reais
horizontal storytelling em desktop.

NÃO:

animar tudo.

NÃO:

criar scroll cansativo.

NÃO:

usar efeitos gamer.

NÃO:

atrapalhar leitura.

NÃO:

criar scroll hijacking agressivo.

Implementar:

prefers-reduced-motion.

No mobile reduzir animações pesadas.

Garantir cleanup dos ScrollTriggers.

==========================================================
33. MICROINTERAÇÕES
==========================================================

Adicionar:

hover refinado
focus states
button transitions
image reveal
menu transition
active nav
scroll progress extremamente discreto
smooth anchor navigation
loading states
form states
video modal transitions
gallery interactions.

Cursor customizado é opcional SOMENTE desktop.

Se implementar:
extremamente discreto.

Nunca substituir cursor de maneira prejudicial.

==========================================================
34. PERFORMANCE
==========================================================

Metas:

Lighthouse Performance >= 90
Accessibility >= 95
Best Practices >= 95
SEO >= 95

Otimizar:

AVIF
WebP
srcset
sizes
lazy loading
preload apenas do hero necessário
font-display: swap
bundle splitting
lazy routes
defer de vídeos
defer de mapas
GPU-friendly animations.

Priorizar animação de:

transform
opacity.

Evitar layout thrashing.

Não carregar 20 MB de vídeo no primeiro paint.

==========================================================
35. SEO
==========================================================

SEO é obrigatório.

Home title sugerido:

Napoleon Hill Brasil | The Napoleon Hill Foundation

Description:

Conheça o legado, a filosofia e os princípios de Napoleon Hill no Brasil,
além de conteúdos, programas e iniciativas relacionados à Napoleon Hill Foundation.

Criar metadata específica por rota.

Preparar contextos SEO:

Napoleon Hill
Napoleon Hill Brasil
Napoleon Hill Foundation
Quem foi Napoleon Hill
filosofia Napoleon Hill
princípios Napoleon Hill
Think and Grow Rich
Quem Pensa Enriquece
Jamil Albuquerque

Implementar:

canonical
robots.txt
sitemap.xml
OpenGraph
Twitter Cards

JSON-LD:

Organization
WebSite
Person
BreadcrumbList

Book somente onde houver livro real.

VideoObject somente para vídeos reais.

Event somente para eventos reais.

Nunca criar schema com informação fictícia.

==========================================================
36. SSR / PRERENDER
==========================================================

Se compatível com o projeto:

implementar Angular SSR/prerender.

Garantir:

metadata renderizada no HTML
rotas indexáveis
OpenGraph funcional
sitemap
canonical
robots.

Evitar APIs browser-only quebrando SSR.

Proteger:

window
document
localStorage

quando necessário.

==========================================================
37. ACESSIBILIDADE
==========================================================

WCAG AA.

Obrigatório:

HTML semântico
heading hierarchy correta
aria-label quando necessário
alt de imagens
keyboard navigation
focus-visible
contraste
labels reais
modal acessível
ESC para fechar modal
focus trap quando necessário
reduced-motion
links identificáveis.

Não utilizar div clicável quando deveria ser button.

==========================================================
38. LGPD
==========================================================

Preparar:

Política de Privacidade
Termos
Cookie Consent

Não carregar trackers não essenciais antes do consentimento,
caso sejam configurados dessa forma.

Formulários devem possuir consentimento adequado.

==========================================================
39. ANALYTICS
==========================================================

Criar arquitetura preparada para:

Google Analytics 4
Google Tag Manager
Meta Pixel
Google Search Console
Microsoft Clarity

Não inserir IDs fictícios.

Usar environment/config.

Eventos sugeridos:

hero_philosophy_click
hero_brazil_click
program_click
jamil_profile_click
video_play
gallery_open
material_download
newsletter_start
newsletter_submit
whatsapp_click
contact_start
contact_submit
external_foundation_click
scroll_25
scroll_50
scroll_75
scroll_90

Criar AnalyticsService desacoplado.

==========================================================
40. CONTEÚDO CONFIGURÁVEL
==========================================================

Não espalhar conteúdo pelo HTML.

Criar configs/datasets.

Exemplo:

foundation.config.ts
navigation.config.ts
contact.config.ts
social.config.ts
timeline.data.ts
principles.data.ts
programs.data.ts
books.data.ts
gallery.data.ts
videos.data.ts
materials.data.ts
jamil.data.ts

Preparar tudo para futura migração para CMS/API.

==========================================================
41. ASSETS
==========================================================

ANTES de utilizar qualquer asset:

verificar arquivos existentes no repositório.

Prioridade:

1. assets oficiais fornecidos;
2. imagens licenciadas existentes;
3. placeholders elegantes;
4. somente depois avaliar necessidade de novas imagens.

NÃO usar imagem aleatória da internet.

NÃO inventar logo.

NÃO redesenhar logo oficial com texto.

NÃO distorcer proporção.

Não criar uma pessoa falsa para representar Jamil Albuquerque.

==========================================================
42. UX DE MARKETING
==========================================================

A página precisa contar uma história.

O usuário deve passar pela seguinte jornada:

IMPACTO
↓
QUEM FOI NAPOLEON HILL
↓
A OBRA
↓
OS PRINCÍPIOS
↓
A FUNDAÇÃO
↓
O LEGADO INTERNACIONAL
↓
BRASIL
↓
JAMIL ALBUQUERQUE
↓
PROGRAMAS
↓
CONTEÚDOS
↓
AÇÃO
↓
CONTATO

Cada seção deve responder naturalmente:

"Por que isso importa?"

"Como isso chegou até hoje?"

"Como posso aprender mais?"

"Como posso participar?"

==========================================================
43. NÃO FAZER
==========================================================

NÃO usar lorem ipsum.

NÃO criar fake testimonials.

NÃO criar logos fictícias.

NÃO criar números de impacto fictícios.

NÃO inventar programas.

NÃO inventar certificações.

NÃO inventar parceiros.

NÃO inventar endereços.

NÃO inventar links.

NÃO inventar biografia do Jamil.

NÃO copiar visualmente naphill.org.

NÃO transformar o projeto em uma tradução literal do site americano.

NÃO usar dezenas de cards iguais.

NÃO criar excesso de glassmorphism.

NÃO usar gradientes coloridos genéricos.

NÃO usar neon.

NÃO utilizar animações simplesmente porque GSAP está instalado.

NÃO sacrificar performance pela estética.

==========================================================
44. FASES DE IMPLEMENTAÇÃO
==========================================================

Trabalhar nesta ordem:

FASE 1
AUDITORIA DO PROJETO

FASE 2
ARQUITETURA

FASE 3
DESIGN SYSTEM / TOKENS

FASE 4
HEADER + MOBILE MENU

FASE 5
HERO

FASE 6
LEGACY STRIP

FASE 7
NAPOLEON HILL + TIMELINE

FASE 8
PRINCÍPIOS

FASE 9
FOUNDATION

FASE 10
BRASIL

FASE 11
JAMIL ALBUQUERQUE

FASE 12
PROGRAMAS / OBRAS

FASE 13
GALERIA / VÍDEOS / MATERIAIS

FASE 14
LEAD CAPTURE

FASE 15
CONTATO

FASE 16
FOOTER

FASE 17
MOTION DESIGN

FASE 18
MOBILE POLISH

FASE 19
SEO / SSR

FASE 20
ACCESSIBILITY

FASE 21
PERFORMANCE

FASE 22
QA FINAL

Não parar após fazer Hero.

Implementar a landing inteira.

==========================================================
45. QUALITY GATES
==========================================================

Antes de considerar concluído:

npm install

executar build oficial do projeto.

executar lint se configurado.

executar testes existentes.

Corrigir:

TypeScript errors
build errors
lint errors relevantes
warnings críticos
broken imports
broken assets.

Testar:

375px
390px
430px
768px
1024px
1366px
1440px
1920px

Verificar:

overflow horizontal
CLS
LCP
header
menu mobile
anchors
modals
galeria
vídeos
form
WhatsApp
footer
sticky elements
ScrollTrigger cleanup
SSR
console errors
memory leaks
keyboard navigation
focus
hover
touch.

==========================================================
46. VISUAL QA
==========================================================

Depois de implementar:

abrir a aplicação no browser.

Inspecionar visualmente:

HOME DESKTOP
HOME TABLET
HOME MOBILE

Não confiar apenas no build.

Procurar:

texto cortado
imagem mal cropada
padding inconsistente
seção desalinhada
fontes erradas
CTAs quebrados
cards com altura ruim
overflow
hero mal enquadrado
menu sobreposto
footer quebrado.

Corrigir antes de finalizar.

==========================================================
47. REGRA DE QUALIDADE
==========================================================

Não quero simplesmente:

"uma landing page bonita".

Quero que uma pessoa entre no site e perceba:

"Existe história aqui."

"Existe autoridade aqui."

"Isso representa uma instituição."

"Napoleon Hill continua relevante."

"Quero conhecer essa filosofia."

"Quero saber quem representa isso no Brasil."

"Quero participar."

Essa percepção é o principal KPI do design.

==========================================================
48. ENTREGA FINAL
==========================================================

Quando finalizar, apresentar relatório contendo:

1. auditoria realizada;
2. arquitetura final;
3. páginas/rotas criadas;
4. seções implementadas;
5. componentes criados;
6. design tokens;
7. dependências adicionadas;
8. animações implementadas;
9. comportamento mobile;
10. SEO implementado;
11. SSR/prerender;
12. analytics preparado;
13. acessibilidade;
14. performance;
15. arquivos/configs que ainda precisam de dados oficiais;
16. assets que ainda precisam ser fornecidos;
17. TODOs;
18. resultado do build;
19. resultado dos testes;
20. próximos passos para produção.

==========================================================
49. RESULTADO ESPERADO
==========================================================

O resultado deve parecer um projeto desenvolvido por uma equipe formada por:

Senior Product Designer
+
Senior Frontend Engineer
+
Software Architect
+
Motion Designer
+
SEO Specialist.

Não entregar protótipo descartável.

Entregar código:

limpo
organizado
escalável
responsivo
acessível
performático
SEO-ready
production-ready.

==========================================================
50. OBJETIVO FINAL
==========================================================

Construir a principal experiência digital brasileira dedicada ao legado
e à filosofia de Napoleon Hill.

A percepção final deve ser:

THE NAPOLEON HILL FOUNDATION BRASIL

UM LEGADO QUE ATRAVESSOU GERAÇÕES.

O LEGADO CONTINUA.

Agora:

1. audite o projeto;
2. apresente resumidamente internamente o plano;
3. implemente seguindo as fases;
4. não pare para pedir confirmação a cada etapa;
5. tome decisões técnicas de nível sênior;
6. preserve tudo que já estiver correto;
7. finalize toda a landing;
8. execute os quality gates;
9. corrija os problemas encontrados;
10. entregue o relatório final.
```

## Adendo: mock visual (07/10/2026)

Três pranchas foram entregues: home desktop, páginas internas desktop (Fundação, Jamil,
Galeria, Vídeos, Contato) e versões mobile. Elas definiram:

- headline em caixa mista ("O sucesso / começa na mente."), com a segunda linha em dourado e um
  divisor curto abaixo;
- faixa de legado com ícones de linha, valor e rótulo de duas linhas;
- foto "Quem foi" em card arredondado e arquitetura esmaecida ao fundo;
- linha do tempo compacta em 4 marcos horizontais (1908, 1928, 1937, Hoje), com o livro
  *Think and Grow Rich* ao lado;
- 5 princípios em destaque como cards com ícone, com CTA para os 17;
- Fundação com checklist e prédio à direita; Brasil com Master Mind e São Paulo à noite;
- 6 formatos de programa em cards com ícone (no mobile, lista com chevron);
- newsletter compacta em linha; footer em 4 colunas com dados de contato; tab bar inferior no
  mobile.
