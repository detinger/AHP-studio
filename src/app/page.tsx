
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Calculator, LineChart, ShieldCheck, ArrowRight, BrainCircuit } from 'lucide-react';
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
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BrainCircuit className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-headline font-bold text-primary">AHP Studio</span>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Button variant="default" size="sm" asChild className="bg-accent">
              <Link href="/builder">Launch Workspace</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 text-primary max-w-4xl mx-auto leading-tight">
              AHP Studio
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-body">
              An interactive studio for the Analytic Hierarchy Process (AHP). Build models, compare criteria, and derive consistent priorities.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 px-8" asChild>
                <Link href="/builder">Launch Workspace <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Fundamentals Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-5xl mx-auto">
              <h2 className="text-4xl font-headline font-bold mb-4 text-primary">What is AHP?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Developed by Dr. Thomas Saaty, the Analytic Hierarchy Process is a structured technique for organizing and analyzing complex decisions based on mathematics and psychology.
              </p>
            </div>

            {/* Full Width Hierarchy Diagram */}
            <div className="w-full mb-20">
              <HierarchyDiagram 
                criteria={abstractCriteria}
                criteriaWeights={abstractWeights}
                alternatives={abstractAlternatives}
                finalScores={abstractScores}
                showWeights={false}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-2xl font-headline font-bold text-primary">The Power of Structured Thinking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Instead of prescribing a "correct" decision, AHP helps you find the one that best suits your goals. It provides a rational framework for representing and quantifying decision elements, relating them to overall goals, and evaluating alternative solutions.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/20 rounded-xl">
                    <div className="font-bold text-primary mb-1">Mathematical</div>
                    <p className="text-xs text-muted-foreground">Uses eigenvalues to calculate weights.</p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-xl">
                    <div className="font-bold text-accent mb-1">Psychological</div>
                    <p className="text-xs text-muted-foreground">Accounts for human judgment and intuition.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, title: "1. Hierarchy", color: "text-primary", bg: "bg-primary/10", desc: "Decompose problems into goal, criteria, and alternatives." },
                  { icon: Calculator, title: "2. Comparison", color: "text-accent", bg: "bg-accent/10", desc: "Compare elements two-at-a-time using a 1-9 scale." },
                  { icon: LineChart, title: "3. Consistency", color: "text-primary", bg: "bg-primary/10", desc: "Measure judgment logic with the Consistency Ratio." },
                  { icon: ShieldCheck, title: "4. Synthesis", color: "text-accent", bg: "bg-accent/10", desc: "Combine priorities into a final ranked recommendation." }
                ].map((step, i) => (
                  <div key={i} className="p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 ${step.bg} ${step.color} rounded-lg flex items-center justify-center mb-4`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold mb-1 text-sm">{step.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-tight">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/30 p-8 rounded-2xl border border-secondary max-w-3xl mx-auto">
              <h3 className="text-2xl font-headline font-bold mb-4 text-primary text-center">The Fundamental Scale</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-2">Importance</th>
                      <th className="py-2">Definition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr><td className="py-3 font-bold text-primary">1</td><td className="py-3">Equal Importance</td></tr>
                    <tr><td className="py-3 font-bold text-primary">3</td><td className="py-3">Moderate Importance</td></tr>
                    <tr><td className="py-3 font-bold text-primary">5</td><td className="py-3">Strong Importance</td></tr>
                    <tr><td className="py-3 font-bold text-primary">7</td><td className="py-3">Very Strong Importance</td></tr>
                    <tr><td className="py-3 font-bold text-primary">9</td><td className="py-3">Extreme Importance</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Template Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline font-bold mb-12">Jumpstart Your Analysis</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {AHP_TEMPLATES.map((template) => (
                <Link 
                  key={template.id} 
                  href={`/builder?template=${template.id}`}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all text-left group block"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">{template.name}</h3>
                  <p className="text-sm text-white/70">{template.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary/50 py-12 border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-primary w-5 h-5" />
            <span className="font-headline font-bold text-primary">AHP Studio</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AHP Studio.
          </div>
        </div>
      </footer>
    </div>
  );
}
