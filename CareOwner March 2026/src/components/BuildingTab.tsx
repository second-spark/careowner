import { useState } from 'react';
import { Practice, LocationType } from '../types/practice';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Building2, Ruler, Key, DoorOpen, Wrench, Microscope, Edit, Upload, X, Calendar as CalendarIcon, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface BuildingTabProps {
  practice: Practice;
}

type EditorType = 'exam-rooms' | 'building-size' | 'ownership' | 'location' | 'equipment' | 'services' | null;

export function BuildingTab({ practice }: BuildingTabProps) {
  const { building } = practice;
  const [mediaTab, setMediaTab] = useState('photos');
  const [openEditor, setOpenEditor] = useState<EditorType>(null);

  // Editable state
  const [examRooms, setExamRooms] = useState(building.examRooms);
  const [additionalExamRooms, setAdditionalExamRooms] = useState(2);
  const [buildingSize, setBuildingSize] = useState(building.sizeInSqFt);
  const [ownership, setOwnership] = useState<'Owned' | 'Leased'>(building.ownership);
  const [address, setAddress] = useState(practice.address);
  const [locationType, setLocationType] = useState<LocationType>(practice.locationType);
  const [equipment, setEquipment] = useState<string[]>([...building.equipment]);
  const [newEquipment, setNewEquipment] = useState('');
  const [services, setServices] = useState<string[]>([...building.servicesOffered]);
  const [newService, setNewService] = useState('');

  // New ownership editor fields
  const [ownershipStatus, setOwnershipStatus] = useState<string>('lease');
  const [ownershipOther, setOwnershipOther] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [purchaseLeaseType, setPurchaseLeaseType] = useState<string>('standard-lease');
  const [purchaseLeaseOther, setPurchaseLeaseOther] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [remainingTerm, setRemainingTerm] = useState<string>('4-7-years');
  const [buildingValue, setBuildingValue] = useState('');
  const [landOwnership, setLandOwnership] = useState<string>('no');
  const [loanHolder, setLoanHolder] = useState<string>('landlord');
  const [loanHolderOther, setLoanHolderOther] = useState('');

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving changes...');
    setOpenEditor(null);
  };

  const addEquipment = () => {
    if (newEquipment.trim()) {
      setEquipment([...equipment, newEquipment.trim()]);
      setNewEquipment('');
    }
  };

  const removeEquipment = (index: number) => {
    setEquipment(equipment.filter((_, i) => i !== index));
  };

  const addService = () => {
    if (newService.trim()) {
      setServices([...services, newService.trim()]);
      setNewService('');
    }
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Building Size</p>
                <p className="text-2xl mt-1">{buildingSize.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">square feet</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setOpenEditor('building-size')}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Ownership Status</p>
                <div className="mt-2">
                  <Badge 
                    className={
                      ownership === 'Owned' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-blue-600 text-white'
                    }
                  >
                    {ownership}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {monthlyPayment ? `${monthlyPayment}/month` : 'Ownership details available upon request'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setOpenEditor('ownership')}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <DoorOpen className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Exam Rooms</p>
                <p className="text-2xl mt-1">{examRooms}</p>
                <p className="text-sm text-muted-foreground mt-1">+{additionalExamRooms} exam rooms possible</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setOpenEditor('exam-rooms')}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-2xl mt-1 text-[16px]">{address}</p>
                <div className="mt-2">
                  <Badge variant="outline">{locationType}</Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setOpenEditor('location')}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Equipment */}
      <Card className="p-6">
        <div className="flex items-center justify-between m-[0px]">
          <div className="flex items-start gap-3">
            <Wrench className="w-5 h-5 text-muted-foreground mt-1" />
            <h3>Equipment On-Site</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setOpenEditor('equipment')}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {equipment.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Services Available */}
      <Card className="p-6">
        <div className="flex items-center justify-between m-[0px]">
          <div className="flex items-start gap-3">
            <Microscope className="w-5 h-5 text-muted-foreground mt-1" />
            <h3>On-Site Services Available</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setOpenEditor('services')}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-[-10px] mr-[0px] mb-[0px] ml-[0px]">
          The following services can be performed at this location with existing equipment:
        </p>
        <div className="flex flex-wrap gap-2 mt-[-10px] mr-[0px] mb-[0px] ml-[0px]">
          {services.map((service) => (
            <Badge key={service} variant="secondary" className="text-[14px]">
              {service}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Media */}
      <Card className="px-[24px] py-[20px]">
        <div className="flex items-center justify-between mt-[0px] mr-[0px] mb-[-12px] ml-[0px]">
          <h3>Media</h3>
          <Button className="gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
        </div>
        
        <Tabs value={mediaTab} onValueChange={setMediaTab}>
          <TabsList>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="floor-plan">Floor Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="photos" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {building.photos.map((photo, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={photo}
                    alt={`${practice.businessName} - Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-4">
            {building.videos && building.videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {building.videos.map((video, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <video
                      src={video}
                      controls
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No videos uploaded yet</p>
                <p className="text-sm mt-2">Click Upload to add videos</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="floor-plan" className="mt-4">
            {building.floorPlan && building.floorPlan.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {building.floorPlan.map((plan, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={plan}
                      alt={`${practice.businessName} - Floor Plan ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No floor plan uploaded yet</p>
                <p className="text-sm mt-2">Click Upload to add floor plan</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Exam Rooms Editor */}
      <Sheet open={openEditor === 'exam-rooms'} onOpenChange={(open) => !open && setOpenEditor(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Exam Rooms</SheetTitle>
            <SheetDescription>
              Update the number of exam rooms and potential expansion capacity.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 mt-6 px-[16px] py-[0px]">
            <div className="space-y-2">
              <Label htmlFor="exam-rooms">Number of Exam Rooms</Label>
              <Input
                id="exam-rooms"
                type="number"
                value={examRooms}
                onChange={(e) => setExamRooms(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additional-rooms">Possible space for additional exam rooms:</Label>
              <Input
                id="additional-rooms"
                type="number"
                value={additionalExamRooms}
                onChange={(e) => setAdditionalExamRooms(parseInt(e.target.value) || 0)}
              />
            </div>
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Building Size Editor */}
      <Sheet open={openEditor === 'building-size'} onOpenChange={(open) => !open && setOpenEditor(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Building Size</SheetTitle>
            <SheetDescription>
              Update the total square footage of your building.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 mt-6 px-[16px] py-[0px]">
            <div className="space-y-2">
              <Label htmlFor="building-size">Building Size (square feet)</Label>
              <Input
                id="building-size"
                type="number"
                value={buildingSize}
                onChange={(e) => setBuildingSize(parseInt(e.target.value) || 0)}
              />
            </div>
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Ownership Editor */}
      <Sheet open={openEditor === 'ownership'} onOpenChange={(open) => !open && setOpenEditor(null)}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Ownership Status</SheetTitle>
            <SheetDescription>
              Provide detailed information about building ownership or lease.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 mt-6 px-[16px] py-[0px]">
            {/* Ownership Status */}
            <div className="space-y-2">
              <Label htmlFor="ownership-status">Ownership Status</Label>
              <Select value={ownershipStatus} onValueChange={setOwnershipStatus}>
                <SelectTrigger id="ownership-status">
                  <SelectValue placeholder="Select ownership status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lease">I lease the building</SelectItem>
                  <SelectItem value="own-personally">I own the building personally</SelectItem>
                  <SelectItem value="practice-owns">Practice (business entity) owns the building</SelectItem>
                  <SelectItem value="real-estate-llc">Owned through a separate real estate LLC</SelectItem>
                  <SelectItem value="ownership-other">Other (please specify)</SelectItem>
                </SelectContent>
              </Select>
              {ownershipStatus === 'ownership-other' && (
                <Input
                  placeholder="Please specify"
                  value={ownershipOther}
                  onChange={(e) => setOwnershipOther(e.target.value)}
                />
              )}
            </div>

            {/* Purchase or Lease Start Date */}
            <div className="space-y-2">
              <Label>Purchase or Lease Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Type of Purchase or Lease */}
            <div className="space-y-2">
              <Label htmlFor="purchase-lease-type">Type of Purchase or Lease</Label>
              <Select value={purchaseLeaseType} onValueChange={setPurchaseLeaseType}>
                <SelectTrigger id="purchase-lease-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Purchased with cash</SelectItem>
                  <SelectItem value="mortgage">Purchased with a mortgage (bank or SBA loan)</SelectItem>
                  <SelectItem value="seller-financing">Purchased with seller financing</SelectItem>
                  <SelectItem value="lease-to-own">Lease-to-own agreement</SelectItem>
                  <SelectItem value="standard-lease">Standard lease / rental</SelectItem>
                  <SelectItem value="purchase-other">Other (please specify)</SelectItem>
                </SelectContent>
              </Select>
              {purchaseLeaseType === 'purchase-other' && (
                <Input
                  placeholder="Please specify"
                  value={purchaseLeaseOther}
                  onChange={(e) => setPurchaseLeaseOther(e.target.value)}
                />
              )}
            </div>

            {/* Current Monthly Payment */}
            <div className="space-y-2">
              <Label htmlFor="monthly-payment">Current Monthly Payment</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="monthly-payment"
                  type="text"
                  placeholder="0"
                  className="pl-9"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">If lease, enter rent; if owned, enter mortgage payment.</p>
            </div>

            {/* Remaining Term or Years Left */}
            <div className="space-y-2">
              <Label htmlFor="remaining-term">Remaining Term or Years Left</Label>
              <Select value={remainingTerm} onValueChange={setRemainingTerm}>
                <SelectTrigger id="remaining-term">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                  <SelectItem value="1-3-years">1–3 years</SelectItem>
                  <SelectItem value="4-7-years">4–7 years</SelectItem>
                  <SelectItem value="8-15-years">8–15 years</SelectItem>
                  <SelectItem value="16-plus-years">16+ years</SelectItem>
                  <SelectItem value="paid-off">Paid off</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Approximate Building Value */}
            <div className="space-y-2">
              <Label htmlFor="building-value">Approximate Building Value</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="building-value"
                  type="text"
                  placeholder="0"
                  className="pl-9"
                  value={buildingValue}
                  onChange={(e) => setBuildingValue(e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">If owned — your best estimate.</p>
            </div>

            {/* Do you own or lease the land separately? */}
            <div className="space-y-2">
              <Label htmlFor="land-ownership">Do you own or lease the land separately?</Label>
              <Select value={landOwnership} onValueChange={setLandOwnership}>
                <SelectTrigger id="land-ownership">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="own-separately">Own land separately</SelectItem>
                  <SelectItem value="lease-separately">Lease land separately</SelectItem>
                  <SelectItem value="na-unsure">N/A or unsure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Who Holds the Loan or Lease? */}
            <div className="space-y-2">
              <Label htmlFor="loan-holder">Who Holds the Loan or Lease?</Label>
              <Select value={loanHolder} onValueChange={setLoanHolder}>
                <SelectTrigger id="loan-holder">
                  <SelectValue placeholder="Select holder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local-bank">Local bank</SelectItem>
                  <SelectItem value="national-bank">National bank</SelectItem>
                  <SelectItem value="sba">SBA (7a or 504 loan)</SelectItem>
                  <SelectItem value="private-lender">Private lender / investor</SelectItem>
                  <SelectItem value="landlord">Landlord (if leased)</SelectItem>
                  <SelectItem value="loan-other">Other (please specify)</SelectItem>
                </SelectContent>
              </Select>
              {loanHolder === 'loan-other' && (
                <Input
                  placeholder="Please specify"
                  value={loanHolderOther}
                  onChange={(e) => setLoanHolderOther(e.target.value)}
                />
              )}
            </div>

            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Location Editor */}
      <Sheet open={openEditor === 'location'} onOpenChange={(open) => !open && setOpenEditor(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Location</SheetTitle>
            <SheetDescription>
              Update your practice address and location type.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 mt-6 px-[16px] py-[0px]">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-type">Location Type</Label>
              <Select value={locationType} onValueChange={(value: LocationType) => setLocationType(value)}>
                <SelectTrigger id="location-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urban">Urban</SelectItem>
                  <SelectItem value="Suburban">Suburban</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Rural">Rural</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Equipment Editor */}
      <Sheet open={openEditor === 'equipment'} onOpenChange={(open) => !open && setOpenEditor(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Equipment</SheetTitle>
            <SheetDescription>
              Manage the equipment available at your practice.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 mt-6 px-[16px] py-[0px]">
            <div className="space-y-2">
              <Label>Current Equipment</Label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {equipment.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                    <span className="text-sm">{item}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeEquipment(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-equipment">Add Equipment</Label>
              <div className="flex gap-2">
                <Input
                  id="new-equipment"
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  placeholder="Enter equipment name"
                  onKeyPress={(e) => e.key === 'Enter' && addEquipment()}
                />
                <Button onClick={addEquipment}>Add</Button>
              </div>
            </div>
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Services Editor */}
      <Sheet open={openEditor === 'services'} onOpenChange={(open) => !open && setOpenEditor(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Services</SheetTitle>
            <SheetDescription>
              Manage the services available at your practice.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 mt-6 px-[16px] py-[0px]">
            <div className="space-y-2">
              <Label>Current Services</Label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                    <span className="text-sm">{service}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeService(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-service">Add Service</Label>
              <div className="flex gap-2">
                <Input
                  id="new-service"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="Enter service name"
                  onKeyPress={(e) => e.key === 'Enter' && addService()}
                />
                <Button onClick={addService}>Add</Button>
              </div>
            </div>
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
