import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme";

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(app);
