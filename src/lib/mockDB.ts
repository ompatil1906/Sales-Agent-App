export type Email = {
  id: string;
  subject: string;
  sender: string;
  body: string;
  date: string;
};

export type CRMDeal = {
  id: string;
  companyName: string;
  value: number;
  stage: string;
  products: string[];
  contactName: string;
};

export const MOCK_EMAILS: Email[] = [
  {
    id: 'e1',
    subject: 'Re: Proposal for Q3 Cloud Migration',
    sender: 'Sarah Jenkins (Northstar)',
    date: '2026-01-14 10:30 AM',
    body: "Hi Team, just following up. We need to make sure the enterprise security module is included in the proposal. Acme Corp is really sensitive about data sovereignty.",
  },
  {
    id: 'e2',
    subject: 'FW: Pricing Update',
    sender: 'Dave from Product',
    date: '2026-01-12 02:15 PM',
    body: "Heads up, the Tier 1 Cloud Storage SKU price has increased to $12/user/month effective immediately. Please reflect this in new quotes.",
  }
];

export const MOCK_CRM_DEAL: CRMDeal = {
  id: 'd1',
  companyName: 'Acme Corp',
  value: 150000,
  stage: 'Proposal Generation',
  products: ['Cloud Storage Tier 1', 'Enterprise Security Module'],
  contactName: 'Sarah Jenkins',
};

export const MOCK_TEMPLATES = [
  { id: 't1', name: 'Standard SaaS Proposal', type: 'Word' },
  { id: 't2', name: 'Enterprise Enterprise Agreement', type: 'Word' },
];
