import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Main from "./routes/main";
import { ModalProvider } from "./modules/modals/modal-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6ca7a4",
    },
    secondary: {
      main: "#ec407a",
    },
    background: {
      default: "#0f1214",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
