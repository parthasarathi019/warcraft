import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import { router } from "./Routes/Route/Route";
import { Providers } from "./GlobalRedux/provider";
import AuthProvider from "./Contexts/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CounterProvider } from "../Hooks/CounterContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <CounterProvider>
    <Providers>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Providers>
  </CounterProvider>
);
