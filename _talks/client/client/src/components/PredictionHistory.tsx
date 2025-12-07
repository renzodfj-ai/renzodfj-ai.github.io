import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, History, Check, X } from "lucide-react";

interface PredictionRecord {
  id: string;
  date: string;
  prediction: 'up' | 'down';
  confidence: number;
  actual?: 'up' | 'down' | null;
}

interface PredictionHistoryProps {
  predictions: PredictionRecord[];
}

export default function PredictionHistory({ predictions }: PredictionHistoryProps) {
  if (predictions.length === 0) {
    return (
      <Card data-testid="card-prediction-history-empty">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5" />
            Historial de Predicciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <History className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Sin predicciones aún</p>
            <p className="text-sm text-muted-foreground">
              Tu historial de predicciones aparecerá aquí
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const correctPredictions = predictions.filter(p => p.actual && p.prediction === p.actual).length;
  const totalWithActual = predictions.filter(p => p.actual).length;
  const accuracy = totalWithActual > 0 ? (correctPredictions / totalWithActual) * 100 : 0;

  return (
    <Card data-testid="card-prediction-history">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <History className="h-5 w-5" />
          Historial de Predicciones
        </CardTitle>
        {totalWithActual > 0 && (
          <Badge variant="secondary" className="font-mono" data-testid="badge-accuracy">
            {accuracy.toFixed(1)}% Precisión
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Fecha</TableHead>
                <TableHead>Predicción</TableHead>
                <TableHead className="text-right">Confianza</TableHead>
                <TableHead className="text-center">Resultado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictions.map((record) => {
                const isCorrect = record.actual && record.prediction === record.actual;
                const isIncorrect = record.actual && record.prediction !== record.actual;
                
                return (
                  <TableRow 
                    key={record.id}
                    className={
                      isCorrect ? 'bg-green-500/5' : 
                      isIncorrect ? 'bg-red-500/5' : ''
                    }
                    data-testid={`row-prediction-${record.id}`}
                  >
                    <TableCell className="font-mono text-sm">
                      {record.date}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {record.prediction === 'up' ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-green-600 dark:text-green-400 font-medium">Alcista</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                            <span className="text-red-600 dark:text-red-400 font-medium">Bajista</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {record.confidence.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-center">
                      {record.actual === null ? (
                        <Badge variant="outline" className="text-xs">Pendiente</Badge>
                      ) : isCorrect ? (
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-red-600 dark:text-red-400 mx-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
