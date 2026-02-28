export interface InterestRequest {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: 'Corporate Group' | 'Private Equity' | 'Individual Buyer' | 'Strategic Partner';
  submittedDate: string;
  status: 'pending' | 'responded' | 'scheduled-meeting' | 'declined';
  personalMessage: string;
  whatTheyLike: string[];
  whyEngage: string;
  questions: string[];
  urgency: 'high' | 'medium' | 'low';
  preferredMeetingType: string;
  timeline: string;
}

export const mockInterests: InterestRequest[] = [
  {
    id: '1',
    buyerId: '5',
    buyerName: 'American Animal Hospital Group',
    buyerType: 'Corporate Group',
    submittedDate: 'September 30, 2025',
    status: 'pending',
    personalMessage: "Hi Dr. Williams, I'm Mark Stevens, Regional Director for American Animal Hospital Group. I've been following the growth of Lakeside Animal Hospital for some time, and I'm really impressed with what you've built. Your practice's reputation in the community and the quality of care you provide aligns perfectly with our organization's values. I'd love to schedule a casual conversation to learn more about your practice and share how we might be able to support your vision for the future.",
    whatTheyLike: [
      'Strong community reputation and 4.8-star reviews',
      'Excellent client retention and growth trajectory',
      'Modern facility with recent renovations',
      'Experienced and stable team of 3 doctors',
      'Strategic location in growing Chicago suburb'
    ],
    whyEngage: 'We\'re actively expanding our Midwest presence and Lakeside Animal Hospital represents exactly the kind of high-quality, community-focused practice we want to partner with. Your practice would be a cornerstone acquisition for our Chicago market expansion.',
    questions: [
      'What are your long-term goals for the practice?',
      'How do you envision your role post-acquisition, if any?',
      'Are there any specific concerns or priorities you have when considering potential buyers?',
      'What timeline are you considering for a potential transaction?',
      'Would you be open to discussing your current financial performance metrics?'
    ],
    urgency: 'medium',
    preferredMeetingType: 'In-person visit or video call',
    timeline: 'Flexible - would like to start conversations in next 2-4 weeks'
  },
  {
    id: '2',
    buyerId: '6',
    buyerName: 'Companion Care Partners',
    buyerType: 'Strategic Partner',
    submittedDate: 'October 1, 2025',
    status: 'scheduled-meeting',
    personalMessage: "Dr. Williams, I'm Dr. Rachel Thompson, CMO at Companion Care Partners. As a fellow veterinarian who made the transition from practice owner to leading a network of practices, I understand both the challenges and opportunities you're facing. I was particularly impressed by your team's focus on clinical excellence and continuing education - it mirrors our own philosophy. I believe we could offer you a partnership that maintains your practice's identity while providing resources for growth and work-life balance. Would you be open to a conversation?",
    whatTheyLike: [
      'Clinical excellence and quality of care focus',
      'Investment in team development and continuing education',
      'Strong doctor leadership with engaged ownership',
      'Proximity to our Indianapolis headquarters (easy collaboration)',
      'Alignment with our mission-driven culture'
    ],
    whyEngage: 'We believe in building a network of like-minded veterinarians who share our commitment to quality care over pure profit metrics. Your practice philosophy and our partnership model seem like a natural fit. We\'re looking to add 2-3 practices to our network this year.',
    questions: [
      'What aspects of practice ownership do you find most rewarding vs. most challenging?',
      'How important is maintaining clinical autonomy in any partnership scenario?',
      'What are your thoughts on equity participation vs. full sale?',
      'Are there specific growth initiatives you\'d like to pursue with additional resources?',
      'What role, if any, would you envision for yourself in a larger veterinary network?'
    ],
    urgency: 'medium',
    preferredMeetingType: 'In-person visit to your practice',
    timeline: 'Next 3-4 weeks, with follow-up visits as needed'
  },
  {
    id: '3',
    buyerId: '7',
    buyerName: 'Summit Veterinary Partners',
    buyerType: 'Private Equity',
    submittedDate: 'September 18, 2025',
    status: 'responded',
    personalMessage: "Dr. Williams, my name is Patricia Reynolds, VP of Corporate Development at Summit Veterinary Partners. I came across Lakeside Animal Hospital through our market analysis and was impressed by your practice's strong financial performance and growth metrics. We work with over 200 veterinary practices nationwide and have developed sophisticated systems to help practice owners like yourself maximize value while maintaining quality of care. I'd welcome the opportunity to share our approach and learn more about your goals.",
    whatTheyLike: [
      'Strong financial performance and EBITDA margins',
      'Consistent year-over-year revenue growth',
      'Well-managed operations with good systems in place',
      'Prime Chicago suburban location with growth potential',
      'Opportunity to serve as platform for regional expansion'
    ],
    whyEngage: 'Your practice demonstrates the operational excellence and market position that makes an ideal platform for our Chicago market entry. We can provide significant capital for expansion, technology upgrades, and potentially add specialty services. We\'re looking to build a 15-20 practice network in the Chicagoland area.',
    questions: [
      'What are your current revenue and EBITDA metrics?',
      'Are you open to discussing a partial sale with equity rollover?',
      'What would make you feel confident in a private equity partnership?',
      'Have you considered adding specialty services or additional locations?',
      'What are your expectations around post-sale employment terms and compensation?',
      'Can you share your current P&L, balance sheet, and tax returns?'
    ],
    urgency: 'high',
    preferredMeetingType: 'Initial video call, followed by in-person meetings',
    timeline: 'Looking to move quickly - initial meeting within 1-2 weeks preferred'
  },
  {
    id: '4',
    buyerId: '8',
    buyerName: 'Dr. Michael Chang',
    buyerType: 'Individual Buyer',
    submittedDate: 'September 27, 2025',
    status: 'pending',
    personalMessage: "Dear Dr. Williams, I'm Dr. Michael Chang, a board-certified veterinary surgeon currently practicing at a specialty hospital here in Chicago. After 20 years in specialty practice, I'm looking to transition into general practice ownership where I can build deeper relationships with clients and their pets over time. Lakeside Animal Hospital caught my attention because of its excellent reputation, strong team, and the obvious care you've put into building the practice. I would love the opportunity to meet you and learn about your vision for the practice's future. I'm not a corporate buyer - I'm a veterinarian who wants to continue your legacy while bringing my surgical expertise to benefit your clients.",
    whatTheyLike: [
      'Well-established client base with strong loyalty',
      'Experienced team that could mentor the transition',
      'Modern facility that\'s well-maintained',
      'Opportunity to add specialty surgical services',
      'Community-focused practice philosophy',
      'Located in area where I already live and practice'
    ],
    whyEngage: 'I\'m at a point in my career where I want to own and lead a practice, not just be an employee. I have the financial backing and business acumen to make this work, but I want to ensure I\'m the right fit for you and your team. This would be my first practice ownership, so finding the right cultural fit is crucial.',
    questions: [
      'What is your ideal timeline for transition/exit?',
      'Would you be open to staying on for a transition period to help ensure continuity?',
      'How would your team feel about new ownership?',
      'Are there any immediate facility or equipment needs I should be aware of?',
      'What made you decide to consider selling at this time?',
      'Would you be open to seller financing as part of the deal structure?'
    ],
    urgency: 'low',
    preferredMeetingType: 'Informal coffee or lunch meeting',
    timeline: 'No rush - want to take time to build relationship and ensure good fit'
  },
  {
    id: '5',
    buyerId: '9',
    buyerName: 'Midwest Veterinary Associates',
    buyerType: 'Strategic Partner',
    submittedDate: 'September 15, 2025',
    status: 'responded',
    personalMessage: "Hello Dr. Williams, I'm Dr. Jennifer Moore, Network Director at Midwest Veterinary Associates. As a Chicago-based network of independent practices, we've been following Lakeside Animal Hospital's success for some time. What really stands out to us is your commitment to quality care and your team's satisfaction - metrics that matter more to us than just the numbers. We've built our network on the principle that great practices deserve to maintain their independence while gaining the benefits of collaboration. I'd love to explore whether our model might be interesting to you.",
    whatTheyLike: [
      'Strong practice culture and team satisfaction',
      'Commitment to quality over volume',
      'Local Chicago presence and market knowledge',
      'Independent practice feel and autonomy',
      'Potential for collaboration with our other 6 locations',
      'Shared values around work-life balance'
    ],
    whyEngage: 'We believe the best veterinary care comes from practices that maintain their local identity and culture. We\'re not looking to acquire and transform - we want to partner with great practices like yours and provide support that makes your life easier while keeping what makes you special.',
    questions: [
      'What support services would be most valuable to you (HR, accounting, marketing)?',
      'How important is maintaining your practice name and brand?',
      'Would you be interested in opportunities to collaborate with our other practices?',
      'What are the biggest administrative burdens you\'d like to offload?',
      'How do you think your team would respond to being part of a small network?'
    ],
    urgency: 'low',
    preferredMeetingType: 'Visit to one of our existing practices + lunch',
    timeline: 'Exploratory - no pressure, just want to build relationship'
  },
  {
    id: '6',
    buyerId: '1',
    buyerName: 'VetCorp Partners',
    buyerType: 'Corporate Group',
    submittedDate: 'September 10, 2025',
    status: 'declined',
    personalMessage: "Dr. Williams, Jennifer Walsh here from VetCorp Partners. We operate over 120 veterinary practices across 25 states and have been actively expanding our presence in the Midwest. Lakeside Animal Hospital fits our acquisition criteria perfectly, and we believe we could provide you with a strong offer along with ongoing support for your practice. We've successfully completed numerous acquisitions in similar markets and have a proven track record of maintaining quality of care while providing doctors with excellent compensation and benefits. I'd appreciate the opportunity to discuss how VetCorp Partners might be the right buyer for your practice.",
    whatTheyLike: [
      'Strong financial performance and metrics',
      'Well-established market presence',
      'Modern facility and equipment',
      'Experienced doctor team',
      'Growth potential in the market'
    ],
    whyEngage: 'We\'re expanding our Chicago footprint and Lakeside would be an excellent addition to our portfolio. We can move quickly, provide strong valuation, and have the resources to support continued growth.',
    questions: [
      'What is your expected valuation range?',
      'Are you open to a 3-year employment commitment post-close?',
      'Can you provide recent financial statements?',
      'What are your growth plans for the next 2-3 years?',
      'Do you have any existing partnerships or affiliations we should know about?'
    ],
    urgency: 'high',
    preferredMeetingType: 'Video conference',
    timeline: 'Looking to close deals this quarter'
  }
];
