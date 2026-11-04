import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { permite_acesso } from "../../services/api";

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

const schema = yup.object({}).required();

const PaginaAluno = () => {
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

    const matricula = params.matricula;
    const unidade = localStorage.getItem("unidade");

    const [acesso, setAcesso] = useState(false);
    const [key, setKey] = useState("Dados");

    const [aluno, setAluno] = useState([]);
    const [telefone, setTelefone] = useState([]);
    const [email, setEmail] = useState([]);
    const [endereco, setEndereco] = useState([]);
    const [pessoa, setPessoa] = useState([]);

    useEffect(() => {
        (async () => {
            const resultado2 = await permite_acesso("PaginaAluno", unidade);
            setAcesso(resultado2);

        })();
    }, []);

    if (!acesso) {
        return <div> ACESSO NEGADO !!</div>;
    }

    return (
        <div className="Pagina_Aluno">
            <Row>
                PAGINA DO ALUNO:
            </Row>
            <Container>
                <Tabs id="tab-Alunos" activeKey={key} onSelect={(k) => setKey(k)} className="tab-Alunos">
                    <Tab eventKey="Dados" title="Dados do Aluno">
                        Dados do Aluno <br />
                        Dados do Aluno <br />
                        Dados do Aluno <br />
                        Dados do Aluno <br />
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Telefone: XXX-XXXXX-XXXXX</Accordion.Header>
                                <Accordion.Body>
                                    Telefone Residencia  XXX XXXX-XXXX-XXXX  <br />
                                    Telefone Celular XXX XXXX-XXXX-XXXX  <br />
                                    Telefone Emergência XXX XXXX-XXXX-XXXX  <br />
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Email : faluno@rede.com.br</Accordion.Header>
                                <Accordion.Body>
                                    Email : faluno@rede.com.br <br />
                                    Email : faluno@casa.com.br <br />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>



                    </Tab>
                    <Tab eventKey="Contrato" title="Contrato">

                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
};

export default PaginaAluno;