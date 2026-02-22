import { decodeHTML } from '../services/triviaService';

function QuestionCard({ question, questionNumber, totalQuestions, onAnswer, selectedAnswer }) {
  const allAnswers = [
    ...question.incorrect_answers,
    question.correct_answer
  ].sort();

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 card-animation">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-2">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
          {decodeHTML(question.category)}
        </span>
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
          {question.difficulty}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        {decodeHTML(question.question)}
      </h2>

      {/* Answer Options */}
      <div className="space-y-3">
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all text-sm md:text-base ${
              selectedAnswer === answer
                ? 'border-purple-600 bg-purple-50 shadow-md'
                : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`flex-shrink-0 w-7 md:w-8 h-7 md:h-8 rounded-full border-2 flex items-center justify-center text-xs md:text-sm font-semibold ${
                selectedAnswer === answer
                  ? 'border-purple-600 bg-purple-600 text-white'
                  : 'border-gray-300 text-gray-600'
              }`}>
                {selectedAnswer === answer ? '✓' : String.fromCharCode(65 + index)}
              </span>
              <span className="text-gray-800 font-medium">
                {decodeHTML(answer)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;