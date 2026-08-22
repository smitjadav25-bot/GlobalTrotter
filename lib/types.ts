export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  costIndex: number; // 1.0 = baseline
  popularityScore: number; // 0-100
  rating: number; // 4.0 - 5.0
  reviewCount: number;
  bestTimeToVisit: string;
  idealDurationDays: string;
  currency: string;
  currencySymbol: string;
  language: string;
  timeZone: string;
  climate: 'Alpine' | 'Tropical' | 'Temperate' | 'Desert' | 'Coastal' | 'Mountain';
  coordinates: {
    lat: number;
    lng: number;
  };
  weather: {
    temp: number;
    condition: string;
    icon: string;
    forecast: {
      day: string;
      temp: number;
      condition: 'Sunny' | 'Rain' | 'Cloudy' | 'Snow' | 'Storm';
      indoorAlternative: string;
    }[];
  };
  placesToVisit: PlaceToVisit[];
  activities: DestinationActivity[];
  stays: StayItem[];
  transportation: TransportOption[];
  food: LocalDish[];
  hiddenGems: HiddenGem[];
  guides: LocalGuide[];
  safety: SafetyInfo;
}

export interface PlaceToVisit {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  openingHours: string;
  estimatedDuration: string;
  ticketPrice: number;
  description: string;
  highlights: string[];
  coordinates: { lat: number; lng: number };
}

export interface DestinationActivity {
  id: string;
  name: string;
  category: 'Adventure' | 'Culture' | 'Nature' | 'Food' | 'Nightlife' | 'Shopping' | 'Sightseeing';
  imageUrl: string;
  rating: number;
  reviews: number;
  durationMinutes: number;
  cost: number;
  description: string;
  badge?: string;
  intensity?: 'Easy' | 'Moderate' | 'High';
  includes?: string[];
  coordinates: { lat: number; lng: number };
}

export interface StayItem {
  id: string;
  name: string;
  type: 'Hotels' | 'Villas' | 'Homestays' | 'Hostels' | 'Resorts' | 'Cruises';
  imageUrl: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  distanceFromCenter: string;
  amenities: string[];
  aiScore: number; // 85 - 99
  badge?: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

export interface TransportOption {
  id: string;
  type: 'Flights' | 'Trains' | 'Buses' | 'Cabs' | 'Metro' | 'Self Drive' | 'Bike Rental';
  title: string;
  provider: string;
  duration: string;
  departure: string;
  arrival: string;
  price: number;
  frequency: string;
  ecoScore?: string;
  bookingUrl?: string;
}

export interface LocalDish {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  isVeg: boolean;
  price: number;
  restaurant: string;
  restaurantLocation: string;
  aiScore: number; // 90-99
  tags: string[];
}

export interface HiddenGem {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  crowdLevel: 'Very Low' | 'Low' | 'Medium';
  estimatedCost: number;
  bestTime: string;
  localSecretTip: string;
  coordinates: { lat: number; lng: number };
}

export interface LocalGuide {
  id: string;
  name: string;
  avatarUrl: string;
  verified: boolean;
  languages: string[];
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  specialty: string;
  dailyRate: number;
  bio: string;
  contactEmail: string;
}

export interface SafetyInfo {
  emergencyNumbers: {
    police: string;
    ambulance: string;
    fire: string;
    touristPolice: string;
  };
  nearbyHospitals: {
    name: string;
    distance: string;
    phone: string;
    rating: number;
  }[];
  nearbyPoliceStations: {
    name: string;
    distance: string;
    phone: string;
  }[];
  embassies: {
    country: string;
    address: string;
    phone: string;
  }[];
  safetyTips: string[];
}

export interface UserTrip {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  country: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  travelers: number;
  travelStyle: string;
  totalBudget: number;
  spentBudget: number;
  tripScore: number; // 0 - 100
  preferenceMatch: number; // %
  cities: string[];
  days: TripDay[];
  packingProgress: number; // 0 - 100
}

export interface TripDay {
  dayNumber: number;
  date: string;
  title: string;
  weather: {
    temp: number;
    condition: 'Sunny' | 'Rain' | 'Cloudy' | 'Snow' | 'Storm';
    rainAlert?: boolean;
    indoorAlternative?: string;
  };
  slots: {
    id: string;
    period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
    time: string;
    activityName: string;
    category: string;
    durationMinutes: number;
    travelTimeToNext: string;
    cost: number;
    imageUrl: string;
    foodSuggestion: string;
    nearbyAttractions: string[];
    coordinates: { lat: number; lng: number };
    isCustom?: boolean;
    weatherAdapted?: boolean;
  }[];
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorBadge: string;
  destination: string;
  tripTitle: string;
  coverImage: string;
  days: number;
  budgetSpent: number;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  timeAgo: string;
  content: string;
  tags: string[];
  highlights: string[];
}

export interface TravelGroup {
  id: string;
  name: string;
  destination: string;
  dates: string;
  membersCount: number;
  maxMembers: number;
  avatar: string;
  style: string;
  description: string;
  joined?: boolean;
}

export interface PackingCategory {
  name: string;
  icon: string;
  items: {
    id: string;
    name: string;
    packed: boolean;
    essential: boolean;
  }[];
}

export interface UserDTO {
  id: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
}

export interface PhotoDTO {
  id: string;
  url: string;
  filename: string;
  fileSize?: number | null;
  mimeType?: string | null;
  ownerId: string;
  tripId?: string | null;
  createdAt: string;
}

export interface CityDTO {
  id: string;
  name: string;
  country: string;
  costIndex: number;
  popularity: number;
  imageUrl: string;
  description?: string | null;
}

export interface ActivityDTO {
  id: string;
  stopId: string;
  name: string;
  type: string; // SIGHTSEEING, FOOD, ADVENTURE, RELAXATION, OTHER
  cost: number;
  durationMinutes: number;
  description?: string | null;
  imageUrl?: string | null;
  scheduledDate?: string | null;
  scheduledTime?: string | null;
  createdAt: string;
}

export interface StopDTO {
  id: string;
  tripId: string;
  cityId: string;
  city: CityDTO;
  arrivalDate: string;
  departureDate: string;
  orderIndex: number;
  activities: ActivityDTO[];
  createdAt: string;
}

export interface TripDTO {
  id: string;
  userId: string;
  name: string;
  description?: string | null;
  startDate: string;
  endDate: string;
  coverPhotoUrl?: string | null;
  isPublic: boolean;
  shareSlug: string;
  budgetLimit?: number | null;
  createdAt: string;
  updatedAt: string;
  stops?: StopDTO[];
  user?: UserDTO;
}

export interface BudgetBreakdownDTO {
  tripId: string;
  tripName: string;
  totalCost: number;
  budgetLimit: number | null;
  isOverBudget: boolean;
  totalDays: number;
  averageCostPerDay: number;
  byCategory: {
    category: string;
    total: number;
    percentage: number;
    count: number;
  }[];
  byDay: {
    date: string;
    dayNumber: number;
    total: number;
    activities: {
      name: string;
      cost: number;
      type: string;
    }[];
  }[];
  byCity: {
    cityName: string;
    country: string;
    total: number;
    stopsCount: number;
  }[];
}
