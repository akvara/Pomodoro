import React from "react";
import { createRoot } from "react-dom/client";
import "./config.js";
import Audio from "./components/Audio";
import App from "./components/App";

createRoot(document.getElementById("audio")).render(<Audio />);
createRoot(document.getElementById("app")).render(<App />);
