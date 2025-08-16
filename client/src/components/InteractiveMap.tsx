
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Mountain, Camera, Compass, TreePine } from 'lucide-react';

interface TourLocation {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  type: 'cultural' | 'adventure' | 'spiritual' | 'nature';
  description: string;
  image: string;
  tours: string[];
  difficulty: 'easy' | 'moderate' | 'challenging';
}

const tourLocations: TourLocation[] = [
  {
    id: 'thimphu',
    name: 'Thimphu',
    coordinates: { lat: 27.4728, lng: 89.6390 },
    type: 'cultural',
    description: 'Capital city with monasteries, markets, and traditional architecture',
    image: '/api/placeholder/300/200',
    tours: ['Cultural Heritage Tour', 'Thimphu City Walk', 'Weekend Market Experience'],
    difficulty: 'easy'
  },
  {
    id: 'paro',
    name: 'Paro Valley',
    coordinates: { lat: 27.4274, lng: 89.4126 },
    type: 'spiritual',
    description: 'Home to the famous Tigers Nest Monastery',
    image: '/api/placeholder/300/200',
    tours: ['Tigers Nest Trek', 'Paro Cultural Tour', 'Temple Hopping'],
    difficulty: 'moderate'
  },
  {
    id: 'punakha',
    name: 'Punakha',
    coordinates: { lat: 27.6207, lng: 89.8633 },
    type: 'cultural',
    description: 'Ancient capital with stunning dzong architecture',
    image: '/api/placeholder/300/200',
    tours: ['Punakha Dzong Tour', 'River Rafting', 'Suspension Bridge Walk'],
    difficulty: 'easy'
  },
  {
    id: 'bumthang',
    name: 'Bumthang Valley',
    coordinates: { lat: 27.7422, lng: 90.7417 },
    type: 'spiritual',
    description: 'Spiritual heartland with ancient temples',
    image: '/api/placeholder/300/200',
    tours: ['Bumthang Cultural Trek', 'Sacred Sites Tour', 'Jakar Dzong Visit'],
    difficulty: 'moderate'
  },
  {
    id: 'haa',
    name: 'Haa Valley',
    coordinates: { lat: 27.3934, lng: 89.2803 },
    type: 'nature',
    description: 'Hidden valley with pristine landscapes',
    image: '/api/placeholder/300/200',
    tours: ['Haa Valley Trek', 'Alpine Meadows Tour', 'Traditional Villages'],
    difficulty: 'challenging'
  }
];

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<TourLocation | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredLocations = filterType === 'all' 
    ? tourLocations 
    : tourLocations.filter(location => location.type === filterType);

  const getIcon = (type: string) => {
    switch (type) {
      case 'cultural': return <Compass className="w-4 h-4" />;
      case 'adventure': return <Mountain className="w-4 h-4" />;
      case 'spiritual': return <TreePine className="w-4 h-4" />;
      case 'nature': return <Camera className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cultural': return 'bg-blue-500';
      case 'adventure': return 'bg-orange-500';
      case 'spiritual': return 'bg-purple-500';
      case 'nature': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">Explore Bhutan Destinations</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the magic of Bhutan through our interactive map. Click on any location to learn more about tours and experiences available.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button
          variant={filterType === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterType('all')}
          className="btn-brand-outline"
        >
          All Destinations
        </Button>
        <Button
          variant={filterType === 'cultural' ? 'default' : 'outline'}
          onClick={() => setFilterType('cultural')}
          className="btn-brand-outline"
        >
          <Compass className="w-4 h-4 mr-2" />
          Cultural Sites
        </Button>
        <Button
          variant={filterType === 'adventure' ? 'default' : 'outline'}
          onClick={() => setFilterType('adventure')}
          className="btn-brand-outline"
        >
          <Mountain className="w-4 h-4 mr-2" />
          Adventure
        </Button>
        <Button
          variant={filterType === 'spiritual' ? 'default' : 'outline'}
          onClick={() => setFilterType('spiritual')}
          className="btn-brand-outline"
        >
          <TreePine className="w-4 h-4 mr-2" />
          Spiritual
        </Button>
        <Button
          variant={filterType === 'nature' ? 'default' : 'outline'}
          onClick={() => setFilterType('nature')}
          className="btn-brand-outline"
        >
          <Camera className="w-4 h-4 mr-2" />
          Nature
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map Container */}
        <div className="relative">
          <Card className="h-96 lg:h-[600px]">
            <CardContent className="p-0 h-full">
              <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 via-teal-100 to-blue-200" />
                
                {/* Mountain silhouettes for visual appeal */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-300 to-transparent opacity-60" />
                
                {/* Location Markers */}
                {filteredLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
                      selectedLocation?.id === location.id ? 'scale-125 z-10' : 'z-5'
                    }`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`
                    }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className={`w-8 h-8 ${getTypeColor(location.type)} rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white`}>
                      {getIcon(location.type)}
                    </div>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                      {location.name}
                    </div>
                  </div>
                ))}
                
                {/* Legend */}
                <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-sm mb-2">Legend</h4>
                  <div className="space-y-1">
                    {['cultural', 'adventure', 'spiritual', 'nature'].map(type => (
                      <div key={type} className="flex items-center gap-2 text-xs">
                        <div className={`w-3 h-3 ${getTypeColor(type)} rounded-full`} />
                        <span className="capitalize">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Details */}
        <div>
          {selectedLocation ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getIcon(selectedLocation.type)}
                    {selectedLocation.name}
                  </CardTitle>
                  <Badge variant="outline" className="capitalize">
                    {selectedLocation.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img 
                    src={selectedLocation.image} 
                    alt={selectedLocation.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  
                  <p className="text-gray-600">{selectedLocation.description}</p>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium">Difficulty:</span>
                      <Badge 
                        variant={selectedLocation.difficulty === 'easy' ? 'default' : 
                                selectedLocation.difficulty === 'moderate' ? 'secondary' : 'destructive'}
                      >
                        {selectedLocation.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Available Tours:</h4>
                    <div className="space-y-2">
                      {selectedLocation.tours.map((tour, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{tour}</span>
                          <Button size="sm" variant="outline">
                            Book Now
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 btn-brand-primary">
                      View All Tours
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Get Custom Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Destination</h3>
                <p className="text-gray-600">
                  Click on any marker on the map to explore tours and experiences available at that location.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4 mt-8">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-teal-600">
            {tourLocations.length}
          </div>
          <div className="text-sm text-gray-600">Destinations</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-teal-600">
            {tourLocations.reduce((acc, loc) => acc + loc.tours.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Tours Available</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-teal-600">12</div>
          <div className="text-sm text-gray-600">Cultural Sites</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-teal-600">8</div>
          <div className="text-sm text-gray-600">Adventure Trails</div>
        </Card>
      </div>
    </div>
  );
}
