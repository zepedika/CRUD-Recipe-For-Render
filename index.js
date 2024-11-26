/**
 * Recipe Tracker Application
 *
 * This React application provides users with a platform to organize, store, and manage their favorite recipes.
 * It features a clean, user-friendly interface that supports adding, viewing, and deleting recipes, along with 
 * the ability to upload photos for visual tracking. Built as part of the Thinkful curriculum, the application 
 * demonstrates proficiency in developing interactive web applications with CRUD functionality, emphasizing 
 * intuitive design and seamless user experience.
 *
 */

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(document.querySelector("#root"))
  .render(<App />);
