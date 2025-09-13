import { Car, ShieldCheck, Smartphone, Wallet, Zap, Award } from "lucide-react";

const benefits = [
  {
    title: "Fast & Reliable",
    desc: "Book rides instantly and reach your destination on time with trusted drivers.",
    icon: Car,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Safe & Secure",
    desc: "All drivers are verified to ensure your safety throughout the journey.",
    icon: ShieldCheck,
    color: "from-green-500 to-green-600"
  },
  {
    title: "Easy to Use",
    desc: "RideShare Pro is simple and intuitive — request rides with just a few taps.",
    icon: Smartphone,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Affordable Payments",
    desc: "Choose between online payment or cash for a hassle-free experience.",
    icon: Wallet,
    color: "from-orange-500 to-orange-600"
  },
];

const Benefits = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-gray-800 dark:to-purple-900/20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Enhanced Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4" />
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">RideShare Pro</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our premium features designed to make your journey smooth, safe, and enjoyable
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20 dark:border-gray-700/50"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon with gradient background */}
              <div className={`relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <item.icon className="w-10 h-10 text-white" />
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime Reliability</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-muted-foreground">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;