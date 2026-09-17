/* Structured data so search engines and AI assistants describe KALEOS the
   same way the site does. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KALEOS',
  alternateName: 'Kaleos HQ',
  url: 'https://www.kaleoshq.com',
  logo: 'https://www.kaleoshq.com/kaleos-k.png',
  slogan: 'AI that answers to you.',
  description: 'A premium AI implementation practice. KALEOS designs and ships custom AI systems for businesses, with a person approving every consequential step.',
  founder: { '@type': 'Person', name: 'Logan Kay' },
  email: 'logan@kaleoshq.com',
  sameAs: ['https://www.linkedin.com/company/joinkaleoshq/', 'https://x.com/KaleosHQ'],
}

export const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI implementation consulting',
  provider: { '@type': 'Organization', name: 'KALEOS', url: 'https://www.kaleoshq.com' },
  areaServed: 'United States',
  description: 'Workflow mapping, system design, and deployment of custom AI systems with human approval and audit logging built in.',
  url: 'https://www.kaleoshq.com/audit',
}
