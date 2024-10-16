import React from "react";
import { motion } from "framer-motion";

const SubmitSummary = ({ answers, onGoBack }) => {
  const questions = require("./questionsData").default;

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const score = calculateScore();

  const evaluateResult = () => {
    if (score <= 3) return "Noob";
    if (score <= 6) return "Pro";
    if (score <= 8) return "Hacker";
    return "God Mode";
  };

  const resultLevel = evaluateResult();

  return (
    <motion.div
      className="text-center p-6 max-w-2xl mx-auto bg-gradient-to-br from-blue-300 to-purple-500 shadow-2xl rounded-lg mt-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-white mb-4">Test Summary</h2>
      <p className="text-lg font-medium text-white mb-2">
        You answered {score} out of {questions.length} questions correctly!
      </p>
      <h3
        className={`text-3xl font-bold mb-4 ${
          resultLevel === "Noob"
            ? "text-red-600"
            : resultLevel === "Pro"
            ? "text-yellow-400"
            : resultLevel === "Hacker"
            ? "text-green-400"
            : "text-blue-400"
        }`}
      >
        {resultLevel}
      </h3>
      <div className="mb-4 space-y-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 bg-white shadow-lg"
          >
            <h4 className="font-medium text-gray-800">{question.question}</h4>
            <p className="mt-1">
              Your answer:{" "}
              <span className="font-semibold text-blue-500">
                {answers[index] || "Not Answered"}
              </span>
            </p>
            <p className="mt-1">
              Correct answer:{" "}
              <span className="font-semibold text-green-500">
                {question.correctAnswer}
              </span>
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={onGoBack}
        className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-300"
      >
        Back to Test
      </button>
    </motion.div>
  );
};

export default SubmitSummary;
