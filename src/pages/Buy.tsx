import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  MapPin, 
  Truck,
  Apple,
  Wheat,
  Zap
} from "lucide-react";
import marketplaceImage from "@/assets/marketplace.jpg";

const categories = [
  { name: "Fruits", icon: Apple, count: 145 },
  { name: "Vegetables", icon: Wheat, count: 230 },
  { name: "Fertilizers", icon: Zap, count: 67 },
  { name: "Seeds", icon: Wheat, count: 89 },
];

const products = [
  {
    id: 1,
    name: "Premium Tomatoes",
    category: "Vegetables",
    price: 45,
    unit: "kg",
    rating: 4.8,
    seller: "Green Valley Farm",
    location: "Punjab",
    image: marketplaceImage,
    inStock: true,
    organic: true,
  },
  {
    id: 2,
    name: "NPK Fertilizer",
    category: "Fertilizers",
    price: 850,
    unit: "50kg bag",
    rating: 4.6,
    seller: "AgriCorp",
    location: "Haryana",
    image: marketplaceImage,
    inStock: true,
    organic: false,
  },
  {
    id: 3,
    name: "Wheat Seeds (HD-3086)",
    category: "Seeds",
    price: 1200,
    unit: "quintal",
    rating: 4.9,
    seller: "SeedTech Ltd",
    location: "Rajasthan",
    image: marketplaceImage,
    inStock: false,
    organic: false,
  },
];

export default function Buy() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-secondary text-secondary-foreground p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Marketplace</h1>
          <p className="text-secondary-foreground/90">Buy fresh produce, fertilizers, seeds & farming equipment</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Search & Filters */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for crops, fertilizers, seeds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Button */}
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className={`cursor-pointer transition-all duration-200 hover:shadow-primary ${
                selectedCategory === category.name
                  ? "border-primary shadow-primary"
                  : "hover:border-primary/50"
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )
              }
            >
              <CardContent className="p-4 text-center">
                <category.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} items</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {selectedCategory ? `${selectedCategory}` : "All Products"}
            </h2>
            <p className="text-muted-foreground">{filteredProducts.length} products found</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="shadow-elegant hover:shadow-glow transition-all duration-300">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.organic && (
                    <Badge className="absolute top-2 left-2 bg-success text-success-foreground">
                      Organic
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Product Info */}
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-muted-foreground text-sm">{product.category}</p>
                    </div>

                    {/* Price & Rating */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                        <span className="text-muted-foreground">/{product.unit}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>

                    {/* Seller Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.seller}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{product.location}</span>
                        <Truck className="h-3 w-3 ml-2" />
                        <span>Free delivery</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant={product.inStock ? "default" : "outline"}
                        disabled={!product.inStock}
                        className="flex-1"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Notify Me"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <Truck className="h-4 w-4 mr-2" />
                Track Orders
              </Button>
              <Button variant="outline" className="justify-start">
                <Star className="h-4 w-4 mr-2" />
                My Wishlist
              </Button>
              <Button variant="outline" className="justify-start">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}