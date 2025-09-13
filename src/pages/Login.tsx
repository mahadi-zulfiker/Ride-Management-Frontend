import image from "@/assets/images/car1.jpg"
import { Link } from "react-router-dom";
import Logo from "@/assets/icons/Logo";
import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col gap-6 p-6 md:p-10 relative">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="flex justify-center gap-2 md:justify-start relative z-10">
          <Link to="/" className="flex items-center gap-3 font-medium group transition-all duration-300 hover:scale-105">
            <div className="relative">
              <Logo />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-spin" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RideShare Pro
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center relative z-10">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 transform transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Welcome Back!
                </h1>
                <p className="text-muted-foreground flex items-center justify-center gap-2">
                  Ready to hit the road? <ArrowRight className="w-4 h-4 animate-pulse" />
                </p>
              </div>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="relative hidden bg-muted lg:block overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
        <img
          src={image}
          alt="Modern ride sharing experience"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] transition-transform duration-700 hover:scale-105"
        />
        
        {/* Overlay content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-md">
            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
              Your Journey Awaits
            </h2>
            <p className="text-lg opacity-90 drop-shadow-md">
              Connect with riders and drivers in your city. Safe, reliable, and convenient.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
