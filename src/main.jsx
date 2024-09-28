import Modal from "react-modal";

// Set app element to the root of your app
Modal.setAppElement("#root");
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextProvider } from "./context/context.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
