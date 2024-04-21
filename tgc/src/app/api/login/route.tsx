import type { NextApiRequest } from 'next'
import { User } from './data/types';
import credentials from "@/app/api/login/data/credentials.json";

export async function POST(req: NextApiRequest) {

    try {
        const body = await req.json() as User;
        const { email, password } = body;
        const user = credentials.find((user) => user.email === email && user.password === password);
        if (user) {
            return Response.json({ message: 'Login successful', timestamp:Date.now() }, { status: 200 });
        } else {
            return Response.json({ message: 'Invalid email or password', timestamp:Date.now() }, { status: 401 }); 
        }
    } catch (error) {
        return Response.json({ message: 'Internal Server Error', timestamp:Date.now(), response: 42 }, { status: 500 }); 
    }
}