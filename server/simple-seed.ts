import { db } from "./db";
import { enhancedToursData } from "./enhanced-tours";
import { enhancedHotelsData } from "./enhanced-hotels";
import { enhancedFestivalsData } from "./enhanced-festivals";

export async function simpleSeed() {
  console.log("🌱 Simple database seeding started...");

  try {
    // Clear existing data in correct order (respecting foreign key constraints)
    console.log("🧹 Clearing existing data...");
    await db.hotelBooking.deleteMany();
    await db.festivalBooking.deleteMany();
    await db.hotelRoom.deleteMany();
    await db.hotel.deleteMany();
    await db.festival.deleteMany();
    await db.itineraryDay.deleteMany();
    await db.itinerary.deleteMany();
    await db.customTourRequest.deleteMany();
    await db.booking.deleteMany();
    await db.inquiry.deleteMany();
    await db.guide.deleteMany();
    await db.userAccount.deleteMany();
    await db.blogPost.deleteMany();
    await db.testimonial.deleteMany();
    await db.tour.deleteMany();
    await db.tourOperator.deleteMany();
    
    // Clear any hotel categories that might exist
    await db.hotelCategory.deleteMany();

    // Seed a basic hotel category first
    console.log("🏨 Seeding hotel categories...");
    const hotelCategories = [
      { id: "luxury", name: "Luxury Hotels", icon: "⭐", description: "Premium luxury accommodations" },
      { id: "boutique", name: "Boutique Hotels", icon: "🏛️", description: "Unique boutique properties" },
      { id: "resort", name: "Resort Hotels", icon: "🏖️", description: "Resort-style accommodations" },
      { id: "traditional", name: "Traditional", icon: "🏯", description: "Traditional Bhutanese accommodations" },
      { id: "heritage", name: "Heritage", icon: "🏛️", description: "Heritage hotels" },
      { id: "eco-lodge", name: "Eco-Lodge", icon: "🌿", description: "Eco-friendly lodges" }
    ];
    await db.hotelCategory.createMany({ data: hotelCategories });

    // Seed basic tour operators
    console.log("👥 Seeding tour operators...");
    const tourOperatorsData = [
      {
        name: "Bhutan Adventure Tours",
        website: "www.bhutanadventure.com",
        description: "Premium tour operator specializing in authentic Bhutanese experiences",
        bestFeature: "Authentic cultural experiences",
        specialties: ["Cultural Tours", "Adventure", "Spiritual"],
        rating: 4.8,
        reviewCount: 150,
        contactEmail: "info@bhutanadventure.com",
        contactPhone: "+975-2-123456",
        isActive: true
      }
    ];

    const createdOperators = await Promise.all(
      tourOperatorsData.map(operator => db.tourOperator.create({ data: operator }))
    );

    // Seed tours (simplified)
    console.log("🎯 Seeding tours...");
    const simplifiedTours = enhancedToursData.slice(0, 20).map((tour, index) => ({
      name: tour.name,
      description: tour.description,
      duration: tour.duration + " days",
      price: tour.price,
      maxPrice: tour.maxPrice,
      categoryName: tour.category || "Cultural",
      difficulty: tour.difficulty,
      groupSize: String(tour.maxGroupSize),
      imageUrl: tour.imageUrl,
      highlights: tour.highlights || [],
      includes: tour.includes || [],
      excludes: tour.excludes || [],
      bestTime: tour.bestTime || [],
      rating: 4.5,
      isActive: true,
      tourOperatorId: createdOperators[0].id
    }));

    await db.tour.createMany({ data: simplifiedTours });

    // Seed hotels (simplified) 
    console.log("🏨 Seeding hotels...");
    const simplifiedHotels = enhancedHotelsData.slice(0, 15).map(hotel => ({
      name: hotel.name,
      description: hotel.description,
      location: hotel.location,
      address: hotel.address || hotel.location,
      imageUrl: hotel.imageUrl,
      categoryId: hotel.category || "luxury",
      starRating: hotel.starRating || 4,
      amenities: hotel.amenities || [],
      features: hotel.features || [],
      pricePerNight: hotel.pricePerNight || 200,
      isActive: true,
      contactEmail: `info@${hotel.name.toLowerCase().replace(/\s+/g, '')}.com`,
      contactPhone: "+975-2-555-0000"
    }));

    await db.hotel.createMany({ data: simplifiedHotels });

    // Seed festivals (simplified)
    console.log("🎉 Seeding festivals...");
    const simplifiedFestivals = enhancedFestivalsData.slice(0, 10).map(festival => ({
      name: festival.name,
      description: festival.description,
      location: festival.location,
      dates: festival.dates,
      duration: festival.duration,
      significance: festival.significance,
      activities: festival.activities || [],
      imageUrl: festival.imageUrl,
      isActive: true
    }));

    await db.festival.createMany({ data: simplifiedFestivals });

    // Seed basic testimonials
    console.log("💬 Seeding testimonials...");
    const testimonialsData = [
      {
        name: "Sarah Johnson",
        country: "USA", 
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "An absolutely incredible experience in Bhutan. The cultural richness and natural beauty exceeded all expectations.",
        rating: 5,
        tripName: "Cultural Discovery Tour",
        duration: "10 days",
        isActive: true
      },
      {
        name: "Michael Chen",
        country: "Singapore",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", 
        text: "The trekking experience was phenomenal. Our guide was knowledgeable and the mountain views were breathtaking.",
        rating: 5,
        tripName: "Himalayan Adventure Trek",
        duration: "12 days",
        isActive: true
      }
    ];

    await db.testimonial.createMany({ data: testimonialsData });

    // Seed basic blog posts
    console.log("📝 Seeding blog posts...");
    const blogPostsData = [
      {
        title: "Essential Guide to Bhutan Travel",
        excerpt: "Everything you need to know before traveling to the Last Shangri-La",
        content: "Bhutan offers a unique travel experience with its pristine culture and stunning landscapes...",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Travel Guide",
        author: "Bhutan Expert",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        readTime: "8 min",
        isPublished: true
      }
    ];

    await db.blogPost.createMany({ data: blogPostsData });

    const counts = {
      tourOperators: await db.tourOperator.count(),
      tours: await db.tour.count(), 
      hotels: await db.hotel.count(),
      festivals: await db.festival.count(),
      testimonials: await db.testimonial.count(),
      blogPosts: await db.blogPost.count()
    };

    console.log("✅ Simple seed completed successfully!");
    console.log(`📊 Created ${counts.tourOperators} tour operators`);
    console.log(`🎯 Created ${counts.tours} tours`);
    console.log(`🏨 Created ${counts.hotels} hotels`);
    console.log(`🎉 Created ${counts.festivals} festivals`);
    console.log(`💬 Created ${counts.testimonials} testimonials`);
    console.log(`📝 Created ${counts.blogPosts} blog posts`);

    return counts;

  } catch (error) {
    console.error("❌ Error in simple seed:", error);
    throw error;
  }
}
