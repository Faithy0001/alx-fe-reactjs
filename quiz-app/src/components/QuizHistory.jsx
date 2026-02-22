import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function QuizHistory() {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    // Load quiz history from localStorage
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setQuizHistory(parsed);
      } catch (error) {
        console.error('Error parsing quiz history:', error);
      }
    }
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all quiz history? This cannot be undone.')) {
      localStorage.removeItem('quizHistory');
      setQuizHistory([]);
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  if (quizHistory.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-6 md:py-8 px-4 page-animation">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center card-animation">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Quiz History</h1>
            <div className="my-12">
              <p className="text-5xl md:text-6xl mb-4">📝</p>
              <p className="text-lg md:text-xl text-gray-600 mb-8">No quiz history yet!</p>
              <p className="text-sm md:text-base text-gray-500 mb-8">Take a quiz to see your results here</p>
              <Link
                to="/quiz-setup"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm md:text-base"
              >
                Take Your First Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-6 md:py-8 px-4 page-animation">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6 card-animation">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Quiz History</h1>
              <p className="text-gray-600 text-sm md:text-base">You've completed {quizHistory.length} quiz{quizHistory.length !== 1 ? 'zes' : ''}</p>
            </div>
            <button
              onClick={handleClearHistory}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm md:text-base"
            >
              Clear History
            </button>
          </div>
        </div>

        {/* Quiz Cards */}
        <div className="space-y-4">
          {quizHistory.map((quiz, index) => {
            const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100);
            const scoreColorClass = getScoreColor(percentage);

            return (
              <div
                key={quiz.id || index}
                className={`bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-2xl transition-shadow border-2 border-gray-100 card-animation`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  
                  {/* Quiz Info */}
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">{quiz.topic}</h3>
                    <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                        {quiz.difficulty}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                        {quiz.totalQuestions} questions
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {quiz.date}
                      </span>
                    </div>
                  </div>

                  {/* Score Display */}
                  <div className={`${scoreColorClass} rounded-lg p-4 text-center min-w-[140px] border-2`}>
                    <p className="text-3xl md:text-4xl font-bold">{percentage}%</p>
                    <p className="text-xs md:text-sm font-semibold mt-1">{quiz.score}/{quiz.totalQuestions}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-white hover:bg-gray-100 text-purple-600 font-bold py-3 px-8 rounded-lg transition-colors text-sm md:text-base"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuizHistory;