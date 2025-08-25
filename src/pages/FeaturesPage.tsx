// FeaturesPage.jsx
import { Link } from 'react-router-dom';
import { 
  Car, User, Shield, MapPin, Clock, Star, CreditCard, 
  BarChart3, Users, Settings, Bell, Phone, Mail, 
  CheckCircle, Zap, Globe, Lock, Eye, TrendingUp
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

const FeaturesPage = () => {
  const riderFeatures = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Easy Booking',
      description: 'Book rides in seconds with our intuitive interface. Set pickup and destination locations with just a few taps.',
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: 'Multiple Vehicle Options',
      description: 'Choose from various vehicle types including sedans, SUVs, motorcycles, and vans based on your needs.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Real-time Tracking',
      description: 'Track your driver in real-time and get accurate ETAs. Know exactly when your ride will arrive.',
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Multiple Payment Options',
      description: 'Pay with cash, card, or mobile payment methods. All transactions are secure and transparent.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Safety Features',
      description: 'Share your ride with emergency contacts, access 24/7 support, and enjoy verified driver profiles.',
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Driver Ratings',
      description: 'Rate your experience and help maintain quality standards. View driver ratings before booking.',
    },
  ];

  const driverFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Flexible Schedule',
      description: 'Work on your own terms. Go online and offline whenever you want, with no minimum hour requirements.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Earnings Dashboard',
      description: 'Track your earnings in real-time with detailed analytics, including daily, weekly, and monthly reports.',
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Smart Notifications',
      description: 'Receive instant notifications for ride requests and important updates about your account.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Rider Information',
      description: 'View rider details, ratings, and pickup/destination information before accepting rides.',
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'Profile Management',
      description: 'Update your vehicle information, contact details, and preferences easily through the app.',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Service Area Control',
      description: 'Choose your preferred service areas and set your availability to maximize earnings.',
    },
  ];

  const adminFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting tools to monitor platform performance and user activity.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'User Management',
      description: 'Manage riders and drivers, approve applications, and handle account-related issues efficiently.',
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: 'Ride Oversight',
      description: 'Monitor all rides in real-time, track performance metrics, and ensure service quality standards.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Safety Monitoring',
      description: 'Advanced safety monitoring tools to ensure the security of all platform users.',
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'System Configuration',
      description: 'Configure platform settings, manage pricing, and customize features according to business needs.',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Real-time Monitoring',
      description: 'Monitor platform activity in real-time with detailed logs and performance metrics.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Banner and Quote */}
      <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white py-32">
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?technology,features')] bg-cover bg-center opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Platform Features
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto italic font-light"
          >
            "Innovation distinguishes between a leader and a follower." – Steve Jobs
          </motion.p>
        </div>
      </section>

      {/* Rider Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">For Riders</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need for a seamless ride booking experience</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {riderFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="text-teal-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/register?role=rider"
              className="bg-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Riding
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Driver Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Car className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">For Drivers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful tools to help you succeed as a professional driver</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {driverFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                <div className="text-teal-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/register?role=driver"
              className="bg-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Become a Driver
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">For Administrators</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive management tools for platform oversight and optimization</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="text-teal-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Highlights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Key features that make our platform stand out</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { icon: CheckCircle, color: 'green', title: 'Verified Users', desc: 'All drivers undergo thorough background checks and verification processes to ensure safety.' },
                { icon: Lock, color: 'blue', title: 'Secure Payments', desc: 'All transactions are encrypted and secure, with multiple payment options available.' },
                { icon: Phone, color: 'purple', title: '24/7 Support', desc: 'Round-the-clock customer support to assist you with any questions or issues.' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
                      <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-8">
              {[
                { icon: Zap, color: 'orange', title: 'Real-time Updates', desc: 'Live tracking and real-time updates keep you informed throughout your journey.' },
                { icon: Shield, color: 'red', title: 'Safety Features', desc: 'Emergency contacts, ride sharing, and safety monitoring for peace of mind.' },
                { icon: TrendingUp, color: 'teal', title: 'Performance Analytics', desc: 'Detailed analytics and insights to help optimize your experience and earnings.' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
                      <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Join thousands of users who trust our platform for their transportation needs
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register?role=rider"
              className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Sign Up as Rider
            </Link>
            <Link
              to="/register?role=driver"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Become a Driver
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;