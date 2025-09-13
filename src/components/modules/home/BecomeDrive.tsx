import { Button } from "@/components/ui/button";
import { Car, DollarSign, Clock, Headphones, Star, TrendingUp } from "lucide-react";

const BecomeDriver = () => {
  return (
    <section className="relative w-full py-20 px-6 md:px-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-purple-900/20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Text Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            <Car className="h-4 w-4" />
            Join Our Team
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Drive with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">RideShare Pro</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Join our network of trusted drivers and earn on your own schedule.
              With flexible hours, competitive fares, and reliable support, RideShare Pro
              helps you achieve financial freedom while connecting with riders in
              your city.
            </p>
          </div>

          {/* Enhanced benefits */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Flexible Hours</p>
                <p className="text-sm text-muted-foreground">Work when you want</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Earn More</p>
                <p className="text-sm text-muted-foreground">Transparent fares</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">24/7 Support</p>
                <p className="text-sm text-muted-foreground">Always here to help</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Weekly Bonuses</p>
                <p className="text-sm text-muted-foreground">Extra earnings</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$1,200+</div>
              <div className="text-sm text-muted-foreground">Average Weekly Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                4.8 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="text-sm text-muted-foreground">Driver Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5K+</div>
              <div className="text-sm text-muted-foreground">Active Drivers</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg px-8 py-3">
              Become a Driver
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300 text-lg px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Image with enhanced styling */}
        <div className="relative">
          {/* Floating card */}
          <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-foreground">$45/hour</p>
                <p className="text-sm text-muted-foreground">Peak earnings</p>
              </div>
            </div>
          </div>
          
          <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-white/20 dark:border-gray-700/50">
            <img
              src="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="RideShare Pro Driver"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bottom floating stats */}
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <p className="font-bold text-foreground">Top Rated</p>
                <p className="text-sm text-muted-foreground">Driver status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeDriver;