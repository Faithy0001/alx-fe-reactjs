# Recipe Sharing Application

A comprehensive React application for sharing and managing recipes, built with Vite, React, and Zustand for state management.

## Features

### Task 0: Basic Recipe Management
- **Add Recipes**: Create new recipes with title and description
- **View Recipes**: Display all recipes in a list format
- **Zustand Integration**: Centralized state management using Zustand

### Task 1: Advanced Recipe Management
- **Recipe Details**: View detailed information for individual recipes
- **Edit Recipes**: Update existing recipe information
- **Delete Recipes**: Remove recipes with confirmation
- **Routing**: Navigate between different views using React Router

### Task 2: Search and Filtering
- **Search Bar**: Real-time search functionality to filter recipes by title
- **Dynamic Filtering**: Automatically updates the recipe list based on search term

### Task 3: Favorites and Recommendations
- **Favorites**: Mark recipes as favorites and view them in a dedicated section
- **Personalized Recommendations**: Get recipe suggestions based on your favorites
- **User Preferences**: Tailored experience based on user interactions

## Project Structure

```
recipe-sharing-app/
├── src/
│   ├── components/
│   │   ├── recipeStore.js         # Zustand store with all state management
│   │   ├── RecipeList.jsx         # Main recipe list component
│   │   ├── AddRecipeForm.jsx      # Form to add new recipes
│   │   ├── RecipeDetails.jsx      # Detailed view of a single recipe
│   │   ├── EditRecipeForm.jsx     # Form to edit existing recipes
│   │   ├── DeleteRecipeButton.jsx # Button to delete recipes
│   │   ├── SearchBar.jsx          # Search input component
│   │   ├── FavoritesList.jsx      # Display favorite recipes
│   │   └── RecommendationsList.jsx # Show recommended recipes
│   ├── App.jsx                    # Main app component with routing
│   └── main.jsx                   # Application entry point
└── package.json
```

## Installation

1. Navigate to the project directory:
```bash
cd recipe-sharing-app
```

2. Install dependencies:
```bash
pnpm install
```

## Running the Application

Start the development server:
```bash
pnpm run dev
```

The application will be available at `http://localhost:5173/`

## Building for Production

Build the application:
```bash
pnpm run build
```

Preview the production build:
```bash
pnpm run preview
```

## Zustand Store Features

The `recipeStore.js` contains the following state and actions:

### State
- `recipes`: Array of all recipes
- `searchTerm`: Current search query
- `filteredRecipes`: Recipes matching the search term
- `favorites`: Array of favorite recipe IDs
- `recommendations`: Array of recommended recipes

### Actions
- `addRecipe(newRecipe)`: Add a new recipe
- `setRecipes(recipes)`: Set the entire recipes array
- `updateRecipe(updatedRecipe)`: Update an existing recipe
- `deleteRecipe(recipeId)`: Remove a recipe
- `setSearchTerm(term)`: Update the search term
- `filterRecipes()`: Filter recipes based on search term
- `addFavorite(recipeId)`: Add a recipe to favorites
- `removeFavorite(recipeId)`: Remove a recipe from favorites
- `generateRecommendations()`: Generate personalized recommendations

## Component Overview

### RecipeList
Displays all recipes or filtered results. Includes links to recipe details.

### AddRecipeForm
Form with title and description inputs to create new recipes.

### RecipeDetails
Shows complete recipe information with options to edit, delete, and toggle favorites.

### EditRecipeForm
Inline form to modify recipe title and description.

### DeleteRecipeButton
Confirmation-based deletion of recipes.

### SearchBar
Real-time search input that filters recipes by title.

### FavoritesList
Dedicated section showing user's favorite recipes.

### RecommendationsList
Dynamic recommendations based on user's favorites.

## Technologies Used

- **React 19**: UI library
- **Vite**: Build tool and development server
- **Zustand 5**: State management
- **React Router DOM 7**: Client-side routing
- **pnpm**: Package manager

## Learning Objectives Achieved

✅ Understand and utilize Zustand for state management
✅ Manage complex application state efficiently
✅ Implement advanced Zustand features (derived state, actions)
✅ Build a fully functional Recipe Sharing Application
✅ Handle CRUD operations with centralized state
✅ Implement search and filtering capabilities
✅ Create personalized user experiences with favorites and recommendations

## Repository

- **GitHub repository**: alx-fe-reactjs
- **Directory**: recipe-sharing-app
