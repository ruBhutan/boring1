import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookNowFormLauncher } from "@/components/FormLauncher";
import type { Tour } from "@shared/schema";
import {
    Activity,
    Award, Backpack,
    Calendar,
    ChevronRight,
    Clock,
    Compass,
    Filter,
    Heart,
    Mountain,
    Route,
    Shield,
    Star,
    Target,
    Users
} from "lucide-react";
import { Link } from "react-router-dom";

const adventureActivities = [
  {
    icon: Mountain,
    title: "High-Altitude Trekking",
    description: "Multi-day treks through pristine Himalayan wilderness",
    difficulty: "Challenging",
    highlights: ["Snowman Trek", "Druk Path Trek", "Jomolhari Base Camp"]
  },
  {
    icon: Activity,
    title: "White Water Rafting",
    description: "Navigate thrilling rapids on pristine mountain rivers",
    difficulty: "Moderate",
    highlights: ["Mo Chhu River", "Pho Chhu River", "Grade III-IV rapids"]
  },
  {
    icon: Target,
    title: "Traditional Archery",
    description: "Master Bhutan's national sport with bamboo bows",
    difficulty: "Easy",
    highlights: ["Traditional techniques", "Local competitions", "Cultural immersion"]
  },
  {
    icon: Compass,
    title: "Mountain Biking",
    description: "Cycle through valleys and mountain passes",
    difficulty: "Moderate",
    highlights: ["Thimphu-Paro trail", "Bumthang circuits", "Village routes"]
  }
];

const trekDifficulties = [
  {
    level: "Easy",
    color: "green",
    description: "Suitable for beginners, minimal elevation gain",
    examples: ["Druk Path Trek", "Bumthang Cultural Trek"]
  },
  {
    level: "Moderate", 
    color: "yellow",
    description: "Some hiking experience required, moderate elevation",
    examples: ["Jomolhari Trek", "Dagala Thousand Lakes"]
  },
  {
    level: "Challenging",
    color: "orange", 
    description: "Experienced hikers only, high altitude",
    examples: ["Snowman Trek", "Laya Gasa Trek"]
  },
  {
    level: "Extreme",
    color: "red",
    description: "Expert level, technical climbing required",
    examples: ["Jhomolhari II Peak", "Table Mountain"]
  }
];

