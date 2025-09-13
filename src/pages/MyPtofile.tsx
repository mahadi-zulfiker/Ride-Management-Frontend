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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, Calendar, Clock, Edit, CheckCircle, XCircle } from "lucide-react";

const MyProfile = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Profile
          </h1>
          <p className="text-xl text-muted-foreground">Manage your account information and settings</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <Badge className={`px-3 py-1 text-sm rounded-full ${
                      user?.role === "admin" 
                        ? "bg-purple-500" 
                        : user?.role === "driver" 
                          ? "bg-green-500" 
                          : "bg-blue-500"
                    } text-white`}>
                      {user?.role?.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US") : 'N/A'}
                  </CardDescription>
                </div>
              </div>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full px-6 py-3 text-lg">
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-semibold text-lg">{user?.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-5 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-semibold text-lg">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Status</p>
                    <div className="flex items-center gap-3">
                      {user?.isBlocked ? (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="font-semibold text-lg text-red-600">Blocked</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-semibold text-lg text-green-600">Active</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-5 bg-orange-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-semibold text-lg">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US") : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {user?.role === "driver" && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Driver Availability</p>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge className={`px-3 py-1 text-base rounded-full ${
                        user?.availability === "Online" 
                          ? "bg-green-500" 
                          : "bg-gray-500"
                      }`}>
                        {user?.availability || "Offline"}
                      </Badge>
                      <span className="text-muted-foreground">
                        {user?.availability === "Online" 
                          ? "You're available to receive ride requests" 
                          : "You're not receiving ride requests"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Update Profile Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[450px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                  <Edit className="w-5 h-5" />
                </div>
                Update Profile
              </DialogTitle>
              <CardDescription className="text-base">
                Update your personal information and settings
              </CardDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
              <div className="space-y-2">
                <label className="text-base font-medium">Full Name</label>
                <Input 
                  {...register("name")} 
                  placeholder="Your full name" 
                  className="h-12 text-lg px-4"
                />
              </div>

              {user?.role === "driver" && (
                <div className="space-y-2">
                  <label className="text-base font-medium">Availability</label>
                  <select
                    {...register("availability")}
                    className="w-full border rounded-xl p-4 bg-white h-12 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="flex-1 py-6 text-lg rounded-xl"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-6 text-lg rounded-xl"
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
        </Dialog>
      </div>
    </div>
  );
};

export default MyProfile;