import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';
import { userGrowthData } from '@/lib/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-elegant">
        <p className="text-foreground font-medium">{`${label} 2024`}</p>
        <p className="text-primary">
          Users: <span className="font-semibold">{payload[0].value.toLocaleString()}</span>
        </p>
        <p className="text-success">
          Conversions: <span className="font-semibold">{payload[1].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function UserGrowthChart() {
  return (
    <ChartContainer 
      title="User Growth & Conversions" 
      description="Monthly user acquisition and conversion tracking"
      variant="success"
    >
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={userGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="conversionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="users"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="url(#usersGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="conversions"
              stackId="2"
              stroke="hsl(var(--success))"
              fill="url(#conversionsGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}