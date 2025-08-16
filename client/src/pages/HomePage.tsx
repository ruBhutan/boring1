import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import TourGrid from "@/components/TourGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, Calendar, Compass } from "lucide-react";
import { TOUR_CATEGORIES } from "@/lib/tourCategories";
import { TrustIndicatorsSection } from "@/components/TrustIndicators";
import { AuthenticToursSection } from "@/components/AuthenticToursSection";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import { WhyChooseUsSection, BookingProcessSection } from "@/components/WhyChooseUs";
import { FloatingContactButton, SmartFormLauncher, BookNowFormLauncher } from "@/components/FormLauncher";
import EnhancedInteractiveForm from "@/components/EnhancedInteractiveForm";
import type { Tour, Testimonial } from "@shared/schema";
import InteractiveMap from '../components/InteractiveMap';
import VirtualTour360 from '../components/VirtualTour360';
import AdvancedSearchFilter from '../components/AdvancedSearchFilter';
import { FeaturedToursSection, FestivalCalendarSection, LuxuryAccommodationsSection, ExpertGuidesSection } from "@/components/PremiumFeaturesSection";


export default function HomePage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookNowFormOpen, setIsBookNowFormOpen] = useState(false);
  const [isCustomTourFormOpen, setIsCustomTourFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [experienceType, setExperienceType] = useState("all");

  const { data: tours = [] } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const filteredTours = tours.filter(tour => {
    const categoryMatch = activeFilter === "all" || tour.categoryName.toLowerCase() === activeFilter.toLowerCase();
    return categoryMatch;
  });

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookNowFormOpen(true);
  };

  return (
    <div className="pt-20">
      <Hero />

      {/* Tour Packages Section */}
      <section id="tours" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="brand-section-header">
              🎨 Curated Experiences
            </div>
            <h2 className="text-4xl md:text-5xl font-bold brand-heading mb-4">
              Transformative
              <span className="brand-gradient-text"> Journeys</span>
            </h2>
            <p className="text-xl brand-body max-w-3xl mx-auto">
              Carefully crafted experiences that blend adventure, culture, and spiritual discovery 
              in the heart of the Himalayas.
            </p>

            {/* Experience Type Filter */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button
                onClick={() => setExperienceType("all")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  experienceType === "all"
                    ? "brand-btn-primary"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Experiences
              </button>
              <button
                onClick={() => setExperienceType("curated")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  experienceType === "curated"
                    ? "brand-btn-primary"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🎨 Curated Tours
              </button>
              <button
                onClick={() => setExperienceType("authentic")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  experienceType === "authentic"
                    ? "brand-btn-primary"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🏔️ Authentic Adventures
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Badge
                variant={activeFilter === "all" ? "default" : "secondary"}
                className={`cursor-pointer transition-all ${
                  activeFilter === "all" ? "bg-brand-primary hover:bg-brand-secondary" : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveFilter("all")}
              >
                All Tours
              </Badge>
              {TOUR_CATEGORIES.map((category) => (
                <Badge
                  key={category.value}
                  variant={activeFilter === category.value ? "default" : "secondary"}
                  className={`cursor-pointer transition-all ${
                    activeFilter === category.value ? "bg-brand-primary hover:bg-brand-secondary" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveFilter(category.value)}
                >
                  {category.label.replace(' Tours', '')}
                </Badge>
              ))}
            </div>
          </div>

      {/* Tours Grid */}
      <TourGrid
        tours={filteredTours}
        onBookNow={handleBookNow}
      />
        </div>
      </section>

      {/* Advanced Search */}
      <section className="py-16 bg-gray-50">
        <AdvancedSearchFilter />
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Interactive Map */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50">
        <InteractiveMap />
      </section>

      {/* Virtual Tours */}
      <section className="py-16">
        <VirtualTour360 />
      </section>

      {/* Authentic Tours Section */}
      <AuthenticToursSection tours={tours.slice(0, 3)} onBookNow={handleBookNow} />

      {/* Premium Features Section */}
      <FeaturedToursSection />
      <FestivalCalendarSection />
      <LuxuryAccommodationsSection />
      <ExpertGuidesSection />

      {/* Bhutan Info Hub */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Bhutan
            </h2>
            <p className="text-lg text-gray-600">
              Your gateway to the Land of the Thunder Dragon
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Rich Culture</h3>
              <p className="text-gray-600">Experience centuries-old traditions and vibrant festivals</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Stunning Landscapes</h3>
              <p className="text-gray-600">From snow-capped peaks to lush valleys</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Spiritual Journey</h3>
              <p className="text-gray-600">Find peace in ancient monasteries and meditation retreats</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Process Section */}
      <BookingProcessSection />

      {/* Upcoming Events Section */}
      <UpcomingEventsSection />

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from our valued guests
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-teal-600 font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.country}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <TrustIndicatorsSection />

      {/* Call to Action Section */}
      <section className="py-20 bg-brand-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Bhutan Adventure?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join hundreds of travelers who have discovered the magic of the Last Shangri-La with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tours">
                <Button size="lg" className="brand-btn-primary">
                  <Compass className="w-5 h-5 mr-2" />
                  Browse All Tours
                </Button>
              </Link>
              <Button 
                size="lg" 
                onClick={() => setIsCustomTourFormOpen(true)}
                className="brand-btn-outline"
              >
                <Users className="w-5 h-5 mr-2" />
                Plan Custom Trip
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BookNowFormLauncher
        isOpen={isBookNowFormOpen}
        onClose={() => setIsBookNowFormOpen(false)}
        selectedTour={selectedTour}
      />

      {isCustomTourFormOpen && (
        <EnhancedInteractiveForm
          formType="custom-tour"
          isOpen={isCustomTourFormOpen}
          onClose={() => setIsCustomTourFormOpen(false)}
          initialData={{}}
          onSubmitSuccess={(data) => {
            console.log("Custom tour request submitted:", data);
            setIsCustomTourFormOpen(false);
          }}
        />
      )}

      {/* Floating Contact Button */}
      <FloatingContactButton />
    </div>
  );
}