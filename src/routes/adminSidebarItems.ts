
import AdminAllRides from "@/pages/Admin/AdminAllrides";
import AllUsers from "@/pages/Admin/AllUsers";
import AdminDashboard from "@/pages/Admin/Dashboard";
import MyPtofile from "@/pages/MyProfile";
import { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "dashboard",
        component: AdminDashboard,
      },
      {
        title: "Analytics",
        url: "analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Rides",
    items: [
    {
        title: "All Rides",
        url: "all-rides",
        component: AdminAllRides,
      },
    
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "all-users",
        component: AllUsers,
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
