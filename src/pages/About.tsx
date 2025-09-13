import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Shield, TrendingUp } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Car className="h-8 w-8 text-primary" />,
      title: "Seamless Rides",
      description: "Request rides in seconds with our intuitive app and get matched with nearby drivers instantly."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Focused",
      description: "We connect riders and drivers in a trusted community with verified profiles and ratings."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Safety First",
      description: "Your safety is our priority with real-time tracking, emergency features, and 24/7 support."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint by sharing rides and contributing to sustainable transportation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
              About RideShare Pro
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Revolutionizing Urban <span className="text-primary">Mobility</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              RideShare Pro is more than just a ride-sharing app — it's a movement to make transportation 
              safe, reliable, and affordable for everyone.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full px-8">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Learn More
              </Button>
            </div>
          </div>
          <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About RideShare Pro"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-12 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our <span className="text-primary">Mission</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Empower communities with better mobility, create flexible earning opportunities for drivers, 
            and deliver exceptional rides every time.
          </p>
          <div className="pt-6">
            <blockquote className="text-2xl italic font-medium">
              "Building the future of urban mobility — one ride at a time."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">RideShare Pro</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology and a growing network make us the preferred choice for riders and drivers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">10M+</div>
              <div className="text-lg text-muted-foreground">Rides Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">500K+</div>
              <div className="text-lg text-muted-foreground">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">99.9%</div>
              <div className="text-lg text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;