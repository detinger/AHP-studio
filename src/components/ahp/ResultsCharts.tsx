
"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ResultsChartsProps {
  title: string;
  labels: string[];
  weights: number[];
  cr?: number;
}

export function ResultsCharts({ title, labels, weights, cr }: ResultsChartsProps) {
  const data = labels.map((label, i) => ({
    name: label,
    weight: Math.round(weights[i] * 1000) / 10,
  })).sort((a, b) => b.weight - a.weight);

  const colors = ['#bb9af7', '#7dcfff', '#7aa2f7', '#2ac3de', '#e0af68'];

  const isConsistent = cr !== undefined ? cr <= 0.1 : true;

  return (
    <div className="space-y-6">
      <Card className="border bg-card/90 shadow-xl shadow-black/10">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40, top: 10, bottom: 10 }}>
                <CartesianGrid stroke="#3b4261" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" unit="%" hide />
                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{ fill: '#a9b1d6' }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  contentStyle={{ background: '#1a1b26', borderRadius: '8px', border: '1px solid #3b4261', color: '#c0caf5', boxShadow: '0 12px 30px rgba(0,0,0,0.35)' }}
                  formatter={(value) => [`${value}%`, 'Priority']}
                />
                <Bar dataKey="weight" radius={[0, 4, 4, 0]} barSize={24}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {cr !== undefined && (
        <Alert variant={isConsistent ? "default" : "destructive"} className={isConsistent ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : ""}>
          {isConsistent ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle className="font-bold">Consistency Ratio: {(cr * 100).toFixed(1)}%</AlertTitle>
          <AlertDescription>
            {isConsistent 
              ? "Great! Your comparisons are logically consistent (CR < 10%)." 
              : "Warning: Your comparisons are somewhat inconsistent. A CR above 10% suggests you should review your judgments."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
