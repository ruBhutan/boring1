
import { useState } from 'react';
import { Calendar, Users, Clock, MapPin, Star, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedInteractiveForm } from './EnhancedInteractiveForm';

interface Tour {
  id: number;
  name: string;
  duration: string;
  price: number;
  category: string;
  difficulty: string;
  rating: number;
  imageUrl: string;
  highlights: string[];
  includes: string[];
  activities?: string[];
  festivals?: string[];
}

interface MobileTourBookingProps {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
  availableActivities?: Array<{ id: number; name: string; category: string; price: number }>;
  availableFestivals?: Array<{ id: number; name: string; dates: string; location: string }>;
}

export function MobileTourBooking({ 
  tour, 
  isOpen, 
  onClose, 
  availableActivities = [],
  availableFestivals = []
}: MobileTourBookingProps) {
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const [selectedFestivals, setSelectedFestivals] = useState<number[]>([]);
  const [travelers, setTravelers] = useState(2);
  const [travelDate, setTravelDate] = useState('');
  const [showCustomization, setShowCustomization] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleActivity = (activityId: number) => {
    setSelectedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const toggleFestival = (festivalId: number) => {
    setSelectedFestivals(prev => 
      prev.includes(festivalId) 
        ? prev.filter(id => id !== festivalId)
        : [...prev, festivalId]
    );
  };

  const calculateTotalPrice = () => {
    let total = tour.price * travelers;
    
    selectedActivities.forEach(activityId => {
      const activity = availableActivities.find(a => a.id === activityId);
      if (activity) {
        total += activity.price * travelers;
      }
    });

    return total;
  };

  const getSelectedActivityNames = () => {
    return selectedActivities
      .map(id => availableActivities.find(a => a.id === id)?.name)
      .filter(Boolean);
  };

  const getSelectedFestivalNames = () => {
    return selectedFestivals
      .map(id => availableFestivals.find(f => f.id === id)?.name)
      .filter(Boolean);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[95vh] max-w-md p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className="relative">
          <img 
            src={tour.imageUrl} 
            alt={tour.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white"
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl font-bold mb-1">{tour.name}</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                <span className="text-sm">{tour.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="book">Book</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="overview" className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                    {tour.category}
                  </Badge>
                  <Badge variant="outline">
                    {tour.difficulty}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Highlights</h3>
                  <div className="space-y-2">
                    {tour.highlights.slice(0, 4).map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What's Included</h3>
                  <div className="space-y-1">
                    {tour.includes.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600 mb-1">
                      ${tour.price}
                    </div>
                    <p className="text-sm text-gray-600">per person</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="customize" className="p-4 space-y-6">
                {/* Activities Selection */}
                {availableActivities.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Add Activities</h3>
                    <div className="space-y-2">
                      {availableActivities.map((activity) => (
                        <div key={activity.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{activity.name}</h4>
                              <p className="text-xs text-gray-600 mb-2">{activity.category}</p>
                              <div className="text-sm font-semibold text-teal-600">
                                +${activity.price} per person
                              </div>
                            </div>
                            <button
                              onClick={() => toggleActivity(activity.id)}
                              className={`ml-2 w-5 h-5 rounded border-2 flex items-center justify-center ${
                                selectedActivities.includes(activity.id)
                                  ? 'bg-teal-600 border-teal-600'
                                  : 'border-gray-300'
                              }`}
                            >
                              {selectedActivities.includes(activity.id) && (
                                <div className="w-2 h-2 bg-white rounded-sm" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Festivals Selection */}
                {availableFestivals.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Experience Festivals</h3>
                    <div className="space-y-2">
                      {availableFestivals.map((festival) => (
                        <div key={festival.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{festival.name}</h4>
                              <p className="text-xs text-gray-600">{festival.dates}</p>
                              <p className="text-xs text-gray-500">{festival.location}</p>
                            </div>
                            <button
                              onClick={() => toggleFestival(festival.id)}
                              className={`ml-2 w-5 h-5 rounded border-2 flex items-center justify-center ${
                                selectedFestivals.includes(festival.id)
                                  ? 'bg-teal-600 border-teal-600'
                                  : 'border-gray-300'
                              }`}
                            >
                              {selectedFestivals.includes(festival.id) && (
                                <div className="w-2 h-2 bg-white rounded-sm" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Travelers Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Number of Travelers</h3>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-medium">Travelers</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{travelers}</span>
                      <button
                        onClick={() => setTravelers(travelers + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-teal-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span>Base price ({travelers} travelers)</span>
                    <span>${tour.price * travelers}</span>
                  </div>
                  {getSelectedActivityNames().length > 0 && (
                    <div className="text-xs text-gray-600 mb-2">
                      + Activities: {getSelectedActivityNames().join(', ')}
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between items-center font-semibold">
                    <span>Total Price</span>
                    <span className="text-teal-600">${calculateTotalPrice()}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="book" className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Travel Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tour: {tour.name}</span>
                      <span>${tour.price * travelers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Travelers: {travelers}</span>
                    </div>
                    {getSelectedActivityNames().length > 0 && (
                      <div className="text-xs text-gray-600">
                        Activities: {getSelectedActivityNames().join(', ')}
                      </div>
                    )}
                    {getSelectedFestivalNames().length > 0 && (
                      <div className="text-xs text-gray-600">
                        Festivals: {getSelectedFestivalNames().join(', ')}
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-teal-600">${calculateTotalPrice()}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowCustomization(true)}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3"
                  >
                    Book This Tour
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Booking Form Modal */}
        <Dialog open={showCustomization} onOpenChange={setShowCustomization}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Complete Your Booking</DialogTitle>
            </DialogHeader>
            <EnhancedInteractiveForm 
              formType="custom-tour-booking"
              onClose={() => setShowCustomization(false)}
              tourDetails={{
                name: tour.name,
                duration: tour.duration,
                travelers,
                travelDate,
                activities: getSelectedActivityNames(),
                festivals: getSelectedFestivalNames(),
                totalPrice: calculateTotalPrice()
              }}
            />
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
