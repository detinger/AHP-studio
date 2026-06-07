
"use client"

import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const MIN_SLIDER_VALUE = -8;
const MAX_SLIDER_VALUE = 8;

const SCALE_DESCRIPTIONS: Record<number, string> = {
  1: 'Equal importance',
  2: 'Slight preference',
  3: 'Moderate preference',
  4: 'Moderate to strong preference',
  5: 'Strong preference',
  6: 'Strong to very strong preference',
  7: 'Very strong preference',
  8: 'Very strong to extreme preference',
  9: 'Extreme preference',
};

interface PairwiseMatrixProps {
  title: string;
  items: string[];
  matrix: number[][];
  onChange: (row: number, col: number, val: number) => void;
}

export function PairwiseMatrix({ title, items, matrix, onChange }: PairwiseMatrixProps) {
  const pairs: [number, number][] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      pairs.push([i, j]);
    }
  }

  const getSliderValue = (matrixValue: number) => {
    if (!Number.isFinite(matrixValue) || matrixValue <= 0 || matrixValue === 1) {
      return 0;
    }

    const sliderValue = matrixValue > 1
      ? -(Math.round(matrixValue) - 1)
      : Math.round(1 / matrixValue) - 1;

    return Math.max(MIN_SLIDER_VALUE, Math.min(MAX_SLIDER_VALUE, sliderValue));
  };

  const handleSliderChange = (row: number, col: number, sliderValue: number) => {
    if (sliderValue === 0) {
      onChange(row, col, 1);
      return;
    }

    const intensity = Math.abs(sliderValue) + 1;
    onChange(row, col, sliderValue < 0 ? intensity : 1 / intensity);
  };

  if (items.length < 2) {
    return (
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="py-12 text-center text-muted-foreground">
          Need at least 2 items to compare.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-0 overflow-hidden border bg-card/90 shadow-xl shadow-black/10">
      <CardHeader className="border-b border-border/70 bg-primary/5 px-4 sm:px-6">
        <CardTitle className="break-words font-headline text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription>Compare each pair to determine relative importance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-10 px-4 pt-6 sm:space-y-12 sm:px-6 sm:pt-8">
        {pairs.map(([i, j]) => {
          const matrixValue = matrix[i]?.[j] ?? 1;
          const sliderValue = getSliderValue(matrixValue);
          const intensity = Math.abs(sliderValue) + 1;
          const favoredItem = sliderValue < 0 ? items[i] : items[j];
          
          return (
            <div key={`${i}-${j}`} className="space-y-4">
              <div className="grid grid-cols-2 items-center gap-2 text-sm font-medium sm:grid-cols-[minmax(0,1fr)_minmax(10rem,1.5fr)_minmax(0,1fr)]">
                <div className={`min-w-0 break-words text-left ${sliderValue < 0 ? 'font-bold text-accent' : ''}`}>
                  {items[i]}
                </div>
                <div className="order-3 col-span-2 rounded-lg bg-secondary/50 px-3 py-1.5 text-center text-xs text-muted-foreground sm:order-none sm:col-span-1">
                  {sliderValue === 0
                    ? SCALE_DESCRIPTIONS[1]
                    : `${favoredItem}: ${intensity} - ${SCALE_DESCRIPTIONS[intensity]}`}
                </div>
                <div className={`min-w-0 break-words text-right ${sliderValue > 0 ? 'font-bold text-accent' : ''}`}>
                  {items[j]}
                </div>
              </div>
              <div className="relative px-1 sm:px-2">
                <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-primary/40" />
                <Slider
                  min={MIN_SLIDER_VALUE}
                  max={MAX_SLIDER_VALUE}
                  step={1}
                  value={[sliderValue]}
                  onValueChange={([value]) => handleSliderChange(i, j, value)}
                  aria-label={`Compare ${items[i]} with ${items[j]}`}
                  className="[&>span:first-child>span]:hidden [&_[role=slider]]:bg-accent"
                />
              </div>
              <div className="grid grid-cols-[repeat(17,minmax(0,1fr))] text-center text-[8px] text-muted-foreground sm:px-1 sm:text-[9px]">
                {Array.from({ length: 17 }, (_, index) => index - 8).map((value) => (
                  <span key={value} className={value === 0 ? 'font-bold text-primary' : ''}>
                    {value === 0 ? 0 : Math.abs(value) + 1}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2 px-1 text-[9px] leading-tight text-muted-foreground sm:text-[10px]">
                <div className="break-words">Extreme for {items[i]}</div>
                <div className="text-center">0 = equal</div>
                <div className="break-words text-right">Extreme for {items[j]}</div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
