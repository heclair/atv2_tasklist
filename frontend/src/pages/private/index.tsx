// src/pages/private/index.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Private: React.FC = () => {
    const navigate = useNavigate();

    const styles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#0056b3', // Azul mais escuro
        color: '#FFD700', // Dourado
        textAlign: 'center',
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '20px',
    };

    const handleLogout = () => {
        // Função de logout (pode ser implementada posteriormente)
        navigate("/");
    };

    return (
        <div style={styles}>
            <h1 style={titleStyle}>Área Privada</h1>
            <p>Aqui você pode gerenciar suas tarefas com segurança.</p>
            <button onClick={handleLogout} style={{
                padding: '10px 20px',
                backgroundColor: '#FFD700',
                color: '#0056b3',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
            }}>
                Sair
            </button>
        </div>
    );
};

export default Private;
