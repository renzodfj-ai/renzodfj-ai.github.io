import { TrendingUp, RefreshCw, Github, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  currentPrice?: number;
  priceChange?: number;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export default function Header({ 
  currentPrice = 6870.40, 
  priceChange = 0.19, 
  onRefresh,
  isLoading = false 
}: HeaderProps) {
  const isPositive = priceChange >= 0;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold tracking-tight" data-testid="text-app-title">Predictor S&P 500</h1>
              <p className="text-xs text-muted-foreground">Análisis de Mercado con ML</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span>Creado por:</span>
              <a 
                href="https://renzodfj-ai.github.io/renzodfj.github.io//"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
                data-testid="link-author"
              >
                <User className="h-3 w-3" />
                Renzo Daniel Flores Justiniani
              </a>
            </div>

            <a
              href="https://github.com/renzodfj-ai/sp500"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </a>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-card-border">
              <span className="text-xs text-muted-foreground uppercase tracking-wide hidden sm:inline">S&P 500</span>
              <span className="font-mono font-semibold text-sm" data-testid="text-current-price">
                ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <Badge 
                variant="secondary" 
                className={`text-xs font-mono ${isPositive ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}
                data-testid="badge-price-change"
              >
                {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
              </Badge>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onRefresh}
              disabled={isLoading}
              data-testid="button-refresh"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
