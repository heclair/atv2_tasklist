import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { connect } from "./database/connections";

dotenv.config();

const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// configura o servidor para receber requisições de qualquer domínio
app.use(cors());

connect();

// define a rota para o pacote /routes
app.use(routes);

export default app;