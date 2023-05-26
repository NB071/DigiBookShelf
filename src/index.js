import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient()

root.render(
  <BrowserRouter>
    <AuthProvider>
      <SnackbarProvider autoHideDuration="4000">
        <QueryClientProvider client={queryClient}>
          <App queryClient={queryClient}/>
        </QueryClientProvider>
      </SnackbarProvider>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();
