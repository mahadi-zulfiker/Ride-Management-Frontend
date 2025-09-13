import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { User, Mail, Lock, UserCheck, Car, Users, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

// Schema with role
const registerSchema = z
  .object({
    name: z.string().min(3, "Name is too short").max(50),
    email: z.string().email(),
    password: z.string().min(8, "Password is too short"),
    confirmPassword: z.string().min(8, "Confirm Password is too short"),
    role: z.enum(["driver", "rider"], { message: "Please select a role" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"driver" | "rider">("rider");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "rider",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      console.log('Registration data:', data);
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      }).unwrap();

      toast.success("Account created successfully! Please login to continue.");
      navigate("/login");
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {/* Role Selection Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedRole === 'rider' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setSelectedRole('rider');
                form.setValue('role', 'rider');
              }}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <Users className={`w-6 h-6 ${selectedRole === 'rider' ? 'text-blue-600' : 'text-gray-400'}`} />
                <div>
                  <h3 className={`font-semibold text-sm ${selectedRole === 'rider' ? 'text-blue-600' : 'text-gray-600'}`}>
                    Rider
                  </h3>
                  <p className="text-xs text-gray-500">Book rides</p>
                </div>
                {selectedRole === 'rider' && <CheckCircle className="w-4 h-4 text-blue-600" />}
              </div>
            </div>
            
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedRole === 'driver' 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setSelectedRole('driver');
                form.setValue('role', 'driver');
              }}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <Car className={`w-6 h-6 ${selectedRole === 'driver' ? 'text-green-600' : 'text-gray-400'}`} />
                <div>
                  <h3 className={`font-semibold text-sm ${selectedRole === 'driver' ? 'text-green-600' : 'text-gray-600'}`}>
                    Driver
                  </h3>
                  <p className="text-xs text-gray-500">Offer rides</p>
                </div>
                {selectedRole === 'driver' && <CheckCircle className="w-4 h-4 text-green-600" />}
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200 hover:border-gray-300"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="john.doe@example.com"
                      type="email"
                      {...field}
                      className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200 hover:border-gray-300"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Password 
                      {...field} 
                      className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200 hover:border-gray-300"
                      placeholder="Create a strong password"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Password 
                      {...field}
                      className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200 hover:border-gray-300"
                      placeholder="Confirm your password"
                    />
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hidden role field */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <input type="hidden" {...field} />
            )}
          />

          <Button 
            type="submit" 
            className={`w-full h-11 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${
              selectedRole === 'rider' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Account...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {selectedRole === 'rider' ? <Users className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                Create {selectedRole === 'rider' ? 'Rider' : 'Driver'} Account
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
