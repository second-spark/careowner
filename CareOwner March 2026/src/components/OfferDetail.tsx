import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { 
  ChevronDown, 
  FileText, 
  Download, 
  ExternalLink,
  MessageSquare,
  Edit,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Sparkles,
  Send
} from 'lucide-react';
import { mockOfferDetails } from '../data/mockOfferDetails';

interface OfferDetailProps {
  offerId: string;
  onViewBuyer: (buyerId: string) => void;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function OfferDetail({ offerId, onViewBuyer, onBack }: OfferDetailProps) {
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseType, setResponseType] = useState<'interested' | 'not-interested'>('interested');
  const [responseMessage, setResponseMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m here to help you understand this offer and answer any questions about the buyer. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const offer = mockOfferDetails[offerId];

  if (!offer) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Offers
        </Button>
        <div>
          <h1 className="mb-2">Offer Not Found</h1>
          <p className="text-muted-foreground">The requested offer could not be found.</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600 text-white">Pending Review</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-600 text-white">Under Review</Badge>;
      case 'accepted':
        return <Badge className="bg-green-600 text-white">Accepted</Badge>;
      case 'declined':
        return <Badge className="bg-gray-600 text-white">Declined</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getBuyerTypeBadge = (type: string) => {
    switch (type) {
      case 'Corporate Group':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Corporate Group</Badge>;
      case 'Private Equity':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Private Equity</Badge>;
      case 'Individual Buyer':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Individual Buyer</Badge>;
      case 'Strategic Partner':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Strategic Partner</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const handleWriteResponse = () => {
    setResponseModalOpen(true);
  };

  const handleSendResponse = () => {
    // Handle sending response
    console.log('Sending response:', { responseType, responseMessage });
    setResponseModalOpen(false);
    setResponseMessage('');
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5" />;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(chatInput);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Context-aware responses based on the offer data
    if (lowerQuestion.includes('buyer') || lowerQuestion.includes('who') || lowerQuestion.includes('company')) {
      return `${offer.buyerName} is a ${offer.buyerType} with a strong track record in veterinary practice acquisitions. Based on their profile, they focus on maintaining practice culture and team continuity while providing growth resources.`;
    }
    
    if (lowerQuestion.includes('amount') || lowerQuestion.includes('price') || lowerQuestion.includes('money')) {
      return `The total offer amount is ${offer.offerAmount}. The deal structure includes ${offer.dealDetails.cashPercentage}% cash at close (${offer.dealDetails.cashAtClose}) and ${offer.dealDetails.earnoutPercentage}% earnout (${offer.dealDetails.earnoutAmount}).`;
    }
    
    if (lowerQuestion.includes('earnout') || lowerQuestion.includes('earn out')) {
      return `The earnout structure is: ${offer.dealDetails.earnoutStructure}. This means a portion of the total offer amount will be paid based on future performance metrics.`;
    }
    
    if (lowerQuestion.includes('employment') || lowerQuestion.includes('work') || lowerQuestion.includes('stay')) {
      return `The employment term is ${offer.dealDetails.employmentTerm}. This is the period during which you would continue working at the practice post-acquisition.`;
    }
    
    if (lowerQuestion.includes('transition') || lowerQuestion.includes('support')) {
      return `Transition support details: ${offer.dealDetails.transitionSupport}. This outlines how the buyer will help ensure a smooth transition for you, your team, and your clients.`;
    }
    
    if (lowerQuestion.includes('compete') || lowerQuestion.includes('non-compete')) {
      return `The non-compete clause states: ${offer.dealDetails.competitionClause}. This restricts your ability to open or work at competing practices within a certain timeframe and geographic area.`;
    }
    
    if (lowerQuestion.includes('expire') || lowerQuestion.includes('deadline')) {
      return `This offer expires on ${offer.expirationDate}. You'll need to respond before this date to keep the offer active.`;
    }
    
    if (lowerQuestion.includes('document') || lowerQuestion.includes('paperwork')) {
      return `${offer.documents.length} documents have been attached to this offer, including the Letter of Intent, Purchase Agreement, and Financial Statements. You can view and download them in the Documents tab.`;
    }
    
    if (lowerQuestion.includes('recommend') || lowerQuestion.includes('should i') || lowerQuestion.includes('accept')) {
      return `I can't make this decision for you, but I can help you evaluate the offer. Consider factors like: the total compensation, cash vs. earnout structure, employment terms, cultural fit with the buyer, and how this compares to other offers. Would you like me to explain any specific aspect in more detail?`;
    }
    
    if (lowerQuestion.includes('next') || lowerQuestion.includes('respond') || lowerQuestion.includes('what do')) {
      return `You have several options: 1) Accept the offer as-is, 2) Submit a counter offer with different terms, 3) Request more time or information, or 4) Decline the offer. You can use the "Respond to Offer" button at the top of the page to take action.`;
    }
    
    // Default response
    return `I'd be happy to help you understand this offer better. You can ask me about:\n\n• The buyer and their background\n• Offer amount and deal structure\n• Earnout terms and conditions\n• Employment requirements\n• Non-compete clauses\n• Important dates and deadlines\n• Attached documents\n\nWhat would you like to know more about?`;
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Offers
      </Button>

      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="mb-0 text-[20px] font-bold">Offer Details</h1>
              {getStatusBadge(offer.status)}
            </div>
            <div className="flex items-center gap-3">
              <h2 
                onClick={() => onViewBuyer(offer.buyerId)}
                className="cursor-pointer hover:text-primary transition-colors font-bold text-[20px] m-0 font-normal"
              >
                {offer.buyerName}
              </h2>
              <ExternalLink 
                className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" 
                onClick={() => onViewBuyer(offer.buyerId)} 
              />
              {getBuyerTypeBadge(offer.buyerType)}
            </div>
          </div>

          {/* Respond to Offer Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Respond to Offer
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleWriteResponse}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Write Response
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Submit Counter Offer
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle className="w-4 h-4 mr-2" />
                Accept Offer
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <XCircle className="w-4 h-4 mr-2" />
                Reject Offer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="p-4 m-[0px]">
            <p className="text-sm text-muted-foreground font-bold mt-[0px] mr-[0px] mb-[-10px] ml-[0px]">Offer Amount</p>
            <p className="text-2xl text-green-700">{offer.offerAmount}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-[-10px] font-bold mt-[0px] mr-[0px] ml-[0px]">Submitted Date</p>
            <p className="text-xl">{offer.submittedDate}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-[-10px] font-bold mt-[0px] mr-[0px] ml-[0px]">Expiration Date</p>
            <p className="text-xl">{offer.expirationDate}</p>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="chat">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Chat
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab - Cover Letter */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="m-[0px] text-[20px]">Cover Letter</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="whitespace-pre-wrap">{offer.coverLetter.opening}</div>
              
              <div>
                <h4 className="text-foreground mt-[0px] mr-[0px] mb-[8px] ml-[0px]">What We Admire About Your Practice</h4>
                <div className="whitespace-pre-wrap">{offer.coverLetter.aboutPractice}</div>
              </div>
              
              <div>
                <h4 className="mb-2 text-foreground">About {offer.buyerName}</h4>
                <div className="whitespace-pre-wrap">{offer.coverLetter.aboutCompany}</div>
              </div>
              
              <div>
                <h4 className="mb-2 text-foreground">Why We're a Good Fit</h4>
                <div className="whitespace-pre-wrap">{offer.coverLetter.whyGoodFit}</div>
              </div>
              
              <div className="whitespace-pre-wrap">{offer.coverLetter.closing}</div>
            </div>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="m-[0px] text-[18px] font-[Inter]">Offer Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Total Offer Amount</p>
                <p className="text-3xl text-green-700">{offer.dealDetails.offerAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Employment Term</p>
                <p className="text-2xl">{offer.dealDetails.employmentTerm}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="m-[0px] font-[Inter] text-[18px]">Deal Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Cash at Close</p>
                <p className="text-2xl mb-1">{offer.dealDetails.cashPercentage}%</p>
                <p className="text-green-700">{offer.dealDetails.cashAtClose}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Earnout</p>
                <p className="text-2xl mb-1">{offer.dealDetails.earnoutPercentage}%</p>
                <p className="text-orange-700">{offer.dealDetails.earnoutAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Total Value</p>
                <p className="text-2xl mb-1">100%</p>
                <p className="text-green-700">{offer.dealDetails.totalValue}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="m-0 mb-4">Additional Terms</h3>
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-bold">Earnout Structure</p>
                <p className="text-muted-foreground">{offer.dealDetails.earnoutStructure}</p>
              </div>
              <div>
                <p className="mb-2 font-bold">Non-Compete Clause</p>
                <p className="text-muted-foreground">{offer.dealDetails.competitionClause}</p>
              </div>
              <div>
                <p className="mb-2 font-bold">Transition Support</p>
                <p className="text-muted-foreground">{offer.dealDetails.transitionSupport}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="m-0 mb-4">Important Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Offer Submitted</p>
                <p>{offer.submittedDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Offer Expiration</p>
                <p>{offer.expirationDate}</p>
              </div>
            </div>
          </Card>

          {/* Highlights & Considerations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <p className="mb-3 font-bold">Highlights</p>
              <div className="space-y-2">
                {offer.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{highlight}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <p className="mb-3 font-bold">Considerations</p>
              <div className="space-y-2">
                {offer.concerns.map((concern, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{concern}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="m-0">Offer Documents</h3>
            <p className="text-sm text-muted-foreground">{offer.documents.length} files</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {offer.documents.map((doc) => (
              <Card key={doc.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-3 rounded-lg bg-blue-100">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="mb-1">{doc.name}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {doc.type}
                        </Badge>
                        <span>{doc.uploadedDate}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent value="chat" className="mt-6">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="m-0 text-[16px]">AI Assistant</h3>
                <p className="text-xs text-muted-foreground m-0">Ask me anything about this offer</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="m-0 whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask a question about this offer..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={2}
                  className="resize-none"
                />
                <Button onClick={handleSendMessage} size="icon" className="h-auto">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Write Response Modal */}
      <Dialog open={responseModalOpen} onOpenChange={setResponseModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Write Response</DialogTitle>
            <DialogDescription>
              Send a message to {offer.buyerName} regarding their offer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <Label>Response Type</Label>
              <div className="flex gap-3">
                <Button
                  variant={responseType === 'interested' ? 'default' : 'outline'}
                  onClick={() => setResponseType('interested')}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  I'm Interested
                </Button>
                <Button
                  variant={responseType === 'not-interested' ? 'default' : 'outline'}
                  onClick={() => setResponseType('not-interested')}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Not Interested
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your response here..."
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <p className="text-sm text-muted-foreground">
                {responseType === 'interested' 
                  ? 'Let the buyer know you\'re interested in their offer and what next steps you\'d like to take.'
                  : 'Politely decline the offer and provide any feedback that might be helpful.'}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setResponseModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendResponse}>
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
