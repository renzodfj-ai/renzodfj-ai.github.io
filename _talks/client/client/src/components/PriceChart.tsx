import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

// todo: remove mock functionality
const generateMockData = (days: number) => {
  const data = [];
  let price = 6500;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const change = (Math.random() - 0.48) * 50;
    price = Math.max(6000, Math.min(7000, price + change));
    
    data.push({
      date: date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
      close: Number(price.toFixed(2)),
      fullDate: date.toISOString()
    });
  }
  return data;
};

const timeRanges = [
  { label: '1S', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1A', days: 365 },
];

interface PriceChartProps {
  data?: Array<{ date: string; close: number }>;
}

export default function PriceChart({ data }: PriceChartProps) {
  const [selectedRange, setSelectedRange] = useState('1M');
  
  // todo: remove mock functionality
  const chartData = data || generateMockData(
    timeRanges.find(r => r.label === selectedRange)?.days || 30
  );

  const minPrice = Math.min(...chartData.map(d => d.close)) * 0.995;
  const maxPrice = Math.max(...chartData.map(d => d.close)) * 1.005;

  const priceChange = chartData.length > 1 
    ? chartData[chartData.length - 1].close - chartData[0].close 
    : 0;
  const isPositive = priceChange >= 0;

  return (
    <Card data-testid="card-price-chart">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">Precios Históricos</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          {timeRanges.map((range) => (
            <Button
              key={range.label}
              variant={selectedRange === range.label ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedRange(range.label)}
              className="text-xs px-3"
              data-testid={`button-range-${range.label.toLowerCase()}`}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositive ? "hsl(142 76% 36%)" : "hsl(0 84% 40%)"} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositive ? "hsl(142 76% 36%)" : "hsl(0 84% 40%)"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis 
                domain={[minPrice, maxPrice]}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                className="text-muted-foreground"
                width={80}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
                labelStyle={{ fontWeight: 600 }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Cierre']}
              />
              <Area 
                type="monotone" 
                dataKey="close" 
                stroke={isPositive ? "hsl(142 76% 36%)" : "hsl(0 84% 40%)"} 
                strokeWidth={2}
                fill="url(#colorClose)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
