import { NextRequest } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'stream';
import { env } from '~/env';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('fileName');
  if (!fileName) {
    return new Response('Missing fileName', { status: 400 });
  }
  try {
    const uploadDir = path.join(process.cwd(), env.UPLOAD_PATH);
    const targetPath = path.join(uploadDir, fileName);
    // 파일이 존재하는지 확인
    if (!fs.existsSync(targetPath)) {
      return new Response('File not found', { status: 404 });
    }
    const stat = fs.statSync(targetPath);
    const fileStream = fs.createReadStream(targetPath);
    return new Response(fileStream as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
        'Content-Length': stat.size.toString(),
      },
    });
  } catch (err: any) {
    return new Response('Download failed: ' + err.message, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const fileName = req.headers.get('x-file-name');
  const chunkIndex = req.headers.get('x-chunk-index');
  const totalSize = req.headers.get('x-total-size');

  if (!fileName || !chunkIndex || !totalSize) {
    return new Response('Missing headers', { status: 400 });
  }

  try {
    const uploadDir = path.join(process.cwd(), env.UPLOAD_PATH);
    const targetPath = path.join(uploadDir, fileName);

    fs.mkdirSync(uploadDir, { recursive: true });

    const reader = req.body?.getReader();
    if (!reader) return new Response('No body', { status: 400 });

    const stream = new Readable({
      async read() {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null);
        } else {
          this.push(value);
        }
      },
    });

    // Append mode: 'a' ensures chunk is added to end
    const fileStream = fs.createWriteStream(targetPath, { flags: 'a' });

    await new Promise<void>((resolve, reject) => {
      stream.pipe(fileStream);
      fileStream.on('finish', resolve);
      fileStream.on('error', reject);
    });

    return new Response(JSON.stringify({ status: 'ok', chunkIndex }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response('Upload failed: ' + err.message, { status: 500 });
  }
}
