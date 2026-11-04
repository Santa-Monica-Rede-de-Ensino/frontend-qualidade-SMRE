import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

import { lista_unidadeCPF } from "../../services/api";

import { toast } from 'react-toastify'

import './index.css';

const EscolheUnidade = () => {
    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [unidades, setUnidades] = useState([]);
    const [loading, setLoading] = useState(true);

    const logado = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        (async () => {
            const resultado = await lista_unidadeCPF(logado[0].cpf);
            setUnidades(resultado);
            console.log("resultado", resultado);
            setLoading(false);
        })();
    }, []);


    const handleLogout = () => {
        logout();
    }

    if (loading) {
        return <div className="loading"> ## Carregando...</div>;
    }

    function createRadio(unidade) {
        return (
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={unidade.cod_unidade} />
                <label className="form-check-label" for="flexRadioDefault1"> {unidade.nome} <a href="#"></a> </label>
            </div>
        );
    }

    const handleunidade = (e) => {
        e.preventDefault();
        let unidade = '';
        try {
            unidade = document.querySelector(
                "input[name = flexRadioDefault]:checked"
            ).value;
            localStorage.removeItem("unidade");
            localStorage.setItem("unidade", unidade);
            // navegar para pagina do aluno.
            navigate("/");
        }
        catch
        {
            console.log("erro");
            toast.error("Selecione a Unidade");
        }
    };

    return (
        
            <div className="meio4">
            
            <div className="meio3">
            <div className="meio">
            
            <h1 className="letreiro">Selecione a Unidade</h1>
            
            <form className="form-aluno" onSubmit={handleunidade}>
                
                <div className="unidades">
                    {unidades.map(createRadio)}
                </div>
                <div className="meio2 ">
                <button type="submit" className="btn btn-outline-primary btn-lg btn-banner" id="button"> Selecionar </button>
                <button type="button" className="btn btn-outline-danger btn-lg btn-banner" id="button" onClick={handleLogout}> Logout </button>
                </div>
            </form>
        </div>
        </div>
        </div>
        

    );
}

export default EscolheUnidade