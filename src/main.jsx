import React from "react";
import ReactDOM from "react-dom/client";
import ZenKeeper from "./ZenKeeper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ZenKeeper />
  </React.StrictMode>
);

// React mounted successfully — remove the HTML loading/error fallback.
requestAnimationFrame(() => {
  const fb = document.getElementById("fallback");
  if (fb) fb.remove();
});
