
import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin, DollarSign, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FilterOptions {
  destination: string[];
  duration: string[];
  priceRange: [number, number];
  festivalDates: string[];
  trekkingLevel: string[];
  themes: string[];
}

interface TourSearchFilterProps {
  onFilterChange: (filters: any) => void;
  availableFilters: FilterOptions;
}

export function TourSearchFilter({ onFilterChange, availableFilters }: TourSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedFestival, setSelectedFestival] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const themes = [
    'Honeymoon', 'Family', 'Adventure', 'Cultural', 'Spiritual', 'Luxury',
    'Photography', 'Trekking', 'Festival', 'Wellness', 'Bird Watching', 'Cycling'
  ];

  const trekkingLevels = ['Easy', 'Moderate', 'Challenging', 'Extreme'];
  const durations = ['1-3 days', '4-7 days', '8-14 days', '15+ days'];

  useEffect(() => {
    const filters = {
      search: searchQuery,
      destinations: selectedDestinations,
      duration: selectedDuration,
      priceRange,
      festival: selectedFestival,
      level: selectedLevel,
      themes: selectedThemes
    };
    onFilterChange(filters);
  }, [
    searchQuery, selectedDestinations, selectedDuration, priceRange,
    selectedFestival, selectedLevel, selectedThemes, onFilterChange
  ]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDestinations([]);
    setSelectedDuration('');
    setPriceRange([0, 10000]);
    setSelectedFestival('');
    setSelectedLevel('');
    setSelectedThemes([]);
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tours, destinations, activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={showAdvanced ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {showAdvanced ? 'Hide Filters' : 'Show Filters'}
            </Button>
            
            {(selectedDestinations.length > 0 || selectedDuration || selectedLevel || selectedThemes.length > 0) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="themes">Themes</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Duration Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Duration
                    </label>
                    <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any duration</SelectItem>
                        {durations.map(duration => (
                          <SelectItem key={duration} value={duration}>
                            {duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Trekking Level */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Difficulty Level
                    </label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any level</SelectItem>
                        {trekkingLevels.map(level => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Festival Dates */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Festival Season
                    </label>
                    <Select value={selectedFestival} onValueChange={setSelectedFestival}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any time</SelectItem>
                        <SelectItem value="spring">Spring Festivals</SelectItem>
                        <SelectItem value="autumn">Autumn Festivals</SelectItem>
                        <SelectItem value="winter">Winter Festivals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    max={10000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                </div>
              </TabsContent>

              <TabsContent value="themes" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Travel Themes
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {themes.map(theme => (
                      <div key={theme} className="flex items-center space-x-2">
                        <Checkbox
                          id={theme}
                          checked={selectedThemes.includes(theme)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedThemes([...selectedThemes, theme]);
                            } else {
                              setSelectedThemes(selectedThemes.filter(t => t !== theme));
                            }
                          }}
                        />
                        <label htmlFor={theme} className="text-sm font-medium">
                          {theme}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Group Size</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any group size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any group size</SelectItem>
                        <SelectItem value="private">Private (1-4 people)</SelectItem>
                        <SelectItem value="small">Small Group (5-12 people)</SelectItem>
                        <SelectItem value="large">Large Group (13+ people)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Accommodation Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any accommodation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any accommodation</SelectItem>
                        <SelectItem value="luxury">Luxury Hotels</SelectItem>
                        <SelectItem value="boutique">Boutique Hotels</SelectItem>
                        <SelectItem value="farmstay">Farmstays</SelectItem>
                        <SelectItem value="homestay">Homestays</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Active Filters Display */}
          {(selectedThemes.length > 0 || selectedDestinations.length > 0 || selectedDuration || selectedLevel) && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Active filters:</span>
              {selectedThemes.map(theme => (
                <Badge key={theme} variant="secondary" className="cursor-pointer" onClick={() => 
                  setSelectedThemes(selectedThemes.filter(t => t !== theme))
                }>
                  {theme} ×
                </Badge>
              ))}
              {selectedDuration && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedDuration('')}>
                  {selectedDuration} ×
                </Badge>
              )}
              {selectedLevel && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedLevel('')}>
                  {selectedLevel} ×
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
