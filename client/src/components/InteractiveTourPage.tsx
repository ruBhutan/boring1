
import { useState, useEffect } from 'react';
import { Calendar, Users, Clock, MapPin, Star, Play, Heart, Share2, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { EnhancedInteractiveForm } from './EnhancedInteractiveForm';

interface Tour {
  id: number;
  name: string;
  duration: string;
  price: number;
  category: string;
  difficulty: string;
  rating: number;
  reviewCount: number;
  images: string[];
  videos: string[];
  description: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals: string[];
    accommodation?: string;
  }>;
  customizationOptions: {
    accommodations: Array<{ name: string; type: string; price: number }>;
    activities: Array<{ name: string; description: string; price: number; optional: boolean }>;
    addOns: Array<{ name: string; description: string; price: number }>;
  };
  availability: Array<{
    date: string;
    available: boolean;
    spotsLeft?: number;
    price: number;
  }>;
}

interface InteractiveTourPageProps {
  tour: Tour;
}

export function InteractiveTourPage({ tour }: InteractiveTourPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [customizations, setCustomizations] = useState({
    accommodation: '',
    activities: [] as string[],
    addOns: [] as string[]
  });
  const [totalPrice, setTotalPrice] = useState(tour.price);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    calculateTotalPrice();
  }, [customizations, groupSize, selectedDate]);

  const calculateTotalPrice = () => {
    let price = tour.price * groupSize;
    
    // Add accommodation upgrade
    if (customizations.accommodation) {
      const accommodation = tour.customizationOptions.accommodations.find(
        acc => acc.name === customizations.accommodation
      );
      if (accommodation) price += accommodation.price * parseInt(tour.duration.split(' ')[0]);
    }

    // Add activities
    customizations.activities.forEach(activityName => {
      const activity = tour.customizationOptions.activities.find(
        act => act.name === activityName
      );
      if (activity) price += activity.price * groupSize;
    });

    // Add add-ons
    customizations.addOns.forEach(addOnName => {
      const addOn = tour.customizationOptions.addOns.find(
        ao => ao.name === addOnName
      );
      if (addOn) price += addOn.price * groupSize;
    });

    setTotalPrice(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length);
  };

  const playVideo = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  const toggleCustomization = (type: 'activities' | 'addOns', item: string) => {
    setCustomizations(prev => ({
      ...prev,
      [type]: prev[type].includes(item)
        ? prev[type].filter(i => i !== item)
        : [...prev[type], item]
    }));
  };

  const getAvailabilityForDate = (date: string) => {
    return tour.availability.find(avail => avail.date === date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Images/Videos */}
      <div className="relative h-96 lg:h-[600px] overflow-hidden bg-black">
        <img 
          src={tour.images[currentImageIndex]} 
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Video Play Buttons */}
        {tour.videos.length > 0 && (
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {tour.videos.map((video, index) => (
              <button
                key={index}
                onClick={() => playVideo(video)}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <Play className="w-5 h-5" />
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button variant="outline" size="sm" className="bg-white">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {tour.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {tour.name}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-600" />
                      <span className="text-gray-600">{tour.duration}</span>
                    </div>
                    <Badge variant="secondary">{tour.category}</Badge>
                    <Badge variant="outline">{tour.difficulty}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < tour.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-lg font-semibold">{tour.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">({tour.reviewCount} reviews)</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{tour.description}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="customize">Customize</TabsTrigger>
                <TabsTrigger value="included">What's Included</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="itinerary" className="space-y-4">
                {tour.itinerary.map((day, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Day {day.day}: {day.title}
                          </h3>
                          <p className="text-gray-700 mb-4">{day.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Activities</h4>
                              <ul className="space-y-1">
                                {day.activities.map((activity, i) => (
                                  <li key={i} className="flex items-start">
                                    <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Meals</h4>
                              <ul className="space-y-1">
                                {day.meals.map((meal, i) => (
                                  <li key={i} className="flex items-start">
                                    <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{meal}</span>
                                  </li>
                                ))}
                              </ul>
                              {day.accommodation && (
                                <div className="mt-3">
                                  <h4 className="font-semibold text-gray-900 mb-1">Accommodation</h4>
                                  <p className="text-sm text-gray-700">{day.accommodation}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="customize" className="space-y-6">
                {/* Accommodation Upgrades */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Accommodation Upgrades</h3>
                    <div className="space-y-3">
                      {tour.customizationOptions.accommodations.map((acc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="accommodation"
                              value={acc.name}
                              checked={customizations.accommodation === acc.name}
                              onChange={(e) => setCustomizations(prev => ({
                                ...prev,
                                accommodation: e.target.value
                              }))}
                              className="text-teal-600"
                            />
                            <div>
                              <h4 className="font-medium">{acc.name}</h4>
                              <p className="text-sm text-gray-600">{acc.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-teal-600">+${acc.price}/night</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Optional Activities */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Optional Activities</h3>
                    <div className="space-y-3">
                      {tour.customizationOptions.activities.filter(act => act.optional).map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={customizations.activities.includes(activity.name)}
                              onCheckedChange={() => toggleCustomization('activities', activity.name)}
                            />
                            <div>
                              <h4 className="font-medium">{activity.name}</h4>
                              <p className="text-sm text-gray-600">{activity.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-teal-600">+${activity.price}/person</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Add-ons */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Add-ons</h3>
                    <div className="space-y-3">
                      {tour.customizationOptions.addOns.map((addOn, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={customizations.addOns.includes(addOn.name)}
                              onCheckedChange={() => toggleCustomization('addOns', addOn.name)}
                            />
                            <div>
                              <h4 className="font-medium">{addOn.name}</h4>
                              <p className="text-sm text-gray-600">{addOn.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-teal-600">+${addOn.price}/person</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="included" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-green-700 mb-4">What's Included</h3>
                      <ul className="space-y-2">
                        {tour.included.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-red-700 mb-4">What's Excluded</h3>
                      <ul className="space-y-2">
                        {tour.excluded.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <X className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="availability" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Real-time Availability</h3>
                    <div className="grid gap-3">
                      {tour.availability.slice(0, 10).map((avail, index) => (
                        <div key={index} className={`p-4 border rounded-lg ${
                          avail.available ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{avail.date}</p>
                              {avail.spotsLeft && avail.available && (
                                <p className="text-sm text-gray-600">{avail.spotsLeft} spots remaining</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className={`font-semibold ${
                                avail.available ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {avail.available ? 'Available' : 'Fully Booked'}
                              </p>
                              {avail.available && (
                                <p className="text-sm text-gray-600">${avail.price}/person</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-teal-600 mb-1">
                    ${totalPrice}
                  </div>
                  <p className="text-gray-600">total for {groupSize} people</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                    {selectedDate && (
                      <div className="mt-2">
                        {getAvailabilityForDate(selectedDate) ? (
                          <p className="text-sm text-green-600">✓ Available on this date</p>
                        ) : (
                          <p className="text-sm text-red-600">✗ Not available on this date</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Group Size: {groupSize} people
                    </label>
                    <Slider
                      value={[groupSize]}
                      onValueChange={(value) => setGroupSize(value[0])}
                      max={12}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 text-lg"
                      disabled={!selectedDate}
                    >
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <EnhancedInteractiveForm 
                      formType="tour-booking"
                      onClose={() => setShowBookingForm(false)}
                      tourDetails={{
                        name: tour.name,
                        duration: tour.duration,
                        groupSize,
                        travelDate: selectedDate,
                        customizations,
                        totalPrice
                      }}
                    />
                  </DialogContent>
                </Dialog>

                <div className="mt-4 space-y-2 text-xs text-gray-500">
                  <p>• Free cancellation up to 7 days before</p>
                  <p>• Instant confirmation</p>
                  <p>• Local guide included</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl p-0">
          <div className="aspect-video">
            <iframe
              src={currentVideoUrl}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
