import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { contaDocs, listaDocs } from "../../services/api";

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
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal';



const ContaDocs = () => {
    const [comprovantes, setComprovantes] = useState([]);

    const [kcts, setKCTs] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const resultado1 = await contaDocs();
            setComprovantes(resultado1);
        })();
    }, []);


    const lupa = async (Nmes, Nano, Ntipo, Nnome) => {
        localStorage.removeItem("Mes");
        localStorage.removeItem("Ano");
        localStorage.removeItem("Tipo");
        localStorage.removeItem("Nome");
        localStorage.setItem("Mes", Nmes);
        localStorage.setItem("Ano", Nano);
        localStorage.setItem("Tipo", Ntipo);
        localStorage.setItem("Nome", Nnome);
        navigate('/listaDocs');

    };


    function createitem(item) {
        return (
            <tr >
                <td>{item.nome}</td>
                <td>{item.tipo_doc}</td>
                <td>{item.ano_ref}</td>
                <td>{item.mes_ref}</td>
                <td>{item.count}</td>
                <td><Button onClick={(e) => lupa(item.mes_ref, item.ano_ref, item.tipo_doc, item.nome)}><i className="fa-solid fa-magnifying-glass"></i>  </Button> </td>

            </tr>
        );
    };


    function createitem2(item) {
        return (
            <tr >
                <td>{item.cpf}</td>
                <td>{item.nome}</td>
            </tr>
        );
    };

    return (
        <div className="ContaDocs">
            <div className="Titulo">
                <Row>
                    <Col md={10} lg={10} >
                        <h1>
                            Listagem de comprovantes atualmente no sistema
                        </h1>
                    </Col>
                    <Col md={2} lg={2} >
                        <Button className="but2" variant="primary" onClick={(e) => navigate(`/`)} > <i className="fa-solid fa-left-long"></i> VOLTAR </Button>
                    </Col>

                </Row>
            </div>
            <Container>
                <Table striped className="tableComprovante">
                    <thead>
                        <tr>
                            <th>UNIDADE</th>
                            <th>Tipo Documento</th>
                            <th>Ano</th>
                            <th>Mês</th>
                            <th>Quantidade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody className="tabela-scroll">
                        {comprovantes.map(createitem)}
                    </tbody>
                </Table>

            </Container>


        </div>
    );
};

export default ContaDocs;