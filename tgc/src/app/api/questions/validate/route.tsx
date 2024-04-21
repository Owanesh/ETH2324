// pages/api/questions.js
import questionsData from "@/app/api/questions/data/questions.json";
import creds from "@/app/api/login/data/credentials.json";
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
    const { username, answers } = body
    if (!username) {
        return Response.json({ error: 'Username is required' }, { status: 400 });
    }
    if (!answers) {
        return Response.json({ error: 'Answers are required' }, { status: 400 });
    }
    const questions = questionsData[username] as UserQuestions;
    if (!questions) {
        return Response.json({ error: 'Username not found!' }, { status: 400 });
    }
    if (answers.length !== questions.length) {
        return Response.json({ error: 'Invalid number of answers' }, { status: 400 });
    }
    const correctAnswers: string[] = questions.map(question => question.correctAnswer);
    const isCorrect = answers.every((answer, index) => sanitizeInput(answer) === correctAnswers[index]);

    if (!isCorrect) {
        return Response.json({ error: 'Incorrect answers' }, { status: 400 });
    }
    else {
        return Response.json({ login:true, pass: creds[username].password }, { status: 200});
    }
}


function sanitizeInput(input: string): string {
    input = String(input);
    input = input.replace(/<[^>]*>?/gm, '');
    input = input.replace(/`|\$|{|}/g, '');
    input = input.trim();
    return input;
}

  