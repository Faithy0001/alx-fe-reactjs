import axios from 'axios';

const BASE_URL = 'https://opentdb.com';

// Fetch available quiz categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api_category.php`);
    return response.data.trivia_categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Fetch quiz questions with retry logic for rate limiting
export const fetchQuizQuestions = async (amount = 10, category = '', difficulty = '', attempt = 0) => {
  try {
    let url = `${BASE_URL}/api.php?amount=${amount}&type=multiple`;
    
    if (category) {
      url += `&category=${category}`;
    }
    
    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }
    
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    // Retry on 429 (Too Many Requests) with exponential backoff
    if (error.response?.status === 429 && attempt < 3) {
      const delay = Math.pow(2, attempt) * 2000; // 2s, 4s, 8s
      console.warn(`Rate limited. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchQuizQuestions(amount, category, difficulty, attempt + 1);
    }
    console.error('Error fetching quiz questions:', error);
    throw error;
  }
};

// Helper function to decode HTML entities
export const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Helper function to shuffle answers
export const shuffleAnswers = (question) => {
  const answers = [
    ...question.incorrect_answers,
    question.correct_answer
  ];
  
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  
  return answers;
};