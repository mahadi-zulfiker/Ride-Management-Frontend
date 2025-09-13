import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Student",
    review:
      "RideShare Pro is so easy to use! I can book a ride in seconds and always feel safe with verified drivers.",
    rating: 5,
  },
  {
    name: "Jamal Hossain",
    role: "Business Professional",
    review:
      "The app is super reliable. I love that I can pay with cash or online. It's perfect for my daily office rides.",
    rating: 4,
  },
  {
    name: "Sara Ahmed",
    role: "Freelancer",
    review:
      "Affordable and convenient! RideShare Pro has made my city commutes stress-free.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-10 right-20 w-64 h-64 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Enhanced Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 fill-white" />
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Users Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust RideShare Pro for their daily transportation needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-8 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 border border-white/20 dark:border-gray-700/50"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 10a7 7 0 0114 0v6a1 1 0 11-2 0v-6a5 5 0 00-10 0v6a1 1 0 11-2 0v-6z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M7 16a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex mb-6">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${idx < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'} transition-colors duration-300`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-base text-foreground mb-6 leading-relaxed font-medium italic relative">
                <span className="text-2xl text-blue-500 absolute -top-2 -left-2">"</span>
                {t.review}
                <span className="text-2xl text-blue-500 absolute -bottom-4 -right-2">"</span>
              </p>

              {/* User Avatar */}
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl shadow-lg">
                {t.name.charAt(0)}
              </div>

              {/* User Info */}
              <h3 className="font-bold text-lg text-foreground mb-1">{t.name}</h3>
              <p className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{t.role}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to experience the difference? Join our community today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Start Riding Today
            </button>
            <button className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300">
              Become a Driver
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;