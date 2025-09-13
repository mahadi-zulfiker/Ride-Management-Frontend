import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetStatsQuery } from "@/redux/features";
import { TrendingUp, DollarSign, Users, Car, Calendar, BarChart3 } from "lucide-react";

export default function Analytics() {
  const { data: analytics, isLoading, isError } = useGetStatsQuery();

  if (isLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        <Skeleton className="h-8 w-64 mx-auto mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 text-lg mb-2">⚠️ Failed to load analytics</div>
        <p className="text-muted-foreground">Please try refreshing the page or contact support if the issue persists.</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-500 text-lg mb-2">📊 No Analytics Available</div>
        <p className="text-muted-foreground">Analytics data will appear here once there's activity on the platform.</p>
      </div>
    );
  }

  const { rideVolume = [], revenueTrends = [], driverActivity = [] } = analytics;

  // Calculate aggregated metrics
  const totalRides = rideVolume.reduce((sum: number, item: any) => sum + item.count, 0);
  const totalRevenue = revenueTrends.reduce((sum: number, item: any) => sum + item.revenue, 0);
  const avgRevenuePerDay = revenueTrends.length > 0 ? totalRevenue / revenueTrends.length : 0;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">📊 Analytics Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive insights into your ride management platform</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                <p className="text-2xl font-bold">{totalRides.toLocaleString()}</p>
              </div>
              <Car className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Drivers</p>
                <p className="text-2xl font-bold">{driverActivity.length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Daily Revenue</p>
                <p className="text-2xl font-bold">${avgRevenuePerDay.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ride Volume */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Daily Ride Volume
            </CardTitle>
            <CardDescription>Number of rides per day</CardDescription>
          </CardHeader>
          <CardContent>
            {rideVolume.length > 0 ? (
              <div className="space-y-3">
                {rideVolume.slice(-7).map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{new Date(item._id).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{item.count}</span>
                      <span className="text-sm text-muted-foreground">rides</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No ride data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trends
            </CardTitle>
            <CardDescription>Daily revenue from completed rides</CardDescription>
          </CardHeader>
          <CardContent>
            {revenueTrends.length > 0 ? (
              <div className="space-y-3">
                {revenueTrends.slice(-7).map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{new Date(item._id).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">${item.revenue.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No revenue data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Driver Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Top Performing Drivers
          </CardTitle>
          <CardDescription>Drivers ranked by completed rides and revenue</CardDescription>
        </CardHeader>
        <CardContent>
          {driverActivity.length > 0 ? (
            <div className="space-y-3">
              {driverActivity.slice(0, 10).map((driver: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{driver.name || 'Unknown Driver'}</p>
                      <p className="text-sm text-muted-foreground">
                        {driver.count} rides completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ${driver.revenue.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ${(driver.revenue / driver.count).toFixed(2)} avg
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No driver activity data available</p>
              <p className="text-sm mt-1">Driver performance will appear here once rides are completed</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Card */}
      {(rideVolume.length > 0 || revenueTrends.length > 0) && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle>📈 Platform Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{totalRides}</p>
                <p className="text-sm text-muted-foreground">Total Rides</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{driverActivity.length}</p>
                <p className="text-sm text-muted-foreground">Active Drivers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
