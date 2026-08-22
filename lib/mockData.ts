import { Destination, UserTrip, CommunityPost, TravelGroup, PackingCategory } from './types';

export const SAMPLE_DESTINATIONS: Destination[] = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    tagline: 'Island of the Gods, Sacred Temples & Tropical Serenity',
    description: 'Bali enchants travelers with emerald rice terraces, spiritual sea temples, world-class surf breaks, and tranquil wellness sanctuaries nestled in volcanic highlands.',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 0.65,
    popularityScore: 97,
    rating: 4.9,
    reviewCount: 4230,
    bestTimeToVisit: 'Apr – Oct (Dry Season)',
    idealDurationDays: '7 – 10 Days',
    currency: 'IDR / USD',
    currencySymbol: '$',
    language: 'Balinese, Indonesian, English',
    timeZone: 'GMT+8 (WITA)',
    climate: 'Tropical',
    coordinates: { lat: -8.4095, lng: 115.1889 },
    weather: {
      temp: 29,
      condition: 'Tropical Sunshine',
      icon: 'Sun',
      forecast: [
        { day: 'Day 1', temp: 29, condition: 'Sunny', indoorAlternative: 'Ubud Sacred Art Gallery & Organic Spa' },
        { day: 'Day 2', temp: 28, condition: 'Sunny', indoorAlternative: 'Silver Jewelry Crafting Masterclass in Celuk' },
        { day: 'Day 3', temp: 27, condition: 'Rain', indoorAlternative: 'Traditional Balinese Cooking Academy in Sukawati' },
        { day: 'Day 4', temp: 30, condition: 'Sunny', indoorAlternative: 'Ayurvedic Sound Healing Bowl Meditation' },
        { day: 'Day 5', temp: 29, condition: 'Cloudy', indoorAlternative: 'Batik Painting Workshop at Museum Puri Lukisan' },
        { day: 'Day 6', temp: 28, condition: 'Sunny', indoorAlternative: 'Seminyak Boutique Coffee Roastery Trail' },
        { day: 'Day 7', temp: 30, condition: 'Sunny', indoorAlternative: 'Balinese Herbal Medicine (Jamu) Workshop' }
      ]
    },
    placesToVisit: [
      {
        id: 'bali-p1',
        name: 'Tanah Lot Sea Temple',
        category: 'Sacred Landmark',
        imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviews: 2190,
        openingHours: '06:00 – 19:00',
        estimatedDuration: '2.5 Hours',
        ticketPrice: 5,
        description: 'An iconic ancient offshore rock temple perched amidst crashing Indian Ocean waves and celebrated for glowing golden sunsets.',
        highlights: ['Spectacular Sunset', 'Ocean Waves', 'Holy Water Blessing'],
        coordinates: { lat: -8.6212, lng: 115.0868 }
      },
      {
        id: 'bali-p2',
        name: 'Tegallalang Rice Terraces',
        category: 'Nature & Landscape',
        imageUrl: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 3410,
        openingHours: '07:00 – 18:00',
        estimatedDuration: '3 Hours',
        ticketPrice: 4,
        description: 'UNESCO-recognized traditional Subak irrigation valley sculpted into vibrant cascading hillside rice terraces.',
        highlights: ['Subak Heritage', 'Jungle Swings', 'Sunrise Mist'],
        coordinates: { lat: -8.4334, lng: 115.2785 }
      },
      {
        id: 'bali-p3',
        name: 'Uluwatu Cliff Temple',
        category: 'Cultural Sanctuary',
        imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 2890,
        openingHours: '07:00 – 19:00',
        estimatedDuration: '2 Hours',
        ticketPrice: 6,
        description: 'Spectacular cliff-edge shrine elevated 70 meters above roaring surf, hosting the dramatic fire-lit Kecak Dance at dusk.',
        highlights: ['Kecak Fire Dance', '70m Cliff Edge', 'Ocean Horizon'],
        coordinates: { lat: -8.8291, lng: 115.0849 }
      }
    ],
    activities: [
      {
        id: 'bali-a1',
        name: 'Mount Batur Sunrise Volcanic Trek & Breakfast',
        category: 'Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 1420,
        durationMinutes: 300,
        cost: 45,
        description: 'Pre-dawn summit hike up an active volcano to witness sunrise above cloud inversions and steam cooked eggs.',
        badge: 'Top Rated Adventure',
        intensity: 'Moderate',
        includes: ['Headlamps', 'Local Mountain Guide', 'Crater Breakfast'],
        coordinates: { lat: -8.2421, lng: 115.3753 }
      },
      {
        id: 'bali-a2',
        name: 'Nusa Penida Manta Ray Snorkeling Safari',
        category: 'Nature',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 980,
        durationMinutes: 360,
        cost: 65,
        description: 'Speedboat cruise across Badung Strait to swim alongside gentle oceanic manta rays and vibrant coral reefs.',
        badge: 'Eco Certified',
        intensity: 'Moderate',
        includes: ['Speedboat Transfer', 'Snorkel Gear', 'GoPro Footage'],
        coordinates: { lat: -8.7278, lng: 115.5444 }
      },
      {
        id: 'bali-a3',
        name: 'Authentic Ubud Farm-to-Table Cooking Class',
        category: 'Food',
        imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviews: 860,
        durationMinutes: 240,
        cost: 35,
        description: 'Harvest fresh turmeric, galangal, and lemongrass directly from organic permaculture gardens before cooking 6 dishes.',
        badge: 'Culinary Master',
        intensity: 'Easy',
        includes: ['Market Tour', 'Recipe Book', '6-Course Feast'],
        coordinates: { lat: -8.5069, lng: 115.2625 }
      }
    ],
    stays: [
      {
        id: 'bali-s1',
        name: 'Mandapa, a Ritz-Carlton Reserve',
        type: 'Resorts',
        imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        rating: 4.98,
        reviews: 420,
        pricePerNight: 580,
        distanceFromCenter: '3.2 km from Ubud Palace',
        amenities: ['Private Pool', 'Ayung River Views', 'Patih Butler Service', 'Holistic Spa'],
        aiScore: 98,
        badge: 'AI Top Pick',
        description: 'Ultra-luxurious sanctuary enveloped in lush rainforest greenery along the sacred Ayung River.',
        coordinates: { lat: -8.4901, lng: 115.2443 }
      },
      {
        id: 'bali-s2',
        name: 'Bamboo Eco Sanctuary Villa',
        type: 'Villas',
        imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
        rating: 4.92,
        reviews: 310,
        pricePerNight: 210,
        distanceFromCenter: '6.5 km from Ubud Center',
        amenities: ['100% Bamboo Architecture', 'Infinity Net Bed', 'Open Air Shower', 'Breakfast Included'],
        aiScore: 95,
        badge: 'Sustainable Stay',
        description: 'Architectural marvel built entirely from curved bamboo nestled in quiet jungle canopy.',
        coordinates: { lat: -8.4485, lng: 115.2811 }
      },
      {
        id: 'bali-s3',
        name: 'The Haven Suites Canggu',
        type: 'Hotels',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        rating: 4.75,
        reviews: 690,
        pricePerNight: 135,
        distanceFromCenter: '200m from Berawa Beach',
        amenities: ['Lagoon Pool', 'Beach Access', 'Rooftop Bar', 'Fitness Club'],
        aiScore: 91,
        description: 'Chic beachfront luxury suites in the vibrant bohemian heart of Canggu.',
        coordinates: { lat: -8.6631, lng: 115.1378 }
      },
      {
        id: 'bali-s4',
        name: 'Rumah Luwih Homestay & Estate',
        type: 'Homestays',
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        rating: 4.88,
        reviews: 240,
        pricePerNight: 75,
        distanceFromCenter: '1.2 km from Gianyar Coast',
        amenities: ['Family Hospitality', 'Homemade Balinese Breakfast', 'Garden Pavilions'],
        aiScore: 93,
        badge: 'Authentic Vibe',
        description: 'Warm, hospitable traditional Balinese compound with peaceful koi ponds and home-cooked cuisine.',
        coordinates: { lat: -8.5714, lng: 115.3401 }
      },
      {
        id: 'bali-s5',
        name: 'Komodo Dragon Islands Luxury Cruise',
        type: 'Cruises',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        rating: 4.95,
        reviews: 180,
        pricePerNight: 350,
        distanceFromCenter: 'Departs Benoa Marina',
        amenities: ['Private Cabin', 'All Meals & Snorkel Gear', 'Liveaboard Phinisi Schooner'],
        aiScore: 96,
        badge: 'Bucket List',
        description: '3-Day liveaboard sailing expedition on a handcrafted wooden Phinisi yacht across Nusa & Komodo archipelago.',
        coordinates: { lat: -8.7501, lng: 115.2155 }
      }
    ],
    transportation: [
      {
        id: 'bali-t1',
        type: 'Flights',
        title: 'International Flights to Ngurah Rai (DPS)',
        provider: 'Garuda Indonesia / Singapore Airlines / Qatar',
        duration: 'Direct / 1 Stop',
        departure: 'Major Hubs Worldwide',
        arrival: 'DPS Denpasar Airport',
        price: 420,
        frequency: 'Daily 35+ Flights',
        ecoScore: 'A'
      },
      {
        id: 'bali-t2',
        type: 'Cabs',
        title: 'Private Airport Chauffeur & Daily Driver',
        provider: 'GlobeTrotter Verified Driver Network',
        duration: 'Flexible Full-Day (10h)',
        departure: 'Your Hotel Doorstep',
        arrival: 'Custom Island Itinerary',
        price: 45,
        frequency: 'On Demand 24/7'
      },
      {
        id: 'bali-t3',
        type: 'Bike Rental',
        title: 'Honda Scoopy / NMAX Scooter Rental',
        provider: 'Bali Moto Luxe & Delivery',
        duration: '24 Hours / Multi-Day',
        departure: 'Delivered to Villa',
        arrival: 'Self Drop-off Anywhere',
        price: 7,
        frequency: 'Instant Delivery'
      }
    ],
    food: [
      {
        id: 'bali-f1',
        name: 'Babi Guling Komplit (Crispy Roast Pork)',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        description: 'Spit-roasted tender pork marinated in basa gede spice paste with crackling skin, lawar salad, and steamed jasmine rice.',
        isVeg: false,
        price: 6,
        restaurant: 'Warung Babi Guling Ibu Oka 3',
        restaurantLocation: 'Jl. Tegal Sari No.2, Ubud',
        aiScore: 98,
        tags: ['Iconic Dish', 'Must Try', 'Spicy']
      },
      {
        id: 'bali-f2',
        name: 'Nasi Campur Bali with Urab & Sate Lilit',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        description: 'Fragrant turmeric rice bowl accompanied by spiced minced fish skewers, spiced coconut vegetables, and sambal matah.',
        isVeg: false,
        price: 4.5,
        restaurant: 'Warung Nasi Campur Ibu Mangku',
        restaurantLocation: 'Kedewatan, Ubud',
        aiScore: 96,
        tags: ['Local Favorite', 'Chef Recommended']
      },
      {
        id: 'bali-f3',
        name: 'Organic Gado Gado with Creamy Peanut Dressing',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
        description: 'Steamed organic greens, crispy tempeh, tofu, and boiled farm eggs drizzled in rich stone-ground cashew peanut sauce.',
        isVeg: true,
        price: 4,
        restaurant: 'Moksa Plant-Based Kitchen',
        restaurantLocation: 'Sayan, Ubud',
        aiScore: 97,
        tags: ['Vegetarian', 'Gluten-Free', 'Healthy']
      }
    ],
    hiddenGems: [
      {
        id: 'bali-h1',
        name: 'Tukad Cepung Secret Cave Waterfall',
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
        description: 'Sunbeams stream through an open rock canyon ceiling onto a mystical waterfall hidden deep inside a subterranean cave.',
        crowdLevel: 'Low',
        estimatedCost: 3,
        bestTime: '09:00 – 11:30 AM (for God rays)',
        localSecretTip: 'Wear water shoes and arrive when sunlight angles through the cavern roof.',
        coordinates: { lat: -8.4411, lng: 115.3854 }
      },
      {
        id: 'bali-h2',
        name: 'Sidemen Valley Emerald Terraces',
        imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
        description: 'Unspoiled serene countryside beneath Mount Agung offering quiet village walks with zero tourist crowds.',
        crowdLevel: 'Very Low',
        estimatedCost: 0,
        bestTime: 'Early Morning 06:30',
        localSecretTip: 'Rent a scooter to explore the scenic suspension bridges and traditional weaving workshops.',
        coordinates: { lat: -8.4892, lng: 115.4412 }
      }
    ],
    guides: [
      {
        id: 'bali-g1',
        name: 'Wayan Sudarma',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['English', 'Balinese', 'Indonesian', 'Japanese'],
        rating: 4.98,
        reviewsCount: 312,
        experienceYears: 12,
        specialty: 'Sacred Temples, Subak Water Heritage & Highland Trekking',
        dailyRate: 40,
        bio: 'Born in Ubud to a family of temple artisans, Wayan brings deep cultural insights, humor, and hidden photo spots.',
        contactEmail: 'wayan.sudarma@globetrotter.ai'
      },
      {
        id: 'bali-g2',
        name: 'Ketut Arimbi',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['English', 'French', 'Indonesian'],
        rating: 4.95,
        reviewsCount: 198,
        experienceYears: 8,
        specialty: 'Culinary Trails, Organic Farming & Coral Conservation',
        dailyRate: 45,
        bio: 'Passionate marine conservationist and culinary educator who curates immersive community-based travel experiences.',
        contactEmail: 'ketut.arimbi@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '110',
        ambulance: '118 / 112',
        fire: '113',
        touristPolice: '+62 361 754590'
      },
      nearbyHospitals: [
        { name: 'BIMC Hospital Nusa Dua & Kuta', distance: '12 km', phone: '+62 361 3000911', rating: 4.9 },
        { name: 'Kasih Ibu General Hospital Saba', distance: '18 km', phone: '+62 361 3003030', rating: 4.8 }
      ],
      nearbyPoliceStations: [
        { name: 'Polsek Ubud Police Station', distance: '1.5 km', phone: '+62 361 975316' },
        { name: 'Polda Bali Denpasar HQ', distance: '22 km', phone: '+62 361 225110' }
      ],
      embassies: [
        { country: 'United States Consular Agency', address: 'Jl. Hayam Wuruk No.310, Denpasar', phone: '+62 361 233605' },
        { country: 'Australian Consulate-General', address: 'Jl. Tantular No.32, Renon, Denpasar', phone: '+62 361 2000100' }
      ],
      safetyTips: [
        'Drink filtered or bottled water only; avoid tap water.',
        'Always wear certified helmets while riding scooters.',
        'Dress respectfully with sarong when visiting temple sanctuaries.'
      ]
    }
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    tagline: 'The City of Light, Haute Couture & World-Class Gastronomy',
    description: 'Paris captivates with grand Haussmannian boulevards, iconic monuments, world-renowned museums, sidewalk cafés, and the timeless romance of the Seine.',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520939817895-060bdef4dc1b?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 1.45,
    popularityScore: 98,
    rating: 4.9,
    reviewCount: 5890,
    bestTimeToVisit: 'Apr – Jun & Sep – Nov',
    idealDurationDays: '5 – 7 Days',
    currency: 'EUR (€)',
    currencySymbol: '€',
    language: 'French, English',
    timeZone: 'GMT+1 (CET)',
    climate: 'Temperate',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    weather: {
      temp: 19,
      condition: 'Partly Sunny',
      icon: 'CloudSun',
      forecast: [
        { day: 'Day 1', temp: 20, condition: 'Sunny', indoorAlternative: 'Louvre Grand Masterpieces VIP Guided Walk' },
        { day: 'Day 2', temp: 18, condition: 'Rain', indoorAlternative: 'Musée d’Orsay Impressionist Wing & Covered Passages' },
        { day: 'Day 3', temp: 19, condition: 'Cloudy', indoorAlternative: 'Artisanal Macaron & Croissant Workshop in Le Marais' },
        { day: 'Day 4', temp: 21, condition: 'Sunny', indoorAlternative: 'Opera Garnier Historical Architecture Private Tour' },
        { day: 'Day 5', temp: 22, condition: 'Sunny', indoorAlternative: 'Centre Pompidou Modern Art & Panorama Lounge' }
      ]
    },
    placesToVisit: [
      {
        id: 'paris-p1',
        name: 'Eiffel Tower & Champ de Mars',
        category: 'Iconic Monument',
        imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 7800,
        openingHours: '09:00 – 23:45',
        estimatedDuration: '2.5 Hours',
        ticketPrice: 28,
        description: 'Gustave Eiffel’s wrought-iron triumph standing 330m high with sparkling light spectacles every evening on the hour.',
        highlights: ['Summit Panorama', 'Champagne Bar', 'Night Sparkle'],
        coordinates: { lat: 48.8584, lng: 2.2945 }
      },
      {
        id: 'paris-p2',
        name: 'Musée du Louvre & Pyramid',
        category: 'Art & Heritage',
        imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 9200,
        openingHours: '09:00 – 18:00 (Wed/Fri til 21:45)',
        estimatedDuration: '4 Hours',
        ticketPrice: 22,
        description: 'World’s largest museum housing over 35,000 priceless treasures including the Mona Lisa, Venus de Milo, and Winged Victory.',
        highlights: ['Mona Lisa', 'Glass Pyramid', 'Napoleon Apartments'],
        coordinates: { lat: 48.8606, lng: 2.3376 }
      },
      {
        id: 'paris-p3',
        name: 'Montmartre & Sacré-Cœur Basilica',
        category: 'Historic District',
        imageUrl: 'https://images.unsplash.com/photo-1520939817895-060bdef4dc1b?auto=format&fit=crop&w=800&q=80',
        rating: 4.85,
        reviews: 4300,
        openingHours: '06:00 – 22:30',
        estimatedDuration: '3 Hours',
        ticketPrice: 0,
        description: 'Bohemian hilltop artists village with winding cobblestone streets, Place du Tertre portrait painters, and skyline views.',
        highlights: ['Dome Vista', 'Artist Square', 'Cobblestone Alleys'],
        coordinates: { lat: 48.8867, lng: 2.3431 }
      }
    ],
    activities: [
      {
        id: 'paris-a1',
        name: 'Seine River Sunset Gourmet Dinner Cruise',
        category: 'Food',
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 1890,
        durationMinutes: 150,
        cost: 95,
        description: 'Glide past illuminated bridges and Gothic landmarks while savoring a 4-course French culinary menu with Champagne.',
        badge: 'Top Romantic Experience',
        intensity: 'Easy',
        includes: ['Glass Canopy Boat', '4-Course Meal', 'Sommelier Wine'],
        coordinates: { lat: 48.8595, lng: 2.2981 }
      },
      {
        id: 'paris-a2',
        name: 'Le Marais Culinary & Secret Pastry Walking Tour',
        category: 'Culture',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        rating: 4.95,
        reviews: 740,
        durationMinutes: 180,
        cost: 75,
        description: 'Taste artisanal cheeses, cured meats, fresh baguettes, éclairs, and chocolates in historic aristocratic courtyards.',
        badge: 'Foodie Favorite',
        intensity: 'Easy',
        includes: ['8 Tasting Stops', 'Expert Gastronome', 'Wine Pairing'],
        coordinates: { lat: 48.8575, lng: 2.3622 }
      }
    ],
    stays: [
      {
        id: 'paris-s1',
        name: 'Four Seasons Hotel George V',
        type: 'Hotels',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        rating: 4.99,
        reviews: 620,
        pricePerNight: 1250,
        distanceFromCenter: '400m from Champs-Élysées',
        amenities: ['Three Michelin Star Restaurants', 'Art Deco Courtyard', 'World Class Spa', 'Eiffel Views'],
        aiScore: 99,
        badge: 'Palace Distinction',
        description: 'An iconic Art Deco landmark with Michelin-starred dining, legendary floral arrangements, and Parisian luxury.',
        coordinates: { lat: 48.8687, lng: 2.3009 }
      },
      {
        id: 'paris-s2',
        name: 'Hôtel Le Marais Chic Boutique',
        type: 'Hotels',
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        rating: 4.88,
        reviews: 430,
        pricePerNight: 280,
        distanceFromCenter: 'In the heart of Le Marais',
        amenities: ['Designer Interiors', 'Espresso Bar', 'Courtyard Garden', 'Complimentary Bikes'],
        aiScore: 94,
        badge: 'Great Value Luxury',
        description: 'Trendy design-forward haven steps away from art galleries, fashion boutiques, and gourmet bistros.',
        coordinates: { lat: 48.8588, lng: 2.3582 }
      },
      {
        id: 'paris-s3',
        name: 'Haussmannian Luxury Penthouse with Balcony',
        type: 'Villas',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        rating: 4.92,
        reviews: 140,
        pricePerNight: 490,
        distanceFromCenter: '800m from Place Vendôme',
        amenities: ['Full Chef Kitchen', 'Wrought-Iron Balconies', 'Air Conditioning', 'Elevator'],
        aiScore: 96,
        badge: 'Exclusive Apartment',
        description: 'High-ceilinged Parisian residence with herringbone parquet floors, marble fireplaces, and rooftop vistas.',
        coordinates: { lat: 48.8672, lng: 2.3315 }
      }
    ],
    transportation: [
      {
        id: 'paris-t1',
        type: 'Flights',
        title: 'International Arrivals at Paris Charles de Gaulle (CDG) / Orly (ORY)',
        provider: 'Air France / Delta / British Airways / Emirates',
        duration: 'Direct Connections',
        departure: 'Worldwide Airports',
        arrival: 'CDG Airport Terminal 2',
        price: 380,
        frequency: 'Hourly Flights',
        ecoScore: 'A'
      },
      {
        id: 'paris-t2',
        type: 'Trains',
        title: 'TGV High-Speed Eurostar & Thalys Rail',
        provider: 'SNCF / Eurostar',
        duration: '2h 15m (from London) / 3h 10m (from Amsterdam)',
        departure: 'Gare du Nord / Gare de Lyon',
        arrival: 'City Center Hubs',
        price: 65,
        frequency: 'Every 30 Minutes',
        ecoScore: 'A+'
      },
      {
        id: 'paris-t3',
        type: 'Metro',
        title: 'Paris Metro & RER Unlimited Pass (Navigo Easy)',
        provider: 'RATP Paris Public Transit',
        duration: 'Instant citywide access',
        departure: '300+ Metro Stations',
        arrival: 'Every neighborhood',
        price: 18,
        frequency: 'Every 2 – 4 Minutes'
      }
    ],
    food: [
      {
        id: 'paris-f1',
        name: 'Boeuf Bourguignon with Buttered Tagliatelle',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Slow-braised Charolais beef in rich red Burgundy wine with pearl onions, smoked lardons, and wild chanterelles.',
        isVeg: false,
        price: 24,
        restaurant: 'Bistrot Paul Bert',
        restaurantLocation: '18 Rue Paul Bert, 75011 Paris',
        aiScore: 99,
        tags: ['Classic French', 'Michelin Guide Bib Gourmand']
      },
      {
        id: 'paris-f2',
        name: 'Artisanal Croissant au Beurre & Cafe Crème',
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
        description: 'Golden flaky multi-layered pastry made with AOP Charentes-Poitou butter, baked fresh every morning at dawn.',
        isVeg: true,
        price: 3.5,
        restaurant: 'Du Pain et des Idées',
        restaurantLocation: '34 Rue Yves Toudic, 75010 Paris',
        aiScore: 98,
        tags: ['Breakfast Staple', 'Award-Winning']
      }
    ],
    hiddenGems: [
      {
        id: 'paris-h1',
        name: 'Passage des Panoramas (Covered Arcade of 1799)',
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
        description: 'Oldest glass-roofed arcade in Paris filled with vintage stamp merchants, antique bookstalls, and cozy wine bistros.',
        crowdLevel: 'Low',
        estimatedCost: 0,
        bestTime: 'Late Afternoon 16:30',
        localSecretTip: 'Perfect rainy-day walk; stop at Racines for natural wines and handmade pasta.',
        coordinates: { lat: 48.8711, lng: 2.3422 }
      }
    ],
    guides: [
      {
        id: 'paris-g1',
        name: 'Camille Laurent',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['French', 'English', 'Spanish'],
        rating: 4.99,
        reviewsCount: 410,
        experienceYears: 10,
        specialty: 'Louvre Art Historian, Haute Couture & Literary Paris',
        dailyRate: 110,
        bio: 'Sorbonne graduate in Art History who skips the standard tourist scripts to reveal hidden Renaissance secrets.',
        contactEmail: 'camille.laurent@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '17',
        ambulance: '15 / 112 (European Emergency)',
        fire: '18',
        touristPolice: '+33 1 53 71 53 71'
      },
      nearbyHospitals: [
        { name: 'Hôpital Hôtel-Dieu de Paris', distance: '1.2 km', phone: '+33 1 42 34 82 34', rating: 4.8 },
        { name: 'American Hospital of Paris', distance: '6.5 km', phone: '+33 1 46 41 25 25', rating: 4.9 }
      ],
      nearbyPoliceStations: [
        { name: 'Commissariat Central du 1er Arrondissement', distance: '0.8 km', phone: '+33 1 44 76 79 00' }
      ],
      embassies: [
        { country: 'Embassy of the United States', address: '2 Avenue Gabriel, 75008 Paris', phone: '+33 1 43 12 22 22' },
        { country: 'British Embassy Paris', address: '35 Rue du Faubourg Saint-Honoré, 75008', phone: '+33 1 44 51 31 00' }
      ],
      safetyTips: [
        'Watch your pockets and bags in crowded metro stations like Châtelet and Gare du Nord.',
        'Ignore petition scammers around the Eiffel Tower and Sacré-Cœur.'
      ]
    }
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    tagline: 'Futuristic Metropolises, Ancient Shrines & Culinary Perfection',
    description: 'Tokyo seamlessly fuses hyper-modern neon skyline spectacles, high-speed bullet trains, Michelin-starred culinary precision, and tranquil centuries-old Shinto gardens.',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 1.35,
    popularityScore: 99,
    rating: 4.95,
    reviewCount: 6840,
    bestTimeToVisit: 'Mar – May (Cherry Blossom) & Oct – Nov (Autumn Foliage)',
    idealDurationDays: '6 – 8 Days',
    currency: 'JPY (¥)',
    currencySymbol: '¥',
    language: 'Japanese, English',
    timeZone: 'GMT+9 (JST)',
    climate: 'Temperate',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    weather: {
      temp: 21,
      condition: 'Clear Blue Skies',
      icon: 'Sun',
      forecast: [
        { day: 'Day 1', temp: 21, condition: 'Sunny', indoorAlternative: 'TeamLab Planets Digital Art Museum Immersion' },
        { day: 'Day 2', temp: 20, condition: 'Sunny', indoorAlternative: 'Akihabara Tech & Arcade Gaming Mega Complexes' },
        { day: 'Day 3', temp: 18, condition: 'Rain', indoorAlternative: 'Tsukiji Indoor Knife & Culinary Master Workshop' },
        { day: 'Day 4', temp: 22, condition: 'Sunny', indoorAlternative: 'Roppongi Mori Art Museum & Sky Deck Observatory' },
        { day: 'Day 5', temp: 23, condition: 'Cloudy', indoorAlternative: 'Ginza Six Luxury Indoor Architecture & Tea Pavilion' }
      ]
    },
    placesToVisit: [
      {
        id: 'tokyo-p1',
        name: 'Senso-ji Temple & Nakamise Dori',
        category: 'Ancient Shinto & Buddhist Heritage',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 5800,
        openingHours: '06:00 – 17:00 (Grounds 24/7)',
        estimatedDuration: '2.5 Hours',
        ticketPrice: 0,
        description: 'Tokyo’s oldest and most revered Buddhist temple featuring the giant red Kaminarimon Thunder Gate and incense cauldrons.',
        highlights: ['Kaminarimon Giant Lantern', 'Incense Purification', 'Historic Street Snacks'],
        coordinates: { lat: 35.7148, lng: 139.7967 }
      },
      {
        id: 'tokyo-p2',
        name: 'Shibuya Crossing & Shibuya Sky 360',
        category: 'Urban Landmark',
        imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
        rating: 4.92,
        reviews: 6900,
        openingHours: '10:00 – 22:30',
        estimatedDuration: '2 Hours',
        ticketPrice: 16,
        description: 'The world’s busiest pedestrian scramble viewed from a breathtaking 229m open-air rooftop observatory with glass corners.',
        highlights: ['360° Open Air Rooftop', 'Pedestrian Scramble View', 'Sunset DJ Lounge'],
        coordinates: { lat: 35.6580, lng: 139.7016 }
      }
    ],
    activities: [
      {
        id: 'tokyo-a1',
        name: 'TeamLab Planets Immersive Digital Art Journey',
        category: 'Culture',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        rating: 4.96,
        reviews: 3200,
        durationMinutes: 120,
        cost: 38,
        description: 'Wade barefoot through knee-deep water reflecting holographic koi fish and wander through an endless crystal light universe.',
        badge: 'World Famous',
        intensity: 'Easy',
        includes: ['Fast Track Entry', 'Locker Access', 'Flower Dome Exhibit'],
        coordinates: { lat: 35.6515, lng: 139.7932 }
      },
      {
        id: 'tokyo-a2',
        name: 'Tsukiji Outer Market Sushi & Wagyu Food Tour',
        category: 'Food',
        imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
        rating: 4.95,
        reviews: 1450,
        durationMinutes: 180,
        cost: 60,
        description: 'Taste melt-in-the-mouth Otoro tuna, flame-torched A5 Wagyu beef skewers, tamagoyaki omelets, and fresh sea urchin.',
        badge: 'Top Foodie Tour',
        intensity: 'Easy',
        includes: ['7 Food Tastings', 'Sake Tasting', 'Certified Local Food Guide'],
        coordinates: { lat: 35.6655, lng: 139.7708 }
      }
    ],
    stays: [
      {
        id: 'tokyo-s1',
        name: 'Park Hyatt Tokyo (Shinjuku)',
        type: 'Hotels',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        rating: 4.96,
        reviews: 580,
        pricePerNight: 680,
        distanceFromCenter: 'Towering above Shinjuku Central Park',
        amenities: ['New York Bar with Jazz', 'Sky Pool on 47th Floor', 'Mount Fuji Views', 'Club On The Park Spa'],
        aiScore: 98,
        badge: 'Iconic Luxury',
        description: 'Legendary 5-star sanctuary occupying top floors of Shinjuku Park Tower with panoramic views across Mount Fuji and Tokyo.',
        coordinates: { lat: 35.6852, lng: 139.6912 }
      },
      {
        id: 'tokyo-s2',
        name: 'Hoshinoya Tokyo Traditional Ryokan in Otemachi',
        type: 'Resorts',
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        rating: 4.97,
        reviews: 290,
        pricePerNight: 850,
        distanceFromCenter: 'Next to Tokyo Imperial Palace Gardens',
        amenities: ['Rooftop Geothermal Onsen', 'Tatami Flooring Throughout', 'Kaiseki Dining', 'Kimono Tea Ceremonies'],
        aiScore: 99,
        badge: 'Traditional Excellence',
        description: 'A 17-story urban ryokan offering natural hot spring onsen drawn from 1,500 meters underground right in central Tokyo.',
        coordinates: { lat: 35.6875, lng: 139.7655 }
      }
    ],
    transportation: [
      {
        id: 'tokyo-t1',
        type: 'Trains',
        title: 'Shinkansen Bullet Train & JR Rail Pass',
        provider: 'JR Central / JR East',
        duration: 'Tokyo to Kyoto in 2h 15m at 320 km/h',
        departure: 'Tokyo Station / Shinagawa',
        arrival: 'All Major Japanese Cities',
        price: 95,
        frequency: 'Every 5 Minutes',
        ecoScore: 'A+'
      },
      {
        id: 'tokyo-t2',
        type: 'Metro',
        title: 'Tokyo Subway 72-Hour Unlimited Tourist Pass',
        provider: 'Tokyo Metro & Toei Subway',
        duration: 'Unlimited Travel across 13 lines & 285 stations',
        departure: 'Any Tokyo Metro Station',
        arrival: 'Any Destination',
        price: 12,
        frequency: 'Every 2 Minutes'
      }
    ],
    food: [
      {
        id: 'tokyo-f1',
        name: 'Omakase Edomae Sushi (12 Pieces)',
        imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
        description: 'Chef-selected seasonal fish brushed with aged soy nikiri sauce over warm red-vinegar shari rice.',
        isVeg: false,
        price: 75,
        restaurant: 'Sushi Shin Ginza',
        restaurantLocation: 'Ginza 6-Chome, Chuo City, Tokyo',
        aiScore: 99,
        tags: ['Michelin Star', 'Masterpiece']
      },
      {
        id: 'tokyo-f2',
        name: 'Rich Tonkotsu Ramen with Chashu & Nitamago Egg',
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
        description: '20-hour simmered creamy pork bone broth with springy handmade noodles, tender torched chashu, and ajitsuke tamago.',
        isVeg: false,
        price: 9,
        restaurant: 'Ichiran Ramen Shibuya',
        restaurantLocation: '1 Chome-22-7 Jinnan, Shibuya City',
        aiScore: 97,
        tags: ['Must Try', 'Comfort Food']
      }
    ],
    hiddenGems: [
      {
        id: 'tokyo-h1',
        name: 'Yanaka Ginza (Shitamachi Old Tokyo)',
        imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        description: 'A nostalgic post-war neighborhood with wooden homes, retro sweet shops, resident street cats, and peaceful temple courtyards.',
        crowdLevel: 'Low',
        estimatedCost: 0,
        bestTime: 'Afternoon 15:00',
        localSecretTip: 'Watch the sunset over Yuyake Dandan stairs while snacking on fresh minced meat menchi katsu.',
        coordinates: { lat: 35.7275, lng: 139.7689 }
      }
    ],
    guides: [
      {
        id: 'tokyo-g1',
        name: 'Kenji Takahashi',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['Japanese', 'English', 'Mandarin'],
        rating: 4.99,
        reviewsCount: 520,
        experienceYears: 14,
        specialty: 'Hidden Izakayas, Otaku Subculture & Tokyo Architecture',
        dailyRate: 95,
        bio: 'Former Tokyo urban planner turned guide who knows every secret alleyway in Shinjuku, Ginza, and Yanaka.',
        contactEmail: 'kenji.takahashi@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '110',
        ambulance: '119',
        fire: '119',
        touristPolice: '+81 3 3501 0110'
      },
      nearbyHospitals: [
        { name: 'St. Luke’s International Hospital (English speaking)', distance: '2.1 km', phone: '+81 3 3541 5151', rating: 4.95 },
        { name: 'Tokyo University Hospital', distance: '3.8 km', phone: '+81 3 3815 5411', rating: 4.9 }
      ],
      nearbyPoliceStations: [
        { name: 'Shibuya Koban (Police Box)', distance: '0.2 km', phone: '+81 3 3444 0110' }
      ],
      embassies: [
        { country: 'Embassy of the United States', address: '1-10-5 Akasaka, Minato-ku, Tokyo', phone: '+81 3 3224 5000' }
      ],
      safetyTips: [
        'Tokyo is one of the safest metropolises in the world with virtually non-existent violent crime.',
        'Keep small cash (coins/¥1,000 notes) or a Suica/Pasmo IC card for coin lockers, vending machines, and local shrines.'
      ]
    }
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    tagline: 'Futuristic Skylines, Arabian Luxury & Desert Thrills',
    description: 'An ultra-modern desert oasis of architectural superlatives, opulent luxury resorts, grand shopping malls, and golden dune adventures.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 1.5,
    popularityScore: 96,
    rating: 4.88,
    reviewCount: 3910,
    bestTimeToVisit: 'Nov – Mar (Cooler Months)',
    idealDurationDays: '4 – 6 Days',
    currency: 'AED (Dirham)',
    currencySymbol: 'AED',
    language: 'Arabic, English',
    timeZone: 'GMT+4 (GST)',
    climate: 'Desert',
    coordinates: { lat: 25.2048, lng: 55.2708 },
    weather: {
      temp: 32,
      condition: 'Warm Sunshine',
      icon: 'Sun',
      forecast: [
        { day: 'Day 1', temp: 32, condition: 'Sunny', indoorAlternative: 'Burj Khalifa At The Top 148th Sky Lounge' },
        { day: 'Day 2', temp: 33, condition: 'Sunny', indoorAlternative: 'Dubai Mall Aquarium & Underwater Zoo' },
        { day: 'Day 3', temp: 31, condition: 'Sunny', indoorAlternative: 'Museum of the Future Interactive AI Pavilion' }
      ]
    },
    placesToVisit: [
      {
        id: 'dubai-p1',
        name: 'Burj Khalifa (124th & 148th Sky Deck)',
        category: 'Record-Breaking Architecture',
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        rating: 4.95,
        reviews: 8200,
        openingHours: '08:30 – 23:00',
        estimatedDuration: '2.5 Hours',
        ticketPrice: 48,
        description: 'World’s tallest building at 828 meters featuring double-decker elevators rocketing at 10 meters per second.',
        highlights: ['828m World Record', 'Fountain Show View', 'Sky Lounge'],
        coordinates: { lat: 25.1972, lng: 55.2744 }
      }
    ],
    activities: [
      {
        id: 'dubai-a1',
        name: 'Red Dunes Desert 4x4 Safari, Camel Ride & BBQ Gala',
        category: 'Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
        rating: 4.92,
        reviews: 2100,
        durationMinutes: 360,
        cost: 65,
        description: 'Adrenaline-packed 4WD dune bashing across high red sand dunes followed by sandboarding, camel rides, and starry BBQ feast.',
        badge: 'Best Seller',
        intensity: 'Moderate',
        includes: ['4x4 Land Cruiser', 'Sandboarding', 'Tanoura Fire Show', 'Buffet Dinner'],
        coordinates: { lat: 24.8607, lng: 55.6702 }
      }
    ],
    stays: [
      {
        id: 'dubai-s1',
        name: 'Burj Al Arab Jumeirah',
        type: 'Hotels',
        imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
        rating: 4.98,
        reviews: 750,
        pricePerNight: 1450,
        distanceFromCenter: 'On its own private island at Jumeirah Beach',
        amenities: ['24-Karat Gold Leaf Interiors', 'Rolls-Royce Chauffeur Fleet', 'Talise Spa', 'Private Beach Club'],
        aiScore: 99,
        badge: 'Iconic 7-Star Luxury',
        description: 'World’s only self-proclaimed 7-star sail-shaped hotel offering duplex suites with 24-hour private butlers.',
        coordinates: { lat: 25.1412, lng: 55.1852 }
      }
    ],
    transportation: [
      {
        id: 'dubai-t1',
        type: 'Metro',
        title: 'Dubai Driverless Metro (Red & Green Lines)',
        provider: 'RTA Dubai',
        duration: 'Direct connections between Airport, Downtown, Marina',
        departure: 'Airport Terminal 1 & 3',
        arrival: 'Downtown / Marina',
        price: 3,
        frequency: 'Every 3 Minutes'
      }
    ],
    food: [
      {
        id: 'dubai-f1',
        name: 'Authentic Emirati Machboos with Saffron Rice',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Spiced aromatic basmati rice cooked with tender lamb, dried black lime (loomi), cardamom, and toasted pine nuts.',
        isVeg: false,
        price: 22,
        restaurant: 'Al Fanar Restaurant & Cafe',
        restaurantLocation: 'Dubai Festival City Mall',
        aiScore: 97,
        tags: ['Traditional Emirati', 'Must Try']
      }
    ],
    hiddenGems: [
      {
        id: 'dubai-h1',
        name: 'Al Fahidi Historical Neighborhood & Coffee Museum',
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        description: 'Traditional 19th-century wind-tower architecture quarter alongside Dubai Creek with hidden art courtyards.',
        crowdLevel: 'Low',
        estimatedCost: 2,
        bestTime: 'Morning 09:30',
        localSecretTip: 'Cross the Creek on a traditional wooden Abra boat for just 1 AED ($0.27).',
        coordinates: { lat: 25.2631, lng: 55.2972 }
      }
    ],
    guides: [
      {
        id: 'dubai-g1',
        name: 'Tariq Al Mansoori',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['Arabic', 'English'],
        rating: 4.97,
        reviewsCount: 280,
        experienceYears: 9,
        specialty: 'Bedouin Heritage, Desert Stargazing & Modern Architecture',
        dailyRate: 90,
        bio: 'Emirati cultural ambassador passionate about sharing authentic stories of Dubai’s transformation from pearling village to metropolis.',
        contactEmail: 'tariq.mansoori@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '999',
        ambulance: '998',
        fire: '997',
        touristPolice: '901 / 800 4888'
      },
      nearbyHospitals: [
        { name: 'Rashid Hospital & Trauma Center', distance: '3.4 km', phone: '+971 4 219 2000', rating: 4.85 },
        { name: 'American Hospital Dubai', distance: '4.1 km', phone: '+971 4 377 5500', rating: 4.9 }
      ],
      nearbyPoliceStations: [
        { name: 'Al Muraqqabat Police Station', distance: '1.8 km', phone: '+971 4 609 5555' }
      ],
      embassies: [
        { country: 'US Consulate General Dubai', address: 'Al Seef St, Bur Dubai', phone: '+971 4 309 4000' }
      ],
      safetyTips: [
        'Dubai has strict laws against jaywalking and public intoxication.',
        'Carry hydration during daytime desert excursions.'
      ]
    }
  },
  {
    id: 'switzerland',
    name: 'Switzerland (Interlaken & Alps)',
    country: 'Switzerland',
    region: 'Europe',
    tagline: 'Snow-Capped Alpine Peaks, Crystal Lakes & Scenic Rail',
    description: 'Pristine emerald lakes, dramatic mountain peaks like the Matterhorn and Jungfrau, storybook chalets, and the world’s most scenic panoramic railways.',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 1.85,
    popularityScore: 97,
    rating: 4.96,
    reviewCount: 4720,
    bestTimeToVisit: 'Jun – Sep (Hiking) / Dec – Mar (Skiing)',
    idealDurationDays: '6 – 8 Days',
    currency: 'CHF (Swiss Franc)',
    currencySymbol: 'CHF',
    language: 'German, French, English',
    timeZone: 'GMT+1 (CET)',
    climate: 'Alpine',
    coordinates: { lat: 46.6863, lng: 7.8632 },
    weather: {
      temp: 14,
      condition: 'Crisp Mountain Breeze',
      icon: 'CloudSun',
      forecast: [
        { day: 'Day 1', temp: 15, condition: 'Sunny', indoorAlternative: 'Swiss Alpine Chocolate & Cheese Fondue Atelier' },
        { day: 'Day 2', temp: 13, condition: 'Sunny', indoorAlternative: 'St. Beatus Subterranean Caves & Waterfalls' },
        { day: 'Day 3', temp: 11, condition: 'Snow', indoorAlternative: 'Jungfraujoch Alpine Ice Palace & Sphinx Observatory' }
      ]
    },
    placesToVisit: [
      {
        id: 'swiss-p1',
        name: 'Jungfraujoch – Top of Europe (3,454m)',
        category: 'Alpine High-Altitude Wonder',
        imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
        rating: 4.96,
        reviews: 5100,
        openingHours: '08:00 – 16:30',
        estimatedDuration: '5 Hours',
        ticketPrice: 165,
        description: 'Cogwheel train journey boring through the Eiger mountain to Europe’s highest railway station perched on the Aletsch Glacier.',
        highlights: ['Aletsch Glacier', 'Ice Palace Carvings', 'Sphinx 360° Terrace'],
        coordinates: { lat: 46.5475, lng: 7.9825 }
      }
    ],
    activities: [
      {
        id: 'swiss-a1',
        name: 'Tandem Paragliding Over Interlaken & Lake Brienz',
        category: 'Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        rating: 4.98,
        reviews: 1800,
        durationMinutes: 90,
        cost: 180,
        description: 'Launch off Beatenberg mountain and glide 800 meters down into Höhematte park with panoramic views of the Eiger, Mönch, and Jungfrau.',
        badge: 'Bucket List Thrill',
        intensity: 'Moderate',
        includes: ['Certified Tandem Pilot', 'Full Flight Gear', 'Hotel Pickup'],
        coordinates: { lat: 46.6872, lng: 7.8591 }
      }
    ],
    stays: [
      {
        id: 'swiss-s1',
        name: 'Victoria-Jungfrau Grand Hotel & Spa',
        type: 'Hotels',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        rating: 4.97,
        reviews: 480,
        pricePerNight: 720,
        distanceFromCenter: 'Facing the Höhematte Meadow, Interlaken',
        amenities: ['5500 sqm Nescens Spa', 'Private Balcony Mountain Views', 'Fine Dining Gourmet Salons'],
        aiScore: 98,
        badge: 'Legendary Palace',
        description: 'Historic Belle Époque luxury resort in operation since 1865 offering unobstructed views of snowcapped Jungfrau.',
        coordinates: { lat: 46.6865, lng: 7.8572 }
      }
    ],
    transportation: [
      {
        id: 'swiss-t1',
        type: 'Trains',
        title: 'Glacier Express & Swiss Travel Pass',
        provider: 'SBB Swiss Federal Railways',
        duration: 'Unlimited panoramic train, bus, and boat rides across Switzerland',
        departure: 'Zürich / Geneva / Interlaken',
        arrival: 'Any Mountain Valley',
        price: 240,
        frequency: 'Every 30 – 60 Minutes',
        ecoScore: 'A+'
      }
    ],
    food: [
      {
        id: 'swiss-f1',
        name: 'Authentic Swiss Gruyère & Emmental Cheese Fondue',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Bubbling pot of aged Swiss Alpine cheeses melted with white Fendant wine and kirsch, served with crusty sourdough bread cubes.',
        isVeg: true,
        price: 28,
        restaurant: 'Restaurant Taverne at Hotel Interlaken',
        restaurantLocation: 'Postgasse 11, 3800 Interlaken',
        aiScore: 99,
        tags: ['Swiss Specialty', 'Must Try']
      }
    ],
    hiddenGems: [
      {
        id: 'swiss-h1',
        name: 'Lauterbrunnen 72 Waterfalls Valley Walk',
        imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
        description: 'A magical valley flanked by sheer 300m vertical limestone cliffs with roaring waterfalls cascading directly down into lush green meadows.',
        crowdLevel: 'Low',
        estimatedCost: 0,
        bestTime: 'Morning 08:30',
        localSecretTip: 'Walk past Staubbach Falls toward Trümmelbach glacier falls inside the mountain.',
        coordinates: { lat: 46.5935, lng: 7.9091 }
      }
    ],
    guides: [
      {
        id: 'swiss-g1',
        name: 'Beat Zurbrugg',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['German', 'English', 'French'],
        rating: 4.99,
        reviewsCount: 390,
        experienceYears: 16,
        specialty: 'UIAGM Certified Mountain Guide & Alpine Glacier Hiking',
        dailyRate: 150,
        bio: 'Lifelong Bernese Oberland mountaineer dedicated to leading safe, exhilarating alpine treks through untouched glaciers.',
        contactEmail: 'beat.zurbrugg@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '117',
        ambulance: '144',
        fire: '118',
        touristPolice: '1414 (REGA Mountain Air Rescue)'
      },
      nearbyHospitals: [
        { name: 'Spital Interlaken (General Hospital)', distance: '1.5 km', phone: '+41 33 826 26 26', rating: 4.9 }
      ],
      nearbyPoliceStations: [
        { name: 'Kantonspolizei Bern Interlaken Station', distance: '0.6 km', phone: '+41 33 828 60 11' }
      ],
      embassies: [
        { country: 'Embassy of the United States', address: 'Sulgeneckstrasse 19, 3007 Bern', phone: '+41 31 357 70 11' }
      ],
      safetyTips: [
        'Check daily avalanche and mountain weather advisories before starting alpine hikes.',
        'Carry a warm windproof layer even during sunny summer hikes as mountain temperatures drop rapidly.'
      ]
    }
  },
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    region: 'South Asia',
    tagline: 'Sun-Kissed Beaches, Portuguese Heritage & Bohemian Spirit',
    description: 'Golden palm-fringed coastlines, UNESCO Latin quarters, fragrant spice plantations, fresh seafood curries, and pulsating seaside night markets.',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 0.55,
    popularityScore: 94,
    rating: 4.85,
    reviewCount: 3120,
    bestTimeToVisit: 'Nov – Mar',
    idealDurationDays: '4 – 6 Days',
    currency: 'INR (₹)',
    currencySymbol: '₹',
    language: 'Konkani, Hindi, English',
    timeZone: 'GMT+5:30 (IST)',
    climate: 'Coastal',
    coordinates: { lat: 15.2993, lng: 74.1240 },
    weather: {
      temp: 31,
      condition: 'Tropical Coastal Breeze',
      icon: 'Sun',
      forecast: [
        { day: 'Day 1', temp: 31, condition: 'Sunny', indoorAlternative: 'Fontainhas Latin Quarter Heritage Walk & Art Studios' },
        { day: 'Day 2', temp: 30, condition: 'Sunny', indoorAlternative: 'Old Goa Basilica of Bom Jesus UNESCO Tour' },
        { day: 'Day 3', temp: 29, condition: 'Rain', indoorAlternative: 'Spice Plantation Tour & Traditional Goan Banana Leaf Lunch' }
      ]
    },
    placesToVisit: [
      {
        id: 'goa-p1',
        name: 'Fontainhas Latin Quarter Heritage Trail',
        category: 'Portuguese Colonial Architecture',
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        rating: 4.88,
        reviews: 2400,
        openingHours: 'Open 24/7 (Best in daylight)',
        estimatedDuration: '2.5 Hours',
        ticketPrice: 0,
        description: 'Asia’s only surviving Latin quarter featuring pastel-colored 18th-century Portuguese mansions with red-tiled roofs and wrought-iron balconies.',
        highlights: ['Pastel Mansions', 'Azulejo Tiles', 'Artisanal Bakeries'],
        coordinates: { lat: 15.4989, lng: 73.8315 }
      }
    ],
    activities: [
      {
        id: 'goa-a1',
        name: 'Grand Island Scuba Diving & Dolphin Cruise',
        category: 'Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        rating: 4.85,
        reviews: 950,
        durationMinutes: 300,
        cost: 35,
        description: 'Boat cruise into Arabian Sea waters around Suzy’s Wreck with certified PADI dive instructors, followed by BBQ lunch on island.',
        badge: 'Water Sports Top Pick',
        intensity: 'Moderate',
        includes: ['PADI Instructor', 'Snorkel & Scuba Gear', 'Underwater Photos & Video'],
        coordinates: { lat: 15.3524, lng: 73.7661 }
      }
    ],
    stays: [
      {
        id: 'goa-s1',
        name: 'Taj Exotica Resort & Spa, Benaulim',
        type: 'Resorts',
        imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        rating: 4.94,
        reviews: 580,
        pricePerNight: 280,
        distanceFromCenter: 'Direct access to pristine Benaulim Beach',
        amenities: ['56 Acres of Landscaped Gardens', 'Jiva Ayurvedic Spa', 'Golf Course', 'Seafront Villas'],
        aiScore: 97,
        badge: 'South Goa Luxury',
        description: 'Mediterranean-style luxury retreat sprawling over 56 landscaped beachfront acres in peaceful South Goa.',
        coordinates: { lat: 15.2536, lng: 73.9189 }
      }
    ],
    transportation: [
      {
        id: 'goa-t1',
        type: 'Flights',
        title: 'Flights to Goa Dabolim (GOI) / Manohar International Mopa (GOX)',
        provider: 'IndiGo / Air India / Akasa',
        duration: '1h 15m from Mumbai / 2h 20m from Delhi',
        departure: 'All Major Indian Metros',
        arrival: 'GOX / GOI Airports',
        price: 45,
        frequency: '30+ Daily Flights'
      }
    ],
    food: [
      {
        id: 'goa-f1',
        name: 'Goan Fish Curry Thali with Kingfish Fry',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Coconut and kokum based tangy red fish curry served with steaming Goan red rice, rawa-crusted kingfish fry, and sol kadhi.',
        isVeg: false,
        price: 5,
        restaurant: 'Ritz Classic Panjim',
        restaurantLocation: '18th June Road, Panaji, Goa',
        aiScore: 99,
        tags: ['Iconic Goan', 'Must Try']
      }
    ],
    hiddenGems: [
      {
        id: 'goa-h1',
        name: 'Kakolem (Tiger) Secret Beach',
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        description: 'A secluded hidden cove reached via stairs through private forest, featuring a freshwater stream cascading onto the beach.',
        crowdLevel: 'Very Low',
        estimatedCost: 0,
        bestTime: 'Sunset 17:00',
        localSecretTip: 'Carry drinking water and comfortable footwear for the climb down.',
        coordinates: { lat: 15.0874, lng: 73.9785 }
      }
    ],
    guides: [
      {
        id: 'goa-g1',
        name: 'Savio Fernandes',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['English', 'Konkani', 'Portuguese', 'Hindi'],
        rating: 4.96,
        reviewsCount: 240,
        experienceYears: 11,
        specialty: 'Colonial Indo-Portuguese Architecture & Secret Beach Trails',
        dailyRate: 35,
        bio: 'Passionate Goan historian whose family roots in Panaji date back five generations.',
        contactEmail: 'savio.fernandes@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '100 / 112',
        ambulance: '108',
        fire: '101',
        touristPolice: '+91 832 2420804'
      },
      nearbyHospitals: [
        { name: 'Manipal Hospitals Goa (Dona Paula)', distance: '4.5 km', phone: '+91 832 2456600', rating: 4.8 }
      ],
      nearbyPoliceStations: [
        { name: 'Panaji Police Station', distance: '1.0 km', phone: '+91 832 2224422' }
      ],
      embassies: [
        { country: 'Honorary Consulate of the UK (Goa)', address: 'Panaji, Goa', phone: '+91 832 2436798' }
      ],
      safetyTips: [
        'Swim only between red and yellow flags where lifeguards (Drishti Marine) are on duty.',
        'Always negotiate taxi fares or use GoaMiles official app.'
      ]
    }
  },
  {
    id: 'manali',
    name: 'Manali',
    country: 'India',
    region: 'South Asia',
    tagline: 'Himalayan Pine Forests, Glacial Valleys & Adventure Trails',
    description: 'A paradise nestled in Himachal Pradesh offering snow-clad mountain passes, cedar forests, bubbling Beas River rapids, and ancient wooden pagoda temples.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 0.5,
    popularityScore: 93,
    rating: 4.87,
    reviewCount: 2890,
    bestTimeToVisit: 'Oct – Jun (Snow in Dec–Feb)',
    idealDurationDays: '4 – 5 Days',
    currency: 'INR (₹)',
    currencySymbol: '₹',
    language: 'Hindi, Pahari, English',
    timeZone: 'GMT+5:30 (IST)',
    climate: 'Mountain',
    coordinates: { lat: 32.2396, lng: 77.1887 },
    weather: {
      temp: 12,
      condition: 'Brisk Mountain Air',
      icon: 'CloudSun',
      forecast: [
        { day: 'Day 1', temp: 13, condition: 'Sunny', indoorAlternative: 'Old Manali Woodcarving & Himalayan Handicraft Center' },
        { day: 'Day 2', temp: 11, condition: 'Snow', indoorAlternative: 'Vashisht Natural Sulphur Hot Springs & Temple' },
        { day: 'Day 3', temp: 10, condition: 'Rain', indoorAlternative: 'Naggar Castle Art Gallery & Russian Painter Roerich Estate' }
      ]
    },
    placesToVisit: [
      {
        id: 'manali-p1',
        name: 'Solang Valley & Atal Tunnel',
        category: 'Snow & Adventure Hub',
        imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 4200,
        openingHours: '08:00 – 18:00',
        estimatedDuration: '4 Hours',
        ticketPrice: 0,
        description: 'World-famous glacial adventure arena for skiing, zorbing, snow-scooter rides, and access through the 9.02km engineering marvel Atal Tunnel.',
        highlights: ['Ski Slopes', 'World’s Longest Highway Tunnel at 10,000 ft', 'Glacier Views'],
        coordinates: { lat: 32.3166, lng: 77.1578 }
      }
    ],
    activities: [
      {
        id: 'manali-a1',
        name: 'Beas River Grade IV White Water Rafting',
        category: 'Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        rating: 4.91,
        reviews: 1120,
        durationMinutes: 120,
        cost: 25,
        description: '14km thrilling descent through rushing glacial rapids on the Beas River with professional safety kayakers.',
        badge: 'High Adrenaline',
        intensity: 'High',
        includes: ['Life Jacket & Helmet', 'River Guide', 'GoPro Footage'],
        coordinates: { lat: 31.9863, lng: 77.1214 }
      }
    ],
    stays: [
      {
        id: 'manali-s1',
        name: 'Span Resort & Spa (Beas Riverside)',
        type: 'Resorts',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        rating: 4.93,
        reviews: 310,
        pricePerNight: 190,
        distanceFromCenter: 'On the banks of Beas River, Baragarh',
        amenities: ['Private Riverfront Lawns', 'Helipad', 'Cedar Wood Suites', 'Heated Pool'],
        aiScore: 96,
        badge: 'Heritage Luxury',
        description: 'Premier 5-star mountain resort spread across pine forests alongside rushing glacier waters.',
        coordinates: { lat: 32.1452, lng: 77.1685 }
      }
    ],
    transportation: [
      {
        id: 'manali-t1',
        type: 'Buses',
        title: 'Luxury Volvo AC Sleeper Coaches from Delhi / Chandigarh',
        provider: 'HPTDC / Zingbus / IntrCity',
        duration: '12 – 14 Hours Overnight',
        departure: 'Kashmere Gate ISBT Delhi',
        arrival: 'Manali Private Bus Stand',
        price: 18,
        frequency: '25+ Daily Overnight Buses'
      }
    ],
    food: [
      {
        id: 'manali-f1',
        name: 'Himachali Siddu with Ghee & Dal',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Traditional steamed fermented wheat bread stuffed with spiced crushed walnuts, poppy seeds, and served with clarified butter.',
        isVeg: true,
        price: 3,
        restaurant: 'Heritage Taste of Himachal',
        restaurantLocation: 'Mall Road, Manali',
        aiScore: 98,
        tags: ['Pahari Specialty', 'Must Try']
      }
    ],
    hiddenGems: [
      {
        id: 'manali-h1',
        name: 'Jogini Waterfall Pine Forest Trek',
        imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
        description: 'A picturesque 3km trail from Vashisht through apple orchards and pine groves leading to a dramatic 150-foot cascading fall.',
        crowdLevel: 'Low',
        estimatedCost: 0,
        bestTime: 'Morning 08:00',
        localSecretTip: 'Stop at the small chai stall near the base for freshly fried rhododendron fritters.',
        coordinates: { lat: 32.2612, lng: 77.1956 }
      }
    ],
    guides: [
      {
        id: 'manali-g1',
        name: 'Rohit Sharma (Himachal Mountaineer)',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['Hindi', 'English', 'Pahari'],
        rating: 4.98,
        reviewsCount: 380,
        experienceYears: 13,
        specialty: 'High Altitude Treks, Bhrigu Lake & Hampta Pass Expeditions',
        dailyRate: 30,
        bio: 'Certified mountaineer from Atal Bihari Vajpayee Institute with summit experience across Pir Panjal ranges.',
        contactEmail: 'rohit.sharma@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '100 / 112',
        ambulance: '108',
        fire: '101',
        touristPolice: '+91 1902 252326'
      },
      nearbyHospitals: [
        { name: 'Civil Hospital Manali', distance: '1.2 km', phone: '+91 1902 252326', rating: 4.6 }
      ],
      nearbyPoliceStations: [
        { name: 'Manali Police Station (Near Mall Road)', distance: '0.8 km', phone: '+91 1902 252326' }
      ],
      embassies: [
        { country: 'High Commission Offices', address: 'Consular Services New Delhi', phone: '+91 11 2419 8000' }
      ],
      safetyTips: [
        'Check Atal Tunnel and Rohtang Pass road clearance status during winter months.',
        'Stay warm with layered woolen thermals during high altitude excursions.'
      ]
    }
  },
  {
    id: 'kashmir',
    name: 'Kashmir (Srinagar & Gulmarg)',
    country: 'India',
    region: 'South Asia',
    tagline: 'Paradise on Earth, Dal Lake Houseboats & Gondola Peaks',
    description: 'Pristine snow-clad Pir Panjal mountains, ornate carved cedar houseboats on Dal Lake, Mughal terraced gardens, and the world’s second highest operating cable car.',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 0.6,
    popularityScore: 95,
    rating: 4.92,
    reviewCount: 3450,
    bestTimeToVisit: 'Apr – Oct (Gardens) & Dec – Feb (Gulmarg Skiing)',
    idealDurationDays: '5 – 7 Days',
    currency: 'INR (₹)',
    currencySymbol: '₹',
    language: 'Kashmiri, Urdu, Hindi, English',
    timeZone: 'GMT+5:30 (IST)',
    climate: 'Alpine',
    coordinates: { lat: 34.0837, lng: 74.7973 },
    weather: {
      temp: 16,
      condition: 'Pleasant Mountain Spring',
      icon: 'CloudSun',
      forecast: [
        { day: 'Day 1', temp: 16, condition: 'Sunny', indoorAlternative: 'Pashmina Weaving & Kashmiri Walnut Wood Craft Tour' },
        { day: 'Day 2', temp: 14, condition: 'Sunny', indoorAlternative: 'Mughal Gardens Shalimar & Nishat Bagh Walk' },
        { day: 'Day 3', temp: 11, condition: 'Rain', indoorAlternative: 'Traditional Wazwan 36-Course Banquet Feast Experience' }
      ]
    },
    placesToVisit: [
      {
        id: 'kash-p1',
        name: 'Gulmarg Gondola (Phase 1 & Phase 2 at 13,780 ft)',
        category: 'High Altitude Snow Peak',
        imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
        rating: 4.96,
        reviews: 4900,
        openingHours: '09:00 – 17:00',
        estimatedDuration: '4 Hours',
        ticketPrice: 20,
        description: 'World’s highest operating cable car carrying passengers up to Kongdoori and Apharwat Peak with ski powder slopes.',
        highlights: ['13,780 ft Peak', 'Apharwat Glacier View', 'Powder Snow Skiing'],
        coordinates: { lat: 34.0484, lng: 74.3805 }
      }
    ],
    activities: [
      {
        id: 'kash-a1',
        name: 'Sunset Shikara Cruise on Dal Lake with Floating Flower Market',
        category: 'Culture',
        imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
        rating: 4.94,
        reviews: 2100,
        durationMinutes: 120,
        cost: 15,
        description: 'Glide gently on velvet cushioned shikaras across reflective waters lined with lotus gardens and floating artisan shops.',
        badge: 'Most Iconic',
        intensity: 'Easy',
        includes: ['Private Shikara', 'Kashmiri Kahwa Tea', 'Char Chinar Island Visit'],
        coordinates: { lat: 34.0837, lng: 74.8373 }
      }
    ],
    stays: [
      {
        id: 'kash-s1',
        name: 'The Khyber Himalayan Resort & Spa, Gulmarg',
        type: 'Resorts',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        rating: 4.98,
        reviews: 430,
        pricePerNight: 360,
        distanceFromCenter: 'Walking distance to Gulmarg Gondola',
        amenities: ['L’Occitane Heated Indoor Pool with Mountain Views', 'Cigar Lounge', 'Timber Architecture'],
        aiScore: 99,
        badge: 'Premier Mountain Resort',
        description: 'World-renowned 5-star alpine resort set amid pristine pine forests with floor-to-ceiling vistas of Apharwat peak.',
        coordinates: { lat: 34.0531, lng: 74.3854 }
      }
    ],
    transportation: [
      {
        id: 'kash-t1',
        type: 'Flights',
        title: 'Flights to Sheikh ul-Alam International Airport (SXR)',
        provider: 'Air India / IndiGo / SpiceJet',
        duration: '1h 20m from Delhi',
        departure: 'Delhi, Mumbai, Bengaluru',
        arrival: 'Srinagar Airport (SXR)',
        price: 60,
        frequency: '20+ Daily Flights'
      }
    ],
    food: [
      {
        id: 'kash-f1',
        name: 'Traditional Rogan Josh with Fragrant Basmati',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Slow-cooked lamb shank infused with Kashmiri dry red chilies, cockscomb flower (maval), and aromatic fennel spices.',
        isVeg: false,
        price: 8,
        restaurant: 'Ahdoos Restaurant Since 1918',
        restaurantLocation: 'Residency Road, Srinagar',
        aiScore: 99,
        tags: ['Kashmiri Heritage', 'Must Try']
      }
    ],
    hiddenGems: [
      {
        id: 'kash-h1',
        name: 'Doodhpathri (Valley of Milk)',
        imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
        description: 'Untouched bowl-shaped alpine meadow traversed by the rushing Shaliganga stream creating foamy white rapids like milk.',
        crowdLevel: 'Very Low',
        estimatedCost: 0,
        bestTime: 'Morning 10:00',
        localSecretTip: 'Rent a local pony to ride up to the higher shepherd pastures of Dikshal.',
        coordinates: { lat: 33.8763, lng: 74.5612 }
      }
    ],
    guides: [
      {
        id: 'kash-g1',
        name: 'Bashir Ahmed Khan',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['English', 'Kashmiri', 'Urdu', 'Hindi'],
        rating: 4.97,
        reviewsCount: 310,
        experienceYears: 18,
        specialty: 'Gulmarg Ski Guide, Heritage Sufi Shrines & Valley Trekking',
        dailyRate: 35,
        bio: 'Second-generation valley guide with intimate knowledge of Kashmiri history, cuisine, and secret mountain passes.',
        contactEmail: 'bashir.khan@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '100 / 112',
        ambulance: '102 / 108',
        fire: '101',
        touristPolice: '+91 194 2452285'
      },
      nearbyHospitals: [
        { name: 'SKIMS Medical Institute Srinagar', distance: '5.2 km', phone: '+91 194 2401013', rating: 4.8 }
      ],
      nearbyPoliceStations: [
        { name: 'Srinagar Tourist Police Assistance Cell', distance: '1.2 km', phone: '+91 194 2452285' }
      ],
      embassies: [
        { country: 'Embassies in New Delhi', address: 'Chanakyapuri, New Delhi', phone: '+91 11 2419 8000' }
      ],
      safetyTips: [
        'Book Gulmarg Gondola Phase 2 tickets in advance online on official J&K tourism portal.',
        'Carry postpaid mobile SIM connections (BSNL / Airtel / Jio) as prepaid SIMs outside J&K do not roam.'
      ]
    }
  },
  {
    id: 'kerala',
    name: 'Kerala (God’s Own Country)',
    country: 'India',
    region: 'South Asia',
    tagline: 'Tranquil Backwaters, Tea Plantations & Ayurvedic Wellness',
    description: 'Emerald palm-fringed backwater lagoons navigated on traditional thatched houseboats, misty Munnar tea hills, and Kathakali cultural performances.',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 0.55,
    popularityScore: 94,
    rating: 4.9,
    reviewCount: 3620,
    bestTimeToVisit: 'Sep – Mar (Post-monsoon freshness)',
    idealDurationDays: '5 – 7 Days',
    currency: 'INR (₹)',
    currencySymbol: '₹',
    language: 'Malayalam, English, Hindi',
    timeZone: 'GMT+5:30 (IST)',
    climate: 'Tropical',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    weather: {
      temp: 28,
      condition: 'Tropical Breeze',
      icon: 'Sun',
      forecast: [
        { day: 'Day 1', temp: 28, condition: 'Sunny', indoorAlternative: 'Kathakali Dance & Kalaripayattu Martial Arts Center' },
        { day: 'Day 2', temp: 29, condition: 'Sunny', indoorAlternative: 'Ayurvedic Rejuvenation Oil Therapy & Abhyanga Spa' },
        { day: 'Day 3', temp: 27, condition: 'Rain', indoorAlternative: 'Spice Estate Pepper & Cardamom Processing Mill' }
      ]
    },
    placesToVisit: [
      {
        id: 'ker-p1',
        name: 'Alleppey Backwaters & Vembanad Lake',
        category: 'Serene Waterways & Lagoons',
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
        rating: 4.94,
        reviews: 4300,
        openingHours: 'Cruises 08:00 – 18:00',
        estimatedDuration: 'Full Day / Overnight',
        ticketPrice: 85,
        description: 'Vast network of interconnected canals, rivers, and inlets fringed by coconut groves and peaceful village life.',
        highlights: ['Kettuvallam Houseboats', 'Vembanad Lake Sunset', 'Village Toddy Shops'],
        coordinates: { lat: 9.4981, lng: 76.3388 }
      }
    ],
    activities: [
      {
        id: 'ker-a1',
        name: 'Overnight Luxury Kettuvallam Houseboat Cruise with Chef',
        category: 'Nature',
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
        rating: 4.95,
        reviews: 1890,
        durationMinutes: 1200,
        cost: 140,
        description: 'Sail through narrow village canals with a private onboard captain and chef preparing fresh pearl spot karimeen fry.',
        badge: 'Kerala Signature',
        intensity: 'Easy',
        includes: ['Private Air-Conditioned Suite', 'All Meals & Fresh Catch', 'Canoe Village Safari'],
        coordinates: { lat: 9.4981, lng: 76.3388 }
      }
    ],
    stays: [
      {
        id: 'ker-s1',
        name: 'Kumarakom Lake Resort (Heritage Luxury)',
        type: 'Resorts',
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        rating: 4.97,
        reviews: 490,
        pricePerNight: 260,
        distanceFromCenter: 'On the banks of Vembanad Lake, Kumarakom',
        amenities: ['250m Meandering Pool', 'Ayurmana Spa', 'Heritage Thatched Villas'],
        aiScore: 98,
        badge: 'Prince Charles Approved',
        description: 'Celebrated luxury heritage resort featuring 16th-century reconstructed traditional ancestral homesteads.',
        coordinates: { lat: 9.6192, lng: 76.4308 }
      }
    ],
    transportation: [
      {
        id: 'ker-t1',
        type: 'Flights',
        title: 'Cochin International Airport (COK) – 100% Solar Powered',
        provider: 'Emirates / Air India / IndiGo',
        duration: 'Direct Domestic & International',
        departure: 'Worldwide & Indian Hubs',
        arrival: 'COK Airport',
        price: 55,
        frequency: '40+ Daily Flights'
      }
    ],
    food: [
      {
        id: 'ker-f1',
        name: 'Karimeen Pollichathu (Spiced Pearl Spot in Banana Leaf)',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Freshwater fish marinated in shallots, green chilies, ginger, and curry leaf masala, wrapped in banana leaf and slow tawa-roasted.',
        isVeg: false,
        price: 7,
        restaurant: 'Grand Hotel Restaurant (Since 1963)',
        restaurantLocation: 'MG Road, Ernakulam, Kochi',
        aiScore: 99,
        tags: ['Signature Dish', 'Must Try']
      }
    ],
    hiddenGems: [
      {
        id: 'ker-h1',
        name: 'Marari Quiet Beach & Fisherman Village',
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
        description: 'Peaceful endless white sand coastline dotted with traditional fishing catamarans with no commercial shops.',
        crowdLevel: 'Very Low',
        estimatedCost: 0,
        bestTime: 'Sunset 17:30',
        localSecretTip: 'Watch local fishermen haul in evening shore nets while enjoying fresh tender coconut.',
        coordinates: { lat: 9.6015, lng: 76.2982 }
      }
    ],
    guides: [
      {
        id: 'ker-g1',
        name: 'Anand Nair',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['English', 'Malayalam', 'Hindi', 'German'],
        rating: 4.98,
        reviewsCount: 340,
        experienceYears: 14,
        specialty: 'Backwater Ecology, Spice Trails & Kathakali Performing Arts',
        dailyRate: 35,
        bio: 'Environmental educator and certified naturalist specializing in Cochin spice history and bird sanctuaries.',
        contactEmail: 'anand.nair@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '100 / 112',
        ambulance: '108',
        fire: '101',
        touristPolice: '+91 484 2215455'
      },
      nearbyHospitals: [
        { name: 'Aster Medcity Kochi', distance: '6.8 km', phone: '+91 484 6699999', rating: 4.9 }
      ],
      nearbyPoliceStations: [
        { name: 'Fort Kochi Police Station', distance: '0.8 km', phone: '+91 484 2215455' }
      ],
      embassies: [
        { country: 'Consulates in Chennai / Trivandrum', address: 'South India Consular Hub', phone: '+91 44 2857 4000' }
      ],
      safetyTips: [
        'Always confirm houseboats possess valid Kerala Tourism Department safety certifications.',
        'Use eco-friendly mosquito repellent during evening backwater cruises.'
      ]
    }
  },
  {
    id: 'ladakh',
    name: 'Ladakh (Land of High Passes)',
    country: 'India',
    region: 'South Asia',
    tagline: 'High-Altitude Deserts, Azure Lakes & Buddhist Monasteries',
    description: 'Dramatic high-altitude moonscapes, turquoise glacial lakes at 14,000 feet, cliffside Tibetan Buddhist gompas, and motorcycling across the highest motorable roads.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 0.65,
    popularityScore: 92,
    rating: 4.93,
    reviewCount: 2980,
    bestTimeToVisit: 'May – Sep (Road passes open)',
    idealDurationDays: '6 – 8 Days',
    currency: 'INR (₹)',
    currencySymbol: '₹',
    language: 'Ladakhi, Tibetan, Hindi, English',
    timeZone: 'GMT+5:30 (IST)',
    climate: 'Mountain',
    coordinates: { lat: 34.1526, lng: 77.5771 },
    weather: {
      temp: 11,
      condition: 'High-Altitude Crystal Sun',
      icon: 'Sun',
      forecast: [
        { day: 'Day 1', temp: 11, condition: 'Sunny', indoorAlternative: 'Leh Palace & Central Asian Museum Heritage Tour' },
        { day: 'Day 2', temp: 10, condition: 'Sunny', indoorAlternative: 'Thiksey Monastery Morning Prayer Chanting' },
        { day: 'Day 3', temp: 8, condition: 'Cloudy', indoorAlternative: 'Tibetan Herbal Medicine & Amchi Clinic Session' }
      ]
    },
    placesToVisit: [
      {
        id: 'lad-p1',
        name: 'Pangong Tso Crystal Lake (14,270 ft)',
        category: 'High Altitude Salt Lake',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        rating: 4.98,
        reviews: 4800,
        openingHours: 'Daylight Hours',
        estimatedDuration: 'Full Day / Overnight Camp',
        ticketPrice: 5,
        description: 'A 134km-long endorheic lake extending from India to Tibet, renowned for shifting colors from deep navy to turquoise and emerald green.',
        highlights: ['Color-Changing Waters', '14,270 ft Altitude', 'Starlit Milky Way Nights'],
        coordinates: { lat: 33.7595, lng: 78.6674 }
      }
    ],
    activities: [
      {
        id: 'lad-a1',
        name: 'Khardung La Pass 17,982 ft Mountain Biking Descent',
        category: 'Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        rating: 4.95,
        reviews: 1200,
        durationMinutes: 240,
        cost: 40,
        description: 'Ascend by vehicle to Khardung La Pass and cycle 40km exhilarating downhill back to Leh surrounded by snow peaks.',
        badge: 'High Altitude Thrill',
        intensity: 'High',
        includes: ['Hydraulic Disc Brake Mountain Bike', 'Support Vehicle & Oxygen', 'Safety Gear'],
        coordinates: { lat: 34.2787, lng: 77.6047 }
      }
    ],
    stays: [
      {
        id: 'lad-s1',
        name: 'The Grand Dragon Ladakh (Eco Luxury)',
        type: 'Hotels',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        rating: 4.96,
        reviews: 410,
        pricePerNight: 210,
        distanceFromCenter: '1 km from Leh Main Bazaar',
        amenities: ['Oxygen-Enriched Rooms', 'Solar Heated Floors', 'Stok Kangri Mountain Views'],
        aiScore: 98,
        badge: 'Premier Leh Hotel',
        description: 'First luxury 5-star eco-hotel in Ladakh equipped with modern amenities and views of the Stok Kangri range.',
        coordinates: { lat: 34.1565, lng: 77.5812 }
      }
    ],
    transportation: [
      {
        id: 'lad-t1',
        type: 'Flights',
        title: 'Flights to Kushok Bakula Rimpochee Airport Leh (IXL)',
        provider: 'Air India / IndiGo / SpiceJet',
        duration: '1h 15m from Delhi over snowy Himalayas',
        departure: 'Delhi / Mumbai',
        arrival: 'Leh Airport (IXL)',
        price: 75,
        frequency: '15+ Daily Morning Flights'
      }
    ],
    food: [
      {
        id: 'lad-f1',
        name: 'Steamed Ladakhi Momos & Thukpa Noodle Soup',
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
        description: 'Handmade wheat dumplings filled with seasoned local yak cheese and vegetables, served with fiery chili garlic chutney and hot broth.',
        isVeg: true,
        price: 3.5,
        restaurant: 'Gesmo Restaurant Leh',
        restaurantLocation: 'Fort Road, Leh Ladakh',
        aiScore: 98,
        tags: ['Tibetan Classic', 'Must Try']
      }
    ],
    hiddenGems: [
      {
        id: 'lad-h1',
        name: 'Turtuk Village (Balti Culture at the Border)',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        description: 'Last northern village of India before the Line of Control, home to Balti people, lush apricot orchards, and stone canals.',
        crowdLevel: 'Very Low',
        estimatedCost: 0,
        bestTime: 'Afternoon 14:00',
        localSecretTip: 'Taste sun-dried organic Balti apricots and visit the 1,000-year-old wooden royal palace.',
        coordinates: { lat: 34.8458, lng: 76.8285 }
      }
    ],
    guides: [
      {
        id: 'lad-g1',
        name: 'Stanzin Dorjey',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['Ladakhi', 'Tibetan', 'Hindi', 'English', 'French'],
        rating: 4.99,
        reviewsCount: 420,
        experienceYears: 15,
        specialty: 'Monastery Iconography, Snow Leopard Winter Expeditions & High Passes',
        dailyRate: 40,
        bio: 'Born in Zanskar valley, Stanzin is a filmmaker and high-altitude guide who has led international scientific expeditions.',
        contactEmail: 'stanzin.dorjey@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '100 / 112',
        ambulance: '108',
        fire: '101',
        touristPolice: '+91 1982 252018'
      },
      nearbyHospitals: [
        { name: 'SNM Hospital Leh (Equipped with Hyperbaric Oxygen)', distance: '1.2 km', phone: '+91 1982 252014', rating: 4.8 }
      ],
      nearbyPoliceStations: [
        { name: 'Leh Police Station', distance: '0.8 km', phone: '+91 1982 252018' }
      ],
      embassies: [
        { country: 'New Delhi Diplomatic Mission', address: 'Consular Services New Delhi', phone: '+91 11 2419 8000' }
      ],
      safetyTips: [
        'Mandatory 24–48 hours complete rest in Leh (3,500m) upon arrival to acclimatize and prevent Acute Mountain Sickness (AMS).',
        'Drink 3–4 liters of water daily and carry Diamox if recommended by your physician.'
      ]
    }
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    region: 'Southeast Asia',
    tagline: 'Futuristic Garden City, Michelin Street Food & Supertrees',
    description: 'A cutting-edge green metropolis renowned for Gardens by the Bay supertrees, rooftop infinity pools, pristine streets, and multicultural hawker feast centers.',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 1.6,
    popularityScore: 97,
    rating: 4.91,
    reviewCount: 5120,
    bestTimeToVisit: 'Year-Round (Best Nov – Jan)',
    idealDurationDays: '3 – 5 Days',
    currency: 'SGD ($)',
    currencySymbol: 'S$',
    language: 'English, Mandarin, Malay, Tamil',
    timeZone: 'GMT+8 (SGT)',
    climate: 'Tropical',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    weather: {
      temp: 30,
      condition: 'Warm Tropical',
      icon: 'Sun',
      forecast: [
        { day: 'Day 1', temp: 30, condition: 'Sunny', indoorAlternative: 'Cloud Forest & Flower Dome Biomes at Gardens by the Bay' },
        { day: 'Day 2', temp: 31, condition: 'Sunny', indoorAlternative: 'National Gallery Singapore Southeast Asian Art Wing' },
        { day: 'Day 3', temp: 29, condition: 'Rain', indoorAlternative: 'Jewel Changi Airport Rain Vortex & Canopy Park' }
      ]
    },
    placesToVisit: [
      {
        id: 'sg-p1',
        name: 'Gardens by the Bay & Supertree Grove',
        category: 'Futuristic Botanical Marvel',
        imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
        rating: 4.96,
        reviews: 7900,
        openingHours: '05:00 – 02:00 (Conservatories 09:00 – 21:00)',
        estimatedDuration: '3 Hours',
        ticketPrice: 24,
        description: 'Avatar-like botanical wonderland featuring 50m vertical supertrees and the world’s largest glass greenhouse with a 35m indoor waterfall.',
        highlights: ['Supertree Light Show', '35m Indoor Waterfall', 'OCBC Skyway Walk'],
        coordinates: { lat: 1.2815, lng: 103.8636 }
      }
    ],
    activities: [
      {
        id: 'sg-a1',
        name: 'Marina Bay Sands SkyPark & Rooftop Sunset Experience',
        category: 'Sightseeing',
        imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
        rating: 4.93,
        reviews: 3200,
        durationMinutes: 120,
        cost: 26,
        description: 'Tower 57 stories above Marina Bay on the cantilevered observation deck for 360-degree views across Singapore Strait.',
        badge: 'Top Viewpoint',
        intensity: 'Easy',
        includes: ['Observation Deck Access', 'Digital Photo Souvenirs'],
        coordinates: { lat: 1.2834, lng: 103.8607 }
      }
    ],
    stays: [
      {
        id: 'sg-s1',
        name: 'Marina Bay Sands Hotel',
        type: 'Hotels',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        rating: 4.96,
        reviews: 1200,
        pricePerNight: 590,
        distanceFromCenter: 'Marina Bay Waterfront',
        amenities: ['World’s Largest Rooftop Infinity Pool', 'Banyan Tree Spa', 'Celebrity Chef Dining'],
        aiScore: 98,
        badge: 'Global Icon',
        description: 'World’s most photographed integrated resort featuring the legendary 150-meter rooftop infinity pool overlooking Singapore skyline.',
        coordinates: { lat: 1.2834, lng: 103.8607 }
      }
    ],
    transportation: [
      {
        id: 'sg-t1',
        type: 'Metro',
        title: 'Singapore SMRT Mass Rapid Transit (MRT)',
        provider: 'SMRT / SBS Transit',
        duration: 'Direct connections across the entire island',
        departure: 'Changi Airport Station',
        arrival: 'Any neighborhood',
        price: 2,
        frequency: 'Every 2 Minutes'
      }
    ],
    food: [
      {
        id: 'sg-f1',
        name: 'Hainanese Chicken Rice with Fragrant Broth',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        description: 'Poached silky tender chicken served over rice cooked in chicken stock and pandan leaf, paired with crushed ginger and chili sauce.',
        isVeg: false,
        price: 4.5,
        restaurant: 'Tian Tian Hainanese Chicken Rice',
        restaurantLocation: 'Maxwell Food Centre #01-10/11',
        aiScore: 99,
        tags: ['Michelin Bib Gourmand', 'Must Try']
      }
    ],
    hiddenGems: [
      {
        id: 'sg-h1',
        name: 'Haji Lane & Kampong Glam Street Art',
        imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
        description: 'Narrow historic shophouse alley bursting with vibrant graffiti murals, quirky independent fashion boutiques, and specialty iced matcha cafes.',
        crowdLevel: 'Medium',
        estimatedCost: 0,
        bestTime: 'Afternoon 16:00',
        localSecretTip: 'Visit the golden domed Sultan Mosque nearby at golden hour.',
        coordinates: { lat: 1.3008, lng: 103.8591 }
      }
    ],
    guides: [
      {
        id: 'sg-g1',
        name: 'Marcus Tan',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['English', 'Mandarin', 'Hokkien'],
        rating: 4.97,
        reviewsCount: 390,
        experienceYears: 10,
        specialty: 'Michelin Hawker Trails, Peranakan Heritage & Architecture',
        dailyRate: 85,
        bio: 'Culinary historian and food writer who takes you to the generational hawkers hidden from tourist guides.',
        contactEmail: 'marcus.tan@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '999',
        ambulance: '995',
        fire: '995',
        touristPolice: '1800 255 0000'
      },
      nearbyHospitals: [
        { name: 'Singapore General Hospital (SGH)', distance: '2.5 km', phone: '+65 6222 3322', rating: 4.95 }
      ],
      nearbyPoliceStations: [
        { name: 'Marina Bay Neighbourhood Police Centre', distance: '1.1 km', phone: '+65 6220 0000' }
      ],
      embassies: [
        { country: 'Embassy of the United States', address: '27 Napier Road, Singapore 258508', phone: '+65 6476 9100' }
      ],
      safetyTips: [
        'Singapore ranks consistently as one of the safest nations globally.',
        'Chewing gum importation and littering carry strictly enforced municipal fines.'
      ]
    }
  },
  {
    id: 'new-york',
    name: 'New York City',
    country: 'United States',
    region: 'North America',
    tagline: 'The Capital of the World, Broadway & Skyline Energy',
    description: 'An iconic metropolis pulsating with electrifying energy, world-renowned Broadway shows, monumental Central Park greenery, and architectural icons.',
    heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
    ],
    costIndex: 1.75,
    popularityScore: 98,
    rating: 4.92,
    reviewCount: 6100,
    bestTimeToVisit: 'Sep – Nov & Apr – Jun',
    idealDurationDays: '5 – 7 Days',
    currency: 'USD ($)',
    currencySymbol: '$',
    language: 'English',
    timeZone: 'GMT-5 (EST)',
    climate: 'Temperate',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    weather: {
      temp: 22,
      condition: 'Sunny Blue Skies',
      icon: 'Sun',
      forecast: [
        { day: 'Day 1', temp: 22, condition: 'Sunny', indoorAlternative: 'Metropolitan Museum of Art (The Met) Masterpieces' },
        { day: 'Day 2', temp: 20, condition: 'Sunny', indoorAlternative: 'Broadway Musical VIP Orchestra Seats' },
        { day: 'Day 3', temp: 18, condition: 'Rain', indoorAlternative: 'Chelsea Market & High Line Indoor Artisan Hall' }
      ]
    },
    placesToVisit: [
      {
        id: 'nyc-p1',
        name: 'Central Park & Bethesda Terrace',
        category: 'Urban Park & Nature',
        imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
        rating: 4.95,
        reviews: 9500,
        openingHours: '06:00 – 01:00',
        estimatedDuration: '3 Hours',
        ticketPrice: 0,
        description: 'Frederick Law Olmsted’s 843-acre masterpiece spanning the heart of Manhattan with lakes, bridges, and walking trails.',
        highlights: ['Bethesda Fountain', 'Bow Bridge', 'The Ramble'],
        coordinates: { lat: 40.785091, lng: -73.968285 }
      }
    ],
    activities: [
      {
        id: 'nyc-a1',
        name: 'Summit One Vanderbilt Immersive Glass Sky Experience',
        category: 'Sightseeing',
        imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
        rating: 4.96,
        reviews: 3800,
        durationMinutes: 120,
        cost: 42,
        description: 'Walk through multi-sensory infinity mirror rooms on the 91st floor with views of the Empire State Building and Chrysler Building.',
        badge: 'Hottest NYC Attraction',
        intensity: 'Easy',
        includes: ['Fast Pass Entry', 'Levitation Glass Boxes Access'],
        coordinates: { lat: 40.7527, lng: -73.9772 }
      }
    ],
    stays: [
      {
        id: 'nyc-s1',
        name: 'The Plaza Hotel Fifth Avenue',
        type: 'Hotels',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        rating: 4.96,
        reviews: 980,
        pricePerNight: 890,
        distanceFromCenter: 'Facing Central Park South',
        amenities: ['Guerlain Spa', 'Champagne Bar', 'Palm Court Afternoon Tea', 'White Glove Service'],
        aiScore: 98,
        badge: 'Legendary Address',
        description: 'New York’s most storied luxury hotel situated on Fifth Avenue and Central Park South since 1907.',
        coordinates: { lat: 40.7644, lng: -73.9744 }
      }
    ],
    transportation: [
      {
        id: 'nyc-t1',
        type: 'Metro',
        title: 'MTA New York City Subway (OMNY Tap-to-Pay)',
        provider: 'MTA New York',
        duration: '24/7 Service connecting Manhattan, Brooklyn, Queens, Bronx',
        departure: '472 Subway Stations',
        arrival: 'Any Point in NYC',
        price: 2.9,
        frequency: 'Every 2 – 5 Minutes'
      }
    ],
    food: [
      {
        id: 'nyc-f1',
        name: 'Classic New York Pastrami on Rye',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        description: 'Warm cured and smoked beef brisket sliced thick by master carvers, piled high on rye bread with spicy brown mustard.',
        isVeg: false,
        price: 26,
        restaurant: 'Katz’s Delicatessen (Est. 1888)',
        restaurantLocation: '205 E Houston St, Lower East Side',
        aiScore: 99,
        tags: ['Historic NYC', 'Must Try']
      }
    ],
    hiddenGems: [
      {
        id: 'nyc-h1',
        name: 'The Morgan Library & Museum',
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
        description: 'Financier J. Pierpont Morgan’s private 3-story library with floor-to-ceiling walnut bookshelves, Gutenberg Bibles, and ceiling frescoes.',
        crowdLevel: 'Low',
        estimatedCost: 22,
        bestTime: 'Friday Afternoon 15:00',
        localSecretTip: 'Free admission on Friday evenings with advance online reservations.',
        coordinates: { lat: 40.7492, lng: -73.9814 }
      }
    ],
    guides: [
      {
        id: 'nyc-g1',
        name: 'Sarah Jenkins',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        verified: true,
        languages: ['English', 'Spanish'],
        rating: 4.98,
        reviewsCount: 470,
        experienceYears: 12,
        specialty: 'Broadway Insiders, Greenwich Village History & Speakeasies',
        dailyRate: 120,
        bio: 'Former Broadway theater producer turned NYC culture guide who unlocks secret brownstone histories and hidden jazz bars.',
        contactEmail: 'sarah.jenkins@globetrotter.ai'
      }
    ],
    safety: {
      emergencyNumbers: {
        police: '911',
        ambulance: '911',
        fire: '911',
        touristPolice: '311 (Non-Emergency NYC Services)'
      },
      nearbyHospitals: [
        { name: 'NewYork-Presbyterian / Weill Cornell Medical Center', distance: '3.2 km', phone: '+1 212 746 5454', rating: 4.9 }
      ],
      nearbyPoliceStations: [
        { name: 'NYPD Midtown South Precinct', distance: '0.6 km', phone: '+1 212 239 9811' }
      ],
      embassies: [
        { country: 'United Nations Headquarters Hub', address: '405 E 42nd St, New York, NY 10017', phone: '+1 212 963 1234' }
      ],
      safetyTips: [
        'Use OMNY contactless tap to pay for quick turnstile entry without buying physical MetroCards.',
        'Keep alert on subway platforms and stand behind the yellow safety line.'
      ]
    }
  }
];

