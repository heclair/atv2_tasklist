// src/contexts/SubTarefaContext.tsx
import React, { createContext, useContext, useState } from 'react';

import { SubTarefa } from '../types/SubTarefa';
import SubTarefaService from '../service/SubTarefaService';

interface SubTarefaContextType {
    subtarefas: SubTarefa[];
    loading: boolean;
    addSubTarefa: (listaId: string, subtarefaData: SubTarefa) => Promise<void>;
}

const SubTarefaContext = createContext<SubTarefaContextType | undefined>(undefined);

export const SubTarefaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [subtarefas, setSubtarefas] = useState<SubTarefa[]>([]);
    const [loading, setLoading] = useState(false);

    const addSubTarefa = async (listaId: string, subtarefaData: SubTarefa) => {
        setLoading(true);
        try {
            const newSubTarefa = await SubTarefaService.addSubTarefa(listaId, subtarefaData);
            setSubtarefas((prev) => [...prev, newSubTarefa]);
        } catch (error) {
            console.error('Erro ao adicionar subtarefa:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SubTarefaContext.Provider value={{ subtarefas, loading, addSubTarefa }}>
            {children}
        </SubTarefaContext.Provider>
    );
};

export const useSubTarefa = () => {
    const context = useContext(SubTarefaContext);
    if (!context) {
        throw new Error('useSubTarefa deve ser usado dentro de um SubTarefaProvider');
    }
    return context;
};
