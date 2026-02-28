import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Building2, MapPin, Calendar, TrendingUp, Users, Award, Clock, Archive, Search } from 'lucide-react';
import { mockBuyers } from '../data/mockBuyers';

interface BuyersProps {
  onViewBuyer: (buyerId: string) => void;
  onExploreBuyers?: () => void;
}

export function Buyers({ onViewBuyer, onExploreBuyers }: BuyersProps) {
  const [buyerType, setBuyerType] = useState('all-buyers');
  const [searchQuery, setSearchQuery] = useState('');

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'offer-submitted':
        return <Badge className="bg-green-600 text-white">Offer Submitted</Badge>;
      case 'in-discussion':
        return <Badge className="bg-blue-600 text-white">In Discussion</Badge>;
      case 'initial-interest':
        return <Badge className="bg-gray-600 text-white">Initial Interest</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-orange-600';
  };

  // Categorize buyers by status
  const buyersWithOffers = mockBuyers.filter(b => b.status === 'offer-submitted');
  const buyersActiveInterest = mockBuyers.filter(b => b.status === 'in-discussion' || b.status === 'initial-interest');
  const buyersSavedContacted = []; // Empty for now - would be populated with saved/contacted buyers
  const buyersPrevious = mockBuyers.filter(b => b.status === 'rejected' || b.status === 'archived');

  // Filter buyers based on current selection and search query
  const getCurrentBuyers = () => {
    let buyers;
    switch (buyerType) {
      case 'all-buyers':
        buyers = mockBuyers;
        break;
      case 'submitted-offers':
        buyers = buyersWithOffers;
        break;
      case 'active-interest':
        buyers = buyersActiveInterest;
        break;
      case 'saved-contacted':
        buyers = buyersSavedContacted;
        break;
      case 'previous':
        buyers = buyersPrevious;
        break;
      default:
        buyers = mockBuyers;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return buyers.filter(b => 
        b.name.toLowerCase().includes(query) ||
        b.type.toLowerCase().includes(query) ||
        b.headquarters.toLowerCase().includes(query)
      );
    }

    return buyers;
  };

  const currentBuyers = getCurrentBuyers();

  const renderBuyerCard = (buyer: typeof mockBuyers[0]) => (
    <Card key={buyer.id} className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 
                onClick={() => onViewBuyer(buyer.id)}
                className="cursor-pointer hover:text-primary transition-colors font-bold text-[20px]"
              >
                {buyer.name}
              </h2>
              {getBuyerTypeBadge(buyer.type)}
              {getStatusBadge(buyer.status)}
            </div>
            <p className="text-muted-foreground mb-3">{buyer.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{buyer.headquarters}</span>
              </div>
              {buyer.founded !== 'N/A' && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Founded {buyer.founded}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>{buyer.totalAcquisitions} {buyer.totalAcquisitions === 1 ? 'Acquisition' : 'Acquisitions'}</span>
              </div>
              {buyer.lastContact && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Last contact: {buyer.lastContact}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground mb-1 font-bold">Culture Fit</p>
            <div className="flex items-center gap-2">
              <p className={`text-2xl ${getScoreColor(buyer.cultureFit)}`}>
                {buyer.cultureFit}
              </p>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 font-bold">Financial Strength</p>
            <div className="flex items-center gap-2">
              <p className={`text-2xl ${getScoreColor(buyer.financialStrength)}`}>
                {buyer.financialStrength}
              </p>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 font-bold">Track Record</p>
            <div className="flex items-center gap-2">
              <p className={`text-2xl ${getScoreColor(buyer.trackRecord)}`}>
                {buyer.trackRecord}
              </p>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>
          </div>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-1 font-bold">Investment Range</p>
            <p className="text-muted-foreground">{buyer.investmentRange}</p>
          </div>
          <div>
            <p className="text-sm mb-1 font-bold">Preferred Deal Structure</p>
            <p className="text-muted-foreground">{buyer.preferredDealStructure}</p>
          </div>
        </div>

        {/* Recent Acquisitions */}
        {buyer.recentAcquisitions.length > 0 && (
          <div>
            <p className="text-sm mb-2 font-bold">Recent Acquisitions</p>
            <div className="space-y-1">
              {buyer.recentAcquisitions.slice(0, 2).map((acquisition, index) => (
                <p key={index} className="text-sm text-muted-foreground">• {acquisition}</p>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t">
          <Button onClick={() => onViewBuyer(buyer.id)}>View Full Profile</Button>
          <Button variant="outline">Schedule Meeting</Button>
          <Button variant="outline">Contact Buyer</Button>
        </div>
      </div>
    </Card>
  );

  const getEmptyState = () => {
    switch (buyerType) {
      case 'all-buyers':
        return {
          icon: <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />,
          title: 'No Buyers',
          description: "No buyers found matching your search."
        };
      case 'submitted-offers':
        return {
          icon: <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />,
          title: 'No Submitted Offers',
          description: "You don't have any submitted offers at this time."
        };
      case 'active-interest':
        return {
          icon: <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />,
          title: 'No Active Interest',
          description: "You don't have any buyers currently in discussion or expressing interest."
        };
      case 'saved-contacted':
        return {
          icon: <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />,
          title: 'No Saved or Contacted Buyers',
          description: "You haven't saved or contacted any buyers yet."
        };
      case 'previous':
        return {
          icon: <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-3" />,
          title: 'No Previous Buyers',
          description: "You don't have any archived or rejected buyers."
        };
      default:
        return {
          icon: <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />,
          title: 'No Buyers',
          description: "No buyers found."
        };
    }
  };

  const emptyState = getEmptyState();

  return (
    <div className="space-y-6">
      {/* Header with Explore Buyers button */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 m-[0px]">
            <h1 className="m-[0px] font-bold text-[20px]">Buyers</h1>
            <Badge className="bg-primary text-primary-foreground">
              {mockBuyers.length} Total
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Review profiles of potential buyers who have submitted offers or expressed interest in acquiring your practice
          </p>
        </div>
        {onExploreBuyers && (
          <Button onClick={onExploreBuyers}>
            Explore Buyers
          </Button>
        )}
      </div>

      {/* My Buyers Section */}
      <div className="space-y-4">
        <h2>My Buyers</h2>

        {/* Filter and Search Bar */}
        <div className="flex gap-3">
          <Select value={buyerType} onValueChange={setBuyerType}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Buyer Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-buyers">
                All Buyers ({mockBuyers.length})
              </SelectItem>
              <SelectItem value="submitted-offers">
                Submitted Offers ({buyersWithOffers.length})
              </SelectItem>
              <SelectItem value="active-interest">
                Active Interest ({buyersActiveInterest.length})
              </SelectItem>
              <SelectItem value="saved-contacted">
                Saved/Contacted ({buyersSavedContacted.length})
              </SelectItem>
              <SelectItem value="previous">
                Previous ({buyersPrevious.length})
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search buyers by name, type, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Buyer Cards */}
      <div className="space-y-6">
        {currentBuyers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {currentBuyers.map((buyer) => renderBuyerCard(buyer))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            {emptyState.icon}
            <h3 className="mb-2">{emptyState.title}</h3>
            <p className="text-muted-foreground">
              {emptyState.description}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}