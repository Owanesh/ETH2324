import { User } from './data/types';
import crypto, { randomInt } from 'crypto';
import credentials from "@/app/api/login/data/credentials.json";
import { cookies } from "next/headers";
import { encryptData } from '@/app/crypto';


export async function POST(req: Request) {    try {
        const body = await req.json() as User;
        const { email, password } = body;
        const decodedPassword = Buffer.from(password, 'base64').toString('utf-8');
        const hashedPassword = crypto.createHash('sha256').update(decodedPassword).digest('hex');
        const user = credentials.find((user: User) => user.email === email && user.password === hashedPassword);
        if (user) {
            const userInfo = encryptData(JSON.stringify(user));

            cookies().set("userData",userInfo, {httpOnly:false,secure:false});
            return Response.json({ message: 'Login successful', timestamp:Date.now() }, { status: 200 });
        } else {
            return Response.json({ message: 'Invalid email or password', timestamp:Date.now() }, { status: 401 }); 
        }
    } catch (error) {
        return Response.json({ message: 'Internal Server Error', timestamp:Date.now(), response: 42, error:error }, { status: 500 }); 
    }
}


 