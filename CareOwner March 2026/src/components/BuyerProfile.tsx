import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Building2, MapPin, Calendar, TrendingUp, Users, Award, Mail, Phone, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { mockBuyers, Buyer } from '../data/mockBuyers';

interface BuyerProfileProps {
  buyerId: string;
  onViewOffer?: (offerId: string) => void;
}

export function BuyerProfile({ buyerId, onViewOffer }: BuyerProfileProps) {
  const buyer = mockBuyers.find(b => b.id === buyerId);

  if (!buyer) {
    return (
      <div>
        <h1 className="mb-2 text-[20px] font-semibold">Buyer Not Found</h1>
        <p className="text-muted-foreground">The requested buyer profile could not be found.</p>
      </div>
    );
  }

  const getBuyerTypeBadge = (type: string) => {
    switch (type) {
      case 'Corporate Group':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Corporate Group</Badge>;
      case 'Private Equity':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Private Equity</Badge>;
      case 'Individual Buyer':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Individual Buyer</Badge>;
      case 'Strategic Partner':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Strategic Partner</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 6) return 'bg-yellow-100';
    return 'bg-orange-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="mb-2 text-[24px] font-bold">{buyer.name}</h1>
          {getBuyerTypeBadge(buyer.type)}
          {buyer.website && (
            <a 
              href={buyer.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Website
            </a>
          )}
        </div>
        <p className="text-muted-foreground mb-4">{buyer.description}</p>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button>Schedule Meeting</Button>
          <Button variant="outline">Contact Buyer</Button>
          {onViewOffer && (
            <Button variant="outline" onClick={() => onViewOffer(buyerId)}>View Their Offer</Button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Headquarters</p>
              <p>{buyer.headquarters}</p>
            </div>
          </div>
        </Card>

        {buyer.founded !== 'N/A' && (
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Founded</p>
                <p>{buyer.founded}</p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Acquisitions</p>
              <p>{buyer.totalAcquisitions}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Investment Range</p>
              <p>{buyer.investmentRange}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Evaluation Scores */}
      <Card className="p-6">
        <h2 className="m-[0px]">Buyer Evaluation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 ${getScoreBgColor(buyer.cultureFit)} rounded-lg`}>
                <Users className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-bold">Culture Fit</p>
                <div className="flex items-center gap-2">
                  <p className={`text-2xl ${getScoreColor(buyer.cultureFit)}`}>
                    {buyer.cultureFit}
                  </p>
                  <span className="text-sm text-muted-foreground">/ 10</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              How well the buyer's values and operational style align with your practice culture
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 ${getScoreBgColor(buyer.financialStrength)} rounded-lg`}>
                <TrendingUp className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-bold">Financial Strength</p>
                <div className="flex items-center gap-2">
                  <p className={`text-2xl ${getScoreColor(buyer.financialStrength)}`}>
                    {buyer.financialStrength}
                  </p>
                  <span className="text-sm text-muted-foreground">/ 10</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              The buyer's financial capability to complete the transaction and support practice growth
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 ${getScoreBgColor(buyer.trackRecord)} rounded-lg`}>
                <Award className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-bold">Track Record</p>
                <div className="flex items-center gap-2">
                  <p className={`text-2xl ${getScoreColor(buyer.trackRecord)}`}>
                    {buyer.trackRecord}
                  </p>
                  <span className="text-sm text-muted-foreground">/ 10</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              History of successful practice acquisitions and integration
            </p>
          </div>
        </div>
      </Card>

      {/* Deal Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="m-[0px]">Investment Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-bold">Investment Range</p>
              <p>{buyer.investmentRange}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-bold">Preferred Deal Structure</p>
              <p>{buyer.preferredDealStructure}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="m-[0px] text-[16px]">Post-Acquisition Model</h3>
          <p className="text-muted-foreground">{buyer.postAcquisitionModel}</p>
        </Card>
      </div>

      {/* Strengths & Considerations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="m-[0px]">Strengths</h3>
          <div className="space-y-2">
            {buyer.strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{strength}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="m-[0px]">Considerations</h3>
          <div className="space-y-2">
            {buyer.considerations.map((consideration, index) => (
              <div key={index} className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{consideration}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Acquisitions */}
      {buyer.recentAcquisitions.length > 0 && (
        <Card className="p-6">
          <h3 className="m-[0px]">Recent Acquisitions</h3>
          <div className="space-y-2">
            {buyer.recentAcquisitions.map((acquisition, index) => (
              <div key={index} className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{acquisition}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Key Contacts */}
      <Card className="p-6">
        <h3 className="m-[0px]">Key Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buyer.keyContacts.map((contact, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <p className="mb-1">{contact.name}</p>
              <p className="text-sm text-muted-foreground mb-3">{contact.title}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}