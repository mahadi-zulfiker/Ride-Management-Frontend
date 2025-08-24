import { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Users, X } from 'lucide-react';
import toast from 'react-hot-toast';

const SOSButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emergencyContacts = [
    { name: 'Police', number: '911', icon: '🚔' },
    { name: 'Emergency Contact', number: '+1 (555) 123-4567', icon: '👤' },
    { name: 'RideShare Support', number: '+1 (555) 987-6543', icon: '🆘' },
  ];

  const handleEmergencyAction = async (action: string, contact?: { name: string; number: string }) => {
    setIsLoading(true);
    
    try {
      // Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
            
            switch (action) {
              case 'call':
                if (contact) {
                  window.open(`tel:${contact.number}`, '_blank');
                  toast.success(`Calling ${contact.name}...`);
                }
                break;
              
              case 'share_location':
                if (navigator.share) {
                  await navigator.share({
                    title: 'Emergency Location',
                    text: `Emergency: I need help! My current location is: ${locationUrl}`,
                    url: locationUrl,
                  });
                } else {
                  // Fallback: copy to clipboard
                  navigator.clipboard.writeText(`Emergency: I need help! My current location is: ${locationUrl}`);
                  toast.success('Location copied to clipboard');
                }
                break;
              
              case 'notify_contacts':
                // In a real app, this would send notifications to saved emergency contacts
                toast.success('Emergency contacts notified');
                break;
            }
          },
          (error) => {
            toast.error('Unable to get location. Please call emergency services directly.');
          }
        );
      } else {
        toast.error('Geolocation not supported. Please call emergency services directly.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setShowOptions(false);
    }
  };

  return (
    <>
      {/* Floating SOS Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <AlertTriangle className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Emergency Options Modal */}
      {showOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowOptions(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Emergency Options</h3>
              <button
                onClick={() => setShowOptions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Emergency Contacts */}
              {emergencyContacts.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleEmergencyAction('call', contact)}
                  disabled={isLoading}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-2xl mr-3">{contact.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{contact.name}</div>
                    <div className="text-sm text-gray-500">{contact.number}</div>
                  </div>
                  <Phone className="w-5 h-5 text-primary-600" />
                </button>
              ))}

              <div className="border-t border-gray-200 pt-3 space-y-3">
                {/* Share Location */}
                <button
                  onClick={() => handleEmergencyAction('share_location')}
                  disabled={isLoading}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">Share Location</div>
                    <div className="text-sm text-gray-500">Share your current location</div>
                  </div>
                </button>

                {/* Notify Emergency Contacts */}
                <button
                  onClick={() => handleEmergencyAction('notify_contacts')}
                  disabled={isLoading}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Users className="w-5 h-5 text-primary-600 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">Notify Contacts</div>
                    <div className="text-sm text-gray-500">Alert saved emergency contacts</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>Important:</strong> In case of immediate danger, call 911 directly. 
                This feature is for additional safety measures only.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;
