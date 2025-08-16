import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, MapPin, Palette, Heart, Crown, Award, Filter
} from "lucide-react";
import { HotelBookingFormLauncher } from "@/components/FormLauncher";
import type { Hotel } from "@shared/schema";

const boutiqueFeatures = [
  {
    icon: Palette,
    title: "Unique Design",
    description: "Distinctive architecture and curated interiors."
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Intimate service with attention to every detail."
  },
  {
    icon: Crown,
    title: "Exclusive Experience",
    description: "Limited rooms ensure privacy and exclusivity."
  },
  {
    icon: Award,
    title: "Local Character",
    description: "Authentic Bhutanese culture in every aspect."
  }
];

export default function BoutiqueHotelsPage() {
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
    let filtered = hotels.filter(hotel => hotel.category === "boutique");

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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="brand-section-header mb-4">
            <Palette className="w-4 h-4" />
            Boutique Hotels
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 brand-heading">
            Charm & Character in <span className="gradient-text">Every Stay</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed brand-body">
            Experience Bhutan's soul through its most unique and intimate hotels, each with a story to tell.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {boutiqueFeatures.map((feature, index) => (
            <div key={index} className="brand-card text-center p-6">
              <div className="bg-teal-gradient-light p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center teal-glow">
                <feature.icon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 brand-heading">{feature.title}</h3>
              <p className="text-sm text-gray-600 brand-body">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="mb-12">
          <Card className="p-6 bg-gradient-to-r from-white to-teal-50 border-teal-200">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-2"><Filter className="w-5 h-5 text-teal-600" /><span className="font-semibold">Filter Hotels:</span></div>
              <div className="flex flex-wrap gap-4 flex-1">
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Price Range" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="0-200">$0 - $200</SelectItem>
                    <SelectItem value="200-400">$200 - $400</SelectItem>
                    <SelectItem value="400-99999">$400+</SelectItem>
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
              <Button variant="outline" onClick={clearAllFilters} className="border-teal-200 text-teal-700 hover:bg-teal-50">Clear</Button>
              <Badge variant="secondary" className="bg-teal-100 text-teal-700">{filteredAndSortedHotels.length} hotels</Badge>
            </div>
          </Card>
        </div>

        {/* Hotels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedHotels.map((hotel) => (
            <Card key={hotel.id} className="brand-card overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-56 object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 flex items-center">
                  <Star className="w-4 h-4 text-teal-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{hotel.starRating}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                <div className="flex items-center text-gray-500 mb-4"><MapPin className="w-4 h-4 mr-1" />{hotel.location}</div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{hotel.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities?.slice(0, 4).map((amenity, idx) => (
                    <Badge key={idx} variant="outline" className="border-teal-200 text-teal-700">{amenity}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold text-teal-600">${hotel.pricePerNight}</span>
                    <span className="text-gray-500 ml-1 text-sm">/night</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/hotels/${hotel.id}`}><Button variant="outline">Details</Button></Link>
                    <Button onClick={() => handleBookNow(hotel)} className="bg-teal-600 hover:bg-teal-700 text-white">Book</Button>
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
