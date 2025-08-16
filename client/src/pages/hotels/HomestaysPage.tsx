import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, MapPin, Home, Users, Heart, Utensils, TreePine, Filter
} from "lucide-react";
import { HotelBookingFormLauncher } from "@/components/FormLauncher";
import type { Hotel } from "@shared/schema";

const homestayBenefits = [
  {
    icon: Heart,
    title: "Authentic Experience",
    description: "Live with local families and experience genuine Bhutanese hospitality and daily life."
  },
  {
    icon: Utensils,
    title: "Home-Cooked Meals",
    description: "Enjoy traditional Bhutanese cuisine prepared with love by your host family."
  },
  {
    icon: Users,
    title: "Cultural Exchange",
    description: "Learn about local customs, traditions, and way of life through meaningful interactions."
  },
  {
    icon: TreePine,
    title: "Rural Setting",
    description: "Experience the peaceful countryside and traditional village life away from crowds."
  }
];

export default function HomestaysPage() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isHotelBookingFormOpen, setIsHotelBookingFormOpen] = useState(false);

  // Filter states
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const { data: hotels = [] } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => hotel.category === "homestay");

    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(h => h.pricePerNight >= min && (max ? h.pricePerNight <= max : true));
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "price-high":
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case "rating":
        filtered.sort((a, b) => (b.starRating || 0) - (a.starRating || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [hotels, selectedPriceRange, sortBy]);

  const handleBookNow = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsHotelBookingFormOpen(true);
  };

  const clearAllFilters = () => {
    setSelectedPriceRange("all");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="brand-section-header mb-4">
            <Home className="w-4 h-4" />
            Homestays
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 brand-heading">
            Live Like a Local in <span className="gradient-text-green">Bhutan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed brand-body">
            Immerse yourself in authentic Bhutanese culture by staying with a local family in a traditional home.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {homestayBenefits.map((benefit, index) => (
            <div key={index} className="brand-card text-center p-6">
              <div className="bg-green-gradient-light p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center green-glow">
                <benefit.icon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 brand-heading">{benefit.title}</h3>
              <p className="text-sm text-gray-600 brand-body">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="mb-12">
          <Card className="p-6 bg-gradient-to-r from-white to-green-50 border-green-200">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-2"><Filter className="w-5 h-5 text-green-600" /><span className="font-semibold">Filter Homestays:</span></div>
              <div className="flex flex-wrap gap-4 flex-1">
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Price Range" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="0-50">$0 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-99999">$100+</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort By" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={clearAllFilters} className="border-green-200 text-green-700 hover:bg-green-50">Clear</Button>
              <Badge variant="secondary" className="bg-green-100 text-green-700">{filteredAndSortedHotels.length} homestays</Badge>
            </div>
          </Card>
        </div>

        {/* Homestays Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedHotels.map((hotel) => (
            <Card key={hotel.id} className="brand-card overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-56 object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 flex items-center">
                  <Star className="w-4 h-4 text-green-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{hotel.starRating || "4.5"}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                <div className="flex items-center text-gray-500 mb-4"><MapPin className="w-4 h-4 mr-1" />{hotel.location}</div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{hotel.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities?.slice(0, 4).map((amenity, idx) => (
                    <Badge key={idx} variant="outline" className="border-green-200 text-green-700">{amenity}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold text-green-600">${hotel.pricePerNight}</span>
                    <span className="text-gray-500 ml-1 text-sm">/night</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/hotels/${hotel.id}`}><Button variant="outline">Details</Button></Link>
                    <Button onClick={() => handleBookNow(hotel)} className="bg-green-600 hover:bg-green-700 text-white">Book</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <HotelBookingFormLauncher
        isOpen={isHotelBookingFormOpen}
        onClose={() => setIsHotelBookingFormOpen(false)}
        selectedHotel={selectedHotel}
        selectedRoom={null}
      />
    </div>
  );
}
