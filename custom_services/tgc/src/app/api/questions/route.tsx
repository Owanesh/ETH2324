// pages/api/questions.js
import questionsData from "@/app/api/questions/data/questions.json";
import type { NextApiRequest } from 'next'

interface Question {
    question: string;
    correctAnswer: string;
}

interface UserQuestions {
    [username: string]: Question[];
}

export async function POST(
    req: NextApiRequest,
) {
    const body = await req.json();
    const { username } = body
    const userQuestions = questionsData[username] as UserQuestions;

    if (!userQuestions) { // this if will never be triggered
        return Response.json({ error: 'Username n0t found!' }, { status: 400 });
    }
    for (let key in userQuestions) {
        if (userQuestions.hasOwnProperty(key)) {
            delete userQuestions[key].correctAnswer;
        }
    }
    const questionsToSend = userQuestions.slice(0, 3);
    return Response.json({ username: username, questions: questionsToSend })


}

export function GET(
    req: NextApiRequest,
) {
    return Response.json({ service: "Recover Password" })
}