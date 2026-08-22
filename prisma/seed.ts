import { PrismaClient } from '@prisma/client';

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
    costIndex: 1.35,
    popularity: 98,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    description: 'A mesmerizing blend of neon-lit skyscrapers, historic temples, culinary mastery, and vibrant subcultures.',
  },
  {
    name: 'Paris',
    country: 'France',
    costIndex: 1.45,
    popularity: 96,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Light, world capital of art, fashion, gastronomy, and iconic romantic architecture.',
  },
  {
    name: 'Rome',
    country: 'Italy',
    costIndex: 1.15,
    popularity: 94,
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    description: 'An open-air museum filled with millennia of ancient ruins, Renaissance art, and irresistible Italian cuisine.',
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    costIndex: 0.65,
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'An island paradise famous for lush rice terraces, sacred sea temples, surf breaks, and wellness sanctuaries.',
  },
  {
    name: 'New York City',
    country: 'United States',
    costIndex: 1.70,
    popularity: 97,
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    description: 'The city that never sleeps, boasting world-class Broadway shows, landmark architecture, and unmatched energy.',
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    costIndex: 1.05,
    popularity: 92,
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    description: 'A sun-drenched Mediterranean hub showcasing Gaudí masterpieces, beachside promenades, and vibrant tapas culture.',
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    costIndex: 0.75,
    popularity: 88,
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    description: 'Dramatic coastal scenery flanked by Table Mountain, golden beaches, vineyards, and rich cultural history.',
  },
  {
    name: 'London',
    country: 'United Kingdom',
    costIndex: 1.55,
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    description: 'A global crossroads where royal heritage meets modern theatre, premier museums, and cosmopolitan dining.',
  },
  {
    name: 'Sydney',
    country: 'Australia',
    costIndex: 1.40,
    popularity: 90,
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    description: 'Stunning harbor city renowned for the Sydney Opera House, Bondi Beach, coastal walks, and sunny lifestyle.',
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    costIndex: 0.55,
    popularity: 93,
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
    description: 'Thriving street life, ornate golden shrines, floating markets, and an exhilarating culinary scene.',
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    costIndex: 1.50,
    popularity: 91,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    description: 'A futuristic oasis of record-breaking towers, luxury shopping, desert adventures, and palm-fringed resorts.',
  },
  {
    name: 'Reykjavik',
    country: 'Iceland',
    costIndex: 1.65,
    popularity: 87,
    imageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    description: 'Gateway to surreal volcanic landscapes, geothermal lagoons, cascading waterfalls, and the Northern Lights.',
  },
  {
    name: 'Rio de Janeiro',
    country: 'Brazil',
    costIndex: 0.70,
    popularity: 89,
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
    description: 'Breathtaking mountains meeting golden shores, pulsating Samba rhythms, and the iconic Christ the Redeemer.',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    costIndex: 1.20,
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'Japan’s cultural heart with thousands of classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.',
  },
  {
    name: 'Amsterdam',
    country: 'Netherlands',
    costIndex: 1.30,
    popularity: 93,
    imageUrl: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
    description: 'Picturesque canal rings, artistic legacy, historic gabled houses, and bicycle-friendly European charm.',
  },
];

