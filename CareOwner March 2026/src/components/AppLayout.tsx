import { ReactNode, useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter,
} from './ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { LayoutDashboard, Plug, Home, FileText, MessageSquare, FolderOpen, User, Settings as SettingsIcon, Lightbulb, Building2, Mail, Calendar, Briefcase, DollarSign, Users, Warehouse, Star, Share2, ClipboardCheck } from 'lucide-react';
import { Badge } from './ui/badge';

interface BreadcrumbData {
  label: string;
  onClick?: () => void;
}

interface AppLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  breadcrumbs: BreadcrumbData[];
}

export function AppLayout({ children, currentPage, onNavigate, breadcrumbs }: AppLayoutProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportType, setExportType] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [emailAddresses, setEmailAddresses] = useState('');
  const [selectedPages, setSelectedPages] = useState({
    practiceOverview: true,
    team: true,
    facilities: true,
    financials: true,
  });

  const handleExport = () => {
    // Export logic would go here
    console.log('Exporting with:', { exportType, emailAddresses, selectedPages });
    setIsExportModalOpen(false);
    // Reset form
    setEmailAddresses('');
  };

  const dashboardItem = {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
  };

  const practiceMenuItems = [
    {
      id: 'practice-profile',
      title: 'Practice Overview',
      icon: Home,
    },
    {
      id: 'team',
      title: 'Team',
      icon: Users,
    },
    {
      id: 'facilities',
      title: 'Facilities',
      icon: Warehouse,
    },
    {
      id: 'financials',
      title: 'Financials',
      icon: DollarSign,
    },
    {
      id: 'reviews',
      title: 'Reviews',
      icon: Star,
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      icon: Lightbulb,
      badge: 4,
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FolderOpen,
    },
  ];

  const dealsMenuItems = [
    {
      id: 'deal-preparation',
      title: 'Deal Preparation',
      icon: ClipboardCheck,
    },
    {
      id: 'buyers',
      title: 'Buyers',
      icon: Building2,
    },
    {
      id: 'interest',
      title: 'Interest',
      icon: Mail,
    },
    {
      id: 'offers',
      title: 'Offers',
      icon: FileText,
    },
    {
      id: 'deal-room',
      title: 'Deal Room',
      icon: Briefcase,
    },
  ];

  const communicationMenuItems = [
    {
      id: 'meetings',
      title: 'Meetings',
      icon: Calendar,
    },
    {
      id: 'messages',
      title: 'Messages',
      icon: MessageSquare,
    },
  ];

  const accountItems = [
    {
      id: 'account',
      title: 'My Account',
      icon: User,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: SettingsIcon,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            {/* Practice Admin Header */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2 px-2 py-4 m-[0px]">
                <Home className="w-5 h-5" />
                <span className="text-lg">Practice Admin</span>
              </SidebarGroupLabel>
            </SidebarGroup>

            {/* Share + Export Button */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Button 
                      variant="outline" 
                      className="w-full justify-center h-9"
                      onClick={() => setIsExportModalOpen(true)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share + Export
                    </Button>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Dashboard */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => onNavigate(dashboardItem.id)}
                      isActive={currentPage === dashboardItem.id}
                    >
                      <dashboardItem.icon className="w-4 h-4" />
                      <span>{dashboardItem.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Practice Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Practice</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {practiceMenuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onNavigate(item.id)}
                        isActive={currentPage === item.id}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge className="ml-auto bg-primary text-primary-foreground h-5 w-5 rounded-full flex items-center justify-center p-0 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Deals Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Deals</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {dealsMenuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onNavigate(item.id)}
                        isActive={currentPage === item.id}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Communication Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Communication</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {communicationMenuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onNavigate(item.id)}
                        isActive={currentPage === item.id}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => onNavigate(item.id)}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1">
          <div className="border-b bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4 px-6 py-4">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {breadcrumb.onClick ? (
                          <BreadcrumbLink onClick={breadcrumb.onClick} className="cursor-pointer">
                            {breadcrumb.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex-1" />
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Share + Export Modal */}
      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Share + Export</DialogTitle>
            <DialogDescription>
              Export your practice information and share it with potential buyers or advisors.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Export Type Selection */}
            <div className="space-y-3">
              <Label>Export Type</Label>
              <RadioGroup value={exportType} onValueChange={(value) => setExportType(value as 'pdf' | 'excel' | 'csv')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pdf" id="pdf" />
                  <Label htmlFor="pdf" className="font-normal cursor-pointer">PDF</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel" className="font-normal cursor-pointer">Excel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="font-normal cursor-pointer">CSV</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Email Addresses */}
            <div className="space-y-2">
              <Label htmlFor="email-addresses">Send to Email Addresses (Optional)</Label>
              <Input
                id="email-addresses"
                placeholder="Enter email addresses separated by commas"
                value={emailAddresses}
                onChange={(e) => setEmailAddresses(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to download only. Separate multiple emails with commas.
              </p>
            </div>

            {/* Page Selection */}
            <div className="space-y-3">
              <Label>Pages to Export</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="practice-overview" 
                    checked={selectedPages.practiceOverview}
                    disabled
                  />
                  <Label 
                    htmlFor="practice-overview" 
                    className="font-normal cursor-not-allowed opacity-60"
                  >
                    Practice Overview <span className="text-xs text-muted-foreground">(Required)</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="team" 
                    checked={selectedPages.team}
                    onCheckedChange={(checked) => 
                      setSelectedPages(prev => ({ ...prev, team: checked as boolean }))
                    }
                  />
                  <Label htmlFor="team" className="font-normal cursor-pointer">Team</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="facilities" 
                    checked={selectedPages.facilities}
                    onCheckedChange={(checked) => 
                      setSelectedPages(prev => ({ ...prev, facilities: checked as boolean }))
                    }
                  />
                  <Label htmlFor="facilities" className="font-normal cursor-pointer">Facilities</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="financials" 
                    checked={selectedPages.financials}
                    onCheckedChange={(checked) => 
                      setSelectedPages(prev => ({ ...prev, financials: checked as boolean }))
                    }
                  />
                  <Label htmlFor="financials" className="font-normal cursor-pointer">Financials</Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              {emailAddresses ? 'Share & Export' : 'Export'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
