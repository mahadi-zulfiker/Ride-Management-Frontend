import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Search, HelpCircle, Users, Car, Shield, CreditCard, Phone, Mail } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "rider" | "driver" | "admin" | "payment" | "safety";
  tags: string[];
}

const faqData: FaqItem[] = [
  // General Questions
  {
    id: "gen-1",
    question: "What is RideShare Pro and how does it work?",
    answer: "RideShare Pro is a comprehensive ride-sharing platform that connects riders with drivers. Simply request a ride, get matched with a nearby driver, and enjoy safe, reliable transportation. Our platform supports riders, drivers, and administrators with tailored dashboards and features.",
    category: "general",
    tags: ["platform", "how it works", "basics"]
  },
  {
    id: "gen-2",
    question: "How do I create an account?",
    answer: "Click 'Register' on the homepage, fill in your details, and select your role (Rider or Driver). For drivers, additional verification and approval from our admin team is required before you can start accepting rides.",
    category: "general",
    tags: ["account", "registration", "signup"]
  },
  {
    id: "gen-3",
    question: "Is RideShare Pro available 24/7?",
    answer: "Yes! Ridey operates 24 hours a day, 7 days a week. However, driver availability may vary by location and time of day.",
    category: "general",
    tags: ["availability", "hours", "24/7"]
  },

  // Rider Questions
  {
    id: "rider-1",
    question: "How do I request a ride?",
    answer: "After logging into your rider account, go to your dashboard and use the ride request form. Enter your pickup location, destination, select your payment method, and get a fare estimate before confirming your ride.",
    category: "rider",
    tags: ["book ride", "request", "pickup", "destination"]
  },
  {
    id: "rider-2",
    question: "Can I track my ride in real-time?",
    answer: "Yes! Once your ride is accepted, you can track it in real-time with GPS navigation, see driver details, and get estimated arrival times.",
    category: "rider",
    tags: ["tracking", "real-time", "GPS", "location"]
  },
  {
    id: "rider-3",
    question: "How do I cancel a ride?",
    answer: "You can cancel a ride with 'requested' status from your ride history or current ride page. Please note that cancellation policies may apply depending on the timing.",
    category: "rider",
    tags: ["cancel", "cancellation", "refund"]
  },
  {
    id: "rider-4",
    question: "Can I see my ride history?",
    answer: "Yes! Access your complete ride history with advanced filtering by date, fare range, and ride status. Each ride includes detailed information and receipts.",
    category: "rider",
    tags: ["history", "past rides", "receipts"]
  },

  // Driver Questions
  {
    id: "driver-1",
    question: "How do I become a driver?",
    answer: "Register as a driver, provide required documents (license, vehicle registration, insurance), and wait for admin approval. Once approved, you can go online and start accepting ride requests.",
    category: "driver",
    tags: ["become driver", "approval", "documents", "requirements"]
  },
  {
    id: "driver-2",
    question: "How do I control my availability?",
    answer: "Use the online/offline toggle in your driver dashboard. When online, you'll receive ride requests. When offline, you won't receive any requests.",
    category: "driver",
    tags: ["availability", "online", "offline", "toggle"]
  },
  {
    id: "driver-3",
    question: "How do I track my earnings?",
    answer: "Your driver dashboard includes a comprehensive earnings section with visual charts showing daily, weekly, and monthly breakdowns, plus detailed trip history.",
    category: "driver",
    tags: ["earnings", "income", "payments", "dashboard"]
  },
  {
    id: "driver-4",
    question: "What ride statuses can I update?",
    answer: "You can update rides from Accepted → Picked Up → In Transit → Completed, or cancel rides when necessary. Each status change notifies the rider automatically.",
    category: "driver",
    tags: ["status", "ride management", "workflow"]
  },

  // Payment Questions
  {
    id: "payment-1",
    question: "What payment methods are accepted?",
    answer: "We support multiple payment methods including cash, card, and mobile payments. Select your preferred method when requesting a ride.",
    category: "payment",
    tags: ["payment", "cash", "card", "mobile"]
  },
  {
    id: "payment-2",
    question: "How is the fare calculated?",
    answer: "Fares are calculated based on distance, time, and current demand. You'll see an estimated fare before confirming your ride request.",
    category: "payment",
    tags: ["fare", "calculation", "pricing", "estimate"]
  },

  // Safety Questions
  {
    id: "safety-1",
    question: "What safety features does Ridey offer?",
    answer: "Ridey includes an SOS/Emergency button during active rides, live location sharing, emergency contact notifications, driver verification, and 24/7 support.",
    category: "safety",
    tags: ["safety", "emergency", "SOS", "security"]
  },
  {
    id: "safety-2",
    question: "How does the SOS feature work?",
    answer: "During an active ride, tap the floating SOS button to access emergency options: Call Police, Notify Emergency Contact, or Share Live Location. Your location is automatically shared with selected contacts.",
    category: "safety",
    tags: ["SOS", "emergency", "location sharing", "contacts"]
  },

  // Admin Questions
  {
    id: "admin-1",
    question: "How do admins manage users?",
    answer: "Admins have comprehensive user management tools including search, filter, block/unblock capabilities for riders, and driver approval systems with detailed oversight.",
    category: "admin",
    tags: ["user management", "admin", "approval", "oversight"]
  }
];

