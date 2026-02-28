export type PracticeType = 
  | 'Small Animal Practice' 
  | 'Mixed Animal Practice' 
  | 'Large Animal Practice' 
  | 'Exotic Animal Practice' 
  | 'Emergency/24-Hour Clinic' 
  | 'Specialty Practice';

export type LocationType = 'Urban' | 'Suburban' | 'Residential' | 'Rural';

export type SellingStatus = 
  | 'Not for Sale' 
  | 'Open to Discussion' 
  | 'Ready for Offers' 
  | 'Actively Listening' 
  | 'Offer in Progress' 
  | 'Just Sold';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  photo: string;
  bio: string;
  age: number;
  school: string;
  yearsExperience: number;
  license: string;
  complaints: number;
  professionalExperience: string[];
}

export interface Technician {
  id: string;
  name: string;
  role: string;
  startDate: string;
  hourlySalary: number;
  hoursPerWeek: number;
  hasHealthInsurance: boolean;
}

export interface FinancialMetric {
  value: string;
  verified: boolean;
}

export interface Financials {
  annualRevenue: FinancialMetric;
  ebitda: FinancialMetric;
  ebitdaMargin: FinancialMetric;
  revenueMultiple: FinancialMetric;
  valuationRange: FinancialMetric;
  lastUpdated: string;
}

export interface Building {
  photos: string[];
  videos?: string[];
  floorPlan?: string[];
  sizeInSqFt: number;
  ownership: 'Owned' | 'Leased';
  examRooms: number;
  equipment: string[];
  servicesOffered: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface DealMatchCriterion {
  text: string;
  isPositive: boolean;
}

export interface Practice {
  id: string;
  businessName: string;
  address: string;
  website?: string;
  yearsInBusiness: number;
  practiceType: PracticeType;
  hoursOfOperation: string;
  numberOfDoctors: number;
  numberOfTechnicians: number;
  numberOfExamRooms: number;
  locationType: LocationType;
  services: string[];
  googleRating: number;
  currentValuation: string;
  growthScore: number;
  growthDescription: string;
  dealMatchScore: number;
  dealMatchCriteria: DealMatchCriterion[];
  sellingStatus: SellingStatus;
  financials: Financials;
  team: Doctor[];
  technicians: Technician[];
  building: Building;
  reviews: Review[];
  reviewSummary: {
    positive: string[];
    negative: string[];
  };
}
