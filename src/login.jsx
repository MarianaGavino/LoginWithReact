import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import logo from "./passwordEye.svg";

export const Login = () => {
  const [validation, setValidation] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const [userDatos, setUserDatos] = useState({
    email: "",
    password: "",
  });

  const emailInput = (e) => {
    const email = e.target.value;
    setUserDatos({ ...userDatos, email });
  };

  const passwordInput = (e) => {
    const password = e.target.value;
    setUserDatos({ ...userDatos, password });
  };

  const typeInput = () => setShowPass(!showPass);

  const navigate = useNavigate();

  const fetchData = async () => {
    const email = userDatos.email;
    const password = userDatos.password;

    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ email, password });

    setLoading(true);

    let response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      body,
      headers,
    });

    setLoading(false);

    const data = await response.json();

    const val = () => {
      const errors = {
        email: userDatos.email === "" ? "El email es requerido" : "",
        password: userDatos.password === "" ? "La contraseña es requerida" : "",
      };

      if (data.error === "user not found") {
        errors.email = "El usuario no existe";
      }

      setValidation(errors);
    };

    val();

    if (response.status === 200) {
      navigate("/table");
    }
  };

  return (
    <div className="container">
      <div className="content">
        <label className="title">Inicio de Sesión</label>
        <div
          className={`loader ${
            loading === true ? "loadervisible" : "loaderhidden"
          }`}
        />
        <label>Email</label>
        <input
          placeholder="ejemplo@ejemplo.com"
          className="inputEmail"
          value={userDatos.email}
          onChange={emailInput}
        />
        <span className="spanVal"> {validation.email} </span>

        <label>Password</label>
        <div className="pass">
          <input
            placeholder="password"
            type={showPass ? "text" : "password"}
            className="inputPass"
            value={userDatos.password}
            onChange={passwordInput}
          />
          <button className="btnShowPass" onClick={() => typeInput()}>
            <img src={logo} alt="passwordEye"></img>
          </button>
        </div>
        <span className="spanVal">{validation.password}</span>
        <button className="btnLogin" onClick={() => fetchData()}>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};


