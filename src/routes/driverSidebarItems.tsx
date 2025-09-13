import AllRides from "@/pages/allRides/Allrides";
import MyAcceptedRides from "@/pages/allRides/MyAcceptedRides";
import EarningsHistory from "@/pages/driver/earningsHistory";
import DriverDashboard from "@/pages/driver/Dashboard";
import MyPtofile from "@/pages/MyPtofile";
import { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "dashboard",
        component: DriverDashboard,
      },
      {
        title: "Earnings",
        url: "earnings",
        component: EarningsHistory,
      },
    ],
  },
  {
    title: "Rides",
    items: [
      {
        title: "Available Rides",
        url: "all-rides",
        component: AllRides,
      },
      {
        title: "My Accepted Rides",
        url: "accepted-rides",
        component: MyAcceptedRides,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "My Profile",
        url: "profile",
        component: MyPtofile,
      },
    ],
  },
];
