
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
    id: 'university-selection',
    name: 'University Choice',
    description: 'Decide which university to attend based on reputation, location, and tuition fees.',
    criteria: ['Reputation', 'Tuition', 'Location', 'Campus Life'],
    alternatives: ['State University', 'Private Ivy', 'Tech Institute'],
    criteriaMatrix: [
      [1, 3, 5, 7],
      [0.33, 1, 2, 4],
      [0.2, 0.5, 1, 2],
      [0.14, 0.25, 0.5, 1]
    ],
    alternativesMatrices: [
      // Reputation
      [[1, 0.2, 0.5], [5, 1, 3], [2, 0.33, 1]],
      // Tuition
      [[1, 5, 3], [0.2, 1, 0.5], [0.33, 2, 1]],
      // Location
      [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
      // Campus Life
      [[1, 0.5, 1], [2, 1, 2], [1, 0.5, 1]]
    ]
  },
  {
    id: 'smartphone-choice',
    name: 'Smartphone Purchase',
    description: 'Analyze different smartphone models based on camera quality, battery life, and brand value.',
    criteria: ['OS Ecosystem', 'Camera', 'Battery', 'Design'],
    alternatives: ['iPhone 15', 'Galaxy S24', 'Pixel 8'],
    criteriaMatrix: [
      [1, 2, 4, 6],
      [0.5, 1, 2, 4],
      [0.25, 0.5, 1, 2],
      [0.17, 0.25, 0.5, 1]
    ],
    alternativesMatrices: [
      // OS Ecosystem
      [[1, 3, 5], [0.33, 1, 2], [0.2, 0.5, 1]],
      // Camera
      [[1, 1, 0.5], [1, 1, 0.5], [2, 2, 1]],
      // Battery
      [[1, 0.5, 1], [2, 1, 2], [1, 0.5, 1]],
      // Design
      [[1, 2, 2], [0.5, 1, 1], [0.5, 1, 1]]
    ]
  }
];
