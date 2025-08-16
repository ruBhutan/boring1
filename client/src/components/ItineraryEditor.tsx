
import { useState, useEffect } from 'react';
import { Edit3, Save, X, Plus, Trash2, Clock, MapPin, Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals: string[];
  notes?: string;
  isModified?: boolean;
  originalData?: any;
}

interface ItineraryEditorProps {
  bookingId: string;
  initialItinerary: ItineraryDay[];
  canEdit: boolean;
  approvalStatus?: 'pending' | 'approved' | 'rejected' | 'none';
  onSaveChanges: (itinerary: ItineraryDay[], changes: string) => void;
  onSubmitForApproval: (itinerary: ItineraryDay[], changes: string) => void;
}

export function ItineraryEditor({
  bookingId,
  initialItinerary,
  canEdit,
  approvalStatus = 'none',
  onSaveChanges,
  onSubmitForApproval
}: ItineraryEditorProps) {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(initialItinerary);
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [changesSummary, setChangesSummary] = useState('');
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);

  useEffect(() => {
    const hasChanges = itinerary.some(day => day.isModified);
    setHasUnsavedChanges(hasChanges);
  }, [itinerary]);

  const updateDay = (dayId: string, field: keyof ItineraryDay, value: any) => {
    setItinerary(prev => prev.map(day => {
      if (day.id === dayId) {
        const updated = { 
          ...day, 
          [field]: value, 
          isModified: true,
          originalData: day.originalData || { ...day }
        };
        return updated;
      }
      return day;
    }));
  };

  const addActivity = (dayId: string) => {
    setItinerary(prev => prev.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: [...day.activities, ''],
          isModified: true,
          originalData: day.originalData || { ...day }
        };
      }
      return day;
    }));
  };

  const removeActivity = (dayId: string, activityIndex: number) => {
    setItinerary(prev => prev.map(day => {
      if (day.id === dayId) {
        const newActivities = day.activities.filter((_, index) => index !== activityIndex);
        return {
          ...day,
          activities: newActivities,
          isModified: true,
          originalData: day.originalData || { ...day }
        };
      }
      return day;
    }));
  };

  const updateActivity = (dayId: string, activityIndex: number, value: string) => {
    setItinerary(prev => prev.map(day => {
      if (day.id === dayId) {
        const newActivities = [...day.activities];
        newActivities[activityIndex] = value;
        return {
          ...day,
          activities: newActivities,
          isModified: true,
          originalData: day.originalData || { ...day }
        };
      }
      return day;
    }));
  };

  const saveChanges = () => {
    const changedDays = itinerary.filter(day => day.isModified);
    const summary = changedDays.map(day => `Day ${day.day}: Modified ${day.title}`).join('; ');
    
    onSaveChanges(itinerary, summary);
    
    // Reset modification flags
    setItinerary(prev => prev.map(day => ({ ...day, isModified: false })));
    setHasUnsavedChanges(false);
  };

  const submitForApproval = () => {
    const changedDays = itinerary.filter(day => day.isModified);
    const summary = changesSummary || changedDays.map(day => `Day ${day.day}: Modified ${day.title}`).join('; ');
    
    onSubmitForApproval(itinerary, summary);
    setShowApprovalDialog(false);
    setIsEditing(false);
  };

  const discardChanges = () => {
    setItinerary(initialItinerary);
    setIsEditing(false);
    setHasUnsavedChanges(false);
  };

  const getApprovalStatusBadge = () => {
    switch (approvalStatus) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Approval Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Changes Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Itinerary</h2>
          {getApprovalStatusBadge()}
        </div>
        
        {canEdit && !isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Customize Itinerary
          </Button>
        )}
        
        {isEditing && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={discardChanges}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={saveChanges} disabled={!hasUnsavedChanges}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700" disabled={!hasUnsavedChanges}>
                  <Send className="w-4 h-4 mr-2" />
                  Submit for Approval
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Submit Changes for Approval</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Your changes will be reviewed by our tour management team. Please provide a summary of the changes you've made.
                  </p>
                  <Textarea
                    placeholder="Describe the changes you've made to your itinerary..."
                    value={changesSummary}
                    onChange={(e) => setChangesSummary(e.target.value)}
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={submitForApproval} className="bg-teal-600 hover:bg-teal-700">
                      Submit for Review
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {approvalStatus === 'pending' && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your itinerary changes are under review. We'll notify you once they're approved or if we need any clarification.
          </AlertDescription>
        </Alert>
      )}

      {approvalStatus === 'rejected' && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Your requested changes were not approved. Please contact our tour manager for more details or submit new changes.
          </AlertDescription>
        </Alert>
      )}

      {/* Itinerary Days */}
      <div className="space-y-4">
        {itinerary.map((day) => (
          <Card key={day.id} className={`${day.isModified ? 'border-orange-200 bg-orange-50' : ''}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                    {day.day}
                  </div>
                  {isEditing ? (
                    <Input
                      value={day.title}
                      onChange={(e) => updateDay(day.id, 'title', e.target.value)}
                      className="text-lg font-semibold"
                    />
                  ) : (
                    <span className="text-lg font-semibold">Day {day.day}: {day.title}</span>
                  )}
                </CardTitle>
                {day.isModified && (
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    Modified
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                {isEditing ? (
                  <Textarea
                    value={day.description}
                    onChange={(e) => updateDay(day.id, 'description', e.target.value)}
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-700">{day.description}</p>
                )}
              </div>

              {/* Activities */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Activities</label>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addActivity(day.id)}
                      className="text-teal-600"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Activity
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-shrink-0 w-2 h-2 bg-teal-600 rounded-full" />
                      {isEditing ? (
                        <div className="flex items-center flex-1 space-x-2">
                          <Input
                            value={activity}
                            onChange={(e) => updateActivity(day.id, index, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeActivity(day.id, index)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-700">{activity}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Accommodation & Meals */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Accommodation
                  </label>
                  {isEditing ? (
                    <Input
                      value={day.accommodation || ''}
                      onChange={(e) => updateDay(day.id, 'accommodation', e.target.value)}
                      placeholder="Hotel or accommodation"
                    />
                  ) : (
                    <p className="text-gray-700">{day.accommodation || 'Not specified'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Meals
                  </label>
                  <p className="text-gray-700">{day.meals.join(', ') || 'Not specified'}</p>
                </div>
              </div>

              {/* Notes */}
              {(isEditing || day.notes) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  {isEditing ? (
                    <Textarea
                      value={day.notes || ''}
                      onChange={(e) => updateDay(day.id, 'notes', e.target.value)}
                      placeholder="Add any special notes or requests for this day..."
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-600 italic">{day.notes}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Information */}
      {!isEditing && (
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Need to make changes?</h3>
            <p className="text-sm text-blue-800">
              You can customize your itinerary up to 7 days before your trip. All changes will be reviewed by our tour management team to ensure the best experience for your journey.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
