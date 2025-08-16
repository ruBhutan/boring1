
// Comprehensive Bhutan Tourism Data - Inspired by leading operators
export const comprehensiveTours = [
  // Cultural Heritage Tours
  {
    name: "Bhutan Essence - Cultural Discovery",
    duration: "7 days / 6 nights",
    price: 2100,
    maxPrice: 2800,
    category: "Cultural",
    difficulty: "Easy",
    groupSize: "2-16 people",
    highlights: [
      "Tiger's Nest Monastery (Paro Taktsang)",
      "Punakha Dzong - Palace of Great Happiness",
      "Traditional archery demonstration",
      "Local farmhouse visit with authentic meal",
      "Thimphu weekend market exploration"
    ],
    includes: [
      "All accommodation (3-4 star hotels)",
      "All meals (breakfast, lunch, dinner)",
      "English-speaking licensed guide",
      "Private transportation",
      "All entrance fees and permits",
      "Airport transfers"
    ],
    excludes: [
      "International flights",
      "Visa fees ($40 USD)",
      "Travel insurance",
      "Personal expenses",
      "Alcoholic beverages"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        activities: ["Airport pickup", "Hotel check-in", "Paro town orientation walk"],
        meals: ["Dinner"],
        accommodation: "Hotel Olathang or similar"
      },
      {
        day: 2,
        title: "Paro - Tiger's Nest Hike",
        activities: ["Hike to Tiger's Nest Monastery", "Traditional lunch at farmhouse", "Visit Kyichu Lhakhang"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Hotel Olathang or similar"
      }
    ],
    bestTime: ["March-May", "September-November"],
    physicalRating: "Moderate",
    culturalImmersion: "High",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },

  // Adventure Tours
  {
    name: "Druk Path Trek - Mountain Adventure",
    duration: "6 days / 5 nights",
    price: 1800,
    maxPrice: 2400,
    category: "Adventure",
    difficulty: "Moderate",
    groupSize: "2-12 people",
    highlights: [
      "High-altitude lakes (Jimilang Tsho & Simkotra Tsho)",
      "Rhododendron forests in bloom (April-May)",
      "Panoramic Himalayan views",
      "Traditional yak herder camps",
      "Ancient monasteries along the trail"
    ],
    includes: [
      "Camping equipment and tents",
      "All meals during trek",
      "Professional trekking guide",
      "Porter services",
      "Permits and fees",
      "Hotel accommodation in Thimphu/Paro"
    ],
    altitude: "4200m max",
    trekDifficulty: "Moderate to Challenging",
    bestTime: ["April-June", "September-October"],
    physicalRating: "Challenging",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },

  // Luxury Tours
  {
    name: "Luxury Bhutan - Amankora Journey",
    duration: "10 days / 9 nights",
    price: 8500,
    maxPrice: 12000,
    category: "Luxury",
    difficulty: "Easy",
    groupSize: "2-8 people",
    highlights: [
      "Stay at all 5 Amankora lodges",
      "Private helicopter transfers",
      "Exclusive monastery access",
      "Royal protocol experiences",
      "Michelin-level dining experiences"
    ],
    includes: [
      "Luxury accommodation (Amankora properties)",
      "All gourmet meals and premium beverages",
      "Private guide and luxury vehicles",
      "Helicopter transfers between regions",
      "Spa treatments and wellness sessions",
      "Exclusive cultural performances"
    ],
    luxuryLevel: "Ultra-Luxury",
    accommodation: "Amankora Collection",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },

  // Festival Tours
  {
    name: "Paro Tsechu Festival Experience",
    duration: "8 days / 7 nights",
    price: 2400,
    maxPrice: 3200,
    category: "Festival",
    difficulty: "Easy",
    groupSize: "4-20 people",
    highlights: [
      "Paro Tsechu sacred mask dances",
      "Unfurling of the giant Thongdrol",
      "Blessing ceremony participation",
      "Traditional costume photography",
      "Local family festival celebration"
    ],
    festivalDate: "March/April (varies yearly)",
    culturalSignificance: "Highest",
    photographyOpportunity: "Excellent",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },

  // Spiritual Tours
  {
    name: "Spiritual Awakening - Meditation Retreat",
    duration: "12 days / 11 nights",
    price: 3200,
    maxPrice: 4200,
    category: "Spiritual",
    difficulty: "Easy",
    groupSize: "4-12 people",
    highlights: [
      "Daily meditation with Buddhist masters",
      "Mindfulness practice in monasteries",
      "Philosophy discussions with monks",
      "Sunrise meditation at sacred sites",
      "Traditional Buddhist teachings"
    ],
    includes: [
      "Meditation sessions with certified masters",
      "Monastery accommodation options",
      "Vegetarian organic meals",
      "Spiritual guidance and teachings",
      "Sacred site visits and ceremonies"
    ],
    spiritualLevel: "All levels welcome",
    meditationStyle: "Tibetan Buddhist",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

export const comprehensiveHotels = [
  // Luxury Hotels
  {
    name: "Amankora Paro",
    category: "Ultra-Luxury",
    location: "Paro Valley",
    rating: 5.0,
    pricePerNight: 1200,
    maxPrice: 2000,
    roomTypes: [
      { type: "Suite", price: 1200, amenities: ["King bed", "Private terrace", "Mountain views"] },
      { type: "Deluxe Suite", price: 1800, amenities: ["Separate living area", "Butler service", "Spa access"] }
    ],
    amenities: [
      "World-class spa",
      "Fine dining restaurant",
      "Library and meditation room",
      "Traditional hot stone bath",
      "Private cultural performances"
    ],
    features: [
      "Traditional Bhutanese architecture",
      "Panoramic valley views",
      "Butler service",
      "Helicopter landing pad",
      "Exclusive monastery access"
    ],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Amankora Paro offers unparalleled luxury in the heart of Bhutan's cultural valley."
  },
  
  {
    name: "Uma by COMO, Paro",
    category: "Luxury",
    location: "Paro",
    rating: 4.8,
    pricePerNight: 450,
    maxPrice: 800,
    roomTypes: [
      { type: "Valley View Room", price: 450, amenities: ["Mountain views", "Traditional décor"] },
      { type: "Uma Villa", price: 800, amenities: ["Private villa", "Dedicated butler", "Spa treatments"] }
    ],
    amenities: [
      "COMO Shambhala Spa",
      "Bukhari restaurant",
      "Yoga and meditation pavilion",
      "Library with fireplace",
      "Adventure center"
    ],
    description: "Contemporary luxury resort blending modern comfort with Bhutanese traditions."
  },

  // Boutique Hotels
  {
    name: "Hotel Olathang",
    category: "Boutique",
    location: "Paro",
    rating: 4.2,
    pricePerNight: 120,
    maxPrice: 200,
    roomTypes: [
      { type: "Deluxe Room", price: 120, amenities: ["Valley views", "Traditional furnishing"] },
      { type: "Suite", price: 200, amenities: ["Separate living area", "Premium amenities"] }
    ],
    amenities: [
      "Restaurant with local cuisine",
      "Bar and lounge",
      "Garden terraces",
      "Conference facilities",
      "Cultural performances"
    ],
    description: "Charming boutique hotel with authentic Bhutanese hospitality and comfort."
  },

  // Farmstays
  {
    name: "Traditional Bhutanese Farmhouse - Paro",
    category: "Farmstay",
    location: "Paro Valley",
    rating: 4.5,
    pricePerNight: 80,
    maxPrice: 120,
    roomTypes: [
      { type: "Traditional Room", price: 80, amenities: ["Authentic décor", "Shared facilities"] },
      { type: "Family Room", price: 120, amenities: ["Private bathroom", "Mountain views"] }
    ],
    amenities: [
      "Organic farm-to-table meals",
      "Traditional cooking classes",
      "Farm activities",
      "Cultural immersion",
      "Local family interaction"
    ],
    activities: [
      "Farming activities",
      "Traditional cooking",
      "Archery lessons",
      "Local village walks",
      "Butter tea making"
    ],
    description: "Authentic farmstay experience with a local Bhutanese family."
  }
];

export const comprehensiveActivities = [
  {
    name: "Tiger's Nest Monastery Hike",
    category: "Adventure",
    duration: "4-5 hours",
    difficulty: "Moderate",
    price: 50,
    description: "Iconic hike to Bhutan's most famous monastery",
    location: "Paro"
  },
  {
    name: "Traditional Archery Experience",
    category: "Cultural",
    duration: "2 hours",
    difficulty: "Easy",
    price: 30,
    description: "Learn Bhutan's national sport with local experts",
    location: "Thimphu"
  },
  {
    name: "Cooking Class - Bhutanese Cuisine",
    category: "Cultural",
    duration: "3 hours",
    difficulty: "Easy",
    price: 40,
    description: "Master authentic Bhutanese dishes with local families",
    location: "Various"
  },
  {
    name: "Meditation Session with Monks",
    category: "Spiritual",
    duration: "1-2 hours",
    difficulty: "Easy",
    price: 25,
    description: "Traditional Buddhist meditation in monastery setting",
    location: "Various Monasteries"
  },
  {
    name: "White Water Rafting",
    category: "Adventure",
    duration: "Half day",
    difficulty: "Moderate",
    price: 75,
    description: "Thrilling river adventure through pristine valleys",
    location: "Mo Chhu River"
  }
];

export const comprehensiveFlights = [
  {
    airline: "Drukair",
    route: "Kathmandu - Paro",
    duration: "1h 20m",
    frequency: "Daily",
    price: 280,
    aircraft: "A319",
    features: ["Scenic mountain views", "Traditional Bhutanese hospitality"]
  },
  {
    airline: "Bhutan Airlines",
    route: "Delhi - Paro",
    duration: "2h 30m",
    frequency: "Daily",
    price: 350,
    aircraft: "A319",
    features: ["Himalayan route", "Premium service"]
  },
  {
    airline: "Drukair",
    route: "Bangkok - Paro",
    duration: "3h 45m",
    frequency: "3x weekly",
    price: 420,
    aircraft: "A319",
    features: ["Direct route", "Spectacular landing approach"]
  }
];

export const comprehensiveInterests = [
  {
    name: "Buddhist Culture & Philosophy",
    description: "Deep dive into Buddhist teachings and practices",
    category: "Spiritual",
    experiences: ["Monastery visits", "Meditation sessions", "Philosophy discussions"]
  },
  {
    name: "Himalayan Photography",
    description: "Capture stunning landscapes and cultural moments",
    category: "Adventure",
    experiences: ["Sunrise shoots", "Cultural festivals", "Wildlife photography"]
  },
  {
    name: "Traditional Arts & Crafts",
    description: "Learn ancient Bhutanese artistic traditions",
    category: "Cultural",
    experiences: ["Thangka painting", "Wood carving", "Textile weaving"]
  },
  {
    name: "Wellness & Healing",
    description: "Traditional medicine and holistic wellness practices",
    category: "Wellness",
    experiences: ["Hot stone baths", "Herbal treatments", "Yoga sessions"]
  },
  {
    name: "Culinary Exploration",
    description: "Discover Bhutanese flavors and cooking techniques",
    category: "Cultural",
    experiences: ["Cooking classes", "Market tours", "Farm visits"]
  }
];

export const tourCategories = [
  { name: "Cultural", description: "Heritage sites and traditional experiences", icon: "🏛️" },
  { name: "Adventure", description: "Trekking, hiking and outdoor activities", icon: "🏔️" },
  { name: "Luxury", description: "Premium accommodations and exclusive experiences", icon: "💎" },
  { name: "Spiritual", description: "Meditation retreats and monastery visits", icon: "🕉️" },
  { name: "Festival", description: "Traditional celebrations and cultural events", icon: "🎭" },
  { name: "Wellness", description: "Health, healing and rejuvenation programs", icon: "🧘" }
];
