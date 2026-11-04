import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { contaDocs, listaDocs, envia_CC } from "../../services/api";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { set, useForm } from "react-hook-form";

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


const ListaDocs = () => {

    const Nome = localStorage.getItem("Nome");
    const Ano = localStorage.getItem("Ano");
    const Mes = localStorage.getItem("Mes");
    const Tipo = localStorage.getItem("Tipo");

    const [kcts, setKCTs] = useState();

    const navigate = useNavigate();

    console.log(Mes, Ano, Tipo, Nome);

    useEffect(() => {
        (async () => {
            const resultado1 = await listaDocs(Mes, Ano, Tipo, Nome);
            console.log("res", resultado1)
            setKCTs(resultado1);
        })();
    }, []);


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

    function createitem(item) {
        return (
            <tr key={item.id}>
                <td>{item.cpf}</td>
                <td>{item.nome}</td>
                <td>{item.email}</td>
                <td><Button onClick={(e) => enviaCC(item.id)}><i className="fa-regular fa-envelope"></i>  </Button> </td>
            </tr>
        );
    };

    console.log("kcts", kcts)

    if (kcts !== undefined) {
        return (
            <div className="ListaDocs">
                <div className="Titulo">
                    <Row>
                        <Col md={10} lg={10} >
                            <h3>
                                Arquivos em: Unidade:<b>{Nome}</b> - Ano:<b>{Ano}</b> - Mês:<b>{Mes}</b> - Tipo:<b>{Tipo}</b>
                            </h3>
                        </Col>
                        <Col md={2} lg={2} >
                            <Button className="but2" variant="primary" onClick={(e) => navigate(-1)} > <i className="fa-solid fa-left-long"></i> VOLTAR </Button>
                        </Col>

                    </Row>
                </div>

                <Container>
                    <Table striped className="tableComprovante">
                        <thead>
                            <tr>
                                <th>CPF</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ação</th>

                            </tr>
                        </thead>
                        <tbody className="tabela-scroll">
                            {kcts.map(createitem)}
                        </tbody>
                    </Table>

                </Container>



            </div>

        )

    }

};

export default ListaDocs;