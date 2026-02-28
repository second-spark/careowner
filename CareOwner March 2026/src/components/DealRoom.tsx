import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Progress } from './ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileText, 
  Download, 
  Upload, 
  Calendar, 
  AlertCircle,
  MessageSquare,
  DollarSign,
  User,
  ExternalLink,
  ChevronDown,
  Edit,
  UserPlus,
  XCircle
} from 'lucide-react';
import { mockDealRoom, DealRoomTask } from '../data/mockDealRoom';

interface DealRoomProps {
  onViewBuyer: (buyerId: string) => void;
}

export function DealRoom({ onViewBuyer }: DealRoomProps) {
  const dealRoom = mockDealRoom;

  const getTimelineProgress = () => {
    const completed = dealRoom.timeline.filter(step => step.status === 'complete').length;
    return (completed / dealRoom.timeline.length) * 100;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTasksByStatus = (status: 'todo' | 'in-progress' | 'complete') => {
    return dealRoom.tasks.filter(task => task.status === status);
  };

  const renderTaskCard = (task: DealRoomTask) => (
    <Card key={task.id} className="p-4 mb-3">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="flex-1">{task.title}</h4>
          <Badge variant="outline" className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{task.assignedTo}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{task.dueDate}</span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h1 className="mb-2 text-[20px] font-semibold">Deal Room</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit Deal
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite User
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Deal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <h2 
            onClick={() => onViewBuyer(dealRoom.buyerId)}
            className="cursor-pointer hover:text-primary transition-colors font-bold text-[20px] m-0"
          >
            {dealRoom.buyerName}
          </h2>
          <ExternalLink className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" onClick={() => onViewBuyer(dealRoom.buyerId)} />
        </div>
        
        {/* Access List */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-bold">Team Members:</span>
          <TooltipProvider>
            <div className="flex -space-x-2">
              {dealRoom.accessList.map((person) => (
                <Tooltip key={person.id}>
                  <TooltipTrigger>
                    <Avatar className="border-2 border-background w-8 h-8">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      <p className="font-bold">{person.name}</p>
                      <p className="text-muted-foreground">{person.role}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
          <TabsTrigger value="deal-details">Deal Details</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Estimated Closing Date and Offer Amount Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Estimated Closing Date */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1 font-bold">Estimated Closing Date</p>
                  <p className="text-2xl">{dealRoom.estimatedClosingDate}</p>
                  <p className="text-sm text-muted-foreground mt-1">41 days remaining</p>
                </div>
              </div>
            </Card>

            {/* Offer Amount */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1 font-bold">Offer Amount</p>
                  <p className="text-2xl text-green-700">{dealRoom.offerAmount}</p>
                  <p className="text-sm text-muted-foreground mt-1">70% cash, 30% earnout</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Horizontal Timeline */}
          <Card className="p-6">
            <h3 className="m-0 mb-4">Deal Timeline</h3>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground font-bold">Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(getTimelineProgress())}% Complete</span>
              </div>
              <Progress value={getTimelineProgress()} className="h-2" />
            </div>
            
            {/* Horizontal Timeline Steps */}
            <TooltipProvider>
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" style={{ width: 'calc(100% - 32px)', left: '16px' }} />
                
                <div className="flex justify-between relative">
                  {dealRoom.timeline.map((step, index) => (
                    <Tooltip key={step.id}>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center" style={{ flex: 1 }}>
                          {step.status === 'complete' ? (
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center relative z-10 border-2 border-background">
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            </div>
                          ) : step.status === 'in-progress' ? (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center relative z-10 border-2 border-background">
                              <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center relative z-10 border-2 border-background">
                              <Circle className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <p className="text-sm text-center mt-3 max-w-[120px]">{step.title}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm max-w-[250px]">
                          <p className="font-bold mb-1">{step.title}</p>
                          <p className="text-muted-foreground mb-1">{step.description}</p>
                          {step.date && (
                            <p className="text-xs text-muted-foreground">{step.date}</p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </TooltipProvider>
          </Card>

          {/* Two Column Layout - Recent Documents and Outstanding Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Documents */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="m-0">Recent Documents</h3>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
              <div className="space-y-3">
                {dealRoom.documents.slice(0, 4).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${doc.uploadedBy === 'seller' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                        <FileText className={`w-4 h-4 ${doc.uploadedBy === 'seller' ? 'text-blue-600' : 'text-purple-600'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm">{doc.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{doc.uploadedBy === 'seller' ? 'Seller' : 'Buyer'}</span>
                          <span>•</span>
                          <span>{doc.uploadedDate}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Outstanding Tasks */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="m-0">Outstanding Tasks</h3>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
              <div className="space-y-3">
                {getTasksByStatus('todo').slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="flex-1 text-sm">{task.title}</p>
                        <Badge variant="outline" className={`${getPriorityColor(task.priority)} flex-shrink-0`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{task.assignedTo}</span>
                        <span>•</span>
                        <span>Due {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* To Do Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="m-0">To Do</h3>
                <Badge variant="outline">{getTasksByStatus('todo').length}</Badge>
              </div>
              <div>
                {getTasksByStatus('todo').map(renderTaskCard)}
              </div>
            </div>

            {/* In Progress Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="m-0">In Progress</h3>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                  {getTasksByStatus('in-progress').length}
                </Badge>
              </div>
              <div>
                {getTasksByStatus('in-progress').map(renderTaskCard)}
              </div>
            </div>

            {/* Complete Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="m-0">Complete</h3>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  {getTasksByStatus('complete').length}
                </Badge>
              </div>
              <div>
                {getTasksByStatus('complete').map(renderTaskCard)}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="m-0">All Documents</h3>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>

          {/* Requested Documents Section */}
          {dealRoom.requestedDocuments.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="m-0">Requested Documents</h3>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                  {dealRoom.requestedDocuments.filter(d => d.status === 'pending').length} Pending
                </Badge>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {dealRoom.requestedDocuments.map((doc) => (
                  <Card key={doc.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-3 rounded-lg bg-orange-100">
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold">{doc.name}</p>
                            {doc.status === 'pending' ? (
                              <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                                Pending
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                                Uploaded
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>Requested by {doc.requestedBy}</span>
                            <span>•</span>
                            <span>{doc.requestedDate}</span>
                            <span>•</span>
                            <span className="text-orange-600">Due {doc.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {doc.status === 'pending' ? (
                          <Button size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Uploaded Documents Section */}
          <div>
            <h3 className="m-0 mb-3">Uploaded Documents</h3>
            <div className="grid grid-cols-1 gap-3">
              {dealRoom.documents.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-3 rounded-lg ${doc.uploadedBy === 'seller' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                        <FileText className={`w-5 h-5 ${doc.uploadedBy === 'seller' ? 'text-blue-600' : 'text-purple-600'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="mb-1">{doc.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Badge variant="outline" className={doc.uploadedBy === 'seller' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}>
                            {doc.uploadedBy === 'seller' ? 'Seller' : 'Buyer'}
                          </Badge>
                          <span>{doc.category}</span>
                          <span>•</span>
                          <span>{doc.uploadedDate}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Q&A Tab */}
        <TabsContent value="qa" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="m-0">Questions & Answers</h3>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
              {dealRoom.qa.filter(q => q.status === 'pending').length} Pending
            </Badge>
          </div>

          <div className="space-y-4">
            {dealRoom.qa.map((qa) => (
              <Card key={qa.id} className="p-6">
                <div className="space-y-4">
                  {/* Question */}
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="m-0">Question</h4>
                          {qa.status === 'pending' ? (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                              Pending
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                              Answered
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-2">{qa.question}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Asked by {qa.askedBy}</span>
                          <span>•</span>
                          <span>{qa.askedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Answer */}
                  {qa.answer ? (
                    <div className="pl-11 border-l-2 border-green-200 ml-5">
                      <div className="pl-3">
                        <h4 className="m-0 mb-2 text-green-700">Answer</h4>
                        <p className="text-muted-foreground mb-2">{qa.answer}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Answered by {qa.answeredBy}</span>
                          <span>•</span>
                          <span>{qa.answeredDate}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pl-11">
                      <Button>Provide Answer</Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Deal Details Tab */}
        <TabsContent value="deal-details" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="m-0 mb-4">Offer Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Total Offer Amount</p>
                <p className="text-3xl text-green-700">{dealRoom.dealDetails.offerAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Employment Term</p>
                <p className="text-2xl">{dealRoom.dealDetails.employmentTerm}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="m-0 mb-4">Deal Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Cash at Close</p>
                <p className="text-2xl mb-1">{dealRoom.dealDetails.cashPercentage}%</p>
                <p className="text-green-700">{dealRoom.dealDetails.cashAtClose}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Earnout</p>
                <p className="text-2xl mb-1">{dealRoom.dealDetails.earnoutPercentage}%</p>
                <p className="text-orange-700">{dealRoom.dealDetails.earnoutAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Total Value</p>
                <p className="text-2xl mb-1">100%</p>
                <p className="text-green-700">{dealRoom.dealDetails.totalValue}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="m-0 mb-4">Important Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Offer Submitted</p>
                <p>{dealRoom.dealDetails.submittedDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Offer Expiration</p>
                <p>{dealRoom.dealDetails.expirationDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-bold">Estimated Closing</p>
                <p>{dealRoom.estimatedClosingDate}</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
