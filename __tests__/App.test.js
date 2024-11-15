import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import RecipeData from "../RecipeData";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect'

describe("App", () => {
  
  // Tests for the presence of form structure required to create a new recipe
  describe("includes necessary structure to create a recipe", () => {

    // Verifies that a form with the specified name attribute exists
    test('a form with name="create"', () => {
      const { container } = render(<App />);
      expect(container.querySelector('form[name="create" i]')).toBeTruthy();
    });

    describe("create form contains", () => {
      // Tests for the existence of each required input field and button within the create form
      
      test('an <input name="name">', () => {
        const { container } = render(<App />);
        const name = container.querySelector(
          'form[name="create" i] input[name="name" i]'
        );
        expect(name).toBeTruthy();
      });

      test('an <input name="cuisine">', () => {
        const { container } = render(<App />);
        const cuisine = container.querySelector(
          'form[name="create" i] input[name="cuisine" i]'
        );
        expect(cuisine).toBeTruthy();
      });
      
      test('an <input name="photo">', () => {
        const { container } = render(<App />);
        const photo = container.querySelector(
          'form[name="create" i] input[name="photo" i]'
        );
        expect(photo).toBeTruthy();
      });
      
      test('a <textarea name="ingredients">', () => {
        const { container } = render(<App />);
        const ingredients = container.querySelector(
          'form[name="create" i] textarea[name="ingredients" i]'
        );
        expect(ingredients).toBeTruthy();
      });
      
      test('a <textarea name="preparation">', () => {
        const { container } = render(<App />);
        const preparation = container.querySelector(
          'form[name="create" i] textarea[name="preparation" i]'
        );
        expect(preparation).toBeTruthy();
      });
      
      test('a <button type="submit">', () => {
        const { container } = render(<App />);
        const submitButton = container.querySelector(
          'form[name="create" i] button[type="submit" i]'
        );
        expect(submitButton).toBeTruthy();
      });
    });
  });

  // Tests for creating a new recipe entry and displaying it correctly
  describe("can create a new recipe that displays", () => {

    // Sets up a new recipe entry before each test within this describe block
    beforeEach(() => {
      const { container } = render(<App />);
      
      // Filling in form fields with test data
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
      fireEvent.change(name, { target: { value: "Just an avocado" } });
      fireEvent.change(cuisine, { target: { value: "Raw Food" } });
      fireEvent.change(photo, { target: { value: "http://www.nopicavailable.com" } });
      fireEvent.change(ingredients, { target: { value: "1 avocado" } });
      fireEvent.change(preparation, { target: { value: "peel the avocado" } });

      // Simulating form submission
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
    
    // Test each part of the displayed recipe after creation  
    test("the name", () => {
      expect(screen.queryByText("Just an avocado")).toBeInTheDocument();
    });
    
    test("the cuisine", () => {
      expect(screen.queryByText("Raw Food")).toBeInTheDocument();
    });
    
    test("the photo", () => {
      expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'http://www.nopicavailable.com');
    });
    
    test("the ingredients", () => {
      expect(screen.queryByText("1 avocado")).toBeInTheDocument();
    });
    
    test("the preparation", () => {
      expect(screen.queryByText("peel the avocado")).toBeInTheDocument();
    });
  });

  // Tests for verifying correct display of recipe data from RecipeData.js
  describe("loads and displays data in RecipeData.js correctly", () => {

    // Ensures that the table structure is present in the document
    test("table has thead", () => {
      const { container } = render(<App />);
      const thead = container.querySelector('table thead th');
      expect(thead).toBeTruthy();
    });
    
    test("table has tbody", () => {
      const { container } = render(<App />);
      const tbody = container.querySelector('table tbody tr');
      expect(tbody).toBeTruthy();
    });

    // Confirms that the first row displays the correct recipe data from RecipeData.js
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

    // Tests for the presence of a delete button for each recipe entry
    test("delete button with name='delete' is displayed", () => {
      const { container } = render(<App />);
      const deleteButton = container.querySelector(
        'table tbody td button[name="delete" i]'
      );
      expect(deleteButton).toBeTruthy();
    });
  });

  // Tests for deleting a recipe entry by simulating a delete button click
  describe("deletes", () => {

    // Checks that the recipe is removed from the document after delete button click
    test("recipe is deleted when the delete button is clicked", () => {
      const { container } = render(<App />);
      const row = container.querySelector('table tbody tr');
      const content = within(row);
      expect(content.getByText(/Tuna Poke with Mango/)).toBeInTheDocument();
      
      // Simulating delete button click
      const deleteButton = content.getByText(/delete/i);
      fireEvent(
        deleteButton,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );

      // Ensures the recipe no longer appears in the document
      const newRow = container.querySelector('table tbody tr');
      const newContent = within(newRow);
      expect(newContent.queryByText(/Tuna Poke with Mango/)).toBeNull();
    });
  });
});
