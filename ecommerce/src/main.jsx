import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import ShopPage from "./page/shopPage/ShopPage.component.jsx";
import HomePage from "./page/homePage/HomePage.component.jsx";
import CheckoutPage from "./page/checkoutPage/checkoutPage.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import CategorySpecificItemsPage from "./page/categorySpecificItemsPage/categorySpecificItemsPage.jsx";
import SignUpPage from "./page/signUpPage/SignUpPage.jsx";
import SignInPage from "./page/signInPage/SignInPage.jsx";
import { ThemeProvider } from "./providers/theme-provider.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

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
        path: "/shop/:categoryTitle",
        element: <CategorySpecificItemsPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);

const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <RouterProvider router={router} />
          <Toaster />
        </Provider>
      </ThemeProvider>
    </PayPalScriptProvider>
  </StrictMode>
);
