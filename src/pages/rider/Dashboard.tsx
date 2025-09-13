import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCurrentRideQuery, useGetMyRidesQuery } from "@/redux/features";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  Navigation, 
  Clock, 
  MapPin, 
  DollarSign, 
  Car, 
  Star,
  TrendingUp,
  Calendar,
  Activity,
  Route,
  Shield
} from "lucide-react";
import { IRide } from "@/types";

export default function RiderDashboard() {
  const user = useSelector(selectCurrentUser);
  const { data: currentRide, isLoading: currentRideLoading } = useGetCurrentRideQuery();
  const { data: ridesData, isLoading: ridesLoading } = useGetMyRidesQuery({
    limit: 5 // Get recent rides
  });

  const rides = ridesData?.data || [];
  const recentRides = rides.slice(0, 3);

  // Calculate stats
  const totalRides = rides.length;
  const completedRides = rides.filter((ride: IRide) => ride.status === 'completed').length;
  const totalSpent = rides
    .filter((ride: IRide) => ride.status === 'completed')
    .reduce((sum: number, ride: IRide) => sum + ride.fare, 0);
  const avgRating = 4.8; // Mock rating - would come from API

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'accepted': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'picked_up': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'in_transit': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'completed': return 'bg-gray-500/10 text-gray-600 border-gray-200';
      case 'canceled': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'requested': return 'bg-yellow-500';
      case 'accepted': return 'bg-blue-500';
      case 'picked_up': return 'bg-purple-500';
      case 'in_transit': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'canceled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (currentRideLoading || ridesLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-24 w-full rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, idx) => (
            <Skeleton key={idx} className="h-32 w-full rounded-lg" />
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
          Ready for your next ride? Let's get you moving.
        </p>
      </div>

      {/* Current/Active Ride */}
      {currentRide && (
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Car className="h-5 w-5 text-green-600" />
              </div>
              Active Ride 🚗
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="font-medium text-green-700 dark:text-green-300">Ride in progress</p>
                <Badge className={`w-fit ${getStatusColor(currentRide.status)}`}>
                  {currentRide.status.replace('_', ' ').toUpperCase()}
                </Badge>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Started {new Date(currentRide.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link to={`/rides/${currentRide._id}`}>View Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-all duration-200 group border-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                <Navigation className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold">Request New Ride 🚀</div>
                <div className="text-blue-100 text-sm font-normal">Book a ride to your destination</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-white text-blue-600 hover:bg-blue-50">
              <Link to="/rider/request-ride">Book Ride Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 group border-0 bg-gradient-to-br from-green-500 to-teal-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold">My Rides 📋</div>
                <div className="text-green-100 text-sm font-normal">View your ride history and details</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white hover:text-green-600">
              <Link to="/rider/myrides">View All Rides</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-400">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{totalRides}</div>
                <div className="text-sm text-muted-foreground">Total Rides</div>
                <div className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                  <Car className="h-3 w-3" />
                  All time
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Route className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-green-400">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{completedRides}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
                <div className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  Success rate: {totalRides > 0 ? Math.round((completedRides / totalRides) * 100) : 0}%
                </div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-purple-400">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">${totalSpent.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
                <div className="text-xs text-purple-500 mt-1 flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  Avg: ${totalRides > 0 ? (totalSpent / totalRides).toFixed(2) : '0.00'}
                </div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-yellow-400">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1">
                  <div className="text-2xl font-bold text-yellow-600">{avgRating}</div>
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <div className="text-sm text-muted-foreground">Your Rating</div>
                <div className="text-xs text-yellow-500 mt-1">
                  ⭐ Excellent rider
                </div>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Rides */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Recent Rides 🚗
          </CardTitle>
          <CardDescription>
            Your latest ride activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentRides.length > 0 ? (
            <div className="space-y-3">
              {recentRides.map((ride: IRide) => (
                <div key={ride._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusDotColor(ride.status)} animate-pulse`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        Ride on {new Date(ride.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {new Date(ride.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3 sm:mt-0">
                    <div className="text-right">
                      <p className="font-bold text-green-600">${ride.fare.toFixed(2)}</p>
                      <Badge className={`text-xs ${getStatusColor(ride.status)}`}>
                        {ride.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button asChild variant="outline" className="w-full mt-4 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                <Link to="/rider/myrides">View All Rides →</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
                <Car className="h-12 w-12 text-blue-500" />
              </div>
              <p className="text-lg font-medium mb-2">No rides yet 🚗</p>
              <p className="text-muted-foreground mb-6">Start your journey with us today!</p>
              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Link to="/rider/request-ride">Book Your First Ride</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips & Information */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-blue-200 hover:shadow-lg transition-all duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            Riding Tips & Safety 💡
          </CardTitle>
          <CardDescription>
            Make every ride safe and enjoyable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-100 dark:border-blue-800">
              <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <Car className="h-4 w-4" />
                🚗 Before Your Ride
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Check driver details and vehicle info
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Share your trip with family/friends
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Confirm pickup location clearly
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Have your phone charged
                </li>
              </ul>
            </div>
            <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg border border-green-100 dark:border-green-800">
              <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                🛡️ Safety First
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Use the SOS button if needed
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Verify driver and license plate
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Rate your driver after the trip
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Trust your instincts always
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}