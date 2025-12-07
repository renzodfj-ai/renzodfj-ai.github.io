import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  isLoading?: boolean;
}

export default function MetricCard({ label, value, icon: Icon, trend, subtitle, isLoading = false }: MetricCardProps) {
  const formattedValue = typeof value === 'number' 
    ? value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : value;

  return (
    <Card className="p-4" data-testid={`card-metric-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          {isLoading ? (
            <Skeleton className="h-7 w-20" />
          ) : (
            <p className={`font-mono text-xl font-semibold ${
              trend === 'up' ? 'text-green-600 dark:text-green-400' : 
              trend === 'down' ? 'text-red-600 dark:text-red-400' : ''
            }`}>
              {formattedValue}
            </p>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-2 rounded-md ${
            trend === 'up' ? 'bg-green-500/10' : 
            trend === 'down' ? 'bg-red-500/10' : 'bg-muted'
          }`}>
            <Icon className={`h-4 w-4 ${
              trend === 'up' ? 'text-green-600 dark:text-green-400' : 
              trend === 'down' ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'
            }`} />
          </div>
        )}
      </div>
    </Card>
  );
}
