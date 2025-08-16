
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Calendar, User, BookOpen, MapPin, Camera, Mountain, Compass, Clock, Share2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

interface TravelTip {
  id: string;
  title: string;
  description: string;
  category: 'preparation' | 'cultural' | 'health' | 'photography' | 'packing';
  icon: React.ElementType;
  importance: 'essential' | 'recommended' | 'nice-to-know';
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Complete Guide to Tiger\'s Nest Monastery Trek',
    excerpt: 'Everything you need to know about visiting Bhutan\'s most iconic monastery, including trek difficulty, best times to visit, and photography tips.',
    content: 'Full article content...',
    author: 'Karma Wangchuk',
    publishDate: '2024-01-15',
    readTime: 8,
    category: 'destinations',
    tags: ['Tiger\'s Nest', 'Trekking', 'Photography', 'Spiritual'],
    image: '/api/placeholder/400/250',
    featured: true
  },
  {
    id: '2',
    title: '10 Essential Cultural Etiquettes for Bhutan Travel',
    excerpt: 'Respect local customs and traditions with our comprehensive guide to Bhutanese cultural norms and etiquette.',
    content: 'Full article content...',
    author: 'Tenzin Dolma',
    publishDate: '2024-01-12',
    readTime: 6,
    category: 'culture',
    tags: ['Culture', 'Etiquette', 'Local Customs'],
    image: '/api/placeholder/400/250',
    featured: false
  },
  {
    id: '3',
    title: 'Best Photography Spots in Bhutan: A Complete Guide',
    excerpt: 'Discover the most Instagram-worthy locations across Bhutan, from ancient monasteries to stunning mountain vistas.',
    content: 'Full article content...',
    author: 'John Smith',
    publishDate: '2024-01-10',
    readTime: 12,
    category: 'photography',
    tags: ['Photography', 'Landscapes', 'Monasteries', 'Mountains'],
    image: '/api/placeholder/400/250',
    featured: true
  },
  {
    id: '4',
    title: 'Bhutan Festival Calendar 2024: When and Where to Experience Traditional Celebrations',
    excerpt: 'Plan your visit around Bhutan\'s colorful festivals. Complete calendar with dates, locations, and cultural significance.',
    content: 'Full article content...',
    author: 'Pema Tshering',
    publishDate: '2024-01-08',
    readTime: 10,
    category: 'festivals',
    tags: ['Festivals', 'Culture', 'Calendar', 'Traditions'],
    image: '/api/placeholder/400/250',
    featured: false
  }
];

const travelTips: TravelTip[] = [
  {
    id: '1',
    title: 'Visa Requirements',
    description: 'All visitors except Indians, Bangladeshis, and Maldivians need a visa. Apply through licensed tour operators.',
    category: 'preparation',
    icon: MapPin,
    importance: 'essential'
  },
  {
    id: '2',
    title: 'Respect Photography Rules',
    description: 'Never photograph inside temples or monasteries without permission. Ask locals before taking their photos.',
    category: 'cultural',
    icon: Camera,
    importance: 'essential'
  },
  {
    id: '3',
    title: 'Pack for All Weather',
    description: 'Weather can change quickly in the mountains. Bring layers, rain gear, and warm clothes even in summer.',
    category: 'packing',
    icon: Mountain,
    importance: 'recommended'
  },
  {
    id: '4',
    title: 'Altitude Preparation',
    description: 'Some areas are at high altitude. Stay hydrated, avoid alcohol, and ascend gradually if trekking.',
    category: 'health',
    icon: Compass,
    importance: 'essential'
  }
];

const categories = [
  { id: 'all', label: 'All Posts', count: blogPosts.length },
  { id: 'destinations', label: 'Destinations', count: blogPosts.filter(p => p.category === 'destinations').length },
  { id: 'culture', label: 'Culture', count: blogPosts.filter(p => p.category === 'culture').length },
  { id: 'photography', label: 'Photography', count: blogPosts.filter(p => p.category === 'photography').length },
  { id: 'festivals', label: 'Festivals', count: blogPosts.filter(p => p.category === 'festivals').length }
];

const tipCategories = [
  { id: 'all', label: 'All Tips', icon: BookOpen },
  { id: 'preparation', label: 'Trip Preparation', icon: MapPin },
  { id: 'cultural', label: 'Cultural Tips', icon: Compass },
  { id: 'health', label: 'Health & Safety', icon: Mountain },
  { id: 'photography', label: 'Photography', icon: Camera }
];

export default function BlogTravelTips() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTipCategory, setSelectedTipCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredTips = travelTips.filter(tip => 
    selectedTipCategory === 'all' || tip.category === selectedTipCategory
  );

  const featuredPosts = blogPosts.filter(post => post.featured);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'essential': return 'bg-red-100 text-red-800 border-red-200';
      case 'recommended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'nice-to-know': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">Bhutan Travel Blog & Tips</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover insider knowledge, travel tips, and inspiring stories to help you make the most of your Bhutan adventure.
        </p>
      </div>

      <Tabs defaultValue="blog" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Travel Blog
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Travel Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="space-y-8">
          {/* Featured Posts */}
          <section>
            <h3 className="text-2xl font-bold mb-6">Featured Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-teal-600">
                      Featured
                    </Badge>
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {post.readTime} min read
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" className="btn-brand-primary">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-1"
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {post.readTime} min
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button size="sm" className="w-full btn-brand-outline">
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          {/* Tip Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tipCategories.map(category => (
              <Button
                key={category.id}
                variant={selectedTipCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTipCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* Travel Tips Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTips.map(tip => (
              <Card key={tip.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <tip.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-lg">{tip.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getImportanceColor(tip.importance)}`}
                      >
                        {tip.importance.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Tips Summary */}
          <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-0">
            <CardHeader>
              <CardTitle className="text-center">Essential Travel Tips Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Before You Go</h4>
                  <p className="text-sm text-gray-600">
                    Visa, permits, and essential preparations for your Bhutan journey.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Compass className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Cultural Respect</h4>
                  <p className="text-sm text-gray-600">
                    Understanding and respecting Bhutanese customs and traditions.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mountain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Safety First</h4>
                  <p className="text-sm text-gray-600">
                    Health, altitude, and safety considerations for mountain travel.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
