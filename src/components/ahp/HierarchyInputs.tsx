
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, X, BrainCircuit, ListTree } from 'lucide-react';

interface HierarchyInputsProps {
  criteria: string[];
  alternatives: string[];
  onUpdate: (criteria: string[], alternatives: string[]) => void;
}

export function HierarchyInputs({ criteria, alternatives, onUpdate }: HierarchyInputsProps) {
  const [newCriterion, setNewCriterion] = useState('');
  const [newAlternative, setNewAlternative] = useState('');

  const addCriterion = () => {
    if (newCriterion && !criteria.includes(newCriterion)) {
      onUpdate([...criteria, newCriterion], alternatives);
      setNewCriterion('');
    }
  };

  const removeCriterion = (index: number) => {
    onUpdate(criteria.filter((_, i) => i !== index), alternatives);
  };

  const addAlternative = () => {
    if (newAlternative && !alternatives.includes(newAlternative)) {
      onUpdate(criteria, [...alternatives, newAlternative]);
      setNewAlternative('');
    }
  };

  const removeAlternative = (index: number) => {
    onUpdate(criteria, alternatives.filter((_, i) => i !== index));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="border-none shadow-md bg-white">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <ListTree className="text-primary w-5 h-5" />
            <CardTitle className="font-headline">Decision Criteria</CardTitle>
          </div>
          <CardDescription>What factors are important for this decision?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input 
              placeholder="e.g., Cost, Quality..." 
              value={newCriterion} 
              onChange={(e) => setNewCriterion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCriterion()}
            />
            <Button onClick={addCriterion} size="icon"><Plus className="w-4 h-4" /></Button>
          </div>
          <div className="space-y-2">
            {criteria.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg group">
                <span className="font-medium">{c}</span>
                <Button variant="ghost" size="icon" onClick={() => removeCriterion(i)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
            {criteria.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Add at least 2 criteria</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit className="text-accent w-5 h-5" />
            <CardTitle className="font-headline">Alternatives</CardTitle>
          </div>
          <CardDescription>What are the available choices to evaluate?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input 
              placeholder="e.g., Project A, Option B..." 
              value={newAlternative} 
              onChange={(e) => setNewAlternative(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addAlternative()}
            />
            <Button onClick={addAlternative} size="icon" className="bg-accent hover:bg-accent/90">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {alternatives.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-accent/10 rounded-lg group">
                <span className="font-medium">{a}</span>
                <Button variant="ghost" size="icon" onClick={() => removeAlternative(i)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
            {alternatives.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Add at least 2 alternatives</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
