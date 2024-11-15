/*
RecipeCreate Component

This component provides a form for creating a new recipe, manages the form state locally, and handles the submission of the recipe data to a parent component through a callback function. 

Props:
 * onRecipeSubmit (function): Callback function to handle the submission of a new recipe.
 * Expects the form data as an argument.
 */

function RecipeCreate({ onRecipeSubmit }) {
  // Local state to manage form input data
  const [formData, setFormData] = useState({
    name: "",         // Recipe name
    cuisine: "",      // Cuisine type
    photo: "",        // URL to a photo of the recipe
    ingredients: "",  // List of ingredients (as a string)
    preparation: ""   // Preparation instructions (as a string)
  });

   //Event handler for input changes. Updates the corresponding field in the form state.
  const handleInputChange = (event) => {
    const { name, value } = event.target; // Destructure the input's name and value
    setFormData({
      ...formData,    // Spread the existing form data
      [name]: value   // Update only the field that changed
    });
  };

  //Event handler for form submission. Prevents default form submission behavior,
  const handleRecipeSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    onRecipeSubmit(formData); // Pass the form data to the parent component
    setFormData({
      name: "",         // Reset the form fields to their initial state
      cuisine: "",
      photo: "",
      ingredients: "",
      preparation: ""
    });
  };
  
  return (
    <form name="create" onSubmit={handleRecipeSubmit}>
      {/* Input for recipe name */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Recipe Name"
      />

      {/* Input for cuisine type */}
      <input
        type="text"
        name="cuisine"
        value={formData.cuisine}
        onChange={handleInputChange}
        placeholder="Cuisine"
      />

      {/* Input for photo URL */}
      <input
        type="text"
        name="photo"
        value={formData.photo}
        onChange={handleInputChange}
        placeholder="Photo URL"
      />

      {/* Textarea for ingredients */}
      <textarea
        name="ingredients"
        value={formData.ingredients}
        onChange={handleInputChange}
        placeholder="Ingredients"
      />

      {/* Textarea for preparation steps */}
      <textarea
        name="preparation"
        value={formData.preparation}
        onChange={handleInputChange}
        placeholder="Preparation"
      />

      {/* Submit button */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default RecipeCreate;
