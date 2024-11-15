import React from "react";

function RecipeList({ recipes, onDeleteRecipe}) {
  
/* RecipeList Component
This component renders a table displaying a list of recipes. Each recipe is represented as a row in the table, with its details displayed in individual cells.
Props:
* recipes: An array of recipe objects. Each recipe object should contain the following fields:
* name: The name of the recipe (string).
* cuisine: The type of cuisine (string).
* photo: A URL string for the recipe's photo.
* ingredients: A string describing the ingredients of the recipe.
* preparation: A string describing the preparation steps for the recipe.
* onDeleteRecipe: A callback function to handle the deletion of a recipe. It receives the index of the recipe to be deleted as an argument.
*/

function RecipeList({ recipes, onDeleteRecipe }) {
  return (
    <table>
      <thead>
        <tr>
          {/* Table headers define the structure of the recipe data */}
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
            // Apply alternating row colors for improved readability
            style={{ backgroundColor: index % 2 === 0 ? "beige" : "inherit" }}
          >          
            <td>{recipe.name}</td>
            <td>{recipe.cuisine}</td>

            {/* Display the recipe photo with a fallback to max-width/height for proper scaling */}
            <td>
              <img 
                src={recipe.photo} 
                alt={recipe.name} 
                style={{ maxWidth: "100%", maxHeight: "100%" }} 
              />
            </td>
                
            <td>{recipe.ingredients}</td>
            <td>{recipe.preparation}</td>

            {/* Action button to delete the current recipe */}
            <td>
              <button 
                name="delete" 
                onClick={() => onDeleteRecipe(index)}
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
