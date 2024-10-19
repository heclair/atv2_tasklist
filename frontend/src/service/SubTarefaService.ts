// src/services/SubTarefaService.ts
import axios from 'axios';
import api from './api';
import { SubTarefa } from '../types/SubTarefa';

const API_URL = api; // Atualize com sua URL base

const SubTarefaService = {
    async addSubTarefa(listaId: string, subtarefaData: SubTarefa) {
        const response = await axios.post(`${API_URL}/subtarefa`, { ...subtarefaData, listaid: listaId });
        return response.data;
    },
    async listTarefasPorDataVencimento(listaId: string, dataVencimento: string) {
        const response = await axios.get(`${API_URL}/subtarefa/listdatavencimento`, {
            params: { listaId, dataVencimento }
        });
        return response.data;
    },
    // Adicione outros métodos conforme necessário
};

export default SubTarefaService;
