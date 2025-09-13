import { useGetAllRidesQuery, useGetAvailableRidesQuery } from "@/redux/features";
import { selectIsAuthenticated, selectCurrentUser } from "@/redux/features";
import { useSelector } from "react-redux";
import RideCard from "@/components/rideCard";
import RideRequestModal from "@/components/RideRequestModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Navigation, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AllRides = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userData = useSelector(selectCurrentUser);
  const role = userData?.role;
  
  // Use different queries based on user role
  const { data: adminRidesResponse, isLoading: isLoadingAdmin, isError: isErrorAdmin } = useGetAllRidesQuery(undefined, { 
    skip: !isAuthenticated || role !== 'admin'
  });
  
  // For drivers, get available rides
  const { data: driverRidesResponse, isLoading: isLoadingDriver, isError: isErrorDriver, error: driverError } = useGetAvailableRidesQuery(undefined, {
    skip: !isAuthenticated || role !== 'driver'
  });
   
  const finalLoading = role === 'admin' ? isLoadingAdmin : isLoadingDriver;
  const finalError = role === 'admin' ? isErrorAdmin : isErrorDriver;
  
  // Handle different response formats
  let rides = [];
  if (role === 'admin') {
    rides = adminRidesResponse?.data || [];
  } else if (role === 'driver') {
    // Handle driver rides response which can be array or object
    if (Array.isArray(driverRidesResponse)) {
      rides = driverRidesResponse;
    } else if (driverRidesResponse && typeof driverRidesResponse === 'object') {
      rides = (driverRidesResponse as any)?.data || [];
    } else {
      rides = [];
    }
  }
   
  if (finalLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (finalError) {
    console.error('Error fetching rides:', role === 'admin' ? adminRidesResponse : driverError);
    
    // Handle authentication errors specifically
    const isAuthError = (role === 'driver' && driverError && 
                        typeof driverError === 'object' && 
                        'status' in driverError && 
                        driverError.status === 401);
    
    if (isAuthError) {
      return (
        <div className="p-4 lg:p-6">
          <Card className="border-orange-200">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <div className="text-orange-600 mb-4">
                Authentication required. Please refresh the page or login again.
              </div>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => window.location.reload()} variant="outline">
                  Refresh Page
                </Button>
                <Button onClick={() => window.location.href = '/login'}>
                  Login Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    return (
      <div className="p-4 lg:p-6">
        <Card className="border-red-200">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <div className="text-red-500 mb-4">
              Error fetching rides. 
              {role === 'driver' && driverError && typeof driverError === 'object' && 'data' in driverError && driverError.data ? 
                (driverError.data as any).message || 'Please check your connection and try again.' :
                'Please try again.'
              }
            </div>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const title = role === "driver" ? "Available Rides" : "All Rides";
  const description = role === "driver" 
    ? "Accept ride requests from passengers" 
    : "Overview of all rides in the system";

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
          {role === "driver" ? (
            <Navigation className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
          ) : (
            <Car className="h-6 w-6 lg:h-8 lg:w-8 text-purple-500" />
          )}
          {title} {role === "driver" ? "🚕" : "🚗"}
        </h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      
      {rides.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
              <Car className="h-12 w-12 text-blue-500" />
            </div>
            {role === "driver" ? (
              <>
                <h3 className="text-xl font-semibold mb-2">No rides available 🚕</h3>
                <p className="text-muted-foreground mb-6">
                  No ride requests at the moment. Stay online to receive new requests!
                </p>
                <Button asChild>
                  <Link to="/driver/dashboard">
                    <Navigation className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2">No rides found 🚗</h3>
                <p className="text-muted-foreground">All rides will appear here once users start booking.</p>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold">{title} ({rides.length})</h2>
            </div>
          </div>
          
          <div className="space-y-4">
            {rides.map((ride: any) => (
              <RideCard key={ride._id} ride={ride} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRides;
