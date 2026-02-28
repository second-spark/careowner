import { Practice } from '../types/practice';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle2, AlertCircle, DollarSign, TrendingUp, Percent, Calculator, Target, ThumbsUp, ThumbsDown, ArrowUp, ArrowDown, CreditCard, Receipt } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';

interface FinancialsTabProps {
  practice: Practice;
  compareTo: 'previous' | 'market';
}

export function FinancialsTab({ practice, compareTo }: FinancialsTabProps) {
  const { financials } = practice;

  // Mock comparison data
  const getComparisonData = (metric: string) => {
    if (compareTo === 'previous') {
      // Previous period comparisons (mostly positive growth)
      const comparisons: { [key: string]: { change: number; isPositive: boolean } } = {
        revenue: { change: 12.5, isPositive: true },
        ebitda: { change: 15.3, isPositive: true },
        ebitdaMargin: { change: 2.1, isPositive: true },
        revenueMultiple: { change: 0.8, isPositive: true },
        totalTransactions: { change: 8.2, isPositive: true },
        avgTransactionSize: { change: 3.9, isPositive: true },
      };
      return comparisons[metric];
    } else {
      // Market benchmark comparisons (mixed results)
      const comparisons: { [key: string]: { change: number; isPositive: boolean } } = {
        revenue: { change: 5.7, isPositive: true },
        ebitda: { change: 3.2, isPositive: true },
        ebitdaMargin: { change: -1.5, isPositive: false },
        revenueMultiple: { change: -2.3, isPositive: false },
        totalTransactions: { change: 4.1, isPositive: true },
        avgTransactionSize: { change: 1.8, isPositive: true },
      };
      return comparisons[metric];
    }
  };

  // Generate mock financial data for 12 months past + 3 months future
  const generateFinancialData = () => {
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    
    // Historical data (12 months) - Oct 2024 to Sep 2025
    for (let i = 0; i < 12; i++) {
      data.push({
        month: months[i],
        revenue: 180000 + Math.random() * 60000, // Revenue between $180k-$240k
        expenses: 120000 + Math.random() * 40000, // Expenses between $120k-$160k
        isFuture: false
      });
    }
    
    // Future predictions (3 months) - Oct 2025 to Dec 2025
    for (let i = 12; i < 15; i++) {
      data.push({
        month: months[i],
        revenue: 200000 + Math.random() * 50000, // Slightly higher projected revenue
        expenses: 130000 + Math.random() * 35000, // Slightly higher projected expenses
        isFuture: true
      });
    }
    
    return data;
  };

  const financialData = generateFinancialData();

  // Custom bar shape for revenue
  const CustomRevenueBar = (props: any) => {
    const { fill, x, y, width, height, payload } = props;
    
    if (payload.isFuture) {
      return (
        <Rectangle
          x={x}
          y={y}
          width={width}
          height={height}
          fill="transparent"
          stroke="#10b981"
          strokeWidth={2}
          radius={[4, 4, 0, 0]}
        />
      );
    }
    
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        radius={[4, 4, 0, 0]}
      />
    );
  };

  // Custom bar shape for expenses
  const CustomExpensesBar = (props: any) => {
    const { fill, x, y, width, height, payload } = props;
    
    if (payload.isFuture) {
      return (
        <Rectangle
          x={x}
          y={y}
          width={width}
          height={height}
          fill="transparent"
          stroke="#ef4444"
          strokeWidth={2}
          radius={[4, 4, 0, 0]}
        />
      );
    }
    
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        radius={[4, 4, 0, 0]}
      />
    );
  };

  const FinancialMetricCard = ({ 
    title, 
    value, 
    verified, 
    icon: Icon,
    comparisonKey
  }: { 
    title: string; 
    value: string; 
    verified: boolean; 
    icon: React.ElementType;
    comparisonKey: string;
  }) => {
    const comparison = getComparisonData(comparisonKey);
    
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between m-[0px]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl">{value}</p>
                {comparison && (
                  <div className={`flex items-center gap-1 ${comparison.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {comparison.isPositive ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    <span className="text-sm">{Math.abs(comparison.change)}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {verified ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-orange-600">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">Self-Reported</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {verified 
            ? 'Data verified through connected financial software'
            : 'Based on owner-provided information'}
        </p>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Financial Health Indicators */}
      <Card className="p-6">
        <h3 className="m-[0px]">Financial Health Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p>Strong EBITDA Margin</p>
                <p className="text-sm text-muted-foreground">
                  26% margin indicates healthy profitability
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p>Consistent Revenue Growth</p>
                <p className="text-sm text-muted-foreground">
                  12% YoY growth demonstrates market demand
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <div>
                <p>Verified Financial Data</p>
                <p className="text-sm text-muted-foreground">
                  Connected to QuickBooks for accurate reporting
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Growth Score and Deal Appeal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Growth Score</h3>
              <div className="flex items-end gap-4 mb-3">
                <span className="text-4xl text-green-600">{practice.growthScore}</span>
                <span className="text-muted-foreground mb-1">/ 100</span>
              </div>
              <Progress value={practice.growthScore} className="mb-3 h-2" />
              <p className="text-muted-foreground">{practice.growthDescription}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Deal Appeal</h3>
              <div className="flex items-end gap-4 mb-3">
                <span className="text-4xl text-blue-600">{practice.dealMatchScore}</span>
                <span className="text-muted-foreground mb-1">/ 100</span>
              </div>
              <Progress value={practice.dealMatchScore} className="mb-3 h-2" />
              <div className="space-y-2">
                {practice.dealMatchCriteria.map((criterion, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {criterion.isPositive ? (
                      <ThumbsUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <ThumbsDown className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm text-muted-foreground">{criterion.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinancialMetricCard
          title="Annual Revenue"
          value={financials.annualRevenue.value}
          verified={financials.annualRevenue.verified}
          icon={DollarSign}
          comparisonKey="revenue"
        />
        
        <FinancialMetricCard
          title="EBITDA"
          value={financials.ebitda.value}
          verified={financials.ebitda.verified}
          icon={TrendingUp}
          comparisonKey="ebitda"
        />
        
        <FinancialMetricCard
          title="EBITDA Margin"
          value={financials.ebitdaMargin.value}
          verified={financials.ebitdaMargin.verified}
          icon={Percent}
          comparisonKey="ebitdaMargin"
        />
        
        <FinancialMetricCard
          title="Revenue Multiple"
          value={financials.revenueMultiple.value}
          verified={financials.revenueMultiple.verified}
          icon={Calculator}
          comparisonKey="revenueMultiple"
        />

        <FinancialMetricCard
          title="Total Transactions"
          value="12,458"
          verified={true}
          icon={Receipt}
          comparisonKey="totalTransactions"
        />

        <FinancialMetricCard
          title="Average Transaction Size"
          value="$187"
          verified={true}
          icon={CreditCard}
          comparisonKey="avgTransactionSize"
        />
      </div>

      {/* Monthly Financial Performance */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="m-0">Monthly Financial Performance</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Revenue and expenses for the last 12 months with 3-month projections
          </p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={financialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value: number) => `${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            />
            <Bar 
              dataKey="revenue" 
              name="Revenue"
              fill="#10b981"
              shape={<CustomRevenueBar />}
            />
            <Bar 
              dataKey="expenses" 
              name="Expenses"
              fill="#ef4444"
              shape={<CustomExpensesBar />}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Solid bars = Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-500 rounded"></div>
            <span>Outlined bars = Projected</span>
          </div>
        </div>
      </Card>

      {/* Revenue and Expenses Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <Card className="p-6">
          <h3 className="mb-4">Revenue Breakdown (Last 12 mo)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Consultations</span>
                <span className="text-sm">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Surgeries</span>
                <span className="text-sm">28%</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Medications & Supplies</span>
                <span className="text-sm">18%</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Boarding & Grooming</span>
                <span className="text-sm">8%</span>
              </div>
              <Progress value={8} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Other Services</span>
                <span className="text-sm">4%</span>
              </div>
              <Progress value={4} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Expenses Breakdown */}
        <Card className="p-6">
          <h3 className="mb-4">Expenses Breakdown (Last 12 mo)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Staff Salaries</span>
                <span className="text-sm">48%</span>
              </div>
              <Progress value={48} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Medical Supplies</span>
                <span className="text-sm">22%</span>
              </div>
              <Progress value={22} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Rent & Utilities</span>
                <span className="text-sm">15%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Equipment & Maintenance</span>
                <span className="text-sm">8%</span>
              </div>
              <Progress value={8} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Other Expenses</span>
                <span className="text-sm">7%</span>
              </div>
              <Progress value={7} className="h-2" />
            </div>
          </div>
        </Card>
      </div>

      {/* Important Note */}
      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="mb-1">Important Note</p>
            <p className="text-sm text-muted-foreground">
              Financial data marked as "Verified" has been validated through direct integration 
              with the practice's accounting software. Self-reported data should be verified during 
              due diligence. Contact the broker for detailed financial statements and tax returns.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
