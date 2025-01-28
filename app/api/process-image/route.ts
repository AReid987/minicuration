import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';
import { Buffer } from 'node:buffer';

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const imageFile = data.get('image') as Blob | null;

  if (!imageFile) {
    return NextResponse.json({ message: 'No image file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());

  try {
    const processedImage = await sharp(buffer)
      .resize(816, 1110, { fit: 'inside', withoutEnlargement: true })
      .toFormat('jpeg')
      .toBuffer();

    return new NextResponse(processedImage, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
      status: 200,
    });
  } catch (error) {
    console.error("Image processing error:", error);
    return NextResponse.json({ message: 'Image processing failed', error: error }, { status: 500 });
  }
}
