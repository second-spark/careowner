export interface OfferDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedDate: string;
}

export interface OfferDetail {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: 'Corporate Group' | 'Private Equity' | 'Individual Buyer' | 'Strategic Partner';
  offerAmount: string;
  submittedDate: string;
  expirationDate: string;
  status: 'pending' | 'under-review' | 'accepted' | 'declined';
  
  // Overview / Cover Letter
  coverLetter: {
    opening: string;
    aboutPractice: string;
    aboutCompany: string;
    whyGoodFit: string;
    closing: string;
  };
  
  // Deal Details
  dealDetails: {
    offerAmount: string;
    cashPercentage: number;
    earnoutPercentage: number;
    employmentTerm: string;
    cashAtClose: string;
    earnoutAmount: string;
    totalValue: string;
    earnoutStructure: string;
    competitionClause: string;
    transitionSupport: string;
  };
  
  // Highlights and Considerations
  highlights: string[];
  concerns: string[];
  
  // Documents
  documents: OfferDocument[];
}

export const mockOfferDetails: { [key: string]: OfferDetail } = {
  '1': {
    id: '1',
    buyerId: '1',
    buyerName: 'VetCorp Partners',
    buyerType: 'Corporate Group',
    offerAmount: '$3,200,000',
    submittedDate: 'October 2, 2025',
    expirationDate: 'October 16, 2025',
    status: 'pending',
    coverLetter: {
      opening: "Dear Dr. Chen,\n\nOn behalf of VetCorp Partners, I am pleased to present our formal offer to acquire Lakeside Animal Hospital. We have been thoroughly impressed by your practice's reputation, commitment to quality care, and strong community presence.",
      aboutPractice: "What stands out most about Lakeside Animal Hospital is your dedication to comprehensive, compassionate veterinary care. Your practice has built an exceptional reputation over the past 15 years, with a loyal client base of over 3,500 active patients and a team of highly skilled veterinarians and support staff. Your focus on preventive care, advanced diagnostics, and client education aligns perfectly with our values and operating philosophy.",
      aboutCompany: "VetCorp Partners is a veterinary practice management company with 42 locations across the Western United States. We specialize in partnering with high-quality, independent practices like yours to provide operational support, marketing resources, and growth capital while preserving clinical autonomy. Our portfolio practices maintain an average client satisfaction score of 4.8/5 stars, and we pride ourselves on retaining 95% of practice teams through transitions.",
      whyGoodFit: "We believe this partnership would be mutually beneficial for several reasons:\n\n• Clinical Autonomy: You would retain complete control over medical decisions and patient care protocols for the duration of your employment term.\n\n• Team Preservation: We are committed to keeping your entire team intact, with competitive compensation and benefits packages.\n\n• Growth Investment: We plan to invest $200,000 in facility upgrades and new equipment within the first year.\n\n• Technology & Support: Access to our advanced practice management systems, centralized billing, and marketing resources.\n\n• Cultural Fit: Our decentralized management approach respects the unique culture of each practice.",
      closing: "We are excited about the opportunity to partner with you and continue building on the strong foundation you've established at Lakeside Animal Hospital. We believe our offer reflects the true value of your practice and provides you with a fair and attractive exit strategy.\n\nWe look forward to discussing this opportunity further and answering any questions you may have.\n\nSincerely,\nJohn Anderson\nChief Development Officer, VetCorp Partners"
    },
    dealDetails: {
      offerAmount: '$3,200,000',
      cashPercentage: 80,
      earnoutPercentage: 20,
      employmentTerm: '3 years',
      cashAtClose: '$2,560,000',
      earnoutAmount: '$640,000',
      totalValue: '$3,200,000',
      earnoutStructure: 'Earnout based on maintaining 90% of current revenue over 3-year period, paid annually',
      competitionClause: '5-year non-compete within 25-mile radius',
      transitionSupport: 'Full operational support during transition, including HR, IT, and marketing integration over 6-month period'
    },
    highlights: [
      'All-cash offer with minimal earnout',
      'Competitive valuation at 3.2x revenue',
      'Retain full clinical autonomy for 3 years',
      'Keep existing team intact'
    ],
    concerns: [
      'Requires 3-year employment commitment',
      'Some concerns about corporate culture fit'
    ],
    documents: [
      {
        id: '1',
        name: 'Letter of Intent - VetCorp Partners.pdf',
        type: 'PDF',
        size: '2.4 MB',
        uploadedDate: 'October 2, 2025'
      },
      {
        id: '2',
        name: 'About VetCorp Partners.pdf',
        type: 'PDF',
        size: '5.1 MB',
        uploadedDate: 'October 2, 2025'
      },
      {
        id: '3',
        name: 'VetCorp Growth Strategy.pptx',
        type: 'PowerPoint',
        size: '8.3 MB',
        uploadedDate: 'October 2, 2025'
      }
    ]
  },
  '2': {
    id: '2',
    buyerId: '2',
    buyerName: 'Lakeside Veterinary Group',
    buyerType: 'Strategic Partner',
    offerAmount: '$3,450,000',
    submittedDate: 'September 28, 2025',
    expirationDate: 'October 12, 2025',
    status: 'under-review',
    coverLetter: {
      opening: "Dear Dr. Chen,\n\nI hope this letter finds you well. After our recent conversations and tours of Lakeside Animal Hospital, I am thrilled to present our formal acquisition offer. Your practice represents exactly the kind of high-quality, community-focused veterinary care that Lakeside Veterinary Group was built to support and grow.",
      aboutPractice: "Lakeside Animal Hospital has established itself as a premier veterinary facility in the region. Your commitment to excellence in patient care, investment in modern equipment, and cultivation of a talented, dedicated team have created a practice that any veterinarian would be proud to lead. Your emphasis on client education and preventive care has resulted in exceptional patient outcomes and client loyalty that is rare in today's market.",
      aboutCompany: "Lakeside Veterinary Group was founded in 2015 with the mission to create a network of veterinary practices that prioritize medical excellence, team culture, and community impact. We currently operate 12 practices throughout the Pacific Northwest, all within a 100-mile radius, allowing for strong regional collaboration and referral networks. Unlike larger corporate consolidators, we maintain local decision-making authority and preserve the unique character of each practice we acquire.",
      whyGoodFit: "This partnership opportunity is compelling for several key reasons:\n\n• Highest Valuation: Our offer of $3,450,000 reflects our strong belief in the value you've created and our commitment to fair pricing.\n\n• Regional Synergy: Our practices already refer complex cases to each other, and your practice would strengthen this network.\n\n• Shared Philosophy: We believe in the same approach to veterinary medicine—comprehensive, compassionate care with a focus on long-term patient relationships.\n\n• Local Leadership: Our CEO, Dr. Patricia Williams, is a practicing veterinarian who understands the challenges and rewards of practice ownership.\n\n• Facility Investment: We've allocated $150,000 for immediate facility upgrades and will support ongoing capital improvements.\n\n• Flexible Terms: We're open to customizing the employment agreement to fit your personal and professional goals.",
      closing: "Dr. Chen, we see this as more than an acquisition—we see it as a partnership between practices that share the same values and vision for veterinary medicine. We would be honored to continue the legacy you've built at Lakeside Animal Hospital.\n\nI'm available at your convenience to discuss any aspect of this offer and answer your questions.\n\nWarm regards,\nDr. Patricia Williams\nCEO & Founder, Lakeside Veterinary Group"
    },
    dealDetails: {
      offerAmount: '$3,450,000',
      cashPercentage: 70,
      earnoutPercentage: 30,
      employmentTerm: '2 years',
      cashAtClose: '$2,415,000',
      earnoutAmount: '$1,035,000',
      totalValue: '$3,450,000',
      earnoutStructure: 'Earnout tied to revenue growth targets: 100% payout if revenue grows 5% annually, prorated for 0-5% growth',
      competitionClause: '3-year non-compete within 15-mile radius, negotiable terms',
      transitionSupport: 'Gradual integration over 12 months with dedicated transition coordinator and regular check-ins'
    },
    highlights: [
      'Highest offer received',
      'Local group with similar practice philosophy',
      'Strong regional presence and reputation',
      'Investment in facility upgrades included'
    ],
    concerns: [
      '30% earnout tied to revenue targets',
      'Integration timeline may be aggressive'
    ],
    documents: [
      {
        id: '1',
        name: 'Letter of Intent - Lakeside Veterinary Group.pdf',
        type: 'PDF',
        size: '2.1 MB',
        uploadedDate: 'September 28, 2025'
      },
      {
        id: '2',
        name: 'About Lakeside Veterinary Group.pdf',
        type: 'PDF',
        size: '4.8 MB',
        uploadedDate: 'September 28, 2025'
      },
      {
        id: '3',
        name: 'Our Partnership Model.pptx',
        type: 'PowerPoint',
        size: '12.5 MB',
        uploadedDate: 'September 28, 2025'
      }
    ]
  },
  '3': {
    id: '3',
    buyerId: '3',
    buyerName: 'PetHealth Equity Partners',
    buyerType: 'Private Equity',
    offerAmount: '$2,950,000',
    submittedDate: 'September 25, 2025',
    expirationDate: 'October 9, 2025',
    status: 'pending',
    coverLetter: {
      opening: "Dear Dr. Chen,\n\nPetHealth Equity Partners is pleased to submit this offer to acquire Lakeside Animal Hospital. After conducting our due diligence and visiting your facility, we are confident that your practice would be an excellent addition to our growing platform of premier veterinary hospitals.",
      aboutPractice: "Lakeside Animal Hospital demonstrates the key characteristics we look for in acquisition targets: strong financials, excellent reputation, skilled team, and significant growth potential. Your practice's EBITDA margins, client retention rates, and revenue per transaction are all above industry benchmarks. We see tremendous opportunity to leverage our resources to accelerate growth while maintaining the quality of care that has made you successful.",
      aboutCompany: "PetHealth Equity Partners is a private equity firm focused exclusively on the veterinary industry. Since 2018, we have acquired and successfully integrated 52 veterinary practices across 15 states, creating one of the fastest-growing veterinary platforms in the country. Our team includes former practice owners, veterinary industry executives, and operational experts who understand the unique challenges and opportunities in veterinary medicine. We provide practices with access to institutional-grade resources, including centralized purchasing, advanced technology systems, marketing expertise, and professional development programs.",
      whyGoodFit: "We believe PetHealth Equity Partners offers unique advantages:\n\n• Proven Track Record: 52 successful acquisitions with an average practice revenue growth of 18% post-acquisition.\n\n• Operational Excellence: Best-in-class systems for scheduling, inventory management, client communication, and financial reporting.\n\n• Professional Development: Continuing education stipends, leadership training, and mentorship programs for all team members.\n\n• Marketing Support: Dedicated marketing team to enhance your online presence, client acquisition, and brand awareness.\n\n• Equity Rollover Option: Opportunity to retain equity stake and participate in future value creation.\n\n• Capital for Growth: Access to resources for facility expansion, equipment upgrades, and service line additions.",
      closing: "We are committed to being a value-added partner that helps take your practice to the next level. We believe our offer represents fair value today with significant upside potential through our equity rollover option.\n\nWe look forward to discussing how PetHealth Equity Partners can support your goals while honoring the legacy you've built.\n\nBest regards,\nRichard Thompson\nManaging Partner, PetHealth Equity Partners"
    },
    dealDetails: {
      offerAmount: '$2,950,000',
      cashPercentage: 75,
      earnoutPercentage: 25,
      employmentTerm: '4 years',
      cashAtClose: '$2,212,500',
      earnoutAmount: '$737,500',
      totalValue: '$2,950,000',
      earnoutStructure: 'Earnout based on EBITDA performance over 4 years, with annual true-up payments',
      competitionClause: '7-year non-compete within 30-mile radius',
      transitionSupport: 'Comprehensive 90-day integration program with dedicated integration manager and regional support team'
    },
    highlights: [
      'Proven track record with 50+ veterinary acquisitions',
      'Comprehensive support for operations and marketing',
      'Equity rollover opportunity for future upside'
    ],
    concerns: [
      'Lower initial valuation',
      '4-year employment term is longer than preferred',
      'Less flexibility in daily operations'
    ],
    documents: [
      {
        id: '1',
        name: 'Letter of Intent - PetHealth Equity Partners.pdf',
        type: 'PDF',
        size: '2.8 MB',
        uploadedDate: 'September 25, 2025'
      },
      {
        id: '2',
        name: 'About PetHealth Equity Partners.pdf',
        type: 'PDF',
        size: '6.2 MB',
        uploadedDate: 'September 25, 2025'
      },
      {
        id: '3',
        name: 'Platform Overview & Growth Strategy.pptx',
        type: 'PowerPoint',
        size: '15.7 MB',
        uploadedDate: 'September 25, 2025'
      }
    ]
  },
  '4': {
    id: '4',
    buyerId: '4',
    buyerName: 'Dr. Sarah Martinez',
    buyerType: 'Individual Buyer',
    offerAmount: '$2,750,000',
    submittedDate: 'September 22, 2025',
    expirationDate: 'October 5, 2025',
    status: 'declined',
    coverLetter: {
      opening: "Dear Dr. Chen,\n\nI am writing to formally express my interest in acquiring Lakeside Animal Hospital. As a practicing veterinarian with 12 years of experience in the local community, I have long admired your practice and the exceptional care you provide to your patients.",
      aboutPractice: "Lakeside Animal Hospital represents everything I value in veterinary medicine. Your commitment to gold-standard care, your investment in continuing education for your team, and your genuine relationships with clients have created a practice that truly makes a difference in animals' lives. I have referred several clients to your practice over the years and have consistently heard glowing reviews about the quality of care and the compassion of your team.",
      aboutCompany: "While I don't have a large corporate structure behind me, I offer something different: a personal commitment to preserving everything that makes your practice special. I currently practice at a local clinic and have been planning for practice ownership for the past three years. I have secured financing through a combination of personal savings, SBA loan approval, and support from my family. My vision is to continue operating Lakeside Animal Hospital exactly as you have built it—as a community-focused, relationship-driven practice that puts patient care first.",
      whyGoodFit: "I believe I can offer unique benefits as a buyer:\n\n• Continuity of Care: I will personally see patients and maintain the high standard of care your clients expect.\n\n• Culture Preservation: As a solo practitioner buyer, I'm committed to keeping your team intact and maintaining your practice culture.\n\n• Community Connection: I already live in the area and am invested in this community long-term.\n\n• Flexible Transition: I'm open to working with you on a transition timeline that meets your needs, whether that's 6 months or 2 years.\n\n• Genuine Passion: This isn't about building a portfolio—it's about owning a practice where I can practice medicine the way I believe it should be practiced.",
      closing: "I understand that my offer may not be the highest you receive, but I hope you'll consider the intangible value of selling to someone who will truly cherish and preserve what you've built. I would be honored to carry forward the legacy of Lakeside Animal Hospital.\n\nI'm happy to meet at your convenience to discuss this opportunity further.\n\nSincerely,\nDr. Sarah Martinez, DVM"
    },
    dealDetails: {
      offerAmount: '$2,750,000',
      cashPercentage: 60,
      earnoutPercentage: 40,
      employmentTerm: '1 year',
      cashAtClose: '$1,650,000',
      earnoutAmount: '$1,100,000',
      totalValue: '$2,750,000',
      earnoutStructure: 'Earnout paid over 3 years based on practice maintaining current client base (80% retention threshold)',
      competitionClause: '2-year non-compete within 10-mile radius',
      transitionSupport: 'Dr. Martinez will work alongside Dr. Chen during 1-year employment term for complete knowledge transfer'
    },
    highlights: [
      'Local veterinarian with excellent reputation',
      'Committed to preserving practice culture',
      'Minimal transition period required'
    ],
    concerns: [
      'Significantly lower valuation',
      'High earnout percentage (40%)',
      'Financing contingencies create uncertainty'
    ],
    documents: [
      {
        id: '1',
        name: 'Letter of Intent - Dr. Sarah Martinez.pdf',
        type: 'PDF',
        size: '1.2 MB',
        uploadedDate: 'September 22, 2025'
      },
      {
        id: '2',
        name: 'Professional Background & Philosophy.pdf',
        type: 'PDF',
        size: '2.8 MB',
        uploadedDate: 'September 22, 2025'
      },
      {
        id: '3',
        name: 'Vision for Lakeside Animal Hospital.pptx',
        type: 'PowerPoint',
        size: '4.5 MB',
        uploadedDate: 'September 22, 2025'
      }
    ]
  }
};
