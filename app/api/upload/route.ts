import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const tripId = formData.get('tripId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Please upload a JPEG, PNG, or WebP image.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File exceeds 5MB maximum size limit.' },
        { status: 400 }
      );
    }

    // Prepare destination
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const ext = path.extname(file.name) || `.${file.type.split('/')[1] || 'jpg'}`;
    const uniqueName = `${crypto.randomUUID()}${ext.toLowerCase()}`;
    const filePath = path.join(uploadsDir, uniqueName);

    // Save to disk
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;

    // Save photo record to SQLite database
    const photo = await prisma.photo.create({
      data: {
        url: publicUrl,
        filename: file.name,
        fileSize: file.size,
        mimeType: file.type,
        ownerId: user.id,
        tripId: tripId || null,
      },
    });

    return NextResponse.json(
      {
        message: 'File uploaded successfully',
        photo: {
          id: photo.id,
          url: photo.url,
          filename: photo.filename,
          fileSize: photo.fileSize,
          mimeType: photo.mimeType,
          createdAt: photo.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Internal server error while saving file.' },
      { status: 500 }
    );
  }
}
