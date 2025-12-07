import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, TreeDeciduous, Zap } from "lucide-react";

interface ModelStatsProps {
  accuracy?: number;
  totalSamples?: number;
  lastUpdated?: string;
}

export default function ModelStats({ 
  accuracy = 65.4, 
  totalSamples = 6550, 
  lastUpdated = "5 Dic, 2025" 
}: ModelStatsProps) {
  return (
    <Card data-testid="card-model-stats">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Brain className="h-4 w-4" />
          Información del Modelo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TreeDeciduous className="h-4 w-4" />
            <span>Algoritmo</span>
          </div>
          <Badge variant="secondary" className="text-xs">Random Forest</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>Precisión</span>
          </div>
          <span className="font-mono text-sm font-medium" data-testid="text-model-accuracy">
            {accuracy.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Database className="h-4 w-4" />
            <span>Datos de Entrenamiento</span>
          </div>
          <span className="font-mono text-sm font-medium" data-testid="text-training-samples">
            {totalSamples.toLocaleString()} muestras
          </span>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Último entrenamiento: {lastUpdated}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
