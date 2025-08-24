import { Link } from 'react-router-dom';
import { Car, Shield, Clock, Star, Users, MapPin, Phone, Mail } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Journey, Our Priority
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
              Experience seamless ride booking with our advanced platform. 
              Connect with reliable drivers and enjoy safe, comfortable journeys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/features"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to get you from point A to point B safely and efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Set Your Location</h3>
              <p className="text-gray-600">
                Enter your pickup and destination locations. Our smart system will find the best route for you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Choose Your Ride</h3>
              <p className="text-gray-600">
                Select from available drivers, view their ratings, and choose your preferred vehicle type.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Enjoy Your Ride</h3>
              <p className="text-gray-600">
                Track your driver in real-time, enjoy a comfortable journey, and pay securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best ride booking experience with cutting-edge technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                All drivers are verified and rides are tracked for your safety
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support to assist you anytime
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Star className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Competitive pricing with transparent fare calculation
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verified Drivers</h3>
              <p className="text-gray-600">
                All drivers undergo background checks and training
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Amazing service! The drivers are always on time and the app is so easy to use. 
                I use it every day for my commute."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-600 font-semibold">S</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Regular Rider</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "As a driver, this platform has been a game-changer. Great earnings, 
                flexible hours, and excellent support team."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-600 font-semibold">M</span>
                </div>
                <div>
                  <p className="font-semibold">Mike Chen</p>
                  <p className="text-sm text-gray-500">Professional Driver</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The safety features give me peace of mind. I love being able to share 
                my ride with family and track the journey in real-time."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-600 font-semibold">E</span>
                </div>
                <div>
                  <p className="font-semibold">Emma Davis</p>
                  <p className="text-sm text-gray-500">Business Traveler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust us for their daily transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Sign Up Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Special Offers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take advantage of our exclusive promotions and discounts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">New User Bonus</h3>
              <p className="text-lg mb-4">Get 50% off your first 3 rides when you sign up!</p>
              <Link
                to="/register"
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block"
              >
                Claim Offer
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Weekend Special</h3>
              <p className="text-lg mb-4">Enjoy 20% off all rides on weekends!</p>
              <Link
                to="/register"
                className="bg-white text-secondary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
