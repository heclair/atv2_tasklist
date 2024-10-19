import React, { createContext, useContext, useEffect, useState } from 'react';
import listaTarefaService from '../service/listaTarefaService';
import { AuthContext } from './Auth/AuthContext';

interface ListaTarefaContextType {
    listas: any[]; // Ajuste o tipo conforme a estrutura das suas listas
    loading: boolean;
    createListaTarefa: (nomeLista: string, tarefas: Array<any>) => Promise<void>;
    deleteListaTarefa: (listaId: string) => Promise<void>;
    updateNomeLista: (listaId: string, nomeLista: string) => Promise<void>;
    filterLists: (startDate?: string, endDate?: string) => Promise<void>;
}

const ListaTarefaContext = createContext<ListaTarefaContextType | undefined>(undefined);

export const ListaTarefaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [listas, setListas] = useState<any[]>([]); // Ajuste o tipo conforme necessário
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadListaTarefas();
        }
    }, [user]);

    const loadListaTarefas = async (startDate?: string, endDate?: string) => {
        setLoading(true);
        try {
            if (user) {
                const fetchedListas = await listaTarefaService.listListaTarefas(user.id, startDate, endDate);
                console.log(fetchedListas); // Adicione este log para depuração
                setListas(fetchedListas);
            } else {
                console.warn('Usuário não encontrado. Não é possível carregar as listas de tarefas.');
                setListas([]);
            }
        } catch (error) {
            console.error('Erro ao carregar listas de tarefas:', error);
        } finally {
            setLoading(false);
        }
    };
    
    

    const createListaTarefa = async (nomeLista: string, tarefas: Array<any>) => {
        if (!user) return;
        // Alterado user._id para user.id
        await listaTarefaService.createListaTarefa(nomeLista, user.id, tarefas);
        loadListaTarefas();
    };

    const deleteListaTarefa = async (listaId: string) => {
        if (!user) return;
        // Alterado user._id para user.id
        await listaTarefaService.deleteListaTarefa(listaId, user.id);
        loadListaTarefas();
    };

    const updateNomeLista = async (listaId: string, nomeLista: string) => {
        if (!user) return;
        // Alterado user._id para user.id
        await listaTarefaService.updateNomeLista(listaId, user.id, nomeLista);
        loadListaTarefas();
    };

    const filterLists = async (startDate?: string, endDate?: string) => {
        loadListaTarefas(startDate, endDate);
    };

    return (
        <ListaTarefaContext.Provider value={{ listas, loading, createListaTarefa, deleteListaTarefa, updateNomeLista, filterLists }}>
            {children}
        </ListaTarefaContext.Provider>
    );
};

export const useListaTarefa = () => {
    const context = useContext(ListaTarefaContext);
    if (!context) {
        throw new Error('useListaTarefa deve ser usado dentro de um ListaTarefaProvider');
    }
    return context;
};
