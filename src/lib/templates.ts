
export interface AHPTemplate {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  alternatives: string[];
}

export const AHP_TEMPLATES: AHPTemplate[] = [
  {
    id: 'cloud-selection',
    name: 'Cloud Provider Selection',
    description: 'A model to evaluate AWS, Azure, and Google Cloud based on performance, cost, and security.',
    criteria: ['Cost', 'Performance', 'Security', 'Ease of Use'],
    alternatives: ['AWS', 'Azure', 'Google Cloud'],
  },
  {
    id: 'university-selection',
    name: 'University Choice',
    description: 'Decide which university to attend based on reputation, location, and tuition fees.',
    criteria: ['Academic Reputation', 'Location', 'Tuition Fees', 'Campus Life'],
    alternatives: ['State University', 'Private Ivy', 'Tech Institute'],
  },
  {
    id: 'smartphone-choice',
    name: 'Smartphone Purchase',
    description: 'Analyze different smartphone models based on camera quality, battery life, and brand value.',
    criteria: ['Camera', 'Battery', 'Design', 'OS Ecosystem'],
    alternatives: ['iPhone 15', 'Galaxy S24', 'Pixel 8'],
  }
];
