import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { loginAccount } from "../services/api";

import "../styles/loginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);

  const login = async () => {
    const resp = await loginAccount({ username: username, password: password });

    if (resp) {
      await setToken(resp.token);
    } else {
      console.log(resp);
    }
  };

  return (
    <>
      <div>
        <h1 className="login_titulo">
          Cafet<span>eria</span> Maule
        </h1>
        <label for="text">nombre</label>
        <input
          id="text"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="username"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <button onClick={login}>Ingresa</button>
      </div>
    </>
  );
};

export default LoginPage;
