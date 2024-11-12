import React, { useState } from "react";  
import "./App.css";  
import RecipeCreate from "./RecipeCreate";  
import RecipeList from "./RecipeList";  
import RecipeData from "./RecipeData"  


function App() {
  // Declare state variable 'recipes' to store the list of recipes and the 'setRecipes' function to update it
  const [recipes, setRecipes] = useState(RecipeData);

  /* handleRecipeSubmit is triggered when the user submits a new recipe
  It takes the newRecipe object, adds it to the existing list, and updates the state */
  const handleRecipeSubmit = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);  
  };

  /* handleDeleteRecipe is triggered when the user deletes a recipe by its index
  It creates a copy of the recipes array, removes the item at the given index, and updates the state  */
  const handleDeleteRecipe = (index) => {
    const updatedRecipes = [...recipes]; 
    updatedRecipes.splice(index, 1);  
    setRecipes(updatedRecipes);  
  };

  return (
    <div>
      <h1>DELICIOUS FOOD RECIPES</h1>  

      {/* RecipeList component is responsible for rendering the list of recipes. It receives 'recipes' as a prop to display, and 'onDeleteRecipe' to handle recipe deletion */}
      <RecipeList recipes={recipes} onDeleteRecipe={handleDeleteRecipe} />

      {/* RecipeCreate component allows the user to submit a new recipe. It receives 'onRecipeSubmit' prop to call the handleRecipeSubmit function on form submission */}
      <div style={{ backgroundColor: "beige" }}>  
        <RecipeCreate onRecipeSubmit={handleRecipeSubmit} />
      </div>
    </div>
  );
}

export default App;  
