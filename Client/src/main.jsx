import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import CurioXApp from "./App.jsx";r
import { UserContextProvider } from "./Context/UserContext";
import { CourseContextProvide } from "./Context/CourseContext.jsx";
import "sweetalert2/dist/sweetalert2.min.css";
export const Server = "http://localhost:8000";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <CourseContextProvide>
        <App />
      </CourseContextProvide>
    </UserContextProvider>
  </StrictMode>
);
