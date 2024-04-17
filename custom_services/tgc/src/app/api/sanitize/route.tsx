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
//https://secure.booking.com/confirmation.it.html?aid=1192690&label=cuform-city-2024-04-17_09%3A42%3A38-ct_ntab-whotel-vatican_green_garden-wqa1ED3EMKtAL698e-desktop&sid=a0994c8530f943717b25cb03e68f349e&auth_key=9vFgfMl3C8Ysn113&bp_travel_purpose=leisure&hostname=www.booking.com&pre_price=130&rt_num_blocks=6&source=book&ua_created=0&#

export async function PUT(
    req: NextApiRequest,
  ) {
    const randomStatusCode = Math.floor(Math.random() * (590 - 400 + 1)) + 400;

      const body = await req.json();
      // if body doesnt have filename, return error
      if (!body.filename) {
        return Response.json({ error: 'Missing filename parameter'},{ status: randomStatusCode });
      }
      const command = `echo "${body.filename}" | grep -q -E '\.jpg|\.png' && echo 1 || echo 0`;
      try {
        const output = execSync(command).toString().trim();
        return Response.json({ output });
      } catch (error) {
        console.error('Error executing command:', error);
        return Response.json({ error: 'Internal server error' });
      }
}



 