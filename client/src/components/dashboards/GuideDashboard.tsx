
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Clock, 
  Star,
  Route,
  Camera,
  MessageSquare,
  Award,
  TrendingUp
} from 'lucide-react';

interface AssignedTour {
  id: number;
  name: string;
  date: string;
  duration: number;
  groupSize: number;
  status: 'upcoming' | 'confirmed' | 'completed' | 'cancelled';
  location: string;
  difficulty: string;
  specialRequests?: string;
}

const GuideDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [assignedTours, setAssignedTours] = useState<AssignedTour[]>([
    {
      id: 1,
      name: "Tiger's Nest Trek",
      date: "2024-08-15",
      duration: 3,
      groupSize: 8,
      status: "upcoming",
      location: "Paro",
      difficulty: "Moderate",
      specialRequests: "Photography focus, early morning start"
    },
    {
      id: 2,
      name: "Thimphu Cultural Tour",
      date: "2024-08-20",
      duration: 1,
      groupSize: 6,
      status: "confirmed",
      location: "Thimphu",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Punakha Valley Exploration",
      date: "2024-08-25",
      duration: 2,
      groupSize: 10,
      status: "upcoming",
      location: "Punakha",
      difficulty: "Moderate"
    }
  ]);

  const [guideStats, setGuideStats] = useState({
    toursThisMonth: 12,
    totalEarnings: 2500,
    averageRating: 4.9,
    completedTours: 85,
    upcomingTours: 3,
    cancelledTours: 1
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Challenging': return 'bg-orange-100 text-orange-800';
      case 'Difficult': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Guide Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your tours and track your performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tours This Month</CardTitle>
              <Calendar className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{guideStats.toursThisMonth}</div>
              <p className="text-xs text-green-600">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${guideStats.totalEarnings}</div>
              <p className="text-xs text-green-600">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{guideStats.averageRating}/5.0</div>
              <p className="text-xs text-green-600">Excellent rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tours</CardTitle>
              <Award className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{guideStats.completedTours}</div>
              <p className="text-xs text-green-600">Career total</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tours">My Tours</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-teal-600" />
                    Upcoming Tours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignedTours.filter(tour => tour.status === 'upcoming' || tour.status === 'confirmed').slice(0, 3).map((tour) => (
                      <div key={tour.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{tour.name}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {tour.location} • {tour.date}
                          </p>
                        </div>
                        <Badge className={getStatusColor(tour.status)}>
                          {tour.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-teal-600" />
                    Recent Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm font-medium">5.0</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        "Excellent guide with deep knowledge of Bhutanese culture. Made our trek unforgettable!"
                      </p>
                      <p className="text-xs text-gray-500 mt-2">- Sarah from Australia</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm font-medium">5.0</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        "Very professional and knowledgeable. Highly recommend for cultural tours."
                      </p>
                      <p className="text-xs text-gray-500 mt-2">- James from Singapore</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Assigned Tours</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Manager
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {assignedTours.map((tour) => (
                <Card key={tour.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {tour.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {tour.duration} days
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {tour.groupSize} guests
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {tour.location}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={getStatusColor(tour.status)}>
                            {tour.status}
                          </Badge>
                          <Badge className={getDifficultyColor(tour.difficulty)}>
                            {tour.difficulty}
                          </Badge>
                        </div>

                        {tour.specialRequests && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <h4 className="font-medium text-yellow-800 mb-1">Special Requests:</h4>
                            <p className="text-sm text-yellow-700">{tour.specialRequests}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Route className="h-4 w-4 mr-2" />
                          View Itinerary
                        </Button>
                        {tour.status === 'upcoming' && (
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                            <Camera className="h-4 w-4 mr-2" />
                            Prepare
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <h2 className="text-2xl font-bold">My Schedule</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Schedule Calendar</h3>
                  <p className="text-gray-600">Detailed calendar view will be implemented here.</p>
                </div>
              </CardContent>
            </Card>
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
                  <CardTitle>Customer Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Rating analytics will be displayed here</p>
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

export default GuideDashboard;
