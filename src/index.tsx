import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./routes/main";
import { ModalProvider } from "./modules/modals/modal-provider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6ca7a4",
    },
    secondary: {
      main: "#ec407a",
    },
    background: {
      default: "#F6F5F2",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

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
