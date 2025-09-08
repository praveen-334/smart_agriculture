import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Scan, 
  ShoppingCart, 
  CloudSun, 
  FileText, 
  Users, 
  Camera,
  TrendingUp,
  Bell,
  Settings,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-farming.jpg';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  const features = [
    {
      id: 'diagnosis',
      title: t('cropDiagnosis'),
      description: 'AI-powered disease detection',
      icon: Scan,
      color: 'success',
      action: () => onNavigate('diagnosis')
    },
    {
      id: 'marketplace',
      title: t('marketplace'),
      description: t('marketplace_desc'),
      icon: ShoppingCart,
      color: 'farmer',
      action: () => onNavigate('marketplace')
    },
    {
      id: 'weather',
      title: t('weather'),
      description: 'Real-time weather & crop tips',
      icon: CloudSun,
      color: 'weather',
      action: () => onNavigate('weather')
    },
    {
      id: 'schemes',
      title: t('schemes'),
      description: 'Latest subsidies & benefits',
      icon: FileText,
      color: 'warning',
      action: () => onNavigate('schemes')
    },
    {
      id: 'community',
      title: t('community'),
      description: 'Connect with other farmers',
      icon: Users,
      color: 'secondary',
      action: () => onNavigate('community')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-earth shadow-natural">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-primary-foreground">
              {t('appName')}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon-sm"
              onClick={toggleLanguage}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Globe className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon-sm"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon-sm"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="h-64 bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-primary-foreground max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
                {t('welcomeMessage')}
              </h2>
              <p className="text-lg opacity-90 animate-fade-in">
                {language === 'en' 
                  ? "Empowering farmers with AI-driven insights, weather forecasts, and direct market access."
                  : "செயற்கை நுண்ணறிவு நுண்ணறிவுகள், வானிலை முன்னறிவிப்புகள் மற்றும் நேரடி சந்தை அணுகல் மூலம் விவசாயிகளை மேம்படுத்துதல்."
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.id}
              className="shadow-card hover:shadow-natural transition-smooth cursor-pointer transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={feature.action}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg bg-${feature.color} text-${feature.color}-foreground`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">85%</div>
              <div className="text-sm text-muted-foreground">Disease Detection Accuracy</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">12K+</div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">₹45L</div>
              <div className="text-sm text-muted-foreground">Savings Generated</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent-bright">98%</div>
              <div className="text-sm text-muted-foreground">Weather Accuracy</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};