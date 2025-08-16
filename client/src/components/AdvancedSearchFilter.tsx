
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Search, Filter, MapPin, Calendar, Users, DollarSign, Mountain, Camera, Heart, X } from 'lucide-react';

interface SearchFilters {
  searchTerm: string;
  destination: string;
  tourType: string[];
  duration: number[];
  groupSize: number[];
  priceRange: number[];
  difficulty: string;
  season: string;
  activities: string[];
  accommodation: string;
  startDate: string;
  endDate: string;
}

interface Tour {
  id: string;
  title: string;
  destination: string;
  type: string[];
  duration: number;
  maxGroupSize: number;
  price: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  season: string[];
  activities: string[];
  accommodation: string[];
  image: string;
  rating: number;
  reviews: number;
}

// Sample tour data - in real app this would come from API
const sampleTours: Tour[] = [
  {
    id: '1',
    title: 'Tiger\'s Nest Monastery Trek',
    destination: 'Paro',
    type: ['spiritual', 'adventure'],
    duration: 3,
    maxGroupSize: 8,
    price: 850,
    difficulty: 'moderate',
    season: ['spring', 'autumn'],
    activities: ['trekking', 'photography', 'meditation'],
    accommodation: ['luxury', 'boutique'],
    image: '/api/placeholder/300/200',
    rating: 4.9,
    reviews: 124
  },
  {
    id: '2',
    title: 'Bhutan Cultural Heritage Tour',
    destination: 'Thimphu',
    type: ['cultural'],
    duration: 7,
    maxGroupSize: 12,
    price: 1200,
    difficulty: 'easy',
    season: ['spring', 'autumn', 'winter'],
    activities: ['sightseeing', 'cultural exchange', 'photography'],
    accommodation: ['luxury', 'premium'],
    image: '/api/placeholder/300/200',
    rating: 4.8,
    reviews: 89
  },
  // Add more sample tours...
];

const tourTypes = [
  { id: 'cultural', label: 'Cultural Tours', icon: Camera },
  { id: 'adventure', label: 'Adventure', icon: Mountain },
  { id: 'spiritual', label: 'Spiritual', icon: Heart },
  { id: 'luxury', label: 'Luxury', icon: DollarSign }
];

const activities = [
  'Trekking', 'Photography', 'Meditation', 'Cultural Exchange', 
  'Sightseeing', 'Bird Watching', 'Cycling', 'Rafting'
];

const destinations = [
  'Thimphu', 'Paro', 'Punakha', 'Bumthang', 'Haa Valley', 
  'Wangdue', 'Mongar', 'Jakar'
];

