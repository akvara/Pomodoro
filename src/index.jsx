import React from "react";
import { createRoot } from "react-dom/client";
import "./config.js";
import Audio from "./components/Audio";
import App from "./components/App";

window.onbeforeunload = function () {
  return "Do you really want to leave Pomodoro app?";
  //if we return nothing here (just calling return;) then there will be no pop-up question at all
  //return;
};

createRoot(document.getElementById("audio")).render(<Audio />);
createRoot(document.getElementById("app")).render(<App />);
