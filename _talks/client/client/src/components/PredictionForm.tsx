import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Loader2, RefreshCw } from "lucide-react";

interface FormData {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

interface PredictionFormProps {
  onPredict: (data: FormData) => void;
  isLoading?: boolean;
  defaultValues?: FormData;
}

export default function PredictionForm({ onPredict, isLoading = false, defaultValues }: PredictionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    open: '',
    high: '',
    low: '',
    close: '',
    volume: ''
  });
  
  const [hasLoadedDefaults, setHasLoadedDefaults] = useState(false);

  // Load default values from market data when available
  useEffect(() => {
    if (defaultValues && !hasLoadedDefaults) {
      setFormData(defaultValues);
      setHasLoadedDefaults(true);
    }
  }, [defaultValues, hasLoadedDefaults]);

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const handleLoadMarketData = () => {
    if (defaultValues) {
      setFormData(defaultValues);
    }
  };

  const isFormValid = Object.values(formData).every(v => v !== '' && !isNaN(Number(v)));

  return (
    <Card data-testid="card-prediction-form">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5" />
          Datos del Mercado
        </CardTitle>
        <CardDescription>
          Ingresa los datos de hoy para predecir la dirección de mañana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="open" className="text-xs uppercase tracking-wide">Apertura</Label>
              <Input
                id="open"
                type="number"
                step="0.01"
                placeholder="6866.32"
                value={formData.open}
                onChange={handleChange('open')}
                className="font-mono"
                data-testid="input-open"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="high" className="text-xs uppercase tracking-wide">Máximo</Label>
              <Input
                id="high"
                type="number"
                step="0.01"
                placeholder="6895.78"
                value={formData.high}
                onChange={handleChange('high')}
                className="font-mono"
                data-testid="input-high"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="low" className="text-xs uppercase tracking-wide">Mínimo</Label>
              <Input
                id="low"
                type="number"
                step="0.01"
                placeholder="6858.29"
                value={formData.low}
                onChange={handleChange('low')}
                className="font-mono"
                data-testid="input-low"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="close" className="text-xs uppercase tracking-wide">Cierre</Label>
              <Input
                id="close"
                type="number"
                step="0.01"
                placeholder="6870.40"
                value={formData.close}
                onChange={handleChange('close')}
                className="font-mono"
                data-testid="input-close"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="volume" className="text-xs uppercase tracking-wide">Volumen</Label>
            <Input
              id="volume"
              type="number"
              placeholder="4944560000"
              value={formData.volume}
              onChange={handleChange('volume')}
              className="font-mono"
              data-testid="input-volume"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!isFormValid || isLoading}
              data-testid="button-predict"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analizando...
                </>
              ) : (
                'Obtener Predicción'
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={handleLoadMarketData}
              disabled={!defaultValues}
              data-testid="button-load-market"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Cargar Datos del Mercado
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
