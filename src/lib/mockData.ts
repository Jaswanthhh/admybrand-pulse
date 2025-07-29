// Mock data for ADmyBRAND Insights Dashboard

export interface DashboardMetrics {
  revenue: number;
  users: number;
  conversions: number;
  growth: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue?: number;
  users?: number;
  conversions?: number;
}

export interface TableDataRow {
  id: string;
  campaign: string;
  platform: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  cpa: number;
  status: 'active' | 'paused' | 'completed';
}

// Dashboard Metrics
export const dashboardMetrics: DashboardMetrics = {
  revenue: 324750,
  users: 89234,
  conversions: 12847,
  growth: 23.5
};

// Revenue Trend Data (Last 12 months)
export const revenueData: ChartDataPoint[] = [
  { name: 'Jan', value: 245000, revenue: 245000 },
  { name: 'Feb', value: 267000, revenue: 267000 },
  { name: 'Mar', value: 289000, revenue: 289000 },
  { name: 'Apr', value: 312000, revenue: 312000 },
  { name: 'May', value: 298000, revenue: 298000 },
  { name: 'Jun', value: 334000, revenue: 334000 },
  { name: 'Jul', value: 356000, revenue: 356000 },
  { name: 'Aug', value: 378000, revenue: 378000 },
  { name: 'Sep', value: 342000, revenue: 342000 },
  { name: 'Oct', value: 389000, revenue: 389000 },
  { name: 'Nov', value: 412000, revenue: 412000 },
  { name: 'Dec', value: 445000, revenue: 445000 }
];

// User Growth Data
export const userGrowthData: ChartDataPoint[] = [
  { name: 'Jan', value: 45230, users: 45230, conversions: 8945 },
  { name: 'Feb', value: 52140, users: 52140, conversions: 9876 },
  { name: 'Mar', value: 48960, users: 48960, conversions: 10234 },
  { name: 'Apr', value: 61200, users: 61200, conversions: 11567 },
  { name: 'May', value: 58940, users: 58940, conversions: 10987 },
  { name: 'Jun', value: 67890, users: 67890, conversions: 12456 },
  { name: 'Jul', value: 72340, users: 72340, conversions: 13234 },
  { name: 'Aug', value: 79120, users: 79120, conversions: 14567 },
  { name: 'Sep', value: 74560, users: 74560, conversions: 13890 },
  { name: 'Oct', value: 83450, users: 83450, conversions: 15234 },
  { name: 'Nov', value: 89760, users: 89760, conversions: 16789 },
  { name: 'Dec', value: 94320, users: 94320, conversions: 17890 }
];

// Channel Performance (Pie Chart)
export const channelData: ChartDataPoint[] = [
  { name: 'Google Ads', value: 35, revenue: 156250 },
  { name: 'Facebook Ads', value: 28, revenue: 125000 },
  { name: 'Instagram Ads', value: 18, revenue: 78750 },
  { name: 'LinkedIn Ads', value: 12, revenue: 52500 },
  { name: 'Twitter Ads', value: 7, revenue: 31250 }
];

// Campaign Performance Table Data
export const campaignData: TableDataRow[] = [
  {
    id: '1',
    campaign: 'Q4 Holiday Campaign',
    platform: 'Google Ads',
    impressions: 2456789,
    clicks: 124567,
    conversions: 3456,
    revenue: 89750,
    ctr: 5.07,
    cpa: 25.97,
    status: 'active'
  },
  {
    id: '2', 
    campaign: 'Brand Awareness Push',
    platform: 'Facebook Ads',
    impressions: 1876543,
    clicks: 98765,
    conversions: 2890,
    revenue: 67890,
    ctr: 5.26,
    cpa: 23.48,
    status: 'active'
  },
  {
    id: '3',
    campaign: 'Product Launch Blitz',
    platform: 'Instagram Ads', 
    impressions: 1543210,
    clicks: 87654,
    conversions: 2456,
    revenue: 56780,
    ctr: 5.68,
    cpa: 23.11,
    status: 'completed'
  },
  {
    id: '4',
    campaign: 'Retargeting Campaign',
    platform: 'Google Ads',
    impressions: 987654,
    clicks: 65432,
    conversions: 1987,
    revenue: 45670,
    ctr: 6.62,
    cpa: 22.98,
    status: 'active'
  },
  {
    id: '5',
    campaign: 'LinkedIn B2B Push',
    platform: 'LinkedIn Ads',
    impressions: 654321,
    clicks: 43210,
    conversions: 1543,
    revenue: 38950,
    ctr: 6.60,
    cpa: 25.24,
    status: 'paused'
  },
  {
    id: '6',
    campaign: 'Video Ad Series',
    platform: 'YouTube Ads',
    impressions: 3210987,
    clicks: 156789,
    conversions: 4321,
    revenue: 98760,
    ctr: 4.88,
    cpa: 22.86,
    status: 'active'
  },
  {
    id: '7',
    campaign: 'Mobile-First Campaign',
    platform: 'Facebook Ads',
    impressions: 1234567,
    clicks: 76543,
    conversions: 2109,
    revenue: 52340,
    ctr: 6.20,
    cpa: 24.82,
    status: 'active'
  },
  {
    id: '8',
    campaign: 'Influencer Collaboration',
    platform: 'Instagram Ads',
    impressions: 876543,
    clicks: 54321,
    conversions: 1876,
    revenue: 43210,
    ctr: 6.20,
    cpa: 23.04,
    status: 'completed'
  }
];

