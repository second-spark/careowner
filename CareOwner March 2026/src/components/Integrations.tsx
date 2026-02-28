import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { CheckCircle2, ExternalLink, Settings } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'Accounting' | 'Practice Management' | 'Marketing' | 'Analytics' | 'Payroll/HR';
  logo: string;
  isConnected: boolean;
  lastSynced?: string;
}

const integrations: Integration[] = [
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Sync financial data automatically for verified revenue and expense tracking.',
    category: 'Accounting',
    logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    isConnected: true,
    lastSynced: '2025-10-05T08:30:00',
  },
  {
    id: 'xero',
    name: 'Xero',
    description: 'Connect your Xero account to automatically import financial statements.',
    category: 'Accounting',
    logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    isConnected: false,
  },
  {
    id: 'covetrus-pulse',
    name: 'Covetrus Pulse',
    description: 'Integrate with Covetrus Pulse to sync client records and appointment data.',
    category: 'Practice Management',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop',
    isConnected: true,
    lastSynced: '2025-10-05T09:15:00',
  },
  {
    id: 'vetdata',
    name: 'VetData',
    description: 'Connect VetData PIMS to share practice metrics and client information.',
    category: 'Practice Management',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop',
    isConnected: false,
  },
  {
    id: 'idexx',
    name: 'IDEXX',
    description: 'Sync diagnostic data, inventory, and client records from IDEXX systems.',
    category: 'Practice Management',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop',
    isConnected: false,
  },
  {
    id: 'gusto',
    name: 'Gusto',
    description: 'Connect payroll and HR data to verify employee count and compensation.',
    category: 'Payroll/HR',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop',
    isConnected: true,
    lastSynced: '2025-10-05T07:45:00',
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Track website traffic and marketing performance for your practice.',
    category: 'Analytics',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
    isConnected: false,
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Sync email marketing campaigns and client communication metrics.',
    category: 'Marketing',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop',
    isConnected: false,
  },
];

export function Integrations() {
  const categories = ['All', 'Accounting', 'Practice Management', 'Payroll/HR', 'Marketing', 'Analytics'];

  const formatLastSynced = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-[20px] font-semibold">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your practice management, accounting, and marketing tools to automatically sync data and verify financial information.
          </p>
        </div>
        <Button className="gap-2">
          <ExternalLink className="w-4 h-4" />
          Connect
        </Button>
      </div>

      {/* Available Integrations */}
      <div>
        <h2 className="mb-4">Available Integrations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img 
                    src={integration.logo} 
                    alt={integration.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3>{integration.name}</h3>
                        {integration.isConnected && (
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {integration.category}
                      </Badge>
                    </div>
                    <Switch checked={integration.isConnected} />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {integration.description}
                  </p>
                  
                  {integration.isConnected ? (
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Last synced {formatLastSynced(integration.lastSynced)}
                      </p>
                      <Button variant="ghost" size="sm" className="gap-1 text-xs h-8">
                        Configure
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" className="gap-1">
                      Connect
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="mb-2">Need help with integrations?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our team can help you set up integrations to automatically sync your practice data. Connected integrations provide verified financial data that increases buyer confidence.
            </p>
            <Button variant="outline" className="gap-2">
              Contact Support
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
