import type { NextApiRequest } from 'next'
import { User } from './data/types';
import crypto from 'crypto';
import credentials from "@/app/api/login/data/credentials.json";

export async function POST(req: NextApiRequest) {

    try {
        const body = await req.json() as User;
        const { email, password } = body;
        const decodedPassword = Buffer.from(password, 'base64').toString('utf-8');
        const hashedPassword = crypto.createHash('sha256').update(decodedPassword).digest('hex');

        const user = credentials.find((user) => user.email === email && user.password === hashedPassword);
        if (user) {
            return Response.json({ message: 'Login successful', timestamp:Date.now() }, { status: 200 });
        } else {
            return Response.json({ message: 'Invalid email or password', timestamp:Date.now() }, { status: 401 }); 
        }
    } catch (error) {
        return Response.json({ message: 'Internal Server Error', timestamp:Date.now(), response: 42, error:error }, { status: 500 }); 
    }
}