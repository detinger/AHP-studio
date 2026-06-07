
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Calculator, LineChart, ShieldCheck } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LearnPage() {
  const hierarchyImage = PlaceHolderImages.find(img => img.id === 'ahp-hierarchy');
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 p-4 backdrop-blur-xl">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <h1 className="text-2xl font-headline font-bold text-primary">AHP Fundamentals</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="max-w-none">
          <section className="mb-16">
            <h2 className="text-4xl font-headline font-bold mb-6 text-primary">What is the Analytic Hierarchy Process?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Developed by Dr. Thomas Saaty in the 1970s, the Analytic Hierarchy Process (AHP) is a structured technique for organizing and analyzing complex decisions, based on mathematics and psychology.
            </p>
            <div className="relative mb-8 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border bg-card p-4 shadow-2xl shadow-black/20">
              {hierarchyImage && (
                <Image 
                  src={hierarchyImage.imageUrl} 
                  alt={hierarchyImage.description}
                  width={800}
                  height={600}
                  className="object-contain max-h-full"
                  data-ai-hint={hierarchyImage.imageHint}
                />
              )}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Instead of prescribing a "correct" decision, AHP helps decision-makers find one that best suits their goal and their understanding of the problem. It provides a comprehensive and rational framework for structuring a decision problem, for representing and quantifying its elements, for relating those elements to overall goals, and for evaluating alternative solutions.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">1. The Hierarchy</h3>
                  <p className="text-muted-foreground">The problem is decomposed into a hierarchy of goal, criteria, sub-criteria, and alternatives.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Calculator className="text-accent w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">2. Pairwise Comparison</h3>
                  <p className="text-muted-foreground">Elements are compared two-at-a-time to establish priority weights using a scale from 1 to 9.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <LineChart className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">3. Consistency Ratio</h3>
                  <p className="text-muted-foreground">A unique feature of AHP is the ability to measure how consistent the decision-maker is.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-accent w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">4. Final Synthesis</h3>
                  <p className="text-muted-foreground">Priorities are synthesized across the hierarchy to calculate final scores for alternatives.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-card/80 p-8 shadow-xl shadow-black/10">
            <h3 className="text-2xl font-headline font-bold mb-4 text-primary">The Fundamental Scale</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2">Intensity of Importance</th>
                    <th className="py-2">Definition</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="py-3 font-bold">1</td><td className="py-3">Equal Importance</td></tr>
                  <tr><td className="py-3 font-bold">3</td><td className="py-3">Moderate Importance</td></tr>
                  <tr><td className="py-3 font-bold">5</td><td className="py-3">Strong Importance</td></tr>
                  <tr><td className="py-3 font-bold">7</td><td className="py-3">Very Strong Importance</td></tr>
                  <tr><td className="py-3 font-bold">9</td><td className="py-3">Extreme Importance</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm italic text-muted-foreground">Values 2, 4, 6, 8 can be used for intermediate preferences.</p>
          </section>

          <div className="mt-16 flex justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/builder">Ready to try it? Go to Workspace</Link>
            </Button>
          </div>
        </article>
      </main>
    </div>
  );
}
