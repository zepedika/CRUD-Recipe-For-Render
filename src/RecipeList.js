import React from "react";

/* Component renders a list of recipes in a table format. Each row displays the name, cuisine, photo, ingredients, and preparation steps for a recipe. It also includes a delete button for removing recipes from the list.
Props:
 * recipes: Array of recipe objects, each containing 'name', 'cuisine', 'photo', 'ingredients', and 'preparation'.
 * onDeleteRecipe: Function to handle deletion of a recipe. It receives the index of the recipe to be deleted.
 */

function RecipeList({ recipes, onDeleteRecipe }) {

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cuisine</th>
          <th>Photo</th>
          <th>Ingredients</th>
          <th>Preparation</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe, index) => (
          <tr
            key={index}
            style={{ backgroundColor: index % 2 === 0 ? "beige" : "inherit" }} // Alternates row colors for better readability
          >
            <td>{recipe.name}</td>
            <td>{recipe.cuisine}</td>
            <td>
              <img 
                src={recipe.photo} 
                alt={recipe.name} 
                style={{ maxWidth: "100%", maxHeight: "100%" }} // Restricts image size to fit within the cell
              />
            </td>
            <td>{recipe.ingredients}</td>
            <td>{recipe.preparation}</td>
            <td>
              <button 
                name="delete" 
                onClick={() => onDeleteRecipe(index)} // Calls onDeleteRecipe with the recipe index
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecipeList;
