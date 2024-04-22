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

export async function POST(req: Request) {
    const body = await req.json();
    const { username } = body
    const userQuestions = (questionsData as UserQuestions)[username] as Question[]; 

    if (!userQuestions) { // this if will never be triggered
        return Response.json({ error: 'Username n0t found!' }, { status: 400 });
    }
    const questionsToSend = userQuestions.map(question => ({
        question: question.question
    })).slice(0, 3);
    
    return Response.json({ username: username, questions: questionsToSend })


}
