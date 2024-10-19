// src/types/tarefa.ts

import { SubTarefa } from './SubTarefa';

export interface Tarefa {
    _id: string; // ID da tarefa
    nomeTarefa: string; // Nome da tarefa
    descricao?: string; // Descrição da tarefa (opcional)
    dataCriacao: Date; // Data de criação da tarefa
    dataVencimento?: Date; // Data de vencimento da tarefa (opcional)
    prioridade: string; // Prioridade da tarefa
    status: string; // Status da tarefa
    tarefas?: SubTarefa[]; // Array de subtarefas (opcional)
}
