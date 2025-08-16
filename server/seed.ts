
import { db } from "./db";
import { enhancedToursData } from "./enhanced-tours";
import { enhancedHotelsData, enhancedHotelRoomsData } from "./enhanced-hotels";
import { enhancedFestivalsData } from "./enhanced-festivals";
import { additionalToursData } from "./additional-tours";
import { additionalHotelsData, additionalHotelRoomsData } from "./additional-hotels";
import { bhutanOperatorTours } from "./bhutan-operator-tours";
import { operatorInspiredTours } from "./operator-inspired-tours";
import { websiteInspiredTours } from "./website-inspired-tours";
import { websiteInspiredHotels, websiteInspiredHotelRooms } from "./website-inspired-hotels";
import { 
  tourCategories, hotelCategories, travelActivities, travelInterests, 
  flightRoutes, accommodationTypes, difficultyLevels, seasonalPeriods 
} from "./master-data-sources";

export async function seed() {
  console.log("🌱 Seeding database with comprehensive data...");

  try {
    // Clear master data tables first
    console.log("🧹 Clearing master data...");
    await db.tourCategory.deleteMany();
    await db.hotelCategory.deleteMany();
    await db.travelActivity.deleteMany();
    await db.travelInterest.deleteMany();
    await db.flightRoute.deleteMany();
    await db.accommodationType.deleteMany();
    await db.difficultyLevel.deleteMany();
    await db.seasonalPeriod.deleteMany();

    // Seed master data
    console.log("🎯 Seeding master data...");
    
    // Tour Categories
    await db.tourCategory.createMany({ data: tourCategories });
    
    // Hotel Categories  
    await db.hotelCategory.createMany({ data: hotelCategories });
    
    // Travel Activities
    await db.travelActivity.createMany({ data: travelActivities });
    
    // Travel Interests
    await db.travelInterest.createMany({ data: travelInterests });
    
    // Flight Routes
    await db.flightRoute.createMany({ data: flightRoutes });
    
    // Accommodation Types
    await db.accommodationType.createMany({ data: accommodationTypes });
    
    // Difficulty Levels
    await db.difficultyLevel.createMany({ data: difficultyLevels });
    
    // Seasonal Periods
    await db.seasonalPeriod.createMany({ data: seasonalPeriods });

    // Clear existing transactional data in correct order
    console.log("🧹 Clearing existing transactional data...");
    await db.userFeedback.deleteMany();
    await db.flightBooking.deleteMany();
    await db.hotelBooking.deleteMany();
    await db.festivalBooking.deleteMany();
    await db.customTourInterest.deleteMany();
    await db.userInterest.deleteMany();
    await db.bookingActivity.deleteMany();
    await db.tourActivityJunction.deleteMany();
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
    
    // Note: Master data tables already cleared and reseeded above
    // Do not clear them again as we need the foreign key references

    // Seed comprehensive tour operators
    console.log("👥 Seeding tour operators...");
    const tourOperatorsData = [
      {
        name: "Heavenly Bhutan",
        website: "www.heavenlybhutan.com",
        description: "Specializing in eco-friendly luxury tours with rich local experiences. Known for sustainable tourism practices and authentic cultural immersion programs.",
        bestFeature: "Eco-friendly luxury tours with rich local experiences",
        specialties: ["Eco-tourism", "Luxury tours", "Cultural immersion", "Sustainable travel"],
        rating: 4.8,
        reviewCount: 245,
        logoUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@heavenlybhutan.com",
        contactPhone: "+975-17617107",
        establishedYear: 2010,
        certifications: ["Bhutan Tourism Board Licensed", "Eco-Tourism Certified"],
        awards: ["Best Eco-Tourism Operator 2023", "Sustainable Travel Award"],
        isActive: true
      },
      {
        name: "Druk Asia",
        website: "www.drukasia.com",
        description: "Official representative of Royal Bhutan Airlines with seamless visa processing and high-end private tours. Licensed operator in Bhutan, Singapore, and Malaysia.",
        bestFeature: "Seamless visa processing and high-end private tours",
        specialties: ["Visa processing", "Private tours", "Luxury travel", "Custom itineraries"],
        rating: 4.9,
        reviewCount: 835,
        logoUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@drukasia.com",
        contactPhone: "+65-6223-7684",
        establishedYear: 2005,
        certifications: ["Royal Bhutan Airlines Representative", "Multi-country Licensed"],
        awards: ["TripAdvisor Travelers' Choice", "Excellence in Service Award"],
        isActive: true
      },
      {
        name: "Bhutan Peaceful Tour",
        website: "www.bhutanpeacefultour.com",
        description: "Offering personalized cultural and spiritual journeys with deep focus on meditation, mindfulness, and Buddhist philosophy.",
        bestFeature: "Personalized cultural and spiritual journeys",
        specialties: ["Spiritual tours", "Meditation retreats", "Cultural experiences", "Buddhist philosophy"],
        rating: 4.9,
        reviewCount: 312,
        logoUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@bhutanpeacefultour.com",
        contactPhone: "+975-2-323456",
        establishedYear: 2008,
        certifications: ["Spiritual Tourism Certified", "Buddhist Guide Licensed"],
        awards: ["Best Spiritual Tour Operator", "Mindfulness Travel Excellence"],
        isActive: true
      },
      {
        name: "Wind Horse Tours",
        website: "www.windhorsetours.com",
        description: "Extensive trekking, festival, and wildlife options with expert guides and comprehensive adventure packages.",
        bestFeature: "Extensive trekking, festival, and wildlife options",
        specialties: ["Trekking", "Festival tours", "Wildlife expeditions", "Adventure travel"],
        rating: 4.7,
        reviewCount: 567,
        logoUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@windhorsetours.com",
        contactPhone: "+975-2-334567",
        establishedYear: 2003,
        certifications: ["Adventure Tourism Licensed", "Wildlife Guide Certified"],
        awards: ["Best Adventure Operator", "Trekking Excellence Award"],
        isActive: true
      },
      {
        name: "Keys to Bhutan",
        website: "www.keystobhutan.com",
        description: "Custom-designed trips with deep local insight, offering unique access to hidden gems and authentic experiences.",
        bestFeature: "Custom-designed trips with deep local insight",
        specialties: ["Custom tours", "Local insights", "Hidden gems", "Authentic experiences"],
        rating: 4.8,
        reviewCount: 423,
        logoUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@keystobhutan.com",
        contactPhone: "+975-2-345678",
        establishedYear: 2012,
        certifications: ["Custom Tour Specialist", "Local Heritage Guide"],
        awards: ["Innovation in Tourism", "Authentic Experience Award"],
        isActive: true
      },
      {
        name: "Bhutan Swallowtail",
        website: "www.bhutanswallowtail.com",
        description: "Luxury bespoke tours and hidden gem experiences with premium accommodations and exclusive access.",
        bestFeature: "Luxury bespoke tours and hidden gem experiences",
        specialties: ["Luxury tours", "Bespoke experiences", "Premium accommodations", "Exclusive access"],
        rating: 4.9,
        reviewCount: 289,
        logoUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        contactEmail: "info@bhutanswallowtail.com",
        contactPhone: "+975-2-356789",
        establishedYear: 2015,
        certifications: ["Luxury Tourism Certified", "Premium Service Provider"],
        awards: ["Luxury Travel Award", "Excellence in Bespoke Travel"],
        isActive: true
      }
    ];

    const createdOperators = await Promise.all(
      tourOperatorsData.map(operator => db.tourOperator.create({ data: operator }))
    );

    // Seed all tours from all data files
    console.log("🎯 Seeding tours...");
    const allToursData = [
      ...enhancedToursData.map(tour => ({ ...tour, isActive: true })),
      ...additionalToursData.map(tour => ({ ...tour, isActive: true })),
      ...bhutanOperatorTours.map(tour => ({ ...tour, isActive: true })),
      ...operatorInspiredTours.map(tour => ({ ...tour, isActive: true })),
      ...websiteInspiredTours.map(tour => ({ ...tour, isActive: true }))
    ];

    const toursData = allToursData.map((tour, index) => {
      const { category, duration, reviewCount, maxGroupSize, bestSeason, operatorStyle, ...tourData } = tour;
      return {
        ...tourData,
        duration: `${duration} days`,
        groupSize: `${maxGroupSize}`,
        bestTime: [bestSeason].flat(),
        categoryName: category,
        tourOperatorId: createdOperators[index % createdOperators.length].id
      };
    });

    await db.tour.createMany({ data: toursData });

    // Seed all hotels from all data files
    console.log("🏨 Seeding hotels...");
    const allHotelsData = [
      ...enhancedHotelsData.map(hotel => ({ ...hotel, isActive: true })),
      ...additionalHotelsData.map(hotel => ({ ...hotel, isActive: true })),
      ...websiteInspiredHotels.map(hotel => ({ ...hotel, isActive: true }))
    ];

    const hotelsData = allHotelsData.map(hotel => {
      const { category, ...hotelData } = hotel;
      return {
        ...hotelData,
        categoryId: category
      };
    });

    const createdHotels = await Promise.all(
      hotelsData.map(hotel => db.hotel.create({ data: hotel }))
    );

    // Seed all hotel rooms
    console.log("🛏️ Seeding hotel rooms...");
    const allHotelRoomsData = [
      ...enhancedHotelRoomsData.map(room => ({ ...room, isActive: true })),
      ...additionalHotelRoomsData.map(room => ({ ...room, isActive: true })),
      ...websiteInspiredHotelRooms.map(room => ({ ...room, isActive: true }))
    ];

    const hotelRoomsData = allHotelRoomsData.map((room, index) => ({
      ...room,
      hotelId: createdHotels[index % createdHotels.length].id
    }));

    await db.hotelRoom.createMany({ data: hotelRoomsData });

    // Seed all festivals
    console.log("🎉 Seeding festivals...");
    const festivalsData = enhancedFestivalsData.map(festival => ({ 
      ...festival, 
      isActive: true 
    }));
    await db.festival.createMany({ data: festivalsData });

    // Seed comprehensive user accounts with all 4 roles
    console.log("👤 Seeding user accounts...");
    const userAccountsData = [
      {
        email: "admin@bhutantours.com",
        password: "admin123",
        firstName: "Admin",
        lastName: "Manager",
        role: "admin",
        phone: "+975-2-123456",
        isActive: true
      },
      {
        email: "tourmanager@bhutantours.com",
        password: "manager123",
        firstName: "Tour",
        lastName: "Manager",
        role: "tour_manager",
        phone: "+975-2-234567",
        isActive: true
      },
      {
        email: "guide@bhutantours.com",
        password: "guide123",
        firstName: "Tenzin",
        lastName: "Dorji",
        role: "guide",
        phone: "+975-17-123456",
        isActive: true
      },
      {
        email: "driver@bhutantours.com",
        password: "driver123",
        firstName: "Karma",
        lastName: "Wangchuk",
        role: "driver",
        phone: "+975-17-234567",
        isActive: true
      },
      {
        email: "tourist@example.com",
        password: "tourist123",
        firstName: "John",
        lastName: "Smith",
        role: "tourist",
        phone: "+1-555-123-4567",
        isActive: true
      }
    ];

    await db.userAccount.createMany({ data: userAccountsData });

    // Seed guides and drivers
    console.log("🗺️ Seeding guides and drivers...");
    const guidesData = [
      {
        name: "Tenzin Norbu",
        email: "tenzin.guide@bhutan.com",
        phone: "+975-17-555-0001",
        licenseImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        registrationType: "guide",
        specializations: ["Cultural Tours", "Trekking", "Photography"],
        status: "not_assigned"
      },
      {
        name: "Karma Wangchuk",
        email: "karma.driver@bhutan.com",
        phone: "+975-17-555-0002",
        licenseImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        registrationType: "driver",
        specializations: ["Mountain Driving", "Long Distance", "Tourist Transport"],
        status: "not_assigned"
      },
      {
        name: "Pema Lhamo",
        email: "pema.guide@bhutan.com",
        phone: "+975-17-555-0003",
        licenseImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        registrationType: "guide",
        specializations: ["Spiritual Tours", "Festivals", "Meditation"],
        status: "not_assigned"
      },
      {
        name: "Dorji Wangdi",
        email: "dorji.driver@bhutan.com",
        phone: "+975-17-555-0004",
        licenseImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        registrationType: "driver",
        specializations: ["Adventure Tours", "4WD", "Remote Areas"],
        status: "not_assigned"
      }
    ];

    await db.guide.createMany({ data: guidesData });

    // Seed comprehensive testimonials
    console.log("💬 Seeding testimonials...");
    const testimonialsData = [
      {
        name: "Sarah Mitchell",
        country: "Australia",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The eco-luxury experience with Heavenly Bhutan was transformative. Staying in sustainable accommodations while experiencing authentic culture was perfect.",
        rating: 5,
        tripName: "Eco-Luxury Cultural Immersion",
        duration: "8 days",
        isActive: true
      },
      {
        name: "James Chen",
        country: "Singapore",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Druk Asia's visa processing was seamless and their private tour exceeded all expectations. The luxury vehicles and exclusive access made us feel like royalty.",
        rating: 5,
        tripName: "Royal Bhutan Private Experience",
        duration: "10 days",
        isActive: true
      },
      {
        name: "Maria Rodriguez",
        country: "Spain",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The meditation retreat with Bhutan Peaceful Tour was life-changing. The spiritual guidance helped me find inner peace.",
        rating: 5,
        tripName: "Mindfulness & Meditation Retreat",
        duration: "14 days",
        isActive: true
      },
      {
        name: "David Thompson",
        country: "United Kingdom",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Wind Horse Tours organized an incredible trek to Jomolhari base camp. The guides were professional and the mountain views absolutely breathtaking.",
        rating: 5,
        tripName: "Jomolhari Base Camp Trek",
        duration: "16 days",
        isActive: true
      },
      {
        name: "Emma Wilson",
        country: "Canada",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "Keys to Bhutan showed us hidden gems of Eastern Bhutan that no other operator covers. The authentic rural experiences were unforgettable.",
        rating: 5,
        tripName: "Hidden Gems Discovery",
        duration: "10 days",
        isActive: true
      }
    ];

    await db.testimonial.createMany({ data: testimonialsData });

    // Seed comprehensive blog posts
    console.log("📝 Seeding blog posts...");
    const blogPostsData = [
      {
        title: "Ultimate Guide to Bhutan's Sacred Festivals",
        content: "Discover the spiritual significance and cultural richness of Bhutan's most important festivals, from the grand Paro Tshechu to the sacred Jambay Lhakhang Drup. Learn about the masked dances, traditional music, and community celebrations that define Bhutanese culture.",
        excerpt: "Explore the spiritual significance and cultural richness of Bhutan's most important festivals.",
        author: "Bhutan Travel Expert",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Culture",
        readTime: "8 min",
        isPublished: true
      },
      {
        title: "Luxury Travel in Bhutan: Beyond the Ordinary",
        content: "Experience the pinnacle of luxury travel in Bhutan with exclusive accommodations, private helicopter transfers, and personalized service. Discover how to combine luxury with authentic cultural experiences.",
        excerpt: "Experience the pinnacle of luxury travel in Bhutan with exclusive accommodations and personalized service.",
        author: "Luxury Travel Specialist",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Luxury",
        readTime: "6 min",
        isPublished: true
      },
      {
        title: "Sustainable Tourism: Bhutan's Green Revolution",
        content: "Learn how Bhutan leads the world in sustainable tourism with carbon-neutral operations, community-based tourism, and environmental conservation initiatives. Discover eco-friendly travel options.",
        excerpt: "Learn how Bhutan leads the world in sustainable tourism with carbon-neutral operations.",
        author: "Sustainability Expert",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Sustainability",
        readTime: "7 min",
        isPublished: true
      }
    ];

    await db.blogPost.createMany({ data: blogPostsData });

    const counts = {
      tourOperators: await db.tourOperator.count(),
      tours: await db.tour.count(),
      hotels: await db.hotel.count(),
      hotelRooms: await db.hotelRoom.count(),
      festivals: await db.festival.count(),
      testimonials: await db.testimonial.count(),
      blogPosts: await db.blogPost.count(),
      userAccounts: await db.userAccount.count(),
      guides: await db.guide.count()
    };

    console.log("✅ Database seeded successfully!");
    console.log(`📊 Created ${counts.tourOperators} tour operators`);
    console.log(`🎯 Created ${counts.tours} tours`);
    console.log(`🏨 Created ${counts.hotels} hotels`);
    console.log(`🛏️ Created ${counts.hotelRooms} hotel rooms`);
    console.log(`🎉 Created ${counts.festivals} festivals`);
    console.log(`💬 Created ${counts.testimonials} testimonials`);
    console.log(`📝 Created ${counts.blogPosts} blog posts`);
    console.log(`👤 Created ${counts.userAccounts} user accounts`);
    console.log(`🗺️ Created ${counts.guides} guides/drivers`);

    return counts;

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await db.$disconnect();
    });
}
