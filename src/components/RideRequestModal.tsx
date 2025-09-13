import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRequestRideMutation } from "@/redux/features";

interface RideForm {
  pickupLat: number;
  pickupLng: number;
  destinationLat: number;
  destinationLng: number;
  paymentMethod: string;
}

const RideRequestModal: FC = () => {
  const [requestRide, { isLoading }] = useRequestRideMutation(undefined);
  const { register, handleSubmit, reset } = useForm<RideForm>();
  const [isOpen, setIsOpen] = useState(false); 

  const onSubmit = async (data: RideForm) => {
    try {
      await requestRide({
        pickup: {
          latitude: Number(data.pickupLat),
          longitude: Number(data.pickupLng),
        },
        destination: {
          latitude: Number(data.destinationLat),
          longitude: Number(data.destinationLng),
        },
        paymentMethod: data.paymentMethod || 'cash',
      }).unwrap();

      toast.success("Ride requested successfully!");
      reset();
      setIsOpen(false); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to request ride.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">Request Ride</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request a Ride</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-2">
          <Input type="number" step="any" placeholder="Pickup Latitude" {...register("pickupLat", { required: true })} />
          <Input type="number" step="any" placeholder="Pickup Longitude" {...register("pickupLng", { required: true })} />
          <Input type="number" step="any" placeholder="Destination Latitude" {...register("destinationLat", { required: true })} />
          <Input type="number" step="any" placeholder="Destination Longitude" {...register("destinationLng", { required: true })} />
          <select {...register("paymentMethod", { required: true })} className="border rounded p-2">
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="mobile">Mobile Payment</option>
          </select>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Requesting..." : "Request Ride"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RideRequestModal;
