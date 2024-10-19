import { Link, Route, Routes } from "react-router-dom";
import { Home, Private, Register, User } from "./pages"; // Importando as páginas
import "./app.css";
import RequireAuth from "./contexts/Auth/RequireAuth";
import { useContext } from "react";
import { AuthContext } from "./contexts/Auth/AuthContext";
import TaskList from "./pages/taskList"; // Importando a nova página de tarefas
import TarefaDetails from "./pages/tarefadetail/TarefaDetails";


function App() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    window.location.reload();
  };

  return (
    <div className="app">
      <header>
        <nav>
          <Link to="/">Home</Link>
          {auth.user ? (
            <div>
              <button>
                <Link to={`/user/${auth.user?.id}`}>
                  <img src="" alt="Página de usuário" />
                </Link>
              </button>
              <button onClick={handleLogout}>
                <img src="" alt="Logout Button" />
              </button>
              <button>
                <Link to="/tasklist">Minhas Tarefas</Link> {/* Link para a nova página */}
              </button>
            </div>
          ) : (
            <button>
              <Link to="/private">
                <img src="" alt="Página de usuário" />
              </Link>
            </button>
          )}
        </nav>
      </header>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/private"
          element={
            <RequireAuth>
              <Private />
            </RequireAuth>
          }
        />
        <Route
          path="/user/:id"
          element={
            <RequireAuth>
              <User />
            </RequireAuth>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasklist"
          element={
            <RequireAuth>
              <TaskList />
            </RequireAuth>
          }
        /> {/* Rota para a nova página de tarefas */}
        <Route
          path="/tarefadetails/:listId" // Rota para detalhes da tarefa
          element={
            <RequireAuth>
              <TarefaDetails />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
