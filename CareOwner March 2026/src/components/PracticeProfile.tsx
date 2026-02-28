import { useState } from 'react';
import { Practice } from '../types/practice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { OverviewTab } from './OverviewTab';
import { TeamTab } from './TeamTab';
import { BuildingTab } from './BuildingTab';
import { QATab } from './QATab';
import { FinancialsTab } from './FinancialsTab';
import { Building2, Pencil, Eye, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { mockBuyers } from '../data/mockBuyers';

interface PracticeProfileProps {
  practice: Practice;
}

export function PracticeProfile({ practice }: PracticeProfileProps) {
  const [sellingStatus, setSellingStatus] = useState(practice.sellingStatus);
  const [currentTab, setCurrentTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'practice' | 'buyer'>('practice');
  const [selectedBuyerId, setSelectedBuyerId] = useState<string>('1'); // Default to first buyer
  const [sheetOpen, setSheetOpen] = useState(false);
  
  // Visibility settings for Seller View
  const [visibilitySettings, setVisibilitySettings] = useState({
    // Tabs
    overviewTab: true,
    financialsTab: true,
    teamTab: true,
    facilitiesTab: true,
    qaTab: true,
    // Overview widgets
    growthScore: true,
    sellingStatus: true,
    valuationRange: true,
    keyMetrics: true,
    description: true,
    highlights: true,
    // Financials widgets
    financialsValuation: true,
    financialsMetrics: true,
    financialsChart: true,
    financialsBreakdown: true,
    // Team widgets
    teamMembers: true,
    teamStructure: true,
    // Facilities widgets
    facilityDetails: true,
    facilityImages: true,
    equipment: true,
  });

  const sellingStatusOptions = [
    { value: 'Not for Sale', color: 'bg-gray-500' },
    { value: 'Open to Discussion', color: 'bg-blue-500' },
    { value: 'Actively Listening', color: 'bg-yellow-500' },
    { value: 'Ready for Offers', color: 'bg-green-500' },
    { value: 'Offer in Progress', color: 'bg-orange-500' },
    { value: 'Just Sold', color: 'bg-red-500' },
  ];

  const getSellingStatusColor = (status: string) => {
    const option = sellingStatusOptions.find(opt => opt.value === status);
    return option?.color || 'bg-gray-500';
  };

  const toggleVisibility = (key: keyof typeof visibilitySettings) => {
    setVisibilitySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Helper functions for section-level checkboxes
  const overviewKeys: (keyof typeof visibilitySettings)[] = [
    'growthScore', 'sellingStatus', 'valuationRange', 'keyMetrics', 'description', 'highlights'
  ];
  const financialsKeys: (keyof typeof visibilitySettings)[] = [
    'financialsValuation', 'financialsMetrics', 'financialsChart', 'financialsBreakdown'
  ];
  const teamKeys: (keyof typeof visibilitySettings)[] = [
    'teamMembers', 'teamStructure'
  ];
  const facilitiesKeys: (keyof typeof visibilitySettings)[] = [
    'facilityDetails', 'facilityImages', 'equipment'
  ];

  const areAllChecked = (keys: (keyof typeof visibilitySettings)[]) => {
    return keys.every(key => visibilitySettings[key]);
  };

  const toggleAllInSection = (keys: (keyof typeof visibilitySettings)[]) => {
    const allChecked = areAllChecked(keys);
    const newSettings = { ...visibilitySettings };
    keys.forEach(key => {
      newSettings[key] = !allChecked;
    });
    setVisibilitySettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* View Mode Callout Bar */}
      <Alert className="rounded-none border-x-0 border-t-0 bg-blue-50 border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="w-4 h-4 text-blue-600" />
            <AlertDescription className="m-0">
              <div className="flex items-center gap-3">
                <Label htmlFor="view-mode" className="text-sm whitespace-nowrap">View as:</Label>
                <Select value={viewMode} onValueChange={(value) => setViewMode(value as 'practice' | 'buyer')}>
                  <SelectTrigger id="view-mode" className="w-[180px] h-8 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="practice">Practice</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                  </SelectContent>
                </Select>
                {viewMode === 'buyer' && (
                  <>
                    <Label htmlFor="buyer-select" className="text-sm whitespace-nowrap">Select buyer:</Label>
                    <Select value={selectedBuyerId} onValueChange={setSelectedBuyerId}>
                      <SelectTrigger id="buyer-select" className="w-[220px] h-8 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mockBuyers.map((buyer) => (
                          <SelectItem key={buyer.id} value={buyer.id}>
                            {buyer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-8 h-8 text-primary" />
                <h1 className="mb-2 text-[20px] font-semibold">{practice.businessName}</h1>
              </div>
              <p className="text-muted-foreground mb-3">
                {practice.address}
                {practice.website && (
                  <>
                    <span className="mx-2">•</span>
                    <a href={practice.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {practice.website}
                    </a>
                  </>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{practice.practiceType}</Badge>
                <Badge variant="outline">{practice.locationType}</Badge>
                <Badge className="bg-green-600 text-white">
                  Established in {new Date().getFullYear() - practice.yearsInBusiness}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              {viewMode === 'practice' ? (
                <Button variant="outline" size="lg" className="w-full md:w-auto">
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="lg" className="w-full md:w-auto">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Visibility
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    <SheetHeader className="pt-[16px] pr-[16px] pb-[0px] pl-[16px]">
                      <SheetTitle>Buyer View Visibility Settings</SheetTitle>
                      <SheetDescription>
                        Select which tabs and widgets are visible to potential buyers on the public platform
                      </SheetDescription>
                    </SheetHeader>
                    <div className="m-[0px] space-y-6 px-[16px] py-[0px]">
                      {/* Overview Widgets */}
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Checkbox 
                            id="overview-all" 
                            checked={areAllChecked(overviewKeys)}
                            onCheckedChange={() => toggleAllInSection(overviewKeys)}
                          />
                          <Label htmlFor="overview-all" className="cursor-pointer">
                            <h3 className="m-0 text-[16px] font-bold font-normal">Overview Widgets</h3>
                          </Label>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 mt-[0px] mr-[0px] mb-[12px] ml-[6px]">
                            <Checkbox 
                              id="growth-score" 
                              checked={visibilitySettings.growthScore}
                              onCheckedChange={() => toggleVisibility('growthScore')}
                            />
                            <Label htmlFor="growth-score" className="cursor-pointer">Growth Score</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="selling-status" 
                              checked={visibilitySettings.sellingStatus}
                              onCheckedChange={() => toggleVisibility('sellingStatus')}
                            />
                            <Label htmlFor="selling-status" className="cursor-pointer">Selling Status</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="valuation-range" 
                              checked={visibilitySettings.valuationRange}
                              onCheckedChange={() => toggleVisibility('valuationRange')}
                            />
                            <Label htmlFor="valuation-range" className="cursor-pointer">Valuation Range</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="key-metrics" 
                              checked={visibilitySettings.keyMetrics}
                              onCheckedChange={() => toggleVisibility('keyMetrics')}
                            />
                            <Label htmlFor="key-metrics" className="cursor-pointer">Key Metrics</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="description" 
                              checked={visibilitySettings.description}
                              onCheckedChange={() => toggleVisibility('description')}
                            />
                            <Label htmlFor="description" className="cursor-pointer">Description</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="highlights" 
                              checked={visibilitySettings.highlights}
                              onCheckedChange={() => toggleVisibility('highlights')}
                            />
                            <Label htmlFor="highlights" className="cursor-pointer">Highlights</Label>
                          </div>
                        </div>
                      </div>

                      {/* Financials Widgets */}
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Checkbox 
                            id="financials-all" 
                            checked={areAllChecked(financialsKeys)}
                            onCheckedChange={() => toggleAllInSection(financialsKeys)}
                          />
                          <Label htmlFor="financials-all" className="cursor-pointer">
                            <h3 className="m-0 text-[16px] font-bold font-normal">Financials Widgets</h3>
                          </Label>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="financials-valuation" 
                              checked={visibilitySettings.financialsValuation}
                              onCheckedChange={() => toggleVisibility('financialsValuation')}
                            />
                            <Label htmlFor="financials-valuation" className="cursor-pointer">Valuation Range</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="financials-metrics" 
                              checked={visibilitySettings.financialsMetrics}
                              onCheckedChange={() => toggleVisibility('financialsMetrics')}
                            />
                            <Label htmlFor="financials-metrics" className="cursor-pointer">Financial Metrics</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="financials-chart" 
                              checked={visibilitySettings.financialsChart}
                              onCheckedChange={() => toggleVisibility('financialsChart')}
                            />
                            <Label htmlFor="financials-chart" className="cursor-pointer">Monthly Performance Chart</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="financials-breakdown" 
                              checked={visibilitySettings.financialsBreakdown}
                              onCheckedChange={() => toggleVisibility('financialsBreakdown')}
                            />
                            <Label htmlFor="financials-breakdown" className="cursor-pointer">Revenue & Expense Breakdown</Label>
                          </div>
                        </div>
                      </div>

                      {/* Team Widgets */}
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Checkbox 
                            id="team-all" 
                            checked={areAllChecked(teamKeys)}
                            onCheckedChange={() => toggleAllInSection(teamKeys)}
                          />
                          <Label htmlFor="team-all" className="cursor-pointer">
                            <h3 className="m-0 text-[16px] font-bold font-normal">Team Widgets</h3>
                          </Label>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="team-members" 
                              checked={visibilitySettings.teamMembers}
                              onCheckedChange={() => toggleVisibility('teamMembers')}
                            />
                            <Label htmlFor="team-members" className="cursor-pointer">Team Members</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="team-structure" 
                              checked={visibilitySettings.teamStructure}
                              onCheckedChange={() => toggleVisibility('teamStructure')}
                            />
                            <Label htmlFor="team-structure" className="cursor-pointer">Team Structure</Label>
                          </div>
                        </div>
                      </div>

                      {/* Facilities Widgets */}
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Checkbox 
                            id="facilities-all" 
                            checked={areAllChecked(facilitiesKeys)}
                            onCheckedChange={() => toggleAllInSection(facilitiesKeys)}
                          />
                          <Label htmlFor="facilities-all" className="cursor-pointer">
                            <h3 className="m-0 text-[16px] font-bold font-normal">Facilities Widgets</h3>
                          </Label>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="facility-details" 
                              checked={visibilitySettings.facilityDetails}
                              onCheckedChange={() => toggleVisibility('facilityDetails')}
                            />
                            <Label htmlFor="facility-details" className="cursor-pointer">Facility Details</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="facility-images" 
                              checked={visibilitySettings.facilityImages}
                              onCheckedChange={() => toggleVisibility('facilityImages')}
                            />
                            <Label htmlFor="facility-images" className="cursor-pointer">Facility Images</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="equipment" 
                              checked={visibilitySettings.equipment}
                              onCheckedChange={() => toggleVisibility('equipment')}
                            />
                            <Label htmlFor="equipment" className="cursor-pointer">Equipment List</Label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button className="w-full" onClick={() => setSheetOpen(false)}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">Selling Status:</p>
                <Select value={sellingStatus} onValueChange={setSellingStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getSellingStatusColor(sellingStatus)}`} />
                        {sellingStatus}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {sellingStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${option.color}`} />
                          {option.value}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="building">Facilities</TabsTrigger>
            <TabsTrigger value="qa">Q&A</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab practice={practice} onNavigateToTab={setCurrentTab} viewMode={viewMode} selectedBuyerId={selectedBuyerId} />
          </TabsContent>
          
          <TabsContent value="financials">
            <FinancialsTab practice={practice} compareTo="previous" />
          </TabsContent>
          
          <TabsContent value="team">
            <TeamTab practice={practice} />
          </TabsContent>
          
          <TabsContent value="building">
            <BuildingTab practice={practice} />
          </TabsContent>
          
          <TabsContent value="qa">
            <QATab practice={practice} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
