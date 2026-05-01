import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);