
export interface AHPTemplate {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  alternatives: string[];
  criteriaMatrix: number[][];
  alternativesMatrices: number[][][]; // One matrix per criterion
}

export const AHP_TEMPLATES: AHPTemplate[] = [
  {
    id: 'cloud-selection',
    name: 'Cloud Provider Selection',
    description: 'A model to evaluate AWS, Azure, and Google Cloud based on performance, cost, and security.',
    criteria: ['Security', 'Performance', 'Cost', 'Ease of Use'],
    alternatives: ['AWS', 'Azure', 'Google Cloud'],
    criteriaMatrix: [
      [1, 2, 3, 5],      // Security vs others
      [0.5, 1, 2, 3],    // Performance vs others
      [0.33, 0.5, 1, 2], // Cost vs others
      [0.2, 0.33, 0.5, 1] // Ease of Use vs others
    ],
    alternativesMatrices: [
      // Security
      [[1, 1, 2], [1, 1, 2], [0.5, 0.5, 1]], 
      // Performance
      [[1, 2, 1], [0.5, 1, 0.5], [1, 2, 1]],
      // Cost
      [[1, 0.5, 0.33], [2, 1, 0.5], [3, 2, 1]],
      // Ease of Use
      [[1, 1, 2], [1, 1, 2], [0.5, 0.5, 1]]
    ]
  },
  {
    id: 'erp-system-selection',
    name: 'ERP System Selection',
    description: 'Compare enterprise resource planning platforms based on integration, cost, scalability, and implementation risk.',
    criteria: ['Integration', 'Total Cost', 'Scalability', 'Implementation Risk'],
    alternatives: ['SAP S/4HANA', 'Dynamics 365', 'Oracle NetSuite'],
    criteriaMatrix: [
      [1, 2, 4, 8],
      [1 / 2, 1, 2, 4],
      [1 / 4, 1 / 2, 1, 2],
      [1 / 8, 1 / 4, 1 / 2, 1]
    ],
    alternativesMatrices: [
      // Integration
      [[1, 2, 4], [1 / 2, 1, 2], [1 / 4, 1 / 2, 1]],
      // Total Cost
      [[1, 1 / 2, 1 / 4], [2, 1, 1 / 2], [4, 2, 1]],
      // Scalability
      [[1, 2, 4], [1 / 2, 1, 2], [1 / 4, 1 / 2, 1]],
      // Implementation Risk
      [[1, 1 / 2, 1 / 4], [2, 1, 1 / 2], [4, 2, 1]]
    ]
  },
  {
    id: 'bi-platform-selection',
    name: 'Business Intelligence Platform',
    description: 'Evaluate analytics platforms for usability, data connectivity, governance, and total cost.',
    criteria: ['Data Connectivity', 'Ease of Use', 'Governance', 'Total Cost'],
    alternatives: ['Power BI', 'Tableau', 'Looker'],
    criteriaMatrix: [
      [1, 2, 4, 8],
      [1 / 2, 1, 2, 4],
      [1 / 4, 1 / 2, 1, 2],
      [1 / 8, 1 / 4, 1 / 2, 1]
    ],
    alternativesMatrices: [
      // Data Connectivity
      [[1, 2, 4], [1 / 2, 1, 2], [1 / 4, 1 / 2, 1]],
      // Ease of Use
      [[1, 2, 4], [1 / 2, 1, 2], [1 / 4, 1 / 2, 1]],
      // Governance
      [[1, 1 / 2, 1 / 4], [2, 1, 1 / 2], [4, 2, 1]],
      // Total Cost
      [[1, 4, 2], [1 / 4, 1, 1 / 2], [1 / 2, 2, 1]]
    ]
  },
  {
    id: 'ai-development-platform',
    name: 'Strategic AI Platform Adoption',
    description: 'Choose an AI development platform based on capability, enterprise integration, governance, and total cost.',
    criteria: ['Technical Capability', 'Enterprise Integration', 'Governance & Security', 'Total Cost'],
    alternatives: ['Google Gemini', 'Anthropic Claude', 'OpenAI Codex'],
    criteriaMatrix: [
      [1, 2, 4, 8],
      [1 / 2, 1, 2, 4],
      [1 / 4, 1 / 2, 1, 2],
      [1 / 8, 1 / 4, 1 / 2, 1]
    ],
    alternativesMatrices: [
      // Technical Capability
      [[1, 1 / 2, 1 / 4], [2, 1, 1 / 2], [4, 2, 1]],
      // Enterprise Integration
      [[1, 4, 2], [1 / 4, 1, 1 / 2], [1 / 2, 2, 1]],
      // Governance & Security
      [[1, 1 / 2, 1], [2, 1, 2], [1, 1 / 2, 1]],
      // Total Cost
      [[1, 2, 4], [1 / 2, 1, 2], [1 / 4, 1 / 2, 1]]
    ]
  },
  {
    id: 'software-architecture-selection',
    name: 'Software Architecture Selection',
    description: 'Select an application architecture based on scalability, delivery speed, operability, and team capability.',
    criteria: ['Scalability', 'Delivery Speed', 'Operability', 'Team Capability'],
    alternatives: ['Modular Monolith', 'Microservices', 'Serverless'],
    criteriaMatrix: [
      [1, 2, 4, 8],
      [1 / 2, 1, 2, 4],
      [1 / 4, 1 / 2, 1, 2],
      [1 / 8, 1 / 4, 1 / 2, 1]
    ],
    alternativesMatrices: [
      // Scalability
      [[1, 1 / 4, 1 / 2], [4, 1, 2], [2, 1 / 2, 1]],
      // Delivery Speed
      [[1, 4, 2], [1 / 4, 1, 1 / 2], [1 / 2, 2, 1]],
      // Operability
      [[1, 4, 2], [1 / 4, 1, 1 / 2], [1 / 2, 2, 1]],
      // Team Capability
      [[1, 4, 2], [1 / 4, 1, 1 / 2], [1 / 2, 2, 1]]
    ]
  },
  {
    id: 'product-launch-strategy',
    name: 'Product Launch Strategy',
    description: 'Choose a launch approach for a new technology product based on learning, speed, risk, and market impact.',
    criteria: ['Customer Learning', 'Time to Market', 'Execution Risk', 'Market Impact'],
    alternatives: ['Private Beta', 'Phased Rollout', 'Full Launch'],
    criteriaMatrix: [
      [1, 2, 4, 8],
      [1 / 2, 1, 2, 4],
      [1 / 4, 1 / 2, 1, 2],
      [1 / 8, 1 / 4, 1 / 2, 1]
    ],
    alternativesMatrices: [
      // Customer Learning
      [[1, 2, 4], [1 / 2, 1, 2], [1 / 4, 1 / 2, 1]],
      // Time to Market
      [[1, 1 / 2, 1 / 4], [2, 1, 1 / 2], [4, 2, 1]],
      // Execution Risk
      [[1, 2, 4], [1 / 2, 1, 2], [1 / 4, 1 / 2, 1]],
      // Market Impact
      [[1, 1 / 2, 1 / 4], [2, 1, 1 / 2], [4, 2, 1]]
    ]
  }
];
