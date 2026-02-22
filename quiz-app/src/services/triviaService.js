import axios from 'axios';

const BASE_URL = 'https://opentdb.com';

// Fetch available quiz categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api_category.php`, {
      timeout: 10000 // 10 second timeout
    });
    
    if (!response.data || !response.data.trivia_categories) {
      throw new Error('Invalid response format from categories API');
    }
    
    return response.data.trivia_categories;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('Categories request timeout:', error);
      throw new Error('Request timeout. Please check your internet connection.');
    }
    if (error.message === 'Network Error') {
      console.error('Network error fetching categories:', error);
      throw new Error('Network error. Please check your internet connection.');
    }
    console.error('Error fetching categories:', error);
    throw new Error(error.message || 'Failed to load categories. Please try again.');
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
    
    const response = await axios.get(url, {
      timeout: 10000 // 10 second timeout
    });
    
    // Handle API error responses
    if (response.data.response_code === 5) {
      throw new Error('Too many requests. Please try again in a moment.');
    }
    if (response.data.response_code === 4) {
      throw new Error('No questions available for the selected category and difficulty. Try different settings.');
    }
    if (response.data.response_code !== 0) {
      throw new Error(`API error (code: ${response.data.response_code}). Please try again.`);
    }
    
    if (!response.data.results || response.data.results.length === 0) {
      throw new Error('No questions available. Try different settings.');
    }
    
    return response.data.results;
  } catch (error) {
    // Retry on 429 (Too Many Requests) with exponential backoff
    if (error.response?.status === 429 && attempt < 3) {
      const delay = Math.pow(2, attempt) * 2000; // 2s, 4s, 8s
      console.warn(`Rate limited. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchQuizQuestions(amount, category, difficulty, attempt + 1);
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('Questions request timeout:', error);
      throw new Error('Request timeout. Please check your internet connection.');
    }
    if (error.message === 'Network Error') {
      console.error('Network error fetching questions:', error);
      throw new Error('Network error. Please check your internet connection.');
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