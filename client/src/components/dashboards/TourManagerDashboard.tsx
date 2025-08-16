
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Settings, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  DollarSign,
  Eye,
  EyeOff
} from 'lucide-react';

const TourManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const queryClient = useQueryClient();

  // Fetch data
  const { data: tours = [] } = useQuery({
    queryKey: ['tour-manager-tours'],
    queryFn: async () => {
      const response = await fetch('/api/tours');
      return response.json();
    }
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['tour-manager-bookings'],
    queryFn: async () => {
      const response = await fetch('/api/bookings');
      return response.json();
    }
  });

  const { data: guides = [] } = useQuery({
    queryKey: ['tour-manager-guides'],
    queryFn: async () => {
      const response = await fetch('/api/guides');
      return response.json();
    }
  });

  const { data: customRequests = [] } = useQuery({
    queryKey: ['custom-tour-requests'],
    queryFn: async () => {
      const response = await fetch('/api/custom-tours');
      return response.json();
    }
  });

  // Mutations
  const updateGuideStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/guides/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tour-manager-guides'] });
    }
  });

  const updateBookingStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tour-manager-bookings'] });
    }
  });

  const toggleTourStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      const response = await fetch(`/api/tours/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tour-manager-tours'] });
    }
  });

  // Statistics
  const stats = {
    totalTours: tours.length,
    activeTours: tours.filter((t: any) => t.isActive).length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b: any) => b.status === 'pending').length,
    confirmedBookings: bookings.filter((b: any) => b.status === 'confirmed').length,
    totalRevenue: bookings.reduce((sum: number, b: any) => sum + (b.tour?.price || 0), 0),
    availableGuides: guides.filter((g: any) => g.status === 'not_assigned').length,
    assignedGuides: guides.filter((g: any) => g.status === 'assigned').length,
    customRequests: customRequests.filter((r: any) => r.status === 'pending').length
  };

  const OverviewSection = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTours}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeTours} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingBookings} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total bookings value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guides</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{guides.length}</div>
            <p className="text-xs text-muted-foreground">
              {stats.availableGuides} available
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest tour bookings requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{booking.firstName} {booking.lastName}</div>
                    <div className="text-sm text-gray-600">{booking.tour?.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      booking.status === 'confirmed' ? 'default' :
                      booking.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {booking.status}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateBookingStatusMutation.mutate({ 
                        id: booking.id, 
                        status: booking.status === 'pending' ? 'confirmed' : 'pending' 
                      })}
                    >
                      {booking.status === 'pending' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Tour Requests</CardTitle>
            <CardDescription>Pending custom tour requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customRequests.slice(0, 5).map((request: any) => (
                <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{request.firstName} {request.lastName}</div>
                    <div className="text-sm text-gray-600">
                      {request.duration} days • {request.groupSize} people
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{request.status}</Badge>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ToursManagementSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tours Management</h2>
        <div className="flex gap-2">
          <Badge variant="secondary">{tours.length} total</Badge>
          <Badge variant="outline">{stats.activeTours} active</Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.map((tour: any) => (
                <TableRow key={tour.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={tour.imageUrl} 
                        alt={tour.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{tour.name}</div>
                        <div className="text-sm text-gray-600">
                          {tour.description.slice(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{tour.category}</Badge>
                  </TableCell>
                  <TableCell>{tour.duration} days</TableCell>
                  <TableCell>${tour.price}</TableCell>
                  <TableCell>
                    {bookings.filter((b: any) => b.tourId === tour.id).length}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={tour.isActive}
                        onCheckedChange={(checked) => 
                          toggleTourStatusMutation.mutate({ id: tour.id, isActive: checked })
                        }
                      />
                      <Badge variant={tour.isActive ? "default" : "secondary"}>
                        {tour.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const GuidesManagementSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Guide & Driver Management</h2>
        <div className="flex gap-2">
          <Badge variant="secondary">{guides.length} total</Badge>
          <Badge variant="outline">{stats.availableGuides} available</Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Specializations</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guides.map((guide: any) => (
                <TableRow key={guide.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{guide.name}</div>
                      <div className="text-sm text-gray-600">{guide.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {guide.registrationType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {guide.specializations.slice(0, 2).map((spec: string) => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {guide.specializations.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{guide.specializations.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      guide.status === 'assigned' ? 'default' :
                      guide.status === 'not_assigned' ? 'secondary' : 'destructive'
                    }>
                      {guide.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateGuideStatusMutation.mutate({ 
                          id: guide.id, 
                          status: guide.status === 'assigned' ? 'not_assigned' : 'assigned'
                        })}
                      >
                        {guide.status === 'assigned' ? 'Unassign' : 'Assign'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tour Manager Dashboard</h1>
        <p className="text-gray-600">Manage tours, guides, and customer relationships</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewSection />
        </TabsContent>

        <TabsContent value="tours" className="mt-6">
          <ToursManagementSection />
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Booking Management</h3>
            <p className="text-gray-600">Advanced booking management interface coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <GuidesManagementSection />
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Payment Reconciliation</h3>
            <p className="text-gray-600">Binance/credit card transaction management coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TourManagerDashboard;
