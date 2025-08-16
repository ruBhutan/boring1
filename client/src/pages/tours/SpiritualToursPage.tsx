import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookNowFormLauncher } from "@/components/FormLauncher";
import EnhancedInteractiveForm from "@/components/EnhancedInteractiveForm";
import type { Tour } from "@shared/schema";
import {
    Bell,
    Calendar,
    Clock,
    Filter,
    Flame,
    Flower2,
    Heart,
    Mountain,
    Sparkles,
    Star,
    Sunrise,
    Users
} from "lucide-react";

const spiritualExperiences = [
  {
    icon: Flower2,
    title: "Meditation Retreats",
    description: "Learn ancient Buddhist meditation techniques from master monks",
  },
  {
    icon: Bell,
    title: "Monastery Stays",
    description: "Live alongside monks and experience monastic life",
  },
  {
    icon: Flame,
    title: "Sacred Rituals",
    description: "Participate in traditional Buddhist ceremonies and pujas",
  },
  {
    icon: Mountain,
    title: "Pilgrimage Journeys",
    description: "Visit sacred sites and holy mountains across Bhutan",
  }
];

const sacredSites = [
  {
    name: "Tiger's Nest Monastery",
    location: "Paro",
    significance: "Most sacred Buddhist site in Bhutan",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
  },
  {
    name: "Punakha Dzong",
    location: "Punakha",
    significance: "Winter residence of the Je Khenpo",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
  },
  {
    name: "Bumthang Sacred Valley",
    location: "Bumthang",
    significance: "Spiritual heartland of Bhutan",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  }
];

export default function SpiritualToursPage() {
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

  const filteredAndSortedTours = useMemo(() => {
    let filtered = tours.filter(tour => tour.category === "Spiritual");

    if (selectedDuration !== "all") {
      switch (selectedDuration) {
        case "short": filtered = filtered.filter(t => t.duration && t.duration <= 4); break;
        case "medium": filtered = filtered.filter(t => t.duration && t.duration >= 5 && t.duration <= 8); break;
        case "long": filtered = filtered.filter(t => t.duration && t.duration >= 9); break;
      }
    }

    if (selectedPriceRange !== "all") {
      switch (selectedPriceRange) {
        case "budget": filtered = filtered.filter(t => t.price && t.price < 1500); break;
        case "mid": filtered = filtered.filter(t => t.price && t.price >= 1500 && t.price < 3000); break;
        case "luxury": filtered = filtered.filter(t => t.price && t.price >= 3000); break;
      }
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(tour => tour.difficulty === selectedDifficulty);
    }

    switch (sortBy) {
      case "price-low": filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case "price-high": filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case "duration-short": filtered = filtered.sort((a, b) => (a.duration || 0) - (b.duration || 0)); break;
      case "duration-long": filtered = filtered.sort((a, b) => (b.duration || 0) - (a.duration || 0)); break;
      case "rating": filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default: break;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="brand-section-header mb-4">
            <Flower2 className="w-4 h-4" />
            Spiritual Tours
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 brand-heading">
            Find Your Inner Peace in <span className="gradient-text-purple">Bhutan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed brand-body">
            Journey through a land of profound spirituality. Our tours are designed to rejuvenate your mind, body, and soul.
          </p>
        </div>

        {/* Spiritual Experiences */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {spiritualExperiences.map((exp, index) => (
            <div key={index} className="brand-card text-center p-6">
              <div className="bg-purple-gradient-light p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center purple-glow">
                <exp.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 brand-heading">{exp.title}</h3>
              <p className="text-sm text-gray-600 brand-body">{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="mb-12">
          <Card className="p-6 bg-gradient-to-r from-white to-purple-50 border-purple-200">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-2"><Filter className="w-5 h-5 text-purple-600" /><span className="font-semibold">Filter Tours:</span></div>
              <div className="flex flex-wrap gap-4 flex-1">
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-[140px]"><SelectValue placeholder="Duration" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any duration</SelectItem>
                    <SelectItem value="short">1-4 days</SelectItem>
                    <SelectItem value="medium">5-8 days</SelectItem>
                    <SelectItem value="long">9+ days</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="w-[140px]"><SelectValue placeholder="Price" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any price</SelectItem>
                    <SelectItem value="budget">Under $1,500</SelectItem>
                    <SelectItem value="mid">$1,500 - $3,000</SelectItem>
                    <SelectItem value="luxury">$3,000+</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-[140px]"><SelectValue placeholder="Difficulty" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any level</SelectItem>
                    <SelectItem value="easy">Gentle</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="challenging">Intensive</SelectItem>
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
              <Button variant="outline" onClick={clearAllFilters} className="border-purple-200 text-purple-700 hover:bg-purple-50">Clear</Button>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">{filteredAndSortedTours.length} tours</Badge>
            </div>
          </Card>
        </div>

        {/* Tours Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Spiritual Tour Packages ({filteredAndSortedTours.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img src={tour.imageUrl} alt={tour.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <Badge className="absolute top-3 left-3 bg-purple-600 text-white">Spiritual</Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />{tour.duration} days
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{tour.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tour.description}</p>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{tour.duration}d</div>
                    <div className="flex items-center"><Users className="w-4 h-4 mr-1" />{tour.maxGroupSize || 15}</div>
                    <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-purple-400 fill-current" />{tour.rating || 4.9}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${tour.price?.toLocaleString() || '0'}</span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/tours/${tour.id}`}><Button variant="outline" size="sm">View Details</Button></Link>
                      <Button size="sm" onClick={() => handleBookNow(tour)} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">Book Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sacred Sites */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Sacred Sites</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {sacredSites.map((site, index) => (
              <Card key={index} className="brand-card overflow-hidden">
                <img src={site.image} alt={site.name} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{site.name}</h3>
                  <p className="text-gray-600 mb-4">{site.significance}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
            <h2 className="text-3xl font-bold mb-4">Begin Your Spiritual Journey</h2>
            <p className="text-xl mb-6 opacity-90">Connect with us to design a transformative spiritual tour of Bhutan.</p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setIsCustomTourFormOpen(true)} className="bg-white text-purple-700 hover:bg-purple-50 hover:text-purple-800 font-semibold px-8 py-3 shadow-lg border-2 border-white transform hover:scale-105 transition-all duration-200">
                <Sparkles className="w-5 h-5 mr-2" />Customize Retreat
              </Button>
              <Button onClick={() => setIsContactFormOpen(true)} className="border-2 border-white text-white hover:bg-white hover:text-purple-700 font-semibold px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200">
                <Heart className="w-5 h-5 mr-2" />Inquire Now
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