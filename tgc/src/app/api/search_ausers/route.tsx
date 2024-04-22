import { NextApiRequest, NextApiResponse } from 'next';
import { execSync } from 'child_process';

export async function GET(
    req: NextApiRequest,
) {
    const { searchParams } = new URL(req.url)
    const user = searchParams.get('user')
    if (!user) {
        const command = `cat src/app/api/search_ausers/user.txt`;
        const output = execSync(command).toString().trim().split("\n");
        return Response.json({ users: output }, { status: 200 });
    }
}

export async function POST(
    req: NextApiRequest,
) {
    const body = await req.json();
    const {user} = body
    const command = `grep -m 1 -i "${user}" src/app/api/search_ausers/user.txt`;
    try {
        const output = execSync(command).toString().trim().split("\n");
        return Response.json({ users:output}, { status: 200 });
    } catch (error) {
        console.error('Error executing command:', error);
        return Response.json({ error: 'Internal server error',e:error });
    }

}

