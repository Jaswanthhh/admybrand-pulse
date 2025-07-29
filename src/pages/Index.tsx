import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { UserGrowthChart } from '@/components/dashboard/UserGrowthChart';
import { ChannelChart } from '@/components/dashboard/ChannelChart';
import { CampaignTable } from '@/components/dashboard/CampaignTable';
import { ChatBot } from '@/components/ai/ChatBot';
import { AIInsightCard } from '@/components/ai/AIInsightCard';
import { MetricCardSkeleton, ChartSkeleton } from '@/components/ui/loading-skeleton';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import dashboardHero from '@/assets/dashboard-hero.jpg';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target, 
  RefreshCw,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { 
  dashboardMetrics, 
  getRandomMetricUpdate, 
  formatCurrency, 
  formatNumber,
  revenueData,
  campaignData,
  getDynamicRevenueData,
  getDynamicCampaignData,
  getDynamicUserGrowthData,
  getDynamicChannelData
} from '@/lib/mockData';

const Index = () => {
  const [metrics, setMetrics] = useState(dashboardMetrics);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicData, setDynamicData] = useState({
    revenue: revenueData,
    campaigns: campaignData,
    userGrowth: [],
    channels: []
  });
  
  // Your Google AI API Key
  const API_KEY = "AIzaSyCfrp2i7hRLoURsise7pmoqj-kDbR9A5aw";

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Real-time updates simulation with dynamic data
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setMetrics(getRandomMetricUpdate());
        setDynamicData({
          revenue: getDynamicRevenueData(),
          campaigns: getDynamicCampaignData(),
          userGrowth: getDynamicUserGrowthData(),
          channels: getDynamicChannelData()
        });
        setLastUpdated(new Date());
      }, 8000); // Update every 8 seconds for more dynamic feel

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleRefresh = async () => {
    setIsUpdating(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMetrics(getRandomMetricUpdate());
    setDynamicData({
      revenue: getDynamicRevenueData(),
      campaigns: getDynamicCampaignData(),
      userGrowth: getDynamicUserGrowthData(),
      channels: getDynamicChannelData()
    });
    setLastUpdated(new Date());
    setIsUpdating(false);
  };

  return (
    <div 
      className="min-h-screen bg-background relative"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 15, 35, 0.85), rgba(15, 15, 35, 0.85)), url(${dashboardHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Overview</h1>
            <p className="text-muted-foreground mt-1">
              Monitor your digital marketing performance in real-time
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Button onClick={handleRefresh} disabled={isUpdating} variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              onClick={() => setIsChatMinimized(!isChatMinimized)}
              variant="glow"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <MetricCardSkeleton key={i} />
            ))
          ) : (
            <>
              <MetricCard
                title="Total Revenue"
                value={formatCurrency(metrics.revenue)}
                change={12.5}
                changeLabel="vs last month"
                icon={<DollarSign className="w-5 h-5" />}
                trend="up"
                variant="accent"
              />
              <MetricCard
                title="Active Users"
                value={formatNumber(metrics.users)}
                change={8.2}
                changeLabel="vs last month"
                icon={<Users className="w-5 h-5" />}
                trend="up"
                variant="success"
              />
              <MetricCard
                title="Conversions"
                value={formatNumber(metrics.conversions)}
                change={15.3}
                changeLabel="vs last month"
                icon={<Target className="w-5 h-5" />}
                trend="up"
                variant="default"
              />
              <MetricCard
                title="Growth Rate"
                value={`${metrics.growth.toFixed(1)}%`}
                change={metrics.growth - 20}
                changeLabel="vs target"
                icon={<TrendingUp className="w-5 h-5" />}
                trend={metrics.growth > 20 ? 'up' : 'down'}
                variant="warning"
              />
            </>
          )}
        </div>

        {/* AI Insights Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <ChartSkeleton key={i} />
            ))
          ) : (
            <>
              <AIInsightCard
                title="Revenue Analysis"
                data={dynamicData.revenue}
                context="Revenue Trend Analysis"
                apiKey={API_KEY}
              />
              <AIInsightCard
                title="Campaign Optimization"
                data={dynamicData.campaigns.slice(0, 5)}
                context="Campaign Performance Analysis"
                apiKey={API_KEY}
              />
            </>
          )}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <ChartSkeleton key={i} />
            ))
          ) : (
            <>
              <RevenueChart />
              <ChannelChart />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <UserGrowthChart />
          )}
        </div>

        {/* Campaign Performance Table */}
        <CampaignTable data={dynamicData.campaigns} />

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm py-8 border-t border-border/50">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Powered by AI-driven insights • ADmyBRAND Insights Dashboard</span>
          </div>
        </footer>
      </main>

      {/* AI ChatBot */}
      <ChatBot 
        apiKey={API_KEY}
        isMinimized={isChatMinimized}
        onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
      />
    </div>
  );
};

export default Index;
