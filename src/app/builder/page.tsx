
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HierarchyInputs } from '@/components/ahp/HierarchyInputs';
import { PairwiseMatrix } from '@/components/ahp/PairwiseMatrix';
import { ResultsCharts } from '@/components/ahp/ResultsCharts';
import { calculateAHPWeights, synthesizeResults } from '@/lib/ahp-engine';
import { AHP_TEMPLATES } from '@/lib/templates';
import { ArrowLeft, Save, Play, ChevronRight, LayoutDashboard, Settings2, BarChart2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BuilderPage() {
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<string[]>(['Cost', 'Quality', 'Performance']);
  const [alternatives, setAlternatives] = useState<string[]>(['Option A', 'Option B']);
  
  // Matrix for criteria
  const [criteriaMatrix, setCriteriaMatrix] = useState<number[][]>([]);
  // Matrices for alternatives (one per criterion)
  const [alternativesMatrices, setAlternativesMatrices] = useState<number[][][]>([]);

  // Initialize matrices when criteria/alternatives change
  useEffect(() => {
    // Initial criteria matrix
    const newCriteriaMatrix = Array(criteria.length).fill(0).map((_, i) => 
      Array(criteria.length).fill(0).map((_, j) => (i === j ? 1 : 1))
    );
    setCriteriaMatrix(newCriteriaMatrix);

    // Initial alternatives matrices
    const newAltMatrices = criteria.map(() => 
      Array(alternatives.length).fill(0).map((_, i) => 
        Array(alternatives.length).fill(0).map((_, j) => (i === j ? 1 : 1))
      )
    );
    setAlternativesMatrices(newAltMatrices);
  }, [criteria.length, alternatives.length]);

  const updateCriteriaMatrix = (row: number, col: number, val: number) => {
    const next = [...criteriaMatrix.map(r => [...r])];
    next[row][col] = val;
    next[col][row] = 1 / val;
    setCriteriaMatrix(next);
  };

  const updateAlternativeMatrix = (criterionIdx: number, row: number, col: number, val: number) => {
    const nextAll = [...alternativesMatrices.map(m => m.map(r => [...r]))];
    const nextM = nextAll[criterionIdx];
    nextM[row][col] = val;
    nextM[col][row] = 1 / val;
    setAlternativesMatrices(nextAll);
  };

  const loadTemplate = (id: string) => {
    const template = AHP_TEMPLATES.find(t => t.id === id);
    if (template) {
      setCriteria(template.criteria);
      setAlternatives(template.alternatives);
      toast({
        title: "Template Loaded",
        description: `Loaded ${template.name} configuration.`,
      });
    }
  };

  // Calculations
  const criteriaResult = calculateAHPWeights(criteriaMatrix);
  const altsResults = alternativesMatrices.map(m => calculateAHPWeights(m));
  const finalScores = criteriaResult.weights.length > 0 && altsResults.length > 0
    ? synthesizeResults(criteriaResult.weights, altsResults.map(r => r.weights))
    : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/"><ArrowLeft className="w-5 h-5" /></Link>
            </Button>
            <div>
              <h1 className="text-xl font-headline font-bold text-primary">Decision Workspace</h1>
              <p className="text-xs text-muted-foreground">Analytic Hierarchy Process Studio</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => toast({title: "Coming Soon", description: "Export features are currently in development."})}>
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
            <div className="h-8 w-px bg-border mx-2 hidden sm:block" />
            <select 
              className="text-sm border rounded-md px-2 py-1 bg-white outline-none focus:ring-2 focus:ring-accent"
              onChange={(e) => loadTemplate(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Load a Template...</option>
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
            <TabsList className="grid grid-cols-3 w-full max-w-md bg-white border shadow-sm">
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

          <TabsContent value="structure" className="animate-in fade-in duration-500">
            <HierarchyInputs 
              criteria={criteria} 
              alternatives={alternatives} 
              onUpdate={(c, a) => { setCriteria(c); setAlternatives(a); }}
            />
          </TabsContent>

          <TabsContent value="compare" className="animate-in fade-in duration-500">
            <div className="grid lg:grid-cols-2 gap-8">
              <PairwiseMatrix 
                title="Criteria Comparison" 
                items={criteria} 
                matrix={criteriaMatrix} 
                onChange={updateCriteriaMatrix} 
              />
              <div className="space-y-8">
                <h2 className="text-2xl font-headline font-bold text-primary px-4">Alternatives Comparison</h2>
                <div className="max-h-[600px] overflow-y-auto pr-2 space-y-8 custom-scrollbar">
                  {criteria.map((criterion, idx) => (
                    <PairwiseMatrix 
                      key={idx}
                      title={`Relative Performance: ${criterion}`}
                      items={alternatives}
                      matrix={alternativesMatrices[idx] || []}
                      onChange={(r, c, v) => updateAlternativeMatrix(idx, r, c, v)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="animate-in fade-in duration-500">
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dominant Criterion</span>
                      <span className="font-bold text-accent">{criteria[criteriaResult.weights.indexOf(Math.max(...criteriaResult.weights))]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best Alternative</span>
                      <span className="font-bold text-accent">{alternatives[finalScores.indexOf(Math.max(...finalScores))]}</span>
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
          background: #F5F3F8;
          border-radius: 10px;
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
