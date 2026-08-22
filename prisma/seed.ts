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
    name: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
    costIndex: 1.35,
    popularity: 98,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    description: 'A mesmerizing blend of neon-lit skyscrapers, historic temples, culinary mastery, and vibrant subcultures.',
  },
  {
    name: 'Paris',
    country: 'France',
    region: 'Western Europe',
    costIndex: 1.45,
    popularity: 96,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Light, world capital of art, fashion, gastronomy, and iconic romantic architecture.',
  },
  {
    name: 'Rome',
    country: 'Italy',
    region: 'Southern Europe',
    costIndex: 1.15,
    popularity: 94,
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    description: 'An open-air museum filled with millennia of ancient ruins, Renaissance art, and irresistible Italian cuisine.',
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    costIndex: 0.65,
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'An island paradise famous for lush rice terraces, sacred sea temples, surf breaks, and wellness sanctuaries.',
  },
  {
    name: 'New York City',
    country: 'United States',
    region: 'North America',
    costIndex: 1.70,
    popularity: 97,
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    description: 'The city that never sleeps, boasting world-class Broadway shows, landmark architecture, and unmatched energy.',
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    region: 'Southern Europe',
    costIndex: 1.05,
    popularity: 92,
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    description: 'A sun-drenched Mediterranean hub showcasing Gaudí masterpieces, beachside promenades, and vibrant tapas culture.',
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    costIndex: 0.75,
    popularity: 88,
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    description: 'A breathtaking coastal metropolis framed by Table Mountain, golden beaches, and world-class wine estates.',
  },
  {
    name: 'London',
    country: 'United Kingdom',
    region: 'Western Europe',
    costIndex: 1.55,
    popularity: 96,
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    description: 'A dynamic historic powerhouse packed with royal palaces, West End theatre, diverse markets, and green parks.',
  },
  {
    name: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    costIndex: 1.40,
    popularity: 91,
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    description: 'Harbour elegance meeting laid-back surf culture with iconic Opera House views and coastal cliff trails.',
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    region: 'Southeast Asia',
    costIndex: 0.60,
    popularity: 93,
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
    description: 'An electrifying sensory adventure of golden temples, buzzing floating markets, rooftop bars, and street food.',
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    costIndex: 1.50,
    popularity: 90,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    description: 'Futuristic grandeur featuring the Burj Khalifa, desert safaris, luxury marinas, and traditional spice souks.',
  },
  {
    name: 'Reykjavik',
    country: 'Iceland',
    region: 'Northern Europe',
    costIndex: 1.65,
    popularity: 87,
    imageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    description: 'Gateway to surreal volcanic landscapes, cascading geothermal waterfalls, geysers, and the Northern Lights.',
  },
  {
    name: 'Rio de Janeiro',
    country: 'Brazil',
    region: 'South America',
    costIndex: 0.70,
    popularity: 89,
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
    description: 'The Marvellous City known for Copacabana sands, Christ the Redeemer, samba rhythms, and lush jungle peaks.',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    region: 'East Asia',
    costIndex: 1.20,
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'The ancient imperial heart of Japan, boasting thousands of classical Buddhist temples, gardens, and geisha districts.',
  },
  {
    name: 'Amsterdam',
    country: 'Netherlands',
    region: 'Western Europe',
    costIndex: 1.30,
    popularity: 92,
    imageUrl: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
    description: 'A charming labyrinth of UNESCO canals, world-class museums, cycling paths, and historic gabled townhouses.',
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
