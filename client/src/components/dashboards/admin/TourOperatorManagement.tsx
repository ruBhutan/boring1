
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Alert, AlertDescription } from "../../ui/alert";
import { Checkbox } from "../../ui/checkbox";
import { Switch } from "../../ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  X, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  BarChart3,
  TrendingUp,
  Globe,
  Shield,
  Award,
  Camera,
  Save,
  Eye,
  Settings,
  Filter
} from 'lucide-react';

interface Tour {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  imageUrl: string;
  images: string[];
  rating: number;
  reviewCount: number;
  highlights: string[];
  includes: string[];
  excludes: string[];
  difficulty: string;
  bestSeason: string;
  maxGroupSize: number;
  isActive: boolean;
}

interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  starRating: number;
  amenities: string[];
  pricePerNight: number;
  imageUrl: string;
  images: string[];
  category: string;
  isActive: boolean;
}

interface Booking {
  id: number;
  tourName: string;
  customerName: string;
  email: string;
  phone: string;
  travelDate: string;
  groupSize: number;
  status: string;
  totalAmount: number;
  createdAt: string;
}

const TourManagerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tours, setTours] = useState<Tour[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Tour Management State
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [tourFormData, setTourFormData] = useState({
    name: '',
    description: '',
    duration: 1,
    price: 0,
    category: '',
    imageUrl: '',
    images: [] as string[],
    highlights: [] as string[],
    includes: [] as string[],
    excludes: [] as string[],
    difficulty: 'Moderate',
    bestSeason: 'Spring',
    maxGroupSize: 12,
    isActive: true
  });

  // Hotel Management State
  const [hotelModalOpen, setHotelModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [hotelFormData, setHotelFormData] = useState({
    name: '',
    location: '',
    description: '',
    starRating: 3,
    amenities: [] as string[],
    pricePerNight: 0,
    imageUrl: '',
    images: [] as string[],
    category: 'standard',
    isActive: true
  });

  // Dashboard Stats
  const [dashboardStats, setDashboardStats] = useState({
    activeTours: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    customerSatisfaction: 0,
    pendingApprovals: 0,
    activeHotels: 0
  });

  const tourCategories = [
    'Cultural', 'Adventure', 'Luxury', 'Spiritual', 'Trekking', 'Photography', 
    'Wellness', 'Festival', 'Wildlife', 'Cycling', 'Bespoke'
  ];

  const hotelCategories = ['luxury', 'boutique', 'heritage', 'eco-lodge', 'standard'];
  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Difficult', 'Expert'];
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter', 'Year-round'];

  const amenities = [
    'WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Gym', 'Bar', 
    'Room Service', 'Parking', 'Airport Shuttle', 'Business Center'
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      setDashboardStats({
        activeTours: 45,
        totalBookings: 156,
        monthlyRevenue: 125000,
        customerSatisfaction: 4.8,
        pendingApprovals: 8,
        activeHotels: 28
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Tour Management Functions
  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const tourData = {
        ...tourFormData,
        id: editingTour?.id || Date.now(),
        rating: editingTour?.rating || 5.0,
        reviewCount: editingTour?.reviewCount || 0
      };

      if (editingTour) {
        setTours(tours.map(t => t.id === editingTour.id ? tourData as Tour : t));
      } else {
        setTours([...tours, tourData as Tour]);
      }

      resetTourForm();
      setTourModalOpen(false);
    } catch (error) {
      console.error('Failed to save tour:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetTourForm = () => {
    setTourFormData({
      name: '',
      description: '',
      duration: 1,
      price: 0,
      category: '',
      imageUrl: '',
      images: [],
      highlights: [],
      includes: [],
      excludes: [],
      difficulty: 'Moderate',
      bestSeason: 'Spring',
      maxGroupSize: 12,
      isActive: true
    });
    setEditingTour(null);
  };

  const handleEditTour = (tour: Tour) => {
    setEditingTour(tour);
    setTourFormData({
      name: tour.name,
      description: tour.description,
      duration: tour.duration,
      price: tour.price,
      category: tour.category,
      imageUrl: tour.imageUrl,
      images: tour.images || [],
      highlights: tour.highlights || [],
      includes: tour.includes || [],
      excludes: tour.excludes || [],
      difficulty: tour.difficulty,
      bestSeason: tour.bestSeason,
      maxGroupSize: tour.maxGroupSize,
      isActive: tour.isActive
    });
    setTourModalOpen(true);
  };

  const handleDeleteTour = async (tourId: number) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      setTours(tours.filter(t => t.id !== tourId));
    }
  };

  // Hotel Management Functions
  const handleHotelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const hotelData = {
        ...hotelFormData,
        id: editingHotel?.id || Date.now()
      };

      if (editingHotel) {
        setHotels(hotels.map(h => h.id === editingHotel.id ? hotelData as Hotel : h));
      } else {
        setHotels([...hotels, hotelData as Hotel]);
      }

      resetHotelForm();
      setHotelModalOpen(false);
    } catch (error) {
      console.error('Failed to save hotel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetHotelForm = () => {
    setHotelFormData({
      name: '',
      location: '',
      description: '',
      starRating: 3,
      amenities: [],
      pricePerNight: 0,
      imageUrl: '',
      images: [],
      category: 'standard',
      isActive: true
    });
    setEditingHotel(null);
  };

  const handleArrayInput = (value: string, field: string, setter: any, currentData: any) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setter({ ...currentData, [field]: items });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updatedAmenities = checked 
      ? [...hotelFormData.amenities, amenity]
      : hotelFormData.amenities.filter(a => a !== amenity);
    setHotelFormData({ ...hotelFormData, amenities: updatedAmenities });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tour Manager Dashboard</h1>
          <p className="text-gray-600">Manage tours, accommodations, and bookings with ease</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tours</CardTitle>
              <Globe className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.activeTours}</div>
              <p className="text-xs text-green-600">+5 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Users className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalBookings}</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
              <Star className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.customerSatisfaction}/5.0</div>
              <p className="text-xs text-green-600">Excellent rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tours">Tours & Packages</TabsTrigger>
            <TabsTrigger value="hotels">Hotels & Accommodation</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-teal-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New booking: Tiger's Nest Trek</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tour updated: Punakha Valley Tour</span>
                      <span className="text-xs text-gray-500">4 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New hotel added: Uma Paro</span>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-teal-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => setTourModalOpen(true)}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tour
                    </Button>
                    <Button 
                      onClick={() => setHotelModalOpen(true)}
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Hotel
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Reports
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tours & Packages Tab */}
          <TabsContent value="tours" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Tours & Packages Management</h2>
              <Button 
                onClick={() => setTourModalOpen(true)}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Tour
              </Button>
            </div>

            <div className="grid gap-6">
              {tours.map((tour) => (
                <Card key={tour.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
                        <p className="text-gray-600 mb-4">{tour.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {tour.duration} days
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${tour.price}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Max {tour.maxGroupSize}
                          </span>
                          <Badge variant="secondary">{tour.category}</Badge>
                          <Badge variant={tour.isActive ? "default" : "destructive"}>
                            {tour.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTour(tour)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTour(tour.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Hotels & Accommodation Management</h2>
              <Button 
                onClick={() => setHotelModalOpen(true)}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Hotel
              </Button>
            </div>

            <div className="grid gap-6">
              {hotels.map((hotel) => (
                <Card key={hotel.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                        <p className="text-gray-600 mb-2 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {hotel.location}
                        </p>
                        <p className="text-gray-600 mb-4">{hotel.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {hotel.starRating} star
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${hotel.pricePerNight}/night
                          </span>
                          <Badge variant="secondary">{hotel.category}</Badge>
                          <Badge variant={hotel.isActive ? "default" : "destructive"}>
                            {hotel.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingHotel(hotel);
                            setHotelFormData({
                              name: hotel.name,
                              location: hotel.location,
                              description: hotel.description,
                              starRating: hotel.starRating,
                              amenities: hotel.amenities,
                              pricePerNight: hotel.pricePerNight,
                              imageUrl: hotel.imageUrl,
                              images: hotel.images,
                              category: hotel.category,
                              isActive: hotel.isActive
                            });
                            setHotelModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this hotel?')) {
                              setHotels(hotels.filter(h => h.id !== hotel.id));
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-2xl font-bold">Booking Management</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600">Bookings will appear here when customers make reservations.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Revenue analytics will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Tours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Tour popularity metrics will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Tour Modal */}
        <Dialog open={tourModalOpen} onOpenChange={setTourModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTour ? 'Edit Tour' : 'Add New Tour'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details to {editingTour ? 'update' : 'create'} a tour package.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleTourSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tourName">Tour Name</Label>
                  <Input
                    id="tourName"
                    value={tourFormData.name}
                    onChange={(e) => setTourFormData({ ...tourFormData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={tourFormData.category} onValueChange={(value) => setTourFormData({ ...tourFormData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {tourCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={tourFormData.duration}
                    onChange={(e) => setTourFormData({ ...tourFormData, duration: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={tourFormData.price}
                    onChange={(e) => setTourFormData({ ...tourFormData, price: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={tourFormData.difficulty} onValueChange={(value) => setTourFormData({ ...tourFormData, difficulty: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map(diff => (
                        <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maxGroupSize">Max Group Size</Label>
                  <Input
                    id="maxGroupSize"
                    type="number"
                    min="1"
                    value={tourFormData.maxGroupSize}
                    onChange={(e) => setTourFormData({ ...tourFormData, maxGroupSize: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={tourFormData.description}
                  onChange={(e) => setTourFormData({ ...tourFormData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Main Image URL</Label>
                <Input
                  id="imageUrl"
                  value={tourFormData.imageUrl}
                  onChange={(e) => setTourFormData({ ...tourFormData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="highlights">Highlights (comma-separated)</Label>
                <Textarea
                  id="highlights"
                  value={tourFormData.highlights.join(', ')}
                  onChange={(e) => handleArrayInput(e.target.value, 'highlights', setTourFormData, tourFormData)}
                  placeholder="Visit Tiger's Nest, Experience local culture, Mountain views"
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={tourFormData.isActive}
                  onCheckedChange={(checked) => setTourFormData({ ...tourFormData, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setTourModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
                  {isLoading ? 'Saving...' : (editingTour ? 'Update Tour' : 'Create Tour')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Hotel Modal */}
        <Dialog open={hotelModalOpen} onOpenChange={setHotelModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details to {editingHotel ? 'update' : 'create'} a hotel listing.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleHotelSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hotelName">Hotel Name</Label>
                  <Input
                    id="hotelName"
                    value={hotelFormData.name}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={hotelFormData.location}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, location: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="starRating">Star Rating</Label>
                  <Select value={hotelFormData.starRating.toString()} onValueChange={(value) => setHotelFormData({ ...hotelFormData, starRating: parseInt(value) })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <SelectItem key={rating} value={rating.toString()}>{rating} Star</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="pricePerNight">Price per Night (USD)</Label>
                  <Input
                    id="pricePerNight"
                    type="number"
                    min="0"
                    value={hotelFormData.pricePerNight}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, pricePerNight: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="hotelCategory">Category</Label>
                  <Select value={hotelFormData.category} onValueChange={(value) => setHotelFormData({ ...hotelFormData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {hotelCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="hotelDescription">Description</Label>
                <Textarea
                  id="hotelDescription"
                  value={hotelFormData.description}
                  onChange={(e) => setHotelFormData({ ...hotelFormData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {amenities.map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={hotelFormData.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                      />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="hotelIsActive"
                  checked={hotelFormData.isActive}
                  onCheckedChange={(checked) => setHotelFormData({ ...hotelFormData, isActive: checked })}
                />
                <Label htmlFor="hotelIsActive">Active</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setHotelModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
                  {isLoading ? 'Saving...' : (editingHotel ? 'Update Hotel' : 'Create Hotel')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TourManagerDashboard;
