import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, Target } from "lucide-react";

interface PredictionResultProps {
  prediction: 'up' | 'down' | null;
  confidence: number;
  timestamp?: string;
}

export default function PredictionResult({ prediction, confidence, timestamp }: PredictionResultProps) {
  const getIcon = () => {
    if (prediction === 'up') return TrendingUp;
    if (prediction === 'down') return TrendingDown;
    return Minus;
  };

  const Icon = getIcon();

  const getColors = () => {
    if (prediction === 'up') return {
      bg: 'bg-green-500/10',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-500/20',
      progress: 'bg-green-500'
    };
    if (prediction === 'down') return {
      bg: 'bg-red-500/10',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-500/20',
      progress: 'bg-red-500'
    };
    return {
      bg: 'bg-muted',
      text: 'text-muted-foreground',
      border: 'border-border',
      progress: 'bg-muted'
    };
  };

  const colors = getColors();

  if (!prediction) {
    return (
      <Card className="border-dashed" data-testid="card-prediction-empty">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 rounded-full bg-muted mb-4">
            <Target className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-muted-foreground">Sin Predicción Aún</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ingresa datos del mercado para obtener una predicción
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${colors.bg} ${colors.border}`} data-testid="card-prediction-result">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Predicción para Mañana
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${colors.bg}`}>
              <Icon className={`h-8 w-8 ${colors.text}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${colors.text}`} data-testid="text-prediction-direction">
                {prediction === 'up' ? 'ALCISTA' : 'BAJISTA'}
              </p>
              <p className="text-sm text-muted-foreground">
                El mercado {prediction === 'up' ? 'SUBIRÁ' : 'BAJARÁ'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Confianza</span>
            <span className={`font-mono font-semibold ${colors.text}`} data-testid="text-confidence">
              {confidence.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={confidence} 
            className="h-2"
          />
        </div>

        {timestamp && (
          <p className="text-xs text-muted-foreground text-center pt-2">
            Predicción realizada a las {timestamp}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