const categoryIcons = {
  general: <HelpCircle className="h-5 w-5" />,
  rider: <Users className="h-5 w-5" />,
  driver: <Car className="h-5 w-5" />,
  admin: <Shield className="h-5 w-5" />,
  payment: <CreditCard className="h-5 w-5" />,
  safety: <Shield className="h-5 w-5" />
};

const categoryColors = {
  general: "bg-gray-500",
  rider: "bg-blue-500", 
  driver: "bg-green-500",
  admin: "bg-purple-500",
  payment: "bg-orange-500",
  safety: "bg-red-500"
};

const categoryNames = {
  general: "General",
  rider: "Rider",
  driver: "Driver", 
  admin: "Admin",
  payment: "Payment",
  safety: "Safety"
};

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = searchTerm === "" || 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === null || faq.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = Array.from(new Set(faqData.map(faq => faq.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about using RideShare Pro. Can't find what you're looking for? 
            Our support team is here to help 24/7.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search questions, answers, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg rounded-xl border-2 focus:border-primary"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <Badge 
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-base rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Badge>
            {categories.map(category => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-base rounded-full flex items-center gap-2 ${
                  selectedCategory === category 
                    ? categoryColors[category as keyof typeof categoryColors] + " text-white hover:opacity-90" 
                    : "border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {categoryIcons[category as keyof typeof categoryIcons]}
                {categoryNames[category as keyof typeof categoryNames]}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-lg text-muted-foreground">
            {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''} found
            {selectedCategory && ` in ${categoryNames[selectedCategory as keyof typeof categoryNames]}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mb-16">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id} className="border-0 shadow-lg">
                  <AccordionItem value={faq.id} className="border-0">
                    <AccordionTrigger className="hover:no-underline px-6 py-6 text-left">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${categoryColors[faq.category]} text-white flex-shrink-0 mt-1`}>
                          {categoryIcons[faq.category]}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl">{faq.question}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <Badge variant="secondary" className="text-sm px-3 py-1">
                              {categoryNames[faq.category]}
                            </Badge>
                            {faq.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="outline" className="text-sm px-3 py-1">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2">
                      <div className="ml-14 pl-2 border-l-2 border-primary/20">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <CardTitle className="text-2xl">No results found</CardTitle>
                <CardDescription className="text-lg">
                  Try adjusting your search terms or browsing different categories.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 text-lg">
                  Can't find what you're looking for?
                </p>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer px-6 py-3 text-lg rounded-full hover:bg-primary hover:text-white transition-colors"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(null);
                  }}
                >
                  Clear Filters
                </Badge>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Support */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Still need help?</CardTitle>
            <CardDescription className="text-blue-100 text-xl max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you with any questions or issues.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-center gap-8 py-4">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6" />
                <div>
                  <p className="font-bold text-lg">Email Support</p>
                  <p className="text-blue-100">support@ridey.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6" />
                <div>
                  <p className="font-bold text-lg">Phone Support</p>
                  <p className="text-blue-100">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}