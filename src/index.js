
///este es el puente entre el componente que creó en el App.jsarchivo y el navegador web.
import React, { StrictMode } from "react";///importamos StrictMode
import { createRoot } from "react-dom/client";///importamos createRoot iblioteca de React para hablar con los navegadores web 
import "./styles.css";///importamos styles.css estilos para sus componentes

import App from "./App";///importamos App componente que creó en App.js.
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);