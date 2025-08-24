import { Link } from 'react-router-dom';
import { 
  Car, User, Shield, MapPin, Clock, Star, CreditCard, 
  BarChart3, Users, Settings, Bell, Phone, Mail, 
  CheckCircle, Zap, Globe, Lock, Eye, TrendingUp
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

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
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Platform Features
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the powerful features designed for riders, drivers, and administrators
            </p>
          </div>
        </div>
      </section>

      {/* Rider Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Riders
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a seamless ride booking experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {riderFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register?role=rider"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300"
            >
              Start Riding
            </Link>
          </div>
        </div>
      </section>

      {/* Driver Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Car className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Drivers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools to help you succeed as a professional driver
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {driverFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                <div className="text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register?role=driver"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300"
            >
              Become a Driver
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Administrators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive management tools for platform oversight and optimization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key features that make our platform stand out
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Verified Users</h3>
                  <p className="text-gray-600">
                    All drivers undergo thorough background checks and verification processes to ensure safety.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
                  <p className="text-gray-600">
                    All transactions are encrypted and secure, with multiple payment options available.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600">
                    Round-the-clock customer support to assist you with any questions or issues.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">
                    Live tracking and real-time updates keep you informed throughout your journey.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Safety Features</h3>
                  <p className="text-gray-600">
                    Emergency contacts, ride sharing, and safety monitoring for peace of mind.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                  <p className="text-gray-600">
                    Detailed analytics and insights to help optimize your experience and earnings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their transportation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?role=rider"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Sign Up as Rider
            </Link>
            <Link
              to="/register?role=driver"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-300"
            >
              Become a Driver
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
