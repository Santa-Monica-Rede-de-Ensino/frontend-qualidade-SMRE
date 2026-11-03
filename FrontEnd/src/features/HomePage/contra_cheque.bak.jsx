import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { lista_proventos, envia_CC } from "../../services/api";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { set, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


// import { Row, Form, Button, Container, Tab, Tabs, Table, Col } from "react-bootstrap";


import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";


import Menu from "../../shared/components/homepage_menu";

import './index.css';



const schema = yup.object({}).required();

const ContraCheque = () => {

    const funcionario = JSON.parse(localStorage.getItem("user"));

    // CONTROLE(FUNCIONARIO,TOKEN,COD_UNI)

    console.log(funcionario);

    console.log("cpf: ", funcionario[0].cpf)

    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [comprovantes, setComprovantes] = useState([])

    const {
        register,
        setValue,
        handleSubmit,
        setFocus,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        (async () => {
            const resultado1 = await lista_proventos(funcionario[0].cpf);
            setComprovantes(resultado1);
        })();
    }, []);


    console.log("COMPROVANTES: ", comprovantes);

    function createitem(item) {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td><Button onClick={(e) => enviaCC(item.id)}><i className="fa-regular fa-envelope"></i>  </Button> </td>
                <td>{item.nome}</td>
                <td>{item.matricula}</td>
                <td>{item.tipo_doc}</td>
                <td>{item.mes_ref}</td>
                <td>{item.ano_ref}</td>

            </tr>
        );
    };

    const enviaCC = async (id) => {
        try {
            const resultado = await envia_CC(id);
            toast.success("Comprovante enviado.");
            console.log("Resultado:", resultado);

        } catch (error) {
            toast.error("Erro ao enviar E-mail.");
            console.log(error);
        }

    };


    return (

        <div className="Homepage">
            <Menu />
            <div className="ListaComprovante">
                <Table striped className="tableComprovante">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ação</th>
                            <th>Unidade</th>
                            <th>Matricula</th>
                            <th>Doc</th>
                            <th>Mês</th>
                            <th>Ano</th>

                        </tr>
                    </thead>
                    <tbody className="tabela-scroll">
                        {comprovantes.map(createitem)}
                    </tbody>
                </Table>
            </div>
        </div>

    );
};

export default ContraCheque;
