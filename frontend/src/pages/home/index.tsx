import React from 'react';
import { useNavigate } from 'react-router-dom';

// Definindo um objeto de estilos com tipagem correta
const Home: React.FC = () => {
    const navigate = useNavigate();

    // Estilos
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

    const welcomeTitleStyle: React.CSSProperties = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#ffcc00', // Dourado
    };

    const welcomeMessageStyle: React.CSSProperties = {
        fontSize: '1.2rem',
        marginBottom: '30px',
    };

    const startButtonStyle: React.CSSProperties = {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#1e3a8a', // Azul escuro
        color: '#ffffff', // Branco
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const handleStart = () => {
        navigate("/private"); // Redireciona para a página de login
    };

    return (
        <div style={styles}>
            <h1 style={welcomeTitleStyle}>Bem-vindo à sua Task List!</h1>
            <p style={welcomeMessageStyle}>Organize suas tarefas de maneira eficiente.</p>
            <button
                onClick={handleStart}
                style={startButtonStyle}
            >
                Começar
            </button>
        </div>
    );
};

export default Home;
