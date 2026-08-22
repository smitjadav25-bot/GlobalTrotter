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
