'use client';
import { ChangeEvent, useState } from 'react';

interface StepUsernameProps {
  setUsername: (username: string) => void;
  onNext: () => void;
}

const StepUsername: React.FC<StepUsernameProps> = ({ setUsername, onNext }) => {
    const handleUsernameChange = (event: { target: { value: string; }; }) => {
    setUsername(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="username" className="text-lg font-semibold mb-4">Step 1: Enter your username</label>
      <input
        id="username"
        type="text"
        className="w-full border border-gray-300 rounded-md py-2 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:border-green-500 mb-4"
        placeholder="Enter your username"
        onChange={handleUsernameChange}
      />
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

interface Question {
  question: string;
  correctAnswer: string;
}

interface StepQuestionsProps {
  questions: Question[];
  answers: string[];
  setAnswers: (answers: string[]) => void;
  onSubmit: () => void;
}

const StepQuestions: React.FC<StepQuestionsProps> = ({ questions, answers, setAnswers, onSubmit }) => {
  const handleAnswerChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-lg font-semibold mb-4">Step 2: Answer security questions</label>
    <div>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold text-lg mb-2">{question.question}</p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:border-green-500"
            placeholder="Your answer"
            value={answers[index] || ''}
            onChange={(event) => handleAnswerChange(index, event)}
          />
        </div>
      ))}
    </div>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const RecoverPasswordPage = () => {
  const [username, setUsername] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState<string[]>([]); // Specify the type as string[]
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleNext = async () => {
    try {
      const response = await fetch('/api/questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
  
      const data = await response.json();
      setQuestions(data.questions);
      setStep(step + 1);
      setError('');
    } catch (error) {
      setError('An unexpected error occurred. Are you sure about username?');
    }
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError('Please answer all questions');
      return;
    }
  
    try {
      const response = await fetch('/api/questions/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          answers: answers.map(answer => answer.trim()), // Remove leading/trailing whitespace
        }),
      });
  
      const data = await response.json();
      if (data) {
        setMessage( 'Password recovered successfully: '+data.pass+" sent to "+data.mail);
      } else {
        setError('Incorrect answers. Please try again.');
      }
    } catch (error) {
      console.error('Error validating answers:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };
  

  return (
    <main className="container mx-auto px-4 py-8 h-screen flex flex-col align-center center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-center">Recover Password</h1> 
      {error &&

<div className="flex align-center center justify-center items-center mb-4">
  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
    {error}
  </span>
</div>
}
{message &&

<div className="flex align-center center justify-center items-center mb-4">
  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
    {message}
  </span>
</div>
}

      {step === 1 && (
        <StepUsername setUsername={setUsername} onNext={handleNext} />
      )}
      {step === 2 && (
        <StepQuestions
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          onSubmit={handleSubmit}
        />
      )}
   
    </main>
  );
};

export default RecoverPasswordPage;
