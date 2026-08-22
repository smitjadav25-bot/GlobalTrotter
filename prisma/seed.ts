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

const sampleCities = [
  {
    name: 'Ahmedabad',
    country: 'India',
    costIndex: 21.61,
    popularity: 91,
    imageUrl: 'https://www.facebook.com/groups/indiansolotravelers.in/posts/1710056243070351/',
    description: 'Where rich heritage meets modern business and vibrant Gujarati culture.',
  },
  {
    name: 'Delhi',
    country: 'India',
    costIndex: 21.78,
    popularity: 93,
    imageUrl: 'https://guide.planetofhotels.com/en/india/new-delhi',
    description: 'A historic capital where centuries of culture meet modern India.',
  },
  {
    name: 'Mumbai',
    country: 'India',
    costIndex: 25.6,
    popularity:95,
    imageUrl: 'https://en.wikipedia.org/wiki/Mumbai',
    description: 'The city of dreams, Bollywood, business, beaches and endless energy.',
  },
  {
    name: 'Jaypur',
    country: 'India',
    costIndex: 19.2,
    popularity: 92,
    imageUrl: 'https://en.wikipedia.org/wiki/Jaipur',
    description: 'The Pink City brings India’s royal history alive through forts, palaces and colorful markets.',
  },
  {
    name: 'Kerla',
    country: 'India',
    costIndex: 18–19 ,
    popularity: 93,
    imageUrl: 'https://www.bizarexpedition.com/travel-guide/kerala-complete-travel-guide',
    description: 'God’s Own Country combines peaceful backwaters, beaches, hills and rich traditions.',
  },
  {
    name: 'Agra',
    country: 'India',
    costIndex: 18–20,
    popularity: 94,
    imageUrl: 'https://foodandtravel.com/travel/48hours/agra',
    description: 'Home of the Taj Mahal, one of the world's most iconic symbols of love and architecture.',
  },
  {
    name: 'Udaipur',
    country: 'India',
    costIndex: 18–20,
    popularity: 93,
    imageUrl: 'https://beantowntraveller.com/2020/02/10/udaipur-two-day-itinerary-lake-pichola/',
    description: 'The City of Lakes charms visitors with royal palaces, beautiful lakes and romantic scenery.',
  },
  {
    name: 'Kashmir',
    country: 'India',
    costIndex: 18–22,
    popularity: 96,
    imageUrl: 'https://www.anubhavvacations.in/blog/places-to-visit-in-kashmir/',
    description: 'A breathtaking land of mountains, lakes and valleys often called paradise on Earth.',
  },
  {
    name: 'Manali',
    country: 'India',
    costIndex: 17-20 ,
    popularity: 96,
    imageUrl: 'https://timesofindia.indiatimes.com/travel/destinations/manali-on-your-mind-this-winter-heres-what-you-can-expect/articleshow/115938932.cms',
    description: 'A mountain escape perfect for scenic landscapes, adventure and peaceful holidays.',
  },
  {
    name: 'Lonavala',
    country: 'India',
    costIndex: 17-18,
    popularity: 93,
    imageUrl: 'https://www.indiamart.com/proddetail/lonavala-tour-16459525591.html?srsltid=AfmBOornM1Ft73Jn8vzC1cACx0YtyUXyD0ct7eURQrksvFSNK7LDGViR',
    description: 'Best place for monsoon',
  },
  {
    name: 'Varanasi',
    country: 'India',
    costIndex: 18-20,
    popularity: 91,
    imageUrl: 'https://www.pelago.com/en/varanasi-things-to-do-l20640/',
    description: 'An ancient spiritual city where the Ganges, temples and timeless traditions create a unique experience..',
  },
  {
    name: 'Rishikesh',
    country: 'India',
    costIndex: 16-18,
    popularity: 87,
    imageUrl: 'https://www.oyorooms.com/travel-guide/9-least-explored-tourist-attractions-in-rishikesh-for-a-quiet-summer-holiday/',
    description: 'The Yoga Capital of the World blends spirituality, the Ganges and Himalayan adventure.',
  },
  {
    name: 'Mysuru',
    country: 'India',
    costIndex: 18-20,
    popularity: 89,
    imageUrl: 'https://en.wikipedia.org/wiki/Mysore',
    description: 'Famous for its magnificent palace, royal heritage and grand Dasara celebrations.',
  },
  {
    name: 'Darjeeling',
    country: 'India',
    costIndex: 17-19,
    popularity: 95,
    imageUrl: 'https://www.sotc.in/blog/indian-holidays/why-is-darjeeling-called-the-queen-of-the-hills/',
    description: 'Famous for tea gardens, Himalayan views and the charming Darjeeling Himalayan Railway.',
  },
  {
    name: 'Ladakh',
    country: 'India',
    costIndex: 19-20,
    popularity: 97,
    imageUrl: 'https://www.incredibleindia.gov.in/en/ladakh',
    description: 'A spectacular high-altitude land of dramatic mountains, monasteries and unforgettable landscapes.',
  },
];
const cityActivities: Record<string, Array<{ name: string; type: string; cost: number; durationMinutes: number; description: string }>> = {
  Tokyo: [
    { name: 'TeamLab Planets Digital Art Immersion', type: ActivityTypes.SIGHTSEEING, cost: 38.0, durationMinutes: 120, description: 'Walk through water and immerse into boundaryless digital installations.' },
    { name: 'Tsukiji Outer Market Gourmet Street Food Tour', type: ActivityTypes.FOOD, cost: 55.0, durationMinutes: 150, description: 'Sample fresh sashimi, tamagoyaki, wagyu skewers, and matcha sweets.' },
    { name: 'Shibuya Sky & Harajuku Culture Walk', type: ActivityTypes.SIGHTSEEING, cost: 22.0, durationMinutes: 180, description: 'Panoramic 360 observation deck over the iconic Shibuya scramble.' },
    { name: 'Traditional Asakusa Rickshaw & Senso-ji Tour', type: ActivityTypes.RELAXATION, cost: 45.0, durationMinutes: 60, description: 'Explore Tokyo oldest temple district guided by a traditional runner.' },
  ],
  Kyoto: [
    { name: 'Fushimi Inari 10,000 Torii Gates Morning Hike', type: ActivityTypes.SIGHTSEEING, cost: 0.0, durationMinutes: 150, description: 'Ascend Mount Inari through winding vermilion shrine gates.' },
    { name: 'Arashiyama Bamboo Grove & Tenryu-ji Temple', type: ActivityTypes.RELAXATION, cost: 15.0, durationMinutes: 120, description: 'Wander towering green bamboo stalks and Zen rock gardens.' },
    { name: 'Authentic Uji Matcha Tea Ceremony Workshop', type: ActivityTypes.FOOD, cost: 40.0, durationMinutes: 90, description: 'Learn traditional Chanoyu whisking methods in an ancient machiya.' },
  ],
  Paris: [
    { name: 'Louvre Masterpieces & Mona Lisa Guided Tour', type: ActivityTypes.SIGHTSEEING, cost: 65.0, durationMinutes: 180, description: 'Skip the line to see the world most celebrated art treasures.' },
    { name: 'Sunset Seine River Cruise with Champagne', type: ActivityTypes.RELAXATION, cost: 35.0, durationMinutes: 75, description: 'Admire the Eiffel Tower, Notre-Dame, and bridges illuminated at dusk.' },
    { name: 'Montmartre Secret Bakeries & Pastry Crawl', type: ActivityTypes.FOOD, cost: 50.0, durationMinutes: 120, description: 'Taste award-winning croissants, macarons, and artisanal cheeses.' },
  ],
  Rome: [
    { name: 'Colosseum Underground & Ancient Roman Forum', type: ActivityTypes.SIGHTSEEING, cost: 75.0, durationMinutes: 180, description: 'Walk where gladiators prepared beneath the arena floor.' },
    { name: 'Handmade Pasta & Tiramisu Cooking Class', type: ActivityTypes.FOOD, cost: 65.0, durationMinutes: 180, description: 'Master fettuccine from scratch in a Trastevere courtyard.' },
    { name: 'Vatican Museums & Sistine Chapel Early Access', type: ActivityTypes.SIGHTSEEING, cost: 85.0, durationMinutes: 210, description: 'Marvel at Michelangelo frescoes before crowds arrive.' },
  ],
  Bali: [
    { name: 'Ubud Jungle Swing & Tegalalang Rice Terraces', type: ActivityTypes.ADVENTURE, cost: 30.0, durationMinutes: 180, description: 'Soar above lush jungle ravines and walk emerald stepped fields.' },
    { name: 'Mount Batur Sunrise Volcano Trek & Hot Springs', type: ActivityTypes.ADVENTURE, cost: 45.0, durationMinutes: 360, description: 'Early morning hike for sunrise above the clouds, followed by hot springs.' },
    { name: 'Traditional Balinese Herbal Spa & Flower Bath', type: ActivityTypes.RELAXATION, cost: 35.0, durationMinutes: 120, description: 'Soothing massage with aromatic oils and organic petal soak.' },
  ],
  'New York City': [
    { name: 'Summit One Vanderbilt Glass Skydeck Experience', type: ActivityTypes.SIGHTSEEING, cost: 46.0, durationMinutes: 90, description: 'Multi-sensory mirrored observation deck overlooking Midtown Manhattan.' },
    { name: 'High Line Park & Chelsea Market Food Tasting', type: ActivityTypes.FOOD, cost: 40.0, durationMinutes: 150, description: 'Walk the elevated rail trail and taste lobster rolls and tacos.' },
    { name: 'Central Park Bike Tour & Bethesda Fountain', type: ActivityTypes.ADVENTURE, cost: 28.0, durationMinutes: 120, description: 'Pedal through scenic lake paths, Strawberry Fields, and bridges.' },
  ],
  Barcelona: [
    { name: 'Sagrada Família Fast-Track Tower Access', type: ActivityTypes.SIGHTSEEING, cost: 36.0, durationMinutes: 120, description: 'Step inside Gaudí forest of stained glass columns.' },
    { name: 'Gothic Quarter Tapas & Sangria Evening Walk', type: ActivityTypes.FOOD, cost: 55.0, durationMinutes: 180, description: 'Sample Iberian ham, patatas bravas, and pintxos in medieval taverns.' },
  ],
  London: [
    { name: 'Tower of London & Crown Jewels Exhibition', type: ActivityTypes.SIGHTSEEING, cost: 40.0, durationMinutes: 150, description: 'Explore ancient fortresses, Yeoman Warders, and royal crowns.' },
    { name: 'Borough Market Artisanal Street Food Safari', type: ActivityTypes.FOOD, cost: 35.0, durationMinutes: 120, description: 'Savor gourmet scotch eggs, melted raclette, and salt beef bagels.' },
  ],
};

