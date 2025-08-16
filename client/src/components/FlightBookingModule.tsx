
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plane, Users, MapPin, DollarSign, Star, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface FlightRoute {
  id: string;
  origin: string;
  destination: string;
  airline: string;
  duration: string;
  frequency: string;
  price: number;
  aircraft: string;
  features: string[];
  departureTime: string;
  arrivalTime: string;
  stops: number;
}

interface FlightBooking {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departureDate: string;
  returnDate?: string;
  numberOfPassengers: number;
  specialRequests?: string;
}

export default function FlightBookingModule() {
  const [selectedRoute, setSelectedRoute] = useState<FlightRoute | null>(null);
  const [bookingData, setBookingData] = useState<FlightBooking>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    departureDate: '',
    returnDate: '',
    numberOfPassengers: 1,
    specialRequests: ''
  });
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: 'Paro',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'round-trip'
  });
  const [availableFlights, setAvailableFlights] = useState<FlightRoute[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [step, setStep] = useState<'search' | 'select' | 'book' | 'confirm'>('search');

  // Mock flight data (in real app, this would come from API)
  const flightRoutes: FlightRoute[] = [
    {
      id: 'druk_del_paro',
      origin: 'Delhi (DEL)',
      destination: 'Paro (PBH)',
      airline: 'Druk Air',
      duration: '2h 30m',
      frequency: 'Daily',
      price: 450,
      aircraft: 'Airbus A319',
      features: ['In-flight meals', 'Entertainment', 'Baggage 20kg'],
      departureTime: '10:30',
      arrivalTime: '13:00',
      stops: 0
    },
    {
      id: 'bhutan_airlines_del_paro',
      origin: 'Delhi (DEL)',
      destination: 'Paro (PBH)',
      airline: 'Bhutan Airlines',
      duration: '2h 45m',
      frequency: 'Daily',
      price: 420,
      aircraft: 'Airbus A320',
      features: ['In-flight meals', 'Wi-Fi', 'Baggage 23kg'],
      departureTime: '14:15',
      arrivalTime: '16:45',
      stops: 0
    },
    {
      id: 'druk_ktm_paro',
      origin: 'Kathmandu (KTM)',
      destination: 'Paro (PBH)',
      airline: 'Druk Air',
      duration: '1h 15m',
      frequency: 'Daily',
      price: 280,
      aircraft: 'Airbus A319',
      features: ['In-flight snacks', 'Mountain views', 'Baggage 20kg'],
      departureTime: '12:30',
      arrivalTime: '13:45',
      stops: 0
    },
    {
      id: 'druk_bkk_paro',
      origin: 'Bangkok (BKK)',
      destination: 'Paro (PBH)',
      airline: 'Druk Air',
      duration: '3h 45m',
      frequency: '3x/week',
      price: 580,
      aircraft: 'Airbus A319',
      features: ['In-flight meals', 'Entertainment', 'Baggage 20kg'],
      departureTime: '08:45',
      arrivalTime: '12:30',
      stops: 0
    },
    {
      id: 'bhutan_airlines_dac_paro',
      origin: 'Dhaka (DAC)',
      destination: 'Paro (PBH)',
      airline: 'Bhutan Airlines',
      duration: '1h 45m',
      frequency: '4x/week',
      price: 320,
      aircraft: 'Airbus A320',
      features: ['In-flight meals', 'Baggage 23kg'],
      departureTime: '15:20',
      arrivalTime: '17:05',
      stops: 0
    }
  ];

  const searchFlights = () => {
    setIsSearching(true);
    
    // Simulate API search
    setTimeout(() => {
      const filtered = flightRoutes.filter(route => 
        searchParams.from === '' || route.origin.toLowerCase().includes(searchParams.from.toLowerCase())
      );
      setAvailableFlights(filtered);
      setIsSearching(false);
      setStep('select');
    }, 1500);
  };

  const selectFlight = (flight: FlightRoute) => {
    setSelectedRoute(flight);
    setStep('book');
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const booking = {
      ...bookingData,
      flightRouteId: selectedRoute?.id,
      totalAmount: selectedRoute ? selectedRoute.price * bookingData.numberOfPassengers : 0
    };

    try {
      // In real app, submit to API
      console.log('Flight booking submitted:', booking);
      setStep('confirm');
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  const renderSearchForm = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="h-5 w-5" />
          Search Flights to Bhutan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">From</label>
            <Select value={searchParams.from} onValueChange={(value) => setSearchParams(prev => ({...prev, from: value}))}>
              <SelectTrigger>
                <SelectValue placeholder="Select origin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delhi">Delhi (DEL)</SelectItem>
                <SelectItem value="kathmandu">Kathmandu (KTM)</SelectItem>
                <SelectItem value="bangkok">Bangkok (BKK)</SelectItem>
                <SelectItem value="dhaka">Dhaka (DAC)</SelectItem>
                <SelectItem value="singapore">Singapore (SIN)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <Select value={searchParams.to} onValueChange={(value) => setSearchParams(prev => ({...prev, to: value}))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paro">Paro (PBH)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Departure</label>
            <Input
              type="date"
              value={searchParams.departureDate}
              onChange={(e) => setSearchParams(prev => ({...prev, departureDate: e.target.value}))}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Passengers</label>
            <Select value={searchParams.passengers.toString()} onValueChange={(value) => setSearchParams(prev => ({...prev, passengers: parseInt(value)}))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="round-trip"
              name="tripType"
              checked={searchParams.tripType === 'round-trip'}
              onChange={() => setSearchParams(prev => ({...prev, tripType: 'round-trip'}))}
            />
            <label htmlFor="round-trip">Round Trip</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="one-way"
              name="tripType"
              checked={searchParams.tripType === 'one-way'}
              onChange={() => setSearchParams(prev => ({...prev, tripType: 'one-way'}))}
            />
            <label htmlFor="one-way">One Way</label>
          </div>
        </div>

        {searchParams.tripType === 'round-trip' && (
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium mb-2">Return Date</label>
            <Input
              type="date"
              value={searchParams.returnDate}
              onChange={(e) => setSearchParams(prev => ({...prev, returnDate: e.target.value}))}
              min={searchParams.departureDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        )}

        <Button 
          onClick={searchFlights}
          disabled={!searchParams.from || !searchParams.departureDate || isSearching}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
        >
          {isSearching ? 'Searching...' : 'Search Flights'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderFlightResults = () => (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Flights</h2>
        <Button variant="outline" onClick={() => setStep('search')}>
          Modify Search
        </Button>
      </div>

      {availableFlights.map((flight) => (
        <Card key={flight.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <img
                    src={flight.airline === 'Druk Air' 
                      ? 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Druk_Air_Logo.svg/1200px-Druk_Air_Logo.svg.png'
                      : 'https://www.bhutanairlines.bt/images/logo.png'
                    }
                    alt={flight.airline}
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <p className="font-semibold">{flight.airline}</p>
                    <p className="text-sm text-gray-600">{flight.aircraft}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{flight.origin} → {flight.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{flight.departureTime} - {flight.arrivalTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{flight.duration} • {flight.stops === 0 ? 'Direct' : `${flight.stops} stop(s)`}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {flight.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {flight.features.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{flight.features.length - 2} more
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{flight.frequency}</p>
              </div>

              <div className="text-right space-y-2">
                <div>
                  <p className="text-2xl font-bold text-orange-600">${flight.price}</p>
                  <p className="text-sm text-gray-600">per person</p>
                </div>
                <Button 
                  onClick={() => selectFlight(flight)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                >
                  Select Flight
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderBookingForm = () => (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Complete Your Booking</h2>
        <Button variant="outline" onClick={() => setStep('select')}>
          Change Flight
        </Button>
      </div>

      {selectedRoute && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Flight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold">{selectedRoute.airline}</p>
                <p className="text-gray-600">{selectedRoute.origin} → {selectedRoute.destination}</p>
              </div>
              <div>
                <p className="font-semibold">{selectedRoute.departureTime} - {selectedRoute.arrivalTime}</p>
                <p className="text-gray-600">{selectedRoute.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-orange-600">${selectedRoute.price * bookingData.numberOfPassengers}</p>
                <p className="text-gray-600">{bookingData.numberOfPassengers} passenger(s)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Passenger Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name *</label>
                <Input
                  value={bookingData.firstName}
                  onChange={(e) => setBookingData(prev => ({...prev, firstName: e.target.value}))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name *</label>
                <Input
                  value={bookingData.lastName}
                  onChange={(e) => setBookingData(prev => ({...prev, lastName: e.target.value}))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  value={bookingData.phone}
                  onChange={(e) => setBookingData(prev => ({...prev, phone: e.target.value}))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Departure Date *</label>
                <Input
                  type="date"
                  value={bookingData.departureDate}
                  onChange={(e) => setBookingData(prev => ({...prev, departureDate: e.target.value}))}
                  required
                />
              </div>
              {searchParams.tripType === 'round-trip' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Return Date</label>
                  <Input
                    type="date"
                    value={bookingData.returnDate}
                    onChange={(e) => setBookingData(prev => ({...prev, returnDate: e.target.value}))}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Number of Passengers *</label>
              <Select value={bookingData.numberOfPassengers.toString()} onValueChange={(value) => setBookingData(prev => ({...prev, numberOfPassengers: parseInt(value)}))}>
                <SelectTrigger className="w-full md:w-1/3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Special Requests</label>
              <textarea
                className="w-full p-3 border rounded-md"
                rows={3}
                placeholder="Any special requirements (dietary restrictions, assistance, etc.)"
                value={bookingData.specialRequests}
                onChange={(e) => setBookingData(prev => ({...prev, specialRequests: e.target.value}))}
              />
            </div>

            <Separator />

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Booking Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Flight: {selectedRoute?.origin} → {selectedRoute?.destination}</span>
                  <span>${selectedRoute?.price} × {bookingData.numberOfPassengers}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-orange-600">${selectedRoute ? selectedRoute.price * bookingData.numberOfPassengers : 0}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => setStep('select')} className="flex-1">
                Back to Flights
              </Button>
              <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                Book Flight
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const renderConfirmation = () => (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600">Your flight booking has been submitted successfully.</p>
            <p className="text-sm text-gray-500 mt-2">Booking reference: FL-{Date.now().toString().slice(-6)}</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-semibold">Flight Details:</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p><strong>Route:</strong> {selectedRoute?.origin} → {selectedRoute?.destination}</p>
              <p><strong>Airline:</strong> {selectedRoute?.airline}</p>
              <p><strong>Date:</strong> {bookingData.departureDate}</p>
              <p><strong>Passengers:</strong> {bookingData.numberOfPassengers}</p>
              <p><strong>Total Amount:</strong> <span className="text-orange-600 font-semibold">${selectedRoute ? selectedRoute.price * bookingData.numberOfPassengers : 0}</span></p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Next Steps:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Confirmation email sent to {bookingData.email}</li>
              <li>• Complete payment within 24 hours</li>
              <li>• Check-in online 2 hours before departure</li>
              <li>• Bring valid passport and visa documents</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => window.print()} className="flex-1">
              Print Confirmation
            </Button>
            <Button onClick={() => setStep('search')} className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              Book Another Flight
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        {step === 'search' && renderSearchForm()}
        {step === 'select' && renderFlightResults()}
        {step === 'book' && renderBookingForm()}
        {step === 'confirm' && renderConfirmation()}
      </div>
    </div>
  );
}
