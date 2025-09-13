import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEarningsHistoryQuery } from "@/redux/features";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DollarSign, TrendingUp, Calendar, Car, Clock } from "lucide-react";

// Mock data for demonstration - would come from API
const mockEarningsData = [
  { day: 'Mon', earnings: 45.50, rides: 3 },
  { day: 'Tue', earnings: 67.20, rides: 4 },
  { day: 'Wed', earnings: 89.10, rides: 6 },
  { day: 'Thu', earnings: 52.30, rides: 3 },
  { day: 'Fri', earnings: 95.40, rides: 7 },
  { day: 'Sat', earnings: 120.80, rides: 8 },
  { day: 'Sun', earnings: 78.60, rides: 5 },
];

const mockPaymentBreakdown = [
  { name: 'Cash', value: 60, amount: 234.50 },
  { name: 'Card', value: 25, amount: 98.20 },
  { name: 'Mobile', value: 15, amount: 58.90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const EarningsHistory = () => {
  const [timeRange, setTimeRange] = useState('week');
  const { data, isLoading, isError } = useEarningsHistoryQuery(undefined);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Earnings Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">Failed to load earnings data</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const totalEarnings = data?.totalEarnings || 0;
  const totalRides = data?.count || 0;
  const todayEarnings = mockEarningsData[mockEarningsData.length - 1]?.earnings || 0;
  const avgEarningsPerRide = totalRides > 0 ? totalEarnings / totalRides : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Earnings Dashboard 💰</h1>
          <p className="text-muted-foreground mt-1">
            Track your performance and earnings over time
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${totalEarnings.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Total Earnings</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Car className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{totalRides}</div>
            <div className="text-sm text-muted-foreground">Total Rides</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600">
              ${todayEarnings.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Today's Earnings</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600">
              ${avgEarningsPerRide.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Avg per Ride</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Earnings</CardTitle>
            <CardDescription>Your earnings breakdown for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockEarningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`$${value}`, name === 'earnings' ? 'Earnings' : 'Rides']}
                />
                <Bar dataKey="earnings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Method Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Breakdown of earnings by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockPaymentBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockPaymentBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Ride Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Ride Performance</CardTitle>
          <CardDescription>Number of rides completed each day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockEarningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Rides']} />
              <Line type="monotone" dataKey="rides" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Rides History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Rides
          </CardTitle>
          <CardDescription>
            Your latest completed rides
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data?.rides && data.rides.length > 0 ? (
            <div className="space-y-4">
              {data.rides.slice(0, 5).map((ride: any) => (
                <div
                  key={ride._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {ride.rider?.name || 'Passenger'}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({ride.rider?.email})
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed: {new Date(ride.completedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      ${ride.price}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        ride.paymentMethod === 'cash' 
                          ? 'border-green-500 text-green-600' 
                          : ride.paymentMethod === 'card'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-purple-500 text-purple-600'
                      }`}
                    >
                      {ride.paymentMethod?.toUpperCase() || 'N/A'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No rides completed yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start accepting rides to see your earnings history
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsHistory;
