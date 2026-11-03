import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { permite_acesso, lista_funcionarios } from "../../services/api";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { set, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Checkbox from "../../shared/components/checkbox";

// import { Row, Form, Button, Container, Tab, Tabs, Table, Col } from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/esm/Col";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import Accordion from 'react-bootstrap/Accordion';

import FoundationMenu from "../../shared/components/foundation_menu";
import PessoaMenu from "./pessoas_menu";

import './index.css';

const schema = yup.object({}).required();

const ListaPessoa = () => {
    let params = useParams();

    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        setValue,
        handleSubmit,
        setFocus,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const funcionario = localStorage.getItem("user");

    const [acesso, setAcesso] = useState(false);
    const [key, setKey] = useState("Dados");
    const [funcionarios, setFuncionarios] = useState([])

    useEffect(() => {
        (async () => {
            const resultado2 = await permite_acesso(funcionario.cpf);
            setAcesso(resultado2);
            const resultado1 = await lista_funcionarios();
            setFuncionarios(resultado1.data);


        })();
    }, []);

    if (!acesso) {
        return <div> ACESSO NEGADO !!</div>;
    }

    console.log("funcionarios: ", funcionarios);

    function createitem(item) {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td><a href={`${process.env.REACT_APP_FRONTEND}/editarFuncionario/${item.id}`}> <i className="fa-solid fa-user-pen"></i> </a>  </td>
                <td>{item.nome} </td>
                <td>{item.email}</td>
                <td>{item.cpf}</td>
                <td>{item.telefone}</td>
            </tr>

        );
    }


    return (
        <div className="listaPessoa">
            <FoundationMenu />
            <PessoaMenu />
            <div className="listapessoa2">
                <Table striped className="tablePessoas">
                    <thead>
                        <tr><th>ID</th>
                            <th>Ação</th>
                            <th>Nome</th>
                            <th>E-Mail</th>
                            <th>CPF</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoa.map(createitem)}
                    </tbody>
                </Table>

            </div>

        </div>



    );
};

export default ListaPessoa;