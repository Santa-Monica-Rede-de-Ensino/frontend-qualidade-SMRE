import React, { useState, useEffect, useContext } from "react";



import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { permite_acesso, constulta_Pessoa, constulta_Email, constulta_Telefone, constulta_endereco, atualiza_pessoa, remove_telefone, grava_telefone, remove_email, grava_email, atualiza_endereco } from "../../services/api";

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


const EditarPessoa = () => {
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

    const [validated, setValidated] = useState(false);

    const [telefone, setTelefone] = useState([]);
    const [email, setEmail] = useState([]);
    const [endereco, setEndereco] = useState([]);
    const [pessoa, setPessoa] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    useEffect(() => {
        (async () => {
            const resultado2 = await permite_acesso("EditarPessoa", unidade);
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

    setValue("nome", pessoa.nome);
    setValue("rg", pessoa.rg);
    setValue("emissor", pessoa.emissor);
    setValue("cpf", pessoa.cpf);
    setValue("data_nascimento", pessoa.data_nascimento);
    setValue("estado_civil", pessoa.estado_civil);
    setValue("profissao", pessoa.profissao);
    setValue("nat", pessoa.nat);
    setValue("nac", pessoa.nac);

    function createTelefone(item, index) {
        async function handleClick(nid) {
            if (telefone.length > 1) {
                await remove_telefone(nid);
                navigate(0);
            } else {
                alert("é necessário pelo menos 1 telefone");
            }
        }
        return (
            <Row>
                <Col md={1} lg={1}>
                    <i className="fa-solid fa-trash" onClick={() => handleClick(item.id)}></i>
                </Col>
                <Col md={12} lg={5}>
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
        async function handleClick(nid) {
            if (email.length > 1) {
                await remove_email(nid);
                navigate(0);
            } else {
                alert("é necessário pelo menos 1 E-mail");
            }
        }
        return (
            <Row>
                <Col md={1} lg={1}>
                    <i className="fa-solid fa-trash" onClick={() => handleClick(item.id)}></i>
                </Col>
                <Col md={12} lg={5}>
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


    function createEndereco(item, index) {


        function handleShow2(i, nid) {
            console.log("X", i)
            setShow(true);
            setValue("id", nid);
            setValue("endereco", endereco[i].endereco);
            setValue("numero", endereco[i].numero);
            setValue("complmento", endereco[i].complemento);
            setValue("cep", endereco[i].cep);
            setValue("cidade", endereco[i].cidade);
            setValue("bairro", endereco[i].bairro);
            setValue("UF", endereco[i].estado);
        }

        return (
            <div className="endereco">
                <br />
                <Container>
                    <Row>
                        <Col md={1} lg={1}>
                            <Button variant="primary" onClick={() => handleShow2(index, item.id)}>
                                <i className="fa-solid fa-user-pen"></i> Editar
                            </Button>
                        </Col>
                        <Col md={11} lg={11}>
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

                        </Col>
                    </Row>

                </Container>
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



    const handleSubmitEndereco = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const dados_endereco = {
            "id_pessoa": pessoa_id,
            "endereco": form.endereco.value,
            "numero": form.numero.value,
            "complemento": form.complemento.value,
            "cep": form.cep.value,
            "bairro": form.bairro.value,
            "cidade": form.cidade.value,
            "estado": form.UF.value,
            "tipo": 1,
        }

        console.log("KCT RUSSO", dados_endereco);

        try {
            const resultado = await atualiza_endereco(form.id.value, dados_endereco);
            console.log('atualiza resultado: ', resultado)
            navigate(0);
        } catch (error) {
            console.log("error=", error);
            alert("ERRO!");
        };


    }


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
                "rg": form.rg.value,
                "emissor": form.emissor.value,
                "cpf": form.cpf.value,
                "data_nascimento": form.data_nascimento.value,
                "estado_civil": form.estado_civil.value,
                "profissao": form.profissao.value,
                "nat": form.nat.value,
                "nac": form.nac.value
            };

            try {
                const resultado = await atualiza_pessoa(pessoa_id, dados_pessoa);
                console.log('atualiza resultado: ', resultado)
            } catch (error) {
                console.log("error=", error);
                alert("ERRO!");
            };
        };
    }

    const handleNovoTelefone = async (event) => {

        const form = event.currentTarget;

        const dados_telefone = {
            "id_pessoa": parseInt(pessoa_id),
            "telefone": form.telefone.value,
            "tipo": parseInt(form.tipo.value),
            "comunicar": form.comunicar.checked,
        };

        try {
            const kct = await grava_telefone(dados_telefone);
            console.log("kct", kct);
        } catch (error) {

            alert("ERRO TELEFONE!");
        };

    }



    const handleNovoEmail = async (event) => {

        const form = event.currentTarget;

        const dados_email = {
            "id_pessoa": parseInt(pessoa_id),
            "email": form.email.value,
            "tipo": parseInt(form.tipo.value),
            "comunicar": form.comunicar.checked,
        };

        try {
            const kct = await grava_email(dados_email);
            console.log("kct", kct);
        } catch (error) {

            alert("ERRO EMAIL!");
        };


    }


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
                                    <Form noValidate validated={validated} onSubmit={handleSubmit2}>
                                        <Row>
                                            <Col md={12} lg={9}>
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
                                            <Col md={12} lg={3}>
                                                <Form.Group className="form-floating">
                                                    <Form.Select aria-label="Default select example" {...register("estado_civil", { required: true })}>
                                                        <option disabled={true}>Escolha opção</option>
                                                        <option disabled={true}></option>
                                                        <option value="Casado (a)">Casado (a)</option>
                                                        <option value="Solteiro (a)">Solteiro (a)</option>
                                                        <option value="Separado (a)">Separado (a)</option>
                                                        <option value="Viúvo (a)">Viúvo (a)</option>
                                                        <option value="Divorciado (a)">Divorciado (a)</option>
                                                    </Form.Select>
                                                    <Form.Label htmlFor="floatingInput">Estado Civl:</Form.Label>
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
                                                        type="date"
                                                        name="nascimento"
                                                        placeholder="data_nascimento"
                                                        {...register("data_nascimento", { required: true })}
                                                    />
                                                    <Form.Label htmlFor="floatingInput">
                                                        Data de Nascimento:
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col md={12} lg={3}>
                                                <Form.Group className=" form-floating">
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        name="nat"
                                                        placeholder="naturalidade"
                                                        {...register("nat", { required: true })}
                                                    />
                                                    <Form.Label htmlFor="floatingInput">Naturalidade:</Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col md={12} lg={3}>
                                                <Form.Group className=" form-floating">
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        name="nac"
                                                        placeholder="nacionalidade"
                                                        {...register("nac", { required: true })}
                                                    />
                                                    <Form.Label htmlFor="floatingInput">Nacionalidae:</Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={12} lg={6}>
                                                <Form.Group className=" form-floating">
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        name="profissao"
                                                        placeholder="profissao"
                                                        {...register("profissao", { required: true })}
                                                    />
                                                    <Form.Label htmlFor="floatingInput">Profissão:</Form.Label>
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} lg={3}>
                                                <Form.Group className=" form-floating">
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        name="rg"
                                                        placeholder="identidade"
                                                        {...register("rg", { required: true })}
                                                    />
                                                    <Form.Label htmlFor="floatingInput">Identidade:</Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col md={12} lg={3}>
                                                <Form.Group className=" form-floating">
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        name="emissor"
                                                        maxLength="10"
                                                        placeholder="emissor"
                                                        {...register("emissor", { required: true })}
                                                    />
                                                    <Form.Label htmlFor="floatingInput">Emissor:</Form.Label>
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
                                                {" "}
                                                <i className="fa-solid fa-check"></i> Confirmar{" "}
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
                                            <Form onSubmit={handleNovoTelefone}>
                                                <Row>
                                                    <Col md={1} lg={1}>
                                                        <Button type="submit" > <i className="fa-solid fa-plus"></i>  </Button>
                                                    </Col>
                                                    <Col md={12} lg={2}>
                                                        <Form.Control type="text" placeholder="telefone" name="telefone" />
                                                    </Col>
                                                    <Col md={12} lg={2}>
                                                        <Form.Select label="Tipo" name="tipo">
                                                            <option>Tipo:</option>
                                                            <option value="1">Celular</option>
                                                            <option value="2">Casa</option>
                                                            <option value="3">Trabalho</option>
                                                        </Form.Select>
                                                    </Col>
                                                    <Col md={12} lg={2}>
                                                        <Form.Check type="checkbox" name="comunicar" id="checkbox" label="Comunicar" />
                                                    </Col>
                                                </Row>
                                            </Form>
                                            <br />
                                            {telefone.map(createTelefone)}
                                        </Container>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><b>Email:</b> {email[0].email}</Accordion.Header>
                                    <Accordion.Body>
                                        <Container>
                                            <Form onSubmit={handleNovoEmail}>
                                                <Row>
                                                    <Col md={1} lg={1}>
                                                        <Button type="submit" > <i className="fa-solid fa-plus"></i>  </Button>
                                                    </Col>
                                                    <Col md={12} lg={4}>
                                                        <Form.Control type="text" placeholder="E-mail" name="email" />
                                                    </Col>
                                                    <Col md={12} lg={2}>
                                                        <Form.Select label="Tipo" name="tipo">
                                                            <option>Tipo:</option>
                                                            <option value="1">Celular</option>
                                                            <option value="2">Casa</option>
                                                            <option value="3">Trabalho</option>
                                                        </Form.Select>
                                                    </Col>
                                                    <Col md={12} lg={2}>
                                                        <Form.Check type="checkbox" name="comunicar" id="checkbox" label="Comunicar" />
                                                    </Col>
                                                </Row>
                                            </Form>
                                            <br />
                                            {email.map(createEmail)}

                                        </Container>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header><b>Endereço</b></Accordion.Header>
                                    <Accordion.Body>
                                        <Modal size="lg" show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Editar Endereço</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form onSubmit={handleSubmitEndereco}>
                                                    <Form.Control readOnly size="sm" type="text" className="id" name="id" placeholder="id" {...register("id", { required: true })} />
                                                    <Row>
                                                        <Col md={12} lg={6}>
                                                            <Form.Group className=" form-floating">
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    name="endereco"
                                                                    placeholder="endereco"
                                                                    {...register("endereco", { required: true })}
                                                                />
                                                                <Form.Label htmlFor="floatingInput">Endereco:</Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12} lg={2}>
                                                            <Form.Group className=" form-floating">
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    name="numero"
                                                                    placeholder="numero"
                                                                    {...register("numero", { required: true })}
                                                                />
                                                                <Form.Label htmlFor="floatingInput">Número:</Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12} lg={3}>
                                                            <Form.Group className=" form-floating">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="complemento"
                                                                    placeholder="complemento"
                                                                    {...register("complemento", { required: true })}
                                                                />
                                                                <Form.Label htmlFor="floatingInput">Complemento:</Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={12} lg={3}>
                                                            <Form.Group className=" form-floating">
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    name="cep"
                                                                    placeholder="cep"
                                                                    {...register("cep", { required: true })}
                                                                />
                                                                <Form.Label htmlFor="floatingInput">CEP:</Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12} lg={3}>
                                                            <Form.Group className=" form-floating">
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    name="bairro"
                                                                    placeholder="bairro"
                                                                    {...register("bairro", { required: true })}
                                                                />
                                                                <Form.Label htmlFor="floatingInput">Bairro:</Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12} lg={3}>
                                                            <Form.Group className=" form-floating">
                                                                <Form.Control
                                                                    required
                                                                    type="text"
                                                                    name="cidade"
                                                                    placeholder="cidade"
                                                                    {...register("cidade", { required: true })}
                                                                />
                                                                <Form.Label htmlFor="floatingInput">Cidade:</Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12} lg={3}>
                                                            <Form.Group className=" form-floating">
                                                                <Form.Select aria-label="Default select example"  {...register("UF", { required: true })}>
                                                                    <option disabled={true}>Escolha opção</option>
                                                                    <option value="RJ">Rio de Janeiro</option>
                                                                    <option disabled={true}></option>
                                                                    <option value="AC">Acre</option>
                                                                    <option value="AL">Alagoas</option>
                                                                    <option value="AP">Amapá</option>
                                                                    <option value="AM">Amazonas</option>
                                                                    <option value="BA">Bahia</option>
                                                                    <option value="CE">Ceará</option>
                                                                    <option value="DF">Distrito Federal</option>
                                                                    <option value="ES">Espírito Santo</option>
                                                                    <option value="GO">Goiás</option>
                                                                    <option value="MA">Maranhão</option>
                                                                    <option value="MT">Mato Grosso</option>
                                                                    <option value="MS">Mato Grosso do Sul</option>
                                                                    <option value="MG">Minas Gerais</option>
                                                                    <option value="PA">Pará</option>
                                                                    <option value="PB">Paraíba</option>
                                                                    <option value="PR">Paraná</option>
                                                                    <option value="PE">Pernambuco</option>
                                                                    <option value="PI">Piauí</option>
                                                                    <option value="RJ">Rio de Janeiro</option>
                                                                    <option value="RN">Rio Grande do Norte</option>
                                                                    <option value="RS">Rio Grande do Sul</option>
                                                                    <option value="RO">Rondônia</option>
                                                                    <option value="RR">Roraima</option>
                                                                    <option value="SC">Santa Catarina</option>
                                                                    <option value="SP">São Paulo</option>
                                                                    <option value="SE">Sergipe</option>
                                                                    <option value="TO">Tocantins</option>
                                                                    <option value="EX">Estrangeiro</option>
                                                                </Form.Select>
                                                                <Form.Label htmlFor="floatingInput">UF:</Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Button variant="outline-success" type="submit" id="alterButton2" >
                                                            <i className="fa-solid fa-check"></i> Salvar
                                                        </Button>
                                                    </Row>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                        <Container>
                                            <Button variant="primary"> <i class="fa-solid fa-plus"></i> Novo</Button>
                                        </Container>
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

export default EditarPessoa;