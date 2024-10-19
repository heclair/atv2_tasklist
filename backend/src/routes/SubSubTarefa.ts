import { Router } from "express";
import { SubSubTarefaController } from "../controllers"; 


const router = Router();

// Rota para criar uma nova lista de tarefas
//router.post("/", SubSubTarefaController.create);
router.post("/subsubtarefa", SubSubTarefaController.update);


export default router;
