// AccountStatusPage.jsx
import { Link } from 'react-router-dom';
import { AlertTriangle, Phone, Mail, Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const AccountStatusPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Account Status Issue
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your account has been temporarily restricted
        </p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
              className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
            >
              <Shield className="h-6 w-6 text-red-600" />
            </motion.div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Account Suspended
            </h3>
            
            <p className="text-sm text-gray-600 mb-6">
              Your account has been temporarily suspended due to a policy violation or security concern. 
              This is a precautionary measure to ensure the safety of our community.
            </p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    What happened?
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Your account may have been suspended due to:
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Multiple policy violations</li>
                      <li>Security concerns</li>
                      <li>Payment issues</li>
                      <li>Driver approval pending</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">
                How to resolve this issue:
              </h4>
              
              <div className="space-y-3">
                {[
                  { num: 1, title: 'Review our policies', desc: 'Make sure you understand and follow our community guidelines.' },
                  { num: 2, title: 'Contact support', desc: 'Reach out to our support team for assistance.' },
                  { num: 3, title: 'Provide documentation', desc: 'If requested, provide any necessary documentation for verification.' }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-teal-600">{step.num}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">
                        <strong>{step.title}:</strong> {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 space-y-4"
            >
              <h4 className="text-sm font-medium text-gray-900">
                Contact Support:
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a 
                    href="mailto:support@rideshare.com" 
                    className="text-sm text-teal-600 hover:text-teal-500"
                  >
                    support@rideshare.com
                  </a>
                </div>
                
                <div className="flex items-center justify-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a 
                    href="tel:+15551234567" 
                    className="text-sm text-teal-600 hover:text-teal-500"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <Link
                to="/"
                className="inline-flex items-center text-sm text-teal-600 hover:text-teal-500"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatusPage;