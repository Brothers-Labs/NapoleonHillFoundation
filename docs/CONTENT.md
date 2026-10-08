# Conteúdo: mapa, origem e pendências

Regra do projeto: **nenhuma informação institucional é inventada.** Cada dado tem uma origem
registrada abaixo. Tudo o que depende de confirmação está marcado no código com
`TODO: validar com Jamil Albuquerque antes da publicação`.

Para localizar todas as pendências:

```bash
grep -rn "TODO" src/app
```

## Origem dos dados

| Origem | Significado |
| --- | --- |
| **Histórico público** | Fatos amplamente documentados sobre Napoleon Hill (datas, obras) |
| **Mock 07/10/2026** | Texto ou dado presente no mock visual entregue pelo cliente |
| **Editorial** | Texto de apoio escrito para o site, sem afirmar fatos institucionais |

## Mapa de conteúdo

| Arquivo | Conteúdo | Origem | Status |
| --- | --- | --- | --- |
| `core/config/contact.config.ts` | 2 telefones, WhatsApp, e-mail, endereço (Av. Brigadeiro Faria Lima, 1572) e mapa | Mock | ⚠️ Validar |
| `core/config/social.config.ts` | Perfis em redes sociais | — | ❌ Vazio: o mock mostra os ícones, mas não as URLs |
| `core/config/site.config.ts` | Domínio, logo, imagem de compartilhamento, razão social | — | ❌ Pendente |
| `core/config/site.config.ts` | Site internacional (`naphill.org`) | Prompt do projeto | ⚠️ Validar |
| `data/home.data.ts` | Hero, newsletter, contato, CTA final | Mock + prompt | ⚠️ Validar ("apresentado oficialmente") |
| `data/napoleon-hill.data.ts` | Biografia, "mais de 500 empreendedores" | Mock + histórico | ⚠️ Validar |
| `data/napoleon-hill.data.ts` | Faixa de legado: "Presente em mais de 160 países" | Mock | ⚠️ Validar o número |
| `data/napoleon-hill.data.ts` | Linha do tempo: 1908, 1928, 1937, Hoje | Mock + histórico | ⚠️ Validar |
| `data/success-principles.data.ts` | 17 princípios (nome em português, original em inglês, resumo) | Histórico + editorial | ⚠️ Validar terminologia oficial |
| `data/institutional.data.ts` | Fundação: missão, checklist, 4 pilares | Mock | ⚠️ Validar |
| `data/institutional.data.ts` | Brasil: Master Mind – Treinamentos de Alta Performance, licenciamento oficial | Mock | ⚠️ Validar a terminologia do licenciamento |
| `data/jamil.data.ts` | Bio, cargo, números (30+, Milhares, 100+, 1) e frase | Mock | ⚠️ Validar e confirmar autoria da frase |
| `data/programs.data.ts` | 6 formatos (Treinamentos, Formações, Eventos, Palestras, Masterclasses, Certificações) | Mock | ⚠️ Validar; hoje levam a `/contato` |
| `data/books.data.ts` | 3 obras com títulos das edições brasileiras | Histórico | ⚠️ Validar autorização de uso |
| `data/media.data.ts` | Galeria | — | ❌ Vazia: fotos do mock são pequenas e não identificam eventos reais |
| `data/media.data.ts` | Vídeos | — | ❌ Vazio: o mock mostra títulos e durações, mas não as URLs |
| `data/media.data.ts` | Materiais para download | — | ❌ Vazio: o mock lista 4 materiais, mas não há arquivos |
| `data/legal.data.ts` | Política de Privacidade e Termos | Editorial (base LGPD) | ⚠️ Revisão jurídica obrigatória |
| `core/config/integrations.config.ts` | GA4, GTM, Meta Pixel, Clarity, endpoints de formulário | — | ❌ Pendente |

## Conteúdo do mock que ainda não foi publicado

Itens deixados de fora porque exigem um destino real, para não criar CTA quebrado:

| Item do mock | O que falta |
| --- | --- |
| Vídeos: "Os Princípios do Sucesso com Jamil Albuquerque" (12:45), "A Filosofia de Napoleon Hill na prática" (08:32), "Mastermind: O Poder da Mente em Grupo" (15:10), "Como Definir um Propósito Poderoso" (10:28), "Autodisciplina: A Chave para Grandes Conquistas" (09:15), "Entrevista Exclusiva com Jamil Albuquerque" (11:42) | URL do YouTube ou Vimeo, poster e data de publicação |
| Materiais: "Os 17 Princípios do Sucesso" (e-book, PDF, 24 páginas), "Como Desenvolver Disciplina" (guia, 18 páginas), "Planejamento de Metas" (checklist, 6 páginas), "O Poder do Propósito" (artigo, 12 páginas) | Arquivos PDF autorizados e capas |
| Galeria de fotos (eventos, treinamentos, palestras) | Fotos originais em alta resolução, com legenda |
| Botão "Assista ao vídeo" no hero | Vídeo institucional (`FEATURED_VIDEO`) |
| Botão de play na foto "Quem foi" | Vídeo correspondente |

Para publicar, basta preencher os arrays em `data/media.data.ts`: os componentes, o lightbox, o
modal de vídeo e os eventos de analytics já estão prontos.
