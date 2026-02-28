import { useState } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle, Users, TrendingUp, MapPin, DollarSign, Calendar } from 'lucide-react';

export function DealPreparation() {
  const [activeTab, setActiveTab] = useState('selling');

  const saleReadinessMetrics = [
    {
      title: 'Owner Role & Delegation',
      grade: 'A',
      description: 'A trusted manager or leadership team oversees operations, freeing the owner to focus on strategy and clinical leadership.',
    },
    {
      title: 'Team & Leadership Meetings',
      grade: 'B',
      description: 'Occasional meetings with partial agendas or inconsistent follow-up.',
    },
    {
      title: 'Systems & Tools',
      grade: 'A',
      description: 'Fully integrated digital systems; data flows automatically between PIMS, accounting, and reporting tools. Data is ready to be shared.',
    },
    {
      title: 'Financial Oversight',
      grade: 'B',
      description: 'Reviews P&L occasionally or relies on bookkeeper; limited interpretation.',
    },
    {
      title: 'Operational Processes',
      grade: 'A',
      description: 'Detailed SOPs exist for key workflows (client intake, billing, scheduling, inventory, HR) and are actively used for training.',
    },
    {
      title: 'Facilities',
      grade: 'A',
      description: 'Facilities have suitable space to provide and expand existing services with room for expansion.',
    },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'B':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'C':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const marketCheckResponses = [
    {
      id: '1',
      buyerType: 'Corporate Acquirer',
      offerRange: '$2.8M - $3.2M',
      interest: 'High',
      feedback: 'Strong financial performance and location. Would recommend updating facilities to modern standards to increase value by 10-15%.',
      recommendations: [
        'Modernize waiting room and exam rooms',
        'Install digital X-ray system if not already in place',
      ],
    },
    {
      id: '2',
      buyerType: 'Individual Veterinarian',
      offerRange: '$2.5M - $2.9M',
      interest: 'Medium',
      feedback: 'Good practice fundamentals. Consider formalizing team training programs and documenting SOPs more thoroughly to reduce transition risk.',
      recommendations: [
        'Create comprehensive SOP documentation',
        'Implement formal onboarding program',
      ],
    },
    {
      id: '3',
      buyerType: 'Private Equity Group',
      offerRange: '$3.0M - $3.5M',
      interest: 'High',
      feedback: 'Excellent EBITDA margins and growth trajectory. Strengthening financial reporting systems would support higher valuation multiples.',
      recommendations: [
        'Implement monthly financial dashboards',
        'Establish KPI tracking system',
      ],
    },
    {
      id: '4',
      buyerType: 'Regional Chain',
      offerRange: '$2.6M - $3.0M',
      interest: 'Medium',
      feedback: 'Great market position. Owner transition plan could be more detailed to ensure continuity of client relationships.',
      recommendations: [
        'Document key client relationships',
        'Develop 12-month transition timeline',
      ],
    },
  ];

  const getInterestColor = (interest: string) => {
    switch (interest) {
      case 'High':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Deal Preparation</h1>
        <p className="text-muted-foreground">
          Prepare your practice for sale and understand market interest
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="selling">Selling</TabsTrigger>
          <TabsTrigger value="buyer-preferences">Buyer Preferences</TabsTrigger>
          <TabsTrigger value="market-check">Market Check</TabsTrigger>
        </TabsList>

        <TabsContent value="selling" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="mb-4">Sale Readiness</h3>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-green-600">Ready to Sell</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Your practice demonstrates strong fundamentals and operational maturity. The metrics below show specific areas of strength and opportunities for improvement before going to market.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {saleReadinessMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${getGradeColor(metric.grade)}`}>
                      <span className="text-xl">{metric.grade}</span>
                    </div>
                    <h4 className="flex-1">{metric.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="buyer-preferences" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="m-[0px] font-bold font-normal text-[16px]">Ideal Buyer Profile</h3>
            <p className="text-muted-foreground m-[0px]">
              Based on your preferences and practice characteristics, here's what you're looking for in a potential buyer.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    Buyer Type Preferences
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Individual Veterinarian</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Small Practice Group (2-5 locations)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Corporate Chain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Private Equity</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-[8px] flex items-center gap-2 mt-[12px] mr-[0px] ml-[0px] pt-[12px] pr-[0px] pb-[0px] pl-[0px]">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    Geographic Preferences
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Prefer buyers familiar with the local market or committed to maintaining community presence
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    Deal Structure
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Cash at closing preferred</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Open to earnout (up to 20%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Seller financing considered</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 flex items-center gap-2 pt-[12px] pr-[0px] pb-[0px] pl-[0px]">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    Transition Timeline
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Committed to 6-12 month transition period to ensure continuity
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Target close:</span> Q2 2025
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Transition support:</span> Through Q4 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="mb-2">Core Values</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Commitment to team retention and professional development</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Maintaining high standards of patient care and client service</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Preserving community relationships and local involvement</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="market-check" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="mb-2">Market Check Overview</h3>
                <p className="text-sm text-muted-foreground">
                  Anonymous practice summaries were shared with qualified buyers. Below are their indicative offer ranges and recommendations for increasing practice value.
                </p>
              </div>
              <Button variant="outline" className="ml-4 flex-shrink-0">
                Request Market Check
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-green-50 border-green-200">
            <h4 className="mb-2">Summary</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Based on these market responses, your practice valuation range is estimated at <span className="text-green-600">$2.5M - $3.5M</span> with strong buyer interest.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Top recommendation: Strengthen financial reporting and KPI tracking</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Secondary recommendation: Document transition plan and key relationships</p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {marketCheckResponses.map((response) => (
              <Card key={response.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="mb-1">{response.buyerType}</h4>
                    <Badge variant="secondary" className={getInterestColor(response.interest)}>
                      {response.interest} Interest
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Indicative Offer Range</p>
                    <p className="text-xl text-green-600">{response.offerRange}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Feedback</p>
                  <p className="text-sm">{response.feedback}</p>
                </div>

                {response.recommendations.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Recommendations to Increase Value</p>
                    <div className="space-y-1">
                      {response.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
