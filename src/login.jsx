import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/login.css';

export const Login = () => {
  const [userDatos, setUserDatos] = useState({
    email: "",
    password: "",
  });

  const passwordInput = (e) => {
    const password = e.target.value;
    setUserDatos({ ...userDatos, password });
  };
  

  const [passwordValidation, setPasswordValidation] = useState("");
  function passVal () {
    setPasswordValidation(userDatos.password === "" ? "La contraseña es requerida" : "");
  }

  const emailInput = (e) => {
    const email = e.target.value;
    setUserDatos({ ...userDatos, email });
  };

  const [emailValidation, setEmailValidation] = useState("");
  function emailVal () {
    setEmailValidation(userDatos.email === "" ? "El email es requerido" : "");
  }

  const [showPass, setShowPass] = useState(false);
  const typeInput = () => setShowPass(!showPass);

  const [loading, setLoading] = useState(false);

  const [wrongEmail, setWrongEmail] = useState("");

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
    console.log(response);

    setLoading(false)

    const data  = await response.json();
    console.log(data);
    console.log(data.error)

    function emailVal2 () {
      setWrongEmail(data.error === 'user not found' ? "El usuario no existe" : ""); 
    }

    emailVal();
    emailVal2();
    passVal();
    

    if (response.status !== 200) {
      console.log("Error");
    } else {
      console.log("Succes");
      console.log(data);
      console.log(data.token);
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
        <span> {emailValidation} </span>
        <span> {wrongEmail} </span>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-eye-exclamation"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M15.03 17.478a8.797 8.797 0 0 1 -3.03 .522c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a20.48 20.48 0 0 1 -.258 .419"></path>
              <path d="M19 16v3"></path>
              <path d="M19 22v.01"></path>
            </svg>
          </button>
        </div>
        <span> {passwordValidation} </span>
        <button className="btnLogin" onClick={() => fetchData() }>
          Iniciar Sesión
        </button>
        {/* <Link to={isLoggedIn ? "table" : "/"}>Table</Link> */}
      </div>
    </div>
  );
};

// eve.holt@reqres.in
// cityslicka
