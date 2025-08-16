import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookNowFormLauncher } from "@/components/FormLauncher";
import EnhancedInteractiveForm from "@/components/EnhancedInteractiveForm";
import { 
  Star, Crown, Sparkles, MapPin, Clock, Users, 
  Plane, Hotel, Utensils, Award, Heart, Phone, Filter, Calendar
} from "lucide-react";
import type { Tour } from "@shared/schema";

const luxuryFeatures = [
  {
    icon: Crown,
    title: "Ultra-Luxury Accommodations",
    description: "Stay at Amankora, Uma, Six Senses, and other world-class resorts",
  },
  {
    icon: Plane,
    title: "Private Helicopter Transfers",
    description: "Scenic helicopter flights between destinations",
  },
  {
    icon: Award,
    title: "Exclusive Access",
    description: "Private monastery visits and royal palace tours",
  },
  {
    icon: Utensils,
    title: "Gourmet Experiences",
    description: "Private dining with royal chefs and wine pairings",
  }
];

const luxuryAccommodations = [
  {
    name: "Amankora",
    location: "Thimphu, Paro, Punakha, Gangtey, Bumthang",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    features: ["Private pavilions", "Spa sanctuary", "Farm-to-table dining"],
    priceRange: "$1,500 - $3,000/night"
  },
  {
    name: "Uma by COMO",
    location: "Paro & Punakha",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    features: ["Himalayan views", "COMO Shambhala Spa", "Adventure activities"],
    priceRange: "$800 - $1,500/night"
  },
  {
    name: "Six Senses Bhutan",
    location: "Thimphu & Paro",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    features: ["Wellness programs", "Organic cuisine", "Cultural immersion"],
    priceRange: "$1,200 - $2,200/night"
  }
];

export default function LuxuryToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);
  const [isCustomTourFormOpen, setIsCustomTourFormOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Filter states
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  // Filter and sort tours
  const filteredAndSortedTours = useMemo(() => {
    let filtered = tours.filter(tour => tour.category === "Luxury");

    if (selectedDuration !== "all") {
      switch (selectedDuration) {
        case "short":
          filtered = filtered.filter(tour => tour.duration && tour.duration <= 3);
          break;
        case "medium":
          filtered = filtered.filter(tour => tour.duration && tour.duration >= 4 && tour.duration <= 7);
          break;
        case "long":
          filtered = filtered.filter(tour => tour.duration && tour.duration >= 8);
          break;
      }
    }

    if (selectedPriceRange !== "all") {
      switch (selectedPriceRange) {
        case "budget":
          filtered = filtered.filter(tour => tour.price && tour.price < 3000);
          break;
        case "mid":
          filtered = filtered.filter(tour => tour.price && tour.price >= 3000 && tour.price < 6000);
          break;
        case "luxury":
          filtered = filtered.filter(tour => tour.price && tour.price >= 6000);
          break;
      }
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(tour => tour.difficulty === selectedDifficulty);
    }

    switch (sortBy) {
      case "price-low":
        filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "duration-short":
        filtered = filtered.sort((a, b) => (a.duration || 0) - (b.duration || 0));
        break;
      case "duration-long":
        filtered = filtered.sort((a, b) => (b.duration || 0) - (a.duration || 0));
        break;
      case "rating":
        filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [tours, selectedDuration, selectedPriceRange, selectedDifficulty, sortBy]);

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };

  const clearAllFilters = () => {
    setSelectedDuration("all");
    setSelectedPriceRange("all");
    setSelectedDifficulty("all");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="brand-section-header mb-4">
            <Crown className="w-4 h-4" />
            Luxury Tours
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 brand-heading">
            Unforgettable <span className="gradient-text-gold">Luxury in Bhutan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed brand-body">
            Experience the Kingdom of Bhutan in unparalleled comfort and style. Our luxury tours offer exclusive access and world-class hospitality.
          </p>
        </div>

        {/* Luxury Features */}
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
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-900">Filter Tours:</span>
              </div>
              <div className="flex flex-wrap gap-4 flex-1">
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-[140px]"><SelectValue placeholder="Duration" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any duration</SelectItem>
                    <SelectItem value="short">1-5 days</SelectItem>
                    <SelectItem value="medium">6-10 days</SelectItem>
                    <SelectItem value="long">11+ days</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="w-[140px]"><SelectValue placeholder="Price" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any price</SelectItem>
                    <SelectItem value="budget">Under $3,000</SelectItem>
                    <SelectItem value="mid">$3,000 - $6,000</SelectItem>
                    <SelectItem value="luxury">$6,000+</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-[140px]"><SelectValue placeholder="Difficulty" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any level</SelectItem>
                    <SelectItem value="easy">Relaxed</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="challenging">Active</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]"><SelectValue placeholder="Sort By" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={clearAllFilters} className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">Clear</Button>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">{filteredAndSortedTours.length} tours</Badge>
            </div>
          </Card>
        </div>

        {/* Tours Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Luxury Tour Packages ({filteredAndSortedTours.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img src={tour.imageUrl} alt={tour.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">Luxury</Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {tour.duration} days
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{tour.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tour.description}</p>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{tour.duration}d</div>
                    <div className="flex items-center"><Users className="w-4 h-4 mr-1" />{tour.maxGroupSize || 10}</div>
                    <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />{tour.rating || 5.0}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${tour.price?.toLocaleString() || '0'}</span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/tours/${tour.id}`}><Button variant="outline" size="sm">View Details</Button></Link>
                      <Button size="sm" onClick={() => handleBookNow(tour)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">Book Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Luxury Accommodations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">World-Class Accommodations</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {luxuryAccommodations.map((hotel, index) => (
              <Card key={index} className="brand-card overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                  <div className="flex items-center text-gray-600 mb-4"><MapPin className="w-4 h-4 mr-2" />{hotel.location}</div>
                  <div className="space-y-2 mb-4">
                    {hotel.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600"><Sparkles className="w-4 h-4 text-yellow-500 mr-2" />{feature}</div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="text-lg font-bold text-yellow-600">{hotel.priceRange}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready for the Ultimate Luxury Experience?</h2>
            <p className="text-xl mb-6 opacity-90">Let our luxury travel specialists create a bespoke journey tailored to your preferences.</p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setIsCustomTourFormOpen(true)} className="bg-white text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800 font-semibold px-8 py-3 shadow-lg border-2 border-white transform hover:scale-105 transition-all duration-200">
                <Crown className="w-5 h-5 mr-2" />Plan My Luxury Journey
              </Button>
              <Button onClick={() => setIsContactFormOpen(true)} className="border-2 border-white text-white hover:bg-white hover:text-yellow-700 font-semibold px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200">
                <Heart className="w-5 h-5 mr-2" />Contact Specialist
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <BookNowFormLauncher isOpen={isBookNowFormOpen} onClose={() => setIsBookNowFormOpen(false)} selectedTour={selectedTour} />

      {isCustomTourFormOpen && (
        <EnhancedInteractiveForm
          formType="custom-tour"
          isOpen={isCustomTourFormOpen}
          onClose={() => setIsCustomTourFormOpen(false)}
          initialData={{}}
          onSubmitSuccess={() => setIsCustomTourFormOpen(false)}
        />
      )}

      {isContactFormOpen && (
        <EnhancedInteractiveForm
          formType="contact"
          isOpen={isContactFormOpen}
          onClose={() => setIsContactFormOpen(false)}
          initialData={{}}
          onSubmitSuccess={() => setIsContactFormOpen(false)}
        />
      )}
    </div>
  );
}