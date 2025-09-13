import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Navigation, CreditCard, Clock, DollarSign } from "lucide-react";
import { useEstimateFareMutation, useRequestRideMutation } from "@/redux/features";

const rideRequestSchema = z.object({
  pickupAddress: z.string().min(5, "Pickup address is required"),
  pickupLat: z.number().min(-90).max(90),
  pickupLng: z.number().min(-180).max(180),
  destinationAddress: z.string().min(5, "Destination address is required"),
  destinationLat: z.number().min(-90).max(90),
  destinationLng: z.number().min(-180).max(180),
  paymentMethod: z.enum(["cash", "card", "mobile"]),
});

type RideRequestData = z.infer<typeof rideRequestSchema>;

export default function RideRequest() {
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  
  const [estimateFare] = useEstimateFareMutation();
  const [requestRide, { isLoading: isRequesting }] = useRequestRideMutation();
  
  const form = useForm<RideRequestData>({
    resolver: zodResolver(rideRequestSchema),
    defaultValues: {
      pickupAddress: "",
      pickupLat: 23.8103, // Default to Dhaka
      pickupLng: 90.4125,
      destinationAddress: "",
      destinationLat: 23.8103,
      destinationLng: 90.4125,
      paymentMethod: "cash",
    },
  });

  // Mock geocoding function - in real app, use Google Maps or similar
  const geocodeAddress = async (address: string) => {
    // Simulate geocoding with random coordinates around Dhaka
    const lat = 23.8103 + (Math.random() - 0.5) * 0.1;
    const lng = 90.4125 + (Math.random() - 0.5) * 0.1;
    return { lat, lng };
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("pickupLat", position.coords.latitude);
          form.setValue("pickupLng", position.coords.longitude);
          form.setValue("pickupAddress", "Current Location");
          toast.success("Location detected");
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Failed to get current location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  const handleEstimateFare = async () => {
    const formData = form.getValues();
    
    if (!formData.pickupAddress || !formData.destinationAddress) {
      toast.error("Please enter both pickup and destination addresses");
      return;
    }

    setIsEstimating(true);
    try {
      // Geocode addresses if needed
      if (formData.pickupAddress !== "Current Location") {
        const pickupCoords = await geocodeAddress(formData.pickupAddress);
        form.setValue("pickupLat", pickupCoords.lat);
        form.setValue("pickupLng", pickupCoords.lng);
      }
      
      const destCoords = await geocodeAddress(formData.destinationAddress);
      form.setValue("destinationLat", destCoords.lat);
      form.setValue("destinationLng", destCoords.lng);

      const result = await estimateFare({
        pickup: {
          latitude: form.getValues("pickupLat"),
          longitude: form.getValues("pickupLng")
        },
        destination: {
          latitude: form.getValues("destinationLat"),
          longitude: form.getValues("destinationLng")
        }
      }).unwrap();

      setEstimatedFare(result.fare);
      toast.success("Fare estimated successfully");
    } catch (error) {
      console.error("Fare estimation error:", error);
      toast.error("Failed to estimate fare");
    } finally {
      setIsEstimating(false);
    }
  };

  const onSubmit = async (data: RideRequestData) => {
    if (!estimatedFare) {
      toast.error("Please estimate fare first");
      return;
    }

    try {
      await requestRide({
        pickup: {
          latitude: data.pickupLat,
          longitude: data.pickupLng
        },
        destination: {
          latitude: data.destinationLat,
          longitude: data.destinationLng
        },
        paymentMethod: data.paymentMethod
      }).unwrap();

      toast.success("Ride requested successfully! Looking for a driver...");
      form.reset();
      setEstimatedFare(null);
    } catch (error: any) {
      console.error("Ride request error:", error);
      toast.error(error?.data?.message || "Failed to request ride");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6 space-y-6">
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Navigation className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xl font-bold">Request a Ride 🚗</div>
              <div className="text-sm text-muted-foreground font-normal">Enter your pickup and destination to request a ride</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Pickup Location */}
              <div className="space-y-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-700 dark:text-green-300">Pickup Location 📍</h3>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <FormField
                    control={form.control}
                    name="pickupAddress"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Pickup Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter pickup address"
                            {...field}
                            className="border-green-200 focus:border-green-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    className="mt-8 sm:mt-8 whitespace-nowrap border-green-300 text-green-600 hover:bg-green-50"
                  >
                    Use Current 📍
                  </Button>
                </div>
              </div>

              {/* Destination Location */}
              <div className="space-y-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <MapPin className="h-4 w-4 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-red-700 dark:text-red-300">Destination 🎯</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="destinationAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter destination address"
                          {...field}
                          className="border-red-200 focus:border-red-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Payment Method */}
              <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                          <CreditCard className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="font-semibold text-purple-700 dark:text-purple-300">Payment Method 💳</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-purple-200 focus:border-purple-400">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cash">
                            <div className="flex items-center gap-2">
                              💰 <span>Cash Payment</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="card">
                            <div className="flex items-center gap-2">
                              💳 <span>Credit/Debit Card</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="mobile">
                            <div className="flex items-center gap-2">
                              📱 <span>Mobile Payment</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Fare Estimation */}
              <div className="space-y-4 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleEstimateFare}
                  disabled={isEstimating}
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  {isEstimating ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Estimating Fare... ⏳
                    </>
                  ) : (
                    <>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Estimate Fare 💰
                    </>
                  )}
                </Button>

                {estimatedFare && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-300 dark:border-green-600 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="font-semibold text-green-700 dark:text-green-300">Estimated Fare:</span>
                      <Badge variant="secondary" className="text-lg font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 w-fit">
                        ${estimatedFare.toFixed(2)} 💵
                      </Badge>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                      ℹ️ Final fare may vary based on actual distance and time
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                disabled={!estimatedFare || isRequesting}
              >
                {isRequesting ? (
                  <>
                    <Clock className="mr-2 h-5 w-5 animate-spin" />
                    Requesting Ride... 🚕
                  </>
                ) : (
                  <>
                    <Navigation className="mr-2 h-5 w-5" />
                    Request Ride 🚀
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Quick Locations */}
      <Card className="hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <MapPin className="h-4 w-4 text-blue-600" />
            </div>
            Quick Locations 🗺️
          </CardTitle>
          <CardDescription>
            Tap to quickly set as pickup or destination
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => form.setValue("pickupAddress", "Dhaka Airport")}
              className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
            >
              🛫 Airport
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => form.setValue("destinationAddress", "Dhaka University")}
              className="flex items-center gap-1 hover:bg-green-50 hover:border-green-300"
            >
              🏫 University
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => form.setValue("destinationAddress", "Gulshan Circle")}
              className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
            >
              🏢 Gulshan
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => form.setValue("destinationAddress", "New Market")}
              className="flex items-center gap-1 hover:bg-orange-50 hover:border-orange-300"
            >
              🛍️ Market
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}