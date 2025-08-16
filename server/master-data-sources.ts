
// Master data sources for single source of truth across the entire application
export const tourCategories = [
  { id: 'cultural', name: 'Cultural Tours', icon: 'camera', description: 'Immerse in Bhutan\'s rich cultural heritage' },
  { id: 'adventure', name: 'Adventure Tours', icon: 'mountain', description: 'Thrilling outdoor experiences' },
  { id: 'spiritual', name: 'Spiritual Tours', icon: 'heart', description: 'Journey of spiritual discovery' },
  { id: 'luxury', name: 'Luxury Tours', icon: 'crown', description: 'Premium comfort and exclusivity' },
  { id: 'festival', name: 'Festival Tours', icon: 'calendar', description: 'Experience vibrant cultural festivals' },
  { id: 'pilgrimage', name: 'Pilgrimage Tours', icon: 'church', description: 'Sacred spiritual journeys' },
  { id: 'photography', name: 'Photography Tours', icon: 'camera-alt', description: 'Capture stunning landscapes' },
  { id: 'cycling', name: 'Cycling Tours', icon: 'bike', description: 'Explore on two wheels' },
  { id: 'bird-watching', name: 'Bird Watching', icon: 'bird', description: 'Discover diverse avian species' },
  { id: 'wellness', name: 'Wellness Tours', icon: 'leaf', description: 'Rejuvenation and healing' },
  { id: 'family', name: 'Family Tours', icon: 'users', description: 'Perfect for family adventures' },
  { id: 'honeymoon', name: 'Honeymoon Tours', icon: 'heart-two', description: 'Romantic getaways' },
  { id: 'eco-tourism', name: 'Eco Tourism', icon: 'tree', description: 'Sustainable travel experiences' },
  { id: 'boutique', name: 'Boutique Tours', icon: 'gem', description: 'Unique curated experiences' }
];

export const hotelCategories = [
  { id: 'luxury', name: 'Luxury Hotels', icon: 'crown', description: 'Premium accommodations with world-class amenities' },
  { id: 'boutique', name: 'Boutique Hotels', icon: 'gem', description: 'Intimate properties with unique character' },
  { id: 'heritage', name: 'Heritage Hotels', icon: 'building', description: 'Historic properties with cultural significance' },
  { id: 'eco-lodge', name: 'Eco Lodges', icon: 'leaf', description: 'Sustainable accommodations in nature' },
  { id: 'resort', name: 'Resort Hotels', icon: 'island', description: 'Full-service resorts with extensive facilities' },
  { id: 'homestay', name: 'Homestays', icon: 'home', description: 'Authentic local family experiences' },
  { id: 'guesthouse', name: 'Guest Houses', icon: 'door', description: 'Comfortable budget-friendly options' },
  { id: 'farmstay', name: 'Farmstays', icon: 'tractor', description: 'Rural agricultural experiences' }
];

export const travelActivities = [
  { id: 'trekking', name: 'Trekking', category: 'adventure', difficulty: 'moderate-challenging' },
  { id: 'photography', name: 'Photography', category: 'cultural', difficulty: 'easy' },
  { id: 'meditation', name: 'Meditation', category: 'spiritual', difficulty: 'easy' },
  { id: 'cultural-exchange', name: 'Cultural Exchange', category: 'cultural', difficulty: 'easy' },
  { id: 'sightseeing', name: 'Sightseeing', category: 'cultural', difficulty: 'easy' },
  { id: 'bird-watching', name: 'Bird Watching', category: 'nature', difficulty: 'easy' },
  { id: 'cycling', name: 'Cycling', category: 'adventure', difficulty: 'moderate' },
  { id: 'rafting', name: 'White Water Rafting', category: 'adventure', difficulty: 'challenging' },
  { id: 'monastery-visits', name: 'Monastery Visits', category: 'spiritual', difficulty: 'easy' },
  { id: 'cooking-classes', name: 'Cooking Classes', category: 'cultural', difficulty: 'easy' },
  { id: 'traditional-crafts', name: 'Traditional Crafts', category: 'cultural', difficulty: 'easy' },
  { id: 'spa-wellness', name: 'Spa & Wellness', category: 'wellness', difficulty: 'easy' },
  { id: 'mountain-climbing', name: 'Mountain Climbing', category: 'adventure', difficulty: 'challenging' },
  { id: 'wildlife-safari', name: 'Wildlife Safari', category: 'nature', difficulty: 'easy' },
  { id: 'village-walks', name: 'Village Walks', category: 'cultural', difficulty: 'easy' },
  { id: 'archery', name: 'Traditional Archery', category: 'cultural', difficulty: 'easy' },
  { id: 'hot-stone-bath', name: 'Hot Stone Bath', category: 'wellness', difficulty: 'easy' },
  { id: 'prayer-flag-ceremony', name: 'Prayer Flag Ceremony', category: 'spiritual', difficulty: 'easy' }
];

