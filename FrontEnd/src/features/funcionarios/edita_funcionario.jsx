import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { permite_acesso, constulta_funcionario, salva_funcionario, lista_matriculas, adiciona_matricula, remove_matricula } from "../../services/api";

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
import Modal from 'react-bootstrap/Modal';

import FoundationMenu from "../../shared/components/foundation_menu";
import PessoaMenu from "./pessoas_menu";

import './index.css';

const schema = yup.object({}).required();


const EditaFuncionario = () => {
    let params = useParams();

    const { authenticated, logout } = useContext(AuthContext);

    const funcionario_id = params.id;
    const usuario = localStorage.getItem("user");

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


    const unidade = localStorage.getItem("unidade");

    const [acesso, setAcesso] = useState(false);
    const [key, setKey] = useState("Dados");

    const [validated, setValidated] = useState(false);

    const [matriculas, setMatriculas] = useState([]);
    const [funcionario, setFuncionario] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    useEffect(() => {
        (async () => {
            const resultado2 = await permite_acesso(usuario.cpf);
            setAcesso(resultado2);
            const resultado1 = await constulta_funcionario(funcionario_id);
            setFuncionario(resultado1.data);
            const res1 = await lista_matriculas(pessoa_id);
            setMatriculas(res1.data);

        })();
    }, []);

    if (!acesso) {
        return <div> ACESSO NEGADO !!</div>;
    }

    setValue("nome", funcionario.nome);
    setValue("cpf", funcionario.cpf);
    setValue("email", funcionario.email);
    setValue("telefone", funcionario.telefone);

    function createMatriculas(item) {
        async function handleClick(nid) {
            if (matriculas.length > 1) {
                await remove_matricula(nid);
                navigate(0);
            } else {
                alert("é necessário pelo menos uma matricula");
            }
        }
        return (
            <Row>
                <Col md={1} lg={1}>
                    <i className="fa-solid fa-trash" onClick={() => handleClick(item.id)}></i>
                </Col>
                <Col md={12} lg={5}>
                    <b> matricula :</b> {item.matricula}
                </Col>
                <Col md={12} lg={3}>
                    <b> unidade: </b>{item.unidade}
                </Col>
            </Row>
        );

    };

    console.log("Pessoa", pessoa);
    console.log("Telefone", telefone);
    console.log("Email", email);
    console.log("Endereco", endereco);

    console.log("matriculas L", matriculas.length);

    const handleSubmit2 = async (event) => {
        //event.preventDefault();
        const form = event.currentTarget;
        let erro = false;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            erro = true;
        }
        setValidated(true);
        if (!erro) {
            const dados_pessoa = {
                "nome": form.nome.value,
                "cpf": form.cpf.value,
                "email": form.email.value,
                "telefone": form.telefone.value
            };

            try {
                const resultado = await salva_funcionario(pessoa_id, dados_pessoa);
                console.log('atualiza resultado: ', resultado)
            } catch (error) {
                console.log("error=", error);
                alert("ERRO!");
            };
        };
    }

    const handleNovoMatricula = async (event) => {

        const form = event.currentTarget;

        const dados_matriculas = {
            "id_pessoa": parseInt(funcionario_id),
            "telefone": form.matricula.value,
        };

        try {
            const kct = await adiciona_matricula(dados_matriculas);
            console.log("kct", kct);
        } catch (error) {

            alert("ERRO MATRICULA!");
        };

    }

    if ((matriculas.length > 0))
        return (
            <div className="Pagina_funcionario">
                <FoundationMenu />
                <PessoaMenu />
                <Container>
                    <Tabs id="tab-funcionario" activeKey={key} onSelect={(k) => setKey(k)} className="tab-funcionario">
                        <Tab eventKey="Dados" title="Dados da Pessoa">
                            <div id="example-collapse-text" className="tabela">
                                <Container>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit2}>
                                        <Row>
                                            <Col md={12} lg={6}>
                                                <Form.Group className="form-floating ">
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        name="nome"
                                                        placeholder="Nome"
                                                        {...register("nome", { required: true })}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Informe um Nome.
                                                    </Form.Control.Feedback>
                                                    <Form.Label htmlFor="floatingInput">Nome </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <Form.Group className="form-floating ">
                                                    <Form.Control
                                                        required
                                                        type="email"
                                                        name="email"
                                                        placeholder="email"
                                                        {...register("email", { required: true })}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Informe um Email.
                                                    </Form.Control.Feedback>
                                                    <Form.Label htmlFor="floatingInput">E-Mail </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12} lg={3}>
                                                <Form.Group className=" form-floating">
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        name="cpf"
                                                        placeholder="cpf"
                                                        {...register("cpf", { required: true })}
                                                    />
                                                    <Form.Label htmlFor="floatingInput">CPF:</Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col md={12} lg={3}>
                                                <Form.Group className=" form-floating">
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        name="telefone"
                                                        placeholder="telefone"
                                                        {...register("telefone", { required: true })}
                                                    />
                                                    <Form.Label htmlFor="floatingInput">Telefone:</Form.Label>
                                                </Form.Group>
                                            </Col>

                                        </Row>


                                        <br />
                                        <Row>
                                            <Button
                                                variant="outline-success"
                                                type="submit"
                                                id="alterButton2"
                                            >

                                                <i className="fa-solid fa-check"></i> Confirmar
                                            </Button>
                                        </Row>
                                        <br />
                                    </Form>
                                </Container>

                            </div>

                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><b>Telefone:</b> {telefone[0].telefone}</Accordion.Header>
                                    <Accordion.Body>
                                        <Container>
                                            <Form onSubmit={handleNovoMatricula}>
                                                <Row>
                                                    <Col md={1} lg={1}>
                                                        <Button type="submit" > <i className="fa-solid fa-plus"></i>  </Button>
                                                    </Col>
                                                    <Col md={12} lg={4}>
                                                        <Form.Control type="text" placeholder="matricula" name="matricula" />
                                                    </Col>
                                                    <Col md={12} lg={4}>
                                                        <Form.Control type="text" placeholder="unidade" name="unidade" />
                                                    </Col>
                                                </Row>
                                            </Form>
                                            <br />
                                            {telefone.map(createMatriculas)}
                                        </Container>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Tab>

                    </Tabs>
                </Container>
            </div>
        );
};

export default EditaFuncionario;