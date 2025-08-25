// AboutPage.jsx
import { Link } from 'react-router-dom';
import { Car, Users, Target, Award } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

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
      <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white py-32">
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?team,company')] bg-cover bg-center opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            About RideShare
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto italic font-light"
          >
            Connecting communities through safe, reliable, and affordable transportation solutions
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
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
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-teal-100 rounded-xl p-8 shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-2">50K+</div>
                    <div className="text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-2">10K+</div>
                    <div className="text-gray-600">Verified Drivers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-2">1M+</div>
                    <div className="text-gray-600">Rides Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-2">4.8★</div>
                    <div className="text-gray-600">Average Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We're driven by a clear mission and guided by core values that shape everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-teal-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-teal-600 mr-3" />
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
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-teal-600 mr-3" />
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
            </motion.div>
          </div>

          {/* Values */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { icon: Car, title: 'Safety First', desc: 'Every decision we make prioritizes the safety and security of our users.' },
              { icon: Users, title: 'Community Focus', desc: 'Building strong communities through reliable transportation services.' },
              { icon: Award, title: 'Excellence', desc: 'Striving for excellence in every aspect of our service.' }
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200">
                  <value.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The passionate individuals behind RideShare's success</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-teal-600">{member.image}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-teal-600 text-center mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm text-center mb-4">{member.bio}</p>
                  <div className="text-center">
                    <a
                      href={member.linkedin}
                      className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                    >
                      View Profile →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Have questions about our company or services? We'd love to hear from you.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Join Our Team
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;