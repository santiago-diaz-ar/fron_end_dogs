import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducer/store";

//ReactDOM => me permite crear interfacez de usuario  y se encarga de manipular el DOM(document object model)
// createRoot => crear punto de entrada para renderizar mis componentes
// document... selecciona un elemento del DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
//renderizo en root mi app
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
