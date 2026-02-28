export interface Buyer {
  id: string;
  name: string;
  type: 'Corporate Group' | 'Private Equity' | 'Individual Buyer' | 'Strategic Partner';
  logo?: string;
  description: string;
  headquarters: string;
  founded: string;
  website?: string;
  totalAcquisitions: number;
  recentAcquisitions: string[];
  investmentRange: string;
  preferredDealStructure: string;
  postAcquisitionModel: string;
  keyContacts: {
    name: string;
    title: string;
    email: string;
    phone: string;
  }[];
  strengths: string[];
  considerations: string[];
  cultureFit: number; // 1-10
  financialStrength: number; // 1-10
  trackRecord: number; // 1-10
  status: 'offer-submitted' | 'in-discussion' | 'initial-interest' | 'rejected' | 'archived';
  lastContact?: string;
}

export const mockBuyers: Buyer[] = [
  {
    id: '1',
    name: 'VetCorp Partners',
    type: 'Corporate Group',
    description: 'VetCorp Partners is a leading consolidator of veterinary practices across the United States, with a portfolio of over 120 clinics in 25 states. They focus on maintaining practice autonomy while providing back-office support, marketing resources, and technology infrastructure.',
    headquarters: 'Nashville, TN',
    founded: '2015',
    website: 'https://www.vetcorppartners.com',
    totalAcquisitions: 127,
    recentAcquisitions: [
      'Mountain View Veterinary Clinic - Denver, CO (Sept 2025)',
      'Coastal Pet Hospital - Charleston, SC (Aug 2025)',
      'Prairie Animal Hospital - Kansas City, MO (July 2025)'
    ],
    investmentRange: '$2M - $5M',
    preferredDealStructure: '70-80% cash at close, 20-30% earnout over 2-3 years',
    postAcquisitionModel: 'Veterinarians retain clinical autonomy. Corporate handles HR, accounting, marketing, and technology. Monthly P&L reviews and quarterly business planning.',
    keyContacts: [
      {
        name: 'Jennifer Walsh',
        title: 'VP of Acquisitions',
        email: 'j.walsh@vetcorppartners.com',
        phone: '(615) 555-0142'
      },
      {
        name: 'Michael Rodriguez',
        title: 'Regional Director - Midwest',
        email: 'm.rodriguez@vetcorppartners.com',
        phone: '(615) 555-0198'
      }
    ],
    strengths: [
      'Proven track record with 127+ successful acquisitions',
      'Strong financial backing and operational support',
      'Allows doctors to maintain clinical independence',
      'Comprehensive benefits and continuing education programs',
      'Technology platform for practice management'
    ],
    considerations: [
      'Corporate structure may feel less personal than smaller buyers',
      'Standard processes may limit some practice-specific flexibility',
      '3-year employment commitment is non-negotiable'
    ],
    cultureFit: 7,
    financialStrength: 9,
    trackRecord: 9,
    status: 'offer-submitted',
    lastContact: 'October 2, 2025'
  },
  {
    id: '2',
    name: 'Lakeside Veterinary Group',
    type: 'Strategic Partner',
    description: 'Lakeside Veterinary Group is a regional network of 8 veterinary practices committed to high-quality care and community engagement. Founded by Dr. Emily Chen in 2010, the group maintains a collaborative culture where practice owners become partners in the larger organization.',
    headquarters: 'Madison, WI',
    founded: '2010',
    website: 'https://www.lakesidevetgroup.com',
    totalAcquisitions: 8,
    recentAcquisitions: [
      'Riverside Animal Clinic - Milwaukee, WI (June 2025)',
      'North Woods Pet Hospital - Green Bay, WI (March 2025)',
      'Capital City Veterinary - Madison, WI (Nov 2024)'
    ],
    investmentRange: '$2.5M - $4M',
    preferredDealStructure: '65-75% cash at close, 25-35% earnout based on revenue targets',
    postAcquisitionModel: 'Partnership model where acquired practices become part of a collaborative network. Shared resources for marketing, purchasing, and administration while maintaining individual practice identity.',
    keyContacts: [
      {
        name: 'Dr. Emily Chen',
        title: 'Founder & CEO',
        email: 'emily.chen@lakesidevetgroup.com',
        phone: '(608) 555-0234'
      },
      {
        name: 'David Park',
        title: 'Director of Business Development',
        email: 'd.park@lakesidevetgroup.com',
        phone: '(608) 555-0267'
      }
    ],
    strengths: [
      'Strong local reputation and community ties',
      'Partnership-oriented culture with collaborative decision making',
      'Investment in facility upgrades and equipment',
      'Focus on work-life balance and team satisfaction',
      'Similar practice philosophy and values'
    ],
    considerations: [
      'Smaller organization with less capital than larger groups',
      '30-35% earnout tied to aggressive revenue targets',
      'Integration timeline may be faster than comfortable',
      'Regional focus limits growth opportunities outside Midwest'
    ],
    cultureFit: 9,
    financialStrength: 7,
    trackRecord: 8,
    status: 'offer-submitted',
    lastContact: 'September 28, 2025'
  },
  {
    id: '3',
    name: 'PetHealth Equity Partners',
    type: 'Private Equity',
    description: 'PetHealth Equity Partners is a private equity firm specializing in veterinary and pet services investments. With $850M in assets under management, they focus on building a platform of veterinary practices with strong operational systems and growth potential.',
    headquarters: 'Boston, MA',
    founded: '2017',
    website: 'https://www.pethealthequity.com',
    totalAcquisitions: 56,
    recentAcquisitions: [
      'Metro Animal Hospital - Atlanta, GA (Aug 2025)',
      'Sunset Veterinary Clinic - Phoenix, AZ (June 2025)',
      'Harbor View Pet Care - Portland, OR (April 2025)'
    ],
    investmentRange: '$2M - $8M',
    preferredDealStructure: '70-80% cash at close, 20-30% rollover equity for upside participation',
    postAcquisitionModel: 'Centralized support services with standardized KPIs and reporting. Focus on operational efficiency, revenue cycle management, and strategic growth initiatives. Regular performance reviews and benchmarking.',
    keyContacts: [
      {
        name: 'Robert Thompson',
        title: 'Managing Partner',
        email: 'r.thompson@pethealthequity.com',
        phone: '(617) 555-0389'
      },
      {
        name: 'Sarah Mitchell',
        title: 'Vice President - Portfolio Management',
        email: 's.mitchell@pethealthequity.com',
        phone: '(617) 555-0412'
      }
    ],
    strengths: [
      'Strong financial resources and access to capital',
      'Sophisticated operational support and analytics',
      'Equity rollover opportunity for future value creation',
      'Professional development and leadership training',
      'National network for best practice sharing'
    ],
    considerations: [
      'Private equity timeline typically 5-7 years until exit',
      'More intensive reporting and KPI tracking requirements',
      'Less flexibility in operational decisions',
      '4-year employment term is longer than industry average',
      'Focus on financial returns may conflict with care philosophy'
    ],
    cultureFit: 6,
    financialStrength: 10,
    trackRecord: 8,
    status: 'offer-submitted',
    lastContact: 'September 25, 2025'
  },
  {
    id: '4',
    name: 'Dr. Sarah Martinez',
    type: 'Individual Buyer',
    description: 'Dr. Sarah Martinez is an experienced veterinarian with 15 years of clinical practice, currently working as an associate veterinarian at a nearby practice. She is seeking to purchase an established practice to build upon her clinical expertise with practice ownership.',
    headquarters: 'Chicago, IL',
    founded: 'N/A',
    totalAcquisitions: 0,
    recentAcquisitions: [],
    investmentRange: '$2M - $3.5M',
    preferredDealStructure: '50-60% cash at close, 40-50% seller financing or earnout over 3-5 years',
    postAcquisitionModel: 'Hands-on ownership with Dr. Martinez as primary veterinarian. Plans to maintain existing staff and gradually implement new services. Focused on building long-term relationships with clients and community.',
    keyContacts: [
      {
        name: 'Dr. Sarah Martinez',
        title: 'DVM',
        email: 'sarah.martinez.dvm@gmail.com',
        phone: '(312) 555-0567'
      },
      {
        name: 'James Wilson',
        title: 'Financial Advisor - First National Bank',
        email: 'j.wilson@firstnationalbank.com',
        phone: '(312) 555-0234'
      }
    ],
    strengths: [
      'Local veterinarian with excellent clinical reputation',
      'Committed to preserving practice culture and team',
      'Personal attention to transition and training',
      'Shorter employment transition period',
      'Genuine passion for patient care and community'
    ],
    considerations: [
      'First-time practice owner with no acquisition experience',
      'Lower total valuation ($2.75M)',
      'High earnout percentage (40%) creates payment uncertainty',
      'SBA loan financing contingency adds risk',
      'Limited capital for facility improvements or growth',
      'Less sophisticated business systems and support'
    ],
    cultureFit: 8,
    financialStrength: 5,
    trackRecord: 4,
    status: 'offer-submitted',
    lastContact: 'September 22, 2025'
  },
  {
    id: '5',
    name: 'American Animal Hospital Group',
    type: 'Corporate Group',
    description: 'American Animal Hospital Group is a rapidly growing veterinary consolidator focused on the Midwest and Great Plains regions. With 85 locations and growing, they emphasize a data-driven approach to practice management while supporting clinical excellence.',
    headquarters: 'Minneapolis, MN',
    founded: '2018',
    website: 'https://www.aahgroup.com',
    totalAcquisitions: 89,
    recentAcquisitions: [
      'Twin Cities Pet Clinic - Minneapolis, MN (Sept 2025)',
      'Great Plains Animal Hospital - Omaha, NE (Aug 2025)',
      'Heartland Veterinary - Des Moines, IA (July 2025)'
    ],
    investmentRange: '$2.5M - $6M',
    preferredDealStructure: '75-85% cash at close, 15-25% earnout over 2 years',
    postAcquisitionModel: 'Regional hub model with centralized business operations and shared resources. Doctors maintain clinical decision-making authority. Focus on technology adoption and process optimization.',
    keyContacts: [
      {
        name: 'Mark Stevens',
        title: 'Regional Director - Midwest',
        email: 'm.stevens@aahgroup.com',
        phone: '(612) 555-0823'
      },
      {
        name: 'Lisa Chen',
        title: 'Acquisitions Manager',
        email: 'l.chen@aahgroup.com',
        phone: '(612) 555-0891'
      }
    ],
    strengths: [
      'Strong regional presence in target market',
      'High cash percentage with minimal earnout',
      'Investment in modern technology and systems',
      'Competitive compensation and benefits',
      'Fast-growing organization with momentum'
    ],
    considerations: [
      'Relatively new organization (founded 2018)',
      'Fast growth may create integration challenges',
      'Data-driven culture may not fit all practice styles',
      'Less established track record than larger consolidators'
    ],
    cultureFit: 7,
    financialStrength: 8,
    trackRecord: 7,
    status: 'in-discussion',
    lastContact: 'September 30, 2025'
  },
  {
    id: '6',
    name: 'Companion Care Partners',
    type: 'Strategic Partner',
    description: 'Companion Care Partners is a veterinarian-owned network of 12 specialty and general practice hospitals across Illinois and Indiana. They pride themselves on clinical excellence and maintaining a collegial, mission-driven culture.',
    headquarters: 'Indianapolis, IN',
    founded: '2012',
    website: 'https://www.companioncarepartners.com',
    totalAcquisitions: 12,
    recentAcquisitions: [
      'Northside Animal Hospital - Indianapolis, IN (May 2025)',
      'Woodland Pet Care - Fort Wayne, IN (Feb 2025)'
    ],
    investmentRange: '$2M - $4.5M',
    preferredDealStructure: '60-70% cash at close, 30-40% earnout with equity participation',
    postAcquisitionModel: 'Collaborative partnership model with shared ownership opportunities. Focus on clinical mentorship, continuing education, and quality of care. Quarterly partner meetings and transparent financial sharing.',
    keyContacts: [
      {
        name: 'Dr. Rachel Thompson',
        title: 'Chief Medical Officer',
        email: 'r.thompson@companioncarepartners.com',
        phone: '(317) 555-0445'
      },
      {
        name: 'Andrew Martinez',
        title: 'Director of Partnerships',
        email: 'a.martinez@companioncarepartners.com',
        phone: '(317) 555-0478'
      }
    ],
    strengths: [
      'Veterinarian-owned and operated',
      'Strong focus on clinical quality and mentorship',
      'Equity participation opportunities',
      'Transparent culture with regular communication',
      'Proximity to your practice location'
    ],
    considerations: [
      'Higher earnout percentage (30-40%)',
      'Smaller scale may limit resources',
      'Growth expectations may be ambitious',
      'Partnership structure requires active engagement'
    ],
    cultureFit: 9,
    financialStrength: 7,
    trackRecord: 7,
    status: 'in-discussion',
    lastContact: 'October 1, 2025'
  },
  {
    id: '7',
    name: 'Summit Veterinary Partners',
    type: 'Private Equity',
    description: 'Summit Veterinary Partners is a private equity backed platform with over 200 veterinary practices nationwide. Backed by a $2.5B fund, they focus on providing operational excellence and strategic growth capital to their partner practices.',
    headquarters: 'Denver, CO',
    founded: '2016',
    totalAcquisitions: 215,
    recentAcquisitions: [
      'Rocky Mountain Pet Hospital - Boulder, CO (Sept 2025)',
      'Desert Oasis Veterinary - Tucson, AZ (Aug 2025)',
      'Pacific Northwest Animal Care - Seattle, WA (July 2025)'
    ],
    investmentRange: '$2M - $10M',
    preferredDealStructure: '70-75% cash at close, 25-30% rollover equity',
    postAcquisitionModel: 'Platform approach with shared services, best practice sharing, and comprehensive support. Strong focus on metrics, benchmarking, and continuous improvement. Access to national purchasing power and vendor relationships.',
    keyContacts: [
      {
        name: 'Patricia Reynolds',
        title: 'VP of Corporate Development',
        email: 'p.reynolds@summitvetpartners.com',
        phone: '(303) 555-0912'
      },
      {
        name: 'Dr. Kevin Park',
        title: 'Chief Veterinary Officer',
        email: 'k.park@summitvetpartners.com',
        phone: '(303) 555-0945'
      }
    ],
    strengths: [
      'Extensive resources and financial backing',
      'Large network for best practice sharing',
      'Sophisticated operational support systems',
      'National scale provides negotiating leverage',
      'Equity rollover for second bite at the apple'
    ],
    considerations: [
      'Large corporate structure may feel impersonal',
      'Significant reporting and compliance requirements',
      'Less flexibility in practice operations',
      'Private equity exit timeline (5-7 years)',
      'Cultural fit concerns with corporate approach'
    ],
    cultureFit: 5,
    financialStrength: 10,
    trackRecord: 9,
    status: 'initial-interest',
    lastContact: 'September 18, 2025'
  },
  {
    id: '8',
    name: 'Dr. Michael Chang',
    type: 'Individual Buyer',
    description: 'Dr. Michael Chang is a board-certified veterinary surgeon with 20 years of experience, currently practicing at a specialty hospital. He is interested in transitioning to general practice ownership and sees your practice as an ideal opportunity.',
    headquarters: 'Chicago, IL',
    founded: 'N/A',
    totalAcquisitions: 0,
    recentAcquisitions: [],
    investmentRange: '$2.5M - $4M',
    preferredDealStructure: '65-70% cash at close, 30-35% seller note over 4 years',
    postAcquisitionModel: 'Dr. Chang plans to work as a primary veterinarian while building the practice. He has strong financial backing and business acumen. Interested in maintaining staff and culture while gradually adding specialty services.',
    keyContacts: [
      {
        name: 'Dr. Michael Chang',
        title: 'DVM, DACVS',
        email: 'm.chang.dvm@specialtyvethospital.com',
        phone: '(312) 555-0734'
      },
      {
        name: 'Catherine Liu',
        title: 'Attorney - Business Acquisitions',
        email: 'c.liu@midwestlegal.com',
        phone: '(312) 555-0801'
      }
    ],
    strengths: [
      'Highly experienced veterinarian with specialty training',
      'Strong financial position with proven income',
      'Local to the area with established reputation',
      'Committed to maintaining practice culture',
      'Can add specialty services to increase revenue'
    ],
    considerations: [
      'First-time practice buyer',
      'Seller financing required (30-35%)',
      'Transition from specialty to general practice',
      'May need time to build general practice client base',
      'Learning curve on business operations'
    ],
    cultureFit: 8,
    financialStrength: 7,
    trackRecord: 3,
    status: 'in-discussion',
    lastContact: 'September 27, 2025'
  },
  {
    id: '9',
    name: 'Midwest Veterinary Associates',
    type: 'Strategic Partner',
    description: 'Midwest Veterinary Associates is a physician-owned network of 6 high-performing veterinary practices in the Chicago area. They focus on maintaining small-practice feel while leveraging shared resources and collective bargaining power.',
    headquarters: 'Chicago, IL',
    founded: '2019',
    totalAcquisitions: 6,
    recentAcquisitions: [
      'Lincoln Park Animal Hospital - Chicago, IL (June 2025)',
      'Oak Brook Pet Clinic - Oak Brook, IL (March 2025)'
    ],
    investmentRange: '$2.5M - $4.5M',
    preferredDealStructure: '65-70% cash at close, 30-35% earnout over 3 years',
    postAcquisitionModel: 'Decentralized model with strong practice autonomy. Shared services for HR, accounting, and marketing. Regular collaboration meetings and knowledge sharing. Emphasis on work-life balance and team satisfaction.',
    keyContacts: [
      {
        name: 'Dr. Jennifer Moore',
        title: 'Network Director',
        email: 'j.moore@midwestvetassociates.com',
        phone: '(312) 555-0623'
      },
      {
        name: 'Tom Davidson',
        title: 'Business Manager',
        email: 't.davidson@midwestvetassociates.com',
        phone: '(312) 555-0656'
      }
    ],
    strengths: [
      'Local organization with deep Chicago market knowledge',
      'Strong cultural alignment and practice philosophy',
      'Maintains practice independence and autonomy',
      'Focus on quality of care over growth metrics',
      'Close geographic proximity for easy collaboration'
    ],
    considerations: [
      'Smaller organization with limited capital',
      'Higher earnout component (30-35%)',
      'Newer organization (founded 2019)',
      'Limited geographic diversification',
      'May lack resources of larger buyers'
    ],
    cultureFit: 9,
    financialStrength: 6,
    trackRecord: 6,
    status: 'initial-interest',
    lastContact: 'September 15, 2025'
  },
  {
    id: '10',
    name: 'National Pet Care Holdings',
    type: 'Corporate Group',
    description: 'National Pet Care Holdings is a large veterinary consolidator with over 300 practices nationwide. They focus on standardization and operational efficiency across their portfolio.',
    headquarters: 'Dallas, TX',
    founded: '2014',
    totalAcquisitions: 312,
    recentAcquisitions: [
      'Sunbelt Animal Hospital - Houston, TX (Aug 2025)',
      'Metro Pet Clinic - Austin, TX (June 2025)'
    ],
    investmentRange: '$2M - $6M',
    preferredDealStructure: '60-65% cash at close, 35-40% earnout over 4 years',
    postAcquisitionModel: 'Highly centralized model with standardized processes across all locations. Corporate makes most operational decisions with limited practice autonomy.',
    keyContacts: [
      {
        name: 'Richard Adams',
        title: 'Acquisitions Director',
        email: 'r.adams@npcholdings.com',
        phone: '(214) 555-0923'
      }
    ],
    strengths: [
      'Large national presence',
      'Significant financial resources',
      'Established systems and processes'
    ],
    considerations: [
      'Limited clinical autonomy',
      'High earnout percentage',
      'Corporate culture may not align with practice values',
      'Long earnout period (4 years)'
    ],
    cultureFit: 4,
    financialStrength: 9,
    trackRecord: 7,
    status: 'rejected',
    lastContact: 'August 12, 2025'
  },
  {
    id: '11',
    name: 'Dr. James Patterson',
    type: 'Individual Buyer',
    description: 'Dr. James Patterson is a recent veterinary school graduate looking to purchase his first practice. While enthusiastic, his limited experience and financing challenges led to an unsuccessful offer.',
    headquarters: 'Chicago, IL',
    founded: 'N/A',
    totalAcquisitions: 0,
    recentAcquisitions: [],
    investmentRange: '$1.5M - $2.5M',
    preferredDealStructure: '40% cash at close, 60% seller financing over 7 years',
    postAcquisitionModel: 'First-time buyer seeking hands-on ownership with significant seller transition support and training.',
    keyContacts: [
      {
        name: 'Dr. James Patterson',
        title: 'DVM',
        email: 'j.patterson.dvm@gmail.com',
        phone: '(312) 555-0445'
      }
    ],
    strengths: [
      'Enthusiastic and passionate about veterinary medicine',
      'Local to the area',
      'Committed to practice ownership'
    ],
    considerations: [
      'Recent graduate with limited experience',
      'Low valuation offer ($2M)',
      'High seller financing requirement (60%)',
      'Unable to secure adequate financing',
      'Insufficient business experience'
    ],
    cultureFit: 6,
    financialStrength: 3,
    trackRecord: 2,
    status: 'rejected',
    lastContact: 'July 20, 2025'
  },
  {
    id: '12',
    name: 'Regional Veterinary Partners',
    type: 'Strategic Partner',
    description: 'Regional Veterinary Partners was interested in expanding into the Chicago market but ultimately decided to focus on other geographic areas.',
    headquarters: 'St. Louis, MO',
    founded: '2016',
    totalAcquisitions: 15,
    recentAcquisitions: [
      'Gateway Animal Clinic - St. Louis, MO (May 2025)'
    ],
    investmentRange: '$2M - $4M',
    preferredDealStructure: '65% cash at close, 35% earnout over 3 years',
    postAcquisitionModel: 'Partnership model with shared resources and collaborative decision-making.',
    keyContacts: [
      {
        name: 'Dr. William Foster',
        title: 'Managing Partner',
        email: 'w.foster@regionalvetpartners.com',
        phone: '(314) 555-0567'
      }
    ],
    strengths: [
      'Regional focus with similar markets',
      'Veterinarian-owned organization',
      'Collaborative culture'
    ],
    considerations: [
      'Geographic focus shifted away from Chicago',
      'Limited capital for expansion',
      'Cultural differences in practice approach'
    ],
    cultureFit: 7,
    financialStrength: 6,
    trackRecord: 6,
    status: 'archived',
    lastContact: 'June 15, 2025'
  }
];