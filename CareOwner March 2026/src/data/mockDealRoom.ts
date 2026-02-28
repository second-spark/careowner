export interface DealRoomAccess {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface DealRoomDocument {
  id: string;
  name: string;
  uploadedBy: 'buyer' | 'seller';
  uploadedDate: string;
  category: string;
  size: string;
}

export interface RequestedDocument {
  id: string;
  name: string;
  description: string;
  requestedBy: string;
  requestedDate: string;
  dueDate: string;
  status: 'pending' | 'uploaded';
  uploadedDocumentId?: string;
}

export interface DealRoomTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'complete';
  priority: 'high' | 'medium' | 'low';
}

export interface DealRoomQA {
  id: string;
  question: string;
  askedBy: string;
  askedDate: string;
  answer?: string;
  answeredBy?: string;
  answeredDate?: string;
  status: 'pending' | 'answered';
}

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'complete' | 'in-progress' | 'pending';
  date?: string;
}

export interface DealRoom {
  id: string;
  buyerId: string;
  buyerName: string;
  offerAmount: string;
  estimatedClosingDate: string;
  status: 'active' | 'closed' | 'cancelled';
  accessList: DealRoomAccess[];
  timeline: TimelineStep[];
  tasks: DealRoomTask[];
  documents: DealRoomDocument[];
  requestedDocuments: RequestedDocument[];
  qa: DealRoomQA[];
  dealDetails: {
    offerAmount: string;
    cashPercentage: number;
    earnoutPercentage: number;
    employmentTerm: string;
    submittedDate: string;
    expirationDate: string;
    cashAtClose: string;
    earnoutAmount: string;
    totalValue: string;
  };
}

