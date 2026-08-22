import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { DEMO_USER_ID, getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user session' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, name, password } = body;

    const cookieStore = cookies();

    if (action === 'logout') {
      cookieStore.delete('gt_user_id');
      return NextResponse.json({ message: 'Logged out successfully' });
    }

    if (action === 'switch-to-demo') {
      cookieStore.set('gt_user_id', DEMO_USER_ID, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      const demoUser = await prisma.user.findUnique({ where: { id: DEMO_USER_ID } });
      return NextResponse.json({ message: 'Switched to Demo account', user: demoUser });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    if (action === 'signup') {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 400 });
      }

      const user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          avatarUrl: `https://avatar.vercel.sh/${encodeURIComponent(email)}.svg`,
        },
      });

      cookieStore.set('gt_user_id', user.id, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
      });

      return NextResponse.json({ message: 'Account created successfully', user }, { status: 201 });
    }

    // Login
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Auto-create or prompt
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          avatarUrl: `https://avatar.vercel.sh/${encodeURIComponent(email)}.svg`,
        },
      });
    }

    cookieStore.set('gt_user_id', user.id, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ message: 'Logged in successfully', user });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
