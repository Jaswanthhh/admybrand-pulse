import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'success';
}

export function ChartContainer({ 
  title, 
  description, 
  children, 
  className,
  variant = 'default' 
}: ChartContainerProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'accent':
        return 'border-accent/30 bg-accent/5';
      case 'success':
        return 'border-success/30 bg-success/5';
      default:
        return 'border-border/50';
    }
  };

  return (
    <Card className={cn(
      "backdrop-blur-sm transition-all duration-300 hover:shadow-elegant hover:scale-[1.01]",
      getVariantStyles(),
      className
    )}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-2">
        {children}
      </CardContent>
    </Card>
  );
}