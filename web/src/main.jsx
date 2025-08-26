import "@fontsource/orbitron"; // Defaults to 400 weight
import "@fontsource/orbitron/700.css"; // Bold weight
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Tailwind import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
