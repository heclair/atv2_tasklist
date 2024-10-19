// src/pages/register/index.tsx
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Link } from "react-router-dom";
import user from "../../service/userService";

const Register: React.FC = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (email && name && password) {
      await user.post({
        name: name.trim(),
        email: email,
        isLogged: false,
        password: password,
      });
      // Opcional: redirecionar após registro bem-sucedido
    } else {
      alert("Preencha todos os campos");
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

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '80%',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#FFD700',
    color: '#0056b3',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  };

  return (
    <div style={styles}>
      <h2 style={{ color: '#ffcc00' }}>Página de Cadastro</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        style={inputStyle}
      />

      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={inputStyle}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        style={inputStyle}
      />

      <button onClick={handleRegister} style={buttonStyle}>
        Registrar
      </button>

      <Link to="/private" style={{ marginTop: '10px', color: '#ffffff' }}>
        Já possui um cadastro? Entre!
      </Link>
    </div>
  );
};

export default Register;
