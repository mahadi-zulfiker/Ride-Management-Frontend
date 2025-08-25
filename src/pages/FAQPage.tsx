import { useState } from 'react';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQQuestion[];
}

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQCategory[] = [
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
  ];

  const toggleItem = (index: number): void => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };


  const allQuestions: FAQQuestion[] = faqData.flatMap(category => category.questions);
  const filteredQuestions: FAQQuestion[] = allQuestions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white py-32">
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?help,support')] bg-cover bg-center opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto italic font-light"
          >
            Find answers to common questions about our services
          </motion.p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </motion.div>
          {searchTerm && (
            <p className="mt-4 text-sm text-gray-600">
              Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          )}
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchTerm ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Search Results</h2>
              {filteredQuestions.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
                  >
                    <span className="font-medium text-gray-900">{item.question}</span>
                    <motion.span
                      animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.span>
                  </button>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 overflow-hidden"
                    >
                      <p className="text-gray-600">{item.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {faqData.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((item, index) => {
                      const globalIndex: number = faqData
                        .slice(0, categoryIndex)
                        .reduce((acc, cat) => acc + cat.questions.length, 0) + index;
                      
                      return (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
                          >
                            <span className="font-medium text-gray-900">{item.question}</span>
                            <motion.span
                              animate={{ rotate: openItems.includes(globalIndex) ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            </motion.span>
                          </button>
                          {openItems.includes(globalIndex) && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              transition={{ duration: 0.3 }}
                              className="px-6 pb-4 overflow-hidden"
                            >
                              <p className="text-gray-600">{item.answer}</p>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact Support */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-teal-50 rounded-lg p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-teal-600" />
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
              className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;