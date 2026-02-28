export interface Meeting {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: 'Corporate Group' | 'Private Equity' | 'Individual Buyer' | 'Strategic Partner';
  meetingType: 'Video Call' | 'Phone Call' | 'Site Visit' | 'In-Person Meeting';
  date: string;
  time: string;
  duration: string;
  status: 'scheduled' | 'confirmed' | 'pending-confirmation' | 'completed' | 'cancelled';
  agenda: string;
  location?: string;
  meetingLink?: string;
  notes?: string;
  attendees: string[];
}

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    buyerId: '6',
    buyerName: 'Companion Care Partners',
    buyerType: 'Strategic Partner',
    meetingType: 'Site Visit',
    date: 'October 8, 2025',
    time: '10:00 AM',
    duration: '2 hours',
    status: 'confirmed',
    agenda: 'Practice tour, meet the team, review operations, discuss partnership opportunities',
    location: 'Lakeside Animal Hospital, 1525 Oak Street, Evanston, IL',
    notes: 'Dr. Rachel Thompson and Operations Manager will be visiting. Please have financial summaries ready.',
    attendees: ['Dr. Rachel Thompson (CMO)', 'Michael Stevens (Operations Manager)', 'Dr. Williams', 'Practice Manager']
  },
  {
    id: '2',
    buyerId: '7',
    buyerName: 'Summit Veterinary Partners',
    buyerType: 'Private Equity',
    meetingType: 'Video Call',
    date: 'October 10, 2025',
    time: '2:00 PM',
    duration: '1 hour',
    status: 'confirmed',
    agenda: 'Review financial performance, discuss valuation approach, Q&A about PE partnership model',
    meetingLink: 'https://zoom.us/j/1234567890',
    notes: 'They will present their partnership model and valuation methodology.',
    attendees: ['Patricia Reynolds (VP Corporate Development)', 'David Chen (Director of Finance)', 'Dr. Williams']
  },
  {
    id: '3',
    buyerId: '2',
    buyerName: 'PetVet Acquisition Group',
    buyerType: 'Corporate Group',
    meetingType: 'Phone Call',
    date: 'October 12, 2025',
    time: '3:30 PM',
    duration: '30 minutes',
    status: 'scheduled',
    agenda: 'Follow-up on initial offer, address questions about practice operations',
    notes: 'They want to discuss the counteroffer terms.',
    attendees: ['Sarah Johnson (Acquisition Manager)', 'Dr. Williams']
  },
  {
    id: '4',
    buyerId: '8',
    buyerName: 'Dr. Michael Chang',
    buyerType: 'Individual Buyer',
    meetingType: 'In-Person Meeting',
    date: 'October 15, 2025',
    time: '12:00 PM',
    duration: '1.5 hours',
    status: 'confirmed',
    agenda: 'Informal lunch to discuss practice philosophy, team culture, and transition expectations',
    location: 'The Metropolitan Club, Chicago',
    notes: 'Casual conversation to build relationship and assess cultural fit.',
    attendees: ['Dr. Michael Chang', 'Dr. Williams']
  },
  {
    id: '5',
    buyerId: '5',
    buyerName: 'American Animal Hospital Group',
    buyerType: 'Corporate Group',
    meetingType: 'Video Call',
    date: 'October 18, 2025',
    time: '11:00 AM',
    duration: '1 hour',
    status: 'pending-confirmation',
    agenda: 'Initial introduction call, learn about practice, share AAHG\'s approach to partnerships',
    meetingLink: 'https://teams.microsoft.com/meet/example',
    notes: 'First meeting - exploratory conversation.',
    attendees: ['Mark Stevens (Regional Director)', 'Jessica Park (Director of Practice Integration)', 'Dr. Williams']
  },
  {
    id: '6',
    buyerId: '3',
    buyerName: 'Midwest Animal Care Partners',
    buyerType: 'Strategic Partner',
    meetingType: 'Site Visit',
    date: 'October 22, 2025',
    time: '9:00 AM',
    duration: '3 hours',
    status: 'scheduled',
    agenda: 'Comprehensive practice walkthrough, equipment assessment, team introductions, review client records system',
    location: 'Lakeside Animal Hospital, 1525 Oak Street, Evanston, IL',
    notes: 'They are bringing their Chief Medical Officer and a technology specialist.',
    attendees: ['Dr. Robert Martinez (CMO)', 'Laura Kim (Technology Director)', 'Dr. Williams', 'Full team introduction']
  },
  {
    id: '7',
    buyerId: '9',
    buyerName: 'Midwest Veterinary Associates',
    buyerType: 'Strategic Partner',
    meetingType: 'Site Visit',
    date: 'October 25, 2025',
    time: '2:00 PM',
    duration: '2 hours',
    status: 'scheduled',
    agenda: 'Visit to one of MVA\'s existing practices, meet their network team, see their support model in action',
    location: 'MVA Lincoln Park Veterinary Clinic, 2156 N. Clybourn Ave, Chicago, IL',
    notes: 'They want us to see how they operate their network before making a decision.',
    attendees: ['Dr. Jennifer Moore (Network Director)', 'Dr. Williams']
  }
];
