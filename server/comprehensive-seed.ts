
import { PrismaClient } from '@prisma/client';
import { comprehensiveTours, comprehensiveHotels, comprehensiveActivities, comprehensiveFlights, comprehensiveInterests, tourCategories } from './comprehensive-bhutan-data';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    console.log('🌱 Starting comprehensive database seeding...');

    // Clear existing data
    await prisma.booking.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.flight.deleteMany();
    await prisma.interest.deleteMany();
    await prisma.tourOperator.deleteMany();
    await prisma.festival.deleteMany();
    await prisma.hotel.deleteMany();
    await prisma.tour.deleteMany();

    console.log('🗑️ Cleared existing data');

    // Seed Tours
    console.log('🎯 Seeding tours...');
    for (const tourData of comprehensiveTours) {
      await prisma.tour.create({
        data: {
          name: tourData.name,
          description: tourData.description || `Experience the best of ${tourData.name} with our expertly crafted itinerary.`,
          duration: tourData.duration,
          price: tourData.price,
          maxPrice: tourData.maxPrice,
          category: tourData.category,
          difficulty: tourData.difficulty,
          groupSize: tourData.groupSize,
          imageUrl: tourData.imageUrl,
          highlights: tourData.highlights,
          includes: tourData.includes,
          excludes: tourData.excludes || [],
          itinerary: JSON.stringify(tourData.itinerary || []),
          bestTime: tourData.bestTime || [],
          physicalRating: tourData.physicalRating || 'Moderate',
          rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    // Seed Hotels
    console.log('🏨 Seeding hotels...');
    for (const hotelData of comprehensiveHotels) {
      await prisma.hotel.create({
        data: {
          name: hotelData.name,
          category: hotelData.category,
          location: hotelData.location,
          rating: hotelData.rating,
          pricePerNight: hotelData.pricePerNight,
          description: hotelData.description,
          imageUrl: hotelData.images?.[0] || "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          amenities: hotelData.amenities,
          roomTypes: JSON.stringify(hotelData.roomTypes),
          features: hotelData.features || [],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    // Seed Activities
    console.log('🎨 Seeding activities...');
    for (const activityData of comprehensiveActivities) {
      await prisma.activity.create({
        data: {
          name: activityData.name,
          category: activityData.category,
          duration: activityData.duration,
          difficulty: activityData.difficulty,
          price: activityData.price,
          description: activityData.description,
          location: activityData.location,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    // Seed Flights
    console.log('✈️ Seeding flights...');
    for (const flightData of comprehensiveFlights) {
      await prisma.flight.create({
        data: {
          airline: flightData.airline,
          route: flightData.route,
          duration: flightData.duration,
          frequency: flightData.frequency,
          price: flightData.price,
          aircraft: flightData.aircraft,
          features: flightData.features,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    // Seed Interests
    console.log('💡 Seeding interests...');
    for (const interestData of comprehensiveInterests) {
      await prisma.interest.create({
        data: {
          name: interestData.name,
          description: interestData.description,
          category: interestData.category,
          experiences: interestData.experiences,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    // Seed Festivals
    console.log('🎭 Seeding festivals...');
    const festivals = [
      {
        name: "Paro Tsechu",
        description: "One of Bhutan's most spectacular festivals featuring sacred mask dances and the unfurling of a giant thangka.",
        location: "Paro Dzong",
        dates: "March/April (dates vary yearly)",
        duration: "5 days",
        significance: "Sacred festival celebrating Guru Rinpoche",
        activities: ["Mask dances (Cham)", "Giant thangka unfurling", "Blessing ceremonies"],
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      },
      {
        name: "Thimphu Tshechu",
        description: "The capital's grandest festival featuring traditional dances, cultural performances, and religious ceremonies.",
        location: "Thimphu Dzong",
        dates: "September/October",
        duration: "3 days",
        significance: "Honors Guru Rinpoche and celebrates Bhutanese culture",
        activities: ["Traditional dances", "Cultural performances", "Local food stalls"],
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      }
    ];

    for (const festivalData of festivals) {
      await prisma.festival.create({
        data: {
          name: festivalData.name,
          description: festivalData.description,
          location: festivalData.location,
          dates: festivalData.dates,
          duration: festivalData.duration,
          significance: festivalData.significance,
          activities: festivalData.activities,
          imageUrl: festivalData.imageUrl,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    // Seed Testimonials
    console.log('⭐ Seeding testimonials...');
    const testimonials = [
      {
        name: "Sarah Johnson",
        country: "United States",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612d7c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Our Bhutan adventure exceeded all expectations. The cultural immersion, stunning monasteries, and warm hospitality made this trip unforgettable. Highly recommend!",
        rating: 5,
        tripName: "Cultural Discovery Tour",
        duration: "8 days"
      },
      {
        name: "Michael Chen",
        country: "Australia",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The Tiger's Nest hike was challenging but absolutely worth it. Our guide was knowledgeable and the views were breathtaking. Bhutan is truly magical.",
        rating: 5,
        tripName: "Adventure & Culture Tour",
        duration: "10 days"
      },
      {
        name: "Emma Rodriguez",
        country: "Spain",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The luxury accommodations at Amankora were exceptional. Every detail was perfect, from the spa treatments to the gourmet meals. Pure bliss!",
        rating: 5,
        tripName: "Luxury Bhutan Experience",
        duration: "7 days"
      }
    ];

    for (const testimonialData of testimonials) {
      await prisma.testimonial.create({
        data: {
          name: testimonialData.name,
          country: testimonialData.country,
          imageUrl: testimonialData.imageUrl,
          text: testimonialData.text,
          rating: testimonialData.rating,
          tripName: testimonialData.tripName,
          duration: testimonialData.duration,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    // Seed Blog Posts
    console.log('📝 Seeding blog posts...');
    const blogPosts = [
      {
        title: "Complete Guide to Bhutan Visa Requirements 2024",
        content: "Everything you need to know about obtaining a visa for Bhutan, including recent updates and step-by-step application process...",
        excerpt: "Navigate Bhutan's visa requirements with our comprehensive 2024 guide.",
        author: "Bhutan Travel Expert",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Travel Tips",
        readTime: "6 min"
      },
      {
        title: "Best Time to Visit Bhutan: Seasonal Travel Guide",
        content: "Discover the perfect time for your Bhutan adventure based on weather, festivals, and activities...",
        excerpt: "Plan your perfect Bhutan trip with our seasonal travel guide and insider tips.",
        author: "Local Guide",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Planning",
        readTime: "8 min"
      }
    ];

    for (const blogData of blogPosts) {
      await prisma.blogPost.create({
        data: {
          title: blogData.title,
          content: blogData.content,
          excerpt: blogData.excerpt,
          author: blogData.author,
          authorImage: blogData.authorImage,
          imageUrl: blogData.imageUrl,
          category: blogData.category,
          readTime: blogData.readTime,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`
    📊 Seeded:
    - ${comprehensiveTours.length} Tours
    - ${comprehensiveHotels.length} Hotels  
    - ${comprehensiveActivities.length} Activities
    - ${comprehensiveFlights.length} Flights
    - ${comprehensiveInterests.length} Interests
    - ${festivals.length} Festivals
    - ${testimonials.length} Testimonials
    - ${blogPosts.length} Blog Posts
    `);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase()
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;
