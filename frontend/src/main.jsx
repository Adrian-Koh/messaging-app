import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserForm } from "./components/UserForm/UserForm.jsx";
import { ChatPage } from "./components/ChatPage/ChatPage.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <UserForm action="login" /> },
      { path: "signup", element: <UserForm action="signup" /> },
      { path: "", element: <ChatPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
