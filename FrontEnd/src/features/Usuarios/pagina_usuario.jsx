import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { permite_acesso, lista_usuario, dados_usuario, grava_usuario, lista_unidades, lista_perfil_usuario, atualiza_perfil_usuario } from "../../services/api";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { set, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Checkbox from "../../shared/components/checkbox";

import "./pagina_usuario.css"

import Menu from "./menu";
import Footer from "../../shared/components/footer";

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

import FoundationMenu from "../../shared/components/foundation_menu";
import AdmMenu from "../../shared/components/Adm_menu";

const schema = yup.object({}).required();

const PaginaUsuario = () => {
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

    const funcionario = params.cpf;

    const unidade = localStorage.getItem("unidade");

    const [loading, setLoading] = useState(true);
    const [acesso, setAcesso] = useState(false);
    const [dadosfun, setDadosFun] = useState([]);
    const [perfisusuario, setPerfisUsuario] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [unidadeF, setUnidadeF] = useState('01');

    const [key, setKey] = useState("Dados");

    const logado = JSON.parse(localStorage.getItem("user"));

    let v = 0;

    useEffect(() => {
        (async () => {
            const resultado2 = await permite_acesso("PaginaUsuario", unidade);
            setAcesso(resultado2);
            const resultado = await dados_usuario(funcionario);
            setDadosFun(resultado[0]);
            setLoading(false);
            const resultado3 = await lista_unidades();
            setUnidades(resultado3);
            const resultado4 = await lista_perfil_usuario(funcionario, unidadeF);
            setPerfisUsuario(resultado4);
        })();
    }, []);

    const [checkedState, setCheckedState] = useState(

        new Array(100).fill(false)

    );

    const handleOnChange = (position) => {

        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        perfisusuario[position].marcado = !perfisusuario[position].marcado;

    };



    console.log("Funcionario:", dadosfun);

    console.log("Perfil do usuario:", perfisusuario);

    console.log("unidade selecionada:", unidadeF);

    const handleLogout = () => {
        logout();
    }

    if (loading) {
        return <div className="loading"> ## Carregando...</div>;
    }

    if (!acesso) {
        return <div> ACESSO NEGADO !!</div>;
    }

    if (dadosfun.cpf !== null) setValue("cpf", dadosfun.cpf.trim());
    if (dadosfun.nome !== null) setValue("nome", dadosfun.nome.trim());
    if (dadosfun.email !== null) setValue("email", dadosfun.email.trim());


    async function onSubmit3(dados) {
        const parametro = { dados };
        let dadosok = true;
        if (dados.nome.trim() === '') {
            toast.error("Favor informar o Nome");
            dadosok = false;
        }
        if (dados.cpf.trim() === '') {
            toast.error("Favor informar o CPF");
            dadosok = false;
        }
        if (dados.email.trim() === '') {
            toast.error("Favor informar o e-mail");
            dadosok = false;
        }
        if (dadosok) {
            try {
                const id = toast.loading("Aguarde...")

                try {
                    await grava_usuario(parametro);
                } catch (error) {
                    console.log("error=", error);
                    alert("ERRO!");
                }
                toast.update(id, { render: "Alterado com sucesso!", type: "success", isLoading: false, autoClose: 3000 });

                navigate(0);

            } catch (error) {
                console.log("error=", error.message);
            }
        }
    };

    function createChecklist(lista, index) {

        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" name={lista.nome_perfil} id={`custom-checkbox-${index}`} value={lista.cod_perfil} checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                <label htmlFor={`custom-checkbox-${index}`}>{lista.nome_perfil}</label>
            </div>
        );
    };

    function createChecklist2(lista, index) {

        console.log("entrei no mapa", lista);
        return (
            <div className="form-check">
                <Checkbox label={lista.nome_perfil} checked={lista.marcado} />
            </div>
        );
    };

    function marcadora(lista, index) {

        if (lista.marcado === true) {
            checkedState[index] = true;
        } else {
            checkedState[index] = false;
        }
    };


    function createOptions(lista) {

        return (
            <option value={lista.cod_unidade}> {lista.nome} </option>
        )
    };

    async function myFunction(k) {
        setUnidadeF(k);
        const resultado4 = await lista_perfil_usuario(funcionario, k);
        setPerfisUsuario(resultado4);
    };

    async function gravarPerfil(dados) {
        console.log("oi", perfisusuario.length);
        // perfisusuario.map(atualiza_perfil);
        let date = performance.now();
        for (let index = 0; index < perfisusuario.length; index++) {
            date = performance.now();
            console.log("i", date)
            await atualiza_perfil(perfisusuario[index]);

        }

    };

    async function atualiza_perfil(lista) {
        let uCPF = dadosfun.cpf;
        let uPerfil = lista.cod_perfil;
        let uUni = unidadeF;
        let uStatus = lista.marcado;

        console.log("chamando a função: alualizaperfil=", uCPF, uPerfil, uUni, uStatus);
        try {
            await atualiza_perfil_usuario(uCPF, uPerfil, uUni, uStatus);
        } catch (error) {
            console.log("error=", error.message);
        }
    };

    return (
        <div className="Pagina_usuario">

            <FoundationMenu />
            <AdmMenu />

            <div>
                <Container>
                    <Form>
                        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3"  >
                            <Tab eventKey="Dados" title="Dados do usuário">
                                <h5 className="h6usuario">Dados do Usuário:</h5>
                                <Row className="dados1">
                                    <Form.Group className=" form-floating">
                                        <Form.Control type="text" name="cpf" placeholder="cpf" {...register("cpf", { required: true })} disabled="true" />
                                        <Form.Label htmlFor="floatingInput">CPF:</Form.Label>
                                    </Form.Group>
                                </Row>
                                <Row className="dados1">
                                    <Form.Group className=" form-floating">
                                        <Form.Control type="text" name="nome" placeholder="Nome" {...register("nome", { required: true })} />
                                        <Form.Label htmlFor="floatingInput">Nome:</Form.Label>
                                    </Form.Group>
                                </Row>
                                <Row className="dados1">
                                    <Form.Group className=" form-floating">
                                        <Form.Control type="text" name="email" placeholder="Email" {...register("email", { required: true })} />
                                        <Form.Label htmlFor="floatingInput">E-mail:</Form.Label>
                                    </Form.Group>
                                </Row>

                                <Row className="Button2">
                                    <Button variant="outline-primary" type="button" id="alterButton2" onClick={handleSubmit(onSubmit3)} >
                                        <i class="fa-solid fa-check"></i> Gravar Usuário
                                    </Button>
                                </Row>
                            </Tab>

                            <Tab eventKey="Perfil" title="Perfis de Acesso">
                                <Row>
                                    <h5 className="h6usuario">Perfil:</h5>
                                </Row>
                                <Form>
                                    <Row className="h7usuario">
                                        <select name="SelectUnidade" id="SelectUnidade" onChange={(k) => myFunction(document.getElementById("SelectUnidade").value)} >
                                            {unidades.map(createOptions)}
                                        </select>
                                    </Row>
                                    <Row className="h7usuario">
                                        {perfisusuario.map(createChecklist)}
                                        {perfisusuario.map(marcadora)}
                                    </Row>

                                </Form>
                                <Row className="Button2">
                                    <Button variant="outline-primary" type="button" id="alterButton3" onClick={handleSubmit(gravarPerfil)} >
                                        <i class="fa-solid fa-check"></i> Gravar Perfil
                                    </Button>
                                </Row>
                            </Tab>
                        </Tabs>
                    </Form>
                </Container>
                <br></br>

            </div>
        </div>

    );
};

export default PaginaUsuario;