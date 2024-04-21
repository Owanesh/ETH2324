import type { NextApiRequest, NextApiResponse } from 'next'
import { execSync } from 'child_process';

const generate = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function GET(
    req: NextApiRequest,
  ) {
    return Response.json({ service:"DOMPurify", ver:"2.0.16.1", note: 'Each request have its own secret', ext:"jpg", secret:generate(32) })
  }

  export function POST(
    req: NextApiRequest,
  ) {
    return Response.json({ message: 'Hello from Next.js!' })
  }

export async function PUT(
    req: NextApiRequest,
  ) {
    const randomStatusCode = Math.floor(Math.random() * (590 - 400 + 1)) + 400;

      const body = await req.json();
      // if body doesnt have filename, return error
      if (!body.filename) {
        return Response.json({ error: 'Missing filename parameter'},{ status: randomStatusCode });
      }
      const command = `echo "${body.filename}" | grep -q -E '\.jpg|\.png|\.webp|\.jpeg|\.avif|\.tiff' && echo 'Is an image' || echo 'Not an image'`;
      try {
        const output = execSync(command).toString().trim();
        return Response.json({ output });
      } catch (error) {
        console.error('Error executing command:', error);
        return Response.json({ error: 'Internal server error' });
      }
}



 