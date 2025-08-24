import { useState } from 'react';
import {
  Search, Filter, Car, MapPin, Calendar, Clock,
  DollarSign, Users, Eye, MoreVertical, TrendingUp
} from 'lucide-react';
import { useGetRidesQuery } from '../../../store/api';

const RideOversight = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 10;

  const { data: ridesData, isLoading, error } = useGetRidesQuery({});

  // Mock rides data (replace with real API data)
  const rides = [
    {
      id: 'RIDE001',
      rider: { name: 'John Smith', email: 'john@email.com' },
      driver: { name: 'Mike Wilson', email: 'mike@email.com' },
      pickup: '123 Main St, Downtown',
      destination: '456 Oak Ave, Uptown',
      status: 'completed',
      fare: 25.50,
      distance: '3.2 km',
      duration: '12 min',
      createdAt: '2024-01-15T14:30:00Z',
      completedAt: '2024-01-15T14:42:00Z',
      paymentMethod: 'credit_card',
    },
    {
      id: 'RIDE002',
      rider: { name: 'Sarah Johnson', email: 'sarah@email.com' },
      driver: { name: 'David Brown', email: 'david@email.com' },
      pickup: '789 Pine St, Midtown',
      destination: '321 Elm St, Westside',
      status: 'in_progress',
      fare: 18.75,
      distance: '2.1 km',
      duration: '8 min',
      createdAt: '2024-01-15T15:00:00Z',
      paymentMethod: 'cash',
    },
    {
      id: 'RIDE003',
      rider: { name: 'Emily Davis', email: 'emily@email.com' },
      driver: null,
      pickup: '555 Maple Dr, City Center',
      destination: '777 Cedar Ln, Suburbs',
      status: 'requested',
      fare: 32.00,
      distance: '4.5 km',
      duration: '15 min',
      createdAt: '2024-01-15T15:15:00Z',
      paymentMethod: 'mobile',
    },
    {
      id: 'RIDE004',
      rider: { name: 'Lisa Anderson', email: 'lisa@email.com' },
      driver: { name: 'Tom Wilson', email: 'tom@email.com' },
      pickup: '888 Birch Rd, Downtown',
      destination: '999 Spruce Ave, Uptown',
      status: 'cancelled',
      fare: 22.80,
      distance: '2.8 km',
      duration: '10 min',
      createdAt: '2024-01-15T14:45:00Z',
      cancelledAt: '2024-01-15T14:50:00Z',
      paymentMethod: 'credit_card',
    },
    {
      id: 'RIDE005',
      rider: { name: 'Alex Turner', email: 'alex@email.com' },
      driver: { name: 'Sarah Johnson', email: 'sarah.driver@email.com' },
      pickup: '111 Willow St, Midtown',
      destination: '222 Poplar Ave, Downtown',
      status: 'completed',
      fare: 28.90,
      distance: '3.7 km',
      duration: '13 min',
      createdAt: '2024-01-15T13:30:00Z',
      completedAt: '2024-01-15T13:43:00Z',
      paymentMethod: 'credit_card',
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'requested', label: 'Requested' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ];

  // Filter rides based on search term and filters
  const filteredRides = rides.filter(ride => {
    const matchesSearch =
      ride.rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ride.driver && ride.driver.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ride.status === statusFilter;

    // Date filtering logic (simplified)
    const matchesDate = dateFilter === 'all' || true; // Add proper date filtering logic

    return matchesSearch && matchesStatus && matchesDate;
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
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-yellow-100 text-yellow-800';
      case 'requested':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <TrendingUp className="w-4 h-4" />;
      case 'in_progress':
        return <Car className="w-4 h-4" />;
      case 'accepted':
        return <Clock className="w-4 h-4" />;
      case 'requested':
        return <Search className="w-4 h-4" />;
      case 'cancelled':
        return <MoreVertical className="w-4 h-4" />;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return '💳';
      case 'cash':
        return '💰';
      case 'mobile':
        return '📱';
      default:
        return '💳';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ride Oversight</h1>
          <p className="text-gray-600">Monitor and manage all rides across the platform</p>
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
                  placeholder="Search rides by ID, rider, driver, or location..."
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

            {/* Date Filter */}
            <div className="md:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {dateOptions.map(option => (
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

      {/* Rides Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : currentRides.length === 0 ? (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No rides found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ride Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentRides.map((ride) => (
                      <tr key={ride.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">#{ride.id}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              <div className="flex items-center mb-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span className="truncate">{ride.pickup}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span className="truncate">{ride.destination}</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {ride.distance} • {ride.duration}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Rider: {ride.rider.name}</div>
                            <div className="text-gray-500">{ride.rider.email}</div>
                            {ride.driver && (
                              <>
                                <div className="font-medium text-gray-900 mt-2">Driver: {ride.driver.name}</div>
                                <div className="text-gray-500">{ride.driver.email}</div>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(ride.status)}
                            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ride.status)}`}>
                              {ride.status.replace('_', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{formatCurrency(ride.fare)}</div>
                            <div className="text-gray-500 flex items-center">
                              <span className="mr-1">{getPaymentMethodIcon(ride.paymentMethod)}</span>
                              {ride.paymentMethod.replace('_', ' ')}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(ride.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
                      className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Rides</p>
              <p className="text-lg font-semibold text-gray-900">{rides.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-lg font-semibold text-gray-900">
                {rides.filter(r => r.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(rides.reduce((sum, ride) => sum + ride.fare, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <MoreVertical className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cancelled</p>
              <p className="text-lg font-semibold text-gray-900">
                {rides.filter(r => r.status === 'cancelled').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideOversight;
