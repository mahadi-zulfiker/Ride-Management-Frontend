import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  useSetAvailabilityMutation, 
  useGetAvailableRidesQuery, 
  useGetEarningsQuery,
  useAcceptRideMutation,
  useUpdateRideStatusMutation
} from "@/redux/features";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { 
  Car, 
  DollarSign, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp,
  Navigation,
  Phone,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { IRide } from "@/types";

export default function DriverDashboard() {
  const user = useSelector(selectCurrentUser);
  const [isOnline, setIsOnline] = useState(user?.isOnline || false);
  
  // Sync local state with user state when user data changes
  useEffect(() => {
    if (user?.isOnline !== undefined) {
      setIsOnline(user.isOnline);
    }
  }, [user?.isOnline]);
  
  const [setAvailability] = useSetAvailabilityMutation();
  const [acceptRide] = useAcceptRideMutation();
  const [updateRideStatus] = useUpdateRideStatusMutation();
  
  const { data: availableRides, refetch: refetchRides, error: ridesError, isError: isRidesError } = useGetAvailableRidesQuery(undefined, {
    skip: !isOnline || !user?.isApproved,
    pollingInterval: isOnline && user?.isApproved ? 10000 : 0, // Poll every 10 seconds when online and approved
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true
  });
  
  const { data: earningsData } = useGetEarningsQuery();

  const rides = availableRides || [];
  const earnings = earningsData || { totalEarnings: 0, totalRides: 0, todayEarnings: 0 };

  const handleAvailabilityToggle = async (online: boolean) => {
    try {
      const result = await setAvailability({
        isOnline: online
      }).unwrap();
      
      setIsOnline(online);
      toast.success(`You are now ${online ? 'online' : 'offline'}`);
      
      // Update user in Redux state if returned
      if (result?.user) {
        // Optionally dispatch to update user state
        console.log('Updated user:', result.user);
      }
      
      if (online) {
        // Refetch rides when going online
        setTimeout(() => refetchRides(), 1000);
      }
    } catch (error: any) {
      console.error("Failed to update availability:", error);
      toast.error(error?.data?.message || "Failed to update availability");
      // Reset toggle on error
      setIsOnline(!online);
    }
  };

  const handleAcceptRide = async (rideId: string) => {
    try {
      const result = await acceptRide(rideId).unwrap();
      toast.success("Ride accepted successfully!");
      console.log('Accept ride result:', result);
      
      // Refetch rides to update the list
      setTimeout(() => refetchRides(), 1000);
    } catch (error: any) {
      console.error("Failed to accept ride:", error);
      const errorMessage = error?.data?.message || error?.message || "Failed to accept ride";
      toast.error(errorMessage);
    }
  };

  const handleUpdateStatus = async (rideId: string, status: IRide["status"]) => {
    try {
      console.log('Updating ride status:', { rideId, status });
      const result = await updateRideStatus({ rideId, status }).unwrap();
      toast.success(`Ride status updated to ${status.replace('_', ' ')}`);
      console.log('Update status result:', result);
      
      // Refetch rides to update the list
      setTimeout(() => refetchRides(), 1000);
    } catch (error: any) {
      console.error("Failed to update ride status:", error);
      
      // More detailed error handling
      let errorMessage = "Failed to update ride status";
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status) {
        errorMessage = `API Error: ${error.status}`;
      }
      
      toast.error(errorMessage);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested': return 'bg-yellow-500';
      case 'accepted': return 'bg-blue-500';
      case 'picked_up': return 'bg-purple-500';
      case 'in_transit': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getNextStatus = (currentStatus: string): IRide["status"] | null => {
    switch (currentStatus) {
      case 'accepted': return 'picked_up';
      case 'picked_up': return 'in_transit';
      case 'in_transit': return 'completed';
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'picked_up': return 'Mark as Picked Up';
      case 'in_transit': return 'Mark as In Transit';
      case 'completed': return 'Mark as Completed';
      default: return 'Update Status';
    }
  };

  // Check if driver is approved
  if (!user?.isApproved) {
    return (
      <div className="p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your driver account is pending approval. You cannot accept rides until your account is approved by an admin.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, {user?.name}! 🚗</h1>
        <p className="text-muted-foreground mt-1">
          {isOnline ? "You're online and ready to accept rides" : "Go online to start receiving ride requests"}
        </p>
      </div>

      {/* Availability Toggle */}
      <Card className={`border-l-4 transition-all duration-200 ${
        isOnline ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/20' : 'border-l-gray-300 bg-gray-50/50 dark:bg-gray-900/20'
      }`}>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Driver Status
            </div>
            <Badge 
              variant={isOnline ? "default" : "secondary"} 
              className={`${isOnline ? "bg-green-500 hover:bg-green-600" : ""} w-fit`}
            >
              {isOnline ? "🟢 Online" : "🔴 Offline"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Toggle your availability to receive ride requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isOnline}
                onCheckedChange={handleAvailabilityToggle}
              />
              <span className="font-medium">
                {isOnline ? "Available for rides" : "Not accepting rides"}
              </span>
            </div>
            {!isOnline && (
              <p className="text-sm text-muted-foreground">
                💡 Turn on availability to start earning
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-6 w-6 text-green-600 mr-2" />
              <div className="text-2xl font-bold text-green-600">
                ${earnings.totalEarnings?.toFixed(2) || "0.00"}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Total Earnings</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Car className="h-6 w-6 text-blue-600 mr-2" />
              <div className="text-2xl font-bold text-blue-600">
                {earnings.totalRides || 0}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Total Rides</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
              <div className="text-2xl font-bold text-purple-600">
                ${earnings.todayEarnings?.toFixed(2) || "0.00"}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Today's Earnings</div>
          </CardContent>
        </Card>
      </div>

      {/* Available Rides / Incoming Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            {isOnline ? "Available Rides" : "Go Online to See Requests"}
          </CardTitle>
          <CardDescription>
            {isOnline 
              ? "Accept ride requests from nearby passengers" 
              : "Toggle availability to start receiving ride requests"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isOnline ? (
            <div className="text-center py-8">
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">You're currently offline</p>
              <Button onClick={() => handleAvailabilityToggle(true)}>
                Go Online
              </Button>
            </div>
          ) : isRidesError || ridesError ? (
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">
                Failed to load rides
                {ridesError && typeof ridesError === 'object' && 'data' in ridesError && ridesError.data ? 
                  `: ${(ridesError.data as any).message || 'Please check your connection'}` :
                  '. Please check your connection.'}
              </div>
              <Button onClick={refetchRides} variant="outline">
                Retry
              </Button>
            </div>
          ) : rides.length > 0 ? (
            <div className="space-y-4">
              {rides.map((ride: IRide) => (
                <div key={ride._id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(ride.status)}`} />
                        <span className="font-medium text-lg">
                          👤 {ride.rider?.name || "Passenger"}
                        </span>
                        <Badge variant="secondary" className="text-xs">{ride.status.replace('_', ' ')}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <MapPin className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="text-xs text-muted-foreground">Pickup</p>
                            <p className="text-sm font-medium">Lat {ride.pickupLocation.latitude.toFixed(4)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="text-xs text-muted-foreground">Drop-off</p>
                            <p className="text-sm font-medium">Lat {ride.destinationLocation.latitude.toFixed(4)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-xs text-muted-foreground">Fare</p>
                            <p className="text-sm font-bold text-green-600">${ride.fare.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-xs text-muted-foreground">Requested</p>
                            <p className="text-sm font-medium">{new Date(ride.createdAt).toLocaleTimeString()}</p>
                          </div>
                        </div>
                      </div>

                      {(ride.rider as any)?.phone && (
                        <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg w-fit">
                          <Phone className="h-4 w-4 text-amber-600" />
                          <div>
                            <p className="text-xs text-muted-foreground">Contact</p>
                            <p className="text-sm font-medium">{(ride.rider as any).phone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 lg:ml-4 lg:w-32">
                      {ride.status === 'requested' && (
                        <Button 
                          onClick={() => handleAcceptRide(ride._id)}
                          size="sm"
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          ✅ Accept Ride
                        </Button>
                      )}
                      
                      {['accepted', 'picked_up', 'in_transit'].includes(ride.status) && (
                        <Button 
                          onClick={() => {
                            const nextStatus = getNextStatus(ride.status);
                            if (nextStatus) {
                              handleUpdateStatus(ride._id, nextStatus);
                            }
                          }}
                          size="sm"
                          variant="outline"
                          className="w-full"
                        >
                          {getStatusLabel(getNextStatus(ride.status) || '')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No ride requests available</p>
              <p className="text-sm text-muted-foreground mt-1">
                Stay online to receive requests as they come in
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Earnings Details
            </CardTitle>
            <CardDescription>
              View detailed earnings and ride history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Earnings History
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-500" />
              My Rides
            </CardTitle>
            <CardDescription>
              View accepted and completed rides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Ride History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Driver Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Driver Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">🚗 Maximize Earnings</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Stay online during peak hours</li>
                <li>• Accept rides promptly for better ratings</li>
                <li>• Keep your vehicle clean and maintained</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🛡️ Safety Guidelines</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Verify passenger details before pickup</li>
                <li>• Follow traffic rules and drive safely</li>
                <li>• Use the emergency button if needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}