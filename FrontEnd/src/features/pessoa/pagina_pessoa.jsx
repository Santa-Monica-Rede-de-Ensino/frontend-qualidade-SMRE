import React, { useState, useEffect, useContext } from "react";



import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { permite_acesso, constulta_Pessoa, constulta_Email, constulta_Telefone, constulta_endereco } from "../../services/api";

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

const PaginaPessoa = () => {
    let params = useParams();

    const { authenticated, logout } = useContext(AuthContext);

    const pessoa_id = params.id;

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

    const [telefone, setTelefone] = useState([]);
    const [email, setEmail] = useState([]);
    const [endereco, setEndereco] = useState([]);
    const [pessoa, setPessoa] = useState([]);


    useEffect(() => {
        (async () => {
            const resultado2 = await permite_acesso("PaginaPessoa", unidade);
            setAcesso(resultado2);
            const resultado1 = await constulta_Pessoa(pessoa_id);
            setPessoa(resultado1.data);
            const res1 = await constulta_Email(pessoa_id);
            setEmail(res1.data);
            const res2 = await constulta_Telefone(pessoa_id);
            setTelefone(res2.data);
            const res3 = await constulta_endereco(pessoa_id);
            setEndereco(res3.data);
        })();
    }, []);

    if (!acesso) {
        return <div> ACESSO NEGADO !!</div>;
    }

    function createTelefone(item) {
        return (
            <Row>
                <Col md={12} lg={6}>
                    <b>  Telefone: </b> {item.telefone}
                </Col>
                <Col md={12} lg={3}>
                    <b> Tipo:</b> {item.tipo}
                </Col>
                <Col md={12} lg={3}>
                    <b>  Comunicar:</b> {item.comunicar}
                </Col>
            </Row>
        );

    };

    function createEmail(item) {
        return (
            <Row>
                <Col md={12} lg={6}>
                    <b> Email :</b> {item.email}
                </Col>
                <Col md={12} lg={3}>
                    <b> Tipo: </b>{item.tipo}
                </Col>
                <Col md={12} lg={3}>
                    <b> Comunicar:</b> {item.comunicar}
                </Col>
            </Row>
        );

    };

    function createEndereco(item) {
        return (
            <div className="endereco">
                <Row>
                    <Col md={12} lg={6}>
                        <b>Endereco :</b> {item.endereco}
                    </Col>
                    <Col md={12} lg={2}>
                        <b> Nº:</b> {item.numero}
                    </Col>
                    <Col md={12} lg={2}>
                        <b> Comp.:</b> {item.complemento}
                    </Col>
                </Row>
                <Row>
                    <Col md={12} lg={3}>
                        <b> Bairro : </b>{item.bairro}
                    </Col>
                    <Col md={12} lg={3}>
                        <b> Cidade :</b> {item.cidade}
                    </Col>
                    <Col md={12} lg={3}>
                        <b> Estado :</b> {item.estado}
                    </Col>
                </Row>
            </div>
        );

    };

    console.log("Pessoa", pessoa);
    console.log("Telefone", telefone);
    console.log("Email", email);
    console.log("Endereco", endereco);


    console.log("Telefone L", telefone.length);
    console.log("Email L", email.length);
    console.log("Endereco L", endereco.length);

    if ((telefone.length > 0) && (email.length > 0) && (endereco.length > 0))
        return (
            <div className="Pagina_Aluno">
                <FoundationMenu />
                <PessoaMenu />
                <Container>
                    <Tabs id="tab-Alunos" activeKey={key} onSelect={(k) => setKey(k)} className="tab-Alunos">
                        <Tab eventKey="Dados" title="Dados da Pessoa">
                            <div id="example-collapse-text" className="tabela">
                                <Container>
                                    <Row>
                                        <Col md={12} lg={4}>
                                            <b>Nome :</b>
                                            <i>{pessoa.nome}</i>
                                        </Col>
                                        <Col md={12} lg={3}>
                                            <b>Profissão :</b>
                                            <i>{pessoa.profissao}</i>
                                        </Col>
                                        <Col md={12} lg={2}>
                                            <b>Estado Civil:</b>
                                            <i>{pessoa.estado_civil}</i>
                                        </Col>
                                        <Col md={12} lg={3}>
                                            <b>Nascimento :</b>
                                            <i>{pessoa.data_nascimento}</i>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} lg={3}>
                                            <b>RG :</b>
                                            <i>{pessoa.rg + ' - ' + pessoa.emissor} </i>
                                        </Col>

                                        <Col md={12} lg={3}>
                                            <b>CPF :</b>
                                            <i>{pessoa.cpf}</i>
                                        </Col>
                                        <Col md={12} lg={3}>
                                            <b>Natural :</b>
                                            <i>{pessoa.nat}</i>
                                        </Col>
                                        <Col md={12} lg={3}>
                                            <b>Nacionalidade :</b>
                                            <i>{pessoa.nac}</i>
                                        </Col>
                                    </Row>


                                </Container>

                            </div>

                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><b>Telefone:</b> {telefone[0].telefone}</Accordion.Header>
                                    <Accordion.Body>
                                        {telefone.map(createTelefone)}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><b>Email:</b> {email[0].email}</Accordion.Header>
                                    <Accordion.Body>
                                        {email.map(createEmail)}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header><b>Endereço</b></Accordion.Header>
                                    <Accordion.Body>
                                        {endereco.map(createEndereco)}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Tab>

                    </Tabs>
                </Container>
            </div>
        );
};

export default PaginaPessoa;