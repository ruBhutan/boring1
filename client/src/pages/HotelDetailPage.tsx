
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Wifi, Car, Coffee, Utensils, Star, ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EnhancedInteractiveForm } from '@/components/EnhancedInteractiveForm';
import { SEOOptimization } from '@/components/SEOOptimization';

interface Hotel {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  pricePerNight: number;
  maxPrice: number;
  description: string;
  images: string[];
  roomTypes: Array<{
    type: string;
    price: number;
    amenities: string[];
  }>;
  amenities: string[];
  features?: string[];
  activities?: string[];
}

export default function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    // Mock data - replace with API call
    const mockHotel: Hotel = {
      id: parseInt(id || '1'),
      name: "Amankora Paro",
      category: "Ultra-Luxury",
      location: "Paro Valley, Bhutan",
      rating: 5.0,
      pricePerNight: 1200,
      maxPrice: 2000,
      description: "Amankora Paro offers unparalleled luxury in the heart of Bhutan's cultural valley. Set within a serene pine forest, the lodge features traditional Bhutanese architecture with modern amenities and world-class service.",
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      roomTypes: [
        { 
          type: "Suite", 
          price: 1200, 
          amenities: ["King bed", "Private terrace", "Mountain views", "Sitting area"] 
        },
        { 
          type: "Deluxe Suite", 
          price: 1800, 
          amenities: ["Separate living area", "Butler service", "Spa access", "Premium toiletries"] 
        }
      ],
      amenities: [
        "World-class spa",
        "Fine dining restaurant",
        "Library and meditation room",
        "Traditional hot stone bath",
        "Private cultural performances",
        "Fitness center",
        "Concierge service",
        "24-hour room service"
      ],
      features: [
        "Traditional Bhutanese architecture",
        "Panoramic valley views",
        "Butler service",
        "Helicopter landing pad",
        "Exclusive monastery access",
        "Private gardens",
        "Award-winning design"
      ],
      activities: [
        "Guided monastery visits",
        "Traditional archery",
        "Nature walks",
        "Cultural workshops",
        "Spa treatments",
        "Photography tours"
      ]
    };
    
    setHotel(mockHotel);
  }, [id]);

  const nextImage = () => {
    if (hotel) {
      setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
    }
  };

  const prevImage = () => {
    if (hotel) {
      setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
    }
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  if (!hotel) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOOptimization 
        title={`${hotel.name} - Luxury Accommodation in Bhutan`}
        description={hotel.description}
        keywords={`${hotel.name}, Bhutan hotels, luxury accommodation, ${hotel.location}`}
        image={hotel.images[0]}
      />

      {/* Image Gallery */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <img 
          src={hotel.images[currentImageIndex]} 
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {hotel.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button variant="outline" size="sm" className="bg-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-white">
            <Share2 className="w-4 h-4" />
          </Button>
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
                    {hotel.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hotel.location}
                    </div>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                      {hotel.category}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-lg font-semibold">{hotel.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">Luxury Rating</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="rooms" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="rooms" className="space-y-4">
                {hotel.roomTypes.map((room, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {room.type}
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-2 mb-4">
                            {room.amenities.map((amenity, i) => (
                              <div key={i} className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-teal-600 rounded-full mr-2" />
                                {amenity}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-2xl font-bold text-teal-600 mb-1">
                            ${room.price}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">per night</p>
                          <Button 
                            onClick={() => {
                              setSelectedRoom(room.type);
                              setShowBookingForm(true);
                            }}
                            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                          >
                            Select Room
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="amenities" className="space-y-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                          <Coffee className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="font-medium text-gray-900">{amenity}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                <div className="grid gap-4">
                  {hotel.activities?.map((activity, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{activity}</span>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Location & Nearby Attractions</h3>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500">Interactive Map Coming Soon</p>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <span>Tiger's Nest Monastery</span>
                      <span className="text-gray-600">2.5 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paro Airport</span>
                      <span className="text-gray-600">8 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paro Town Center</span>
                      <span className="text-gray-600">3 km</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-teal-600 mb-1">
                  ${hotel.pricePerNight}
                </div>
                <p className="text-gray-600">per night</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {checkIn && checkOut && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>${hotel.pricePerNight} x {calculateNights()} nights</span>
                    <span>${hotel.pricePerNight * calculateNights()}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${hotel.pricePerNight * calculateNights()}</span>
                  </div>
                </div>
              )}

              <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 text-lg"
                  >
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Book Your Stay at {hotel.name}</DialogTitle>
                  </DialogHeader>
                  <EnhancedInteractiveForm 
                    formType="hotel-booking"
                    onClose={() => setShowBookingForm(false)}
                    hotelDetails={{
                      name: hotel.name,
                      roomType: selectedRoom,
                      checkIn,
                      checkOut,
                      guests,
                      totalPrice: hotel.pricePerNight * calculateNights()
                    }}
                  />
                </DialogContent>
              </Dialog>

              <p className="text-xs text-gray-500 text-center mt-4">
                Free cancellation up to 48 hours before check-in
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
