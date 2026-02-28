import { Practice } from '../types/practice';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface QATabProps {
  practice: Practice;
}

export function QATab({ practice }: QATabProps) {
  const generalQuestions = [
    {
      id: 'g1',
      question: 'When are you looking to sell your practice?',
      answer: 'I\'m targeting a transition within the next 6-12 months. I\'m flexible on the exact timeline to ensure a smooth handover and want to make sure we find the right buyer who aligns with our practice values.',
      answeredBy: 'Practice Owner',
      date: '2024-10-12',
    },
    {
      id: 'g2',
      question: 'How long do you want to stay on after the sale is complete?',
      answer: 'I\'m committed to staying on for a minimum of 6 months post-sale to facilitate a smooth transition. I\'m open to discussing an extended transition period of up to 12-18 months if needed, potentially in a part-time consulting capacity to ensure continuity of care for our clients and support for the incoming owner.',
      answeredBy: 'Practice Owner',
      date: '2024-10-12',
    },
  ];

  const buyerQuestions = [
    {
      id: '1',
      question: 'What are the typical operating hours?',
      answer: 'Monday-Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 3:00 PM, Sunday: Closed',
      askedBy: 'Prospective Buyer',
      answeredBy: 'Practice Owner',
      date: '2024-10-05',
      upvotes: 5,
    },
    {
      id: '2',
      question: 'What is the patient retention rate?',
      answer: 'Our patient retention rate is approximately 85% annually. We have a strong base of loyal clients who have been with us for many years.',
      askedBy: 'Investment Group',
      answeredBy: 'Practice Owner',
      date: '2024-09-28',
      upvotes: 8,
    },
    {
      id: '3',
      question: 'Are there any planned facility upgrades or major equipment needs?',
      answer: 'All major equipment has been upgraded within the last 3 years. We recently installed a new digital X-ray system. No major capital expenditures are anticipated in the near term.',
      askedBy: 'Corporate Buyer',
      answeredBy: 'Practice Owner',
      date: '2024-09-20',
      upvotes: 12,
    },
    {
      id: '4',
      question: 'What percentage of revenue comes from wellness vs. emergency visits?',
      answer: 'Approximately 65% of our revenue comes from wellness and preventive care, 25% from surgical procedures, and 10% from emergency visits.',
      askedBy: 'Prospective Buyer',
      answeredBy: 'Practice Owner',
      date: '2024-09-15',
      upvotes: 6,
    },
    {
      id: '5',
      question: 'Are all staff members willing to stay on after acquisition?',
      answer: 'We have discussed this with our team. The majority have expressed interest in continuing with the practice under new ownership. Our head veterinarian has indicated they would like to transition to part-time in the next year.',
      askedBy: 'Individual Buyer',
      answeredBy: 'Practice Owner',
      date: '2024-09-10',
      upvotes: 15,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">Questions & Answers</h2>
          <p className="text-muted-foreground">
            Common questions from potential buyers and detailed answers from the practice owner
          </p>
        </div>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Ask Question
        </Button>
      </div>

      {/* General Questions Section */}
      <div>
        <h3 className="mb-4">General Questions</h3>
        <Card className="px-[24px] py-[10px]">
          <Accordion type="single" collapsible className="w-full">
            {generalQuestions.map((qa) => (
              <AccordionItem key={qa.id} value={qa.id}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-start justify-between w-full pr-4">
                    <div className="flex-1">
                      <p className="font-medium">{qa.question}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span>Answered {new Date(qa.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-2 space-y-3">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Answer from {qa.answeredBy}</strong>
                      </p>
                      <p>{qa.answer}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>

      {/* Asked by Potential Buyers Section */}
      <div>
        <h3 className="mb-4">Asked by Potential Buyers</h3>
        <Card className="px-[24px] py-[10px]">
          <Accordion type="single" collapsible className="w-full">
            {buyerQuestions.map((qa) => (
              <AccordionItem key={qa.id} value={qa.id}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-start justify-between w-full pr-4">
                    <div className="flex-1">
                      <p className="font-medium">{qa.question}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span>Asked by {qa.askedBy}</span>
                        <span>•</span>
                        <span>{new Date(qa.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{qa.upvotes}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-2 space-y-3">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Answer from {qa.answeredBy}</strong>
                      </p>
                      <p>{qa.answer}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        Helpful
                      </Button>
                      <Button variant="ghost" size="sm">
                        Follow Up
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>

      {/* Add Question Prompt */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="mb-2">Have a Question?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Submit your questions to the practice owner. All questions and answers are visible to other interested buyers to help streamline the due diligence process.
            </p>
            <Button>
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit a Question
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
