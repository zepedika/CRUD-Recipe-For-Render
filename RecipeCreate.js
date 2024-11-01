import React, { useState } from "react";

function RecipeCreate({onRecipeSubmit}) {

//Create a recipe
  
  
    const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    photo: "",
    ingredients: "",
    preparation: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRecipeSubmit = (event) => {
    event.preventDefault();
    onRecipeSubmit(formData);
    setFormData({
      name: "",
      cuisine: "",
      photo: "",
      ingredients: "",
      preparation: ""
    });
  };

  return (
    <form name="create" onSubmit={handleRecipeSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Recipe Name"
      />
      <input
        type="text"
        name="cuisine"
        value={formData.cuisine}
        onChange={handleInputChange}
        placeholder="Cuisine"
      />
      <input
        type="text"
        name="photo"
        value={formData.photo}
        onChange={handleInputChange}
        placeholder="Photo URL"
      />
      <textarea
        name="ingredients"
        value={formData.ingredients}
        onChange={handleInputChange}
        placeholder="Ingredients"
      />
      <textarea
        name="preparation"
        value={formData.preparation}
        onChange={handleInputChange}
        placeholder="Preparation"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RecipeCreate;
