import { useState } from 'react';
import { 
  DollarSign, TrendingUp, Car, Clock, Calendar, 
  BarChart3, PieChart, Download, Filter 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const EarningsDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('week'); // day, week, month, year

  // Mock earnings data
  const earningsData = {
    today: {
      total: 156.50,
      rides: 8,
      hours: 6.5,
      average: 19.56,
    },
    week: {
      total: 892.30,
      rides: 42,
      hours: 38,
      average: 21.25,
    },
    month: {
      total: 3245.80,
      rides: 156,
      hours: 142,
      average: 20.81,
    },
    year: {
      total: 38947.60,
      rides: 1872,
      hours: 1704,
      average: 20.81,
    }
  };

  // Weekly earnings chart data
  const weeklyChartData = [
    { day: 'Mon', earnings: 125.50, rides: 6 },
    { day: 'Tue', earnings: 98.75, rides: 5 },
    { day: 'Wed', earnings: 142.30, rides: 7 },
    { day: 'Thu', earnings: 167.80, rides: 8 },
    { day: 'Fri', earnings: 189.45, rides: 9 },
    { day: 'Sat', earnings: 98.50, rides: 4 },
    { day: 'Sun', earnings: 70.00, rides: 3 },
  ];

  // Payment method breakdown
  const paymentBreakdown = [
    { name: 'Credit Card', value: 65, color: '#14b8a6' },
    { name: 'Cash', value: 25, color: '#f59e0b' },
    { name: 'Mobile', value: 10, color: '#8b5cf6' },
  ];

  // Peak hours data
  const peakHoursData = [
    { hour: '6-9 AM', earnings: 45, rides: 12 },
    { hour: '9-12 PM', earnings: 32, rides: 8 },
    { hour: '12-3 PM', earnings: 28, rides: 7 },
    { hour: '3-6 PM', earnings: 67, rides: 15 },
    { hour: '6-9 PM', earnings: 89, rides: 18 },
    { hour: '9-12 AM', earnings: 23, rides: 6 },
  ];

  const currentData = earningsData[timeFilter as keyof typeof earningsData];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Earnings Dashboard</h1>
              <p className="text-gray-600">Track your earnings and performance metrics</p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentData.total)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
              <Car className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Rides</p>
              <p className="text-2xl font-bold text-gray-900">{currentData.rides}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{currentData.hours}h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. per Ride</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentData.average)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Earnings Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Earnings</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value: any, name: any) => [
                  name === 'earnings' ? formatCurrency(value) : value,
                  name === 'earnings' ? 'Earnings' : 'Rides'
                ]}
              />
              <Bar dataKey="earnings" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Method Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={paymentBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`${value}%`, 'Percentage']} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {paymentBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peak Hours Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Peak Hours Performance</h2>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={peakHoursData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              formatter={(value: any, name: any) => [
                name === 'earnings' ? formatCurrency(value) : value,
                name === 'earnings' ? 'Earnings' : 'Rides'
              ]}
            />
            <Bar yAxisId="left" dataKey="earnings" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="rides" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Best Day</p>
                <p className="text-sm text-green-600">Friday - {formatCurrency(189.45)}</p>
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Peak Hours</p>
                <p className="text-sm text-blue-600">6-9 PM - {formatCurrency(89)}</p>
              </div>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Avg. Rating</p>
                <p className="text-sm text-yellow-600">4.8/5.0 stars</p>
              </div>
              <div className="text-yellow-600">⭐</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings Tips</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Work During Peak Hours</h3>
                <p className="text-sm text-gray-600">6-9 PM shows the highest earnings potential.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Focus on Weekdays</h3>
                <p className="text-sm text-gray-600">Monday to Friday offer consistent high earnings.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Maintain High Ratings</h3>
                <p className="text-sm text-gray-600">Good ratings lead to more ride requests.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Optimize Your Schedule</h3>
                <p className="text-sm text-gray-600">Plan around your best performing hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <Car className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Ride #{1000 + item}</p>
                  <p className="text-sm text-gray-500">Completed • {formatCurrency(20 + item * 2)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">2 hours ago</p>
                <p className="text-sm font-medium text-green-600">+{formatCurrency(20 + item * 2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarningsDashboard;