async function main() {
  console.log('🌱 Starting GlobeTrotter database seed (SQLite)...');

  // 1. Seed Cities
  console.log(`📍 Seeding ${sampleCities.length} global cities...`);
  const cityMap = new Map<string, string>();

  for (const cityData of sampleCities) {
    const existing = await prisma.city.findFirst({
      where: { name: cityData.name, country: cityData.country },
    });

    if (existing) {
      const updated = await prisma.city.update({
        where: { id: existing.id },
        data: cityData,
      });
      cityMap.set(cityData.name, updated.id);
    } else {
      const created = await prisma.city.create({
        data: cityData,
      });
      cityMap.set(cityData.name, created.id);
    }
  }

  // 2. Create Demo User
  console.log('👤 Seeding demo user...');
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@globetrotter.app' },
    update: {
      name: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    create: {
      id: 'demo-user-globetrotter-001',
      email: 'demo@globetrotter.app',
      name: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
  });

  // 3. Seed Demo Trip: "Japan Cultural Odyssey: Tokyo & Kyoto"
  console.log('✈️ Seeding demo featured trip...');
  const tokyoCityId = cityMap.get('Tokyo');
  const kyotoCityId = cityMap.get('Kyoto');

  if (tokyoCityId && kyotoCityId) {
    const demoTrip = await prisma.trip.upsert({
      where: { shareSlug: 'japan-cultural-odyssey' },
      update: {
        name: 'Japan Cultural Odyssey: Tokyo to Kyoto',
        description: 'An unforgettable 10-day expedition exploring the neon futuristic heart of Tokyo and the timeless Zen shrines of Kyoto.',
        startDate: new Date('2026-10-10'),
        endDate: new Date('2026-10-20'),
        coverPhotoUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80',
        isPublic: true,
        budgetLimit: 2500,
      },
      create: {
        userId: demoUser.id,
        name: 'Japan Cultural Odyssey: Tokyo to Kyoto',
        description: 'An unforgettable 10-day expedition exploring the neon futuristic heart of Tokyo and the timeless Zen shrines of Kyoto.',
        startDate: new Date('2026-10-10'),
        endDate: new Date('2026-10-20'),
        coverPhotoUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80',
        isPublic: true,
        shareSlug: 'japan-cultural-odyssey',
        budgetLimit: 2500,
      },
    });

    // Clean previous demo stops if any
    await prisma.stop.deleteMany({
      where: { tripId: demoTrip.id },
    });

    // Create Stop 1: Tokyo
    const stopTokyo = await prisma.stop.create({
      data: {
        tripId: demoTrip.id,
        cityId: tokyoCityId,
        arrivalDate: new Date('2026-10-10'),
        departureDate: new Date('2026-10-15'),
        orderIndex: 0,
      },
    });

    // Activities for Tokyo
    await prisma.activity.createMany({
      data: [
        {
          stopId: stopTokyo.id,
          name: 'TeamLab Planets Digital Art Immersion',
          type: ActivityTypes.SIGHTSEEING,
          cost: 38.0,
          durationMinutes: 120,
          description: 'Walk through water and explore an interactive museum of body-immersive digital artworks.',
          imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
          scheduledDate: new Date('2026-10-11'),
          scheduledTime: '10:00',
        },
        {
          stopId: stopTokyo.id,
          name: 'Tsukiji Outer Market Gourmet Street Food Tour',
          type: ActivityTypes.FOOD,
          cost: 55.0,
          durationMinutes: 150,
          description: 'Taste fresh sushi, tamagoyaki, grilled wagyu, and matcha treats guided by a local culinary expert.',
          imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
          scheduledDate: new Date('2026-10-12'),
          scheduledTime: '11:30',
        },
        {
          stopId: stopTokyo.id,
          name: 'Shibuya Sky & Harajuku Culture Walk',
          type: ActivityTypes.SIGHTSEEING,
          cost: 22.0,
          durationMinutes: 180,
          description: 'Panoramic 360-degree open-air rooftop views followed by quirky vintage shopping along Takeshita Street.',
          imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
          scheduledDate: new Date('2026-10-13'),
          scheduledTime: '15:00',
        },
      ],
    });

    // Create Stop 2: Kyoto
    const stopKyoto = await prisma.stop.create({
      data: {
        tripId: demoTrip.id,
        cityId: kyotoCityId,
        arrivalDate: new Date('2026-10-15'),
        departureDate: new Date('2026-10-20'),
        orderIndex: 1,
      },
    });

    // Activities for Kyoto
    await prisma.activity.createMany({
      data: [
        {
          stopId: stopKyoto.id,
          name: 'Fushimi Inari 10,000 Torii Gates Morning Hike',
          type: ActivityTypes.SIGHTSEEING,
          cost: 0.0,
          durationMinutes: 150,
          description: 'Wander through endless vibrant vermillion torii gates winding through holy Mount Inari forest.',
          imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
          scheduledDate: new Date('2026-10-16'),
          scheduledTime: '07:30',
        },
        {
          stopId: stopKyoto.id,
          name: 'Arashiyama Bamboo Grove & Tenryu-ji Temple',
          type: ActivityTypes.RELAXATION,
          cost: 15.0,
          durationMinutes: 120,
          description: 'Immerse in the rustling green bamboo forest and stroll peaceful 14th-century Zen garden ponds.',
          imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
          scheduledDate: new Date('2026-10-17'),
          scheduledTime: '13:00',
        },
        {
          stopId: stopKyoto.id,
          name: 'Authentic Uji Matcha Tea Ceremony Workshop',
          type: ActivityTypes.FOOD,
          cost: 40.0,
          durationMinutes: 75,
          description: 'Learn the sacred philosophy and precise ritual of whisking ceremonial-grade matcha with traditional sweets.',
          imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
          scheduledDate: new Date('2026-10-18'),
          scheduledTime: '14:30',
        },
      ],
    });

    console.log('✅ Demo featured trip successfully seeded with stops and activities!');
  }

  // 4. Seed Saved Destinations for Demo User
  if (tokyoCityId && kyotoCityId) {
    const parisId = cityMap.get('Paris');
    const baliId = cityMap.get('Bali');
    const citiesToSave = [tokyoCityId, kyotoCityId, parisId, baliId].filter(Boolean) as string[];

    for (const cityId of citiesToSave) {
      await prisma.savedDestination.upsert({
        where: {
          userId_cityId: {
            userId: demoUser.id,
            cityId: cityId,
          },
        },
        update: {},
        create: {
          userId: demoUser.id,
          cityId: cityId,
        },
      });
    }
  }

  console.log('🎉 GlobeTrotter database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
