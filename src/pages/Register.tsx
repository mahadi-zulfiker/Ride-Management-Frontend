import image from "@/assets/images/car1.jpg"
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Logo from "@/assets/icons/Logo";
import { Users, Shield, Car, Sparkles, ArrowLeft } from "lucide-react";

export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative hidden bg-muted lg:block overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 z-10"></div>
        <img
          src={image}
          alt="Join our ride sharing community"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] transition-transform duration-700 hover:scale-105"
        />
        
        {/* Feature highlights */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-lg">
            <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
              Join RideShare Pro
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="w-8 h-8 text-blue-300" />
                <div>
                  <h3 className="font-semibold">Connect with Community</h3>
                  <p className="text-sm opacity-90">Join thousands of riders and drivers</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Shield className="w-8 h-8 text-green-300" />
                <div>
                  <h3 className="font-semibold">Safe & Secure</h3>
                  <p className="text-sm opacity-90">Verified users and secure payments</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Car className="w-8 h-8 text-purple-300" />
                <div>
                  <h3 className="font-semibold">Reliable Rides</h3>
                  <p className="text-sm opacity-90">Available 24/7 in your city</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-6 p-6 md:p-10 relative">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 bg-purple-100/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-100/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Header */}
        <div className="flex justify-center gap-2 md:justify-start relative z-10">
          <Link to="/" className="flex items-center gap-3 font-medium group transition-all duration-300 hover:scale-105">
            <div className="relative">
              <Logo />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-spin" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              RideShare Pro
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center relative z-10">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 transform transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-0">
              <div className="text-center p-8 pb-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Create Account
                </h1>
                <p className="text-muted-foreground flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4 animate-pulse" /> Start your journey today
                </p>
              </div>
              <RegisterForm />
              
              {/* Back to login link */}
              <div className="text-center p-6 pt-2">
                <Link 
                  to="/login" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
