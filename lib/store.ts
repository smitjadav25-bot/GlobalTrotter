import { SAMPLE_DESTINATIONS, SAMPLE_TRIPS, SAMPLE_COMMUNITY_POSTS, SAMPLE_TRAVEL_GROUPS, SAMPLE_PACKING_LIST } from './mockData';
import { Destination, UserTrip, CommunityPost, TravelGroup, PackingCategory } from './types';

// In-memory global store initialized with rich data
class GlobalTrotterStore {
  private destinations: Destination[] = [...SAMPLE_DESTINATIONS];
  private trips: UserTrip[] = [...SAMPLE_TRIPS];
  private communityPosts: CommunityPost[] = [...SAMPLE_COMMUNITY_POSTS];
  private travelGroups: TravelGroup[] = [...SAMPLE_TRAVEL_GROUPS];
  private packingList: PackingCategory[] = JSON.parse(JSON.stringify(SAMPLE_PACKING_LIST));
  private savedDestinationIds: string[] = ['bali', 'tokyo', 'paris'];

  // Destinations
  getDestinations(): Destination[] {
    return this.destinations;
  }

  getDestinationById(id: string): Destination | undefined {
    return this.destinations.find((d) => d.id.toLowerCase() === id.toLowerCase());
  }

  // Trips
  getTrips(): UserTrip[] {
    return this.trips;
  }

  getTripById(id: string): UserTrip | undefined {
    return this.trips.find((t) => t.id === id);
  }

  addTrip(trip: UserTrip): UserTrip {
    this.trips.unshift(trip);
    return trip;
  }

  updateTrip(id: string, updates: Partial<UserTrip>): UserTrip | undefined {
    const index = this.trips.findIndex((t) => t.id === id);
    if (index === -1) return undefined;
    this.trips[index] = { ...this.trips[index], ...updates };
    return this.trips[index];
  }

  deleteTrip(id: string): boolean {
    const prevLength = this.trips.length;
    this.trips = this.trips.filter((t) => t.id !== id);
    return this.trips.length < prevLength;
  }

  duplicateTrip(id: string): UserTrip | undefined {
    const original = this.getTripById(id);
    if (!original) return undefined;
    const duplicated: UserTrip = {
      ...JSON.parse(JSON.stringify(original)),
      id: `trip-${Date.now()}`,
      name: `${original.name} (Copy)`,
      status: 'upcoming',
      startDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0],
    };
    this.trips.unshift(duplicated);
    return duplicated;
  }

  // Community
  getCommunityPosts(): CommunityPost[] {
    return this.communityPosts;
  }

  toggleLikePost(postId: string): CommunityPost | undefined {
    const post = this.communityPosts.find((p) => p.id === postId);
    if (!post) return undefined;
    if (post.isLiked) {
      post.likes -= 1;
      post.isLiked = false;
    } else {
      post.likes += 1;
      post.isLiked = true;
    }
    return post;
  }

  addCommunityPost(post: CommunityPost): CommunityPost {
    this.communityPosts.unshift(post);
    return post;
  }

  getTravelGroups(): TravelGroup[] {
    return this.travelGroups;
  }

  toggleJoinGroup(groupId: string): TravelGroup | undefined {
    const group = this.travelGroups.find((g) => g.id === groupId);
    if (!group) return undefined;
    if (group.joined) {
      group.membersCount -= 1;
      group.joined = false;
    } else {
      group.membersCount += 1;
      group.joined = true;
    }
    return group;
  }

  // Packing
  getPackingList(): PackingCategory[] {
    return this.packingList;
  }

  togglePackingItem(categoryId: number, itemId: string): PackingCategory[] {
    if (this.packingList[categoryId]) {
      const item = this.packingList[categoryId].items.find((i) => i.id === itemId);
      if (item) {
        item.packed = !item.packed;
      }
    }
    return this.packingList;
  }

  // Saved / Wishlist
  getSavedDestinationIds(): string[] {
    return this.savedDestinationIds;
  }

  toggleSaveDestination(destId: string): boolean {
    const exists = this.savedDestinationIds.includes(destId);
    if (exists) {
      this.savedDestinationIds = this.savedDestinationIds.filter((id) => id !== destId);
      return false;
    } else {
      this.savedDestinationIds.push(destId);
      return true;
    }
  }
}

// Global Singleton
const globalForStore = globalThis as unknown as { trotStore: GlobalTrotterStore };
export const trotStore = globalForStore.trotStore || new GlobalTrotterStore();
if (process.env.NODE_ENV !== 'production') globalForStore.trotStore = trotStore;
