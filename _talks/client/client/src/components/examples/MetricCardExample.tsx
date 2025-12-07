import MetricCard from '../MetricCard';
import { TrendingUp, TrendingDown, Activity, BarChart3, DollarSign } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
      <MetricCard 
        label="Open" 
        value={6866.32} 
        icon={DollarSign}
        trend="neutral"
      />
      <MetricCard 
        label="High" 
        value={6895.78} 
        icon={TrendingUp}
        trend="up"
      />
      <MetricCard 
        label="Low" 
        value={6858.29} 
        icon={TrendingDown}
        trend="down"
      />
      <MetricCard 
        label="Close" 
        value={6870.40} 
        icon={Activity}
        trend="up"
      />
      <MetricCard 
        label="Volume" 
        value="4.94B" 
        icon={BarChart3}
        subtitle="+2.3%"
      />
    </div>
  );
}
