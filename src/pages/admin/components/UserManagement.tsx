import { useState } from 'react';
import {
  Search, Filter, Users, UserCheck, UserX, Shield, 
  Car, Mail, Phone, Calendar, MoreVertical, Eye
} from 'lucide-react';
import { useGetDriversQuery, useBlockUserMutation, useApproveDriverMutation } from '../../../store/api';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const { data: driversData, isLoading, error } = useGetDriversQuery({});
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const [approveDriver, { isLoading: isApproving }] = useApproveDriverMutation();

  // Mock user data (replace with real API data)
  const users = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      role: 'rider',
      status: 'active',
      isBlocked: false,
      joinDate: '2024-01-15',
      totalRides: 45,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      role: 'driver',
      status: 'pending',
      isBlocked: false,
      isApproved: false,
      joinDate: '2024-01-20',
      totalRides: 0,
      rating: 0,
      vehicleInfo: {
        type: 'sedan',
        licensePlate: 'ABC-123',
      },
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '+1 (555) 345-6789',
      role: 'driver',
      status: 'active',
      isBlocked: false,
      isApproved: true,
      joinDate: '2024-01-10',
      totalRides: 156,
      rating: 4.9,
      vehicleInfo: {
        type: 'suv',
        licensePlate: 'XYZ-789',
      },
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      role: 'rider',
      status: 'blocked',
      isBlocked: true,
      joinDate: '2024-01-05',
      totalRides: 23,
      rating: 3.2,
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+1 (555) 567-8901',
      role: 'driver',
      status: 'active',
      isBlocked: false,
      isApproved: true,
      joinDate: '2024-01-12',
      totalRides: 89,
      rating: 4.7,
      vehicleInfo: {
        type: 'sedan',
        licensePlate: 'DEF-456',
      },
    },
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'rider', label: 'Riders' },
    { value: 'driver', label: 'Drivers' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'pending', label: 'Pending' },
  ];

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleBlockUser = async (userId: string, isBlocked: boolean) => {
    try {
      await blockUser({ userId, isBlocked }).unwrap();
      toast.success(`User ${isBlocked ? 'blocked' : 'unblocked'} successfully`);
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Failed to update user status';
      toast.error(errorMessage);
    }
  };

  const handleApproveDriver = async (driverId: string) => {
    try {
      await approveDriver(driverId).unwrap();
      toast.success('Driver approved successfully');
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Failed to approve driver';
      toast.error(errorMessage);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'driver':
        return <Car className="w-4 h-4" />;
      case 'rider':
        return <Users className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage users, approve drivers, and monitor platform activity</p>
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
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="md:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {roleOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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

      {/* Users Table */}
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
          ) : currentUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-primary-600 font-semibold">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                              <div className="text-sm text-gray-500">{user.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getRoleIcon(user.role)}
                            <span className="ml-2 text-sm text-gray-900 capitalize">{user.role}</span>
                          </div>
                          {user.role === 'driver' && user.vehicleInfo && (
                            <div className="text-xs text-gray-500 mt-1">
                              {user.vehicleInfo.type} • {user.vehicleInfo.licensePlate}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.joinDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.totalRides} rides</div>
                          {user.rating > 0 && (
                            <div className="text-sm text-gray-500">⭐ {user.rating}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {user.role === 'driver' && !user.isApproved && (
                              <button
                                onClick={() => handleApproveDriver(user.id)}
                                disabled={isApproving}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleBlockUser(user.id, !user.isBlocked)}
                              disabled={isBlocking}
                              className={`${
                                user.isBlocked 
                                  ? 'text-green-600 hover:text-green-900' 
                                  : 'text-red-600 hover:text-red-900'
                              } disabled:opacity-50`}
                            >
                              {user.isBlocked ? (
                                <UserCheck className="w-4 h-4" />
                              ) : (
                                <UserX className="w-4 h-4" />
                              )}
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
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
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
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
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-lg font-semibold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-lg font-semibold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <Car className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Drivers</p>
              <p className="text-lg font-semibold text-gray-900">
                {users.filter(u => u.role === 'driver' && !u.isApproved).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <UserX className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Blocked Users</p>
              <p className="text-lg font-semibold text-gray-900">
                {users.filter(u => u.isBlocked).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
