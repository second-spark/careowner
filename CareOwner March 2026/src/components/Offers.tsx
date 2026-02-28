import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { ArrowUpDown, LayoutGrid, TableIcon, CheckCircle, XCircle, GripVertical, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface OffersProps {
  onViewBuyer: (buyerId: string) => void;
  onViewOffer: (offerId: string) => void;
}

interface Incentive {
  type: string;
  description: string;
  value?: string;
}

interface Offer {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: 'Corporate Group' | 'Private Equity' | 'Individual Buyer' | 'Strategic Partner' | 'Parent Company' | 'Joint Venture';
  offerAmount: string;
  offerAmountNum: number;
  receivedDate: string;
  expirationDate: string;
  status: 'pending' | 'under-review' | 'accepted' | 'declined';
  day1Valuation: string;
  day1ValuationNum: number;
  day1Cash: string;
  day1CashNum: number;
  percentageBuying: number;
  employmentTerm: string;
  employmentYears: number;
  incentives: Incentive[];
  highlights: string[];
  concerns: string[];
}

const offers: Offer[] = [
  {
    id: '1',
    buyerId: '1',
    buyerName: 'VetCorp Partners',
    buyerType: 'Parent Company',
    offerAmount: '$3,200,000',
    offerAmountNum: 3200000,
    receivedDate: 'October 2, 2025',
    expirationDate: 'October 16, 2025',
    status: 'pending',
    day1Valuation: '$3,200,000',
    day1ValuationNum: 3200000,
    day1Cash: '$2,560,000',
    day1CashNum: 2560000,
    percentageBuying: 100,
    employmentTerm: '3 years',
    employmentYears: 3,
    incentives: [
      { type: 'Sign-on Bonus', description: '$50,000 cash bonus for associates', value: '$50,000' },
      { type: 'Equity Option', description: 'Option to purchase 10% equity at 20% discount', value: '10% equity' },
      { type: 'Retention Bonus', description: 'Team retention bonus if 90% of staff remain after 1 year', value: '$25,000' }
    ],
    highlights: [
      'All-cash offer with minimal earnout',
      'Competitive valuation at 3.2x revenue',
      'Retain full clinical autonomy for 3 years',
      'Keep existing team intact'
    ],
    concerns: [
      'Requires 3-year employment commitment',
      'Some concerns about corporate culture fit'
    ]
  },
  {
    id: '2',
    buyerId: '2',
    buyerName: 'Lakeside Veterinary Group',
    buyerType: 'Joint Venture',
    offerAmount: '$3,450,000',
    offerAmountNum: 3450000,
    receivedDate: 'September 28, 2025',
    expirationDate: 'October 12, 2025',
    status: 'under-review',
    day1Valuation: '$3,450,000',
    day1ValuationNum: 3450000,
    day1Cash: '$2,415,000',
    day1CashNum: 2415000,
    percentageBuying: 80,
    employmentTerm: '2 years',
    employmentYears: 2,
    incentives: [
      { type: 'Facility Upgrade', description: '$150,000 for facility improvements', value: '$150,000' },
      { type: 'Associate Sign-on', description: '$30,000 cash for each associate who stays 2 years', value: '$30,000 per associate' },
      { type: 'Performance Bonus', description: 'Annual bonus up to $75,000 based on growth targets', value: 'Up to $75,000/year' }
    ],
    highlights: [
      'Highest offer received',
      'Local group with similar practice philosophy',
      'Strong regional presence and reputation',
      'Investment in facility upgrades included'
    ],
    concerns: [
      '30% earnout tied to revenue targets',
      'Integration timeline may be aggressive'
    ]
  },
  {
    id: '3',
    buyerId: '3',
    buyerName: 'PetHealth Equity Partners',
    buyerType: 'Private Equity',
    offerAmount: '$2,950,000',
    offerAmountNum: 2950000,
    receivedDate: 'September 25, 2025',
    expirationDate: 'October 9, 2025',
    status: 'pending',
    day1Valuation: '$2,950,000',
    day1ValuationNum: 2950000,
    day1Cash: '$2,212,500',
    day1CashNum: 2212500,
    percentageBuying: 100,
    employmentTerm: '4 years',
    employmentYears: 4,
    incentives: [
      { type: 'Equity Rollover', description: 'Option to roll over 15% into parent company equity', value: '15% equity' },
      { type: 'CE Stipend', description: '$5,000 annual continuing education per doctor', value: '$5,000/year' }
    ],
    highlights: [
      'Proven track record with 50+ veterinary acquisitions',
      'Comprehensive support for operations and marketing',
      'Equity rollover opportunity for future upside'
    ],
    concerns: [
      'Lower initial valuation',
      '4-year employment term is longer than preferred',
      'Less flexibility in daily operations'
    ]
  },
  {
    id: '4',
    buyerId: '4',
    buyerName: 'Dr. Sarah Martinez',
    buyerType: 'Individual Buyer',
    offerAmount: '$2,750,000',
    offerAmountNum: 2750000,
    receivedDate: 'September 22, 2025',
    expirationDate: 'October 5, 2025',
    status: 'declined',
    day1Valuation: '$2,750,000',
    day1ValuationNum: 2750000,
    day1Cash: '$1,650,000',
    day1CashNum: 1650000,
    percentageBuying: 100,
    employmentTerm: '1 year',
    employmentYears: 1,
    incentives: [
      { type: 'Flexible Transition', description: 'Flexible transition timeline up to 2 years', value: 'Flexible' }
    ],
    highlights: [
      'Local veterinarian with excellent reputation',
      'Committed to preserving practice culture',
      'Minimal transition period required'
    ],
    concerns: [
      'Significantly lower valuation',
      'High earnout percentage (40%)',
      'Financing contingencies create uncertainty'
    ]
  }
];

type SortField = 'receivedDate' | 'buyerName' | 'buyerType' | 'offerAmountNum' | 'day1ValuationNum' | 'day1CashNum' | 'percentageBuying' | 'employmentYears' | 'incentives' | 'status';
type SortDirection = 'asc' | 'desc';

export function Offers({ onViewBuyer, onViewOffer }: OffersProps) {
  const [viewMode, setViewMode] = useState<'table' | 'comparison'>('table');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'past'>('all');
  const [sortField, setSortField] = useState<SortField>('receivedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [reorderedOffers, setReorderedOffers] = useState<Offer[]>(offers);
  const [customOrder, setCustomOrder] = useState<string[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600 text-white">Pending Review</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-600 text-white">Under Review</Badge>;
      case 'accepted':
        return <Badge className="bg-green-600 text-white">Accepted</Badge>;
      case 'declined':
        return <Badge className="bg-gray-600 text-white">Declined</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getBuyerTypeBadge = (type: string) => {
    switch (type) {
      case 'Parent Company':
      case 'Corporate Group':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Parent Company</Badge>;
      case 'Private Equity':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Private Equity</Badge>;
      case 'Individual Buyer':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Individual Buyer</Badge>;
      case 'Joint Venture':
      case 'Strategic Partner':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Joint Venture</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const filterOffers = (offers: Offer[]) => {
    switch (activeTab) {
      case 'active':
        return offers.filter(o => o.status === 'pending' || o.status === 'under-review');
      case 'past':
        return offers.filter(o => o.status === 'accepted' || o.status === 'declined');
      default:
        return offers;
    }
  };

  const sortOffers = (offers: Offer[]) => {
    // If custom order exists, use it
    if (customOrder.length > 0) {
      return [...offers].sort((a, b) => {
        const indexA = customOrder.indexOf(a.id);
        const indexB = customOrder.indexOf(b.id);
        
        // If both are in custom order, sort by their position
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        // If only A is in custom order, it comes first
        if (indexA !== -1) return -1;
        // If only B is in custom order, it comes first
        if (indexB !== -1) return 1;
        // If neither are in custom order, keep original sort
        return 0;
      });
    }
    
    return [...offers].sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'receivedDate') {
        comparison = new Date(a.receivedDate).getTime() - new Date(b.receivedDate).getTime();
      } else if (sortField === 'buyerName') {
        comparison = a.buyerName.localeCompare(b.buyerName);
      } else if (sortField === 'buyerType') {
        comparison = a.buyerType.localeCompare(b.buyerType);
      } else if (sortField === 'incentives') {
        comparison = a.incentives.length - b.incentives.length;
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else {
        comparison = (a[sortField] as number) - (b[sortField] as number);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  const handleSort = (field: SortField) => {
    // Clear custom order when sorting
    setCustomOrder([]);
    
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleReorderOpen = () => {
    setReorderedOffers(filteredOffers);
    setIsReorderModalOpen(true);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newOffers = [...reorderedOffers];
    [newOffers[index - 1], newOffers[index]] = [newOffers[index], newOffers[index - 1]];
    setReorderedOffers(newOffers);
  };

  const handleMoveDown = (index: number) => {
    if (index === reorderedOffers.length - 1) return;
    const newOffers = [...reorderedOffers];
    [newOffers[index], newOffers[index + 1]] = [newOffers[index + 1], newOffers[index]];
    setReorderedOffers(newOffers);
  };

  const handleSaveOrder = () => {
    const newOrder = reorderedOffers.map(offer => offer.id);
    setCustomOrder(newOrder);
    setIsReorderModalOpen(false);
  };

  const handleCancelReorder = () => {
    setIsReorderModalOpen(false);
  };

  const filteredOffers = sortOffers(filterOffers(offers));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="mb-2 text-[20px] font-semibold">Offers</h1>
            <Badge className="bg-primary text-primary-foreground">
              {offers.filter(o => o.status === 'pending' || o.status === 'under-review').length} Active
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Review and manage acquisition offers for your practice
          </p>
        </div>

        {/* View Toggle */}
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'table' | 'comparison')}>
          <ToggleGroupItem value="table" aria-label="Table view">
            <TableIcon className="w-4 h-4 mr-2" />
            Table View
          </ToggleGroupItem>
          <ToggleGroupItem value="comparison" aria-label="Comparison view">
            <LayoutGrid className="w-4 h-4 mr-2" />
            Comparison View
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'active' | 'past')}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Offers</TabsTrigger>
            <TabsTrigger value="active">Active Offers</TabsTrigger>
            <TabsTrigger value="past">Past Offers</TabsTrigger>
          </TabsList>
          <Button variant="outline" onClick={handleReorderOpen}>
            <GripVertical className="w-4 h-4 mr-2" />
            Reorder
          </Button>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          {viewMode === 'table' ? (
            /* Table View */
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('buyerName')}>
                      <div className="flex items-center gap-2">
                        Company
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('receivedDate')}>
                      <div className="flex items-center gap-2">
                        Received
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('buyerType')}>
                      <div className="flex items-center gap-2">
                        Type
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('offerAmountNum')}>
                      <div className="flex items-center gap-2">
                        Offer Amount
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('day1ValuationNum')}>
                      <div className="flex items-center gap-2">
                        Day 1 Valuation
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('day1CashNum')}>
                      <div className="flex items-center gap-2">
                        Day 1 Cash
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('percentageBuying')}>
                      <div className="flex items-center gap-2">
                        % Buying
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('employmentYears')}>
                      <div className="flex items-center gap-2">
                        Employment
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('incentives')}>
                      <div className="flex items-center gap-2">
                        Incentives
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                      <div className="flex items-center gap-2">
                        Status
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOffers.map((offer) => (
                    <TableRow 
                      key={offer.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => onViewOffer(offer.id)}
                    >
                      <TableCell>{offer.buyerName}</TableCell>
                      <TableCell>{offer.receivedDate}</TableCell>
                      <TableCell>{getBuyerTypeBadge(offer.buyerType)}</TableCell>
                      <TableCell className="text-green-700">{offer.offerAmount}</TableCell>
                      <TableCell>{offer.day1Valuation}</TableCell>
                      <TableCell>{offer.day1Cash}</TableCell>
                      <TableCell>{offer.percentageBuying}%</TableCell>
                      <TableCell>{offer.employmentTerm}</TableCell>
                      <TableCell>{offer.incentives.length}</TableCell>
                      <TableCell>{getStatusBadge(offer.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            /* Comparison View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredOffers.map((offer) => (
                <Card 
                  key={offer.id} 
                  className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onViewOffer(offer.id)}
                >
                  <div className="space-y-4">
                    {/* Status */}
                    <div className="flex justify-end">
                      {getStatusBadge(offer.status)}
                    </div>

                    {/* Company Name */}
                    <div>
                      <h3 className="mb-2">{offer.buyerName}</h3>
                      {getBuyerTypeBadge(offer.buyerType)}
                    </div>

                    {/* Key Metrics */}
                    <div className="space-y-3 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground font-bold">Received</p>
                        <p className="text-sm">{offer.receivedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-bold">Offer Amount</p>
                        <p className="text-xl text-green-700">{offer.offerAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-bold">Day 1 Valuation</p>
                        <p>{offer.day1Valuation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-bold">Day 1 Cash</p>
                        <p>{offer.day1Cash}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-bold">% Buying</p>
                        <p>{offer.percentageBuying}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-bold">Employment</p>
                        <p>{offer.employmentTerm}</p>
                      </div>

                      {/* Incentives */}
                      <div>
                        <p className="text-sm text-muted-foreground font-bold mb-2">Incentives</p>
                        <div className="space-y-2">
                          {offer.incentives.map((incentive, idx) => (
                            <div key={idx} className="text-sm">
                              <p className="font-medium">{incentive.type}</p>
                              <p className="text-xs text-muted-foreground">{incentive.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Reorder Modal */}
      <Dialog open={isReorderModalOpen} onOpenChange={setIsReorderModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reorder Offers</DialogTitle>
            <DialogDescription>
              Use the arrow buttons to reorder offers. The new order will be applied to your current view.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2 py-4">
            {reorderedOffers.map((offer, index) => (
              <Card key={offer.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                    >
                      <ArrowUpIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === reorderedOffers.length - 1}
                    >
                      <ArrowDownIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium">{offer.buyerName}</p>
                      {getBuyerTypeBadge(offer.buyerType)}
                      {getStatusBadge(offer.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {offer.offerAmount} • Received {offer.receivedDate}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Position</p>
                    <p className="text-lg font-medium">{index + 1}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelReorder}>
              Cancel
            </Button>
            <Button onClick={handleSaveOrder}>
              Save Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
