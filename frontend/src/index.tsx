import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/Auth/AuthProvider";
import { ListaTarefaProvider } from "./contexts/ListaTarefaContext";
import { SubTarefaProvider } from "./contexts/tarefaContext";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Em qualquer lugar da aplicação tem-se acesso ao contexto */}
    <AuthProvider>
    <ListaTarefaProvider>
    <SubTarefaProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </SubTarefaProvider>
      </ListaTarefaProvider>
    </AuthProvider>
  </React.StrictMode>
);
