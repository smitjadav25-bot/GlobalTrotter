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
