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
          setError('Failed to load questions. Please try again later.');
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
      isCorrect: selectedAnswer === questions[currentQuestionIndex].correct_answer
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
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/quiz-setup')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Questions Available</h2>
          <p className="text-gray-700 mb-4">Try different settings</p>
          <button
            onClick={() => navigate('/quiz-setup')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <QuestionCard
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`px-8 py-3 rounded-lg font-bold transition-all ${
              selectedAnswer
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;