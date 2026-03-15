
"use client"

import React, { useRef, useEffect, useState } from 'react';

interface HierarchyDiagramProps {
  criteria: string[];
  criteriaWeights: number[];
  alternatives: string[];
  finalScores: number[];
  showWeights?: boolean;
}

interface Point {
  x: number;
  y: number;
}

export function HierarchyDiagram({ 
  criteria, 
  criteriaWeights, 
  alternatives, 
  finalScores,
  showWeights = true 
}: HierarchyDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);
  const criteriaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const alternativesRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [connections, setConnections] = useState<{
    goalToCriteria: { start: Point; end: Point }[];
    criteriaToAlternatives: { start: Point; end: Point }[];
  }>({ goalToCriteria: [], criteriaToAlternatives: [] });

  useEffect(() => {
    const updateLines = () => {
      if (!containerRef.current || !goalRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const getCenter = (el: HTMLElement, side: 'top' | 'bottom') => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: side === 'top' ? rect.top - containerRect.top : rect.bottom - containerRect.top,
        };
      };

      const goalBottom = getCenter(goalRef.current, 'bottom');

      const g2c = criteriaRefs.current
        .filter((ref): ref is HTMLDivElement => !!ref)
        .map(ref => ({
          start: goalBottom,
          end: getCenter(ref, 'top'),
        }));

      const c2a: { start: Point; end: Point }[] = [];
      criteriaRefs.current.forEach(cRef => {
        if (!cRef) return;
        const cBottom = getCenter(cRef, 'bottom');
        alternativesRefs.current.forEach(aRef => {
          if (!aRef) return;
          c2a.push({
            start: cBottom,
            end: getCenter(aRef, 'top'),
          });
        });
      });

      setConnections({ goalToCriteria: g2c, criteriaToAlternatives: c2a });
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    const observer = new ResizeObserver(updateLines);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', updateLines);
      observer.disconnect();
    };
  }, [criteria, alternatives]);

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
      
      <div ref={containerRef} className="relative flex flex-col items-center gap-24 py-4">
        {/* SVG Decorative Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#cbd5e1" />
            </marker>
          </defs>
          
          {/* Goal to Criteria Lines */}
          {connections.goalToCriteria.map((line, i) => (
            <line
              key={`g2c-${i}`}
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              stroke="#cbd5e1"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
          ))}
          
          {/* Criteria to Alternatives Lines */}
          {connections.criteriaToAlternatives.map((line, i) => (
            <line
              key={`c2a-${i}`}
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              stroke="#e2e8f0"
              strokeWidth="1"
              markerEnd="url(#arrowhead)"
              strokeDasharray="4 2"
            />
          ))}
        </svg>

        {/* Goal Layer */}
        <div className="relative z-10">
          <div ref={goalRef} className="bg-primary text-white px-8 py-4 rounded-xl shadow-lg font-bold text-center border-2 border-primary-foreground/20 min-w-[200px]">
            <div className="text-[10px] uppercase tracking-widest opacity-80 mb-1">The Goal</div>
            <div className="text-lg">Optimal Decision</div>
          </div>
        </div>

        {/* Criteria Layer */}
        <div className="grid grid-flow-col auto-cols-fr gap-4 w-full relative z-10">
          {criteria.map((c, i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                ref={el => { criteriaRefs.current[i] = el; }}
                className="bg-white border-2 border-primary/30 px-4 py-3 rounded-lg shadow-sm text-center w-full max-w-[160px] group hover:border-primary transition-colors bg-white/90 backdrop-blur-sm"
              >
                <div className="text-[9px] font-bold text-primary uppercase tracking-tighter mb-1">Criterion</div>
                <div className="font-bold text-sm truncate">{c}</div>
                {showWeights && (
                  <div className="inline-block mt-2 px-2 py-0.5 bg-primary/10 rounded text-[10px] font-bold text-primary">
                    {(criteriaWeights[i] * 100).toFixed(1)}%
                  </div>
                )}
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
                <div 
                  ref={el => { alternativesRefs.current[i] = el; }}
                  className={`
                    ${(isWinner && showWeights) ? 'bg-accent text-white shadow-accent/20 border-accent' : 'bg-white text-foreground border-slate-200'} 
                    px-4 py-3 rounded-lg shadow-md text-center w-full max-w-[160px] border-2 transition-all
                  `}
                >
                  <div className={`text-[9px] font-bold uppercase tracking-tighter mb-1 ${(isWinner && showWeights) ? 'opacity-80' : 'text-muted-foreground'}`}>
                    Alternative
                  </div>
                  <div className="font-bold text-sm truncate">{a}</div>
                  {showWeights && (
                    <div className={`
                      inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold
                      ${isWinner ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}
                    `}>
                      {(finalScores[i] * 100).toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 pt-6 border-t text-center">
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
          Synthesized priorities through pairwise comparison logic
        </p>
      </div>
    </div>
  );
}
