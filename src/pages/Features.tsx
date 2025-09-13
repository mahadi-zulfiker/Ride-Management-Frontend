import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  MapPin, 
  CreditCard, 
  Shield, 
  Clock, 
  BarChart3, 
  Users, 
  Settings,
  Star,
  Navigation,
  AlertTriangle,
  Phone
} from "lucide-react";

export default function Features() {
  const riderFeatures = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Easy Ride Booking",
      description: "Book rides instantly with pickup and destination selection, real-time fare estimation, and multiple payment options."
    },
    {
      icon: <Navigation className="h-6 w-6" />,
      title: "Live Ride Tracking",
      description: "Track your ride in real-time with GPS navigation, driver details, and estimated arrival times."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Ride History",
      description: "Access complete ride history with advanced filtering by date, fare range, and ride status."
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Multiple Payment Methods",
      description: "Pay conveniently with cash, card, or mobile payment options."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Rate & Review",
      description: "Rate your experience and help maintain quality service standards."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Emergency SOS",
      description: "Emergency button with live location sharing and instant contact notifications."
    }
  ];

  const driverFeatures = [
    {
      icon: <Car className="h-6 w-6" />,
      title: "Availability Control",
      description: "Go online/offline anytime to control when you receive ride requests."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Incoming Requests",
      description: "Receive and manage ride requests with passenger details and route information."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Ride Management",
      description: "Update ride status from accepted to completed with real-time passenger communication."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Earnings Dashboard",
      description: "Track your earnings with detailed breakdowns by day, week, and month with visual charts."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Trip History",
      description: "Access complete trip history with passenger ratings and earnings details."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Driver Safety",
      description: "Emergency features and safety tools to ensure secure driving experience."
    }
  ];

  const adminFeatures = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "User Management",
      description: "Comprehensive user management with search, filter, block/unblock capabilities for riders and driver approval systems."
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Ride Oversight",
      description: "Monitor all rides with advanced filtering by date, status, driver, or rider with detailed analytics."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Dashboard",
      description: "Data visualizations for ride volume, revenue trends, driver activity, and business intelligence."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security Controls",
      description: "Advanced security features, fraud detection, and system integrity monitoring."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "System Configuration",
      description: "Configure platform settings, pricing models, and operational parameters."
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Support Management",
      description: "Handle customer support tickets, disputes, and user assistance requests."
    }
  ];

  const FeatureSection = ({ title, features, badgeColor }: { 
    title: string; 
    features: typeof riderFeatures; 
    badgeColor: string;
  }) => (
    <div className="space-y-6">
      <div className="text-center">
        <Badge variant="secondary" className={`${badgeColor} text-white mb-4`}>
          {title}
        </Badge>
        <h2 className="text-3xl font-bold">{title} Features</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${badgeColor} text-white`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Platform <span className="text-primary">Features</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the comprehensive features designed for riders, drivers, and administrators 
            to ensure a seamless ride-sharing experience.
          </p>
        </div>

        {/* Rider Features */}
        <FeatureSection 
          title="Rider" 
          features={riderFeatures} 
          badgeColor="bg-blue-500" 
        />

        {/* Driver Features */}
        <FeatureSection 
          title="Driver" 
          features={driverFeatures} 
          badgeColor="bg-green-500" 
        />

        {/* Admin Features */}
        <FeatureSection 
          title="Admin" 
          features={adminFeatures} 
          badgeColor="bg-purple-500" 
        />

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 text-center border border-blue-200/30">
          <h3 className="text-2xl font-bold mb-4">Ready to Experience RideShare Pro?</h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of riders and drivers who trust RideShare Pro for safe, reliable transportation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="text-sm py-2 px-4 bg-blue-50 border-blue-200">
              📱 Available on iOS & Android
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4 bg-green-50 border-green-200">
              🌍 Available 24/7
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4 bg-purple-50 border-purple-200">
              🛡️ Fully Insured Rides
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}