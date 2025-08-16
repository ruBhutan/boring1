
import React, { useState, useEffect } from 'react';
import { User, Calendar, MapPin, Star, CreditCard, Bell, Settings, Edit3, Camera, Download, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';

interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImage?: string;
  joinedDate: string;
  totalBookings: number;
  totalSpent: number;
  favoriteDestinations: string[];
  travelPreferences: string[];
}

interface Booking {
  id: number;
  tourName: string;
  destination: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'partial';
  guide?: string;
  itinerary?: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'itinerary' | 'general';
  isRead: boolean;
  createdAt: string;
}

export default function TouristDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    email: 'tourist@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1-555-0123',
    profileImage: '',
    joinedDate: '2024-01-15',
    totalBookings: 3,
    totalSpent: 4500,
    favoriteDestinations: ['Paro', 'Thimphu', 'Punakha'],
    travelPreferences: ['Cultural Tours', 'Photography', 'Trekking']
  });

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      tourName: 'Cultural Heritage Tour',
      destination: 'Paro Valley',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      groupSize: 2,
      totalAmount: 1800,
      status: 'confirmed',
      paymentStatus: 'paid',
      guide: 'Tenzin Norbu',
      itinerary: 'Detailed 7-day cultural experience'
    },
    {
      id: 2,
      tourName: 'Tiger\'s Nest Trek',
      destination: 'Paro',
      startDate: '2024-04-10',
      endDate: '2024-04-12',
      groupSize: 1,
      totalAmount: 650,
      status: 'pending',
      paymentStatus: 'partial',
      guide: 'Karma Wangdu'
    },
    {
      id: 3,
      tourName: 'Thimphu Festival Experience',
      destination: 'Thimphu',
      startDate: '2024-05-20',
      endDate: '2024-05-25',
      groupSize: 4,
      totalAmount: 2050,
      status: 'confirmed',
      paymentStatus: 'paid'
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Booking Confirmed',
      message: 'Your Cultural Heritage Tour has been confirmed. Check your email for details.',
      type: 'booking',
      isRead: false,
      createdAt: '2024-02-20T10:30:00Z'
    },
    {
      id: 2,
      title: 'Payment Reminder',
      message: 'Complete payment for Tiger\'s Nest Trek to secure your booking.',
      type: 'payment',
      isRead: false,
      createdAt: '2024-02-19T14:15:00Z'
    },
    {
      id: 3,
      title: 'Itinerary Updated',
      message: 'Your Thimphu Festival Experience itinerary has been updated with new activities.',
      type: 'itinerary',
      isRead: true,
      createdAt: '2024-02-18T09:45:00Z'
    }
  ]);

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updatedProfile }));
    setIsEditing(false);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold">{profile.totalBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold">${profile.totalSpent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Destinations</p>
                <p className="text-2xl font-bold">{profile.favoriteDestinations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Travel Points</p>
                <p className="text-2xl font-bold">2,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{booking.tourName}</h3>
                  <p className="text-sm text-gray-600">{booking.destination}</p>
                  <p className="text-sm text-gray-500">{booking.startDate} to {booking.endDate}</p>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <p className="text-lg font-semibold">${booking.totalAmount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Travel Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Travel Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Progress to Explorer Status</span>
              <span className="text-sm">2,450 / 5,000 points</span>
            </div>
            <Progress value={49} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Next Reward:</p>
              <p className="font-semibold">10% Discount on Next Booking</p>
            </div>
            <div>
              <p className="text-gray-600">Points Needed:</p>
              <p className="font-semibold">2,550 more points</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{booking.tourName}</h3>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                      {booking.paymentStatus}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Destination</p>
                    <p className="font-medium">{booking.destination}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Dates</p>
                    <p className="font-medium">{booking.startDate} to {booking.endDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Group Size</p>
                    <p className="font-medium">{booking.groupSize} {booking.groupSize === 1 ? 'person' : 'people'}</p>
                  </div>
                </div>

                {booking.guide && (
                  <div className="text-sm">
                    <p className="text-gray-600">Assigned Guide</p>
                    <p className="font-medium">{booking.guide}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  {booking.status === 'pending' && booking.paymentStatus !== 'paid' && (
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Complete Payment
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  {booking.itinerary && (
                    <Button size="sm" variant="outline">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Itinerary
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600">${booking.totalAmount}</p>
                <p className="text-sm text-gray-600">Total Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Personal Information
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.profileImage} />
                <AvatarFallback className="text-xl">
                  {profile.firstName[0]}{profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-sm text-gray-500">Member since {new Date(profile.joinedDate).toLocaleDateString()}</p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleProfileUpdate({
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                phone: formData.get('phone') as string,
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input name="firstName" defaultValue={profile.firstName} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input name="lastName" defaultValue={profile.lastName} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input name="phone" defaultValue={profile.phone} />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg">{profile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-lg">{profile.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Travel Preferences</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.travelPreferences.map((pref, index) => (
                      <Badge key={index} variant="secondary">{pref}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Favorite Destinations</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.favoriteDestinations.map((dest, index) => (
                      <Badge key={index} variant="outline">{dest}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id} className={`${notification.isRead ? 'opacity-60' : 'border-orange-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{notification.title}</h3>
                  {!notification.isRead && (
                    <Badge className="bg-orange-100 text-orange-800 text-xs">New</Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{notification.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleDateString()} at {new Date(notification.createdAt).toLocaleTimeString()}
                </p>
              </div>
              {!notification.isRead && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  Mark as Read
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src={profile.profileImage} />
              <AvatarFallback className="text-xl">
                {profile.firstName[0]}{profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {profile.firstName}!</h1>
              <p className="opacity-90">Manage your Bhutan travel experiences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="relative">
              Notifications
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs bg-red-500">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview">{renderOverview()}</TabsContent>
            <TabsContent value="bookings">{renderBookings()}</TabsContent>
            <TabsContent value="profile">{renderProfile()}</TabsContent>
            <TabsContent value="notifications">{renderNotifications()}</TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
