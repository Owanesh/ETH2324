'use client';
import { useState } from 'react';

const StepUsername = ({ setUsername, onNext }) => {
  const handleUsernameChange = (event) => {
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

const StepQuestions = ({ questions, answers, setAnswers, onSubmit }) => {
  const handleAnswerChange = (index, event) => {
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
  const [answers, setAnswers] = useState([]);
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
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Handle error here
    }
  };

  const handleSubmit = async () => {
    if (userAnswers.length !== questions.length) {
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
          answers: userAnswers.map(answer => answer.trim()), // Remove leading/trailing whitespace
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to validate answers');
      }
  
      const data = await response.json();
      if (data.valid) {
        setMessage('Password recovery successful. Your new password is sent to your email.');
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
      {message && <p className="text-green-600 mt-8">{message}</p>}
      {error && <p className="text-red-600 mt-8">{error}</p>}
    </main>
  );
};

export default RecoverPasswordPage;
