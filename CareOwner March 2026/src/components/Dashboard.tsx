import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FileText, Users, Lightbulb, MessageSquare, DollarSign, HelpCircle, Calendar, Video, Phone, MapPin, Clock, AlertCircle } from 'lucide-react';
import { mockActivities } from '../data/mockActivities';
import { mockMeetings } from '../data/mockMeetings';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onViewBuyer?: (buyerId: string) => void;
}

export function Dashboard({ onNavigate, onViewBuyer }: DashboardProps) {
  const upcomingMeetings = mockMeetings.filter(m => m.status !== 'completed' && m.status !== 'cancelled').slice(0, 4);
  const recentActivities = mockActivities.slice(0, 8);
  
  // Count stats
  const activeOffers = 4; // From mockOffers
  const interestedBuyers = 5; // From mockInterests (active)
  const recommendations = 4; // From recommendations page

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'offer':
      case 'offer-updated':
        return <DollarSign className="w-5 h-5" />;
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      case 'interest':
        return <Users className="w-5 h-5" />;
      case 'document-request':
        return <FileText className="w-5 h-5" />;
      case 'question':
        return <HelpCircle className="w-5 h-5" />;
      case 'meeting-scheduled':
      case 'site-visit-request':
        return <Calendar className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'offer':
      case 'offer-updated':
        return 'bg-green-100 text-green-600';
      case 'message':
        return 'bg-blue-100 text-blue-600';
      case 'interest':
        return 'bg-purple-100 text-purple-600';
      case 'document-request':
        return 'bg-orange-100 text-orange-600';
      case 'question':
        return 'bg-yellow-100 text-yellow-600';
      case 'meeting-scheduled':
      case 'site-visit-request':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case 'Video Call':
        return <Video className="w-4 h-4" />;
      case 'Phone Call':
        return <Phone className="w-4 h-4" />;
      case 'Site Visit':
      case 'In-Person Meeting':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-600 text-white">Confirmed</Badge>;
      case 'pending-confirmation':
        return <Badge className="bg-yellow-600 text-white">Pending</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-600 text-white">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-[20px] font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your practice sale activity and upcoming meetings
        </p>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="m-[0px]">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-[-10px] mr-[0px] mb-[0px] ml-[0px]">
          <Button variant="outline" className="justify-start" onClick={() => onNavigate('offers')}>
            <FileText className="w-4 h-4 mr-2" />
            Review Offers
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate('messages')}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate('documents')}>
            <FileText className="w-4 h-4 mr-2" />
            Upload Documents
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate('meetings')}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </Card>

      {/* Top 3 Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('offers')}>
          <div className="flex items-center justify-between m-[0px]">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <Badge className="bg-green-600 text-white">{activeOffers} new</Badge>
          </div>
          <h3 className="m-[0px]">Current Offers</h3>
          <div className="text-5xl text-[40px]">{activeOffers}</div>
        </Card>

        <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('interest')}>
          <div className="flex items-center justify-between m-[0px]">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <Badge className="bg-purple-600 text-white">{interestedBuyers} new</Badge>
          </div>
          <h3 className="m-[0px]">Interested Buyers</h3>
          <div className="text-5xl text-[40px]">{interestedBuyers}</div>
        </Card>

        <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('recommendations')}>
          <div className="flex items-center justify-between m-[0px]">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Lightbulb className="w-6 h-6 text-blue-600" />
            </div>
            <Badge className="bg-blue-600 text-white">{recommendations} new</Badge>
          </div>
          <h3 className="m-[0px]">Recommendations</h3>
          <div className="text-5xl text-[40px]">{recommendations}</div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between m-[0px]">
            <h2>Recent Activity</h2>
            <Badge variant="outline">{recentActivities.filter(a => a.isUnread).length} New</Badge>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const handleActivityClick = () => {
                switch (activity.type) {
                  case 'offer':
                  case 'offer-updated':
                    onNavigate('offers');
                    break;
                  case 'message':
                  case 'question':
                    onNavigate('messages');
                    break;
                  case 'interest':
                    onNavigate('interest');
                    break;
                  case 'document-request':
                    onNavigate('documents');
                    break;
                  case 'meeting-scheduled':
                  case 'site-visit-request':
                    onNavigate('meetings');
                    break;
                  default:
                    break;
                }
              };

              return (
                <div
                  key={activity.id}
                  onClick={handleActivityClick}
                  className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                    activity.isUnread ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' : 'hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="truncate">{activity.title}</h4>
                        {activity.isUnread && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{activity.timestamp}</span>
                        </div>
                        {activity.priority === 'high' && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Priority</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Activity
          </Button>
        </Card>

        {/* Upcoming Meetings */}
        <Card className="p-6">
          <div className="flex items-center justify-between m-[0px]">
            <h2>Upcoming Meetings</h2>
            <Badge variant="outline">{upcomingMeetings.length} Scheduled</Badge>
          </div>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => onViewBuyer && onViewBuyer(meeting.buyerId)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {getMeetingIcon(meeting.meetingType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="truncate">{meeting.buyerName}</h4>
                      {getStatusBadge(meeting.status)}
                    </div>
                    <div className="space-y-1 mb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{meeting.date} at {meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getMeetingIcon(meeting.meetingType)}
                        <span>{meeting.meetingType}</span>
                        <span>•</span>
                        <span>{meeting.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{meeting.agenda}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={() => onNavigate('meetings')}>
            View All Meetings
          </Button>
        </Card>
      </div>
    </div>
  );
}