export const SAMPLE_TRIPS: UserTrip[] = [
  {
    id: 'trip-bali-serenity',
    name: 'Bali Spiritual Retreat & Island Escapes',
    destinationId: 'bali',
    destinationName: 'Bali',
    country: 'Indonesia',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-10-15',
    endDate: '2026-10-22',
    status: 'upcoming',
    travelers: 2,
    travelStyle: 'Couple & Wellness',
    totalBudget: 2400,
    spentBudget: 1650,
    tripScore: 97,
    preferenceMatch: 96,
    cities: ['Ubud', 'Canggu', 'Nusa Penida'],
    packingProgress: 80,
    days: [
      {
        dayNumber: 1,
        date: '2026-10-15',
        title: 'Arrival in Ubud & Sacred Temple Immersion',
        weather: { temp: 29, condition: 'Sunny' },
        slots: [
          {
            id: 'b-s1',
            period: 'Morning',
            time: '09:00 AM',
            activityName: 'Private Villa Check-in & Ayung River Welcome Drink',
            category: 'Relaxation',
            durationMinutes: 90,
            travelTimeToNext: '20 min drive',
            cost: 0,
            imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
            foodSuggestion: 'Fresh Dragonfruit Smoothie & Balinese Jamu at Villa Lounge',
            nearbyAttractions: ['Ayung River Walk', 'Sayan Ridge'],
            coordinates: { lat: -8.4901, lng: 115.2443 }
          },
          {
            id: 'b-s2',
            period: 'Afternoon',
            time: '02:00 PM',
            activityName: 'Tegallalang Rice Terraces & Traditional Subak Walk',
            category: 'Nature',
            durationMinutes: 150,
            travelTimeToNext: '25 min drive',
            cost: 4,
            imageUrl: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80',
            foodSuggestion: 'Organic Nasi Campur at Tis Cafe overlooking terraces',
            nearbyAttractions: ['Tirta Empul Holy Spring', 'Alas Harum Jungle Swing'],
            coordinates: { lat: -8.4334, lng: 115.2785 }
          },
          {
            id: 'b-s3',
            period: 'Evening',
            time: '06:00 PM',
            activityName: 'Tanah Lot Sunset Rock Temple Ceremony',
            category: 'Culture',
            durationMinutes: 120,
            travelTimeToNext: 'Back to villa',
            cost: 5,
            imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
            foodSuggestion: 'Grilled Seafood with Sambal Matah at Cliffside Warung',
            nearbyAttractions: ['Batu Bolong Sea Arch', 'Echo Beach'],
            coordinates: { lat: -8.6212, lng: 115.0868 }
          }
        ]
      },
      {
        dayNumber: 2,
        date: '2026-10-16',
        title: 'Mount Batur Sunrise & Volcanic Hot Springs',
        weather: { temp: 28, condition: 'Sunny' },
        slots: [
          {
            id: 'b-s4',
            period: 'Morning',
            time: '04:00 AM',
            activityName: 'Mount Batur 4x4 Jeep Sunrise Expedition',
            category: 'Adventure',
            durationMinutes: 240,
            travelTimeToNext: '15 min drive',
            cost: 45,
            imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
            foodSuggestion: 'Steamed volcanic eggs, hot banana sandwiches & Balinese black coffee',
            nearbyAttractions: ['Black Lava Fields', 'Lake Batur'],
            coordinates: { lat: -8.2421, lng: 115.3753 }
          },
          {
            id: 'b-s5',
            period: 'Afternoon',
            time: '01:00 PM',
            activityName: 'Toya Devasya Geothermal Hot Spring Rejuvenation',
            category: 'Relaxation',
            durationMinutes: 180,
            travelTimeToNext: '45 min drive',
            cost: 20,
            imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
            foodSuggestion: 'Fresh Mujair Nyat-Nyat fish curry at lakeside bamboo hut',
            nearbyAttractions: ['Trunyan Ancient Cemetery', 'Kintamani Coffee Cafes'],
            coordinates: { lat: -8.2611, lng: 115.4122 }
          }
        ]
      }
    ]
  },
  {
    id: 'trip-japan-odyssey',
    name: 'Japan Cultural Odyssey: Tokyo & Kyoto',
    destinationId: 'tokyo',
    destinationName: 'Tokyo',
    country: 'Japan',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-09-01',
    endDate: '2026-09-10',
    status: 'ongoing',
    travelers: 1,
    travelStyle: 'Solo & Culinary',
    totalBudget: 3200,
    spentBudget: 2150,
    tripScore: 99,
    preferenceMatch: 98,
    cities: ['Tokyo', 'Kyoto', 'Osaka'],
    packingProgress: 100,
    days: [
      {
        dayNumber: 1,
        date: '2026-09-01',
        title: 'Shibuya Crossing & Digital Art Immersion',
        weather: { temp: 21, condition: 'Sunny' },
        slots: [
          {
            id: 'j-s1',
            period: 'Morning',
            time: '09:30 AM',
            activityName: 'Meiji Jingu Shrine Cedar Forest Walk',
            category: 'Culture',
            durationMinutes: 120,
            travelTimeToNext: '10 min metro',
            cost: 0,
            imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
            foodSuggestion: 'Matcha Soft Serve & Dango skewer outside Harajuku',
            nearbyAttractions: ['Takeshita Street', 'Omotesando Hills'],
            coordinates: { lat: 35.6764, lng: 139.6993 }
          },
          {
            id: 'j-s2',
            period: 'Afternoon',
            time: '02:00 PM',
            activityName: 'TeamLab Planets Interactive Water Artwork',
            category: 'Culture',
            durationMinutes: 120,
            travelTimeToNext: '15 min metro',
            cost: 38,
            imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
            foodSuggestion: 'Vegan Ramen at Vegan Ramen UZU inside TeamLab courtyard',
            nearbyAttractions: ['Toyosu Fish Market', 'Odaiba Seaside Park'],
            coordinates: { lat: 35.6515, lng: 139.7932 }
          }
        ]
      }
    ]
  },
  {
    id: 'trip-swiss-alps',
    name: 'Swiss Alpine Panorama & Glaciers',
    destinationId: 'switzerland',
    destinationName: 'Switzerland',
    country: 'Switzerland',
    coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-06-10',
    endDate: '2026-06-18',
    status: 'completed',
    travelers: 2,
    travelStyle: 'Luxury & Nature',
    totalBudget: 4500,
    spentBudget: 4280,
    tripScore: 98,
    preferenceMatch: 95,
    cities: ['Zürich', 'Interlaken', 'Zermatt'],
    packingProgress: 100,
    days: []
  }
];