// Enhanced real-time data simulation
let dataUpdateCounter = 0;

export const getRandomMetricUpdate = () => {
  dataUpdateCounter++;
  
  // Simulate different time periods with different growth patterns
  const timeOfDay = new Date().getHours();
  const isBusinessHours = timeOfDay >= 9 && timeOfDay <= 17;
  const multiplier = isBusinessHours ? 1.2 : 0.8;
  
  return {
    revenue: dashboardMetrics.revenue + (Math.random() - 0.5) * 10000 * multiplier,
    users: Math.max(1000, dashboardMetrics.users + Math.floor((Math.random() - 0.5) * 500 * multiplier)),
    conversions: Math.max(50, dashboardMetrics.conversions + Math.floor((Math.random() - 0.5) * 50 * multiplier)),
    growth: Math.max(5, Math.min(35, dashboardMetrics.growth + (Math.random() - 0.5) * 5))
  };
};

// Dynamic revenue data that updates over time
export const getDynamicRevenueData = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  
  return revenueData.map((item, index) => {
    const variance = (Math.random() - 0.5) * 0.3; // ±30% variance
    const seasonalBoost = currentMonth === 11 ? 1.5 : 1; // December boost
    const newValue = item.value * (1 + variance) * seasonalBoost;
    
    return {
      ...item,
      value: Math.round(newValue)
    };
  });
};

export const getDynamicCampaignData = (): TableDataRow[] => {
  return campaignData.map(campaign => {
    const performance = Math.random();
    const impressionsChange = (Math.random() - 0.5) * 0.2; // ±20%
    const clicksChange = (Math.random() - 0.5) * 0.15; // ±15%
    const revenueChange = (Math.random() - 0.5) * 0.25; // ±25%
    
    const newImpressions = Math.round(campaign.impressions * (1 + impressionsChange));
    const newClicks = Math.round(campaign.clicks * (1 + clicksChange));
    const newRevenue = Math.round(campaign.revenue * (1 + revenueChange));
    const newCtr = ((newClicks / newImpressions) * 100);
    
    // Ensure status is one of the allowed values
    let newStatus: 'active' | 'paused' | 'completed';
    if (performance > 0.7) {
      newStatus = 'active';
    } else if (performance > 0.3) {
      newStatus = 'paused';
    } else {
      newStatus = 'active';
    }
    
    return {
      ...campaign,
      impressions: Math.max(1000, newImpressions),
      clicks: Math.max(10, newClicks),
      revenue: Math.max(100, newRevenue),
      ctr: Math.max(0.1, Math.min(15, newCtr)),
      status: newStatus
    };
  });
};

// Dynamic user growth data
export const getDynamicUserGrowthData = () => {
  const baseGrowth = [45230, 52140, 48960, 61200, 58940, 67890, 72340, 79120, 74560, 83450, 89760, 94320];
  
  return baseGrowth.map((value, index) => {
    const variance = (Math.random() - 0.5) * 0.4; // ±40% variance
    const trendMultiplier = 1 + (index * 0.02); // Growing trend
    
    return {
      name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index],
      value: Math.round(value * (1 + variance) * trendMultiplier),
      users: Math.round(value * (1 + variance) * trendMultiplier),
      conversions: Math.round((value * (1 + variance) * trendMultiplier) * 0.2)
    };
  });
};

// Dynamic channel performance data
export const getDynamicChannelData = () => {
  const channels = [
    { name: 'Google Ads', value: 35, revenue: 156250 },
    { name: 'Facebook Ads', value: 28, revenue: 125000 },
    { name: 'Instagram Ads', value: 18, revenue: 78750 },
    { name: 'LinkedIn Ads', value: 12, revenue: 52500 },
    { name: 'Twitter Ads', value: 7, revenue: 31250 }
  ];
  
  return channels.map(channel => {
    const variance = (Math.random() - 0.5) * 0.3; // ±30% variance
    const newValue = Math.max(2, channel.value * (1 + variance));
    const newRevenue = Math.round(channel.revenue * (1 + variance));
    
    return {
      ...channel,
      value: Math.round(newValue),
      revenue: newRevenue
    };
  }).sort((a, b) => b.value - a.value); // Keep sorted by performance
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};