import { getServerSession } from 'next-auth/next';
import { authOptions } from './authOptions';
import prisma from './prisma';

export const DEMO_USER_ID = 'demo-user-globetrotter-001';

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getAuthSession();
    if (session?.user && (session.user as any).id) {
      const user = await prisma.user.findUnique({
        where: { id: (session.user as any).id },
      });
      if (user) return user;
    }

    // Fallback to demo user if no active session
    let demoUser = await prisma.user.findUnique({
      where: { id: DEMO_USER_ID },
    });

    if (!demoUser) {
      demoUser = await prisma.user.findFirst({
        where: { email: 'demo@globetrotter.app' },
      });
    }

    return demoUser;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

export async function getClientUserId(): Promise<string> {
  const user = await getCurrentUser();
  return user?.id || DEMO_USER_ID;
}

export async function requireAuthUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}
