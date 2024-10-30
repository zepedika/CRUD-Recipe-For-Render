import React, { useState } from "react";
import "./App.css";
import RecipeCreate from "./RecipeCreate";
import RecipeList from "./RecipeList";
import RecipeData from "./RecipeData"

//write consistent comments about handle groups

function App() {
  const [recipes, setRecipes] = useState(RecipeData);

  const handleRecipeSubmit = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  return (
    <div>
      <h1>DELICIOUS FOOD RECIPES</h1>
      
      <RecipeList recipes={recipes} onDeleteRecipe={handleDeleteRecipe} />
      <div style={{ backgroundColor: "beige" }}>
      <RecipeCreate onRecipeSubmit={handleRecipeSubmit} />
        </div>
    </div>
  );
}

export default App;
