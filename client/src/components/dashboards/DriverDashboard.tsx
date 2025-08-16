
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Car, 
  DollarSign, 
  Clock, 
  Fuel,
  Route,
  Wrench,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Navigation
} from 'lucide-react';

interface Trip {
  id: number;
  route: string;
  date: string;
  time: string;
  passengers: number;
  status: 'upcoming' | 'confirmed' | 'completed' | 'cancelled';
  distance: string;
  estimatedDuration: string;
  pickupLocation: string;
  dropoffLocation: string;
  specialInstructions?: string;
}

const DriverDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [assignedTrips, setAssignedTrips] = useState<Trip[]>([
    {
      id: 1,
      route: "Paro Airport to Thimphu",
      date: "2024-08-15",
      time: "14:30",
      passengers: 8,
      status: "upcoming",
      distance: "65 km",
      estimatedDuration: "1.5 hours",
      pickupLocation: "Paro International Airport",
      dropoffLocation: "Hotel Druk, Thimphu",
      specialInstructions: "Flight arrives at 14:00, wait at arrival gate"
    },
    {
      id: 2,
      route: "Thimphu to Punakha",
      date: "2024-08-18",
      time: "09:00",
      passengers: 6,
      status: "confirmed",
      distance: "85 km",
      estimatedDuration: "2.5 hours",
      pickupLocation: "Hotel Druk, Thimphu",
      dropoffLocation: "Uma Punakha Resort"
    },
    {
      id: 3,
      route: "Punakha to Paro",
      date: "2024-08-20",
      time: "11:00",
      passengers: 6,
      status: "upcoming",
      distance: "125 km",
      estimatedDuration: "3 hours",
      pickupLocation: "Uma Punakha Resort",
      dropoffLocation: "Hotel Olathang, Paro"
    }
  ]);

  const [driverStats, setDriverStats] = useState({
    tripsThisMonth: 18,
    totalEarnings: 1800,
    totalDistance: 2450,
    averageRating: 4.8,
    upcomingTrips: 3,
    completedTrips: 92
  });

  const [vehicle, setVehicle] = useState({
    model: "Toyota Hiace",
    license: "BP-1-A-1234",
    status: "active",
    lastMaintenance: "2024-07-15",
    nextMaintenance: "2024-09-15",
    fuelLevel: 85,
    mileage: 145000
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Driver Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your trips and vehicle status.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trips This Month</CardTitle>
              <Route className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{driverStats.tripsThisMonth}</div>
              <p className="text-xs text-green-600">+4 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${driverStats.totalEarnings}</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Distance (km)</CardTitle>
              <Navigation className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{driverStats.totalDistance.toLocaleString()}</div>
              <p className="text-xs text-green-600">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Driver Rating</CardTitle>
              <CheckCircle className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{driverStats.averageRating}/5.0</div>
              <p className="text-xs text-green-600">Excellent rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-teal-600" />
                    Upcoming Trips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignedTrips.filter(trip => trip.status === 'upcoming' || trip.status === 'confirmed').slice(0, 3).map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{trip.route}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {trip.date} at {trip.time}
                          </p>
                        </div>
                        <Badge className={getStatusColor(trip.status)}>
                          {trip.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-teal-600" />
                    Vehicle Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Vehicle:</span>
                      <span className="text-sm">{vehicle.model}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">License:</span>
                      <span className="text-sm">{vehicle.license}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className={getVehicleStatusColor(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Fuel Level:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${vehicle.fuelLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{vehicle.fuelLevel}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Next Maintenance:</span>
                      <span className="text-sm">{vehicle.nextMaintenance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trips Tab */}
          <TabsContent value="trips" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Assigned Trips</h2>
              <Button variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-2" />
                GPS Navigation
              </Button>
            </div>

            <div className="grid gap-6">
              {assignedTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{trip.route}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div>
                            <p className="flex items-center gap-1 mb-1">
                              <MapPin className="h-4 w-4" />
                              <strong>Pickup:</strong> {trip.pickupLocation}
                            </p>
                            <p className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <strong>Drop-off:</strong> {trip.dropoffLocation}
                            </p>
                          </div>
                          <div>
                            <p className="flex items-center gap-1 mb-1">
                              <Calendar className="h-4 w-4" />
                              {trip.date} at {trip.time}
                            </p>
                            <p className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {trip.estimatedDuration} ({trip.distance})
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={getStatusColor(trip.status)}>
                            {trip.status}
                          </Badge>
                          <Badge variant="outline">
                            {trip.passengers} passengers
                          </Badge>
                        </div>

                        {trip.specialInstructions && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <h4 className="font-medium text-blue-800 mb-1 flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              Special Instructions:
                            </h4>
                            <p className="text-sm text-blue-700">{trip.specialInstructions}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Route className="h-4 w-4 mr-2" />
                          Route
                        </Button>
                        {trip.status === 'upcoming' && (
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Start Trip
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vehicle Tab */}
          <TabsContent value="vehicle" className="space-y-6">
            <h2 className="text-2xl font-bold">Vehicle Management</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-teal-600" />
                    Vehicle Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Model</Label>
                        <p className="text-lg">{vehicle.model}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">License Plate</Label>
                        <p className="text-lg">{vehicle.license}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Mileage</Label>
                        <p className="text-lg">{vehicle.mileage.toLocaleString()} km</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <Badge className={getVehicleStatusColor(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Fuel className="h-4 w-4" />
                        Fuel Level
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-4 bg-gray-200 rounded-full">
                          <div 
                            className={`h-4 rounded-full ${vehicle.fuelLevel > 50 ? 'bg-green-500' : vehicle.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${vehicle.fuelLevel}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{vehicle.fuelLevel}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-teal-600" />
                    Maintenance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Last Maintenance</Label>
                      <p className="text-lg">{vehicle.lastMaintenance}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Next Maintenance</Label>
                      <p className="text-lg">{vehicle.nextMaintenance}</p>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        <Wrench className="h-4 w-4 mr-2" />
                        Request Maintenance
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <h2 className="text-2xl font-bold">Performance Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Earnings charts will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trip Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Trip analytics will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

export default DriverDashboard;
