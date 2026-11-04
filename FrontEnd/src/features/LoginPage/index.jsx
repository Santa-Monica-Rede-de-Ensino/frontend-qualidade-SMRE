import React, { useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";

import './styles.css';

import imglogo from '../../img/logomarca.png'

import imgentrada from '../../img/teste.jpg'




const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);

    const [cpf, setCPF] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", { cpf, password });
        login(cpf, password);
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
                        <div className="form-floating">
                            <label htmlFor="password" for="floatingPassword" className="control-label">Senha</label>
                            <input type="password" className="form-control form-control-sm" name="password" id="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="links">
                        <br></br>
                            <Link to="/enviaReset" className="mx-3">Novo Cadastro</Link>
                            <Link to="/enviaReset" className="mx-3">Resetar Senha</Link>
                        </div>
                        <div className="actions">
                            <button type="submit" className="btn btn-outline-primary btn-lg btn-banner" id="button">Entrar</button>
                        </div>

                    </form>

                </div>
            </div>



        </div>
    );

};

export default LoginPage