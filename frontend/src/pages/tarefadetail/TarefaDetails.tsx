// src/pages/TarefaDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SubTarefa } from '../../types/SubTarefa';
import { Tarefa } from '../../types/tarefa';

const TarefaDetails: React.FC = () => {
    const { listId } = useParams<{ listId: string }>();
    const { tarefas, loading, listTarefasPorDataVencimento, addTarefa, addSubTarefa } = useTarefa();

    useEffect(() => {
        const fetchTarefas = async () => {
            if (listId) {
                await listTarefasPorDataVencimento(listId, ""); // Carregar tarefas ao abrir a página
            }
        };
        fetchTarefas();
    }, [listId, listTarefasPorDataVencimento]);

    const handleAddTarefa = async (tarefaData: Tarefa) => {
        if (listId) {
            await addTarefa(listId, tarefaData); // Adicionar nova tarefa
        }
    };

    const [subTarefaNome, setSubTarefaNome] = useState('');
    const [selectedTarefaId, setSelectedTarefaId] = useState<string | null>(null);

    const handleAddSubTarefa = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedTarefaId && subTarefaNome) {
            await addSubTarefa(selectedTarefaId, { 
                nomeTarefa: subTarefaNome, 
                dataCriacao: new Date(), 
                prioridade: "Baixa", 
                status: "Pendente" 
            }); // Adiciona a subtarefa
            setSubTarefaNome(''); // Limpa o campo após a adição
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Detalhes da Lista de Tarefas</h1>
            <ul>
                {tarefas.map((tarefa: Tarefa) => (
                    <li key={tarefa._id}>
                        <h2>{tarefa.nomeTarefa}</h2>
                        <button onClick={() => setSelectedTarefaId(tarefa._id)}>Selecionar Tarefa</button>
                        <form onSubmit={handleAddSubTarefa}>
                            <input 
                                type="text" 
                                value={subTarefaNome} 
                                onChange={(e) => setSubTarefaNome(e.target.value)} 
                                placeholder="Nome da nova subtarefa" 
                                required 
                            />
                            <button type="submit">Adicionar Subtarefa</button>
                        </form>
                        <ul>
                            {tarefa.tarefas?.map((subTarefa: SubTarefa) => (
                                <li key={subTarefa._id}>{subTarefa.nomeTarefa}</li> // Usando _id para a chave
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <form onSubmit={(e) => {
                e.preventDefault();
                const tarefaData: Tarefa = { 
                    nomeTarefa: e.currentTarget.nome.value, 
                    _id: "", // Ajuste conforme necessário
                    dataCriacao: new Date(), // Supondo que você tenha isso na sua interface
                    prioridade: "Baixa", // Ajuste se necessário
                    status: "Pendente", // Ajuste se necessário
                    tarefas: [] // Inicializa com um array vazio
                };
                handleAddTarefa(tarefaData);
                e.currentTarget.reset();
            }}>
                <input type="text" name="nome" placeholder="Nome da nova tarefa" required />
                <button type="submit">Adicionar Tarefa</button>
            </form>
        </div>
    );
};

export default TarefaDetails;
function useTarefa(): { tarefas: any; loading: any; listTarefasPorDataVencimento: any; addTarefa: any; addSubTarefa: any; } {
    throw new Error('Function not implemented.');
}

