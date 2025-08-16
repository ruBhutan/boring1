
export const bhutanFestivals = [
  {
    id: 'paro-tsechu',
    name: 'Paro Tsechu',
    location: 'Paro Dzong',
    dates: 'March/April (10th-15th day of 2nd lunar month)',
    duration: '5 days',
    significance: 'One of the most popular festivals featuring sacred mask dances',
    highlights: [
      'Thongdroel unfurling - Giant silk painting',
      'Cham dances by monks and laypeople',
      'Local people in traditional dress',
      'Religious merit accumulation'
    ],
    description: 'The Paro Tsechu is one of Bhutan\'s most popular festivals, featuring colorful mask dances performed by monks and laypeople. The highlight is the unfurling of a giant thongdroel (religious painting) that cleanses sins by sight.',
    image: '/api/placeholder/500/300',
    bookingAvailable: true,
    touristFriendly: true,
    photographyAllowed: true
  },
  {
    id: 'thimphu-tshechu',
    name: 'Thimphu Tshechu',
    location: 'Tashichho Dzong, Thimphu',
    dates: 'September/October (8th-10th day of 8th lunar month)',
    duration: '3 days',
    significance: 'Capital city\'s grand celebration with royal participation',
    highlights: [
      'Mask dances in the dzong courtyard',
      'Royal family attendance',
      'Traditional crafts market',
      'Community celebrations'
    ],
    description: 'Celebrated in the capital, this festival draws thousands of Bhutanese from across the country. The dances are performed in the courtyard of Tashichho Dzong, with the royal family often in attendance.',
    image: '/api/placeholder/500/300',
    bookingAvailable: true,
    touristFriendly: true,
    photographyAllowed: true
  },
  {
    id: 'punakha-drubchen',
    name: 'Punakha Drubchen & Tsechu',
    location: 'Punakha Dzong',
    dates: 'February/March',
    duration: '4 days',
    significance: 'Commemorates victory over Tibetan invasion',
    highlights: [
      'Recreation of 17th-century battle',
      'Pazaps (local militia) performances',
      'Traditional war dances',
      'Historic significance'
    ],
    description: 'Unique festival that recreates the 17th-century battle when Bhutanese forces defeated Tibetan invaders. Local men dress as ancient warriors and perform war dances.',
    image: '/api/placeholder/500/300',
    bookingAvailable: true,
    touristFriendly: true,
    photographyAllowed: false
  },
  {
    id: 'bumthang-jambay',
    name: 'Jambay Lhakhang Drup',
    location: 'Jambay Lhakhang, Bumthang',
    dates: 'October/November',
    duration: '3 days',
    significance: 'Ancient temple festival with fire ceremony',
    highlights: [
      'Sacred fire ceremony',
      'Naked dance at midnight (restricted viewing)',
      'Fertility blessings',
      'Ancient religious significance'
    ],
    description: 'One of Bhutan\'s oldest festivals held at a 7th-century temple. Features unique ceremonies including a sacred fire ritual and midnight naked dance for fertility.',
    image: '/api/placeholder/500/300',
    bookingAvailable: true,
    touristFriendly: false,
    photographyAllowed: false
  },
  {
    id: 'haa-summer',
    name: 'Haa Summer Festival',
    location: 'Haa Valley',
    dates: 'July',
    duration: '2 days',
    significance: 'Showcases Haa valley culture and nomadic traditions',
    highlights: [
      'Nomadic lifestyle demonstrations',
      'Traditional games and sports',
      'Local food and beverages',
      'Highland culture celebration'
    ],
    description: 'Relatively new festival celebrating the unique culture of Haa valley, including nomadic traditions, local cuisine, and highland games.',
    image: '/api/placeholder/500/300',
    bookingAvailable: true,
    touristFriendly: true,
    photographyAllowed: true
  }
];

export const festivalCategories = [
  {
    type: 'Religious Festivals',
    description: 'Traditional Buddhist celebrations with mask dances',
    festivals: ['paro-tsechu', 'thimphu-tshechu', 'bumthang-jambay']
  },
  {
    type: 'Cultural Festivals',
    description: 'Celebrating local culture and traditions',
    festivals: ['haa-summer', 'punakha-drubchen']
  }
];

export const festivalCalendar2024 = [
  { month: 'February', festivals: ['Punakha Drubchen'] },
  { month: 'March', festivals: ['Paro Tsechu'] },
  { month: 'July', festivals: ['Haa Summer Festival'] },
  { month: 'September', festivals: ['Thimphu Tshechu'] },
  { month: 'October', festivals: ['Jambay Lhakhang Drup'] }
];