export const travelInterests = [
  { id: 'culture-heritage', name: 'Culture & Heritage', description: 'Ancient traditions and historical sites' },
  { id: 'nature-wildlife', name: 'Nature & Wildlife', description: 'Pristine landscapes and biodiversity' },
  { id: 'adventure-sports', name: 'Adventure Sports', description: 'Thrilling outdoor activities' },
  { id: 'spiritual-wellness', name: 'Spiritual & Wellness', description: 'Inner peace and rejuvenation' },
  { id: 'photography-art', name: 'Photography & Art', description: 'Creative expression and visual arts' },
  { id: 'festivals-events', name: 'Festivals & Events', description: 'Cultural celebrations and ceremonies' },
  { id: 'food-cuisine', name: 'Food & Cuisine', description: 'Culinary experiences and local flavors' },
  { id: 'luxury-comfort', name: 'Luxury & Comfort', description: 'Premium experiences and amenities' },
  { id: 'sustainable-tourism', name: 'Sustainable Tourism', description: 'Eco-friendly and responsible travel' },
  { id: 'local-communities', name: 'Local Communities', description: 'Authentic interactions with locals' }
];

export const flightRoutes = [
  {
    id: 'paro-delhi',
    origin: 'Paro (PBH)',
    destination: 'New Delhi (DEL)',
    airline: 'Drukair',
    duration: '2h 30m',
    frequency: 'Daily',
    price: 450
  },
  {
    id: 'paro-kolkata',
    origin: 'Paro (PBH)',
    destination: 'Kolkata (CCU)',
    airline: 'Drukair',
    duration: '1h 45m',
    frequency: 'Daily',
    price: 380
  },
  {
    id: 'paro-kathmandu',
    origin: 'Paro (PBH)',
    destination: 'Kathmandu (KTM)',
    airline: 'Drukair',
    duration: '1h 30m',
    frequency: '4x weekly',
    price: 320
  },
  {
    id: 'paro-bangkok',
    origin: 'Paro (PBH)',
    destination: 'Bangkok (BKK)',
    airline: 'Bhutan Airlines',
    duration: '3h 15m',
    frequency: '3x weekly',
    price: 580
  },
  {
    id: 'paro-singapore',
    origin: 'Paro (PBH)',
    destination: 'Singapore (SIN)',
    airline: 'Bhutan Airlines',
    duration: '4h 20m',
    frequency: '2x weekly',
    price: 720
  }
];

export const accommodationTypes = [
  { id: 'hotel', name: 'Hotel', icon: 'building' },
  { id: 'resort', name: 'Resort', icon: 'island' },
  { id: 'lodge', name: 'Lodge', icon: 'cabin' },
  { id: 'guesthouse', name: 'Guest House', icon: 'door' },
  { id: 'homestay', name: 'Homestay', icon: 'home' },
  { id: 'farmstay', name: 'Farmstay', icon: 'tractor' },
  { id: 'camping', name: 'Camping', icon: 'tent' },
  { id: 'monastery', name: 'Monastery Stay', icon: 'church' }
];

export const difficultyLevels = [
  { id: 'easy', name: 'Easy', description: 'Suitable for all fitness levels' },
  { id: 'moderate', name: 'Moderate', description: 'Some physical fitness required' },
  { id: 'challenging', name: 'Challenging', description: 'Good physical fitness required' },
  { id: 'extreme', name: 'Extreme', description: 'Excellent fitness and experience required' }
];

export const seasonalPeriods = [
  { id: 'spring', name: 'Spring (Mar-May)', weather: 'Mild, blooming rhododendrons' },
  { id: 'summer', name: 'Summer (Jun-Aug)', weather: 'Warm, monsoon season' },
  { id: 'autumn', name: 'Autumn (Sep-Nov)', weather: 'Clear skies, ideal for trekking' },
  { id: 'winter', name: 'Winter (Dec-Feb)', weather: 'Cold, clear mountain views' },
  { id: 'year-round', name: 'Year Round', weather: 'Suitable throughout the year' }
];
