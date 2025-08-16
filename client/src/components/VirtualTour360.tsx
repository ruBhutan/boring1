
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Pause, RotateCcw, Maximize2, Volume2, VolumeX, Camera } from 'lucide-react';

interface VirtualTourStop {
  id: string;
  title: string;
  description: string;
  image: string;
  audioGuide?: boolean;
  hotspots: Array<{
    x: number;
    y: number;
    title: string;
    description: string;
  }>;
}

const virtualTourStops: VirtualTourStop[] = [
  {
    id: 'tigers-nest',
    title: "Tiger's Nest Monastery",
    description: "Perched dramatically on a cliff face, this sacred site offers breathtaking views and spiritual serenity.",
    image: '/api/placeholder/800/400',
    audioGuide: true,
    hotspots: [
      { x: 30, y: 40, title: 'Prayer Wheels', description: 'Traditional Tibetan prayer wheels' },
      { x: 70, y: 60, title: 'Main Temple', description: 'Sacred meditation hall' },
      { x: 50, y: 20, title: 'Mountain View', description: 'Panoramic valley vista' }
    ]
  },
  {
    id: 'punakha-dzong',
    title: 'Punakha Dzong',
    description: 'Ancient fortress-monastery at the confluence of two rivers, showcasing traditional Bhutanese architecture.',
    image: '/api/placeholder/800/400',
    audioGuide: true,
    hotspots: [
      { x: 40, y: 50, title: 'Central Courtyard', description: 'Traditional ceremonial space' },
      { x: 20, y: 30, title: 'Golden Roof', description: 'Ornate traditional architecture' },
      { x: 80, y: 70, title: 'River Confluence', description: 'Meeting of Mo Chhu and Pho Chhu rivers' }
    ]
  },
  {
    id: 'thimphu-weekend-market',
    title: 'Thimphu Weekend Market',
    description: 'Vibrant local market showcasing fresh produce, traditional crafts, and Bhutanese culture.',
    image: '/api/placeholder/800/400',
    audioGuide: false,
    hotspots: [
      { x: 25, y: 60, title: 'Chili Peppers', description: 'Famous Bhutanese chilies' },
      { x: 60, y: 40, title: 'Traditional Crafts', description: 'Handwoven textiles and artifacts' },
      { x: 75, y: 75, title: 'Local Vendors', description: 'Meet friendly Bhutanese sellers' }
    ]
  }
];

export default function VirtualTour360() {
  const [currentStop, setCurrentStop] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null);
  const [rotation, setRotation] = useState(0);

  const currentTourStop = virtualTourStops[currentStop];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRotate = () => {
    setRotation(rotation + 90);
  };

  const handleReset = () => {
    setRotation(0);
    setSelectedHotspot(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">360° Virtual Tours</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience Bhutan's most iconic destinations from the comfort of your home. Take immersive virtual tours with expert commentary.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tour Navigation */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tour Stops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {virtualTourStops.map((stop, index) => (
                <div
                  key={stop.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    currentStop === index 
                      ? 'bg-teal-50 border-2 border-teal-200' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentStop(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                      currentStop === index ? 'bg-teal-600' : 'bg-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{stop.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {stop.audioGuide && (
                          <Badge variant="secondary" className="text-xs">
                            Audio Guide
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {stop.hotspots.length} Hotspots
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hotspots List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Points of Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentTourStop.hotspots.map((hotspot, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded cursor-pointer transition-all ${
                      selectedHotspot === hotspot 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedHotspot(hotspot)}
                  >
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-medium">{hotspot.title}</span>
                    </div>
                    <p className="text-xs text-gray-600 ml-6">{hotspot.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main 360° Viewer */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{currentTourStop.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsAudioOn(!isAudioOn)}
                  >
                    {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-black rounded-lg overflow-hidden">
                {/* 360° Image Viewer */}
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-500"
                  style={{ 
                    backgroundImage: `url(${currentTourStop.image})`,
                    transform: `rotate(${rotation}deg)`
                  }}
                >
                  {/* Hotspot Markers */}
                  {currentTourStop.hotspots.map((hotspot, index) => (
                    <div
                      key={index}
                      className={`absolute w-4 h-4 cursor-pointer transition-all ${
                        selectedHotspot === hotspot 
                          ? 'bg-blue-500 scale-150' 
                          : 'bg-white hover:bg-blue-300'
                      } rounded-full border-2 border-white shadow-lg animate-pulse`}
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => setSelectedHotspot(hotspot)}
                    />
                  ))}

                  {/* Selected Hotspot Info */}
                  {selectedHotspot && (
                    <div 
                      className="absolute bg-white/95 p-3 rounded-lg shadow-lg max-w-xs"
                      style={{
                        left: `${selectedHotspot.x}%`,
                        top: `${selectedHotspot.y - 10}%`,
                        transform: 'translate(-50%, -100%)'
                      }}
                    >
                      <h4 className="font-semibold text-sm">{selectedHotspot.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{selectedHotspot.description}</p>
                    </div>
                  )}
                </div>

                {/* Play Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-black/70 rounded-full px-4 py-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handlePlayPause}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <div className="w-px h-4 bg-white/30" />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleRotate}
                      className="text-white hover:bg-white/20"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-600 text-sm mb-3">{currentTourStop.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentTourStop.audioGuide && (
                      <Badge className="bg-green-100 text-green-800">
                        <Volume2 className="w-3 h-3 mr-1" />
                        Audio Guide Available
                      </Badge>
                    )}
                    <Badge variant="outline">
                      360° Interactive
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Share Tour
                    </Button>
                    <Button size="sm" className="btn-brand-primary">
                      Book This Experience
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tour Progress */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Progress:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStop + 1) / virtualTourStops.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">
              {currentStop + 1} / {virtualTourStops.length}
            </span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-0">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience This in Person?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              These virtual tours are just a glimpse of Bhutan's beauty. Join us for an unforgettable journey through the Land of the Thunder Dragon.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="btn-brand-primary">
                Plan Your Trip
              </Button>
              <Button size="lg" variant="outline">
                Download VR App
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
