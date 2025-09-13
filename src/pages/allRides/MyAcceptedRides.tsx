import { useGetCurrentRideQuery, useUpdateRideStatusMutation } from "@/redux/features";
import { selectCurrentUser, selectIsAuthenticated } from "@/redux/features";
import { useSelector } from "react-redux";
import RideCard from "@/components/rideCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; 
import { IRide } from "@/types";
import { Car, RefreshCw, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

const MyAcceptedRides = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userData = useSelector(selectCurrentUser);
  
  // Use getCurrentRide for drivers since getDriverRides is admin-only in the backend
  const { data: currentRide, isLoading, isError, refetch } = useGetCurrentRideQuery(undefined, {
    skip: !isAuthenticated || !userData?._id || userData?.role !== 'driver'
  });
  const [updateRideStatus, { isLoading: isUpdating }] = useUpdateRideStatusMutation();

  // If there's a current ride for the driver, put it in an array for consistency
  const myRides = currentRide ? [currentRide] : [];

  const handleStatusChange = async (rideId: string, newStatus: IRide["status"]) => {
    try {
      // Validate status transition before making API call
      const validNextStatuses = ["picked_up", "in_transit", "completed"];
      if (!validNextStatuses.includes(newStatus)) {
        toast.error(`Invalid status: ${newStatus}`);
        return;
      }
      
      console.log('Updating ride status:', { rideId, newStatus, driverId: userData?._id });
      await updateRideStatus({ rideId, status: newStatus }).unwrap();
      toast.success(`Ride status updated to ${newStatus.replace('_', ' ')}`);
      refetch(); // refresh the rides after update
    } catch (err: any) {
      console.error('Status update error:', err);
      const errorMessage = err?.data?.message || err?.message || "Failed to update status";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Car className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Active Rides</h1>
            </div>
            <Button variant="outline" size="sm" disabled>
              <RefreshCw className="w-4 h-4 mr-2" />
              Loading...
            </Button>
          </div>
          <div className="grid gap-6">
            {Array.from({ length: 2 }).map((_, idx) => (
              <Skeleton key={idx} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <Car className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Active Rides</h1>
          </div>
          <Card className="border-red-200 bg-red-50/30">
            <CardContent className="p-8 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-red-700 mb-2">Failed to Load Rides</h2>
              <p className="text-red-600 mb-4">Unable to fetch your active rides. Please try again.</p>
              <Button onClick={() => refetch()} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (!myRides || myRides.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Car className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Active Rides</h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="text-8xl mb-6">🚗</div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">No Active Rides</h2>
              <p className="text-lg text-gray-600 mb-6">You don't have any accepted rides at the moment.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/driver/all-rides">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105">
                    <Navigation className="w-4 h-4 mr-2" />
                    Find Available Rides
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => refetch()}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Car className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Active Rides ({myRides.length})
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        
        <div className="grid gap-6">
          {myRides.map((ride: IRide) => (
            <div key={ride._id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-xl overflow-hidden">
              <RideCard ride={ride}>
                {/* Enhanced Status update buttons */}
                <div className="flex flex-wrap gap-3 mt-4 p-4 bg-gray-50/50 rounded-lg">
                  {ride.status === "accepted" && (
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50"
                      onClick={() => handleStatusChange(ride._id, "picked_up")}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Car className="w-4 h-4 mr-2" />
                          Mark Picked Up
                        </>
                      )}
                    </Button>
                  )}
                  {ride.status === "picked_up" && (
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50"
                      onClick={() => handleStatusChange(ride._id, "in_transit")}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Navigation className="w-4 h-4 mr-2" />
                          Mark In Transit
                        </>
                      )}
                    </Button>
                  )}
                  {ride.status === "in_transit" && (
                    <Button
                      size="sm"
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50"
                      onClick={() => handleStatusChange(ride._id, "completed")}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          ✓ Complete Ride
                        </>
                      )}
                    </Button>
                  )}
                  
                  {/* Ride details button */}
                  <Link to={`/rides/${ride._id}`}>
                    <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
                      View Details
                    </Button>
                  </Link>
                </div>
              </RideCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAcceptedRides;
