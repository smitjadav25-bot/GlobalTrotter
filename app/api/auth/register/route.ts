import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      const errorMsg = result.error.errors[0]?.message || 'Invalid registration data';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, password } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
        role: 'USER',
        languagePref: 'en',
        avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80`,
      },
    });

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error during user registration:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error during registration.' },
      { status: 500 }
    );
  }
}