export const mockDealRoom: DealRoom = {
  id: '1',
  buyerId: '2',
  buyerName: 'Lakeside Veterinary Group',
  offerAmount: '$3,450,000',
  estimatedClosingDate: 'November 15, 2025',
  status: 'active',
  accessList: [
    { id: '1', name: 'Dr. Emily Chen', role: 'Seller', initials: 'EC' },
    { id: '2', name: 'Sarah Williams', role: 'Buyer Representative', initials: 'SW' },
    { id: '3', name: 'Michael Brown', role: 'Seller Attorney', initials: 'MB' },
    { id: '4', name: 'Jennifer Garcia', role: 'Buyer Attorney', initials: 'JG' },
    { id: '5', name: 'David Kim', role: 'Accountant', initials: 'DK' },
  ],
  timeline: [
    {
      id: '1',
      title: 'Offer Accepted',
      description: 'Letter of Intent signed by both parties',
      status: 'complete',
      date: 'October 5, 2025',
    },
    {
      id: '2',
      title: 'Due Diligence',
      description: 'Review of financial records and operations',
      status: 'in-progress',
      date: 'October 8 - October 30, 2025',
    },
    {
      id: '3',
      title: 'Purchase Agreement',
      description: 'Negotiate and finalize purchase agreement',
      status: 'pending',
    },
    {
      id: '4',
      title: 'Financing & Approval',
      description: 'Buyer secures financing and final approvals',
      status: 'pending',
    },
    {
      id: '5',
      title: 'Closing',
      description: 'Transfer of ownership and funds',
      status: 'pending',
    },
  ],
  tasks: [
    {
      id: '1',
      title: 'Provide last 3 years of tax returns',
      description: 'Upload complete tax returns for 2022, 2023, and 2024',
      assignedTo: 'Dr. Emily Chen',
      dueDate: 'October 12, 2025',
      status: 'todo',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Equipment appraisal',
      description: 'Schedule and complete appraisal of all medical equipment',
      assignedTo: 'Sarah Williams',
      dueDate: 'October 15, 2025',
      status: 'in-progress',
      priority: 'high',
    },
    {
      id: '3',
      title: 'Review purchase agreement draft',
      description: 'Legal review of initial purchase agreement',
      assignedTo: 'Michael Brown',
      dueDate: 'October 18, 2025',
      status: 'in-progress',
      priority: 'medium',
    },
    {
      id: '4',
      title: 'Client records audit',
      description: 'Complete audit of client database and active patients',
      assignedTo: 'Dr. Emily Chen',
      dueDate: 'October 20, 2025',
      status: 'todo',
      priority: 'medium',
    },
    {
      id: '5',
      title: 'Environmental assessment',
      description: 'Phase 1 environmental site assessment',
      assignedTo: 'Sarah Williams',
      dueDate: 'October 22, 2025',
      status: 'todo',
      priority: 'low',
    },
    {
      id: '6',
      title: 'Financial statements verification',
      description: 'Verify accuracy of financial statements',
      assignedTo: 'David Kim',
      dueDate: 'October 10, 2025',
      status: 'complete',
      priority: 'high',
    },
    {
      id: '7',
      title: 'Staff notification plan',
      description: 'Develop communication plan for staff notification',
      assignedTo: 'Dr. Emily Chen',
      dueDate: 'October 8, 2025',
      status: 'complete',
      priority: 'medium',
    },
  ],
  documents: [
    {
      id: '1',
      name: 'Letter of Intent - Signed.pdf',
      uploadedBy: 'seller',
      uploadedDate: 'October 5, 2025',
      category: 'Legal',
      size: '2.3 MB',
    },
    {
      id: '2',
      name: '2024 Tax Return.pdf',
      uploadedBy: 'seller',
      uploadedDate: 'October 6, 2025',
      category: 'Financial',
      size: '4.1 MB',
    },
    {
      id: '3',
      name: '2023 Tax Return.pdf',
      uploadedBy: 'seller',
      uploadedDate: 'October 6, 2025',
      category: 'Financial',
      size: '3.9 MB',
    },
    {
      id: '4',
      name: '2022 Tax Return.pdf',
      uploadedBy: 'seller',
      uploadedDate: 'October 6, 2025',
      category: 'Financial',
      size: '3.7 MB',
    },
    {
      id: '5',
      name: 'Equipment List.xlsx',
      uploadedBy: 'seller',
      uploadedDate: 'October 7, 2025',
      category: 'Operations',
      size: '156 KB',
    },
    {
      id: '6',
      name: 'Active Client Database.xlsx',
      uploadedBy: 'seller',
      uploadedDate: 'October 7, 2025',
      category: 'Operations',
      size: '2.8 MB',
    },
    {
      id: '7',
      name: 'Due Diligence Checklist.pdf',
      uploadedBy: 'buyer',
      uploadedDate: 'October 8, 2025',
      category: 'Legal',
      size: '892 KB',
    },
    {
      id: '8',
      name: 'Proof of Funds.pdf',
      uploadedBy: 'buyer',
      uploadedDate: 'October 5, 2025',
      category: 'Financial',
      size: '1.2 MB',
    },
  ],
  requestedDocuments: [
    {
      id: '1',
      name: 'Lease Agreement',
      description: 'Current building lease agreement with all amendments',
      requestedBy: 'Jennifer Garcia',
      requestedDate: 'October 8, 2025',
      dueDate: 'October 15, 2025',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Equipment Maintenance Records',
      description: 'Maintenance and service records for all major equipment',
      requestedBy: 'Sarah Williams',
      requestedDate: 'October 8, 2025',
      dueDate: 'October 18, 2025',
      status: 'pending',
    },
    {
      id: '3',
      name: 'Staff Employment Contracts',
      description: 'Current employment contracts for all veterinarians and key staff',
      requestedBy: 'Jennifer Garcia',
      requestedDate: 'October 9, 2025',
      dueDate: 'October 20, 2025',
      status: 'pending',
    },
    {
      id: '4',
      name: 'Insurance Policies',
      description: 'Current liability, property, and malpractice insurance policies',
      requestedBy: 'Sarah Williams',
      requestedDate: 'October 9, 2025',
      dueDate: 'October 22, 2025',
      status: 'pending',
    },
  ],
  qa: [
    {
      id: '1',
      question: 'What is the current staff retention rate and are there any key employees planning to leave?',
      askedBy: 'Sarah Williams',
      askedDate: 'October 6, 2025',
      answer: 'Our staff retention rate over the past 3 years has been 92%. All key employees have indicated their intention to stay through the transition. We have two veterinarians with 5+ years of tenure who are excited about the acquisition.',
      answeredBy: 'Dr. Emily Chen',
      answeredDate: 'October 6, 2025',
      status: 'answered',
    },
    {
      id: '2',
      question: 'Are there any pending lawsuits or legal disputes involving the practice?',
      askedBy: 'Jennifer Garcia',
      askedDate: 'October 6, 2025',
      answer: 'No, there are no pending lawsuits or legal disputes. We have maintained clean legal records and can provide documentation to confirm this.',
      answeredBy: 'Michael Brown',
      answeredDate: 'October 7, 2025',
      status: 'answered',
    },
    {
      id: '3',
      question: 'What percentage of revenue comes from the top 10 clients?',
      askedBy: 'Sarah Williams',
      askedDate: 'October 7, 2025',
      answer: 'Our top 10 clients represent approximately 8% of total revenue, which indicates a well-diversified client base. The detailed breakdown is available in the financial documents section.',
      answeredBy: 'David Kim',
      answeredDate: 'October 7, 2025',
      status: 'answered',
    },
    {
      id: '4',
      question: 'Can you provide details on any equipment leases or maintenance contracts that will transfer with the sale?',
      askedBy: 'Sarah Williams',
      askedDate: 'October 8, 2025',
      status: 'pending',
    },
    {
      id: '5',
      question: 'What is the current status of the building lease and what are the renewal terms?',
      askedBy: 'Jennifer Garcia',
      askedDate: 'October 8, 2025',
      status: 'pending',
    },
  ],
  dealDetails: {
    offerAmount: '$3,450,000',
    cashPercentage: 70,
    earnoutPercentage: 30,
    employmentTerm: '2 years',
    submittedDate: 'September 28, 2025',
    expirationDate: 'October 12, 2025',
    cashAtClose: '$2,415,000',
    earnoutAmount: '$1,035,000',
    totalValue: '$3,450,000',
  },
};
