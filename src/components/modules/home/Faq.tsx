import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageSquare, Headphones } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq = ({
  heading = "Frequently Asked Questions",
  items = [
    {
      id: "faq-1",
      question: "How can I track my ride?",
      answer:
        "You can track your ride in real-time through the RideDetails page, which shows the driver's location and the ride status timeline.",
    },
    {
      id: "faq-2",
      question: "Can I cancel a ride?",
      answer:
        "Yes, rides with the status 'requested' can be cancelled by the rider. Once cancelled, the status will be updated and the driver notified.",
    },
    {
      id: "faq-3",
      question: "What does each ride status mean?",
      answer:
        "Requested: The ride has been requested but not yet accepted by a driver.\nAccepted: A driver has accepted the ride.\nPicked Up: The driver has picked up the rider.\nIn Transit: The ride is ongoing.\nCompleted: The ride has finished successfully.\nCancelled: The ride was cancelled by the rider or driver.",
    },
    {
      id: "faq-4",
      question: "How is payment handled?",
      answer:
        "Payment can be either collected in cash or through the app (if supported). The payment status is shown on the RideDetails page.",
    },
    {
      id: "faq-5",
      question: "Who do I contact for support?",
      answer:
        "For any issues related to your ride, contact our support team through the app or via the support email provided in your account.",
    },
  ],
}: Faq1Props) => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-purple-200/20 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-4xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {heading}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about RideShare Pro. Can't find what you're looking for? Contact our support team.
          </p>
        </div>
        
        {/* Enhanced FAQ Accordion */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6 md:p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gray-50/50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-600/30 overflow-hidden"
              >
                <AccordionTrigger className="font-semibold hover:no-underline px-6 py-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-left">{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-6 pb-4 leading-relaxed">
                  <div className="pl-11">
                    {item.answer.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Still have questions?</h3>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to help you 24/7. Get in touch with us anytime.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Contact Support
                </button>
                <button className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Help Center
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq };