import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MessageSquare, HelpCircle, Heart, Clock, User, Video } from 'lucide-react';
import { mockInterests } from '../data/mockInterests';

interface InterestProps {
  onViewBuyer: (buyerId: string) => void;
}

export function Interest({ onViewBuyer }: InterestProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600 text-white">Pending Review</Badge>;
      case 'responded':
        return <Badge className="bg-blue-600 text-white">Responded</Badge>;
      case 'scheduled-meeting':
        return <Badge className="bg-green-600 text-white">Meeting Scheduled</Badge>;
      case 'declined':
        return <Badge className="bg-gray-600 text-white">Declined</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
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

  const getUrgencyIndicator = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <span className="flex items-center gap-1 text-sm text-red-600">
          <Clock className="w-4 h-4" />
          High urgency
        </span>;
      case 'medium':
        return <span className="flex items-center gap-1 text-sm text-orange-600">
          <Clock className="w-4 h-4" />
          Medium urgency
        </span>;
      case 'low':
        return <span className="flex items-center gap-1 text-sm text-green-600">
          <Clock className="w-4 h-4" />
          Flexible timeline
        </span>;
      default:
        return null;
    }
  };

  const activeInterests = mockInterests.filter(i => i.status !== 'declined');
  const declinedInterests = mockInterests.filter(i => i.status === 'declined');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="mb-2 text-[20px] font-bold">Interest Requests</h1>
          <Badge className="bg-primary text-primary-foreground">
            {activeInterests.length} Active
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Review interest requests from potential buyers who want to learn more about your practice
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl">{mockInterests.filter(i => i.status === 'pending').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Responded</p>
              <p className="text-2xl">{mockInterests.filter(i => i.status === 'responded').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Meetings Scheduled</p>
              <p className="text-2xl">{mockInterests.filter(i => i.status === 'scheduled-meeting').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Requests</p>
              <p className="text-2xl">{mockInterests.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Interest Requests */}
      {activeInterests.length > 0 && (
        <div>
          <h2 className="mb-4">Active Requests ({activeInterests.length})</h2>
          <div className="space-y-4">
            {activeInterests.map((interest) => (
              <Card key={interest.id} className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h2
                          onClick={() => onViewBuyer(interest.buyerId)}
                          className="cursor-pointer hover:text-primary transition-colors font-bold text-[20px]"
                        >
                          {interest.buyerName}
                        </h2>
                        {getTypeBadge(interest.buyerType)}
                        {getStatusBadge(interest.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted {interest.submittedDate}</span>
                        </div>
                        {getUrgencyIndicator(interest.urgency)}
                      </div>
                    </div>
                  </div>

                  {/* Personal Message */}
                  <div className="border-l-4 border-primary pl-4 py-2 bg-muted/30">
                    <div className="flex items-start gap-2 mb-2">
                      <User className="w-5 h-5 text-primary mt-1" />
                      <h3 className="font-bold">Personal Message</h3>
                    </div>
                    <p className="text-muted-foreground italic">&ldquo;{interest.personalMessage}&rdquo;</p>
                  </div>

                  {/* What They Like */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-5 h-5 text-red-500" />
                      <h3 className="font-bold">What They Like About Your Practice</h3>
                    </div>
                    <ul className="space-y-2">
                      {interest.whatTheyLike.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Why They Want to Engage */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold">Why They Want to Engage</h3>
                    </div>
                    <p className="text-muted-foreground">{interest.whyEngage}</p>
                  </div>

                  {/* Questions */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold">Questions They Have</h3>
                    </div>
                    <ul className="space-y-2">
                      {interest.questions.map((question, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-purple-600 mt-1">?</span>
                          <span className="text-muted-foreground">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meeting Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Video className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-bold">Preferred Meeting Type</p>
                      </div>
                      <p className="text-muted-foreground">{interest.preferredMeetingType}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-bold">Timeline</p>
                      </div>
                      <p className="text-muted-foreground">{interest.timeline}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2 border-t">
                    {interest.status === 'pending' && (
                      <>
                        <Button>Respond to Request</Button>
                        <Button variant="outline">Schedule Meeting</Button>
                        <Button variant="outline" onClick={() => onViewBuyer(interest.buyerId)}>View Buyer Profile</Button>
                        <Button variant="outline" className="ml-auto text-destructive hover:text-destructive">Decline</Button>
                      </>
                    )}
                    {interest.status === 'responded' && (
                      <>
                        <Button>Send Follow-up</Button>
                        <Button variant="outline">Schedule Meeting</Button>
                        <Button variant="outline" onClick={() => onViewBuyer(interest.buyerId)}>View Buyer Profile</Button>
                      </>
                    )}
                    {interest.status === 'scheduled-meeting' && (
                      <>
                        <Button>View Meeting Details</Button>
                        <Button variant="outline">Send Message</Button>
                        <Button variant="outline" onClick={() => onViewBuyer(interest.buyerId)}>View Buyer Profile</Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Declined Requests */}
      {declinedInterests.length > 0 && (
        <div>
          <h2 className="mb-4">Declined Requests ({declinedInterests.length})</h2>
          <div className="space-y-4">
            {declinedInterests.map((interest) => (
              <Card key={interest.id} className="p-6 opacity-60">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h2
                          onClick={() => onViewBuyer(interest.buyerId)}
                          className="cursor-pointer hover:text-primary transition-colors font-bold text-[20px]"
                        >
                          {interest.buyerName}
                        </h2>
                        {getTypeBadge(interest.buyerType)}
                        {getStatusBadge(interest.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted {interest.submittedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2 border-t">
                    <Button variant="outline" onClick={() => onViewBuyer(interest.buyerId)}>View Buyer Profile</Button>
                    <Button variant="outline">Reconsider Request</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
