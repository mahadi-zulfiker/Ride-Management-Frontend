import {
  Smartphone,
  Car,
  CheckCircle2,
  CreditCard,
  ArrowRight,
  Play,
  MapPin,
} from "lucide-react";

const steps = [
  {
    title: "1. Request a Ride",
    desc: "Open RideShare Pro and request a ride instantly from your location.",
    icon: Smartphone,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "2. Driver Accepts",
    desc: "Nearby drivers receive your request and the best match accepts.",
    icon: CheckCircle2,
    color: "from-green-500 to-green-600"
  },
  {
    title: "3. Pickup & Travel",
    desc: "Your driver arrives, picks you up, and takes you to your destination.",
    icon: Car,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "4. Trip Completed",
    desc: "Arrive safely and pay securely — choose online or cash.",
    icon: CreditCard,
    color: "from-orange-500 to-orange-600"
  },
];

const Howitworks = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/20 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Enhanced Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="h-4 w-4" />
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">RideShare Pro</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting from point A to point B has never been easier. Follow these simple steps to enjoy a seamless ride experience
          </p>
        </div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full z-0">
                  <div className="flex items-center justify-center h-1">
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700"></div>
                    <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-600 mx-2" />
                  </div>
                </div>
              )}
              
              <div className="relative flex flex-col items-center text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20 dark:border-gray-700/50 z-10">
                {/* Step number badge */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {i + 1}
                </div>
                
                {/* Icon with gradient background */}
                <div className={`relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <step.icon className="w-10 h-10 text-white" />
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color} blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Pulse animation on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced bottom section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-white/20 dark:border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2 text-foreground">Ready to get started?</h3>
              <p className="text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
                <CreditCard className="w-4 h-4" />
                💳 Payment options: Online payment or cash
                <MapPin className="w-4 h-4 ml-2" />
                📍 Available in your city
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Download App
              </button>
              <button className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Howitworks;