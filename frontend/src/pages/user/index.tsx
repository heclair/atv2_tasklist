import { useContext } from "react";
import type { User } from "../../types/User";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export default function User() {
    const auth = useContext(AuthContext);

    return (
        <div>
            <h1>Olá, {auth.user?.name} </h1>  
            <p> Seus dados são: <br />
                nome: {auth.user?.name}; <br />
                email: {auth.user?.email}; <br />
                senha: {auth.user?.password}; <br />
                id: {auth.user?.id}; <br />
                status: {auth.user?.isLogged}
            </p>
        </div>
    );
}