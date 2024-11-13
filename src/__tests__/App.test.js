import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import RecipeData from "../RecipeData";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect'

// Root test suite for the main App component
describe("App", () => {

  // Test suite for verifying the structure of the recipe creation form
  describe("includes necessary structure to create a recipe", () => {
    
    // Checks that the form with the specified name exists in the component
    test('a form with name="create"', () => {
      const { container } = render(<App />);
      expect(container.querySelector('form[name="create" i]')).toBeTruthy();
    });

    // Nested suite for validating individual elements within the recipe creation form
    describe("create form contains", () => {

      // Ensures an input for the recipe name exists
      test('an <input name="name">', () => {
        const { container } = render(<App />);
        const name = container.querySelector(
          'form[name="create" i] input[name="name" i]'
        );
        expect(name).toBeTruthy();
      });

      // Ensures an input for the cuisine type exists
      test('an <input name="cuisine">', () => {
        const { container } = render(<App />);
        const name = container.querySelector(
          'form[name="create" i] input[name="cuisine" i]'
        );
        expect(name).toBeTruthy();
      });
      
      // Ensures an input for the photo URL exists
      test('an <input name="photo">', () => {
        const { container } = render(<App />);
        const name = container.querySelector(
          'form[name="create" i] input[name="photo" i]'
        );
        expect(name).toBeTruthy();
      });
      
      // Ensures a textarea for listing ingredients exists
      test('a <textarea name="ingredients">', () => {
        const { container } = render(<App />);
        const textArea = container.querySelector(
          'form[name="create" i] textarea[name="ingredients" i]'
        );
        expect(textArea).toBeTruthy();
      });
      
      // Ensures a textarea for preparation steps exists
      test('a <textarea name="preparation">', () => {
        const { container } = render(<App />);
        const textArea = container.querySelector(
          'form[name="create" i] textarea[name="preparation" i]'
        );
        expect(textArea).toBeTruthy();
      });
      
      // Ensures a submit button exists within the form
      test('a <button type="submit">', () => {
        const { container } = render(<App />);
        const selectbutton = container.querySelector(
          'form[name="create" i] button[type="submit" i]'
        );
        expect(selectbutton).toBeTruthy();
      });
    }); 
  });
  
  // Test suite for verifying the addition and display of a new recipe
  describe("can create a new recipe that displays", () => {

    beforeEach(() => {
      const { container } = render(<App />);
      
      // Select each form input and simulate user input
      const name = container.querySelector(
        'form[name="create" i] input[name="name" i]'
      );
      const photo = container.querySelector(
        'form[name="create" i] input[name="photo" i]'
      );
      const cuisine = container.querySelector(
        'form[name="create" i] input[name="cuisine" i]'
      );
      const ingredients = container.querySelector(
        'form[name="create" i] textarea[name="ingredients" i]'
      );
      const preparation = container.querySelector(
        'form[name="create" i] textarea[name="preparation" i]'
      );
      
      // Simulate changes to each input field
      fireEvent.change(name, { target: { value: "Just an avocado" } });
      fireEvent.change(cuisine, { target: { value: "Raw Food" } });
      fireEvent.change(photo, { target: { value: "http://www.nopicavailable.com" } });
      fireEvent.change(ingredients, { target: { value: "1 avocado" } });
      fireEvent.change(preparation, { target: { value: "peel the avocado" } });

      // Simulate form submission
      const submitButton = container.querySelector(
        'form[name="create" i] button[type="submit" i]'
      );
      fireEvent(
        submitButton,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    
    // Verify if recipe name is displayed
    test("the name", () => {
      expect(screen.queryByText("Just an avocado")).toBeInTheDocument();
    });
    
    // Verify if recipe cuisine type is displayed
    test("the cuisine", () => {
      expect(screen.queryByText("Raw Food")).toBeInTheDocument();
    });
    
    // Verify if recipe photo is displayed
    test("the photo", () => {
      expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'http://www.nopicavailable.com');
    });
    
    // Verify if recipe ingredients are displayed
    test("the ingredients", () => {
      expect(screen.queryByText("1 avocado")).toBeInTheDocument();
    });
    
    // Verify if recipe preparation steps are displayed
    test("the preparation", () => {
      expect(screen.queryByText("peel the avocado")).toBeInTheDocument();
    });
  });

  // Test suite for loading and displaying predefined data from RecipeData.js
  describe("loads and displays data in RecipeData.js correctly", () => {

    // Check if table header exists
    test("table has thead", () => {
      const { container } = render(<App />);
      const thead = container.querySelector('table thead th');
      expect(thead).toBeTruthy();
    });
    
    // Check if table body exists
    test("table has tbody", () => {
      const { container } = render(<App />);
      const tbody = container.querySelector('table tbody tr');
      expect(tbody).toBeTruthy();
    });

    // Verify if the first recipe (Tuna Poke with Mango) is correctly displayed in the first row
    test("Tuna Poke with Mango is displayed in the first row", () => {
      const { container } = render(<App />);
      const row = container.querySelector('table tbody tr');
      const content = within(row);
      expect(content.getByText(RecipeData[0]["name"])).toBeInTheDocument();             
      expect(content.getByText(RecipeData[0]["cuisine"])).toBeInTheDocument();
      expect(content.getByRole('img')).toHaveAttribute('src', RecipeData[0]["photo"]);
      expect(content.getByText(RecipeData[0]["ingredients"])).toBeInTheDocument();
      expect(content.getByText(RecipeData[0]["preparation"])).toBeInTheDocument();
    });

    // Check if delete button is displayed in each row
    test("delete button with name='delete' is displayed", () => {
      const { container } = render(<App />);
      const deleteButton = container.querySelector(
        'table tbody td button[name="delete" i]'
      );
      expect(deleteButton).toBeTruthy();
    });
    
  });

  // Test suite for verifying delete functionality in the recipe list
  describe("deletes", () => {

    // Test if the delete button removes the recipe from display
    test("recipe is deleted when the delete button is clicked", () => {
      const { container } = render(<App />);
      const row = container.querySelector('table tbody tr');
      const content = within(row);
      
      // Confirm recipe is initially present
      expect(content.getByText(/Tuna Poke with Mango/)).toBeInTheDocument();
      
      // Simulate clicking the delete button
      const deleteButton = content.getByText(/delete/i);
      fireEvent(
        deleteButton,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
      
      // Verify recipe has been removed after delete action
      const newRow = container.querySelector('table tbody tr');
      const newContent = within(newRow);
      expect(newContent.queryByText(/Tuna Poke with Mango/)).toBeNull();
    });
  });
});
