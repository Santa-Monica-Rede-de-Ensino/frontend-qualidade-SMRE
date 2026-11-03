import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { permite_acesso, grava_usuario, enviar_reset } from "../../services/api";

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

const schema = yup.object({}).required();

const NovoUsuario = () => {
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

    const unidade = localStorage.getItem("unidade");


    const [acesso, setAcesso] = useState(false);

    useEffect(() => {
        (async () => {
            const resultado2 = await permite_acesso("NovoUsuario", unidade);
            setAcesso(resultado2);

        })();
    }, []);


    if (!acesso) {
        return <div> ACESSO NEGADO !!</div>;
    }

    setValue("cpf", "");
    setValue("nome", "");
    setValue("email", "");

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

                try {
                    await enviar_reset(dados.email.trim());
                } catch (error) {
                    console.log("error=", error);
                    alert("ERRO!");
                }
                toast.update(id, { render: "Enviado com sucesso!", type: "success", isLoading: false, autoClose: 3000 });


            } catch (error) {
                console.log("error=", error.message);
            }
        }
    };


    return (
        <div className="novoUsuario">
            <Form>
                <Row> Dados do Usuário: </Row>
                <Row>
                    <Form.Group className=" form-floating">
                        <Form.Control type="text" name="cpf" placeholder="cpf" {...register("cpf", { required: true })} />
                        <Form.Label htmlFor="floatingInput">CPF:</Form.Label>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className=" form-floating">
                        <Form.Control type="text" name="nome" placeholder="Nome" {...register("nome", { required: true })} />
                        <Form.Label htmlFor="floatingInput">Nome:</Form.Label>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className=" form-floating">
                        <Form.Control type="text" name="email" placeholder="Email" {...register("email", { required: true })} />
                        <Form.Label htmlFor="floatingInput">E-mail:</Form.Label>
                    </Form.Group>
                </Row>
                <Button variant="outline-success" type="button" id="alterButton2" onClick={handleSubmit(onSubmit3)} >
                    <i class="fa-solid fa-check"></i> Gravar Usuário
                </Button>

            </Form>
        </div>
    )
};

export default NovoUsuario;