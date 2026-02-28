export interface Message {
  id: string;
  type: 'potential-buyer' | 'current-deal' | 'question' | 'practice-staff';
  senderId: string;
  senderName: string;
  senderRole: string;
  senderAvatar?: string;
  subject?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  threadId: string;
  isQuestion?: boolean;
  isAnswered?: boolean;
  buyerId?: string;
  buyerName?: string;
}

export interface MessageThread {
  id: string;
  type: 'potential-buyer' | 'current-deal' | 'question' | 'practice-staff';
  subject: string;
  participantName: string;
  participantRole: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
  buyerId?: string;
  isQuestion?: boolean;
  isAnswered?: boolean;
}

export const mockMessageThreads: MessageThread[] = [
  {
    id: 'thread-1',
    type: 'potential-buyer',
    subject: 'Interest in Lakeside Animal Hospital',
    participantName: 'Sarah Chen',
    participantRole: 'Acquisition Manager at VetPartners LLC',
    lastMessage: 'Thank you for the additional information. We would like to schedule a call next week to discuss further.',
    lastMessageTime: '2025-10-11T14:30:00',
    unreadCount: 2,
    buyerId: '1',
    messages: [
      {
        id: 'msg-1-1',
        type: 'potential-buyer',
        senderId: 'buyer-1',
        senderName: 'Sarah Chen',
        senderRole: 'Acquisition Manager at VetPartners LLC',
        content: 'Hi, I\'m reaching out on behalf of VetPartners LLC. We are very interested in learning more about Lakeside Animal Hospital. Could you provide some additional details about your annual revenue and client base?',
        timestamp: '2025-10-10T09:15:00',
        isRead: true,
        threadId: 'thread-1',
        buyerId: '1',
        buyerName: 'VetPartners LLC'
      },
      {
        id: 'msg-1-2',
        type: 'potential-buyer',
        senderId: 'practice-owner',
        senderName: 'You',
        senderRole: 'Practice Owner',
        content: 'Thank you for your interest. Our annual revenue for 2024 was approximately $2.8M with a steady client base of around 3,500 active clients. We have a strong reputation in the community and consistent year-over-year growth.',
        timestamp: '2025-10-10T11:45:00',
        isRead: true,
        threadId: 'thread-1'
      },
      {
        id: 'msg-1-3',
        type: 'potential-buyer',
        senderId: 'buyer-1',
        senderName: 'Sarah Chen',
        senderRole: 'Acquisition Manager at VetPartners LLC',
        content: 'Thank you for the additional information. We would like to schedule a call next week to discuss further.',
        timestamp: '2025-10-11T14:30:00',
        isRead: false,
        threadId: 'thread-1',
        buyerId: '1',
        buyerName: 'VetPartners LLC'
      }
    ]
  },
  {
    id: 'thread-2',
    type: 'question',
    subject: 'Equipment and Technology',
    participantName: 'Michael Torres',
    participantRole: 'Due Diligence Manager at National Veterinary Associates',
    lastMessage: 'What imaging equipment do you currently have, and when was it last serviced or upgraded?',
    lastMessageTime: '2025-10-11T10:20:00',
    unreadCount: 1,
    buyerId: '2',
    isQuestion: true,
    isAnswered: false,
    messages: [
      {
        id: 'msg-2-1',
        type: 'question',
        senderId: 'buyer-2',
        senderName: 'Michael Torres',
        senderRole: 'Due Diligence Manager at National Veterinary Associates',
        subject: 'Equipment and Technology',
        content: 'What imaging equipment do you currently have, and when was it last serviced or upgraded?',
        timestamp: '2025-10-11T10:20:00',
        isRead: false,
        threadId: 'thread-2',
        isQuestion: true,
        isAnswered: false,
        buyerId: '2',
        buyerName: 'National Veterinary Associates'
      }
    ]
  },
  {
    id: 'thread-3',
    type: 'current-deal',
    subject: 'Due Diligence - Financial Documents',
    participantName: 'Jennifer Martinez',
    participantRole: 'Deal Manager at Mars Petcare',
    lastMessage: 'We have received the tax returns. Could you also provide the P&L statements for Q1 and Q2 of 2025?',
    lastMessageTime: '2025-10-12T08:15:00',
    unreadCount: 1,
    buyerId: '3',
    messages: [
      {
        id: 'msg-3-1',
        type: 'current-deal',
        senderId: 'buyer-3',
        senderName: 'Jennifer Martinez',
        senderRole: 'Deal Manager at Mars Petcare',
        content: 'Thank you for uploading the financial documents to the deal room. We\'re reviewing the tax returns now.',
        timestamp: '2025-10-11T16:30:00',
        isRead: true,
        threadId: 'thread-3',
        buyerId: '3',
        buyerName: 'Mars Petcare'
      },
      {
        id: 'msg-3-2',
        type: 'current-deal',
        senderId: 'practice-owner',
        senderName: 'You',
        senderRole: 'Practice Owner',
        content: 'Great, let me know if you need any clarification on the documents.',
        timestamp: '2025-10-11T17:00:00',
        isRead: true,
        threadId: 'thread-3'
      },
      {
        id: 'msg-3-3',
        type: 'current-deal',
        senderId: 'buyer-3',
        senderName: 'Jennifer Martinez',
        senderRole: 'Deal Manager at Mars Petcare',
        content: 'We have received the tax returns. Could you also provide the P&L statements for Q1 and Q2 of 2025?',
        timestamp: '2025-10-12T08:15:00',
        isRead: false,
        threadId: 'thread-3',
        buyerId: '3',
        buyerName: 'Mars Petcare'
      }
    ]
  },
  {
    id: 'thread-4',
    type: 'practice-staff',
    subject: 'Sale Process Update',
    participantName: 'Dr. Emily Roberts',
    participantRole: 'Associate Veterinarian',
    lastMessage: 'Thanks for the update. Will there be any changes to our current patient care protocols during the transition?',
    lastMessageTime: '2025-10-11T13:45:00',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-4-1',
        type: 'practice-staff',
        senderId: 'practice-owner',
        senderName: 'You',
        senderRole: 'Practice Owner',
        subject: 'Sale Process Update',
        content: 'Hi team, I wanted to update you on the sale process. We are in active discussions with several interested parties and expect to move forward with due diligence in the coming weeks.',
        timestamp: '2025-10-11T12:00:00',
        isRead: true,
        threadId: 'thread-4'
      },
      {
        id: 'msg-4-2',
        type: 'practice-staff',
        senderId: 'staff-1',
        senderName: 'Dr. Emily Roberts',
        senderRole: 'Associate Veterinarian',
        content: 'Thanks for the update. Will there be any changes to our current patient care protocols during the transition?',
        timestamp: '2025-10-11T13:45:00',
        isRead: true,
        threadId: 'thread-4'
      }
    ]
  },
  {
    id: 'thread-5',
    type: 'question',
    subject: 'Staff Retention Plans',
    participantName: 'David Kim',
    participantRole: 'VP of Acquisitions at Pathway Vet Alliance',
    lastMessage: 'What percentage of your current staff have indicated they would stay on after acquisition?',
    lastMessageTime: '2025-10-10T15:30:00',
    unreadCount: 1,
    buyerId: '4',
    isQuestion: true,
    isAnswered: false,
    messages: [
      {
        id: 'msg-5-1',
        type: 'question',
        senderId: 'buyer-4',
        senderName: 'David Kim',
        senderRole: 'VP of Acquisitions at Pathway Vet Alliance',
        subject: 'Staff Retention Plans',
        content: 'What percentage of your current staff have indicated they would stay on after acquisition?',
        timestamp: '2025-10-10T15:30:00',
        isRead: false,
        threadId: 'thread-5',
        isQuestion: true,
        isAnswered: false,
        buyerId: '4',
        buyerName: 'Pathway Vet Alliance'
      }
    ]
  },
  {
    id: 'thread-6',
    type: 'potential-buyer',
    subject: 'Initial Inquiry about Practice',
    participantName: 'Robert Anderson',
    participantRole: 'Senior Analyst at PetVet Care Centers',
    lastMessage: 'We would love to learn more about your practice and potentially set up a preliminary call.',
    lastMessageTime: '2025-10-09T11:00:00',
    unreadCount: 0,
    buyerId: '5',
    messages: [
      {
        id: 'msg-6-1',
        type: 'potential-buyer',
        senderId: 'buyer-5',
        senderName: 'Robert Anderson',
        senderRole: 'Senior Analyst at PetVet Care Centers',
        content: 'Hello, PetVet Care Centers is actively seeking acquisition opportunities in your region. We would love to learn more about your practice and potentially set up a preliminary call.',
        timestamp: '2025-10-09T11:00:00',
        isRead: true,
        threadId: 'thread-6',
        buyerId: '5',
        buyerName: 'PetVet Care Centers'
      },
      {
        id: 'msg-6-2',
        type: 'potential-buyer',
        senderId: 'practice-owner',
        senderName: 'You',
        senderRole: 'Practice Owner',
        content: 'Thank you for reaching out. I would be happy to discuss this further. I\'m available for a call next Tuesday or Wednesday afternoon.',
        timestamp: '2025-10-09T14:20:00',
        isRead: true,
        threadId: 'thread-6'
      }
    ]
  },
  {
    id: 'thread-7',
    type: 'current-deal',
    subject: 'Site Visit Scheduling',
    participantName: 'Amanda Foster',
    participantRole: 'Acquisition Coordinator at Mars Petcare',
    lastMessage: 'Perfect! We\'ll plan for October 18th at 10 AM. Looking forward to it.',
    lastMessageTime: '2025-10-11T16:00:00',
    unreadCount: 0,
    buyerId: '3',
    messages: [
      {
        id: 'msg-7-1',
        type: 'current-deal',
        senderId: 'buyer-3b',
        senderName: 'Amanda Foster',
        senderRole: 'Acquisition Coordinator at Mars Petcare',
        content: 'Hi, we would like to schedule a site visit for next week. Would October 18th work for you?',
        timestamp: '2025-10-11T14:00:00',
        isRead: true,
        threadId: 'thread-7',
        buyerId: '3',
        buyerName: 'Mars Petcare'
      },
      {
        id: 'msg-7-2',
        type: 'current-deal',
        senderId: 'practice-owner',
        senderName: 'You',
        senderRole: 'Practice Owner',
        content: 'Yes, October 18th works well. How about 10 AM?',
        timestamp: '2025-10-11T15:30:00',
        isRead: true,
        threadId: 'thread-7'
      },
      {
        id: 'msg-7-3',
        type: 'current-deal',
        senderId: 'buyer-3b',
        senderName: 'Amanda Foster',
        senderRole: 'Acquisition Coordinator at Mars Petcare',
        content: 'Perfect! We\'ll plan for October 18th at 10 AM. Looking forward to it.',
        timestamp: '2025-10-11T16:00:00',
        isRead: true,
        threadId: 'thread-7',
        buyerId: '3',
        buyerName: 'Mars Petcare'
      }
    ]
  },
  {
    id: 'thread-8',
    type: 'question',
    subject: 'Client Demographics',
    participantName: 'Lisa Wang',
    participantRole: 'Market Analyst at VetPartners LLC',
    lastMessage: 'Can you provide a breakdown of your client base by service type (wellness, emergency, surgery, etc.)?',
    lastMessageTime: '2025-10-12T09:30:00',
    unreadCount: 1,
    buyerId: '1',
    isQuestion: true,
    isAnswered: false,
    messages: [
      {
        id: 'msg-8-1',
        type: 'question',
        senderId: 'buyer-1b',
        senderName: 'Lisa Wang',
        senderRole: 'Market Analyst at VetPartners LLC',
        subject: 'Client Demographics',
        content: 'Can you provide a breakdown of your client base by service type (wellness, emergency, surgery, etc.)?',
        timestamp: '2025-10-12T09:30:00',
        isRead: false,
        threadId: 'thread-8',
        isQuestion: true,
        isAnswered: false,
        buyerId: '1',
        buyerName: 'VetPartners LLC'
      }
    ]
  },
  {
    id: 'thread-9',
    type: 'practice-staff',
    subject: 'Benefits During Transition',
    participantName: 'Marcus Johnson',
    participantRole: 'Head Technician',
    lastMessage: 'That\'s good to hear. Will our PTO balances carry over?',
    lastMessageTime: '2025-10-10T16:20:00',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-9-1',
        type: 'practice-staff',
        senderId: 'staff-2',
        senderName: 'Marcus Johnson',
        senderRole: 'Head Technician',
        content: 'Hi, I have some questions about how the sale will affect our current benefits package.',
        timestamp: '2025-10-10T14:00:00',
        isRead: true,
        threadId: 'thread-9'
      },
      {
        id: 'msg-9-2',
        type: 'practice-staff',
        senderId: 'practice-owner',
        senderName: 'You',
        senderRole: 'Practice Owner',
        content: 'Great question. Part of our negotiation includes maintaining or improving benefits for all staff. I\'ll have more specific details as we progress.',
        timestamp: '2025-10-10T15:45:00',
        isRead: true,
        threadId: 'thread-9'
      },
      {
        id: 'msg-9-3',
        type: 'practice-staff',
        senderId: 'staff-2',
        senderName: 'Marcus Johnson',
        senderRole: 'Head Technician',
        content: 'That\'s good to hear. Will our PTO balances carry over?',
        timestamp: '2025-10-10T16:20:00',
        isRead: true,
        threadId: 'thread-9'
      }
    ]
  },
  {
    id: 'thread-10',
    type: 'question',
    subject: 'Lease Terms',
    participantName: 'Christine Lee',
    participantRole: 'Real Estate Specialist at National Veterinary Associates',
    lastMessage: 'What are the current terms of your facility lease, and is the landlord open to a new long-term agreement?',
        lastMessageTime: '2025-10-11T11:15:00',
    unreadCount: 0,
    buyerId: '2',
    isQuestion: true,
    isAnswered: true,
    messages: [
      {
        id: 'msg-10-1',
        type: 'question',
        senderId: 'buyer-2b',
        senderName: 'Christine Lee',
        senderRole: 'Real Estate Specialist at National Veterinary Associates',
        subject: 'Lease Terms',
        content: 'What are the current terms of your facility lease, and is the landlord open to a new long-term agreement?',
        timestamp: '2025-10-11T11:15:00',
        isRead: true,
        threadId: 'thread-10',
        isQuestion: true,
        isAnswered: false,
        buyerId: '2',
        buyerName: 'National Veterinary Associates'
      },
      {
        id: 'msg-10-2',
        type: 'question',
        senderId: 'practice-owner',
        senderName: 'You',
        senderRole: 'Practice Owner',
        content: 'We currently have 5 years remaining on our lease with two 5-year renewal options. The landlord has been very cooperative and has indicated willingness to work with a new owner.',
        timestamp: '2025-10-11T14:30:00',
        isRead: true,
        threadId: 'thread-10',
        isQuestion: true,
        isAnswered: true
      }
    ]
  }
];
