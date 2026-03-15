
"use client"

import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info } from 'lucide-react';

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

  const getSliderValue = (val: number) => {
    if (val >= 1) return val;
    return -(1 / val);
  };

  const handleSliderChange = (row: number, col: number, sliderVal: number) => {
    let matrixVal: number;
    if (sliderVal >= 1) {
      matrixVal = sliderVal;
    } else if (sliderVal === 0) {
      matrixVal = 1; // Though slider starts at 1 usually
    } else {
      matrixVal = 1 / Math.abs(sliderVal);
    }
    onChange(row, col, matrixVal);
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
    <Card className="border-none shadow-lg bg-white overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
        <CardDescription>Compare each pair to determine relative importance.</CardDescription>
      </CardHeader>
      <CardContent className="pt-8 space-y-12">
        {pairs.map(([i, j]) => {
          const val = matrix[i][j];
          const displayVal = getSliderValue(val);
          
          return (
            <div key={`${i}-${j}`} className="space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <div className={`flex-1 text-left ${displayVal > 1 ? 'text-accent font-bold scale-110 transition-all' : ''}`}>
                  {items[i]}
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground bg-secondary/50 py-1 px-3 rounded-full">
                  {val >= 1 ? `${val.toFixed(0)}x Stronger` : `${(1/val).toFixed(0)}x Weaker`}
                </div>
                <div className={`flex-1 text-right ${displayVal < -1 ? 'text-accent font-bold scale-110 transition-all' : ''}`}>
                  {items[j]}
                </div>
              </div>
              <div className="px-2">
                <Slider
                  min={-9}
                  max={9}
                  step={1}
                  value={[displayVal === 0 ? 1 : displayVal]}
                  onValueChange={(vals) => {
                    let v = vals[0];
                    if (v === 0) v = 1; // Snap to equal
                    handleSliderChange(i, j, v);
                  }}
                  className="[&_[role=slider]]:bg-accent"
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                <span>Strongly Prefer Left</span>
                <span>Equal</span>
                <span>Strongly Prefer Right</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
