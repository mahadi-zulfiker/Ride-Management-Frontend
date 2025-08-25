// LandingPage.jsx
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, Star, Users, MapPin } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      
      {/* Enhanced Hero Section with Banner and Quote */}
      <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?journey,travel')] bg-cover bg-center opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            Your Journey Begins Here
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto italic font-light"
          >
            "The journey of a thousand miles begins with a single step." – Lao Tzu
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section with Animations */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to embark on your adventure
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: MapPin, title: '1. Set Your Location', desc: 'Enter your pickup and destination for the optimal route.' },
              { icon: Car, title: '2. Choose Your Ride', desc: 'Select from verified drivers and vehicle options.' },
              { icon: Clock, title: '3. Enjoy Your Ride', desc: 'Track in real-time and arrive safely.' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group hover:scale-105 transition-all duration-300 shadow-md rounded-xl p-6 bg-white"
              >
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-200 transition-colors">
                  <item.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights with Hover Effects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium features
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Safe & Secure', desc: 'Verified drivers and real-time tracking.' },
              { icon: Clock, title: '24/7 Support', desc: 'Always here to help, anytime.' },
              { icon: Star, title: 'Best Prices', desc: 'Transparent and competitive fares.' },
              { icon: Users, title: 'Verified Drivers', desc: 'Background-checked professionals.' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gray-50"
              >
                <item.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our happy community
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Regular Rider', quote: 'Amazing service! Always on time and super easy to use.' },
              { name: 'Mike Chen', role: 'Professional Driver', quote: 'Great earnings and flexible hours. Best platform out there.' },
              { name: 'Emma Davis', role: 'Business Traveler', quote: 'Safety features give me peace of mind every time.' }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-teal-600 font-semibold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action with Quote */}
      <section className="py-24 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto italic"
          >
            "Travel is the only thing you buy that makes you richer." – Anonymous
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Sign Up Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Offers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Exclusive deals for your next adventure
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'New User Bonus', desc: 'Get 50% off your first 3 rides!', gradient: 'from-teal-500 to-teal-600', linkText: 'Claim Offer' },
              { title: 'Weekend Special', desc: 'Enjoy 20% off all rides on weekends!', gradient: 'from-cyan-500 to-cyan-600', linkText: 'Book Now' }
            ].map((offer, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-r ${offer.gradient} text-white p-8 rounded-xl shadow-lg hover:scale-105 transition-all duration-300`}
              >
                <h3 className="text-2xl font-bold mb-4">{offer.title}</h3>
                <p className="text-lg mb-4">{offer.desc}</p>
                <Link
                  to="/register"
                  className="bg-white text-teal-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block"
                >
                  {offer.linkText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;