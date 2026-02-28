import { useState } from 'react';
import { Practice } from '../types/practice';
import { Button } from './ui/button';
import { Upload, Link } from 'lucide-react';
import { FinancialsTab } from './FinancialsTab';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface FinancialsProps {
  practice: Practice;
}

export function Financials({ practice }: FinancialsProps) {
  const [timePeriod, setTimePeriod] = useState('last-12-months');
  const [compareTo, setCompareTo] = useState<'previous' | 'market'>('previous');
  const [compareEnabled, setCompareEnabled] = useState(true);

  // Mock connected accounts data
  const connectedAccounts = [
    'QuickBooks Online',
    'Chase Business Account',
    'Square Payments'
  ];

  // Get current date and time for "Last updated"
  const lastUpdated = new Date();
  const lastUpdatedString = lastUpdated.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }) + ' at ' + lastUpdated.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div className="space-y-6">
      {/* Header with buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="mb-2 text-[20px] font-semibold">Financials</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Badge variant="secondary" className="cursor-help">
                    {connectedAccounts.length} accounts connected
                  </Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-medium">Connected Accounts:</p>
                  {connectedAccounts.map((account, index) => (
                    <p key={index} className="text-sm">• {account}</p>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button>
            <Link className="w-4 h-4 mr-2" />
            Connect
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Label htmlFor="time-period" className="whitespace-nowrap">Time Period</Label>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger id="time-period" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-12-months">Last 12 Months</SelectItem>
                <SelectItem value="year-to-date">Year to Date</SelectItem>
                <SelectItem value="ttm">Trailing 12 Months (TTM)</SelectItem>
                <SelectItem value="custom">Custom Period</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="compare-enabled" 
                checked={compareEnabled}
                onCheckedChange={(checked) => setCompareEnabled(checked as boolean)}
              />
              <Label htmlFor="compare-enabled" className="whitespace-nowrap cursor-pointer">
                Compare to
              </Label>
            </div>
            <Select 
              value={compareTo} 
              onValueChange={(value) => setCompareTo(value as 'previous' | 'market')}
              disabled={!compareEnabled}
            >
              <SelectTrigger id="compare-to" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="previous">Previous Period</SelectItem>
                <SelectItem value="market">Market Benchmarks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-muted-foreground whitespace-nowrap">
          Last updated: {lastUpdatedString}
        </div>
      </div>

      {/* Financial content */}
      <FinancialsTab practice={practice} compareTo={compareTo} />
    </div>
  );
}
