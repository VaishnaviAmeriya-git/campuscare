import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { useEffect } from "react";
import { auth } from "./firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { ThemeProvider } from "./context/ThemeContext";

import "./index.css";

function AuthWrapper({ children }) {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInAnonymously(auth);
      }
    });
  }, []);

  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
