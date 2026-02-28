import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Video, Phone, MapPin, Clock, Users, FileText, ExternalLink } from 'lucide-react';
import { mockMeetings } from '../data/mockMeetings';

interface MeetingsProps {
  onViewBuyer: (buyerId: string) => void;
}

export function Meetings({ onViewBuyer }: MeetingsProps) {
  const upcomingMeetings = mockMeetings.filter(m => m.status !== 'completed' && m.status !== 'cancelled');
  const pastMeetings = mockMeetings.filter(m => m.status === 'completed');

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case 'Video Call':
        return <Video className="w-5 h-5" />;
      case 'Phone Call':
        return <Phone className="w-5 h-5" />;
      case 'Site Visit':
      case 'In-Person Meeting':
        return <MapPin className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-600 text-white">Confirmed</Badge>;
      case 'pending-confirmation':
        return <Badge className="bg-yellow-600 text-white">Pending Confirmation</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-600 text-white">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-gray-600 text-white">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-600 text-white">Cancelled</Badge>;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="mb-2 text-[20px] font-semibold">Meetings</h1>
          <Badge className="bg-primary text-primary-foreground">
            {upcomingMeetings.length} Upcoming
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Manage your scheduled meetings and site visits with potential buyers
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-2xl">{mockMeetings.filter(m => m.status === 'confirmed').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-2xl">{mockMeetings.filter(m => m.status === 'scheduled').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl">{mockMeetings.filter(m => m.status === 'pending-confirmation').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Site Visits</p>
              <p className="text-2xl">{mockMeetings.filter(m => m.meetingType === 'Site Visit').length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2>Upcoming Meetings ({upcomingMeetings.length})</h2>
          <Button>Schedule New Meeting</Button>
        </div>
        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <Card key={meeting.id} className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h2
                        onClick={() => onViewBuyer(meeting.buyerId)}
                        className="cursor-pointer hover:text-primary transition-colors font-bold text-[20px]"
                      >
                        {meeting.buyerName}
                      </h2>
                      {getTypeBadge(meeting.buyerType)}
                      {getStatusBadge(meeting.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{meeting.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{meeting.time} ({meeting.duration})</span>
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    meeting.meetingType === 'Video Call' ? 'bg-blue-100 text-blue-600' :
                    meeting.meetingType === 'Phone Call' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {getMeetingIcon(meeting.meetingType)}
                  </div>
                </div>

                {/* Meeting Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-bold">Meeting Type</h3>
                    </div>
                    <p className="text-muted-foreground">{meeting.meetingType}</p>
                  </div>
                  {meeting.location && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-bold">Location</h3>
                      </div>
                      <p className="text-muted-foreground">{meeting.location}</p>
                    </div>
                  )}
                  {meeting.meetingLink && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-bold">Meeting Link</h3>
                      </div>
                      <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        Join meeting
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Agenda */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-bold">Agenda</h3>
                  </div>
                  <p className="text-muted-foreground">{meeting.agenda}</p>
                </div>

                {/* Attendees */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-bold">Attendees ({meeting.attendees.length})</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meeting.attendees.map((attendee, index) => (
                      <Badge key={index} variant="outline">{attendee}</Badge>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {meeting.notes && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-blue-900 mb-1">Notes</h4>
                    <p className="text-sm text-blue-700">{meeting.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t">
                  {meeting.status === 'pending-confirmation' && (
                    <>
                      <Button>Confirm Meeting</Button>
                      <Button variant="outline">Propose New Time</Button>
                    </>
                  )}
                  {meeting.status === 'confirmed' && (
                    <>
                      <Button variant="outline">Add to Calendar</Button>
                      <Button variant="outline">Send Reminder</Button>
                    </>
                  )}
                  {meeting.status === 'scheduled' && (
                    <>
                      <Button variant="outline">Add to Calendar</Button>
                      <Button variant="outline">Request Confirmation</Button>
                    </>
                  )}
                  <Button variant="outline" onClick={() => onViewBuyer(meeting.buyerId)}>View Buyer Profile</Button>
                  <Button variant="outline" className="ml-auto text-destructive hover:text-destructive">Cancel Meeting</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Meetings */}
      {pastMeetings.length > 0 && (
        <div>
          <h2 className="mb-4">Past Meetings ({pastMeetings.length})</h2>
          <div className="space-y-4">
            {pastMeetings.map((meeting) => (
              <Card key={meeting.id} className="p-6 opacity-60">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h2
                        onClick={() => onViewBuyer(meeting.buyerId)}
                        className="cursor-pointer hover:text-primary transition-colors font-bold text-[20px]"
                      >
                        {meeting.buyerName}
                      </h2>
                      {getTypeBadge(meeting.buyerType)}
                      {getStatusBadge(meeting.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{meeting.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getMeetingIcon(meeting.meetingType)}
                        <span>{meeting.meetingType}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t mt-4">
                  <Button variant="outline">Add Meeting Notes</Button>
                  <Button variant="outline" onClick={() => onViewBuyer(meeting.buyerId)}>View Buyer Profile</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
