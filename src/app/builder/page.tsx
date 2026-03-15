
"use client"

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HierarchyInputs } from '@/components/ahp/HierarchyInputs';
import { PairwiseMatrix } from '@/components/ahp/PairwiseMatrix';
import { ResultsCharts } from '@/components/ahp/ResultsCharts';
import { calculateAHPWeights, synthesizeResults } from '@/lib/ahp-engine';
import { AHP_TEMPLATES } from '@/lib/templates';
import { ArrowLeft, ChevronRight, Settings2, BarChart2, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function BuilderContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  
  const [criteria, setCriteria] = useState<string[]>(['Security', 'Performance', 'Cost']);
  const [alternatives, setAlternatives] = useState<string[]>(['Option A', 'Option B']);
  
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
      // Set structure first
      setCriteria(template.criteria);
      setAlternatives(template.alternatives);
      
      // Immediately set the loaded matrices
      setCriteriaMatrix(template.criteriaMatrix);
      setAlternativesMatrices(template.alternativesMatrices);

      toast({
        title: "Template Loaded",
        description: `Loaded ${template.name} with pre-calculated decisions.`,
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
  
  const hasValidResults = criteriaResult.weights.length === criteria.length && 
                          altsResults.length === criteria.length &&
                          altsResults.every(r => r.weights.length === alternatives.length);

  const finalScores = hasValidResults
    ? synthesizeResults(criteriaResult.weights, altsResults.map(r => r.weights))
    : Array(alternatives.length).fill(0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/"><ArrowLeft className="w-5 h-5" /></Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <BrainCircuit className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-headline font-bold text-primary">AHP Studio</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Analytic Hierarchy Process</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              className="text-sm border rounded-md px-3 py-1.5 bg-white outline-none focus:ring-2 focus:ring-accent cursor-pointer hover:bg-secondary/10 transition-colors"
              onChange={(e) => loadTemplate(e.target.value)}
              value={templateId || ""}
            >
              <option value="" disabled>Load Example Template...</option>
              {AHP_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <Tabs defaultValue="results" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-3 w-full max-w-md bg-white border shadow-sm p-1">
              <TabsTrigger value="structure" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Settings2 className="w-4 h-4 mr-2" /> Structure
              </TabsTrigger>
              <TabsTrigger value="compare" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <ChevronRight className="w-4 h-4 mr-2" /> Compare
              </TabsTrigger>
              <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-white">
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
            <div className="grid lg:grid-cols-2 gap-8">
              <PairwiseMatrix 
                title="Criteria Comparison" 
                items={criteria} 
                matrix={criteriaMatrix} 
                onChange={updateCriteriaMatrix} 
              />
              <div className="space-y-8">
                <h2 className="text-2xl font-headline font-bold text-primary px-4">Relative Performance</h2>
                <div className="max-h-[700px] overflow-y-auto pr-2 space-y-8 custom-scrollbar">
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="animate-in fade-in duration-500 outline-none">
            <div className="grid lg:grid-cols-2 gap-8">
              <ResultsCharts 
                title="Final Recommendation" 
                labels={alternatives} 
                weights={finalScores} 
              />
              <div className="space-y-6">
                <ResultsCharts 
                  title="Criteria Priorities" 
                  labels={criteria} 
                  weights={criteriaResult.weights}
                  cr={criteriaResult.consistencyRatio}
                />
                
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <h3 className="font-headline font-bold text-lg mb-4 text-primary">Analysis Summary</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                      <span className="text-muted-foreground">Dominant Criterion</span>
                      <span className="font-bold text-primary">
                        {criteria.length > 0 ? criteria[criteriaResult.weights.indexOf(Math.max(...criteriaResult.weights))] : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg border border-accent/10">
                      <span className="text-muted-foreground">Best Alternative</span>
                      <span className="font-bold text-accent">
                        {alternatives.length > 0 ? alternatives[finalScores.indexOf(Math.max(...finalScores))] : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #72518133;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #72518155;
        }
      `}</style>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading AHP Studio...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
