import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

import { permite_acesso } from "../../services/api";
import FoundationMenu from "../../shared/components/foundation_menu";
import AdmMenu from "../../shared/components/Adm_menu";

import './index.css';

const Adm = () => {
  const { authenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const unidade = localStorage.getItem("unidade");

  const [acesso, setAcesso] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const resultado = await permite_acesso("Adm", unidade);
      setAcesso(resultado);
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

  if (!acesso) {
    return <div> ACESSO NEGADO !!</div>;
  }

  return (
    <div className="Admnistracao">
      <FoundationMenu />
      <AdmMenu />

      <div className="mid00">

        <h1 className="letreiro01">Administração de Usuários</h1>


        <li><a href={`${process.env.REACT_APP_FRONTEND}/usuarios`}>Cadastro de Usuário </a></li>
        <li><a href={`${process.env.REACT_APP_FRONTEND}/perfis`}>Cadastro de Perfil </a></li>

        <div className="mid02">
          <button type="button" className="btn btn-outline-danger btn-lg btn-banner" id="button" onClick={handleLogout}> Logout </button>
        </div>

      </div>

    </div>

  );
}

export default Adm