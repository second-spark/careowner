import { Practice } from '../types/practice';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { TrendingUp, Building2, Users, Stethoscope, DoorOpen, Clock, ChevronRight, CheckCircle, Pencil, Target } from 'lucide-react';

interface OverviewTabProps {
  practice: Practice;
  onNavigateToTab: (tab: string) => void;
  viewMode?: 'practice' | 'buyer';
  selectedBuyerId?: string;
}

export function OverviewTab({ practice, onNavigateToTab, viewMode = 'practice', selectedBuyerId }: OverviewTabProps) {
  const getSellingStatusColor = (status: string) => {
    switch (status) {
      case 'Not for Sale':
        return 'bg-gray-100 text-gray-800';
      case 'Open to Discussion':
        return 'bg-blue-100 text-blue-800';
      case 'Ready for Offers':
        return 'bg-green-100 text-green-800';
      case 'Actively Listening':
        return 'bg-yellow-100 text-yellow-800';
      case 'Offer in Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Just Sold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Portfolio fit data based on buyer ID
  const getPortfolioFit = (buyerId: string | undefined) => {
    const fits: { [key: string]: { grade: string; description: string; color: string } } = {
      '1': { grade: 'B', description: 'Good fit for your portfolio', color: 'text-blue-600' },
      '2': { grade: 'A', description: 'Great fit for your portfolio', color: 'text-green-600' },
      '3': { grade: 'A', description: 'Great fit for your portfolio', color: 'text-green-600' },
      '4': { grade: 'C', description: 'Moderate fit for your portfolio', color: 'text-yellow-600' },
      '5': { grade: 'B', description: 'Good fit for your portfolio', color: 'text-blue-600' },
    };
    return fits[buyerId || '1'] || fits['1'];
  };

  const portfolioFit = getPortfolioFit(selectedBuyerId);

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className={`grid grid-cols-1 gap-6 ${viewMode === 'buyer' ? 'md:grid-cols-3' : 'md:grid-cols-3'}`}>
        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow" 
          onClick={() => onNavigateToTab('financials')}
        >
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
              <Progress value={practice.growthScore} className="h-2" />
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow" 
          onClick={() => onNavigateToTab('reviews')}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Google Rating</h3>
              <div className="flex items-end gap-4 mb-3">
                <span className="text-4xl text-yellow-600">{practice.googleRating}</span>
                <span className="text-muted-foreground mb-1">/ 5.0</span>
              </div>
              <p className="text-muted-foreground">
                Based on {practice.reviews.length} reviews
              </p>
            </div>
          </div>
        </Card>

        {viewMode === 'buyer' ? (
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Portfolio Fit</h3>
                <div className="flex items-end gap-4 mb-3">
                  <span className={`text-4xl ${portfolioFit.color}`}>{portfolioFit.grade}</span>
                </div>
                <p className="text-muted-foreground">
                  {portfolioFit.description}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={() => onNavigateToTab('financials')}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Current Valuation</h3>
                <div className="mb-3">
                  <span className="text-4xl text-blue-600">{practice.currentValuation}</span>
                </div>
                <p className="text-muted-foreground">
                  Based on current financial performance
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* From the Practice Owner */}
      <Card className="px-[24px] p-[24px] mt-[0px] mr-[0px] mb-[24px] ml-[0px]">
        <div className="flex items-center justify-between m-[0px]">
          <h3 className="m-[0px]">From the Practice Owner</h3>
          {viewMode === 'practice' && (
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <p className="text-muted-foreground leading-relaxed">
              After 18 wonderful years building Lakeside Animal Hospital, I'm looking to transition ownership to someone who shares my passion for compassionate veterinary care. Our practice has grown steadily through word-of-mouth and exceptional client relationships. We've built a loyal client base of over 3,000 active patients and have maintained a 4.8-star Google rating. I'm seeking a buyer who values our culture of excellence, will continue to invest in our team's development, and shares our commitment to providing cutting-edge care while maintaining the personal touch that makes us special in this community.
            </p>
          </div>
          <div>
            <h4 className="mb-3">Ideal Buyer Values</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Commitment to team retention and growth</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Focus on client relationships and community involvement</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Investment in modern equipment and facilities</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Experience in practice management or veterinary medicine</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 relative">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-muted-foreground mt-1" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <p className="text-muted-foreground mb-1">Team Size</p>
                <button 
                  onClick={() => onNavigateToTab('team')}
                  className="text-primary hover:underline flex items-center gap-1 text-sm"
                >
                  View
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                <p>{practice.team.length} Doctors</p>
                <p>{practice.technicians?.length || practice.numberOfTechnicians} Technicians</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 relative">
          <div className="flex items-start gap-3">
            <DoorOpen className="w-5 h-5 text-muted-foreground mt-1" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <p className="text-muted-foreground mb-1">Facilities</p>
                <button 
                  onClick={() => onNavigateToTab('building')}
                  className="text-primary hover:underline flex items-center gap-1 text-sm"
                >
                  View
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <p>{practice.numberOfExamRooms} Exam Rooms</p>
              <p className="text-sm text-muted-foreground mt-1">
                {practice.building.sizeInSqFt.toLocaleString()} sq ft
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <Stethoscope className="w-5 h-5 text-muted-foreground mt-1" />
            <div>
              <p className="text-muted-foreground mb-1">Practice Type</p>
              <p>{practice.practiceType}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-1" />
            <div>
              <p className="text-muted-foreground mb-1">Hours of Operation</p>
              <p>{practice.hoursOfOperation}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Services */}
      <Card className="p-6">
        <h3 className="m-[0px]">Services Offered</h3>
        <div className="flex flex-wrap gap-2">
          {practice.services.map((service) => (
            <Badge key={service} variant="secondary">
              {service}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
