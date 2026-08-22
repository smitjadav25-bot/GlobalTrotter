import { cookies } from 'next/headers';
import prisma from './prisma';

export const DEMO_USER_ID = 'demo-user-globetrotter-001';

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const userIdCookie = cookieStore.get('gt_user_id')?.value;
    const targetUserId = userIdCookie || DEMO_USER_ID;

    let user = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!user) {
      // Create demo user if doesn't exist
      user = await prisma.user.upsert({
        where: { email: 'demo@globetrotter.app' },
        update: {},
        create: {
          id: DEMO_USER_ID,
          email: 'demo@globetrotter.app',
          name: 'Alex Rivera',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
      });
    }

    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

export async function getClientUserId(): Promise<string> {
  const user = await getCurrentUser();
  return user?.id || DEMO_USER_ID;
}
