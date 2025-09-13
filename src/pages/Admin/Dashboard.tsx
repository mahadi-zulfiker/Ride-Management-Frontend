import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetAllUsersQuery, useGetAllRidesQuery, useGetAnalyticsQuery } from "@/redux/features";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  Users, 
  Car, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Activity,
  BarChart3,
  Shield,
  AlertTriangle
} from "lucide-react";
import { IRide, IUser } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const user = useSelector(selectCurrentUser);
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({ limit: 10 });
  const { data: ridesData, isLoading: ridesLoading } = useGetAllRidesQuery({ limit: 10 });
  const { data: analyticsData, isLoading: analyticsLoading } = useGetAnalyticsQuery();

  const users = usersData?.data || [];
  const rides = ridesData?.data || [];

  // Calculate stats
  const totalUsers = users.length;
  const totalDrivers = users.filter((u: IUser) => u.role === 'driver').length;
  const totalRiders = users.filter((u: IUser) => u.role === 'rider').length;
  const pendingDrivers = users.filter((u: IUser) => u.role === 'driver' && !u.isApproved).length;
  const blockedUsers = users.filter((u: IUser) => u.isBlocked).length;

  const totalRides = rides.length;
  const completedRides = rides.filter((r: IRide) => r.status === 'completed').length;
  const activeRides = rides.filter((r: IRide) => ['accepted', 'picked_up', 'in_transit'].includes(r.status)).length;
  const totalRevenue = rides
    .filter((r: IRide) => r.status === 'completed')
    .reduce((sum: number, r: IRide) => sum + r.fare, 0);

  const recentRides = rides.slice(0, 5);
  const recentUsers = users.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested': return 'bg-yellow-500/10 text-yellow-600';
      case 'accepted': return 'bg-blue-500/10 text-blue-600';
      case 'picked_up': return 'bg-indigo-500/10 text-indigo-600';
      case 'in_transit': return 'bg-purple-500/10 text-purple-600';
      case 'completed': return 'bg-green-500/10 text-green-600';
      case 'canceled': return 'bg-red-500/10 text-red-600';
      default: return 'bg-gray-500/10 text-gray-600';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-500/10 text-purple-600';
      case 'driver': return 'bg-blue-500/10 text-blue-600';
      case 'rider': return 'bg-green-500/10 text-green-600';
      default: return 'bg-gray-500/10 text-gray-600';
    }
  };

  if (usersLoading || ridesLoading || analyticsLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton key={idx} className="h-24 w-full rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, idx) => (
            <Skeleton key={idx} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, {user?.name}! 👋</h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your ride management platform today.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalRiders} riders, {totalDrivers} drivers
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                <p className="text-2xl font-bold">{totalRides}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {completedRides} completed
                </p>
              </div>
              <Car className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  From completed rides
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Rides</p>
                <p className="text-2xl font-bold">{activeRides}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  In progress now
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div>
                <p className="font-medium">Pending Drivers</p>
                <p className="text-sm text-muted-foreground">Awaiting approval</p>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {pendingDrivers}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div>
                <p className="font-medium">Blocked Users</p>
                <p className="text-sm text-muted-foreground">Need attention</p>
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {blockedUsers}
              </Badge>
            </div>

            <Link to="/admin/all-users" className="block">
              <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <p className="font-medium text-blue-600">Manage Users →</p>
                <p className="text-sm text-muted-foreground">Review pending drivers</p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{completedRides}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{activeRides}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{totalDrivers}</p>
                <p className="text-xs text-muted-foreground">Drivers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">{totalRiders}</p>
                <p className="text-xs text-muted-foreground">Riders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Rides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Recent Rides
            </CardTitle>
            <CardDescription>Latest ride activity on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRides.length > 0 ? recentRides.map((ride: IRide) => (
                <div key={ride._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{ride.rider?.name || 'Unknown'}</span>
                      <Badge className={`text-xs px-2 py-1 ${getStatusColor(ride.status)}`}>
                        {ride.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      ${ride.fare.toFixed(2)} • {new Date(ride.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-center text-muted-foreground py-4">No recent rides</p>
              )}
            </div>
            <Link to="/admin/all-rides" className="block mt-4">
              <div className="text-center p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                View All Rides →
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Users
            </CardTitle>
            <CardDescription>New user registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.length > 0 ? recentUsers.map((user: IUser) => (
                <div key={user._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs px-2 py-1 ${getRoleColor(user.role)}`}>
                      {user.role}
                    </Badge>
                    {user.role === 'driver' && !user.isApproved && (
                      <Badge variant="outline" className="text-amber-600 border-amber-300">
                        Pending
                      </Badge>
                    )}
                    {user.isBlocked && (
                      <Badge variant="destructive" className="text-xs">
                        Blocked
                      </Badge>
                    )}
                  </div>
                </div>
              )) : (
                <p className="text-center text-muted-foreground py-4">No recent users</p>
              )}
            </div>
            <Link to="/admin/all-users" className="block mt-4">
              <div className="text-center p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                Manage All Users →
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/admin/analytics">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="font-medium">View Analytics</p>
              <p className="text-sm text-muted-foreground">Detailed insights</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/all-users">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="font-medium">User Management</p>
              <p className="text-sm text-muted-foreground">Manage all users</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/all-rides">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Car className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="font-medium">Ride Oversight</p>
              <p className="text-sm text-muted-foreground">Monitor all rides</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="font-medium">Security</p>
            <p className="text-sm text-muted-foreground">System health</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}