import api from './api';



interface ListaTarefa {
    _id: string;
    nomeLista: string;
    tarefas: Array<any>; // Ajuste o tipo conforme a estrutura das suas tarefas
    dataCriacao: string;
}

// Função para criar uma nova lista de tarefas
export const createListaTarefa = async (nomeLista: string, userId: string, tarefas: Array<any>) => {
    const response = await api.post('/lista', { nomeLista, userId, tarefas });
    return response.data;
};

// Função para listar todas as listas de tarefas do usuário
export const listListaTarefas = async (userId: string, startDate?: string, endDate?: string) => {
    const response = await api.get('/listartarefa', {
        params: { userId, startDate, endDate },
    });
    return response.data;
};

// Função para deletar uma lista de tarefas
export const deleteListaTarefa = async (listaId: string, userId: string) => {
    const response = await api.delete('/deletarlista', {
        data: { listaId, userId },
    });
    return response.data;
};

// Função para atualizar o nome de uma lista de tarefas
export const updateNomeLista = async (listaId: string, userId: string, nomeLista: string) => {
    const response = await api.put('/atualizanome', { listaId, userId, nomeLista });
    return response.data;
};

// Função para listar todas as listas de tarefas
export const listAllListaTarefas = async () => {
    const response = await api.get('/listartudo');
    return response.data;
};

export default {
    createListaTarefa,
    listListaTarefas,
    deleteListaTarefa,
    updateNomeLista,
    listAllListaTarefas,
};