export const SAMPLE_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'Globe Explorer Elite',
    destination: 'Bali, Indonesia',
    tripTitle: '7 Magical Days in Ubud & Hidden Waterfalls',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    days: 7,
    budgetSpent: 850,
    likes: 342,
    isLiked: false,
    commentsCount: 28,
    timeAgo: '2 hours ago',
    content: 'Just finished our 7-day wellness & cultural loop across Bali! Renting a scooter in Sidemen was the highlight of our trip—no crowds, pure green terraces, and warm locals welcoming us to their tea ceremonies.',
    tags: ['#BaliVibes', '#UbudHiddenGems', '#SlowTravel', '#SoloBackpacker'],
    highlights: ['Tukad Cepung Waterfall at 9 AM', 'Moksa Organic Kitchen in Sayan', 'Sidemen Rice Valley Walk']
  },
  {
    id: 'post-2',
    authorName: 'David Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'Food & Culture Connoisseur',
    destination: 'Tokyo, Japan',
    tripTitle: 'Secret Izakayas & Michelin Ramen in Tokyo',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
    days: 5,
    budgetSpent: 1200,
    likes: 512,
    isLiked: true,
    commentsCount: 45,
    timeAgo: 'Yesterday',
    content: 'If you are visiting Tokyo, do NOT miss Yanaka Ginza. It feels like stepping into Tokyo of the 1960s. Make sure to get the menchi katsu at the butcher shop near the stairs!',
    tags: ['#TokyoEats', '#JapanTravel', '#Omakase', '#YanakaGinza'],
    highlights: ['Shibuya Sky 360 at Golden Hour', 'Edomae Sushi Shin in Ginza', 'TeamLab Planets Water Maze']
  },
  {
    id: 'post-3',
    authorName: 'Aarav Mehta',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'High Altitude Trekker',
    destination: 'Ladakh, India',
    tripTitle: 'Biking Pangong Lake & Khardung La Pass (17,982 ft)',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    days: 8,
    budgetSpent: 650,
    likes: 428,
    isLiked: false,
    commentsCount: 39,
    timeAgo: '3 days ago',
    content: 'Riding down from Khardung La to Leh on mountain bikes was the greatest adrenaline rush of my life. Acclimatize for 2 full days in Leh before heading to Nubra or Pangong!',
    tags: ['#LadakhDiaries', '#Himalayas', '#AdventureTravel', '#IncredibleIndia'],
    highlights: ['Camping under Milky Way at Pangong', 'Diskit Monastery Giant Buddha', 'Turtuk Apricot Orchards']
  }
];

