import { Router } from "express";
import { ListaTarefaController } from "../controllers"; // Certifique-se que esta importação está correta

const router = Router();

// Rota para criar uma nova lista de tarefas
router.post("/lista", ListaTarefaController.create);
router.get("/listartarefa", ListaTarefaController.list);
router.get("/listartudo", ListaTarefaController.listAll);
router.put("/atualizanome", ListaTarefaController.updateNomeLista)
router.delete("/deletarlista", ListaTarefaController.delete);

export default router;
