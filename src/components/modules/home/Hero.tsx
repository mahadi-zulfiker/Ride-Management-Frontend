import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, Users, Car, Shield, ArrowRight } from "lucide-react";
import car1 from "@/assets/images/car1.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-purple-900/20 min-h-screen flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-medium">
              🚀 #1 Ride-Sharing Platform
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Ride Smarter with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                RideShare Pro
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience the future of transportation. Connect with verified drivers, 
              enjoy premium safety features, and travel in comfort with our 
              award-winning ride-sharing platform.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">10K+ Happy Riders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Car className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">5K+ Verified Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                <span className="text-sm font-medium">4.9 Star Rating</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105">
                <Link to="/login" className="flex items-center gap-2">
                  Book a Ride Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200">
                <Link to="/register" className="flex items-center gap-2">
                  🚗 Become a Driver
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - enhanced image with stats */}
          <div className="flex-1 flex justify-center relative">
            <div className="relative">
              <img
                src={car1}
                alt="RideShare Pro car illustration"
                className="max-w-md lg:max-w-lg xl:max-w-xl w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              
              {/* Floating stats cards */}
              <Card className="absolute -top-4 -left-4 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-semibold">100% Safe</p>
                    <p className="text-xs text-muted-foreground">Verified Drivers</p>
                  </div>
                </div>
              </Card>
              
              <Card className="absolute -bottom-4 -right-4 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Car className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">24/7 Service</p>
                    <p className="text-xs text-muted-foreground">Always Available</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
