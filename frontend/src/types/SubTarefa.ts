// src/types/SubTarefa.ts

export interface SubTarefa {
    _id: string; // ID da subtarefa
    nomeTarefa: string; // Nome da subtarefa
    descricao?: string; // Descrição da subtarefa (opcional)
    dataCriacao: Date; // Data de criação da subtarefa
    dataVencimento?: Date; // Data de vencimento da subtarefa (opcional)
    prioridade: string; // Prioridade da subtarefa
    status: string; // Status da subtarefa
}
