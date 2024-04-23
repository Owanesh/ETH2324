// pages/api/questions.js
import questionsData from "@/app/api/questions/data/questions.json";
import creds from "@/app/api/login/data/credentials.json";

interface Question {
    question: string;
    correctAnswer: string;
}

interface UserQuestions {
    [username: string]: Question[];
}

export async function POST(req: Request) {
  
    const body = await req.json();
    const { username, answers } = body
    if (!username) {
        return Response.json({ error: 'Username is required' }, { status: 400 });
    }
    if (!answers) {
        return Response.json({ error: 'Answers are required' }, { status: 400 });
    }
    const user = Object.values(creds).find(cred => cred.username === username);
    const questions = (questionsData as UserQuestions)[username] as Question[]; 
    if (!questions) {
        return Response.json({ error: 'Username not found!' }, { status: 400 });
    }
    if (answers.length !== questions.length) {
        return Response.json({ error: 'Invalid number of answers' }, { status: 400 });
    }

    const correctAnswers: string[] = questions.map(question => question.correctAnswer);

    const isCorrect = answers.every((answer: string, index: number) => sanitizeInput(answer).toLowerCase() === correctAnswers[index].toLowerCase());

    if (!isCorrect) {
        return Response.json({ error: 'Incorrect answers' }, { status: 400 });
    }
    else {

        return Response.json({ login:true, pass: user?.password, mail:user?.email }, { status: 200});
    }
}


function sanitizeInput(input: string): string {
    input = String(input);
    input = input.replace(/<[^>]*>?/gm, '');
    input = input.replace(/`|\$|{|}/g, '');
    input = input.trim();
    return input;
}

  