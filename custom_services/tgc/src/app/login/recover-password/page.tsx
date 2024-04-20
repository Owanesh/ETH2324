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
        className="w-full border border-gray-300 rounded-md py-2 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:border-blue-500 mb-4"
        placeholder="Enter your username"
        onChange={handleUsernameChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none"
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
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold text-lg mb-2">{question}</p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            placeholder="Your answer"
            value={answers[index] || ''}
            onChange={(event) => handleAnswerChange(index, event)}
          />
        </div>
      ))}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none"
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

  const handleNext = () => {
    const mockQuestions = ['What is your pet\'s name?', 'What is your favorite color?', 'What city were you born in?'];
    setQuestions(mockQuestions);
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError('Please answer all questions');
      return;
    }

    try {
      // Mock API response
      const response = { status: 200, message: 'Password recovery successful. Your new password is sent to your email.' };
      if (response.status === 200) {
        setMessage(response.message);
      } else {
        setError('Failed to recover password. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-full">
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
    </div>
  );
};

export default RecoverPasswordPage;
