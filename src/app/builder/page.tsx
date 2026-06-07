
"use client"

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HierarchyInputs } from '@/components/ahp/HierarchyInputs';
import { PairwiseMatrix } from '@/components/ahp/PairwiseMatrix';
import { ResultsCharts } from '@/components/ahp/ResultsCharts';
import { HierarchyDiagram } from '@/components/ahp/HierarchyDiagram';
import { calculateAHPWeights, synthesizeResults } from '@/lib/ahp-engine';
import { AHP_TEMPLATES } from '@/lib/templates';
import { ChevronRight, Settings2, BarChart2, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function BuilderContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  
  const [criteria, setCriteria] = useState<string[]>([]);
  const [alternatives, setAlternatives] = useState<string[]>([]);
  
  const [criteriaMatrix, setCriteriaMatrix] = useState<number[][]>([]);
  const [alternativesMatrices, setAlternativesMatrices] = useState<number[][][]>([]);

  // Initialize empty matrices only if they don't match dimensions
  useEffect(() => {
    const nC = criteria.length;
    const nA = alternatives.length;

    if (criteriaMatrix.length !== nC) {
      const newCriteriaMatrix = Array(nC).fill(0).map((_, i) => 
        Array(nC).fill(0).map((_, j) => (i === j ? 1 : 1))
      );
      setCriteriaMatrix(newCriteriaMatrix);
    }

    if (alternativesMatrices.length !== nC || (alternativesMatrices[0]?.length !== nA)) {
      const newAltMatrices = Array(nC).fill(0).map(() => 
        Array(nA).fill(0).map((_, i) => 
          Array(nA).fill(0).map((_, j) => (i === j ? 1 : 1))
        )
      );
      setAlternativesMatrices(newAltMatrices);
    }
  }, [criteria.length, alternatives.length]);

  const loadTemplate = (id: string) => {
    const template = AHP_TEMPLATES.find(t => t.id === id);
    if (template) {
      setCriteria(template.criteria);
      setAlternatives(template.alternatives);
      setCriteriaMatrix(template.criteriaMatrix);
      setAlternativesMatrices(template.alternativesMatrices);

      toast({
        title: "Template Loaded",
        description: `Loaded ${template.name} with consistent priority data.`,
      });
    }
  };

  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
    }
  }, [templateId]);

  const updateCriteriaMatrix = (row: number, col: number, val: number) => {
    const next = [...criteriaMatrix.map(r => [...r])];
    next[row][col] = val;
    next[col][row] = 1 / val;
    setCriteriaMatrix(next);
  };

  const updateAlternativeMatrix = (criterionIdx: number, row: number, col: number, val: number) => {
    const nextAll = [...alternativesMatrices.map(m => m.map(r => [...r]))];
    const nextM = nextAll[criterionIdx];
    if (nextM) {
      nextM[row][col] = val;
      nextM[col][row] = 1 / val;
      setAlternativesMatrices(nextAll);
    }
  };

  // Calculations
  const criteriaResult = calculateAHPWeights(criteriaMatrix);
  const altsResults = alternativesMatrices.map(m => calculateAHPWeights(m));
  
  const hasValidResults = criteria.length > 0 &&
                          alternatives.length > 0 &&
                          criteriaResult.weights.length === criteria.length &&
                          altsResults.length === criteria.length &&
                          altsResults.every(r => r.weights.length === alternatives.length);

  const finalScores = hasValidResults
    ? synthesizeResults(criteriaResult.weights, altsResults.map(r => r.weights))
    : Array(alternatives.length).fill(0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            href="/"
            aria-label="Return to AHP Studio home"
            className="group flex items-center gap-2 rounded-xl border border-transparent px-2 py-1 outline-none transition-colors duration-200 hover:border-primary/30 hover:bg-primary/10 hover:shadow-[0_0_24px_hsl(var(--primary)/0.12)] focus-visible:border-primary/40 focus-visible:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30 transition-colors group-hover:bg-primary/25 group-hover:ring-primary/50">
                <BrainCircuit className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-headline font-bold text-primary">AHP Studio</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Decision Support</p>
              </div>
          </Link>
          <div className="flex gap-2">
            <select 
              className="max-w-[11rem] cursor-pointer rounded-md border bg-card px-3 py-1.5 text-sm text-foreground outline-none transition-colors hover:bg-secondary focus:ring-2 focus:ring-primary sm:max-w-none"
              onChange={(e) => loadTemplate(e.target.value)}
              value={templateId || ""}
            >
              <option value="" disabled>Select Example Template...</option>
              {AHP_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <Tabs defaultValue="structure" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 border bg-card/80 p-1 shadow-xl shadow-black/10 backdrop-blur">
              <TabsTrigger value="structure" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Settings2 className="w-4 h-4 mr-2" /> Structure
              </TabsTrigger>
              <TabsTrigger value="compare" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ChevronRight className="w-4 h-4 mr-2" /> Compare
              </TabsTrigger>
              <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BarChart2 className="w-4 h-4 mr-2" /> Results
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="structure" className="animate-in fade-in duration-500 outline-none">
            <HierarchyInputs 
              criteria={criteria} 
              alternatives={alternatives} 
              onUpdate={(c, a) => { setCriteria(c); setAlternatives(a); }}
            />
          </TabsContent>

          <TabsContent value="compare" className="animate-in fade-in duration-500 outline-none">
            <div className="space-y-10">
              <PairwiseMatrix 
                title="Criteria Comparison" 
                items={criteria} 
                matrix={criteriaMatrix} 
                onChange={updateCriteriaMatrix} 
              />
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-headline font-bold text-primary">Relative Performance</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Compare the alternatives separately for each criterion.
                  </p>
                </div>
                <div className="grid gap-8 xl:grid-cols-2">
                  {criteria.map((criterion, idx) => (
                    <PairwiseMatrix 
                      key={idx}
                      title={`${criterion} Evaluation`}
                      items={alternatives}
                      matrix={alternativesMatrices[idx] || []}
                      onChange={(r, c, v) => updateAlternativeMatrix(idx, r, c, v)}
                    />
                  ))}
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="results" className="animate-in fade-in duration-500 outline-none space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <ResultsCharts 
                title="Final Ranked Results" 
                labels={alternatives} 
                weights={finalScores} 
              />
              <div className="space-y-6">
                <ResultsCharts 
                  title="Criteria Contribution" 
                  labels={criteria} 
                  weights={criteriaResult.weights}
                  cr={criteriaResult.consistencyRatio}
                />
                
                <div className="rounded-xl border bg-card p-6 shadow-lg shadow-black/10">
                  <h3 className="font-headline font-bold text-lg mb-4 text-primary">Synthesis Summary</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                      <span className="text-muted-foreground">Highest Weighted Factor</span>
                      <span className="font-bold text-primary uppercase text-xs">
                        {criteria.length > 0 ? criteria[criteriaResult.weights.indexOf(Math.max(...criteriaResult.weights))] : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg border border-accent/10">
                      <span className="text-muted-foreground">Optimal Alternative</span>
                      <span className="font-bold text-accent uppercase text-xs">
                        {alternatives.length > 0 ? alternatives[finalScores.indexOf(Math.max(...finalScores))] : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hierarchy Diagram Component */}
            <HierarchyDiagram 
              criteria={criteria}
              criteriaWeights={criteriaResult.weights}
              alternatives={alternatives}
              finalScores={finalScores}
            />
          </TabsContent>
        </Tabs>
      </main>

    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Initializing AHP Studio...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
