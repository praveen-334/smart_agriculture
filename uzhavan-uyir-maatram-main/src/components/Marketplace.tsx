import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, TrendingUp, MapPin, Phone, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarketplaceProps {
  onBack: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  const marketListings = [
    {
      id: 1,
      type: 'buy',
      crop: 'Rice (Premium)',
      quantity: '500 kg',
      price: '₹25/kg',
      location: 'Coimbatore',
      seller: 'Raman Farms',
      rating: 4.8,
      image: '🌾',
      quality: 'Grade A',
      harvestDate: '2024-01-15'
    },
    {
      id: 2,
      type: 'buy',
      crop: 'Tomatoes',
      quantity: '200 kg',
      price: '₹35/kg',
      location: 'Salem',
      seller: 'Kumar Agro',
      rating: 4.6,
      image: '🍅',
      quality: 'Fresh',
      harvestDate: '2024-01-20'
    },
    {
      id: 3,
      type: 'sell',
      crop: 'Sugarcane',
      quantity: '2000 kg',
      price: '₹28/kg',
      location: 'Erode',
      buyer: 'Tamil Sugar Mills',
      rating: 4.9,
      image: '🎋',
      quality: 'Premium',
      paymentTerms: 'Immediate'
    }
  ];

  const pricetrends = [
    { crop: 'Rice', currentPrice: '₹25/kg', change: '+5%', trend: 'up' },
    { crop: 'Wheat', currentPrice: '₹22/kg', change: '-2%', trend: 'down' },
    { crop: 'Tomato', currentPrice: '₹35/kg', change: '+12%', trend: 'up' },
    { crop: 'Onion', currentPrice: '₹18/kg', change: '+8%', trend: 'up' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-earth shadow-card p-4">
        <div className="max-w-6xl mx-auto flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">
            {t('marketplace')}
          </h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Price Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span>Today's Market Prices</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pricetrends.map((item, index) => (
                <div key={index} className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{item.crop}</div>
                  <div className="text-xl font-bold text-primary">{item.currentPrice}</div>
                  <Badge 
                    variant={item.trend === 'up' ? 'default' : 'destructive'}
                    className="mt-1"
                  >
                    {item.change}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Buy/Sell Toggle */}
        <div className="flex space-x-2 bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === 'buy' ? 'farmer' : 'ghost'}
            onClick={() => setActiveTab('buy')}
            className="flex-1"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Crops
          </Button>
          <Button
            variant={activeTab === 'sell' ? 'farmer' : 'ghost'}
            onClick={() => setActiveTab('sell')}
            className="flex-1"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Sell Crops
          </Button>
        </div>

        {/* Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketListings
            .filter(listing => listing.type === activeTab)
            .map((listing) => (
              <Card key={listing.id} className="shadow-card hover:shadow-natural transition-smooth">
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{listing.image}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{listing.crop}</h3>
                        <Badge variant="outline">{listing.quality}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{listing.price}</div>
                      <div className="text-sm text-muted-foreground">{listing.quantity}</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      <span>{activeTab === 'buy' ? listing.seller : listing.buyer}</span>
                      <span className="text-muted-foreground">
                        ({listing.rating})
                      </span>
                    </div>
                    {listing.harvestDate && (
                      <div className="text-sm text-muted-foreground">
                        Harvested: {listing.harvestDate}
                      </div>
                    )}
                    {listing.paymentTerms && (
                      <div className="text-sm text-success">
                        Payment: {listing.paymentTerms}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="farmer" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="field" size="sm" className="flex-1">
                      {activeTab === 'buy' ? 'Buy Now' : 'Accept Offer'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Post New Listing */}
        <Card className="shadow-natural bg-gradient-field">
          <CardContent className="p-6 text-center text-primary-foreground">
            <h3 className="text-xl font-bold mb-2">
              {activeTab === 'buy' ? 'Looking to buy crops?' : 'Have crops to sell?'}
            </h3>
            <p className="mb-4 opacity-90">
              {activeTab === 'buy' 
                ? 'Post your requirements and connect with sellers directly'
                : 'List your produce and reach thousands of buyers'
              }
            </p>
            <Button variant="secondary" size="lg">
              {activeTab === 'buy' ? 'Post Requirement' : 'List Your Crops'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};