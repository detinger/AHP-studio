import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, GitGraph, BarChart3, ArrowRight, BrainCircuit } from 'lucide-react';

export default function Home() {
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
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/learn" className="hover:text-accent transition-colors">Fundamentals</Link>
            <Link href="/builder" className="hover:text-accent transition-colors">Workspace</Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="/builder">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 text-primary max-w-4xl mx-auto leading-tight">
              Master the Science of Complex Decisions
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-body">
              An interactive learning studio for the Analytic Hierarchy Process (AHP). Build models, compare criteria, and derive consistent priorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 px-8" asChild>
                <Link href="/builder">Start Building Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link href="/learn">Learn AHP Fundamentals</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Educational Hub</CardTitle>
                  <CardDescription>Comprehensive visual guides to AHP theory and mathematics.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Deep dive into eigenvalues, consistency ratios, and hierarchical synthesis with interactive diagrams.</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4">
                    <GitGraph className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Hierarchy Builder</CardTitle>
                  <CardDescription>Visual interface for defining decision trees and alternatives.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Drag, drop, and structure your criteria. Watch your decision hierarchy take shape in real-time.</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Result Analysis</CardTitle>
                  <CardDescription>Dynamic visualizations and consistency checks.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Get instant feedback on your comparison consistency and see final priority weights through interactive charts.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Template Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline font-bold mb-12">Jumpstart Your Analysis</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {['Cloud Provider Selection', 'University Choice', 'Smartphone Purchase'].map((template) => (
                <div key={template} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all text-left cursor-pointer group">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">{template}</h3>
                  <p className="text-sm text-white/70">Pre-built models for exploring AHP mechanics.</p>
                </div>
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
            © {new Date().getFullYear()} AHP Studio. Designed for academic and professional excellence.
          </div>
        </div>
      </footer>
    </div>
  );
}
