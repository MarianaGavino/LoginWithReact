import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/login.css';
import logo from "./passwordEye.svg" 

export const Login = () => {
  const [passwordValidation, setPasswordValidation] = useState("");

  const [emailValidation, setEmailValidation] = useState("");

  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const [wrongEmail, setWrongEmail] = useState("");

  const [userDatos, setUserDatos] = useState({
    email: "",
    password: "",
  });

  const passwordInput = (e) => {
    const password = e.target.value;
    setUserDatos({ ...userDatos, password });
  };
  
  function passVal () {
    setPasswordValidation(userDatos.password === "" ? "La contraseña es requerida" : "");
  }

  const emailInput = (e) => {
    const email = e.target.value;
    setUserDatos({ ...userDatos, email });
  };

  function emailVal () {
    setEmailValidation(userDatos.email === "" ? "El email es requerido" : "");
  }

  const typeInput = () => setShowPass(!showPass);

  

  const navigate = useNavigate()

  const fetchData = async () => {
    const email = userDatos.email;
    const password = userDatos.password;

    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ email, password });

    setLoading(true)

    let response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      body,
      headers,
    });

    setLoading(false)

    const data  = await response.json();

    function emailVal2 () {
      setWrongEmail(data.error === 'user not found' ? "El usuario no existe" : ""); 
    }

    emailVal();
    emailVal2();
    passVal();
    

    if (response.status !== 200) {
      console.log("Error");
    } else {
      navigate('/table')
    }
  };


  return (
    <div className="container">
      <div className="content">
        <label className="title">Inicio de Sesión</label>
        <div className={`loader ${loading === true ? 'loadervisible' : 'loaderhidden'}`} />
        <label>Email</label>
        <input
          placeholder="ejemplo@ejemplo.com"
          className="inputEmail"
          value={userDatos.email}
          onChange={emailInput}
        />
        <span className="spanVal"> {emailValidation} </span>
        <span className="spanVal"> {wrongEmail} </span>
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
            <img src={logo}></img>
          </button>
        </div>
        <span className="spanVal"> {passwordValidation} </span>
        <button className="btnLogin" onClick={() => fetchData() }>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

// eve.holt@reqres.in
// cityslicka
