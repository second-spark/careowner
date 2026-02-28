import { useState, useMemo } from 'react';
import { Practice } from '../types/practice';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Building2, MapPin, Star, TrendingUp, Search } from 'lucide-react';

interface PracticesListProps {
  practices: Practice[];
  onSelectPractice: (practice: Practice) => void;
}

export function PracticesList({ practices, onSelectPractice }: PracticesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [practiceTypeFilter, setPracticeTypeFilter] = useState('all');

  const getSellingStatusColor = (status: string) => {
    switch (status) {
      case 'Not for Sale':
        return 'bg-gray-500';
      case 'Open to Discussion':
        return 'bg-blue-500';
      case 'Ready for Offers':
        return 'bg-green-500';
      case 'Actively Listening':
        return 'bg-yellow-500';
      case 'Offer in Progress':
        return 'bg-orange-500';
      case 'Just Sold':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get unique values for filters
  const uniqueLocations = useMemo(() => 
    Array.from(new Set(practices.map(p => p.locationType))),
    [practices]
  );

  const uniqueStatuses = useMemo(() => 
    Array.from(new Set(practices.map(p => p.sellingStatus))),
    [practices]
  );

  const uniquePracticeTypes = useMemo(() => 
    Array.from(new Set(practices.map(p => p.practiceType))),
    [practices]
  );

  // Filter practices
  const filteredPractices = useMemo(() => {
    return practices.filter(practice => {
      const matchesSearch = 
        practice.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = locationFilter === 'all' || practice.locationType === locationFilter;
      const matchesStatus = statusFilter === 'all' || practice.sellingStatus === statusFilter;
      const matchesType = practiceTypeFilter === 'all' || practice.practiceType === practiceTypeFilter;

      return matchesSearch && matchesLocation && matchesStatus && matchesType;
    });
  }, [practices, searchQuery, locationFilter, statusFilter, practiceTypeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-[20px] font-semibold">Practices</h1>
          <p className="text-muted-foreground">
            Browse veterinary practices available on the platform
          </p>
        </div>

      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search practices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Location Filter */}
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Location Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {uniqueLocations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Selling Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {uniqueStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Practice Type Filter */}
          <Select value={practiceTypeFilter} onValueChange={setPracticeTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Practice Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniquePracticeTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Practices Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPractices.map((practice) => (
          <Card key={practice.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectPractice(practice)}>
            {/* Thumbnail Photo */}
            <div className="relative aspect-video bg-muted overflow-hidden">
              <ImageWithFallback
                src={practice.building.photos[0]}
                alt={practice.businessName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 pt-[0px] pr-[20px] pb-[20px] pl-[20px]">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <h3 className="line-clamp-1">{practice.businessName}</h3>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm line-clamp-1">{practice.address}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="gap-1.5 text-xs">
                  <span className={`w-2 h-2 rounded-full ${getSellingStatusColor(practice.sellingStatus)}`} />
                  {practice.sellingStatus}
                </Badge>
                <Badge variant="outline" className="text-xs">{practice.practiceType}</Badge>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Valuation</p>
                  <p className="text-sm">{practice.currentValuation}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                  <p className="text-sm">{practice.growthScore}/100</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-yellow-600" />
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <p className="text-sm">{practice.googleRating}/5.0</p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p>{practice.locationType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p>{practice.yearsInBusiness} years</p>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full" 
                onClick={() => onSelectPractice(practice)}
              >
                View Full Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredPractices.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No practices found matching your filters.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setLocationFilter('all');
              setStatusFilter('all');
              setPracticeTypeFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  );
}