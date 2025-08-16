import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FestivalBookingFormLauncher } from "@/components/FormLauncher";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Heart, MapPin, Star, Ticket, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import type { Festival } from "@shared/schema";

export default function FestivalsPage() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [isFestivalBookingFormOpen, setIsFestivalBookingFormOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data: festivals = [], isLoading } = useQuery<Festival[]>({
    queryKey: ["/api/festivals"],
  });

  // Since Festival doesn't have category in schema, filter by activities or significance instead
  const filteredFestivals = festivals.filter(festival => 
    categoryFilter === "all" || 
    (festival.significance?.toLowerCase().includes(categoryFilter) ||
     festival.activities?.some(activity => activity.toLowerCase().includes(categoryFilter)))
  );

  const categories = [
    { value: "all", label: "All Festivals" },
    { value: "religious", label: "Religious" },
    { value: "cultural", label: "Cultural" },
    { value: "seasonal", label: "Seasonal" },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const parseDuration = (duration?: string) => {
    if (!duration) return 'Duration varies';
    return duration;
  };


  const openBookingModal = (festival: Festival) => {
    setSelectedFestival(festival);
    setIsFestivalBookingFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light-gradient py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading festivals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold brand-heading mb-4">
            Sacred Festivals of Bhutan
          </h1>
          <p className="text-xl brand-body max-w-3xl mx-auto">
            Immerse yourself in Bhutan's most sacred celebrations where ancient Buddhist traditions come alive through colorful mask dances, spiritual ceremonies, and community gatherings that have remained unchanged for centuries. Each festival offers a unique window into the soul of the Last Shangri-La.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={categoryFilter === category.value ? "default" : "outline"}
              onClick={() => setCategoryFilter(category.value)}
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Festivals Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredFestivals.map((festival) => (
            <Card key={festival.id} className="brand-card overflow-hidden">
              <div className="relative">
                <img
                  src={festival.imageUrl}
                  alt={festival.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="default">
                    Festival
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-sm font-semibold text-green-600">
                    Free Entry
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl brand-heading">{festival.name}</CardTitle>
                <CardDescription className="line-clamp-2 brand-body">
                  {festival.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm brand-body">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {festival.dates || 'Date TBA'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm brand-body">
                    <Clock className="w-4 h-4" />
                    <span>{parseDuration(festival.duration)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm brand-body">
                    <MapPin className="w-4 h-4" />
                    <span>{festival.location}</span>
                  </div>
                  
                  {festival.significance && (
                    <div className="flex items-center gap-2 text-sm brand-body">
                      <Star className="w-4 h-4" />
                      <span className="line-clamp-1">{festival.significance}</span>
                    </div>
                  )}
                </div>

                {festival.activities && festival.activities.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 brand-heading">Activities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {festival.activities.slice(0, 3).map((activity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                      {festival.activities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{festival.activities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Link to={`/festivals/info/${festival.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full btn-brand-outline"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => openBookingModal(festival)}
                    className="flex-1 btn-brand-primary"
                  >
                    <Ticket className="w-4 h-4 mr-1" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFestivals.length === 0 && (
          <div className="text-center py-12">
            <p className="brand-body">No festivals found for the selected category.</p>
          </div>
        )}
      </div>

      {/* Festival Booking Form */}
      <FestivalBookingFormLauncher
        isOpen={isFestivalBookingFormOpen}
        onClose={() => setIsFestivalBookingFormOpen(false)}
        selectedFestival={selectedFestival}
      />
    </div>
  );
}
