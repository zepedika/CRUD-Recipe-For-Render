import React, { useState } from "react";
import "./App.css";
import RecipeCreate from "./RecipeCreate";
import RecipeList from "./RecipeList";
import RecipeData from "./RecipeData";

/*
App Component

The main component of the application that manages the overall state of the recipe collection. It displays the list of recipes and a form to add new recipes.

Functional Overview:
* Initializes the recipe list with pre-loaded data from `RecipeData`.
* Manages the addition of new recipes and deletion of existing ones.
* Composes two child components:
    * RecipeList: Displays the list of recipes and provides functionality to delete them.
    * RecipeCreate: Provides a form to create and submit a new recipe.
 */

function App() {
  // State to manage the list of recipes, initialized with preloaded data
  const [recipes, setRecipes] = useState(RecipeData);

 //Receives a `newRecipe` object from the `RecipeCreate` component, and adds the new recipe to the existing list of recipes
  const handleRecipeSubmit = (newRecipe) => {
    // Add the new recipe to the current list of recipes
    setRecipes([...recipes, newRecipe]);
  };

  //Receives the index of the recipe to be deleted from the `RecipeList` component and removes it
  const handleDeleteRecipe = (index) => {
    // Create a copy of the current recipes array
    const updatedRecipes = [...recipes];
    // Remove the recipe at the specified index
    updatedRecipes.splice(index, 1);
    // Update the state with the modified recipes array
    setRecipes(updatedRecipes);
  };

  //Rendered JSX 
  return (
    <div>
      {/* Application title */}
      <h1>DELICIOUS FOOD RECIPES</h1>
      
      {/* List of recipes with delete functionality */}
      <RecipeList recipes={recipes} onDeleteRecipe={handleDeleteRecipe} />
      
      {/* Form to create a new recipe, with styling */}
      <div style={{ backgroundColor: "beige" }}>
        <RecipeCreate onRecipeSubmit={handleRecipeSubmit} />
      </div>
    </div>
  );
}

export default App;
