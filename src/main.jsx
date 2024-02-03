import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./Routes/Routes.jsx"
import { HelmetProvider } from "react-helmet-async"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import AuthProvider from "./Providers/AuthProvider.jsx"

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-primary-content max-w-screen-[1920px] mx-auto">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
          </HelmetProvider>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  </React.StrictMode>
)
