import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageSquare, 
  HelpCircle, 
  Users, 
  Briefcase, 
  UserCircle, 
  Search,
  Send,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { mockMessageThreads, MessageThread } from '../data/mockMessages';

interface MessagesProps {
  onViewBuyer?: (buyerId: string) => void;
}

export function Messages({ onViewBuyer }: MessagesProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [publishAnswer, setPublishAnswer] = useState(false);

  // Filter threads based on active tab
  const getFilteredThreads = () => {
    let filtered = mockMessageThreads;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(thread => {
        if (activeTab === 'questions') return thread.type === 'question';
        if (activeTab === 'potential-buyers') return thread.type === 'potential-buyer';
        if (activeTab === 'current-deal') return thread.type === 'current-deal';
        if (activeTab === 'practice-staff') return thread.type === 'practice-staff';
        return true;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(thread =>
        thread.participantName.toLowerCase().includes(query) ||
        thread.subject.toLowerCase().includes(query) ||
        thread.lastMessage.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => 
      new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );
  };

  const filteredThreads = getFilteredThreads();

  // Count by type
  const counts = {
    all: mockMessageThreads.length,
    questions: mockMessageThreads.filter(t => t.type === 'question').length,
    potentialBuyers: mockMessageThreads.filter(t => t.type === 'potential-buyer').length,
    currentDeal: mockMessageThreads.filter(t => t.type === 'current-deal').length,
    practiceStaff: mockMessageThreads.filter(t => t.type === 'practice-staff').length
  };

  const totalUnread = mockMessageThreads.reduce((sum, thread) => sum + thread.unreadCount, 0);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getThreadIcon = (type: string) => {
    switch (type) {
      case 'question':
        return <HelpCircle className="w-4 h-4" />;
      case 'potential-buyer':
        return <Users className="w-4 h-4" />;
      case 'current-deal':
        return <Briefcase className="w-4 h-4" />;
      case 'practice-staff':
        return <UserCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getThreadTypeBadge = (thread: MessageThread) => {
    if (thread.isQuestion) {
      return (
        <Badge variant={thread.isAnswered ? "secondary" : "outline"} className="gap-1">
          {thread.isAnswered ? (
            <>
              <CheckCircle2 className="w-3 h-3" />
              Answered
            </>
          ) : (
            <>
              <Clock className="w-3 h-3" />
              Pending
            </>
          )}
        </Badge>
      );
    }

    const labels = {
      'potential-buyer': 'Potential Buyer',
      'current-deal': 'Current Deal',
      'practice-staff': 'Practice Staff'
    };

    return <Badge variant="secondary">{labels[thread.type] || thread.type}</Badge>;
  };

  const handleSendReply = () => {
    if (replyText.trim() && selectedThread) {
      // In a real app, this would send the message
      console.log('Sending reply:', replyText);
      setReplyText('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with buyers, answer questions, and stay connected with your team
          </p>
        </div>
        {totalUnread > 0 && (
          <Badge variant="destructive" className="h-6">
            {totalUnread} unread
          </Badge>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            All
            <span className="ml-1 text-xs text-muted-foreground">({counts.all})</span>
          </TabsTrigger>
          <TabsTrigger value="questions" className="gap-2">
            <HelpCircle className="w-4 h-4" />
            Questions
            <span className="ml-1 text-xs text-muted-foreground">({counts.questions})</span>
          </TabsTrigger>
          <TabsTrigger value="potential-buyers" className="gap-2">
            <Users className="w-4 h-4" />
            Potential Buyers
            <span className="ml-1 text-xs text-muted-foreground">({counts.potentialBuyers})</span>
          </TabsTrigger>
          <TabsTrigger value="current-deal" className="gap-2">
            <Briefcase className="w-4 h-4" />
            Current Deal
            <span className="ml-1 text-xs text-muted-foreground">({counts.currentDeal})</span>
          </TabsTrigger>
          <TabsTrigger value="practice-staff" className="gap-2">
            <UserCircle className="w-4 h-4" />
            Practice Staff
            <span className="ml-1 text-xs text-muted-foreground">({counts.practiceStaff})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-5 gap-6 h-[calc(100vh-340px)]">
            {/* Thread List */}
            <div className="col-span-2 flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <ScrollArea className="flex-1 border rounded-lg">
                <div className="p-2">
                  {filteredThreads.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No messages found</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {filteredThreads.map((thread) => (
                        <button
                          key={thread.id}
                          onClick={() => setSelectedThread(thread)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedThread?.id === thread.id
                              ? 'bg-accent'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 flex-shrink-0">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {getInitials(thread.participantName)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className={thread.unreadCount > 0 ? 'font-semibold' : ''}>
                                    {thread.participantName}
                                  </span>
                                  {thread.unreadCount > 0 && (
                                    <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                                      {thread.unreadCount}
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {formatTime(thread.lastMessageTime)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 truncate">
                                {thread.subject}
                              </p>
                              <p className="text-sm text-muted-foreground truncate">
                                {thread.lastMessage}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Message Detail */}
            <div className="col-span-3">
              {selectedThread ? (
                <Card className="h-full flex flex-col">
                  {/* Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(selectedThread.participantName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1">{selectedThread.participantName}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {selectedThread.participantRole}
                          </p>
                          <div className="flex items-center gap-2">
                            {getThreadTypeBadge(selectedThread)}
                            {selectedThread.buyerId && onViewBuyer && (
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => onViewBuyer(selectedThread.buyerId!)}
                                className="h-auto p-0"
                              >
                                View Buyer Profile
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {selectedThread.messages.map((message, index) => {
                        const isOwner = message.senderId === 'practice-owner';
                        return (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${isOwner ? 'flex-row-reverse' : ''}`}
                          >
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback className={isOwner ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
                                {getInitials(message.senderName)}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`flex-1 ${isOwner ? 'flex flex-col items-end' : ''}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">{message.senderName}</span>
                                <span className="text-xs text-muted-foreground">
                                  {formatMessageTime(message.timestamp)}
                                </span>
                              </div>
                              {message.subject && index === 0 && (
                                <p className="text-sm font-medium mb-2">Re: {message.subject}</p>
                              )}
                              <div
                                className={`rounded-lg p-3 ${
                                  isOwner
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                }`}
                              >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>

                  {/* Reply Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-3">
                      <Textarea
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 min-h-[80px] resize-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            handleSendReply();
                          }
                        }}
                      />
                      <Button
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="gap-2 self-end"
                      >
                        <Send className="w-4 h-4" />
                        Send
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">
                        Press Cmd/Ctrl + Enter to send
                      </p>
                      {selectedThread?.type === 'question' && (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="publish-answer"
                            checked={publishAnswer}
                            onCheckedChange={(checked) => setPublishAnswer(checked as boolean)}
                          />
                          <Label
                            htmlFor="publish-answer"
                            className="text-xs cursor-pointer"
                          >
                            Publish answer on public practice profile
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="mb-1">Select a conversation</p>
                    <p className="text-sm">Choose a message from the list to view the conversation</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
