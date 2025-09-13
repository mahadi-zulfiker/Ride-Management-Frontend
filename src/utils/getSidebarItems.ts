import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { riderSidebarItems } from "@/routes/riderSidebarItems";
import {  driverSidebarItems} from "@/routes/driverSidebarItems";
import { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];
    case role.driver:
      return [...driverSidebarItems];
    case role.rider:
      return [...riderSidebarItems];
    default:
      return [];
  }
};
