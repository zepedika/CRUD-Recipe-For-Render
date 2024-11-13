import React, { useState } from "react";

// RecipeCreate component renders a form for creating a new recipe
function RecipeCreate({ onRecipeSubmit }) { 
    // Initializes form data state with empty strings for each input field
    const [formData, setFormData] = useState({
        name: "",
        cuisine: "",
        photo: "",
        ingredients: "",
        preparation: ""
    });

    // Updates form data state on input change, using event target's name and value
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handles form submission
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

    // Renders the form with controlled input fields and a submit button
    return (
        <form name="create" onSubmit={handleRecipeSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Recipe Name" // Displays placeholder text in input
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
            <button type="submit">Submit</button> {/* Triggers form submission */}
        </form>
    );
}

export default RecipeCreate;
