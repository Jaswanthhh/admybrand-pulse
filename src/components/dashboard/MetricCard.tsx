import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  variant?: 'default' | 'accent' | 'success' | 'warning';
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  trend = 'neutral',
  variant = 'default' 
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCardVariant = () => {
    switch (variant) {
      case 'accent':
        return 'bg-gradient-accent/10 border-accent/20 hover:shadow-accent/20';
      case 'success':
        return 'bg-gradient-success/10 border-success/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]';
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden border-border/50 backdrop-blur-sm",
      getCardVariant()
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center space-x-1 text-xs mt-1">
          {getTrendIcon()}
          <span className={cn("font-medium", getTrendColor())}>
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-muted-foreground">{changeLabel}</span>
        </div>
      </CardContent>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </Card>
  );
}