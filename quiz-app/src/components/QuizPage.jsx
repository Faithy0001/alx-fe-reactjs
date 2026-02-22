import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchQuizQuestions } from '../services/triviaService';
import QuestionCard from './QuestionCard';

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadQuestions = async () => {
      if (!location.state) {
        navigate('/quiz-setup');
        return;
      }

      const { category, difficulty, amount } = location.state;

      try {
        const data = await fetchQuizQuestions(amount, category, difficulty);
        if (isMounted) {
          setQuestions(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load questions. Please try again later.');
          setLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      isMounted = false;
    };
  }, [location, navigate]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = {
      question: questions[currentQuestionIndex].question,
      selectedAnswer: selectedAnswer,
      correctAnswer: questions[currentQuestionIndex].correct_answer,
      isCorrect: selectedAnswer === questions[currentQuestionIndex].correct_answer,
      category: questions[currentQuestionIndex].category,
      difficulty: questions[currentQuestionIndex].difficulty
    };
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      navigate('/results', {
        state: {
          answers: newAnswers,
          totalQuestions: questions.length
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner"></div>
          <p className="text-white text-xl font-semibold">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Questions</h2>
          <p className="text-gray-700 mb-6 text-sm md:text-base">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/quiz-setup')}
              className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm md:text-base"
            >
              Back to Setup
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold text-sm md:text-base"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Questions Available</h2>
          <p className="text-gray-700 mb-6 text-sm md:text-base">Try different settings or check your internet connection</p>
          <button
            onClick={() => navigate('/quiz-setup')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-6 md:py-8 px-4 page-animation">
      <div className="max-w-3xl mx-auto">
        <QuestionCard
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
        />

        <div className="mt-6 flex justify-end gap-4">
          {currentQuestionIndex > 0 && (
            <button
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setSelectedAnswer('');
              }}
              className="px-6 py-3 rounded-lg font-bold transition-all bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm md:text-base"
            >
              ← Previous
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`px-6 md:px-8 py-3 rounded-lg font-bold transition-all text-sm md:text-base ${
              selectedAnswer
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;