export default function AdventureToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);

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
    let filtered = tours.filter(tour => tour.category === "Adventure");

    // Duration filter
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

    // Price range filter
    if (selectedPriceRange !== "all") {
      switch (selectedPriceRange) {
        case "budget":
          filtered = filtered.filter(tour => tour.price && tour.price < 2000);
          break;
        case "mid":
          filtered = filtered.filter(tour => tour.price && tour.price >= 2000 && tour.price < 4000);
          break;
        case "luxury":
          filtered = filtered.filter(tour => tour.price && tour.price >= 4000);
          break;
      }
    }

    // Difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(tour => tour.difficulty === selectedDifficulty);
    }

    // Sort
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
      default: // featured
        // Keep original order for featured
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="brand-section-header mb-4">
            <Mountain className="w-4 h-4" />
            Adventure Tours
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 brand-heading">
            Experience Bhutan's <span className="gradient-text-amber">Wild Side</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed brand-body">
            From serene treks in pristine landscapes to thrilling river rafting, discover an adventure that moves you.
          </p>
        </div>

        {/* Adventure Activities */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
            {adventureActivities.map((activity, index) => (
              <div key={index} className="brand-card text-center p-6">
                <div className="bg-amber-gradient-light p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center amber-glow">
                  <activity.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 brand-heading">{activity.title}</h3>
                <p className="text-sm text-gray-600 brand-body">{activity.description}</p>
              </div>
            ))}
        </div>

        {/* Filter Controls */}
        <div className="mb-12">
          <Card className="p-6 bg-gradient-to-r from-white to-amber-50 border-amber-200">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-gray-900">Filter Tours:</span>
              </div>

              <div className="flex flex-wrap gap-4 flex-1">
                {/* Duration Filter */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Any duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any duration</SelectItem>
                      <SelectItem value="short">1-3 days</SelectItem>
                      <SelectItem value="medium">4-7 days</SelectItem>
                      <SelectItem value="long">8+ days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any price</SelectItem>
                      <SelectItem value="budget">Under $2,000</SelectItem>
                      <SelectItem value="mid">$2,000 - $4,000</SelectItem>
                      <SelectItem value="luxury">$4,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty Filter */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any level</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="challenging">Challenging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="duration-short">Duration: Short to Long</SelectItem>
                      <SelectItem value="duration-long">Duration: Long to Short</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="border-amber-200 text-amber-700 hover:bg-amber-50"
                >
                  Clear Filters
                </Button>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                  {filteredAndSortedTours.length} tours
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Tours Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Adventure Tour Packages ({filteredAndSortedTours.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={tour.imageUrl}
                    alt={tour.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-amber-600 text-white">
                    Adventure
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {tour.duration} days
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {tour.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {tour.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tour.duration}d
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tour.maxGroupSize || 12}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-amber-400 fill-current" />
                      {tour.rating || 5.0}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${tour.price?.toLocaleString() || '0'}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/tours/${tour.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        onClick={() => handleBookNow(tour)}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trek Difficulty Guide */}
        <section className="py-20 bg-gradient-to-br from-white to-amber-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="brand-section-header-light mb-6">
                        <Route className="w-5 h-5" />
                        Trek Difficulty Guide
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Choose Your
                        <span className="gradient-text-amber"> Challenge Level</span>
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trekDifficulties.map((level, index) => (
                        <Card key={index} className="brand-card">
                            <CardHeader>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                    level.color === 'green' ? 'bg-teal-100' :
                                    level.color === 'yellow' ? 'bg-amber-100' :
                                    level.color === 'orange' ? 'bg-amber-100' : 'bg-amber-100'
                                }`}>
                                    <div className={`w-6 h-6 rounded-full ${
                                        level.color === 'green' ? 'bg-teal-500' :
                                        level.color === 'yellow' ? 'bg-amber-500' :
                                        level.color === 'orange' ? 'bg-amber-600' : 'bg-amber-700'
                                    }`}></div>
                                </div>
                                <CardTitle className="text-center">{level.level}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-gray-600 mb-4">{level.description}</p>
                                <div className="space-y-2">
                                    {level.examples.map((example, idx) => (
                                        <div key={idx} className="text-sm text-teal-600">
                                            {example}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Safety & Preparation */}
        <section className="py-20 bg-amber-gradient-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-6">
                        Safety & Preparation
                    </h2>
                    <p className="text-xl text-amber-100 max-w-3xl mx-auto">
                        Your safety is our priority. We provide comprehensive preparation and support for all adventures.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <CardHeader>
                            <Shield className="w-12 h-12 text-amber-300 mb-4" />
                            <CardTitle>Safety First</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-amber-100">
                                <li>• Certified mountain guides</li>
                                <li>• Emergency communication</li>
                                <li>• First aid trained staff</li>
                                <li>• Weather monitoring</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <CardHeader>
                            <Heart className="w-12 h-12 text-amber-300 mb-4" />
                            <CardTitle>Health Preparation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-amber-100">
                                <li>• Altitude acclimatization</li>
                                <li>• Fitness requirements</li>
                                <li>• Medical consultations</li>
                                <li>• Insurance coverage</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                        <CardHeader>
                            <Backpack className="w-12 h-12 text-amber-300 mb-4" />
                            <CardTitle>Equipment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-amber-100">
                                <li>• Professional gear rental</li>
                                <li>• Packing checklists</li>
                                <li>• Quality equipment</li>
                                <li>• Technical support</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
      </div>

      <BookNowFormLauncher
        isOpen={isBookNowFormOpen}
        onClose={() => setIsBookNowFormOpen(false)}
        selectedTour={selectedTour}
      />
    </div>
  );
}