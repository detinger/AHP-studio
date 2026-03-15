
"use client"

import React from 'react';

interface HierarchyDiagramProps {
  criteria: string[];
  criteriaWeights: number[];
  alternatives: string[];
  finalScores: number[];
}

export function HierarchyDiagram({ criteria, criteriaWeights, alternatives, finalScores }: HierarchyDiagramProps) {
  if (criteria.length === 0 || alternatives.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white p-8 rounded-xl border shadow-sm overflow-hidden mt-8">
      <div className="flex items-center justify-between mb-10 border-b pb-4">
        <div>
          <h3 className="font-headline font-bold text-xl text-primary">Decision Hierarchy Model</h3>
          <p className="text-sm text-muted-foreground">Visualizing the flow of priorities from Goal to Alternatives</p>
        </div>
        <div className="flex gap-4 text-[10px] uppercase font-bold tracking-wider">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span>Goal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-white border border-primary rounded-sm"></div>
            <span>Criteria</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-accent rounded-sm"></div>
            <span>Alternatives</span>
          </div>
        </div>
      </div>
      
      <div className="relative flex flex-col items-center gap-20">
        {/* Goal Layer */}
        <div className="relative z-10">
          <div className="bg-primary text-white px-8 py-4 rounded-xl shadow-lg font-bold text-center border-2 border-primary-foreground/20 min-w-[200px]">
            <div className="text-[10px] uppercase tracking-widest opacity-80 mb-1">The Goal</div>
            <div className="text-lg">Optimal Decision</div>
          </div>
        </div>

        {/* Criteria Layer */}
        <div className="grid grid-flow-col auto-cols-fr gap-4 w-full relative z-10">
          {criteria.map((c, i) => (
            <div key={i} className="flex flex-col items-center relative">
              {/* Connecting line to Goal (Visual only via CSS) */}
              <div className="bg-white border-2 border-primary/30 px-4 py-3 rounded-lg shadow-sm text-center w-full max-w-[160px] group hover:border-primary transition-colors">
                <div className="text-[9px] font-bold text-primary uppercase tracking-tighter mb-1">Criterion</div>
                <div className="font-bold text-sm truncate">{c}</div>
                <div className="inline-block mt-2 px-2 py-0.5 bg-primary/10 rounded text-[10px] font-bold text-primary">
                  {(criteriaWeights[i] * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alternatives Layer */}
        <div className="grid grid-flow-col auto-cols-fr gap-4 w-full relative z-10">
          {alternatives.map((a, i) => {
            const isWinner = finalScores[i] === Math.max(...finalScores);
            return (
              <div key={i} className="flex flex-col items-center">
                <div className={`
                  ${isWinner ? 'bg-accent text-white shadow-accent/20 border-accent' : 'bg-white text-foreground border-slate-200'} 
                  px-4 py-3 rounded-lg shadow-md text-center w-full max-w-[160px] border-2 transition-all
                `}>
                  <div className={`text-[9px] font-bold uppercase tracking-tighter mb-1 ${isWinner ? 'opacity-80' : 'text-muted-foreground'}`}>
                    Alternative
                  </div>
                  <div className="font-bold text-sm truncate">{a}</div>
                  <div className={`
                    inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold
                    ${isWinner ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}
                  `}>
                    {(finalScores[i] * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SVG Decorative Background Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" style={{ zIndex: 0 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
            </marker>
          </defs>
          {/* We use CSS/Flex for alignment, SVG lines for that classic AHP 'web' look */}
          <rect width="100%" height="100%" fill="none" />
        </svg>
      </div>

      <div className="mt-12 pt-6 border-t text-center">
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
          Synthesized priorities through pairwise comparison logic
        </p>
      </div>
    </div>
  );
}
