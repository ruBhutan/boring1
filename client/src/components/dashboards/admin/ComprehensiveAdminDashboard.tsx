
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Users, 
  MapPin, 
  Calendar as CalendarIcon,
  Upload,
  Download,
  Star,
  DollarSign,
  Clock,
  Mountain,
  Hotel,
  Plane,
  Camera,
  Heart,
  Activity,
  CheckSquare,
  Square
} from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

interface Tour {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  isActive: boolean;
  maxGroupSize: number;
  difficulty: string;
  bestSeason: string;
  includes: string[];
  excludes: string[];
}

interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  address: string;
  imageUrl: string;
  images: string[];
  category: string;
  starRating: number;
  amenities: string[];
  features: string[];
  pricePerNight: number;
  isActive: boolean;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
}

interface Festival {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  category: string;
  highlights: string[];
  isActive: boolean;
  ticketPrice?: number;
  maxCapacity?: number;
}

interface Guide {
  id: number;
  name: string;
  email: string;
  phone: string;
  licenseImageUrl: string;
  registrationType: string;
  specializations: string[];
  status: string;
}

const ComprehensiveAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tours');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const queryClient = useQueryClient();

  // Fetch data hooks
  const { data: tours = [], isLoading: toursLoading } = useQuery({
    queryKey: ['admin-tours'],
    queryFn: async () => {
      const response = await fetch('/api/tours');
      return response.json();
    }
  });

  const { data: hotels = [], isLoading: hotelsLoading } = useQuery({
    queryKey: ['admin-hotels'],
    queryFn: async () => {
      const response = await fetch('/api/hotels');
      return response.json();
    }
  });

  const { data: festivals = [], isLoading: festivalsLoading } = useQuery({
    queryKey: ['admin-festivals'],
    queryFn: async () => {
      const response = await fetch('/api/festivals');
      return response.json();
    }
  });

  const { data: guides = [], isLoading: guidesLoading } = useQuery({
    queryKey: ['admin-guides'],
    queryFn: async () => {
      const response = await fetch('/api/guides');
      return response.json();
    }
  });

  // Mutations
  const createTourMutation = useMutation({
    mutationFn: async (tourData: Partial<Tour>) => {
      const response = await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tourData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tours'] });
      setShowCreateDialog(false);
      toast({ title: 'Success', description: 'Tour created successfully' });
    }
  });

  const updateTourMutation = useMutation({
    mutationFn: async ({ id, ...tourData }: Partial<Tour> & { id: number }) => {
      const response = await fetch(`/api/tours/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tourData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tours'] });
      setEditingItem(null);
      toast({ title: 'Success', description: 'Tour updated successfully' });
    }
  });

  const deleteTourMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/tours/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tours'] });
      toast({ title: 'Success', description: 'Tour deleted successfully' });
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      const response = await fetch(`/api/tours/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tours'] });
      toast({ title: 'Success', description: 'Status updated successfully' });
    }
  });

  const bulkStatusMutation = useMutation({
    mutationFn: async ({ ids, isActive }: { ids: number[]; isActive: boolean }) => {
      await Promise.all(
        ids.map(id => 
          fetch(`/api/tours/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive })
          })
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tours'] });
      setSelectedItems([]);
      toast({ title: 'Success', description: 'Bulk status update completed' });
    }
  });

  // Tour Creation Form Component
  const TourCreateForm = ({ onSubmit, initialData = null }: any) => {
    const [formData, setFormData] = useState({
      name: initialData?.name || '',
      description: initialData?.description || '',
      duration: initialData?.duration || 1,
      price: initialData?.price || 0,
      category: initialData?.category || 'Cultural',
      imageUrl: initialData?.imageUrl || '',
      maxGroupSize: initialData?.maxGroupSize || 12,
      difficulty: initialData?.difficulty || 'Moderate',
      bestSeason: initialData?.bestSeason || 'Spring',
      highlights: initialData?.highlights || [],
      includes: initialData?.includes || [],
      excludes: initialData?.excludes || [],
      isActive: initialData?.isActive ?? false
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="multimedia">Multimedia</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tour Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="Spiritual">Spiritual</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                    <SelectItem value="Trekking">Trekking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxGroupSize">Max Group Size</Label>
                <Input
                  id="maxGroupSize"
                  type="number"
                  value={formData.maxGroupSize}
                  onChange={(e) => setFormData({ ...formData, maxGroupSize: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Challenging">Challenging</SelectItem>
                    <SelectItem value="Difficult">Difficult</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="multimedia" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Main Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Drag-drop zone for 10+ images (coming soon)</p>
              <p className="text-xs text-gray-500">Previews with delete functionality</p>
            </div>

            <div className="space-y-2">
              <Label>360° Tour Embedding (Optional)</Label>
              <div className="border border-gray-200 rounded-lg p-4 text-center text-gray-500">
                360° tour integration coming soon
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Base Price (USD)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Seasonal Multipliers</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Peak Season (+%)</Label>
                  <Input type="number" placeholder="20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Low Season (-%)</Label>
                  <Input type="number" placeholder="10" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Discounts</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Child Discount (%)</Label>
                  <Input type="number" placeholder="25" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Senior Discount (%)</Label>
                  <Input type="number" placeholder="15" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label>Tour Status</Label>
                <p className="text-sm text-gray-600">
                  Default: inactive (require explicit activation)
                </p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Status Information</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Inactive tours won't appear in public listings</li>
                <li>• You can bulk update status from the main list</li>
                <li>• Active tours are immediately visible to customers</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="submit" disabled={createTourMutation.isPending || updateTourMutation.isPending}>
            {initialData ? 'Update Tour' : 'Create Tour'}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  // Tour Management Section
  const TourManagementSection = () => (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Tour Management</h2>
          <Badge variant="secondary">{tours.length} total</Badge>
          <Badge variant="outline">{tours.filter((t: Tour) => t.isActive).length} active</Badge>
        </div>
        
        <div className="flex gap-2">
          {selectedItems.length > 0 && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => bulkStatusMutation.mutate({ ids: selectedItems, isActive: true })}
              >
                <Eye className="w-4 h-4 mr-1" />
                Activate Selected ({selectedItems.length})
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => bulkStatusMutation.mutate({ ids: selectedItems, isActive: false })}
              >
                <EyeOff className="w-4 h-4 mr-1" />
                Deactivate Selected
              </Button>
            </div>
          )}
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-1" />
                Create Tour
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Tour</DialogTitle>
                <DialogDescription>
                  Add a new tour with comprehensive details and multimedia content
                </DialogDescription>
              </DialogHeader>
              <TourCreateForm onSubmit={createTourMutation.mutate} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tours Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === tours.length}
                    onCheckedChange={(checked) => {
                      setSelectedItems(checked ? tours.map((t: Tour) => t.id) : []);
                    }}
                  />
                </TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.map((tour: Tour) => (
                <TableRow key={tour.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(tour.id)}
                      onCheckedChange={(checked) => {
                        setSelectedItems(prev => 
                          checked 
                            ? [...prev, tour.id]
                            : prev.filter(id => id !== tour.id)
                        );
                      }}
                    />
                  </TableCell>
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
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={tour.isActive}
                        onCheckedChange={(checked) => 
                          toggleStatusMutation.mutate({ id: tour.id, isActive: checked })
                        }
                      />
                      <Badge variant={tour.isActive ? "default" : "secondary"}>
                        {tour.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {tour.rating} ({tour.reviewCount})
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => setEditingItem(tour)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tour</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{tour.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteTourMutation.mutate(tour.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Tour</DialogTitle>
            <DialogDescription>
              Update tour details and settings
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <TourCreateForm 
              initialData={editingItem} 
              onSubmit={(data: any) => updateTourMutation.mutate({ id: editingItem.id, ...data })}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Complete tour management ecosystem with manual operations</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="festivals">Festivals</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="itineraries">Itineraries</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tours" className="mt-6">
          <TourManagementSection />
        </TabsContent>

        <TabsContent value="hotels" className="mt-6">
          <div className="text-center py-12">
            <Hotel className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Hotel Management</h3>
            <p className="text-gray-600">Comprehensive hotel CRUD interface coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="festivals" className="mt-6">
          <div className="text-center py-12">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Festival Management</h3>
            <p className="text-gray-600">Festival creation and management interface coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Guide & Driver Management</h3>
            <p className="text-gray-600">Approve registrations and assign to itineraries</p>
          </div>
        </TabsContent>

        <TabsContent value="itineraries" className="mt-6">
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Itinerary Management</h3>
            <p className="text-gray-600">Visual timeline builder with drag-drop functionality</p>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="text-center py-12">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Analytics & Reports</h3>
            <p className="text-gray-600">Booking analytics and payment reconciliation</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveAdminDashboard;
