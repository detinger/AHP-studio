
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

  const colors = ['#725181', '#4C4CE5', '#8E7DA0', '#7A7AEF', '#B5A8BF'];

  const isConsistent = cr !== undefined ? cr <= 0.1 : true;

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" unit="%" hide />
                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
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
        <Alert variant={isConsistent ? "default" : "destructive"} className={isConsistent ? "bg-green-50 border-green-200 text-green-800" : ""}>
          {isConsistent ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4" />}
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
