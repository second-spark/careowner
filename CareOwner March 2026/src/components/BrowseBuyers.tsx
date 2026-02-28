import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Building2, MapPin, Calendar, Clock, Search, Heart, Mail, ChevronLeft } from 'lucide-react';
import { mockBuyers, Buyer } from '../data/mockBuyers';

interface BrowseBuyersProps {
  onViewBuyer: (buyerId: string) => void;
  onBack: () => void;
}

export function BrowseBuyers({ onViewBuyer, onBack }: BrowseBuyersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [savedBuyers, setSavedBuyers] = useState<Set<string>>(new Set());
  const [contactedBuyers, setContactedBuyers] = useState<Set<string>>(new Set());

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

  const handleToggleSave = (buyerId: string) => {
    const newSavedBuyers = new Set(savedBuyers);
    if (newSavedBuyers.has(buyerId)) {
      newSavedBuyers.delete(buyerId);
    } else {
      newSavedBuyers.add(buyerId);
    }
    setSavedBuyers(newSavedBuyers);
  };

  const handleContact = (buyerId: string) => {
    const newContactedBuyers = new Set(contactedBuyers);
    newContactedBuyers.add(buyerId);
    setContactedBuyers(newContactedBuyers);
    // In a real app, this would open a contact modal or send a message
  };

  // Filter buyers based on search and type filter
  const getFilteredBuyers = () => {
    let buyers = [...mockBuyers];

    // Apply type filter
    if (filterType !== 'all') {
      buyers = buyers.filter(b => b.type === filterType);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      buyers = buyers.filter(b => 
        b.name.toLowerCase().includes(query) ||
        b.type.toLowerCase().includes(query) ||
        b.headquarters.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query)
      );
    }

    return buyers;
  };

  const filteredBuyers = getFilteredBuyers();

  const renderBuyerCard = (buyer: Buyer) => (
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
              {savedBuyers.has(buyer.id) && (
                <Badge className="bg-red-100 text-red-700 border-red-200">
                  <Heart className="w-3 h-3 mr-1 fill-current" />
                  Saved
                </Badge>
              )}
              {contactedBuyers.has(buyer.id) && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  Contacted
                </Badge>
              )}
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
          <Button 
            variant={savedBuyers.has(buyer.id) ? "default" : "outline"}
            onClick={() => handleToggleSave(buyer.id)}
          >
            <Heart className={`w-4 h-4 mr-2 ${savedBuyers.has(buyer.id) ? 'fill-current' : ''}`} />
            {savedBuyers.has(buyer.id) ? 'Saved' : 'Save'}
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleContact(buyer.id)}
            disabled={contactedBuyers.has(buyer.id)}
          >
            <Mail className="w-4 h-4 mr-2" />
            {contactedBuyers.has(buyer.id) ? 'Contacted' : 'Contact'}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 -ml-2"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to My Buyers
        </Button>
        <div className="flex items-center gap-3 m-[0px]">
          <h1 className="m-[0px] font-bold text-[20px]">Browse Buyers</h1>
          <Badge className="bg-primary text-primary-foreground">
            {filteredBuyers.length} {filteredBuyers.length === 1 ? 'Buyer' : 'Buyers'}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Explore all buyers in the system, view their profiles, and save or contact them
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex gap-3">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Corporate Group">Corporate Group</SelectItem>
            <SelectItem value="Private Equity">Private Equity</SelectItem>
            <SelectItem value="Individual Buyer">Individual Buyer</SelectItem>
            <SelectItem value="Strategic Partner">Strategic Partner</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search buyers by name, type, location, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Corporate Groups</p>
              <p className="text-2xl">{mockBuyers.filter(b => b.type === 'Corporate Group').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Private Equity</p>
              <p className="text-2xl">{mockBuyers.filter(b => b.type === 'Private Equity').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Individual Buyers</p>
              <p className="text-2xl">{mockBuyers.filter(b => b.type === 'Individual Buyer').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Building2 className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Strategic Partners</p>
              <p className="text-2xl">{mockBuyers.filter(b => b.type === 'Strategic Partner').length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Buyer Cards */}
      <div className="space-y-6">
        {filteredBuyers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredBuyers.map((buyer) => renderBuyerCard(buyer))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="mb-2">No Buyers Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
