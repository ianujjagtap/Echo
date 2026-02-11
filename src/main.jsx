import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <Toaster
        duration={2000}
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.17 0 0)",
            border: "1px solid oklch(0.3 0 0)",
            color: "oklch(0.985 0 0)",
          },
        }}
      />
    </React.StrictMode>
  </Provider>
);
