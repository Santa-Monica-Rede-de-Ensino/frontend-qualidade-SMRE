import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

import { permite_acesso, lista_usuario } from "../../services/api";

import { toast } from 'react-toastify'

import './usuarios.css';

import FoundationMenu from "../../shared/components/foundation_menu";
import AdmMenu from "../../shared/components/Adm_menu";

import ListGroup from 'react-bootstrap/ListGroup';

import Table from 'react-bootstrap/Table';

const ListaUsuarios = () => {
    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const unidade = localStorage.getItem("unidade");

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acesso, setAcesso] = useState(false);

    const logado = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        (async () => {
            const resultado = await lista_usuario(unidade);
            setUsuarios(resultado);
            console.log("resultado", resultado);
            const resultado2 = await permite_acesso("ListaUsuarios", unidade);
            setAcesso(resultado2);
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

    function createRadio(usuario) {
        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="flexcheckboxDefault1" value={usuario.cpf} />
                <label className="form-check-label" for="flexRadioDefault1"><a href={`${process.env.REACT_APP_FRONTEND}/paginausuario/${usuario.cpf}`}>  {usuario.nome} - {usuario.email} </a> </label>
            </div>
        );
    }

    const handleusuario = (e) => {
        e.preventDefault();
        let cpf = '';
        try {
            cpf = document.querySelector(
                "input[name = flexcheckboxDefault]:checked"
            ).value;
            console.log("cpf=", cpf);

            // navegar para pagina do usuário
            navigate(`/paginausuario/${cpf}`);
            //alert("navegar para pagina do usuário");
        }
        catch
        {
            console.log("erro");
            toast.error("Selecione o usuário");
            alert("Selecione o usuário");
        }
    };

    const handleNovo = (e) => {
        e.preventDefault();
        alert("navegar para pagina de NOVO usuário");
    };

    function createitem(item) {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td><a href={`${process.env.REACT_APP_FRONTEND}/paginausuario/${item.cpf}`}>  {item.nome} </a></td>
                <td>{item.email}</td>
                <td>{item.cpf}</td>
                <td>{item.created_at}</td>
                <td>{item.updated_at}</td>
            </tr>

        );
    }


    return (

        <div className="usuarios">

            <FoundationMenu />
            <AdmMenu />

            <br />

            <Table striped className="table">
                <thead>
                    <tr><th>ID</th>
                        <th>NOME</th>
                        <th>E-MAIL</th>
                        <th>CPF</th>
                        <th>CREATED_AT</th>
                        <th>UPDATED_AT</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(createitem)}
                </tbody>
            </Table>

        </div>
    );
}

export default ListaUsuarios