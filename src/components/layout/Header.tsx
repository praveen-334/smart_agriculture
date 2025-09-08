import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Camera, 
  ShoppingCart, 
  User, 
  Menu, 
  Mic,
  Leaf,
  TrendingUp,
  Users,
  MessageCircle,
  Cloud,
  X,
  Bell,
  Search
} from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Diagnose", path: "/diagnose", icon: Camera },
    { name: "Marketplace", path: "/buy", icon: ShoppingCart },
    { name: "Market Analysis", path: "/market-analysis", icon: TrendingUp },
    { name: "Weather", path: "/weather", icon: Cloud },
    { name: "Profile", path: "/user-profile", icon: User },
  ];

  const moreItems = [
    { name: "Crops & Hybrids", path: "/crops-hybrid", icon: Leaf },
    { name: "Government Schemes", path: "/government-schemes", icon: Users },
    { name: "Seller Panel", path: "/seller-panel", icon: ShoppingCart },
    { name: "News & Blogs", path: "/blogs", icon: MessageCircle },
    { name: "Support", path: "/support", icon: MessageCircle },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-primary">AgriSmart</span>
                <span className="text-xs text-muted-foreground hidden sm:block">Smart Farming Solutions</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-4 w-4" />
              </Button>
              
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="hidden md:flex relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-xs text-destructive-foreground">3</span>
                </div>
              </Button>
              
              {/* Voice Assistant */}
              <Button variant="voice" size="icon">
                <Mic className="h-4 w-4" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-2">
              {[...navItems, ...moreItems].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border shadow-elegant z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg min-w-[60px] transition-colors ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}