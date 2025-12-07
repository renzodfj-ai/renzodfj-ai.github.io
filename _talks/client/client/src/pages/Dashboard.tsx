import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import PredictionForm from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import PriceChart from "@/components/PriceChart";
import PredictionHistory from "@/components/PredictionHistory";
import ModelStats from "@/components/ModelStats";
import { TrendingUp, TrendingDown, Activity, BarChart3, DollarSign } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PredictionRecord {
  id: string;
  date: string;
  prediction: 'up' | 'down';
  confidence: number;
  actual: 'up' | 'down' | null;
}

interface MarketData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  priceChange: number;
  previousClose: number;
}

interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export default function Dashboard() {
  const { toast } = useToast();
  const [currentPrediction, setCurrentPrediction] = useState<{
    prediction: 'up' | 'down' | null;
    confidence: number;
    timestamp?: string;
  }>({ prediction: null, confidence: 0 });

  // Fetch market data from Yahoo Finance
  const { data: marketData, isLoading: marketLoading, refetch: refetchMarket } = useQuery<MarketData>({
    queryKey: ['/api/market-data'],
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000,
  });

  // Fetch historical data for chart
  const { data: historicalData } = useQuery<HistoricalDataPoint[]>({
    queryKey: ['/api/historical-data'],
    staleTime: 300000, // 5 minutes
  });

  // Fetch prediction history from database
  const { data: predictions = [], refetch: refetchPredictions } = useQuery<PredictionRecord[]>({
    queryKey: ['/api/predictions'],
    staleTime: 30000,
  });

  // Make prediction mutation
  const predictMutation = useMutation({
    mutationFn: async (data: { open: number; high: number; low: number; close: number; volume: number }) => {
      const response = await apiRequest('POST', '/api/predict', data);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentPrediction({
        prediction: data.prediction,
        confidence: data.confidence,
        timestamp: data.timestamp,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/predictions'] });
      toast({
        title: "Predicción completada",
        description: `${data.prediction === 'up' ? 'Alcista' : 'Bajista'} con ${data.confidence.toFixed(1)}% de confianza`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo realizar la predicción",
        variant: "destructive",
      });
    },
  });

  const handleRefresh = async () => {
    await refetchMarket();
    toast({
      title: "Datos actualizados",
      description: "Se obtuvieron los últimos datos del mercado",
    });
  };

  const handlePredict = (formData: { open: string; high: string; low: string; close: string; volume: string }) => {
    predictMutation.mutate({
      open: parseFloat(formData.open),
      high: parseFloat(formData.high),
      low: parseFloat(formData.low),
      close: parseFloat(formData.close),
      volume: parseFloat(formData.volume),
    });
  };

  const formatVolume = (vol: number) => {
    if (vol >= 1e9) return (vol / 1e9).toFixed(2) + 'B';
    if (vol >= 1e6) return (vol / 1e6).toFixed(2) + 'M';
    return vol.toLocaleString();
  };

  // Default market data while loading
  const displayMarketData = marketData || {
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
    priceChange: 0,
  };

  // Format historical data for chart
  const chartData = historicalData?.map(d => ({
    date: new Date(d.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
    close: d.close,
  })) || [];

  const isLoading = marketLoading || predictMutation.isPending;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentPrice={displayMarketData.close}
        priceChange={displayMarketData.priceChange}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <MetricCard 
            label="Apertura" 
            value={displayMarketData.open} 
            icon={DollarSign}
            isLoading={marketLoading}
          />
          <MetricCard 
            label="Máximo" 
            value={displayMarketData.high} 
            icon={TrendingUp}
            trend="up"
            isLoading={marketLoading}
          />
          <MetricCard 
            label="Mínimo" 
            value={displayMarketData.low} 
            icon={TrendingDown}
            trend="down"
            isLoading={marketLoading}
          />
          <MetricCard 
            label="Cierre" 
            value={displayMarketData.close} 
            icon={Activity}
            trend={displayMarketData.priceChange >= 0 ? 'up' : 'down'}
            isLoading={marketLoading}
          />
          <MetricCard 
            label="Volumen" 
            value={formatVolume(displayMarketData.volume)} 
            icon={BarChart3}
            isLoading={marketLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PriceChart data={chartData.length > 0 ? chartData : undefined} />
            <PredictionHistory predictions={predictions} />
          </div>

          <div className="space-y-6">
            <PredictionForm 
              onPredict={handlePredict}
              isLoading={predictMutation.isPending}
              defaultValues={marketData ? {
                open: marketData.open.toString(),
                high: marketData.high.toString(),
                low: marketData.low.toString(),
                close: marketData.close.toString(),
                volume: marketData.volume.toString(),
              } : undefined}
            />
            <PredictionResult 
              prediction={currentPrediction.prediction}
              confidence={currentPrediction.confidence}
              timestamp={currentPrediction.timestamp}
            />
            <ModelStats />
          </div>
        </div>

        <footer className="pt-6 border-t text-center text-sm text-muted-foreground">
          <p>Fuente de datos: Yahoo Finance (^GSPC) | Modelo: Random Forest Classifier</p>
          <p className="mt-1">Última actualización: {new Date().toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </footer>
      </main>
    </div>
  );
}
