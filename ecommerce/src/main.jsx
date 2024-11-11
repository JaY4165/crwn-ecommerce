import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import ShopPage from "./page/shopPage/ShopPage.component.jsx";
import HomePage from "./page/homePage/HomePage.component.jsx";
import AuthPage from "./page/authPage/AuthPage.jsx";
import store from "./store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },

      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