export const SAMPLE_TRAVEL_GROUPS: TravelGroup[] = [
  {
    id: 'group-1',
    name: 'Bali Island Hopping & Surf Crew',
    destination: 'Bali, Indonesia',
    dates: 'Nov 12 – Nov 20, 2026',
    membersCount: 4,
    maxMembers: 6,
    avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    style: 'Adventure & Surf',
    description: 'Looking for 2 more travel buddies to share a private luxury bamboo villa in Ubud and speedboat to Nusa Penida!'
  },
  {
    id: 'group-2',
    name: 'Swiss Alps Autumn Photography Trek',
    destination: 'Interlaken, Switzerland',
    dates: 'Oct 05 – Oct 12, 2026',
    membersCount: 3,
    maxMembers: 5,
    avatar: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=300&q=80',
    style: 'Photography & Hiking',
    description: 'Landscape photographers chasing golden larches and mirror lake reflections in Lauterbrunnen and Zermatt.'
  }
];

export const SAMPLE_PACKING_LIST: PackingCategory[] = [
  {
    name: 'Essential Documents',
    icon: 'FileText',
    items: [
      { id: 'p1', name: 'Passport & Physical Visa Copies', packed: true, essential: true },
      { id: 'p2', name: 'International Travel Insurance Card', packed: true, essential: true },
      { id: 'p3', name: 'Flight Boarding Passes & Hotel Vouchers', packed: true, essential: true },
      { id: 'p4', name: 'International Driving Permit (IDP)', packed: false, essential: false }
    ]
  },
  {
    name: 'Clothing & Footwear',
    icon: 'Shirt',
    items: [
      { id: 'p5', name: 'Lightweight Breathable Cotton / Linen Shirts (4x)', packed: true, essential: true },
      { id: 'p6', name: 'Swimwear & Microfiber Quick-Dry Towel', packed: true, essential: true },
      { id: 'p7', name: 'Sturdy Hiking Shoes / Trail Runners', packed: true, essential: true },
      { id: 'p8', name: 'Rain Jacket / Compact Windbreaker', packed: false, essential: true },
      { id: 'p9', name: 'Temple Modesty Sarong / Scarf', packed: false, essential: false }
    ]
  },
  {
    name: 'Electronics & Tech',
    icon: 'Smartphone',
    items: [
      { id: 'p10', name: 'Universal Travel Adapter (Type C/G/A)', packed: true, essential: true },
      { id: 'p11', name: '20,000 mAh Fast-Charging Power Bank', packed: true, essential: true },
      { id: 'p12', name: 'Noise-Canceling Headphones', packed: false, essential: false },
      { id: 'p13', name: 'Action Camera / GoPro with Waterproof Case', packed: true, essential: false }
    ]
  },
  {
    name: 'Health & Toiletries',
    icon: 'HeartPulse',
    items: [
      { id: 'p14', name: 'SPF 50+ Reef-Safe Sunscreen', packed: true, essential: true },
      { id: 'p15', name: 'DEET / Natural Mosquito Repellent Spray', packed: true, essential: true },
      { id: 'p16', name: 'Prescription Medication & First Aid Kit', packed: false, essential: true },
      { id: 'p17', name: 'Electrolyte Hydration Sachets (ORS)', packed: true, essential: true }
    ]
  }
];
