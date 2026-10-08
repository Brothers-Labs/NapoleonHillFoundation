# Deploy

## Build

```bash
npm ci
npm run build
```

Saída: `dist/napoleon-hill-foundation/browser/`, um site estático com uma pasta por rota
(`/fundacao/index.html`, `/filosofia/index.html`…) e `404/index.html`.

| Configuração | Valor |
| --- | --- |
| Comando de build | `npm run build` |
| Diretório de saída | `dist/napoleon-hill-foundation/browser` |
| Node | ≥ 24 |

## Hospedagem

Qualquer hospedagem estática serve. Pontos de atenção:

1. **404:** configurar a página de erro para `/404/index.html` com status 404.
2. **Cache:** arquivos `*.js` e `*.css` têm hash no nome e podem usar
   `Cache-Control: public, max-age=31536000, immutable`. Arquivos `*.html` devem usar
   `no-cache`.
3. **Barra final:** servir `/fundacao` a partir de `/fundacao/index.html` (comportamento padrão
   na Vercel, Netlify e Cloudflare Pages).

### Vercel

O Framework Preset "Angular" detecta o projeto. Se for preciso configurar à mão: Output
Directory `dist/napoleon-hill-foundation/browser`.

## Checklist de produção

- [ ] `SITE_CONFIG.siteUrl` definido (ativa canonical, `og:url` e `sitemap.xml`)
- [ ] `SITE_CONFIG.defaultShareImage` (1200×630) e `logo` oficiais
- [ ] Imagens recortadas do mock substituídas pelos originais ([ASSETS.md](ASSETS.md))
- [ ] Itens de [CONTENT.md](CONTENT.md) validados
- [ ] Endpoints de newsletter e contato configurados e testados
- [ ] IDs de analytics configurados e validados no Tag Assistant
- [ ] Revisão jurídica da Política de Privacidade e dos Termos
- [ ] Search Console verificado e sitemap enviado
- [ ] Lighthouse em produção (meta: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95)
