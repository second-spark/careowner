export interface Activity {
  id: string;
  type: 'offer' | 'message' | 'interest' | 'document-request' | 'question' | 'meeting-scheduled' | 'offer-updated' | 'site-visit-request';
  title: string;
  description: string;
  timestamp: string;
  buyerId?: string;
  buyerName?: string;
  isUnread: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'offer',
    title: 'New Offer Received',
    description: 'PetVet Acquisition Group submitted a new offer of $4.2M',
    timestamp: 'October 4, 2025 at 2:30 PM',
    buyerId: '2',
    buyerName: 'PetVet Acquisition Group',
    isUnread: true,
    priority: 'high'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'Summit Veterinary Partners sent you a message about financial documentation',
    timestamp: 'October 4, 2025 at 11:15 AM',
    buyerId: '7',
    buyerName: 'Summit Veterinary Partners',
    isUnread: true,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'interest',
    title: 'New Interest Request',
    description: 'American Animal Hospital Group expressed interest in learning more about your practice',
    timestamp: 'October 3, 2025 at 4:45 PM',
    buyerId: '5',
    buyerName: 'American Animal Hospital Group',
    isUnread: false,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'document-request',
    title: 'Document Request',
    description: 'Midwest Animal Care Partners requested your 2024 tax returns and P&L statements',
    timestamp: 'October 3, 2025 at 10:00 AM',
    buyerId: '3',
    buyerName: 'Midwest Animal Care Partners',
    isUnread: false,
    priority: 'high'
  },
  {
    id: '5',
    type: 'question',
    title: 'Questions from Buyer',
    description: 'Dr. Michael Chang has 3 new questions about team retention and transition planning',
    timestamp: 'October 2, 2025 at 3:20 PM',
    buyerId: '8',
    buyerName: 'Dr. Michael Chang',
    isUnread: false,
    priority: 'medium'
  },
  {
    id: '6',
    type: 'meeting-scheduled',
    title: 'Meeting Scheduled',
    description: 'Site visit with Companion Care Partners confirmed for October 8 at 10:00 AM',
    timestamp: 'October 2, 2025 at 9:30 AM',
    buyerId: '6',
    buyerName: 'Companion Care Partners',
    isUnread: false,
    priority: 'high'
  },
  {
    id: '7',
    type: 'offer-updated',
    title: 'Offer Updated',
    description: 'Midwest Animal Care Partners increased their offer to $4.5M with revised terms',
    timestamp: 'October 1, 2025 at 5:00 PM',
    buyerId: '3',
    buyerName: 'Midwest Animal Care Partners',
    isUnread: false,
    priority: 'high'
  },
  {
    id: '8',
    type: 'site-visit-request',
    title: 'Site Visit Requested',
    description: 'Midwest Veterinary Associates would like to schedule a practice visit',
    timestamp: 'October 1, 2025 at 2:15 PM',
    buyerId: '9',
    buyerName: 'Midwest Veterinary Associates',
    isUnread: false,
    priority: 'medium'
  },
  {
    id: '9',
    type: 'message',
    title: 'New Message',
    description: 'Companion Care Partners shared their partnership agreement template',
    timestamp: 'September 30, 2025 at 4:30 PM',
    buyerId: '6',
    buyerName: 'Companion Care Partners',
    isUnread: false,
    priority: 'low'
  },
  {
    id: '10',
    type: 'interest',
    title: 'New Interest Request',
    description: 'Dr. Michael Chang submitted an interest request with personal introduction',
    timestamp: 'September 27, 2025 at 11:00 AM',
    buyerId: '8',
    buyerName: 'Dr. Michael Chang',
    isUnread: false,
    priority: 'medium'
  },
  {
    id: '11',
    type: 'question',
    title: 'Questions from Buyer',
    description: 'Summit Veterinary Partners asked about your growth strategy and expansion plans',
    timestamp: 'September 25, 2025 at 1:45 PM',
    buyerId: '7',
    buyerName: 'Summit Veterinary Partners',
    isUnread: false,
    priority: 'medium'
  },
  {
    id: '12',
    type: 'offer',
    title: 'New Offer Received',
    description: 'Midwest Animal Care Partners submitted an initial offer of $4.0M',
    timestamp: 'September 22, 2025 at 3:00 PM',
    buyerId: '3',
    buyerName: 'Midwest Animal Care Partners',
    isUnread: false,
    priority: 'high'
  }
];
