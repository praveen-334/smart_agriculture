import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  Calendar,
  MapPin,
  Bell,
  Mic,
  Leaf,
  Wheat,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";

export default function Weather() {
  const [selectedLocation, setSelectedLocation] = useState("Punjab, India");

  const currentWeather = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6,
    icon: Cloud,
    location: "Ludhiana, Punjab"
  };

  const forecast = [
    { day: "Today", high: 30, low: 22, condition: "Partly Cloudy", icon: Cloud, rainChance: 20 },
    { day: "Tomorrow", high: 32, low: 24, condition: "Sunny", icon: Sun, rainChance: 5 },
    { day: "Friday", high: 29, low: 21, condition: "Rainy", icon: CloudRain, rainChance: 80 },
    { day: "Saturday", high: 26, low: 19, condition: "Rainy", icon: CloudRain, rainChance: 70 },
    { day: "Sunday", high: 28, low: 20, condition: "Cloudy", icon: Cloud, rainChance: 30 }
  ];

  const farmingAlerts = [
    {
      type: "warning",
      title: "Heavy Rainfall Expected",
      description: "Protect your crops from waterlogging. Consider drainage measures.",
      time: "Next 2 days",
      action: "Take Action",
      icon: AlertTriangle
    },
    {
      type: "success",
      title: "Perfect Sowing Conditions",
      description: "Ideal weather for wheat sowing in your region.",
      time: "This week",
      action: "Start Sowing",
      icon: CheckCircle
    },
    {
      type: "info",
      title: "Pest Alert",
      description: "Current humidity levels may increase pest activity.",
      time: "Monitor crops",
      action: "Learn More",
      icon: Info
    }
  ];

  const cropRecommendations = [
    {
      crop: "Wheat",
      action: "Sow",
      reason: "Optimal temperature and moisture",
      timing: "Next 7 days",
      icon: Wheat,
      confidence: 95
    },
    {
      crop: "Rice",
      action: "Wait",
      reason: "Need more rainfall for transplanting",
      timing: "Wait 2 weeks",
      icon: Leaf,
      confidence: 80
    },
    {
      crop: "Sugarcane",
      action: "Harvest",
      reason: "Perfect weather for harvesting",
      timing: "This month",
      icon: Leaf,
      confidence: 90
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning": return "warning";
      case "success": return "success";
      case "info": return "info";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Weather & Farming Guide</h1>
              <p className="text-primary-foreground/90 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {currentWeather.location}
              </p>
            </div>
            <Button variant="voice" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Current Weather */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Main Weather */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <currentWeather.icon className="h-16 w-16 text-primary" />
                  <div>
                    <p className="text-4xl font-bold">{currentWeather.temperature}°C</p>
                    <p className="text-muted-foreground">{currentWeather.condition}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">{currentWeather.location}</span>
                </div>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                  <Droplets className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="font-semibold">{currentWeather.humidity}%</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                  <Wind className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Wind Speed</p>
                    <p className="font-semibold">{currentWeather.windSpeed} km/h</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                  <Eye className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Visibility</p>
                    <p className="font-semibold">{currentWeather.visibility} km</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                  <Sun className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">UV Index</p>
                    <p className="font-semibold">{currentWeather.uvIndex}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              5-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center p-4 bg-accent/30 rounded-lg">
                  <p className="font-medium mb-2">{day.day}</p>
                  <day.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground mb-1">{day.condition}</p>
                  <div className="flex justify-center gap-2 text-sm">
                    <span className="font-semibold">{day.high}°</span>
                    <span className="text-muted-foreground">{day.low}°</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs">
                    <Droplets className="h-3 w-3 text-primary" />
                    <span>{day.rainChance}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Farming Alerts */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Farming Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmingAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === "warning"
                      ? "border-warning bg-warning/5"
                      : alert.type === "success"
                      ? "border-success bg-success/5"
                      : "border-info bg-info/5"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <alert.icon
                        className={`h-5 w-5 mt-0.5 ${
                          alert.type === "warning"
                            ? "text-warning"
                            : alert.type === "success"
                            ? "text-success"
                            : "text-info"
                        }`}
                      />
                      <div>
                        <h4 className="font-semibold">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{alert.description}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={alert.type === "warning" ? "border-warning text-warning" : ""}
                    >
                      {alert.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Crop Recommendations */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              AI Crop Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {cropRecommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gradient-card rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <rec.icon className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">{rec.crop}</h4>
                      <Badge
                        variant={
                          rec.action === "Sow" || rec.action === "Harvest"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {rec.action}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                  <p className="text-sm font-medium mb-3">{rec.timing}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">AI Confidence</span>
                    <span className="text-sm font-bold text-primary">{rec.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Weather Actions</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Bell className="h-5 w-5" />
                <span className="text-sm">Weather Alerts</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Crop Calendar</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Leaf className="h-5 w-5" />
                <span className="text-sm">Pest Forecast</span>
              </Button>
              <Button variant="voice" className="h-auto py-4 flex-col gap-2">
                <Mic className="h-5 w-5" />
                <span className="text-sm">Voice Weather</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}