import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { AlertTriangle, Clock, Mail, Phone } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function AccountStatus() {
  const user = useSelector(selectCurrentUser);

  const getStatusInfo = () => {
    if (user?.isBlocked) {
      return {
        title: "Account Suspended",
        description: "Your account has been temporarily suspended",
        message: "Your account access has been restricted due to a violation of our terms of service. Please contact our support team for assistance.",
        icon: <AlertTriangle className="h-6 w-6 text-destructive" />,
        variant: "destructive" as const
      };
    }
    
    if (user?.role === 'driver' && !user?.isApproved) {
      return {
        title: "Driver Account Pending Approval",
        description: "Your driver application is under review",
        message: "Thank you for applying to become a driver! Our team is currently reviewing your application. You'll receive an email notification once your account is approved.",
        icon: <Clock className="h-6 w-6 text-orange-500" />,
        variant: "default" as const
      };
    }

    return {
      title: "Account Status",
      description: "Account information",
      message: "Your account is active and in good standing.",
      icon: <Clock className="h-6 w-6 text-green-500" />,
      variant: "default" as const
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              {statusInfo.icon}
            </div>
            <CardTitle className="text-2xl">{statusInfo.title}</CardTitle>
            <CardDescription>{statusInfo.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant={statusInfo.variant}>
              <AlertDescription>
                {statusInfo.message}
              </AlertDescription>
            </Alert>

            {user?.isBlocked && (
              <div className="space-y-2">
                <h4 className="font-medium">Contact Support:</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@ridey.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            )}

            {user?.role === 'driver' && !user?.isApproved && (
              <div className="space-y-2">
                <h4 className="font-medium">What happens next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Document verification (1-2 business days)</li>
                  <li>• Background check (2-3 business days)</li>
                  <li>• Account activation via email</li>
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Button asChild variant="default" className="w-full">
                <Link to="/">Return to Home</Link>
              </Button>
              {user?.isBlocked && (
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}