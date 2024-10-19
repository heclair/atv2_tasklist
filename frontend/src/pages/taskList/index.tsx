import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useListaTarefa } from '../../contexts/ListaTarefaContext';
import moment from 'moment';

const TaskList: React.FC = () => {
    const { listas, loading, createListaTarefa, deleteListaTarefa, filterLists, updateNomeLista } = useListaTarefa();
    const [newListName, setNewListName] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Estado para a busca pelo nome da lista
    const [addedListName, setAddedListName] = useState<string | null>(null);
    const [editListId, setEditListId] = useState<string | null>(null); // Estado para armazenar o ID da lista em edição
    const [editListName, setEditListName] = useState(""); // Estado para armazenar o novo nome da lista

    useEffect(() => {
        if (filterDate) {
            filterLists(filterDate, filterDate);
        }
    }, [filterDate, filterLists]);

    const handleAddList = async () => {
        if (newListName) {
            await createListaTarefa(newListName, []);
            setAddedListName(newListName);
            setNewListName("");
            setTimeout(() => setAddedListName(null), 3000);
        } else {
            alert("Digite o nome da nova lista");
        }
    };

    const handleDeleteList = async (listId: string) => {
        await deleteListaTarefa(listId);
    };

    const handleEditList = (listId: string, currentName: string) => {
        setEditListId(listId); // Define a lista que está sendo editada
        setEditListName(currentName); // Preenche o campo de edição com o nome atual
    };

    const handleUpdateListName = async (listId: string) => {
        if (editListName) {
            await updateNomeLista(listId, editListName);
            setEditListId(null); // Limpa o ID da lista em edição após a atualização
            setEditListName(""); // Limpa o campo de entrada de edição
        } else {
            alert("O nome da lista não pode estar vazio.");
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '20px auto', maxWidth: '600px' }}>
            <h1>Minhas Listas de Tarefas</h1>

            <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Nome da nova lista"
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }}
            />
            <button onClick={handleAddList} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Adicionar Lista
            </button>

            {addedListName && <div style={{ color: 'green', margin: '10px 0' }}>Lista "{addedListName}" adicionada!</div>}

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar pelo nome da lista"
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', margin: '10px 0' }}
            />

            <div>
                <label htmlFor="filterDate">Filtrar por data:</label>
                <input
                    type="date"
                    id="filterDate"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginLeft: '10px' }}
                />
            </div>

            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {listas
                    .filter(list => 
                        list.nomeLista.toLowerCase().includes(searchTerm.toLowerCase()) && // Filtro pelo nome da lista
                        (!filterDate || moment(list.dataVencimento).isSame(moment(filterDate), 'day'))
                    )
                    .map(list => (
                        <li key={list._id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', padding: '10px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ backgroundColor: '#e9ecef', padding: '5px', borderRadius: '4px', fontWeight: 'bold' }}>
                                {list.nomeLista} - {moment(list.dataCriacao).format('DD/MM/YYYY')}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {editListId === list._id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editListName}
                                            onChange={(e) => setEditListName(e.target.value)}
                                            placeholder="Novo nome"
                                            style={{ marginRight: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                                        />
                                        <button onClick={() => handleUpdateListName(list._id)} style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Atualizar</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditList(list._id, list.nomeLista)} style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>Editar Nome</button>
                                        <button onClick={() => handleDeleteList(list._id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Deletar</button>
                                        <Link to={`/tarefadetails/${list._id}`} style={{ textDecoration: 'none', color: '#007bff', marginLeft: '10px' }}>Ver Detalhes</Link>



                                    </>
                                )}
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TaskList;
