import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import logo from "./passwordEye.svg";

export const Login = () => {
  const [passwordValidation, setPasswordValidation] = useState("");

  const [emailValidation, setEmailValidation] = useState("");

 

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

  const passVal = () => {
    setPasswordValidation(
      userDatos.password === "" ? "La contraseña es requerida" : ""
    );
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

  
    const emailVal = () => {
      if (userDatos.email === "") {
        setEmailValidation("El email es requerido");
      } else if (data.error === "user not found") {
        setEmailValidation("El usuario no existe");
      } else {
        setEmailValidation("");
      }
    };

    emailVal();
    passVal();

    if (response.status !== 200) {
      console.log("Error");
    } else {
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
        <span className="spanVal"> {emailValidation} </span>
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
        <span className="spanVal"> {passwordValidation} </span>
        <button className="btnLogin" onClick={() => fetchData()}>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

// eve.holt@reqres.in
// cityslicka
