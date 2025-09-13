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
import config from "@/config";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, Loader2, Chrome, Zap, User, Shield } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "karma1@gmail.com", // For testing
      password: "password123",
    },
  });
  const [login, { isLoading }] = useLoginMutation();
  
  // Quick login function for testing
  const quickLogin = (email: string, password: string, role: string) => {
    form.setValue('email', email);
    form.setValue('password', password);
    toast.info(`Logging in as ${role}...`);
    form.handleSubmit(onSubmit)();
  };
  
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      console.log('Submitting login data:', data);
      const res = await login(data).unwrap();
      console.log('Login response:', res);

      if (res.success || res.user) {
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err: any) {
      console.log('Login error:', err);
      const errorMessage = err?.data?.message || "Login failed";
      toast.error(errorMessage);

      if (errorMessage === "Invalid credentials") {
        toast.error("Invalid email or password");
      }

      if (errorMessage === "Driver not approved") {
        toast.error("Your driver account is pending approval");
      }

      if (errorMessage === "Account is blocked") {
        toast.error("Your account has been blocked");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="john@example.com"
                        {...field}
                        value={field.value || ""}
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
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        value={field.value || ""}
                        className="pl-10 pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200 hover:border-gray-300"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Login
                </div>
              )}
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-4 text-muted-foreground font-medium">
            Quick Demo Access
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => quickLogin('karma1@gmail.com', 'password123', 'Rider')}
            disabled={isLoading}
            className="h-10 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200 group"
          >
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Rider</span>
            </div>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => quickLogin('driver@example3.com', 'password123', 'Driver')}
            disabled={isLoading}
            className="h-10 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all duration-200 group"
          >
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Driver</span>
            </div>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => quickLogin('admin@test.com', 'password123', 'Admin')}
            disabled={isLoading}
            className="h-10 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200 group"
          >
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Admin</span>
            </div>
          </Button>
        </div>


      </div>
      
      <div className="text-center text-sm pt-2">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link 
          to="/register" 
          replace 
          className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
        >
          Create one now →
        </Link>
      </div>
    </div>
  );
}
