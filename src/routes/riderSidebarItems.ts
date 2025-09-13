import Myrides from "@/pages/allRides/Myrides";
import MyProfile from "@/pages/MyProfile";
import RiderDashboard from "@/pages/rider/Dashboard";
import RideRequest from "@/pages/rider/RideRequest";
import { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "dashboard",
        component: RiderDashboard,
      },
      {
        title: "Request Ride",
        url: "request-ride",
        component: RideRequest,
      },
    ],
  },
  {
    title: "Rides",
    items: [
      {
        title: "My Rides",
        url: "myrides",
        component: Myrides,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "My Profile",
        url: "profile",
        component: MyProfile,
      },
    ],
  },
];
