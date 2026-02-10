import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import App from "./App";
import { AppProvider } from "./contexts/AppContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);

// Unregister service worker - was causing stale cache issues
serviceWorkerRegistration.unregister();
