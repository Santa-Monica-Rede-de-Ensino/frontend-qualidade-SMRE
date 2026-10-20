import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";

// require no ternário comparando process.env direto: o webpack descarta o ramo não usado e a build
// do tutorial não leva o Portal. Com uma variável no meio, ele não descarta.
const Raiz = process.env.REACT_APP_ALVO === "tutorial-termo"
  ? require("./Pages/Guia/TutorialTermo").default
  : process.env.REACT_APP_ALVO === "tutorial-helpdesk"
    ? require("./Pages/Guia/TutorialHelpdesk").default
    : process.env.REACT_APP_ALVO === "tutorial-analise-desligamento"
      ? require("./Pages/Guia/TutorialAnaliseDesligamento").default
      : require("./App").default;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Raiz />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
