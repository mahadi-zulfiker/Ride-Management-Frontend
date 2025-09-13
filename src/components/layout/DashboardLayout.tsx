import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout() {
  const user = useSelector(selectCurrentUser);
  
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'driver': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'rider': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
            </div>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hidden sm:flex">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs px-2 py-1 ${getRoleBadgeColor(user?.role || 'user')}`}>
                  {user?.role?.toUpperCase()}
                </Badge>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <User className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 lg:p-6 bg-muted/50 min-h-[calc(100vh-4rem)]">
          <div className="bg-background rounded-lg shadow-sm border min-h-full">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
