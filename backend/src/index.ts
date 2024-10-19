import app from "./app";

const PORT = process.env.PORT || 3000;

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}...`);
});