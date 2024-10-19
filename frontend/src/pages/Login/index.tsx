// src/pages/login/index.tsx
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      const isLogged = await auth.signin(email, password);
      if (isLogged) {
        navigate("/");
      } else {
        alert("Falha ao logar");
      }
    }
  };

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

  return (
    <div style={styles}>
      <h2 style={{ color: '#ffcc00' }}>Página de Login</h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          width: '80%',
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        style={{
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          width: '80%',
        }}
      />
      <button onClick={handleLogin} style={{
        padding: '10px 20px',
        backgroundColor: '#FFD700',
        color: '#0056b3',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}>
        ENTRAR
      </button>
      <Link to="/register" style={{ marginTop: '10px', color: '#ffffff' }}>REGISTRE-SE</Link>
    </div>
  );
};

export default Login;
