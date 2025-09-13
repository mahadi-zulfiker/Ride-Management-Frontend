import RideCard from "@/components/rideCard";
import { useCancelRideMutation, useGetMyRidesQuery } from "@/redux/features";
import { selectIsAuthenticated, selectCurrentUser } from "@/redux/features";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Car, Plus, Calendar, Route } from "lucide-react";

const Myrides = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, error } = useGetMyRidesQuery(undefined, {
    skip: !isAuthenticated
  });
  const [cancelRide] = useCancelRideMutation();

  const handleCancel = async (id: string) => {
    try {
      await cancelRide(id).unwrap();
      toast.success("Ride cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel ride");
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
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

  if (error) {
    return (
      <div className="p-4 lg:p-6">
        <Card className="border-red-200">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">❌ Failed to load your rides</div>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const rides = data?.data || [];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
          <Route className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
          My Ride History 🚗
        </h1>
        <p className="text-muted-foreground mt-1">
          Track all your rides and trip history, {user?.name}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{rides.length}</div>
            <div className="text-sm text-muted-foreground">Total Rides</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {rides.filter((r: any) => r.status === 'completed').length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${rides.filter((r: any) => r.status === 'completed').reduce((sum: number, r: any) => sum + r.fare, 0).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
      </div>

      {/* Rides List */}
      {rides.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
              <Car className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No rides yet! 🚗</h3>
            <p className="text-muted-foreground mb-6">
              Start your journey with us. Book your first ride today!
            </p>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Link to="/rider/request-ride">
                <Plus className="mr-2 h-4 w-4" />
                Book Your First Ride
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Your Rides ({rides.length})</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/rider/request-ride">
                <Plus className="mr-2 h-4 w-4" />
                Book New Ride
              </Link>
            </Button>
          </div>
          
          {rides.map((ride: any) => (
            <RideCard key={ride._id} ride={ride} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Myrides;
