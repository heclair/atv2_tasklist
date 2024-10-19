import { Request, Response } from "express";
import { ListaTarefa } from "../models";
import mongoose from "mongoose";
import moment from "moment";


class ListaTarefaController {
  // Método para criar uma nova tarefa
  public async create(req: Request, res: Response): Promise<void> {
    console.log('Dados recebidos:', req.body)
    const { tarefas, nomeLista, userId } = req.body; // Ajuste os campos conforme sua estrutura

    try {

      const dataCriacao = moment().format("YYYY-MM-DD");
      
      const response = await ListaTarefa.create({ tarefas, nomeLista, userId, dataCriacao });

      
      
      res.status(201).json(response); // Código 201 para criação
    } catch (e: any) {
      console.error(e);
      if (e.code === 11000) {
        res.status(400).json({ message: `A tarefa com o título "${tarefas}" já existe.` });
      } else {
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }


  // LISTA TUDO QUE ESTÁ NO BANCO O DOCUMENTO E SUBDOCUMENTO

  public async listAll(req: Request, res: Response): Promise<void> {
    try {
        const listas = await ListaTarefa.find().populate("userId");
        res.status(200).json(listas);
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: "Erro ao buscar listas de tarefas." });
    }
}

// LISTA COM BASE NO ID DO USUARIO E DATA

public async list(req: Request, res: Response): Promise<void> {
  const { userId, startDate, endDate } = req.query; // Recebe os parâmetros via query

  try {
      // Constrói as condições de filtro para a agregação
      const matchConditions: any = { userId: new mongoose.Types.ObjectId(userId as string) };

      // Adiciona filtro de data de criação, se fornecido
      if (startDate || endDate) {
          matchConditions['dataCriacao'] = {};
          if (startDate) {
              matchConditions['dataCriacao'].$gte = new Date(startDate as string);
          }
          if (endDate) {
              matchConditions['dataCriacao'].$lte = new Date(endDate as string);
          }
      }

      // Consulta usando agregação para aplicar os filtros e projeções desejados
      const listas = await ListaTarefa.aggregate([
          { $match: matchConditions }, // Aplica o filtro de userId e dataCriacao (se fornecido)
          {
              $project: {
                  _id: 1, // Inclui o ID da lista
                  nomeLista: 1, // Inclui o nome da lista
                  tarefaCount: { $size: "$tarefas" } // Conta o número de tarefas
              }
          }
      ]);

      res.status(200).json(listas);
  } catch (e: any) {
      console.error(e);
      res.status(500).json({ message: "Erro ao buscar listas de tarefas." });
  }
}

// ATUALIZA O NOME DA LISTA

public async updateNomeLista(req: Request, res: Response): Promise<void> {
  const { userId, nomeLista, listaId } = req.body; // Esperando userId, novo nome da lista e ID da lista a ser atualizada

  try {
      // Verifica se todos os parâmetros necessários estão presentes
      if (!userId || !nomeLista || !listaId) {
          res.status(400).json({ message: "userId, nomeLista e listaId são obrigatórios." });
          return;
      }

      // Verifica se a lista pertence ao usuário
      const lista = await ListaTarefa.findOne({ _id: listaId, userId: new mongoose.Types.ObjectId(userId) });

      if (!lista) {
          res.status(404).json({ message: "Lista não encontrada ou não pertence ao usuário." });
          return;
      }

      // Atualiza o nome da lista
      lista.nomeLista = nomeLista;
      await lista.save();

      res.status(200).json({ message: "Lista atualizada com sucesso.", lista });
  } catch (e: any) {
      console.error(e);
      res.status(500).json({ message: "Erro ao atualizar lista de tarefas." });
  }
}

//METODO PARA DELETAR UMA LISTA SELECIONADA

public async delete(req: Request, res: Response): Promise<void> {
  const { listaId, userId } = req.body; // Espera receber o ID da lista e o ID do usuário

  try {
    // Verifica se os parâmetros necessários estão presentes
    if (!listaId || !userId) {
      res.status(400).json({ message: "listaId e userId são obrigatórios." });
      return;
    }

    // Verifica se a lista pertence ao usuário
    const lista = await ListaTarefa.findOne({ _id: listaId, userId: new mongoose.Types.ObjectId(userId) });

    if (!lista) {
      res.status(404).json({ message: "Lista não encontrada ou não pertence ao usuário." });
      return;
    }

    // Deleta a lista
    await ListaTarefa.deleteOne({ _id: listaId });

    res.status(200).json({ message: "Lista deletada com sucesso." });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "Erro ao deletar a lista de tarefas." });
  }
}


}

export default new ListaTarefaController();
