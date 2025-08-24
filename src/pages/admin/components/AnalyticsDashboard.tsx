import { useState } from 'react';
import { 
  Users, Car, DollarSign, TrendingUp, Activity, 
  BarChart3, PieChart, LineChart, Calendar, Filter 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, 
  Line, AreaChart, Area 
} from 'recharts';
import { useGetAnalyticsQuery } from '../../../store/api';

const AnalyticsDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('week'); // day, week, month, year
  const { data: analyticsData, isLoading, error } = useGetAnalyticsQuery({ period: timeFilter });

  // Mock data for demonstration (replace with real data from API)
  const mockData = {
    totalUsers: 1247,
    totalRides: 8923,
    totalRevenue: 156789.50,
    activeDrivers: 89,
    ridesByStatus: [
      { status: 'Completed', count: 7845, percentage: 88 },
      { status: 'In Progress', count: 234, percentage: 3 },
      { status: 'Cancelled', count: 844, percentage: 9 },
    ],
    revenueByMonth: [
      { month: 'Jan', revenue: 12500, rides: 450 },
      { month: 'Feb', revenue: 13800, rides: 520 },
      { month: 'Mar', revenue: 15200, rides: 580 },
      { month: 'Apr', revenue: 16800, rides: 640 },
      { month: 'May', revenue: 18200, rides: 720 },
      { month: 'Jun', revenue: 19500, rides: 780 },
    ],
    userGrowth: [
      { month: 'Jan', riders: 120, drivers: 45 },
      { month: 'Feb', riders: 145, drivers: 52 },
      { month: 'Mar', riders: 168, drivers: 58 },
      { month: 'Apr', riders: 192, drivers: 65 },
      { month: 'May', riders: 218, drivers: 72 },
      { month: 'Jun', riders: 245, drivers: 78 },
    ],
    topDrivers: [
      { name: 'John Smith', rides: 156, earnings: 3245.80, rating: 4.9 },
      { name: 'Sarah Johnson', rides: 142, earnings: 2987.50, rating: 4.8 },
      { name: 'Mike Wilson', rides: 128, earnings: 2678.90, rating: 4.7 },
      { name: 'Emily Davis', rides: 115, earnings: 2456.30, rating: 4.9 },
      { name: 'David Brown', rides: 98, earnings: 2134.70, rating: 4.6 },
    ],
  };

  const data = analyticsData || mockData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">Error loading analytics data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Comprehensive overview of platform performance</p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(data.totalUsers)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Car className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Rides</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(data.totalRides)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
              <Activity className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Drivers</p>
              <p className="text-2xl font-bold text-gray-900">{data.activeDrivers}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: any) => [
                  typeof value === 'number' ? formatCurrency(value) : value,
                  'Revenue'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#14b8a6" 
                fill="#14b8a6" 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Ride Status Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ride Status Distribution</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={data.ridesByStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
              >
                {data.ridesByStatus.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.status === 'Completed' ? '#10b981' :
                      entry.status === 'In Progress' ? '#3b82f6' : '#ef4444'
                    } 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [value, 'Rides']} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {data.ridesByStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: 
                        item.status === 'Completed' ? '#10b981' :
                        item.status === 'In Progress' ? '#3b82f6' : '#ef4444'
                    }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.status}</span>
                </div>
                <span className="text-sm font-medium">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
          <Users className="w-5 h-5 text-gray-400" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={data.userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="riders" 
              stroke="#14b8a6" 
              strokeWidth={2}
              name="Riders"
            />
            <Line 
              type="monotone" 
              dataKey="drivers" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Drivers"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Drivers</h2>
          <div className="space-y-4">
            {data.topDrivers.map((driver, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-600 font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{driver.name}</p>
                    <p className="text-sm text-gray-500">{driver.rides} rides • ⭐ {driver.rating}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{formatCurrency(driver.earnings)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Insights</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Average Ride Value</p>
                <p className="text-sm text-green-600">Based on completed rides</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(data.totalRevenue / data.totalRides)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Completion Rate</p>
                <p className="text-sm text-blue-600">Successful rides</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">
                  {Math.round((data.ridesByStatus.find(r => r.status === 'Completed')?.percentage || 0))}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Driver Utilization</p>
                <p className="text-sm text-yellow-600">Active drivers</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-yellow-600">
                  {Math.round((data.activeDrivers / (data.totalUsers * 0.3)) * 100)}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-800">Monthly Growth</p>
                <p className="text-sm text-purple-600">User acquisition</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-600">+12.5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
