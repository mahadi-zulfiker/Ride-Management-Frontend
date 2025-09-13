import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSetAvailabilityMutation, useUserInfoQuery } from "@/redux/features";

const DriverAvailability = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const driverId = userData?._id;
  const currentAvailability = userData?.availability || "Offline";

  const [availability, setAvailability] = useState<"Online" | "Offline">(currentAvailability as "Online" | "Offline");
  const [setAvailabilityMutation, { isLoading }] = useSetAvailabilityMutation();

  const handleUpdate = async () => {
    try {
      await setAvailabilityMutation({
        id: driverId,
        availability,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update availability", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Driver Availability</h1>

      <div className="flex gap-4 items-center">
        <Select value={availability} onValueChange={(val) => setAvailability(val as "Online" | "Offline")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Set Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Online">Online</SelectItem>
            <SelectItem value="Offline">Offline</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default DriverAvailability;
