import React from "react";

const QuestionLegend = ({ currentQuestion, answers, onSelectQuestion }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Question Legend</h2>
      <div className="grid grid-cols-5 gap-2">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(index)}
            className={`p-2 rounded-full text-white ${
              answer !== null
                ? "bg-green-500"
                : index === currentQuestion
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionLegend;
