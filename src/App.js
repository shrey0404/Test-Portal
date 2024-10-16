import React, { useState, useEffect } from "react";
import QuestionDisplay from "./QuestionDisplay";
import QuestionLegend from "./QuestionLegend";
import SubmitSummary from "./SubmitSummary";
import questions from "./questionsData";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [warning, setWarning] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600 seconds)

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleNext = () => {
    setWarning(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    setWarning(null);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswer = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const unansweredQuestions = answers.filter(
      (answer) => answer === null
    ).length;
    if (unansweredQuestions > 0) {
      setWarning(`You have ${unansweredQuestions} unanswered question(s)!`);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleGoBack = () => {
    setIsSubmitted(false);
    setWarning(null);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        {isSubmitted ? (
          <SubmitSummary answers={answers} onGoBack={handleGoBack} />
        ) : (
          <>
            {warning && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {warning}
              </div>
            )}
            <div className="flex justify-between mb-6">
              <div className="text-gray-600">
                Time Left: {formatTime(timeLeft)}
              </div>
            </div>
            <QuestionLegend
              currentQuestion={currentQuestion}
              answers={answers}
              onSelectQuestion={setCurrentQuestion}
            />
            <QuestionDisplay
              currentQuestion={currentQuestion}
              questions={questions}
              onNext={handleNext}
              onPrev={handlePrev}
              onAnswer={handleAnswer}
              onSubmit={handleSubmit}
              answers={answers}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
