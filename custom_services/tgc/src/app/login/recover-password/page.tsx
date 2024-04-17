'use client';
import { Metadata } from 'next';
import React, { useState, useEffect } from 'react';

 

const ForgotPasswordPage = () => {
  const [username, setUsername] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/questions/${username}`);
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setErrorMessage('Failed to retrieve questions. Please try again later.');
      }
    };

    if (username) {
      fetchQuestions();
    }
  }, [username]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!answer) {
      setErrorMessage('Please enter an answer to the question.');
      return;
    }

    try {
      const response = await fetch(`/api/verify/${username}`, {
        method: 'POST',
        body: JSON.stringify({ answer }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setErrorMessage('Incorrect answer. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying answer:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setAnswer('');
    }
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
    setErrorMessage(null);
    setSuccess(false);
  };

  const handleChangeAnswer = (event) => {
    setAnswer(event.target.value);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {success && (
        <div className="text-green-500 mb-4">
          Your security questions have been answered correctly. You can now reset your password!
        </div>
      )}
      {!success && (
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm">
          <input
            type="text"
            placeholder="Username"
            className="px-3 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={username}
            onChange={handleChangeUsername}
            required
          />
          {questions.length > 0 && (
            <>
              <p className="font-bold mb-2">Security Question:</p>
              <p>{questions[currentQuestion]}</p>
              <input
                type="text"
                placeholder="Answer"
                className="px-3 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={answer}
                onChange={handleChangeAnswer}
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Submit Answer
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
