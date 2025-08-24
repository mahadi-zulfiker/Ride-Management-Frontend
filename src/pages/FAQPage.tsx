import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is RideShare?',
          answer: 'RideShare is a ride-booking platform that connects riders with verified drivers for safe and reliable transportation services. We provide a seamless experience for booking rides, tracking drivers, and managing payments.',
        },
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple! Click on the "Sign Up" button, choose your role (rider or driver), fill in your details, and verify your email. You can also sign up using your Google or Facebook account.',
        },
        {
          question: 'Is RideShare available in my city?',
          answer: 'RideShare is currently available in major cities across the country. We\'re constantly expanding our service areas. Check our app or website to see if we\'re available in your location.',
        },
        {
          question: 'What are the operating hours?',
          answer: 'RideShare operates 24/7, so you can book rides anytime, day or night. However, driver availability may vary depending on the time and location.',
        },
      ],
    },
    {
      category: 'For Riders',
      questions: [
        {
          question: 'How do I book a ride?',
          answer: 'To book a ride, open the app, enter your pickup and destination locations, choose your preferred vehicle type, and confirm your booking. You\'ll be matched with a nearby driver.',
        },
        {
          question: 'How much does a ride cost?',
          answer: 'Ride costs are calculated based on distance, time, and demand. You\'ll see the estimated fare before confirming your booking. Final charges may vary slightly based on actual trip conditions.',
        },
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept cash, credit/debit cards, and mobile payment methods like Apple Pay and Google Pay. You can also add multiple payment methods to your account.',
        },
        {
          question: 'How do I track my driver?',
          answer: 'Once your ride is confirmed, you can track your driver in real-time through the app. You\'ll see their location, estimated arrival time, and vehicle details.',
        },
        {
          question: 'What if I need to cancel my ride?',
          answer: 'You can cancel your ride through the app before the driver arrives. Cancellation fees may apply if you cancel after a certain time or if the driver has already started the trip.',
        },
        {
          question: 'How do I rate my driver?',
          answer: 'After your ride is completed, you\'ll receive a prompt to rate your driver and provide feedback. Your rating helps maintain quality standards and helps other riders.',
        },
      ],
    },
    {
      category: 'For Drivers',
      questions: [
        {
          question: 'How do I become a driver?',
          answer: 'To become a driver, sign up with the "Driver" role, provide your vehicle information, upload required documents, and complete our verification process. Once approved, you can start accepting rides.',
        },
        {
          question: 'What documents do I need?',
          answer: 'You\'ll need a valid driver\'s license, vehicle registration, insurance, and background check approval. Additional documents may be required depending on your location.',
        },
        {
          question: 'How do I go online and start driving?',
          answer: 'Open the driver app, tap the "Go Online" button, and you\'ll start receiving ride requests from nearby riders. You can go offline anytime by tapping the same button.',
        },
        {
          question: 'How do I get paid?',
          answer: 'Earnings are automatically calculated and transferred to your linked bank account weekly. You can track your earnings in real-time through the driver dashboard.',
        },
        {
          question: 'Can I choose which rides to accept?',
          answer: 'Yes, you can see ride details including pickup/destination locations and estimated earnings before accepting. You\'re free to accept or decline rides based on your preferences.',
        },
        {
          question: 'What if I have an issue with a rider?',
          answer: 'If you encounter any issues, you can contact our support team through the app or call our 24/7 support line. We\'re here to help resolve any problems quickly.',
        },
      ],
    },
    {
      category: 'Safety & Security',
      questions: [
        {
          question: 'How do you ensure driver safety?',
          answer: 'All drivers undergo thorough background checks, vehicle inspections, and safety training. We also provide 24/7 support and emergency assistance for all users.',
        },
        {
          question: 'What safety features are available?',
          answer: 'We offer ride sharing with emergency contacts, real-time tracking, driver/rider verification, and 24/7 support. You can also access emergency assistance through the app.',
        },
        {
          question: 'How do I report a safety concern?',
          answer: 'If you have a safety concern, contact our support team immediately through the app or call our emergency support line. We take all safety reports seriously and respond quickly.',
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use industry-standard encryption to protect your personal information. We never share your data with third parties without your consent.',
        },
      ],
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'The app is not working properly. What should I do?',
          answer: 'Try restarting the app, checking your internet connection, and updating to the latest version. If the problem persists, contact our technical support team.',
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click on "Forgot Password" on the login screen, enter your email address, and follow the instructions sent to your email to reset your password.',
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Go to your profile settings in the app, tap "Edit Profile," and update your information. Don\'t forget to save your changes.',
        },
        {
          question: 'Can I use RideShare on multiple devices?',
          answer: 'Yes, you can use your account on multiple devices. However, for security reasons, you may be logged out of other devices when you log in on a new one.',
        },
      ],
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  const allQuestions = faqData.flatMap(category => category.questions);
  const filteredQuestions = allQuestions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          {searchTerm && (
            <p className="mt-4 text-sm text-gray-600">
              Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          )}
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchTerm ? (
            // Search results
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Search Results</h2>
              {filteredQuestions.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                  >
                    <span className="font-medium text-gray-900">{item.question}</span>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Categorized FAQ
            <div className="space-y-12">
              {faqData.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((item, index) => {
                      const globalIndex = faqData
                        .slice(0, categoryIndex)
                        .reduce((acc, cat) => acc + cat.questions.length, 0) + index;
                      
                      return (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                          >
                            <span className="font-medium text-gray-900">{item.question}</span>
                            {openItems.includes(globalIndex) ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                          {openItems.includes(globalIndex) && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-600">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact Support */}
          <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;
