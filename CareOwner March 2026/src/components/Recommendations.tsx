import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
  category: string;
  potentialValueIncrease: string;
  status: 'new' | 'in-progress' | 'completed';
}

const recommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Verify Financial Data with Accounting Software',
    description: 'Connect your practice management software (e.g., QuickBooks, Xero) to provide verified financial data. Buyers pay a premium for practices with validated financials as it reduces due diligence risk and increases confidence in reported numbers.',
    impact: 'High',
    effort: 'Low',
    category: 'Financials',
    potentialValueIncrease: '+8-12%',
    status: 'new',
  },
  {
    id: '2',
    title: 'Document Standard Operating Procedures',
    description: 'Create comprehensive documentation for all key business processes including patient care protocols, administrative procedures, and staff training materials. Well-documented practices are easier to transition and command higher valuations.',
    impact: 'High',
    effort: 'Medium',
    category: 'Operations',
    potentialValueIncrease: '+5-8%',
    status: 'new',
  },
  {
    id: '3',
    title: 'Extend Hours of Operation',
    description: 'Consider extending your hours to include early morning or evening appointments to capture working pet owners. Increased revenue potential and market coverage makes your practice more attractive to buyers looking for growth opportunities.',
    impact: 'Medium',
    effort: 'Medium',
    category: 'Revenue Growth',
    potentialValueIncrease: '+10-15%',
    status: 'new',
  },
  {
    id: '4',
    title: 'Reduce Owner Dependency',
    description: 'Delegate key responsibilities and decision-making to senior staff members. Document client relationships and ensure continuity plans are in place. Practices that can operate independently of the owner are significantly more valuable and easier to sell.',
    impact: 'High',
    effort: 'High',
    category: 'Operations',
    potentialValueIncrease: '+15-20%',
    status: 'new',
  },
];

export function Recommendations() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-green-600 text-white';
      case 'Medium':
        return 'bg-yellow-600 text-white';
      case 'Low':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="mb-2 text-[20px] font-semibold">Recommendations</h1>
          <Badge className="bg-primary text-primary-foreground">
            {recommendations.length} New
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Actionable recommendations to increase your practice valuation and appeal to potential buyers
        </p>
      </div>

      {/* Summary Card */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-600 text-white rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1">Total Potential Value Increase</h3>
            <p className="text-3xl mb-2 text-green-700">+38-55%</p>
            <p className="text-sm text-muted-foreground">
              By implementing all recommendations below, you could significantly increase your practice valuation
            </p>
          </div>
        </div>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <Card key={rec.id} className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{rec.title}</h3>
                    {rec.status === 'new' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{rec.description}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <Badge variant="secondary">{rec.category}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Impact:</span>
                  <Badge className={getImpactColor(rec.impact)}>{rec.impact}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Effort:</span>
                  <Badge variant="outline" className={getEffortColor(rec.effort)}>
                    {rec.effort}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Value Increase:</span>
                  <span className="text-green-700">{rec.potentialValueIncrease}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button>Start Implementation</Button>
                <Button variant="outline">Learn More</Button>
                <Button variant="ghost">Dismiss</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Help Card */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="mb-1">Need Help?</p>
            <p className="text-sm text-muted-foreground">
              Our team of practice valuation experts can help you prioritize and implement these recommendations. 
              Contact your advisor to schedule a consultation.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
