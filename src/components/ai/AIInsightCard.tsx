import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { AIService } from '@/lib/aiService';
import { cn } from '@/lib/utils';

interface AIInsightCardProps {
  title: string;
  data: any;
  context: string;
  apiKey: string;
  className?: string;
}

export function AIInsightCard({ title, data, context, apiKey, className }: AIInsightCardProps) {
  const [insight, setInsight] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const aiService = new AIService(apiKey);

  const generateInsight = async () => {
    setIsLoading(true);
    try {
      const response = await aiService.generateInsight(data, context);
      if (response.success) {
        setInsight(response.message);
        setHasGenerated(true);
      } else {
        setInsight('Unable to generate insight. Please check your connection and try again.');
      }
    } catch (error) {
      setInsight('Error generating insight. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getInsightIcon = () => {
    if (insight.toLowerCase().includes('increase') || insight.toLowerCase().includes('growth')) {
      return <TrendingUp className="w-4 h-4 text-success" />;
    }
    if (insight.toLowerCase().includes('decrease') || insight.toLowerCase().includes('decline')) {
      return <AlertTriangle className="w-4 h-4 text-warning" />;
    }
    return <CheckCircle className="w-4 h-4 text-primary" />;
  };

  return (
    <Card className={cn(
      "border-primary/30 bg-gradient-glass backdrop-blur-lg transition-all duration-300 hover:shadow-glow",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>{title}</span>
          </CardTitle>
          <Badge variant="outline" className="border-primary/30 text-primary">
            AI Powered
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!hasGenerated ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Get AI-powered insights about your {context.toLowerCase()}
            </p>
            <Button
              onClick={generateInsight}
              disabled={isLoading}
              variant="glow"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Insights...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Insights
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/50 border border-border/50">
              {getInsightIcon()}
              <p className="text-sm text-foreground leading-relaxed">{insight}</p>
            </div>
            <Button
              onClick={generateInsight}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="w-full"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh Insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}