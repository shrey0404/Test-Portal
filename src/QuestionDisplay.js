import React from "react";
import { motion } from "framer-motion";

function QuestionDisplay({
  currentQuestion,
  questions,
  onNext,
  onPrev,
  onAnswer,
  onSubmit,
  answers,
}) {
  const question = questions[currentQuestion];

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <motion.div
      key={currentQuestion}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6" // Adjusted spacing
    >
      <h2 className="text-2xl font-semibold mb-4">
        {currentQuestion + 1}. {question.question}
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <div key={index}>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => onAnswer(currentQuestion, option)}
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="text-lg">{option}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        {" "}
        {/* Increased margin */}
        <button
          onClick={onPrev}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors ${
            currentQuestion === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Previous
        </button>
        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default QuestionDisplay;
