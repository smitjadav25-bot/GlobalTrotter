import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const ActivityTypes = {
  SIGHTSEEING: 'SIGHTSEEING',
  FOOD: 'FOOD',
  ADVENTURE: 'ADVENTURE',
  RELAXATION: 'RELAXATION',
  OTHER: 'OTHER',
} as const;

// 18 Comprehensive destinations across India (North, South, East, West, Central, and Himalayas)
const indiaCities = [
  {
    name: 'Jaipur',
    country: 'India',
    region: 'North India',
    costIndex: 0.95,
    popularity: 98,
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    description: 'The iconic Pink City of Rajasthan, famed for majestic forts like Amber Fort, Hawa Mahal, vibrant bazaars, and royal palaces.',
  },
  {
    name: 'Mumbai',
    country: 'India',
    region: 'West India',
    costIndex: 1.30,
    popularity: 97,
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    description: 'The vibrant financial and entertainment capital of India, home to the Gateway of India, Marine Drive, and Bollywood.',
  },
  {
    name: 'Delhi',
    country: 'India',
    region: 'North India',
    costIndex: 1.10,
    popularity: 96,
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    description: 'The historic capital showcasing millennia of Mughal and colonial heritage, bustling Chandni Chowk, Qutub Minar, and street food.',
  },
  {
    name: 'Agra',
    country: 'India',
    region: 'North India',
    costIndex: 0.85,
    popularity: 99,
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description: 'World-renowned city on the banks of the Yamuna River, home to the iconic Taj Mahal, Agra Fort, and Mughal architecture.',
  },
  {
    name: 'Goa',
    country: 'India',
    region: 'West India',
    costIndex: 1.05,
    popularity: 98,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'Tropical paradise celebrated for sun-kissed Arabian Sea beaches, Portuguese colonial churches, water sports, and beach shacks.',
  },
  {
    name: 'Varanasi',
    country: 'India',
    region: 'North India',
    costIndex: 0.75,
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'The spiritual heart of India on the sacred Ganges River, known for ancient ghats, evening Ganga Aarti, and sacred silk weaving.',
  },
  {
    name: 'Udaipur',
    country: 'India',
    region: 'North India',
    costIndex: 1.00,
    popularity: 94,
    imageUrl: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Lakes and Venice of the East, boasting romantic Lake Pichola, the regal City Palace, and sunset boat rides.',
  },
  {
    name: 'Kochi',
    country: 'India',
    region: 'South India',
    costIndex: 0.90,
    popularity: 93,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    description: 'Kerala port city combining historic Fort Kochi, cantilevered Chinese fishing nets, spice markets, and gateway to backwaters.',
  },
  {
    name: 'Bengaluru',
    country: 'India',
    region: 'South India',
    costIndex: 1.15,
    popularity: 92,
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    description: 'The Garden City and Silicon Valley of India, known for Cubbon Park, craft microbreweries, palace architecture, and tech culture.',
  },
  {
    name: 'Manali',
    country: 'India',
    region: 'Himalayas',
    costIndex: 0.85,
    popularity: 94,
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    description: 'High-altitude Himalayan resort town in Himachal Pradesh, surrounded by pine forests, snow-clad peaks, and Solang Valley.',
  },
  {
    name: 'Rishikesh',
    country: 'India',
    region: 'Himalayas',
    costIndex: 0.70,
    popularity: 93,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'The Yoga Capital of the World along the Himalayan foothills, famed for Ganges white-water rafting and suspension bridges.',
  },
  {
    name: 'Leh-Ladakh',
    country: 'India',
    region: 'Himalayas',
    costIndex: 1.20,
    popularity: 96,
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    description: 'High-desert mountain wonderland renowned for azure Pangong Tso Lake, ancient Buddhist monasteries, and Khardung La Pass.',
  },
  {
    name: 'Srinagar',
    country: 'India',
    region: 'Himalayas',
    costIndex: 0.90,
    popularity: 91,
    imageUrl: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    description: 'Paradise on Earth in the Kashmir Valley, famous for serene Dal Lake houseboats, traditional Shikaras, and Mughal terraced gardens.',
  },
  {
    name: 'Amritsar',
    country: 'India',
    region: 'North India',
    costIndex: 0.75,
    popularity: 93,
    imageUrl: 'https://assets.cntraveller.in/photos/670f8e406132a95797b4914a/16:9/w_1920,c_limit/GettyImages-142737748.jpg',
    description: 'Spiritual center of Sikhism housing the glistening Golden Temple, Langar community kitchen, and Wagah Border ceremony.',
  },
  {
    name: 'Kolkata',
    country: 'India',
    region: 'East India',
    costIndex: 0.80,
    popularity: 90,
    imageUrl: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
    description: 'The Cultural Capital of India, home to the Victoria Memorial, Howrah Bridge, literary festivals, and iconic Bengali sweets.',
  },
  {
    name: 'Hyderabad',
    country: 'India',
    region: 'South India',
    costIndex: 0.95,
    popularity: 92,
    imageUrl: 'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Pearls blending historic Charminar, Golconda Fort, and world-famous authentic Hyderabadi Dum Biryani.',
  },
  {
    name: 'Chennai',
    country: 'India',
    region: 'South India',
    costIndex: 0.90,
    popularity: 89,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    description: 'Cultural hub of Tamil Nadu featuring expansive Marina Beach, ancient Dravidian Kapaleeshwarar Temple, and classical arts.',
  },
  {
    name: 'Hampi',
    country: 'India',
    region: 'South India',
    costIndex: 0.70,
    popularity: 91,
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f443b74a?auto=format&fit=crop&w=1200&q=80',
    description: 'UNESCO World Heritage site among surreal boulder-strewn landscapes, boasting ancient Vijayanagara Empire stone temples and chariot.',
  },
];

