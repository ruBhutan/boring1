import { db } from "./db";

export async function simpleSeed() {
  console.log("🌱 Starting simple database seeding...");

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
    
    // Clear hotel categories if they exist
    await db.hotelCategory.deleteMany();

    // Seed hotel categories first
    console.log("🏨 Seeding hotel categories...");
    const hotelCategories = [
      { id: "luxury", name: "Luxury Hotels", icon: "⭐", description: "Premium luxury accommodations" },
      { id: "boutique", name: "Boutique Hotels", icon: "🏛️", description: "Unique boutique properties" },
      { id: "resort", name: "Resort Hotels", icon: "🏖️", description: "Resort-style accommodations" },
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

    // Seed basic tours
    console.log("🎯 Seeding tours...");
    const toursData = [
      {
        name: "Cultural Discovery Tour",
        description: "Explore Bhutan's rich cultural heritage with visits to ancient monasteries, traditional villages, and sacred sites. Experience the unique Bhutanese way of life.",
        duration: "8 days",
        price: 2500,
        maxPrice: 3200,
        categoryName: "Cultural",
        difficulty: "Easy",
        groupSize: "12",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        highlights: ["Tiger's Nest Monastery", "Thimphu Dzong", "Traditional villages", "Local markets"],
        includes: ["Accommodation", "Meals", "Guide", "Transportation"],
        excludes: ["International flights", "Personal expenses"],
        bestTime: ["March", "April", "May", "September", "October", "November"],
        rating: 4.7,
        isActive: true,
        tourOperatorId: createdOperators[0].id
      },
      {
        name: "Himalayan Adventure Trek",
        description: "Embark on an unforgettable trekking adventure through pristine Himalayan landscapes with breathtaking mountain views and diverse wildlife.",
        duration: "12 days",
        price: 3800,
        maxPrice: 4500,
        categoryName: "Adventure", 
        difficulty: "Moderate",
        groupSize: "8",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        highlights: ["Mountain peaks", "Remote villages", "Wildlife spotting", "Mountain lakes"],
        includes: ["Camping equipment", "Professional guide", "Meals", "Permits"],
        excludes: ["International flights", "Personal gear"],
        bestTime: ["March", "April", "May", "September", "October"],
        rating: 4.8,
        isActive: true,
        tourOperatorId: createdOperators[0].id
      },
      {
        name: "Spiritual Retreat Journey",
        description: "Find inner peace through meditation, monastery visits, and spiritual practices guided by Buddhist monks in sacred locations.",
        duration: "10 days",
        price: 2800,
        maxPrice: 3500,
        categoryName: "Spiritual",
        difficulty: "Easy",
        groupSize: "10",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        highlights: ["Meditation sessions", "Monastery visits", "Buddhist teachings", "Sacred sites"],
        includes: ["Accommodation", "Vegetarian meals", "Spiritual guide", "Ceremonies"],
        excludes: ["International flights", "Personal expenses"],
        bestTime: ["All year"],
        rating: 4.9,
        isActive: true,
        tourOperatorId: createdOperators[0].id
      }
    ];

    await db.tour.createMany({ data: toursData });

    // Seed basic hotels
    console.log("🏨 Seeding hotels...");
    const hotelsData = [
      {
        name: "Amankora Paro",
        description: "Ultra-luxury resort offering unparalleled views of the sacred Jomolhari mountain with world-class amenities.",
        location: "Paro Valley",
        address: "Paro Valley, Bhutan",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        categoryId: "luxury",
        starRating: 5,
        amenities: ["Private infinity pool", "World-class spa", "Fine dining", "Butler service"],
        features: ["Carbon-neutral operations", "Cultural experiences"],
        pricePerNight: 1800,
        isActive: true,
        contactEmail: "reservations@amankora.com",
        contactPhone: "+975-8-272333"
      },
      {
        name: "Uma Paro by COMO",
        description: "Contemporary luxury resort with valley views and holistic wellness programs.",
        location: "Paro",
        address: "Paro Valley, Bhutan",
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        categoryId: "luxury",
        starRating: 5,
        amenities: ["Infinity pool", "COMO Shambhala spa", "Fine dining", "Yoga classes"],
        features: ["Holistic wellness programs", "Sustainable luxury"],
        pricePerNight: 1200,
        isActive: true,
        contactEmail: "reservations@umaparo.como.bz", 
        contactPhone: "+975-8-271597"
      },
      {
        name: "Gangtey Lodge",
        description: "Boutique lodge in pristine Phobjikha Valley offering intimate luxury with stunning mountain views.",
        location: "Phobjikha Valley",
        address: "Phobjikha Valley, Wangdue Phodrang, Bhutan",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        categoryId: "boutique",
        starRating: 4,
        amenities: ["Mountain views", "Restaurant", "Bar", "Bird watching"],
        features: ["Crane conservation", "Local community support"],
        pricePerNight: 450,
        isActive: true,
        contactEmail: "info@gangteylodge.com",
        contactPhone: "+975-17-123456"
      }
    ];

    await db.hotel.createMany({ data: hotelsData });

    // Seed basic festivals
    console.log("🎉 Seeding festivals...");
    const festivalsData = [
      {
        name: "Paro Tsechu",
        description: "One of Bhutan's most spectacular festivals featuring sacred mask dances and the unfurling of a giant thangka.",
        location: "Paro Dzong",
        dates: "March/April (dates vary yearly)",
        duration: "5 days",
        significance: "Sacred festival celebrating Guru Rinpoche",
        activities: ["Mask dances (Cham)", "Giant thangka unfurling", "Blessing ceremonies"],
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isActive: true
      },
      {
        name: "Thimphu Tshechu",
        description: "The capital's grandest festival featuring traditional dances and cultural performances.",
        location: "Thimphu Dzong",
        dates: "September/October",
        duration: "3 days",
        significance: "Honors Guru Rinpoche and celebrates Bhutanese culture",
        activities: ["Traditional dances", "Cultural performances", "Local food stalls"],
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        isActive: true
      }
    ];

    await db.festival.createMany({ data: festivalsData });

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
      },
      {
        name: "Emma Rodriguez",
        country: "Spain",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        text: "The spiritual retreat was life-changing. I found inner peace and learned so much about Buddhist philosophy.",
        rating: 5,
        tripName: "Spiritual Retreat Journey",
        duration: "10 days",
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
        content: "Bhutan offers a unique travel experience with its pristine culture and stunning landscapes. From ancient monasteries to modern sustainable practices, discover what makes this kingdom special.",
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Travel Guide",
        author: "Bhutan Expert",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        readTime: "8 min",
        isPublished: true
      },
      {
        title: "Best Time to Visit Bhutan",
        excerpt: "Plan your perfect Bhutan trip with our seasonal guide",
        content: "Understanding Bhutan's seasons helps you plan the perfect trip. Learn about weather patterns, festival seasons, and the best times for trekking and cultural experiences.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Planning",
        author: "Travel Advisor",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        readTime: "6 min",
        isPublished: true
      }
    ];

    await db.blogPost.createMany({ data: blogPostsData });

    // Seed user accounts
    console.log("👤 Seeding user accounts...");
    const userAccountsData = [
      {
        email: "admin@bhutantours.com",
        password: "admin123",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        phone: "+975-2-123456",
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

    const counts = {
      tourOperators: await db.tourOperator.count(),
      tours: await db.tour.count(),
      hotels: await db.hotel.count(),
      festivals: await db.festival.count(),
      testimonials: await db.testimonial.count(),
      blogPosts: await db.blogPost.count(),
      userAccounts: await db.userAccount.count()
    };

    console.log("✅ Simple seed completed successfully!");
    console.log(`📊 Created ${counts.tourOperators} tour operators`);
    console.log(`🎯 Created ${counts.tours} tours`);
    console.log(`🏨 Created ${counts.hotels} hotels`);
    console.log(`🎉 Created ${counts.festivals} festivals`);
    console.log(`💬 Created ${counts.testimonials} testimonials`);
    console.log(`📝 Created ${counts.blogPosts} blog posts`);
    console.log(`👤 Created ${counts.userAccounts} user accounts`);

    return counts;

  } catch (error) {
    console.error("❌ Error in simple seed:", error);
    throw error;
  }
}

// Run the seeding
if (import.meta.url === `file://${process.argv[1]}`) {
  simpleSeed()
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    })
    .finally(async () => {
      await db.$disconnect();
    });
}
