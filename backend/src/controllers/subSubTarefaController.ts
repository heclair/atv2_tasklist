import { Request, Response } from "express";
import { ListaTarefa } from "../models"; // Certifique-se de importar o modelo ListaTarefa
import moment from "moment";
import mongoose from "mongoose";

class SubSubTarefaController {
    public async update(req: Request, res: Response): Promise<void> {
        console.log('Dados recebidos para criar sub-subtarefa:', req.body);

        // Desestruturar os dados recebidos
        const {
            listaid, // ID da lista onde a subtarefa está
            tarefaId, // ID da subtarefa onde a sub-subtarefa será adicionada
            nomeTarefa,
            descricao,
            prioridade,
            status
        } = req.body;

        const dataCriacao = moment().format("YYYY-MM-DD");
        const dataVencimento = moment().format("YYYY-MM-DD"); // Se aplicável

        // Criar a nova sub-subtarefa
        const novaSubSubTarefa = {
            nomeTarefa,
            descricao,
            dataCriacao,
            dataVencimento,
            prioridade,
            status
        };

        try {
            // Convertendo listaid para ObjectId
            const listaIdObject = new mongoose.Types.ObjectId(listaid);
            
            // Log para verificar os IDs
            console.log('Lista ID:', listaIdObject);
            console.log('Tarefa ID:', tarefaId);

            // Atualizar a ListaTarefa, adicionando a nova sub-subtarefa ao array de tarefas da subtarefa correspondente
            const result = await ListaTarefa.findOneAndUpdate(
                { _id: listaIdObject, "tarefas._id": tarefaId },
                { $push: { "tarefas.$.tarefas": novaSubSubTarefa } },
                { new: true } // Retorna o documento atualizado
            );

            // Log para verificar o resultado da operação
            console.log('Resultado da atualização:', result);

            if (!result) {
                 res.status(404).json({ message: "Subtarefa não encontrada ou não modificada." });
            }

            // Resposta com a nova sub-subtarefa
            res.status(201).json(novaSubSubTarefa);
        } catch (e: any) {
            console.error('Erro ao atualizar a sub-subtarefa:', e);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

export default new SubSubTarefaController();
