
export type ComparisonMatrix = number[][];

export interface AHPResult {
  weights: number[];
  consistencyRatio: number;
  consistencyIndex: number;
  lambdaMax: number;
}

const RANDOM_INDEX: Record<number, number> = {
  1: 0.0,
  2: 0.0,
  3: 0.58,
  4: 0.9,
  5: 1.12,
  6: 1.24,
  7: 1.32,
  8: 1.41,
  9: 1.45,
  10: 1.49,
};

export function calculateAHPWeights(matrix: ComparisonMatrix): AHPResult {
  const n = matrix.length;
  if (n === 0) return { weights: [], consistencyRatio: 0, consistencyIndex: 0, lambdaMax: 0 };

  // Step 1: Normalize Matrix
  const columnSums = new Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      columnSums[j] += matrix[i][j];
    }
  }

  const normalizedMatrix: ComparisonMatrix = matrix.map((row) =>
    row.map((val, j) => val / columnSums[j])
  );

  // Step 2: Average Rows for Weights
  const weights = normalizedMatrix.map(
    (row) => row.reduce((a, b) => a + b, 0) / n
  );

  // Step 3: Consistency Calculation
  // Calculate Ax (Matrix * Weights vector)
  const Ax = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      Ax[i] += matrix[i][j] * weights[j];
    }
  }

  // lambdaMax = average of (Ax_i / weights_i)
  const lambdas = Ax.map((val, i) => val / weights[i]);
  const lambdaMax = lambdas.reduce((a, b) => a + b, 0) / n;

  const consistencyIndex = (lambdaMax - n) / (n - 1 || 1);
  const ri = RANDOM_INDEX[n] || 1.49;
  const consistencyRatio = n <= 2 ? 0 : consistencyIndex / ri;

  return {
    weights,
    consistencyRatio,
    consistencyIndex,
    lambdaMax,
  };
}

export function synthesizeResults(
  criteriaWeights: number[],
  alternativesWeights: number[][] // criteria index -> alternative weights
): number[] {
  const nCriteria = criteriaWeights.length;
  const nAlternatives = alternativesWeights[0].length;
  const finalScores = new Array(nAlternatives).fill(0);

  for (let i = 0; i < nAlternatives; i++) {
    for (let j = 0; j < nCriteria; j++) {
      finalScores[i] += alternativesWeights[j][i] * criteriaWeights[j];
    }
  }

  return finalScores;
}
