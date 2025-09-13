import {
  useUpdateProfileMutation,
} from "@/redux/features/auth/auth.api";
import { selectCurrentUser, updateUser } from "@/redux/features";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, Calendar, Clock, Edit, CheckCircle, XCircle, Phone, MapPin } from "lucide-react";

const MyProfile = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      availability: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        availability: user.availability || "Offline",
      });
    }
  }, [user, reset]);

  const onSubmit = async (values: any) => {
    try {
      const res: any = await updateProfile(values);

      if (res?.data?.success || res?.data?.user) {
        // Update Redux state with new user data
        dispatch(updateUser(values));
        toast.success("Profile updated successfully!");
        setOpen(false); 
      } else {
        toast.error(res?.error?.data?.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  
  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <div className="">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg space-y-4" />
          ))}
        </div>
      </div>
    );
  }

  // Function to get initials from user name
  const getUserInitials = (name: string) => {
    if (!name) return "U";
    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    
    return initials;
  };

  // Function to get role-specific color
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-500";
      case "driver": return "bg-green-500";
      default: return "bg-blue-500";
    }
  };

  // Function to get availability color
  const getAvailabilityColor = (availability: string) => {
    return availability === "Online" ? "bg-green-500" : "bg-gray-500";
  };

  return (
    // Wrap the entire component with Dialog to fix the DialogTrigger error
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              My Profile
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage your account information and settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Profile Header Card */}
            <Card className="lg:col-span-3 bg-gradient-to-r from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-700/50 dark:to-gray-800/50 pb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {getUserInitials(user?.name)}
                      </div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                        <Badge className={`px-3 py-1 text-sm rounded-full ${getRoleColor(user?.role)} text-white`}>
                          {user?.role?.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-base text-muted-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-5 py-2.5 text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-md">
                      <Edit className="w-5 h-5 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                </div>
              </CardHeader>
            </Card>

            {/* Profile Information Cards */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-muted-foreground">Full Name</span>
                    <span className="font-medium text-gray-900 dark:text-white">{user?.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-gray-900 dark:text-white">{user?.email}</span>
                  </div>
                  
                  {user?.phone && (
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {user?.phone}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Account Status</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-muted-foreground">Status</span>
                    <div className="flex items-center gap-2">
                      {user?.isBlocked ? (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="font-medium text-red-600">Blocked</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-medium text-green-600">Active</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-muted-foreground">Role</span>
                    <Badge className={`px-3 py-1 rounded-full ${getRoleColor(user?.role)} text-white`}>
                      {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                    </Badge>
                  </div>
                  
                  {user?.role === "driver" && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Availability</span>
                      <Badge className={`px-3 py-1 rounded-full ${getAvailabilityColor(user?.availability)}`}>
                        {user?.availability || "Offline"}
                      </Badge>
                    </div>
                  )}
                  
                  {user?.role === "driver" && user?.isApproved !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Approval Status</span>
                      <Badge className={`px-3 py-1 rounded-full ${
                        user?.isApproved ? "bg-green-500" : "bg-amber-500"
                      } text-white`}>
                        {user?.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Location & Preferences</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-muted-foreground">Default Location</span>
                    <span className="font-medium text-gray-900 dark:text-white">Dhaka, Bangladesh</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-muted-foreground">Language</span>
                    <span className="font-medium text-gray-900 dark:text-white">English</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Timezone</span>
                    <span className="font-medium text-gray-900 dark:text-white">GMT+6</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Update Profile Modal */}
          <DialogContent className="sm:max-w-[500px] rounded-2xl p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Edit className="w-6 h-6 text-white" />
                  </div>
                  Update Profile
                </DialogTitle>
                <p className="text-blue-100">
                  Update your personal information and settings
                </p>
              </DialogHeader>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
              <div className="space-y-2">
                <label className="text-base font-medium text-gray-900 dark:text-white">Full Name</label>
                <Input 
                  {...register("name")} 
                  placeholder="Your full name" 
                  className="h-12 text-lg px-4 border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>

              {user?.role === "driver" && (
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-900 dark:text-white">Availability</label>
                  <select
                    {...register("availability")}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 h-12 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  className="flex-1 py-6 text-lg rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-6 text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
};

export default MyProfile;