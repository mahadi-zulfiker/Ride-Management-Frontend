import { useState } from "react";
import { useGetRidesAdminQuery } from "@/redux/features";
import { selectIsAuthenticated } from "@/redux/features";
import { useSelector } from "react-redux";
import { IRide } from "@/types";
 
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import RideCard from "@/components/rideCard";

const AdminAllRides = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const { data: rides, isLoading, isError } = useGetRidesAdminQuery({
    status: statusFilter || undefined,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  }, {
    skip: !isAuthenticated
  });

   if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  if (isError) return <p className="text-red-600">Failed to load rides</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Admin Rides</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border rounded px-2 py-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="requested">Requested</option>
          <option value="accepted">Accepted</option>
          <option value="picked_up">Picked Up</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

         
        <Input type="date" placeholder="From" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <Input type="date" placeholder="To" value={toDate} onChange={(e) => setToDate(e.target.value)} />
      </div>

    

<div className="space-y-4">
  {rides?.data?.map((ride: IRide) => (
   <Link to={`/rides/${ride._id}`} key={ride._id}> 

   <RideCard key={ride._id} ride={ride} />
   
   </Link>
  ))}
</div>

    </div>
  );
};

export default AdminAllRides;