export default function AdvancedSearchFilter() {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    destination: '',
    tourType: [],
    duration: [1, 21],
    groupSize: [1, 20],
    priceRange: [500, 5000],
    difficulty: '',
    season: '',
    activities: [],
    accommodation: '',
    startDate: '',
    endDate: ''
  });

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');

  // Filter tours based on current filters
  const filteredTours = useMemo(() => {
    return sampleTours.filter(tour => {
      // Search term filter
      if (filters.searchTerm && !tour.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      
      // Destination filter
      if (filters.destination && filters.destination !== 'all' && tour.destination !== filters.destination) {
        return false;
      }
      
      // Tour type filter
      if (filters.tourType.length > 0 && !filters.tourType.some(type => tour.type.includes(type))) {
        return false;
      }
      
      // Duration filter
      if (tour.duration < filters.duration[0] || tour.duration > filters.duration[1]) {
        return false;
      }
      
      // Group size filter
      if (tour.maxGroupSize < filters.groupSize[0] || tour.maxGroupSize > filters.groupSize[1]) {
        return false;
      }
      
      // Price range filter
      if (tour.price < filters.priceRange[0] || tour.price > filters.priceRange[1]) {
        return false;
      }
      
      // Difficulty filter
      if (filters.difficulty && filters.difficulty !== 'any' && tour.difficulty !== filters.difficulty) {
        return false;
      }
      
      // Activities filter
      if (filters.activities.length > 0 && !filters.activities.some(activity => 
        tour.activities.includes(activity.toLowerCase())
      )) {
        return false;
      }
      
      return true;
    });
  }, [filters]);

  // Sort filtered tours
  const sortedTours = useMemo(() => {
    const sorted = [...filteredTours];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'duration':
        return sorted.sort((a, b) => a.duration - b.duration);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted.sort((a, b) => b.reviews - a.reviews);
    }
  }, [filteredTours, sortBy]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: '',
      destination: '',
      tourType: [],
      duration: [1, 21],
      groupSize: [1, 20],
      priceRange: [500, 5000],
      difficulty: '',
      season: '',
      activities: [],
      accommodation: '',
      startDate: '',
      endDate: ''
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.destination) count++;
    if (filters.tourType.length > 0) count++;
    if (filters.difficulty) count++;
    if (filters.season) count++;
    if (filters.activities.length > 0) count++;
    if (filters.accommodation) count++;
    return count;
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">Find Your Perfect Bhutan Adventure</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Use our advanced search to discover tours that match your interests, budget, and travel style.
        </p>
      </div>

      {/* Main Search Bar */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search tours, destinations, activities..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap lg:flex-nowrap gap-2">
              <Select value={filters.destination} onValueChange={(value) => updateFilter('destination', value)}>
                <SelectTrigger className="w-40">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destinations</SelectItem>
                  {destinations.map(dest => (
                    <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => updateFilter('startDate', e.target.value)}
                className="w-40"
                min={new Date().toISOString().split('T')[0]}
              />

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Advanced Filters</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tour Types */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Tour Types</Label>
                <div className="space-y-2">
                  {tourTypes.map(type => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={filters.tourType.includes(type.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFilter('tourType', [...filters.tourType, type.id]);
                          } else {
                            updateFilter('tourType', filters.tourType.filter(t => t !== type.id));
                          }
                        }}
                      />
                      <Label htmlFor={type.id} className="flex items-center gap-2 cursor-pointer">
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Duration: {filters.duration[0]}-{filters.duration[1]} days
                </Label>
                <Slider
                  value={filters.duration}
                  onValueChange={(value) => updateFilter('duration', value)}
                  max={21}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 day</span>
                  <span>21 days</span>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Price: ${filters.priceRange[0]}-${filters.priceRange[1]}
                </Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilter('priceRange', value)}
                  max={5000}
                  min={500}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$500</span>
                  <span>$5000+</span>
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Difficulty Level</Label>
                <Select value={filters.difficulty} onValueChange={(value) => updateFilter('difficulty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Level</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="challenging">Challenging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Group Size */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Group Size: {filters.groupSize[0]}-{filters.groupSize[1]} people
                </Label>
                <Slider
                  value={filters.groupSize}
                  onValueChange={(value) => updateFilter('groupSize', value)}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 person</span>
                  <span>20+ people</span>
                </div>
              </div>

              {/* Season */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Best Season</Label>
                <Select value={filters.season} onValueChange={(value) => updateFilter('season', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Season</SelectItem>
                    <SelectItem value="spring">Spring (Mar-May)</SelectItem>
                    <SelectItem value="summer">Summer (Jun-Aug)</SelectItem>
                    <SelectItem value="autumn">Autumn (Sep-Nov)</SelectItem>
                    <SelectItem value="winter">Winter (Dec-Feb)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Activities */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Activities</Label>
              <div className="flex flex-wrap gap-2">
                {activities.map(activity => (
                  <Button
                    key={activity}
                    variant={filters.activities.includes(activity) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (filters.activities.includes(activity)) {
                        updateFilter('activities', filters.activities.filter(a => a !== activity));
                      } else {
                        updateFilter('activities', [...filters.activities, activity]);
                      }
                    }}
                  >
                    {activity}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold">
            {sortedTours.length} Tours Found
          </h3>
          <p className="text-gray-600">
            Showing results {filters.searchTerm && `for "${filters.searchTerm}"`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="sort" className="text-sm">Sort by:</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.destination && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.destination}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => updateFilter('destination', '')}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            )}
            {filters.tourType.map(type => (
              <Badge key={type} variant="secondary" className="flex items-center gap-1">
                {tourTypes.find(t => t.id === type)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => updateFilter('tourType', filters.tourType.filter(t => t !== type))}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
            {/* Add more active filter badges as needed */}
          </div>
        </div>
      )}

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTours.map(tour => (
          <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900">
                {tour.duration} days
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-2">{tour.title}</h3>
                <div className="text-right">
                  <div className="font-bold text-teal-600">${tour.price}</div>
                  <div className="text-xs text-gray-500">per person</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{tour.destination}</span>
                <div className="flex items-center gap-1 ml-auto">
                  <span className="text-sm font-medium">{tour.rating}</span>
                  <span className="text-xs text-gray-500">({tour.reviews})</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {tour.type.map(type => (
                  <Badge key={type} variant="outline" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>Max {tour.maxGroupSize}</span>
                </div>
                <Button size="sm" className="btn-brand-primary">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedTours.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tours found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms to find more results.
            </p>
            <Button onClick={clearAllFilters} className="btn-brand-primary">
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
