import {  useUpdateRideStatusMutation } from "@/redux/features";
import { selectCurrentUser } from "@/redux/features";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useSelector } from "react-redux";
import { allowedTransitions, IRide } from "@/types";
import { toast } from "sonner";
import { DollarSign, Clock, User, CreditCard } from "lucide-react";

interface RideCardProps {
  ride: IRide;
  onCancel?: (id: string) => void;
  children?: React.ReactNode;   
}


const statusColors: Record<IRide["status"], string> = {
  requested: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  accepted: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  picked_up: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  in_transit: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  completed: "bg-green-500/10 text-green-600 dark:text-green-400",
  canceled: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const RideCard = ({ ride, onCancel }: RideCardProps) => {
  const user = useSelector(selectCurrentUser);
  const role = user?.role;

  const [updateRideStatus, { isLoading }] = useUpdateRideStatusMutation();

  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<IRide["status"]>(
    "" as IRide["status"]
  );

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && allowedTransitions[ride.status]?.length > 0) {
      const firstStatus = allowedTransitions[ride.status][0];
      setNewStatus(firstStatus);
    }
  };

const handleUpdate = async () => {
  if (!newStatus) return;
  
  // Enhanced validation
  const currentStatus = ride.status;
  const allowedNextStatuses = allowedTransitions[currentStatus] || [];
  
  if (!allowedNextStatuses.includes(newStatus)) {
    toast.error(`Invalid transition from ${currentStatus} to ${newStatus}`);
    return;
  }
  
  try {
    console.log('Updating ride status:', { rideId: ride._id, currentStatus, newStatus });
    const response = await updateRideStatus({
      rideId: ride._id,
      status: newStatus,
    }).unwrap();

    toast.success(response?.message || "Status updated successfully");
    setOpen(false);
  } catch (err: any) {
    console.error("Failed to update status:", err);
    const errorMessage = err?.data?.message || err?.message || "Failed to update status";
    toast.error(errorMessage);
  }
};


  return (
    <Card className="w-full shadow-sm hover:shadow-md my-3 transition-all duration-200 border-l-4 border-l-transparent hover:border-l-blue-400">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Ride Details
          </CardTitle>
          <Badge
            className={`${statusColors[ride.status] || statusColors.requested} px-3 py-1 rounded-full text-xs font-semibold w-fit`}
          >
            {ride.status?.replace("_", " ")?.toUpperCase() || "UNKNOWN"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-green-800 dark:text-green-300">Pickup Location</p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {ride.pickupLocation?.latitude?.toFixed(4) || 'N/A'}, {ride.pickupLocation?.longitude?.toFixed(4) || 'N/A'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-red-800 dark:text-red-300">Destination</p>
              <p className="text-sm text-red-600 dark:text-red-400">
                {ride.destinationLocation?.latitude?.toFixed(4) || 'N/A'}, {ride.destinationLocation?.longitude?.toFixed(4) || 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <DollarSign className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-xs text-muted-foreground">Fare</p>
              <p className="font-semibold">${ride.fare?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-muted-foreground">Payment</p>
              <p className="font-semibold capitalize">
                {ride.paymentMethod || 'Not specified'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <Clock className="w-4 h-4 text-purple-600" />
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="font-semibold text-xs">
                {ride.createdAt ? new Date(ride.createdAt).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        {ride.driver && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <User className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-muted-foreground">Driver</p>
              <p className="font-medium text-blue-800 dark:text-blue-300">{ride.driver.name || 'Assigned'}</p>
            </div>
          </div>
        )}

        {/* Cancel Ride with Confirmation */}
        {ride.status === "requested" && role === "rider" && onCancel && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full mt-3">
                Cancel Ride
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Ride</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-600">
                Are you sure you want to cancel this ride?
              </p>
              <DialogFooter>
               
                <Button
                  variant="destructive"
                  onClick={() => onCancel(ride._id)}
                >
                  Yes, Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Driver: Update Status */}
        {role === "driver" && allowedTransitions[ride.status]?.length > 0 && (
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button variant="default" className="w-full mt-3">
                Update Status
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Ride Status</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-4 mt-2">
                <Select
                  value={newStatus}
                  onValueChange={(val) => setNewStatus(val as IRide["status"])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    {allowedTransitions[ride.status]?.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status?.replace("_", " ")?.toUpperCase() || status}
                      </SelectItem>
                    )) || null}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button onClick={handleUpdate} disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default RideCard;
