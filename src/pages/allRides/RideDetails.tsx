import { useGetRideDetailsQuery } from "@/redux/features";
import { selectCurrentUser } from "@/redux/features";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, DollarSign, Clock, User, Car, Route, Calendar, CreditCard } from "lucide-react";

const RideDetails = () => {
  const navigate = useNavigate();
  const { rideId } = useParams<{ rideId: string }>();
  const currentUser = useSelector(selectCurrentUser);
  const { data, isLoading, isError } = useGetRideDetailsQuery(rideId!, {
    skip: !currentUser || !rideId
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  if (isError || !data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
        <Card className="border-red-200 bg-red-50/30">
          <CardContent className="p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">Failed to Load Ride Details</h2>
            <p className="text-red-600">The ride information could not be retrieved. Please try again later.</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const ride = data;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "canceled":
        return "bg-red-500/10 text-red-600 border-red-200";
      case "in_transit":
        return "bg-purple-500/10 text-purple-600 border-purple-200";
      case "picked_up":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "accepted":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ride Details
              </h1>
              <p className="text-muted-foreground">#{ride._id?.slice(-8) || 'Unknown'}</p>
            </div>
          </div>
          <Badge
            className={`${getStatusColor(ride.status)} px-4 py-2 rounded-full text-sm font-semibold border`}
          >
            {ride.status?.replace('_', ' ').toUpperCase() || "UNKNOWN"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ride Overview */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Route className="w-5 h-5 text-blue-500" />
                Trip Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">Pickup Location</p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {ride.pickupLocation
                        ? `${ride.pickupLocation.latitude.toFixed(4)}, ${ride.pickupLocation.longitude.toFixed(4)}`
                        : "Not available"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-300">Destination</p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {ride.destinationLocation
                        ? `${ride.destinationLocation.latitude.toFixed(4)}, ${ride.destinationLocation.longitude.toFixed(4)}`
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fare</p>
                    <p className="font-semibold">${ride.fare?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Payment</p>
                    <p className="font-semibold capitalize">
                      {ride.paymentMethod || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Requested At</p>
                  <p className="font-semibold text-sm">
                    {ride.createdAt
                      ? new Date(ride.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Information */}
          <div className="space-y-6">
            {/* Driver Info */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Car className="w-5 h-5 text-green-500" />
                  Driver Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ride.driver ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{ride.driver.name || "Unknown Driver"}</p>
                        <p className="text-sm text-muted-foreground">{ride.driver.email || "No email provided"}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Car className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-muted-foreground">No driver assigned yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Rider Info */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5 text-blue-500" />
                  Rider Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{ride.rider?.name || "Unknown Rider"}</p>
                      <p className="text-sm text-muted-foreground">{ride.rider?.email || "No email provided"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              Ride Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ride.statusHistory?.length > 0 ? (
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                <div className="space-y-6">
                  {ride.statusHistory.map((event: any, idx: number) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                        idx === 0 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                          : 'bg-white border-2 border-gray-200 text-gray-600'
                      }`}>
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold capitalize">
                            {event.status?.replace('_', ' ') || 'Unknown Status'}
                          </h4>
                          <span className="text-sm text-muted-foreground">
                            {event.timestamp 
                              ? new Date(event.timestamp).toLocaleString()
                              : "Time not recorded"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {getStatusDescription(event.status)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600">No timeline events available</p>
                <p className="text-muted-foreground">Timeline will appear as the ride progresses</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const getStatusDescription = (status: string) => {
  switch (status) {
    case 'requested':
      return 'Ride request submitted and waiting for driver acceptance';
    case 'accepted':
      return 'Driver has accepted the ride and is on the way';
    case 'picked_up':
      return 'Driver has arrived and picked up the passenger';
    case 'in_transit':
      return 'Currently en route to destination';
    case 'completed':
      return 'Ride successfully completed';
    case 'canceled':
      return 'Ride was canceled';
    default:
      return 'Status update';
  }
};

export default RideDetails;
