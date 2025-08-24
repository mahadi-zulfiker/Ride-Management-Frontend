import { Link } from 'react-router-dom';
import { Car, Users, Target, Award, MapPin, Phone, Mail } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'S',
      bio: 'Former transportation executive with 15+ years of experience in mobility solutions.',
      linkedin: '#',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'M',
      bio: 'Tech leader with expertise in scalable platforms and real-time systems.',
      linkedin: '#',
    },
    {
      name: 'Emily Davis',
      role: 'Head of Operations',
      image: 'E',
      bio: 'Operations specialist focused on driver partnerships and service quality.',
      linkedin: '#',
    },
    {
      name: 'David Wilson',
      role: 'Head of Safety',
      image: 'D',
      bio: 'Safety expert dedicated to ensuring secure rides for all users.',
      linkedin: '#',
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
              About RideShare
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Connecting communities through safe, reliable, and affordable transportation solutions
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, RideShare emerged from a simple belief: everyone deserves access to 
                safe, reliable, and affordable transportation. What started as a small startup in 
                a local community has grown into a trusted platform connecting thousands of riders 
                with verified drivers.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our journey began when our founders experienced firsthand the challenges of urban 
                transportation. They saw an opportunity to leverage technology to create a more 
                efficient, safer, and more accessible transportation network.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to serve communities across multiple cities, providing millions 
                of rides while maintaining our commitment to safety, reliability, and exceptional 
                customer service.
              </p>
            </div>
            <div className="relative">
              <div className="bg-primary-100 rounded-lg p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
                    <div className="text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
                    <div className="text-gray-600">Verified Drivers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">1M+</div>
                    <div className="text-gray-600">Rides Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">4.8★</div>
                    <div className="text-gray-600">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're driven by a clear mission and guided by core values that shape everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-primary-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                To revolutionize urban transportation by providing safe, reliable, and affordable 
                ride-sharing services that connect communities and reduce environmental impact.
              </p>
              <p className="text-gray-600">
                We believe that transportation should be accessible to everyone, regardless of 
                their location or economic status. Our platform empowers both riders and drivers 
                to create meaningful connections while contributing to a more sustainable future.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                To become the most trusted and preferred transportation platform, setting the 
                standard for safety, reliability, and customer experience in the ride-sharing industry.
              </p>
              <p className="text-gray-600">
                We envision a world where transportation is seamless, sustainable, and accessible 
                to all. Through innovation and community partnerships, we're building the future 
                of urban mobility.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safety First</h3>
              <p className="text-gray-600">
                Every decision we make prioritizes the safety and security of our users. 
                We implement rigorous verification processes and real-time monitoring.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Focus</h3>
              <p className="text-gray-600">
                We believe in building strong communities through reliable transportation 
                services that connect people and foster local economic growth.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from customer 
                support to platform reliability and driver quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind RideShare's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary-600">{member.image}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-primary-600 text-center mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm text-center mb-4">{member.bio}</p>
                  <div className="text-center">
                    <a
                      href={member.linkedin}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View Profile →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get in Touch
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have questions about our company or services? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-300"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