// Rich India-centric catalog activities
const indiaActivities: Record<string, Array<{ name: string; type: string; cost: number; durationMinutes: number; description: string }>> = {
  Jaipur: [
    { name: 'Amber Fort & Sheesh Mahal Jeep Excursion', type: ActivityTypes.SIGHTSEEING, cost: 25.0, durationMinutes: 180, description: 'Explore the hilltop Rajput fortress and the breathtaking Hall of Mirrors (Sheesh Mahal).' },
    { name: 'Traditional Rajasthani Thali Dinner at Chokhi Dhani', type: ActivityTypes.FOOD, cost: 20.0, durationMinutes: 150, description: 'Feast on authentic Dal Baati Churma, Gatte ki Sabzi, and enjoy folk dance performances.' },
    { name: 'Hawa Mahal & City Palace Heritage Photography Walk', type: ActivityTypes.SIGHTSEEING, cost: 15.0, durationMinutes: 120, description: 'Marvel at the 953 honeycomb windows of Palace of Winds and royal courtyards.' },
    { name: 'Bagru Hand-Block Printing Artisan Workshop', type: ActivityTypes.RELAXATION, cost: 30.0, durationMinutes: 120, description: 'Create your own custom printed scarf using centuries-old natural vegetable dyes.' },
  ],
  Mumbai: [
    { name: 'Gateway of India & Colaba Heritage Walk', type: ActivityTypes.SIGHTSEEING, cost: 10.0, durationMinutes: 120, description: 'Walk past the historic Taj Mahal Palace Hotel and Victorian Gothic architecture.' },
    { name: 'Chowpatty Beach & Mohammed Ali Road Food Crawl', type: ActivityTypes.FOOD, cost: 18.0, durationMinutes: 150, description: 'Taste legendary Mumbai Pav Bhaji, Pani Puri, Bun Maska Chai, and spicy Kebabs.' },
    { name: 'Marine Drive Sunset & Elephanta Island Caves Ferry', type: ActivityTypes.ADVENTURE, cost: 22.0, durationMinutes: 240, description: 'Ferry across Mumbai Harbour to UNESCO rock-cut Hindu and Buddhist temple sculptures.' },
  ],
  Delhi: [
    { name: 'Old Delhi Chandni Chowk Rickshaw & Street Food Tour', type: ActivityTypes.FOOD, cost: 22.0, durationMinutes: 180, description: 'Navigate lively spice markets, Paranthe Wali Gali, and freshly fried Jalebis.' },
    { name: 'Qutub Minar & Humayun Tomb Mughal Heritage Tour', type: ActivityTypes.SIGHTSEEING, cost: 20.0, durationMinutes: 180, description: 'Visit the 73-meter minaret and the Persian-inspired garden tomb that inspired the Taj Mahal.' },
    { name: 'Peaceful Lotus Temple & Lodhi Art District Walk', type: ActivityTypes.RELAXATION, cost: 0.0, durationMinutes: 120, description: 'Experience the serene marble flower petals of the Bahá’í House of Worship and vibrant murals.' },
  ],
  Agra: [
    { name: 'Taj Mahal Sunrise Guided VIP Tour', type: ActivityTypes.SIGHTSEEING, cost: 35.0, durationMinutes: 180, description: 'Witness the morning sun illuminate the white marble wonder of the world with expert historian.' },
    { name: 'Agra Fort & Mughal Empire History Walk', type: ActivityTypes.SIGHTSEEING, cost: 18.0, durationMinutes: 120, description: 'Explore the red sandstone imperial palace of Mughal emperors overlooking the Yamuna.' },
    { name: 'Mughlai Cuisine & Agra Petha Tasting Trail', type: ActivityTypes.FOOD, cost: 15.0, durationMinutes: 90, description: 'Sample royal rich gravies, aromatic tandoor breads, and world-famous Agra pumpkin sweets.' },
  ],
  Goa: [
    { name: 'Calangute & Baga Beach Water Sports Adventure', type: ActivityTypes.ADVENTURE, cost: 40.0, durationMinutes: 180, description: 'Parasailing, jet skiing, and bumper boat rides along North Goa golden shores.' },
    { name: 'Old Goa Portuguese Cathedrals & Fontainhas Walk', type: ActivityTypes.SIGHTSEEING, cost: 12.0, durationMinutes: 150, description: 'Visit Basilica of Bom Jesus and Latin Quarter colorful colonial villas.' },
    { name: 'Goan Fish Curry & Beach Shack Sunset Dining', type: ActivityTypes.FOOD, cost: 25.0, durationMinutes: 120, description: 'Enjoy fresh kingfish fry, prawn vindaloo, and coconut kokum drinks with live music.' },
  ],
  Varanasi: [
    { name: 'Evening Ganga Aarti Boat Ceremony on Dashashwamedh', type: ActivityTypes.RELAXATION, cost: 15.0, durationMinutes: 120, description: 'Watch the mesmerizing ritual of brass lamps and chanting from a wooden boat on the river.' },
    { name: 'Sunrise Ganges Rowboat Tour & Ghats Discovery', type: ActivityTypes.SIGHTSEEING, cost: 12.0, durationMinutes: 90, description: 'See morning prayers, holy bathers, and ancient steps in the magical morning mist.' },
    { name: 'Kashi Vishwanath Corridor & Banarasi Paan Trail', type: ActivityTypes.FOOD, cost: 10.0, durationMinutes: 90, description: 'Taste Banarasi Kachori Sabzi, thick creamy Lassi in clay kulhads, and sweet Betel leaf.' },
  ],
  Udaipur: [
    { name: 'Lake Pichola Sunset Boat Cruise & Jagmandir Island', type: ActivityTypes.RELAXATION, cost: 28.0, durationMinutes: 90, description: 'Glide across the tranquil waters surrounded by fairy-tale palaces bathed in golden light.' },
    { name: 'Udaipur City Palace & Crystal Gallery Royal Tour', type: ActivityTypes.SIGHTSEEING, cost: 22.0, durationMinutes: 150, description: 'Discover Rajasthan largest palace complex with mirrored courtyards and lakeside balconies.' },
  ],
  Kochi: [
    { name: 'Traditional Kerala Ayurvedic Full-Body Massage', type: ActivityTypes.RELAXATION, cost: 35.0, durationMinutes: 90, description: 'Rejuvenating herbal oil massage using authentic centuries-old Kerala wellness practices.' },
    { name: 'Alleppey Backwaters Houseboat Day Cruise & Lunch', type: ActivityTypes.ADVENTURE, cost: 50.0, durationMinutes: 300, description: 'Cruise tranquil palm-fringed canals while savoring freshly caught Karimeen fish fry.' },
    { name: 'Fort Kochi Chinese Fishing Nets & Kathakali Show', type: ActivityTypes.SIGHTSEEING, cost: 18.0, durationMinutes: 150, description: 'Watch classical Kerala dance drama with elaborate makeup and dramatic expressions.' },
  ],
  Bengaluru: [
    { name: 'South Indian Filter Coffee & Crispy Dosa Crawl', type: ActivityTypes.FOOD, cost: 10.0, durationMinutes: 90, description: 'Taste legendary Benne Dosa at CTR and Vidyarthi Bhavan with piping hot brass filter coffee.' },
    { name: 'Lalbagh Botanical Garden Glasshouse Morning Walk', type: ActivityTypes.RELAXATION, cost: 5.0, durationMinutes: 120, description: 'Explore 240 acres of century-old tropical trees, lotus ponds, and London Crystal Palace replica.' },
    { name: 'Indiranagar Craft Microbrewery Hopping Tour', type: ActivityTypes.FOOD, cost: 30.0, durationMinutes: 180, description: 'Sample Belgian wits, IPAs, and artisanal fusion bites across Bengaluru top brewpubs.' },
  ],
  Manali: [
    { name: 'Solang Valley Paragliding & ATV Mountain Adventure', type: ActivityTypes.ADVENTURE, cost: 45.0, durationMinutes: 240, description: 'Tandem paragliding high above the snow peaks and roaring glacier streams.' },
    { name: 'Rohtang Pass Snow Excursion & Old Manali Cafe Trail', type: ActivityTypes.ADVENTURE, cost: 55.0, durationMinutes: 360, description: 'Ascend to 13,058 ft elevation for panoramic Himalayan vistas and alpine cafes.' },
  ],
  Rishikesh: [
    { name: 'Ganges White-Water River Rafting & Cliff Jump', type: ActivityTypes.ADVENTURE, cost: 25.0, durationMinutes: 180, description: 'Navigate Grade 3+ rapids through the scenic Himalayan river gorge with certified guides.' },
    { name: 'Sunset Yoga & Meditation on the Riverbanks', type: ActivityTypes.RELAXATION, cost: 10.0, durationMinutes: 90, description: 'Find inner tranquility with certified masters as evening bell chimes echo across the valley.' },
  ],
  'Leh-Ladakh': [
    { name: 'Pangong Tso High-Altitude Lake Camp Expedition', type: ActivityTypes.ADVENTURE, cost: 75.0, durationMinutes: 480, description: 'Witness color-shifting azure waters at 14,270 ft nestled between rugged desert mountains.' },
    { name: 'Thiksey & Hemis Ancient Monasteries Tour', type: ActivityTypes.SIGHTSEEING, cost: 20.0, durationMinutes: 180, description: 'Discover golden Buddha statues, sacred thangkas, and Tibetan monastic architecture.' },
  ],
  Srinagar: [
    { name: 'Sunset Shikara Ride & Floating Flower Market Tour', type: ActivityTypes.RELAXATION, cost: 20.0, durationMinutes: 120, description: 'Drift across serene Dal Lake reflections past lotus fields and floating vegetable gardens.' },
    { name: 'Nishat & Shalimar Mughal Terraced Gardens Walk', type: ActivityTypes.SIGHTSEEING, cost: 10.0, durationMinutes: 120, description: 'Stroll tiered fountains, Persian chinar trees, and spring tulip cascades.' },
  ],
  Amritsar: [
    { name: 'Golden Temple Darshan & Community Langar Experience', type: ActivityTypes.SIGHTSEEING, cost: 0.0, durationMinutes: 180, description: 'Visit the sacred Sarovar, hear divine Gurbani kirtan, and experience the world largest free kitchen.' },
    { name: 'Wagah Border Beating Retreat Ceremony VIP Viewing', type: ActivityTypes.ADVENTURE, cost: 15.0, durationMinutes: 180, description: 'Feel electric patriotic energy at the synchronized military border retreat ceremony.' },
  ],
  Kolkata: [
    { name: 'Victoria Memorial & Howrah Bridge Heritage Walk', type: ActivityTypes.SIGHTSEEING, cost: 10.0, durationMinutes: 150, description: 'Discover monumental British Raj marble architecture and the iconic cantilever bridge.' },
    { name: 'Kolkata Kathi Roll, Phuchka & Mishti Doi Trail', type: ActivityTypes.FOOD, cost: 12.0, durationMinutes: 120, description: 'Taste hot flaky chicken kathi rolls at Nizam and clay pot sweetened yogurt.' },
  ],
  Hyderabad: [
    { name: 'Charminar & Laad Bazaar Pearl Shopping Trail', type: ActivityTypes.SIGHTSEEING, cost: 10.0, durationMinutes: 120, description: 'Wander 16th-century grand minarets and traditional lacquered bangle markets.' },
    { name: 'Paradise Biryani & Irani Chai Bakery Experience', type: ActivityTypes.FOOD, cost: 15.0, durationMinutes: 90, description: 'Savor slow-cooked mutton Dum Biryani with mirchi ka salan and Osmania biscuits.' },
  ],
  Chennai: [
    { name: 'Kapaleeshwarar Temple & Mylapore Heritage Walk', type: ActivityTypes.SIGHTSEEING, cost: 10.0, durationMinutes: 120, description: 'Marvel at rainbow-hued Dravidian gopurams and sacred temple tank rituals.' },
    { name: 'Marina Beach Evening Breeze & Sundal Tasting', type: ActivityTypes.RELAXATION, cost: 5.0, durationMinutes: 90, description: 'Walk one of the longest urban beaches in the world with spiced roasted corn and sundal.' },
  ],
  Hampi: [
    { name: 'Virupaksha Temple & Stone Chariot Ruins Tour', type: ActivityTypes.SIGHTSEEING, cost: 15.0, durationMinutes: 240, description: 'Explore the grand 14th-century capital of the Vijayanagara Empire and musical stone pillars.' },
    { name: 'Sunset Coracle Boat Ride on Tungabhadra River', type: ActivityTypes.ADVENTURE, cost: 12.0, durationMinutes: 60, description: 'Navigate ancient circular reed boats through serene river boulders and hidden shrines.' },
  ],
};

