import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor, store} from "./app/store";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme";
import {PersistGate} from "redux-persist/integration/react";

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(app);
