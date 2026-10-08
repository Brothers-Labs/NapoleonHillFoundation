# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [0.1.1] - 2026-10-08

### Alterado

- Retratos de Jamil Albuquerque substituídos por fotografias oficiais: retrato em estúdio
  (seção da home e hero da página dedicada) e versão quadrada para o JSON-LD `Person`.
- Seção Napoleon Hill no Brasil passa a exibir Jamil Albuquerque no palco de um evento da Master
  Mind, no lugar da fotografia de São Paulo recortada do mock.
- `package-lock.json` sincronizado com a versão e o campo `engines` do `package.json`.

### Removido

- Recortes do mock que representavam Jamil Albuquerque e a ponte de São Paulo.

## [0.1.0] - 2026-10-07

### Adicionado

- Projeto Angular 21.2 (standalone, zoneless, Signals) com prerender estático de 14 rotas.
- Home institucional completa no layout do mock: hero com fotografia e partículas em Three.js,
  faixa de legado, "Quem foi Napoleon Hill?", linha do tempo, princípios do sucesso, Fundação,
  Napoleon Hill no Brasil, Jamil Albuquerque, programas, "O legado continua." e newsletter.
- Páginas internas: Napoleon Hill, Fundação, Filosofia, Brasil, Jamil Albuquerque, Programas,
  Galeria, Vídeos, Materiais, Contato, Privacidade, Termos e 404.
- Design system com tokens, temas de seção, tipografia Cormorant Garamond + Inter e botões.
- Header transparente → sólido no scroll, item ativo por seção, dropdown acessível, menu mobile
  em tela cheia e tab bar inferior no mobile.
- Motion com GSAP sob demanda (reveal, parallax, linha do tempo), respeitando
  `prefers-reduced-motion` e com cleanup garantido.
- SEO: metadados por rota, OpenGraph, Twitter Card, JSON-LD, gerador de `robots.txt` e
  `sitemap.xml`.
- Analytics desacoplado (GA4, GTM, Meta Pixel, Clarity) carregado só após consentimento LGPD.
- Formulários de newsletter e contato com validação, honeypot e serviço pronto para API.
- 72 testes unitários, ESLint com regras de acessibilidade e documentação em `docs/`.