async function main() {
  console.log('🇮🇳 Seeding GlobeTrotter database with India-exclusive data...');

  const passwordHash = await bcrypt.hash('password123', 10);
  const adminPasswordHash = await bcrypt.hash('adminpassword123', 10);

  // 1. Seed Demo User
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@globetrotter.app' },
    update: {
      passwordHash,
      role: 'USER',
      name: 'Aarav Patel',
      languagePref: 'en',
    },
    create: {
      id: 'demo-user-globetrotter-001',
      email: 'demo@globetrotter.app',
      passwordHash,
      name: 'Aarav Patel',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      role: 'USER',
      languagePref: 'en',
    },
  });

  // 2. Seed Admin User
  await prisma.user.upsert({
    where: { email: 'admin@globetrotter.app' },
    update: {
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      name: 'Priya Sharma (Admin)',
      languagePref: 'en',
    },
    create: {
      id: 'admin-user-globetrotter-001',
      email: 'admin@globetrotter.app',
      passwordHash: adminPasswordHash,
      name: 'Priya Sharma (Admin)',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      role: 'ADMIN',
      languagePref: 'en',
    },
  });

  // 3. Clear non-India references cleanly
  const nonIndiaCities = await prisma.city.findMany({
    where: { country: { not: 'India' } },
    select: { id: true },
  });
  const nonIndiaCityIds = nonIndiaCities.map((c) => c.id);

  if (nonIndiaCityIds.length > 0) {
    await prisma.savedDestination.deleteMany({
      where: { cityId: { in: nonIndiaCityIds } },
    });
    await prisma.stopActivity.deleteMany({
      where: { stop: { cityId: { in: nonIndiaCityIds } } },
    });
    await prisma.activity.deleteMany({
      where: {
        OR: [
          { cityId: { in: nonIndiaCityIds } },
          { stop: { cityId: { in: nonIndiaCityIds } } },
        ],
      },
    });
    await prisma.stop.deleteMany({
      where: { cityId: { in: nonIndiaCityIds } },
    });
    await prisma.city.deleteMany({
      where: { id: { in: nonIndiaCityIds } },
    });
  }

  // 4. Upsert India cities
  const createdCities: Record<string, any> = {};
  for (const cityData of indiaCities) {
    const cityId = `city-in-${cityData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const city = await prisma.city.upsert({
      where: { id: cityId },
      update: {
        name: cityData.name,
        country: cityData.country,
        region: cityData.region,
        costIndex: cityData.costIndex,
        popularity: cityData.popularity,
        description: cityData.description,
        imageUrl: cityData.imageUrl,
      },
      create: {
        id: cityId,
        name: cityData.name,
        country: cityData.country,
        region: cityData.region,
        costIndex: cityData.costIndex,
        popularity: cityData.popularity,
        imageUrl: cityData.imageUrl,
        description: cityData.description,
      },
    });
    createdCities[city.name] = city;

    // Seed activities for this city
    const acts = indiaActivities[city.name] || [];
    for (const act of acts) {
      const actId = `act-${city.id}-${act.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`.slice(0, 36);
      await prisma.activity.upsert({
        where: { id: actId },
        update: {
          cityId: city.id,
          name: act.name,
          type: act.type,
          cost: act.cost,
          durationMinutes: act.durationMinutes,
          description: act.description,
        },
        create: {
          id: actId,
          cityId: city.id,
          name: act.name,
          type: act.type,
          cost: act.cost,
          durationMinutes: act.durationMinutes,
          description: act.description,
        },
      });
    }
  }

  // 5. Seed Saved Wishlist for Demo User (Jaipur, Goa, Leh-Ladakh)
  const wishlistCities = ['Jaipur', 'Goa', 'Leh-Ladakh'];
  for (const wCity of wishlistCities) {
    if (createdCities[wCity]) {
      await prisma.savedDestination.upsert({
        where: {
          userId_cityId: {
            userId: demoUser.id,
            cityId: createdCities[wCity].id,
          },
        },
        update: {},
        create: {
          userId: demoUser.id,
          cityId: createdCities[wCity].id,
        },
      });
    }
  }

  // 6. Seed Featured Demo Trip 1: "Golden Triangle Heritage Circuit: Delhi, Agra & Jaipur"
  const goldenTriangleTrip = await prisma.trip.upsert({
    where: { shareSlug: 'golden-triangle-india-heritage' },
    update: {
      name: 'Golden Triangle Heritage Circuit: Delhi, Agra & Jaipur',
      description: 'The quintessential 7-day royal journey through India imperial past, exploring the Taj Mahal at sunrise, Mughal forts, and Jaipur pink palaces.',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      isPublic: true,
      budgetLimit: 850,
    },
    create: {
      userId: demoUser.id,
      name: 'Golden Triangle Heritage Circuit: Delhi, Agra & Jaipur',
      description: 'The quintessential 7-day royal journey through India imperial past, exploring the Taj Mahal at sunrise, Mughal forts, and Jaipur pink palaces.',
      startDate: new Date('2026-10-15T00:00:00.000Z'),
      endDate: new Date('2026-10-22T00:00:00.000Z'),
      coverPhotoUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      isPublic: true,
      shareSlug: 'golden-triangle-india-heritage',
      budgetLimit: 850,
    },
  });

  // Seed stops for Golden Triangle
  if (createdCities['Delhi'] && createdCities['Agra'] && createdCities['Jaipur']) {
    // Delhi Stop
    const delhiStop = await prisma.stop.upsert({
      where: { id: `gt-stop-delhi-${goldenTriangleTrip.id}` },
      update: {},
      create: {
        id: `gt-stop-delhi-${goldenTriangleTrip.id}`,
        tripId: goldenTriangleTrip.id,
        cityId: createdCities['Delhi'].id,
        arrivalDate: new Date('2026-10-15T00:00:00.000Z'),
        departureDate: new Date('2026-10-17T00:00:00.000Z'),
        orderIndex: 0,
      },
    });

    // Agra Stop
    const agraStop = await prisma.stop.upsert({
      where: { id: `gt-stop-agra-${goldenTriangleTrip.id}` },
      update: {},
      create: {
        id: `gt-stop-agra-${goldenTriangleTrip.id}`,
        tripId: goldenTriangleTrip.id,
        cityId: createdCities['Agra'].id,
        arrivalDate: new Date('2026-10-17T00:00:00.000Z'),
        departureDate: new Date('2026-10-19T00:00:00.000Z'),
        orderIndex: 1,
      },
    });

    // Jaipur Stop
    const jaipurStop = await prisma.stop.upsert({
      where: { id: `gt-stop-jaipur-${goldenTriangleTrip.id}` },
      update: {},
      create: {
        id: `gt-stop-jaipur-${goldenTriangleTrip.id}`,
        tripId: goldenTriangleTrip.id,
        cityId: createdCities['Jaipur'].id,
        arrivalDate: new Date('2026-10-19T00:00:00.000Z'),
        departureDate: new Date('2026-10-22T00:00:00.000Z'),
        orderIndex: 2,
      },
    });

    // Add activities to stops
    const dActs = indiaActivities['Delhi'] || [];
    for (let i = 0; i < dActs.length; i++) {
      const act = dActs[i];
      await prisma.activity.upsert({
        where: { id: `gt-act-delhi-${i}` },
        update: {},
        create: {
          id: `gt-act-delhi-${i}`,
          stopId: delhiStop.id,
          cityId: createdCities['Delhi'].id,
          name: act.name,
          type: act.type,
          cost: act.cost,
          durationMinutes: act.durationMinutes,
          description: act.description,
          scheduledDate: new Date('2026-10-15T00:00:00.000Z'),
          scheduledTime: `${10 + i * 3}:00`,
        },
      });
    }

    const aActs = indiaActivities['Agra'] || [];
    for (let i = 0; i < aActs.length; i++) {
      const act = aActs[i];
      await prisma.activity.upsert({
        where: { id: `gt-act-agra-${i}` },
        update: {},
        create: {
          id: `gt-act-agra-${i}`,
          stopId: agraStop.id,
          cityId: createdCities['Agra'].id,
          name: act.name,
          type: act.type,
          cost: act.cost,
          durationMinutes: act.durationMinutes,
          description: act.description,
          scheduledDate: new Date('2026-10-17T00:00:00.000Z'),
          scheduledTime: `${8 + i * 4}:00`,
        },
      });
    }

    const jActs = indiaActivities['Jaipur'] || [];
    for (let i = 0; i < jActs.length; i++) {
      const act = jActs[i];
      await prisma.activity.upsert({
        where: { id: `gt-act-jaipur-${i}` },
        update: {},
        create: {
          id: `gt-act-jaipur-${i}`,
          stopId: jaipurStop.id,
          cityId: createdCities['Jaipur'].id,
          name: act.name,
          type: act.type,
          cost: act.cost,
          durationMinutes: act.durationMinutes,
          description: act.description,
          scheduledDate: new Date('2026-10-20T00:00:00.000Z'),
          scheduledTime: `${9 + i * 3}:00`,
        },
      });
    }
  }

  // 7. Seed Demo Trip 2: "Kerala Backwaters & Coastal Escape"
  const keralaTrip = await prisma.trip.upsert({
    where: { shareSlug: 'kerala-backwaters-coastal-escape' },
    update: {},
    create: {
      userId: demoUser.id,
      name: 'Kerala Backwaters & Coastal Escape',
      description: 'Cruising through Alleppey backwater houseboats, experiencing Ayurvedic wellness spas, and fresh Arabian Sea coastal dining.',
      startDate: new Date('2026-11-05T00:00:00.000Z'),
      endDate: new Date('2026-11-12T00:00:00.000Z'),
      coverPhotoUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      isPublic: true,
      shareSlug: 'kerala-backwaters-coastal-escape',
      budgetLimit: 750,
    },
  });

  if (createdCities['Kochi'] && createdCities['Goa']) {
    const kochiStop = await prisma.stop.upsert({
      where: { id: `kb-stop-kochi-${keralaTrip.id}` },
      update: {},
      create: {
        id: `kb-stop-kochi-${keralaTrip.id}`,
        tripId: keralaTrip.id,
        cityId: createdCities['Kochi'].id,
        arrivalDate: new Date('2026-11-05T00:00:00.000Z'),
        departureDate: new Date('2026-11-09T00:00:00.000Z'),
        orderIndex: 0,
      },
    });

    const goaStop = await prisma.stop.upsert({
      where: { id: `kb-stop-goa-${keralaTrip.id}` },
      update: {},
      create: {
        id: `kb-stop-goa-${keralaTrip.id}`,
        tripId: keralaTrip.id,
        cityId: createdCities['Goa'].id,
        arrivalDate: new Date('2026-11-09T00:00:00.000Z'),
        departureDate: new Date('2026-11-12T00:00:00.000Z'),
        orderIndex: 1,
      },
    });

    const kActs = indiaActivities['Kochi'] || [];
    for (let i = 0; i < kActs.length; i++) {
      await prisma.activity.upsert({
        where: { id: `kb-act-kochi-${i}` },
        update: {},
        create: {
          id: `kb-act-kochi-${i}`,
          stopId: kochiStop.id,
          cityId: createdCities['Kochi'].id,
          name: kActs[i].name,
          type: kActs[i].type,
          cost: kActs[i].cost,
          durationMinutes: kActs[i].durationMinutes,
          description: kActs[i].description,
          scheduledDate: new Date('2026-11-06T00:00:00.000Z'),
          scheduledTime: '11:00',
        },
      });
    }

    const gActs = indiaActivities['Goa'] || [];
    for (let i = 0; i < gActs.length; i++) {
      await prisma.activity.upsert({
        where: { id: `kb-act-goa-${i}` },
        update: {},
        create: {
          id: `kb-act-goa-${i}`,
          stopId: goaStop.id,
          cityId: createdCities['Goa'].id,
          name: gActs[i].name,
          type: gActs[i].type,
          cost: gActs[i].cost,
          durationMinutes: gActs[i].durationMinutes,
          description: gActs[i].description,
          scheduledDate: new Date('2026-11-10T00:00:00.000Z'),
          scheduledTime: '14:00',
        },
      });
    }
  }

  console.log('✅ India-exclusive dataset successfully seeded!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
