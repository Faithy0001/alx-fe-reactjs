# Trivia Quiz App

A fully responsive, feature-rich trivia quiz application built with React, Vite, Tailwind CSS, and Axios. Test your knowledge across multiple categories and difficulty levels while tracking your progress over time.

## Features

### Core Features
- **Multiple Quiz Categories**: Fetch and explore 25+ trivia categories from the Open Trivia Database API
- **Difficulty Selection**: Choose from Easy, Medium, or Hard difficulty levels
- **Customizable Questions**: Select 5-15 questions per quiz
- **One Question at a Time**: Clean, focused UI showing one question per screen
- **Multiple Choice Answers**: Four answer options per question with instant feedback
- **Score Tracking**: Real-time score calculation and percentage display
- **Quiz History**: Persistent quiz history stored in localStorage with metadata
- **Search Functionality**: Search for specific quiz topics with live filtering
- **Responsive Design**: Fully responsive on mobile (375px), tablet (768px), and desktop (1024px+)
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Animated spinners and loading indicators for better UX

### User Experience
- Page transition animations (fade-in, slide-up effects)
- Smooth button interactions and hover states
- Progress bar visualization during quiz
- Previous/Next question navigation
- Detailed answer review after quiz completion
- Visual score indicators (color-coded by performance)
- Confirmation dialogs for destructive actions

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: Browser localStorage
- **API**: Open Trivia Database (opentdb.com)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
quiz-app/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx           # Landing page with category overview
│   │   ├── QuizSetup.jsx          # Quiz configuration (category, difficulty, amount)
│   │   ├── QuestionCard.jsx       # Individual question display component
│   │   ├── QuizPage.jsx           # Main quiz flow and navigation
│   │   ├── ScoreSummary.jsx       # Results page with answer review
│   │   ├── QuizHistory.jsx        # Historical quiz results view
│   │   ├── SearchBar.jsx          # Category search with dropdown
│   │   └── TestAPI.jsx            # API testing utility
│   ├── services/
│   │   └── triviaService.js       # API service with error handling
│   ├── App.jsx                    # Main routing component
│   ├── App.css                    # Global animations and styles
│   ├── index.css                  # Tailwind CSS imports
│   └── main.jsx                   # React entry point
├── public/                        # Static assets
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## How to Use

### Starting a Quiz
1. Click "Start Quiz" on the home page
2. Search for a topic or select from the dropdown
3. Choose difficulty level (Easy, Medium, Hard)
4. Select the number of questions (5-15)
5. Click "Start Quiz" to begin

### Taking a Quiz
1. Read the question and select your answer
2. Click "Next Question" to move forward
3. Use "Previous" button to review earlier answers (optional)
4. Click "Finish Quiz" on the last question

### Reviewing Results
1. View your score as a percentage and fraction
2. See performance feedback (Excellent, Good Job, Not Bad, Keep Practicing)
3. Review all answers with correct/incorrect indicators
4. Take another quiz or return home

### Viewing History
1. Click "View History" from the home page
2. See all completed quizzes with scores and dates
3. Clear all history with confirmation (data stored in localStorage)

## Data Storage

Quiz history is stored in browser localStorage using the following structure:
```json
{
  "quizHistory": [
    {
      "id": "1708123456789",
      "topic": "General Knowledge",
      "difficulty": "medium",
      "score": 7,
      "totalQuestions": 10,
      "date": "2026-02-25",
      "timestamp": 1708123456789
    }
  ]
}
```

**Note**: Data persists only on the same device and browser. Clearing browser data will remove quiz history.

## API Integration

### Open Trivia Database
- **Endpoint**: https://opentdb.com/api.php
- **Rate Limiting**: 5 requests per 10 seconds
- **Retry Logic**: Exponential backoff for rate limit (429) responses
- **Timeout**: 10 seconds per request with network error detection

### API Response Handling
- ✅ Validates response format and data integrity
- ✅ Handles rate limiting with automatic retry
- ✅ Detects network errors and timeouts
- ✅ Provides meaningful error messages to users

## Responsive Design Breakpoints

- **Mobile**: 375px-640px (Tailwind `sm`)
- **Tablet**: 641px-1024px (Tailwind `md`)
- **Desktop**: 1025px+ (Tailwind `lg`)

All text, buttons, spacing, and layouts scale appropriately for each breakpoint.

## Animations & Transitions

- Page fade-in animations (0.3s)
- Card slide-up animations (0.5s)
- Spinner rotation for loading states
- Smooth button hover/active states
- Progress bar animated width transitions

## Error Handling

### Network Errors
- Network connectivity issues → "Network error. Please check your internet connection."
- Request timeout (10s) → "Request timeout. Please check your internet connection."

### API Errors
- Rate limiting (429) → Automatic retry with exponential backoff
- No results available → "No questions available. Try different settings."
- Invalid response → "Failed to load [resource]. Please try again."

### User Errors
- Missing selections → Form validation with clear warnings
- localStorage parsing errors → Graceful fallback with error logging
- No quiz history → Friendly empty state with call-to-action

## Testing Recommendations

1. **Functionality Testing**
   - ✅ Quiz flow: setup → questions → results
   - ✅ Answer selection and navigation (previous/next)
   - ✅ Score calculation and percentage display
   - ✅ localStorage persistence (refresh page, reopen browser)

2. **Responsive Testing**
   - ✅ Mobile (DevTools 375px width)
   - ✅ Tablet (DevTools 768px width)
   - ✅ Desktop (1440px+ width)
   - ✅ Touch interactions on mobile devices

3. **Error Scenario Testing**
   - ✅ No internet connection (use DevTools offline mode)
   - ✅ API rate limiting (rapid quiz attempts)
   - ✅ Empty/no results category (test rare categories)
   - ✅ localStorage quota exceeded (create many quizzes)

4. **Performance Testing**
   - Check for console errors (F12 DevTools)
   - Verify smooth animations
   - Test with slow network (DevTools throttling)

## Author

Built by Faith Okpoyo | ALX Front-End Development Course (2026)
