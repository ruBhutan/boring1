import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HotelBookingFormLauncher } from "@/components/FormLauncher";
import { 
  Star, Crown, MapPin,
  Utensils, Waves, Mountain, Filter
} from "lucide-react";
import type { Hotel } from "@shared/schema";

const luxuryFeatures = [
  {
    icon: Crown,
    title: "Royal Treatment",
    description: "Experience service fit for royalty with personal butlers and concierge",
  },
  {
    icon: Waves,
    title: "World-Class Spas",
    description: "Rejuvenate with traditional and modern wellness treatments",
  },
  {
    icon: Utensils,
    title: "Gourmet Dining",
    description: "Savor exquisite cuisine from renowned chefs and local specialties",
  },
  {
    icon: Mountain,
    title: "Spectacular Views",
    description: "Wake up to breathtaking Himalayan vistas and pristine valleys",
  }
];

export default function LuxuryHotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isHotelBookingFormOpen, setIsHotelBookingFormOpen] = useState(false);

  // Filter states
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const { data: hotels = [] } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter(hotel => hotel.category === "luxury");

    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(h => h.pricePerNight >= min && (max ? h.pricePerNight <= max : true));
    }

    if (selectedRating !== "all") {
      filtered = filtered.filter(h => h.starRating && h.starRating >= Number(selectedRating));
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
  }, [hotels, selectedPriceRange, selectedRating, sortBy]);

  const handleBookNow = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsHotelBookingFormOpen(true);
  };

  const clearAllFilters = () => {
    setSelectedPriceRange("all");
    setSelectedRating("all");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="brand-section-header mb-4">
            <Crown className="w-4 h-4" />
            Luxury Hotels
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 brand-heading">
            Exquisite Stays in <span className="gradient-text-gold">the Kingdom</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed brand-body">
            Discover Bhutan's finest hotels, offering unparalleled luxury, service, and cultural immersion.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {luxuryFeatures.map((feature, index) => (
            <div key={index} className="brand-card text-center p-6">
              <div className="bg-gold-gradient-light p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center gold-glow">
                <feature.icon className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 brand-heading">{feature.title}</h3>
              <p className="text-sm text-gray-600 brand-body">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="mb-12">
          <Card className="p-6 bg-gradient-to-r from-white to-yellow-50 border-yellow-200">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-2"><Filter className="w-5 h-5 text-yellow-600" /><span className="font-semibold">Filter Hotels:</span></div>
              <div className="flex flex-wrap gap-4 flex-1">
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Price Range" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="0-500">$0 - $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1000</SelectItem>
                    <SelectItem value="1000-99999">$1000+</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Rating" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Rating</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars & Up</SelectItem>
                    <SelectItem value="3">3 Stars & Up</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort By" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={clearAllFilters} className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">Clear</Button>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">{filteredAndSortedHotels.length} hotels</Badge>
            </div>
          </Card>
        </div>

        {/* Hotels Grid */}
        <div className="space-y-8">
          {filteredAndSortedHotels.map((hotel) => (
            <Card key={hotel.id} className="brand-card overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="lg:flex">
                <div className="lg:w-1/3 relative">
                  <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-64 lg:h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{hotel.starRating}</span>
                  </div>
                </div>
                <div className="lg:w-2/3 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                  <div className="flex items-center text-gray-500 mb-4"><MapPin className="w-4 h-4 mr-1" />{hotel.location}</div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{hotel.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Amenities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities?.slice(0, 5).map((amenity, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-yellow-100 text-yellow-800">{amenity}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-3xl font-bold text-yellow-600">${hotel.pricePerNight}</span>
                      <span className="text-gray-500 ml-2 text-sm">per night</span>
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/hotels/${hotel.id}`}><Button variant="outline" className="border-yellow-300">View Details</Button></Link>
                      <Button onClick={() => handleBookNow(hotel)} className="bg-yellow-500 hover:bg-yellow-600 text-white">Book Now</Button>
                    </div>
                  </div>
                </div>
              </div>
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
