import React from "react";

function RecipeList({ recipes, onDeleteRecipe}) {
  
//List of Recipies


 return (
    <table>
      <thead>
        <tr >
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
          <tr key={index}
            
            style={{ backgroundColor: index % 2 === 0 ? "beige" : "inherit" }}
          >
            <td>{recipe.name}</td>
            <td>{recipe.cuisine}</td>
            <td>
              <img src={recipe.photo} alt={recipe.name}  style={{ maxWidth: "100%", maxHeight: "100%" }}/>
            </td>
            <td>{recipe.ingredients}</td>
            <td>{recipe.preparation}</td>
            <td>
              <button name="delete" onClick={() => onDeleteRecipe(index)} name="delete">
                
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
