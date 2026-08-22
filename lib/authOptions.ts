import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'globetrotter-hackathon-secret-key-super-secure-2026',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        isDemo: { label: 'Demo', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Fast-track 1-Click Demo login
        if (credentials.isDemo === 'true') {
          const demoUser = await prisma.user.findFirst({
            where: { email: 'demo@globetrotter.app' },
          });
          if (demoUser) {
            return {
              id: demoUser.id,
              email: demoUser.email,
              name: demoUser.name,
              image: demoUser.avatarUrl,
              role: demoUser.role,
              languagePref: demoUser.languagePref,
            };
          }
        }

        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error('Please enter both email and password.');
        }

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase().trim() },
        });

        if (!user || !user.passwordHash) {
          throw new Error('No account found with this email address.');
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
          throw new Error('Invalid email or password.');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatarUrl,
          role: user.role,
          languagePref: user.languagePref,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'USER';
        token.avatarUrl = user.image || (user as any).avatarUrl;
        token.languagePref = (user as any).languagePref || 'en';
      }
      if (trigger === 'update' && session) {
        if (session.name) token.name = session.name;
        if (session.avatarUrl) token.avatarUrl = session.avatarUrl;
        if (session.languagePref) token.languagePref = session.languagePref;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = (token.role as string) || 'USER';
        (session.user as any).avatarUrl = token.avatarUrl as string;
        (session.user as any).languagePref = (token.languagePref as string) || 'en';
      }
      return session;
    },
  },
};
