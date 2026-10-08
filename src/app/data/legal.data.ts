export interface LegalSection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
}

export interface LegalDocument {
  readonly lastUpdated: string;
  readonly sections: readonly LegalSection[];
}

/*
 * TODO: revisão jurídica obrigatória antes da publicação. Este texto é uma estrutura base
 * alinhada à LGPD (Lei nº 13.709/2018) e não substitui parecer de advogado. A identificação do
 * controlador vem de `SITE_CONFIG.legalEntityName` e do e-mail em `CONTACT_CONFIG`.
 */
export const PRIVACY_POLICY: LegalDocument = {
  lastUpdated: '2026-10-07',
  sections: [
    {
      id: 'scope',
      title: '1. Sobre esta política',
      paragraphs: [
        'Esta política explica quais dados pessoais coletamos neste site, para quais finalidades, com quem eles podem ser compartilhados e como você pode exercer os seus direitos, nos termos da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).',
      ],
    },
    {
      id: 'data',
      title: '2. Dados que coletamos',
      paragraphs: [
        'Dados fornecidos por você: nome, e-mail, WhatsApp (opcional), assunto e mensagem, quando você preenche os formulários de newsletter ou de contato.',
        'Dados de navegação: somente quando você autoriza cookies de análise ou de marketing, coletamos informações como páginas visitadas, tempo de permanência e interações com o site.',
      ],
    },
    {
      id: 'purposes',
      title: '3. Finalidades e bases legais',
      paragraphs: [
        'Enviar conteúdos, novidades e convites para eventos, com base no seu consentimento, que pode ser revogado a qualquer momento.',
        'Responder às mensagens enviadas pelo formulário de contato, com base no atendimento de solicitação do próprio titular.',
        'Entender como o site é utilizado para melhorar a experiência, com base no seu consentimento para cookies de análise.',
      ],
    },
    {
      id: 'cookies',
      title: '4. Cookies',
      paragraphs: [
        'Cookies necessários garantem o funcionamento básico do site e o registro das suas preferências de privacidade. Eles não podem ser desativados.',
        'Cookies de análise e de marketing só são carregados depois da sua autorização. Você pode alterar a sua escolha a qualquer momento pelo link “Preferências de cookies”, no rodapé.',
      ],
    },
    {
      id: 'sharing',
      title: '5. Compartilhamento',
      paragraphs: [
        'Os dados podem ser compartilhados com prestadores de serviço que operam em nosso nome, como ferramentas de e-mail, hospedagem e análise, sempre limitados às finalidades descritas nesta política.',
      ],
    },
    {
      id: 'rights',
      title: '6. Seus direitos',
      paragraphs: [
        'Você pode solicitar a confirmação da existência de tratamento, o acesso, a correção, a anonimização, a portabilidade e a eliminação dos seus dados, além de revogar o consentimento a qualquer momento.',
      ],
    },
    {
      id: 'retention',
      title: '7. Retenção e segurança',
      paragraphs: [
        'Mantemos os dados apenas pelo tempo necessário às finalidades informadas e adotamos medidas técnicas e administrativas para protegê-los contra acessos não autorizados.',
      ],
    },
  ],
};

// TODO: revisão jurídica obrigatória antes da publicação.
export const TERMS_OF_USE: LegalDocument = {
  lastUpdated: '2026-10-07',
  sections: [
    {
      id: 'acceptance',
      title: '1. Aceitação',
      paragraphs: [
        'Ao acessar este site, você concorda com estes termos. Se não concordar, recomendamos que não utilize o site.',
      ],
    },
    {
      id: 'content',
      title: '2. Conteúdo e propriedade intelectual',
      paragraphs: [
        'Textos, imagens, marcas e demais conteúdos publicados neste site são protegidos por direitos autorais e de propriedade intelectual e pertencem aos seus respectivos titulares.',
        'É proibida a reprodução, distribuição ou modificação do conteúdo sem autorização prévia e por escrito.',
      ],
    },
    {
      id: 'external-links',
      title: '3. Links externos',
      paragraphs: [
        'O site pode conter links para sites de terceiros. Não nos responsabilizamos pelo conteúdo ou pelas práticas de privacidade desses sites.',
      ],
    },
    {
      id: 'changes',
      title: '4. Alterações',
      paragraphs: [
        'Estes termos podem ser atualizados periodicamente. A data da última atualização é sempre informada nesta página.',
      ],
    },
  ],
};
