import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  TrendingUp,
  Camera,
  ShoppingCart,
  Bell,
  Settings,
  Leaf,
  Star,
  Edit
} from "lucide-react";

export default function UserProfile() {
  const farmerData = {
    name: "Rajesh Kumar",
    location: "Village Rampur, Punjab",
    phone: "+91 98765 43210",
    email: "rajesh.farmer@gmail.com",
    joinDate: "March 2023",
    farmSize: "15 acres",
    crops: ["Wheat", "Rice", "Sugarcane"],
    experience: "12 years",
  };

  const activities = [
    {
      type: "diagnosis",
      title: "Wheat Disease Detected",
      description: "Leaf rust identified - Treatment applied",
      date: "2 days ago",
      status: "resolved",
    },
    {
      type: "market",
      title: "Sold Rice Crop",
      description: "5 quintal sold at ₹3,200/quintal",
      date: "1 week ago",
      status: "completed",
    },
    {
      type: "purchase",
      title: "Fertilizer Purchase",
      description: "NPK 50kg bag ordered",
      date: "2 weeks ago",
      status: "delivered",
    },
  ];

  const stats = [
    { label: "Diagnoses", value: "23", icon: Camera },
    { label: "Trades", value: "8", icon: ShoppingCart },
    { label: "Savings", value: "₹45K", icon: TrendingUp },
    { label: "Rating", value: "4.8", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Farmer Dashboard</h1>
          <p className="text-primary-foreground/90">Your farming journey and achievements</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile Card */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    {farmerData.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{farmerData.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{farmerData.location}</span>
                  </div>
                  <Badge className="mt-2 bg-success text-success-foreground">
                    Verified Farmer
                  </Badge>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex-1 md:text-right space-y-2">
                <Button variant="outline" size="sm" className="w-full md:w-auto">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <div className="flex md:justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>{farmerData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{farmerData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Member since {farmerData.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <span>{farmerData.farmSize} farm</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="p-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Farm Details */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Farm Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Farm Size</h4>
                <p className="text-2xl font-bold text-primary">{farmerData.farmSize}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Experience</h4>
                <p className="text-2xl font-bold text-primary">{farmerData.experience}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Main Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {farmerData.crops.map((crop) => (
                    <Badge key={crop} variant="secondary">{crop}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-accent/50 rounded-lg"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === "diagnosis"
                        ? "bg-primary/20"
                        : activity.type === "market"
                        ? "bg-success/20"
                        : "bg-secondary/20"
                    }`}
                  >
                    {activity.type === "diagnosis" && <Camera className="h-5 w-5 text-primary" />}
                    {activity.type === "market" && <TrendingUp className="h-5 w-5 text-success" />}
                    {activity.type === "purchase" && <ShoppingCart className="h-5 w-5 text-secondary-foreground" />}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                  </div>
                  
                  <Badge
                    variant={
                      activity.status === "resolved" || activity.status === "completed" || activity.status === "delivered"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Camera className="h-5 w-5" />
                <span className="text-sm">New Diagnosis</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Market Prices</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm">Marketplace</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Bell className="h-5 w-5" />
                <span className="text-sm">Notifications</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}