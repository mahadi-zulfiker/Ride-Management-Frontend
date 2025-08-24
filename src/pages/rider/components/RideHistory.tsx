import { useState } from 'react';
import { 
  Search, Filter, Calendar, MapPin, Car, Star, 
  DollarSign, Clock, ChevronLeft, ChevronRight 
} from 'lucide-react';

const RideHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 5;

  // Mock ride history data
  const rideHistory = [
    {
      id: 'RIDE001',
      date: '2024-01-15',
      time: '14:30',
      pickup: '123 Main St, City, State',
      destination: '456 Oak Ave, City, State',
      driver: 'John Smith',
      vehicle: 'Toyota Camry',
      fare: 25,
      status: 'completed',
      rating: 5,
      distance: '3.2 km',
      duration: '12 min',
    },
    {
      id: 'RIDE002',
      date: '2024-01-14',
      time: '09:15',
      pickup: '789 Pine St, City, State',
      destination: '321 Elm St, City, State',
      driver: 'Sarah Johnson',
      vehicle: 'Honda Civic',
      fare: 18,
      status: 'completed',
      rating: 4,
      distance: '2.1 km',
      duration: '8 min',
    },
    {
      id: 'RIDE003',
      date: '2024-01-13',
      time: '18:45',
      pickup: '555 Maple Dr, City, State',
      destination: '777 Cedar Ln, City, State',
      driver: 'Mike Wilson',
      vehicle: 'Ford Escape',
      fare: 32,
      status: 'completed',
      rating: 5,
      distance: '4.5 km',
      duration: '15 min',
    },
    {
      id: 'RIDE004',
      date: '2024-01-12',
      time: '11:20',
      pickup: '888 Birch Rd, City, State',
      destination: '999 Spruce Ave, City, State',
      driver: 'Emily Davis',
      vehicle: 'Nissan Altima',
      fare: 22,
      status: 'completed',
      rating: 4,
      distance: '2.8 km',
      duration: '10 min',
    },
    {
      id: 'RIDE005',
      date: '2024-01-11',
      time: '16:30',
      pickup: '111 Willow St, City, State',
      destination: '222 Poplar Ave, City, State',
      driver: 'David Brown',
      vehicle: 'Chevrolet Malibu',
      fare: 28,
      status: 'completed',
      rating: 5,
      distance: '3.7 km',
      duration: '13 min',
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Rides' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'in_progress', label: 'In Progress' },
  ];

  // Filter rides based on search term and status
  const filteredRides = rideHistory.filter(ride => {
    const matchesSearch = 
      ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ride.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRides.length / ridesPerPage);
  const startIndex = (currentPage - 1) * ridesPerPage;
  const endIndex = startIndex + ridesPerPage;
  const currentRides = filteredRides.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ride History</h1>
          <p className="text-gray-600">View your past rides and track your journey history</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search rides by location or driver..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="md:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ride List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          {currentRides.length === 0 ? (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No rides found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentRides.map((ride) => (
                <div key={ride.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    {/* Ride Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center mb-2">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-500">
                              {formatDate(ride.date)} at {ride.time}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900">Ride #{ride.id}</h3>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.status)}`}>
                          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                        </span>
                      </div>

                      {/* Locations */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-500">From</p>
                            <p className="text-gray-900">{ride.pickup}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-500">To</p>
                            <p className="text-gray-900">{ride.destination}</p>
                          </div>
                        </div>
                      </div>

                      {/* Driver and Vehicle */}
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Car className="w-4 h-4 mr-1" />
                        <span>{ride.driver} • {ride.vehicle}</span>
                      </div>

                      {/* Ride Stats */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{ride.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{ride.distance}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>{ride.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    {/* Fare */}
                    <div className="md:ml-6 mt-4 md:mt-0 text-right">
                      <div className="text-2xl font-bold text-primary-600">${ride.fare}</div>
                      <div className="text-sm text-gray-500">Total Fare</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredRides.length)} of {filteredRides.length} rides
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <Car className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Rides</p>
              <p className="text-lg font-semibold text-gray-900">{rideHistory.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-lg font-semibold text-gray-900">
                ${rideHistory.reduce((sum, ride) => sum + ride.fare, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Rating</p>
              <p className="text-lg font-semibold text-gray-900">
                {(rideHistory.reduce((sum, ride) => sum + ride.rating, 0) / rideHistory.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Distance</p>
              <p className="text-lg font-semibold text-gray-900">
                {rideHistory.reduce((sum, ride) => sum + parseFloat(ride.distance), 0).toFixed(1)} km
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideHistory;
