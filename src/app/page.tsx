
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calculator, LineChart, ShieldCheck, ArrowRight, BrainCircuit, Zap, Target, Layers } from 'lucide-react';
import { AHP_TEMPLATES } from '@/lib/templates';
import { HierarchyDiagram } from '@/components/ahp/HierarchyDiagram';

export default function Home() {
  // Abstract labels for the landing page diagram
  const abstractCriteria = ['Criterion 1', 'Criterion 2', 'Criterion 3', 'Criterion 4', 'Criterion 5'];
  const abstractWeights = [0.2, 0.2, 0.2, 0.2, 0.2];
  const abstractAlternatives = ['Alternative A', 'Alternative B', 'Alternative C'];
  const abstractScores = [0.33, 0.33, 0.34];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/70 py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div className="container mx-auto px-4 text-center">
            <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-[2.25rem] bg-primary/15 ring-1 ring-primary/40 shadow-[0_0_76px_hsl(var(--primary)/0.24)] md:h-36 md:w-36">
              <BrainCircuit className="h-16 w-16 text-primary md:h-[4.5rem] md:w-[4.5rem]" />
            </div>
            <h1 className="relative mx-auto mb-6 max-w-4xl text-6xl font-bold leading-tight tracking-tight text-foreground md:text-8xl">
              AHP Studio
            </h1>
            <p className="relative mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Design and analyze complex decisions using the Analytic Hierarchy Process. 
              Decompose problems, quantify judgments, and reach logically consistent conclusions.
            </p>
            <div className="relative flex justify-center">
              <Button size="lg" className="bg-primary px-8 text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.2)] hover:bg-primary/90" asChild>
                <Link href="/builder">Launch Workspace <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* The Model Visualization */}
        <section className="border-b border-border/60 bg-card/30 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-headline font-bold text-primary mb-4">The AHP Structural Logic</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                AHP transforms complex, multi-criteria problems into a hierarchical structure, allowing you to focus on one relationship at a time.
              </p>
            </div>
            <div className="w-full">
              <HierarchyDiagram 
                criteria={abstractCriteria}
                criteriaWeights={abstractWeights}
                alternatives={abstractAlternatives}
                finalScores={abstractScores}
                showWeights={false}
              />
            </div>
          </div>
        </section>

        {/* Deep Dive Content */}
        <section className="border-b border-border/60 py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-headline font-bold text-primary mb-6">How AHP Works</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Developed by Dr. Thomas Saaty, AHP is a mathematical framework for decision-making that mirrors the way the human brain processes complex information. It doesn't just "calculate" a result; it structures your intuition.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-5">
                    <div className="mt-1 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Layers className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">1. Hierarchical Decomposition</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        The decision goal is placed at the top, followed by a level of criteria that influence the goal. At the bottom are the alternatives. This decomposition allows decision-makers to focus on small sets of related variables rather than the overwhelming whole.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="mt-1 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <Calculator className="text-accent w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">2. Pairwise Comparison & Scaling</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Instead of assigning arbitrary weights (e.g., "60% for cost"), AHP uses pairwise comparisons. You compare only two elements at a time. This significantly reduces the cognitive load and increases the accuracy of human judgment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="mt-1 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Target className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">3. The Eigenvector Method</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Mathematically, AHP uses the principal eigenvector of the comparison matrix to derive priority weights. This captures the "dominance" of each element in the set, providing a robust and scientifically sound priority ranking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-10">
                <h3 className="text-2xl font-headline font-bold mb-6 text-primary">The Fundamental 1-9 Scale</h3>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  The scale below is based on psychological research into the limits of human perception. It allows for nuanced, qualitative judgments to be converted into quantitative values.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground font-medium">
                        <th className="py-3 px-2">Intensity</th>
                        <th className="py-3 px-2">Definition</th>
                        <th className="py-3 px-2">Explanation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-4 px-2 font-bold text-primary">1</td>
                        <td className="py-4 px-2 font-medium">Equal</td>
                        <td className="py-4 px-2 text-xs text-muted-foreground">Both elements contribute equally to the objective.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-bold text-primary">3</td>
                        <td className="py-4 px-2 font-medium">Moderate</td>
                        <td className="py-4 px-2 text-xs text-muted-foreground">Experience and judgment slightly favor one over another.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-bold text-primary">5</td>
                        <td className="py-4 px-2 font-medium">Strong</td>
                        <td className="py-4 px-2 text-xs text-muted-foreground">Experience and judgment strongly favor one over another.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-bold text-primary">7</td>
                        <td className="py-4 px-2 font-medium">Very Strong</td>
                        <td className="py-4 px-2 text-xs text-muted-foreground">An element is favored very strongly; its dominance is demonstrated in practice.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2 font-bold text-primary">9</td>
                        <td className="py-4 px-2 font-medium">Extreme</td>
                        <td className="py-4 px-2 text-xs text-muted-foreground">The evidence favoring one element over another is of the highest possible order of affirmation.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-4 bg-secondary/20 rounded-xl text-[11px] text-muted-foreground">
                  Note: Values of 2, 4, 6, and 8 represent intermediate compromises between the definitions above.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mathematical Rigor Section */}
        <section className="border-b border-border/60 bg-card/30 py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold text-primary mb-4">Consistency & Mathematical Rigor</h2>
              <p className="text-lg text-muted-foreground">AHP is unique because it measures the logic of your decisions.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-2xl border bg-card/80 p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                <LineChart className="w-10 h-10 text-accent mb-6" />
                <h4 className="text-xl font-bold mb-3">Consistency Ratio</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Humans aren't perfectly consistent. If A is better than B, and B is better than C, then A should be much better than C. AHP calculates a Consistency Ratio (CR) to detect logic errors in your judgments.
                </p>
              </div>
              
              <div className="rounded-2xl border bg-card/80 p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                <Zap className="w-10 h-10 text-primary mb-6" />
                <h4 className="text-xl font-bold mb-3">Priority Synthesis</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Once all comparisons are made, AHP "synthesizes" the results. It mathematically combines local priorities across the hierarchy to provide a global ranking of alternatives based on all criteria.
                </p>
              </div>

              <div className="rounded-2xl border bg-card/80 p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                <ShieldCheck className="w-10 h-10 text-accent mb-6" />
                <h4 className="text-xl font-bold mb-3">Validation</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A Consistency Ratio below 0.1 (10%) is generally considered acceptable. This provides a scientific "seal of approval" that your multi-criteria decision is logically sound and based on consistent logic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Template Section */}
        <section className="relative overflow-hidden bg-secondary/60 py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.14),transparent_60%)]" />
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline font-bold mb-4">Jumpstart Your Analysis</h2>
            <p className="mx-auto mb-12 max-w-4xl text-muted-foreground lg:whitespace-nowrap">Select a validated template to see AHP in action with pre-populated, consistent priority data.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {AHP_TEMPLATES.map((template) => (
                <Link 
                  key={template.id} 
                  href={`/builder?template=${template.id}`}
                  className="group block rounded-2xl border border-border bg-card/80 p-8 text-left shadow-xl shadow-black/10 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/60 hover:bg-card"
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{template.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{template.description}</p>
                  <div className="flex items-center text-xs font-bold text-accent uppercase tracking-wider">
                    Load Template <ArrowRight className="ml-2 w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 bg-card/40 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <BrainCircuit className="h-7 w-7 text-primary" />
            </div>
            <div>
              <span className="font-headline font-bold text-primary text-xl block">AHP Studio</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Decision Support System</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            Developed by <span className="font-bold text-primary">Darko Etinger</span> with <span className="font-bold text-accent">Firebase Studio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
