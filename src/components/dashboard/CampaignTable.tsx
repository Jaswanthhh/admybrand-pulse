import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Search, Download } from 'lucide-react';
import { campaignData, TableDataRow } from '@/lib/mockData';
import { cn } from '@/lib/utils';

type SortField = keyof TableDataRow;
type SortDirection = 'asc' | 'desc';

export function CampaignTable() {
  const [data, setData] = useState<TableDataRow[]>(campaignData);
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredData = data.filter(row =>
    row.campaign.toLowerCase().includes(filter.toLowerCase()) ||
    row.platform.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue as string)
        : (bValue as string).localeCompare(aValue);
    }
    
    return sortDirection === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="w-4 h-4 opacity-30" />;
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-primary" />
      : <ChevronDown className="w-4 h-4 text-primary" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/20 text-success border-success/30">Active</Badge>;
      case 'paused':
        return <Badge className="bg-warning/20 text-warning border-warning/30">Paused</Badge>;
      case 'completed':
        return <Badge className="bg-muted/20 text-muted-foreground border-muted/30">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="backdrop-blur-sm border-border/50">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <CardTitle className="text-xl font-semibold">Campaign Performance</CardTitle>
          <Button variant="outline" size="sm" className="w-fit">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns or platforms..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">
                    <button 
                      onClick={() => handleSort('campaign')}
                      className="flex items-center space-x-1 hover:text-primary transition-colors"
                    >
                      <span>Campaign</span>
                      <SortIcon field="campaign" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <button 
                      onClick={() => handleSort('platform')}
                      className="flex items-center space-x-1 hover:text-primary transition-colors"
                    >
                      <span>Platform</span>
                      <SortIcon field="platform" />
                    </button>
                  </th>
                  <th className="text-right p-4 font-medium">
                    <button 
                      onClick={() => handleSort('impressions')}
                      className="flex items-center space-x-1 hover:text-primary transition-colors ml-auto"
                    >
                      <span>Impressions</span>
                      <SortIcon field="impressions" />
                    </button>
                  </th>
                  <th className="text-right p-4 font-medium">
                    <button 
                      onClick={() => handleSort('clicks')}
                      className="flex items-center space-x-1 hover:text-primary transition-colors ml-auto"
                    >
                      <span>Clicks</span>
                      <SortIcon field="clicks" />
                    </button>
                  </th>
                  <th className="text-right p-4 font-medium">
                    <button 
                      onClick={() => handleSort('conversions')}
                      className="flex items-center space-x-1 hover:text-primary transition-colors ml-auto"
                    >
                      <span>Conversions</span>
                      <SortIcon field="conversions" />
                    </button>
                  </th>
                  <th className="text-right p-4 font-medium">
                    <button 
                      onClick={() => handleSort('revenue')}
                      className="flex items-center space-x-1 hover:text-primary transition-colors ml-auto"
                    >
                      <span>Revenue</span>
                      <SortIcon field="revenue" />
                    </button>
                  </th>
                  <th className="text-right p-4 font-medium">
                    <button 
                      onClick={() => handleSort('ctr')}
                      className="flex items-center space-x-1 hover:text-primary transition-colors ml-auto"
                    >
                      <span>CTR</span>
                      <SortIcon field="ctr" />
                    </button>
                  </th>
                  <th className="text-center p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className={cn(
                      "border-t border-border/50 hover:bg-muted/30 transition-colors",
                      index % 2 === 0 && "bg-muted/10"
                    )}
                  >
                    <td className="p-4 font-medium">{row.campaign}</td>
                    <td className="p-4 text-muted-foreground">{row.platform}</td>
                    <td className="p-4 text-right">{row.impressions.toLocaleString()}</td>
                    <td className="p-4 text-right">{row.clicks.toLocaleString()}</td>
                    <td className="p-4 text-right">{row.conversions.toLocaleString()}</td>
                    <td className="p-4 text-right font-medium">${row.revenue.toLocaleString()}</td>
                    <td className="p-4 text-right">{row.ctr.toFixed(2)}%</td>
                    <td className="p-4 text-center">{getStatusBadge(row.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} campaigns
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}