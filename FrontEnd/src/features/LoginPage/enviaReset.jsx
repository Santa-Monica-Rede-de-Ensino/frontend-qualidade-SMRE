import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'


import { enviar_reset } from '../../services/api';
import { toast } from 'react-toastify';

import { Navigate } from 'react-router-dom';
import './styles.css';

import imglogo from '../../img/logomarca.png'

import imgentrada from '../../img/teste.jpg'


const EnviaReset = () => {
  const navigate = useNavigate();

  const [cpf, setCPF] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { cpf });
    enviar_reset(cpf);

    toast.success("Senha enviada para seu email cadastrado");
    // alert("Senha enviada para seu email cadastrado");

    navigate("/login");

  };


  return (

    <div className="main">
      <div className="overlay"></div>


      <img src={imgentrada} autoPlay loop muted />

      <div className="content">
        <div className="login1" id="login">

          <form className="form-signin" onSubmit={handleSubmit}>

            <img className="logomarca" src={imglogo} autoPlay loop muted />

            <div className="form-floating">
              <label htmlFor="cpf" for="floatingInput" className="control-label" >CPF</label>
              <input type="cpf" className="form-control" name="cpf" id="cpf" placeholder="cpf" value={cpf} onChange={(e) => setCPF(e.target.value)} />
            </div>
            <div className="actions">
              <button type="submit" className="btn btn-outline-primary btn-lg btn-banner" id="button">Enviar Senha</button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );


}
export default EnviaReset;