async function main() {
  console.log('🌱 Seeding GlobeTrotter database...');

  // Password hash for demo and admin
  const passwordHash = await bcrypt.hash('password123', 10);
  const adminPasswordHash = await bcrypt.hash('adminpassword123', 10);

  // 1. Seed Demo User
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@globetrotter.app' },
    update: {
      passwordHash,
      role: 'USER',
      languagePref: 'en',
    },
    create: {
      id: 'demo-user-globetrotter-001',
      email: 'demo@globetrotter.app',
      passwordHash,
      name: 'Alex Rivera',
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
      languagePref: 'en',
    },
    create: {
      id: 'admin-user-globetrotter-001',
      email: 'admin@globetrotter.app',
      passwordHash: adminPasswordHash,
      name: 'Sarah Admin',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      role: 'ADMIN',
      languagePref: 'en',
    },
  });

  // 3. Seed Cities & Catalog Activities
  const createdCities: Record<string, any> = {};
  for (const cityData of sampleCities) {
    const city = await prisma.city.upsert({
      where: { id: `city-${cityData.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {
        region: cityData.region,
        costIndex: cityData.costIndex,
        popularity: cityData.popularity,
        description: cityData.description,
        imageUrl: cityData.imageUrl,
      },
      create: {
        id: `city-${cityData.name.toLowerCase().replace(/\s+/g, '-')}`,
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
    const acts = cityActivities[city.name] || [];
    for (const act of acts) {
      await prisma.activity.upsert({
        where: { id: `act-${city.id}-${act.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`.slice(0, 36) },
        update: {
          cityId: city.id,
          cost: act.cost,
          durationMinutes: act.durationMinutes,
          description: act.description,
        },
        create: {
          id: `act-${city.id}-${act.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`.slice(0, 36),
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

  // 4. Seed Saved Wishlist for Demo User
  if (createdCities['Rome']) {
    await prisma.savedDestination.upsert({
      where: {
        userId_cityId: {
          userId: demoUser.id,
          cityId: createdCities['Rome'].id,
        },
      },
      update: {},
      create: {
        userId: demoUser.id,
        cityId: createdCities['Rome'].id,
      },
    });
  }

  if (createdCities['Bali']) {
    await prisma.savedDestination.upsert({
      where: {
        userId_cityId: {
          userId: demoUser.id,
          cityId: createdCities['Bali'].id,
        },
      },
      update: {},
      create: {
        userId: demoUser.id,
        cityId: createdCities['Bali'].id,
      },
    });
  }

  // 5. Seed Featured Demo Trip: "Japan Cultural Odyssey"
  const demoTrip = await prisma.trip.upsert({
    where: { shareSlug: 'japan-cultural-odyssey' },
    update: {},
    create: {
      userId: demoUser.id,
      name: 'Japan Cultural Odyssey: Tokyo to Kyoto',
      description: 'An unforgettable 10-day expedition exploring the neon futuristic heart of Tokyo and the timeless Zen shrines of Kyoto.',
      startDate: new Date('2026-10-10T00:00:00.000Z'),
      endDate: new Date('2026-10-20T00:00:00.000Z'),
      coverPhotoUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      isPublic: true,
      shareSlug: 'japan-cultural-odyssey',
      budgetLimit: 2500,
    },
  });

  // 6. Seed Stops
  if (createdCities['Tokyo'] && createdCities['Kyoto']) {
    const tokyoStop = await prisma.stop.upsert({
      where: { id: `demo-stop-tokyo-${demoTrip.id}` },
      update: {},
      create: {
        id: `demo-stop-tokyo-${demoTrip.id}`,
        tripId: demoTrip.id,
        cityId: createdCities['Tokyo'].id,
        arrivalDate: new Date('2026-10-10T00:00:00.000Z'),
        departureDate: new Date('2026-10-15T00:00:00.000Z'),
        orderIndex: 0,
      },
    });

    const kyotoStop = await prisma.stop.upsert({
      where: { id: `demo-stop-kyoto-${demoTrip.id}` },
      update: {},
      create: {
        id: `demo-stop-kyoto-${demoTrip.id}`,
        tripId: demoTrip.id,
        cityId: createdCities['Kyoto'].id,
        arrivalDate: new Date('2026-10-15T00:00:00.000Z'),
        departureDate: new Date('2026-10-20T00:00:00.000Z'),
        orderIndex: 1,
      },
    });

    // Seed direct activities on stops
    const tokyoActivities = cityActivities['Tokyo'] || [];
    for (let i = 0; i < tokyoActivities.length; i++) {
      const act = tokyoActivities[i];
      const scheduledDate = new Date('2026-10-10T00:00:00.000Z');
      scheduledDate.setDate(scheduledDate.getDate() + (i + 1));

      await prisma.activity.upsert({
        where: { id: `demo-act-tokyo-${i}` },
        update: {},
        create: {
          id: `demo-act-tokyo-${i}`,
          stopId: tokyoStop.id,
          cityId: createdCities['Tokyo'].id,
          name: act.name,
          type: act.type,
          cost: act.cost,
          durationMinutes: act.durationMinutes,
          description: act.description,
          scheduledDate,
          scheduledTime: `${9 + i * 3}:00`,
        },
      });
    }

    const kyotoActivities = cityActivities['Kyoto'] || [];
    for (let i = 0; i < kyotoActivities.length; i++) {
      const act = kyotoActivities[i];
      const scheduledDate = new Date('2026-10-15T00:00:00.000Z');
      scheduledDate.setDate(scheduledDate.getDate() + (i + 1));

      await prisma.activity.upsert({
        where: { id: `demo-act-kyoto-${i}` },
        update: {},
        create: {
          id: `demo-act-kyoto-${i}`,
          stopId: kyotoStop.id,
          cityId: createdCities['Kyoto'].id,
          name: act.name,
          type: act.type,
          cost: act.cost,
          durationMinutes: act.durationMinutes,
          description: act.description,
          scheduledDate,
          scheduledTime: `${10 + i * 3}:00`,
        },
      });
    }
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
