import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Landing from "./pages/landing/Landing";
import LoginForm from "./components/Auth/LoginForm";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ResourceList from "./pages/resource/ResourceList";
import ResourceDetail from "./pages/resource/ResourceDetail";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/resources",
        element: (
          <ProtectedRoute>
            <ResourceList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/resources/:id",
        element: (
          <ProtectedRoute>
            <ResourceDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
