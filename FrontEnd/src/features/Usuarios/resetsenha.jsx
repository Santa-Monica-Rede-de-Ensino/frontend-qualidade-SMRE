import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { permite_acesso, gravar_chave, validaToken } from "../../services/api";

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

const ResetSenha = () => {
    let params = useParams();

    const token = params.token;

    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [valido, setValido] = useState("");

    const ValidaAcesso = async (ntoken) => {
        try {

            const resultado = await validaToken(ntoken);
            return resultado;
            //  return emailValido;

        }
        catch (error) {
            if (error.code === 'ERR_BAD_RESPONSE') {
                // toast.error('Seu token de acesso expirou!!!')
                // toast.warning('Informe novamente seu email para validar....')
                //console.log("oi")
            }
            return error.message

        }
    }

    console.log("token==", token);

    useEffect(() => {
        (async () => {
            const resultado = await ValidaAcesso(token);
            setValido(resultado);
        })();
    }, []);

    console.log("Resultado:", valido);

    const {
        register,
        setValue,
        handleSubmit,
        setFocus,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    setValue("senha", "");
    setValue("confirma", "");

    async function onSubmit3(dados) {

        const parametro = { dados };

        let dadosok = true;
        if (dados.senha.trim() === '') {
            toast.error("Favor informar a Senha");
            dadosok = false;
        }
        if (dados.confirma.trim() === '') {
            toast.error("Favor informar a Confirmação");
            dadosok = false;
        }
        if (dados.senha.trim() !== dados.confirma.trim()) {
            toast.error("A senha e a Confirmação não são iguais");
            dadosok = false;
        }
        if (dadosok) {
            try {
                const id = toast.loading("Aguarde...")

                try {
                    await gravar_chave(token, dados.senha.trim());
                } catch (error) {
                    console.log("error=", error);
                    alert("ERRO!");
                }
                toast.update(id, { render: "Alterado com sucesso!", type: "success", isLoading: false, autoClose: 3000 });

                navigate("/login");


            } catch (error) {
                console.log("error=", error.message);
            }
        }
    };

    if (!valido) {
        return (
            <div className="error">
                Link inválido
            </div>
        )
    } else {
        return (
            <div className="ResetSenha">
                <Form>
                    <Row> Dados do Usuário: </Row>
                    <Row>
                        <Form.Group className=" form-floating">
                            <Form.Control type="password" name="senha" placeholder="senha" {...register("senha", { required: true })} />
                            <Form.Label htmlFor="floatingInput">Nova Senha:</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className=" form-floating">
                            <Form.Control type="password" name="confirma" placeholder="confirma" {...register("confirma", { required: true })} />
                            <Form.Label htmlFor="floatingInput">Confirme a Senha:</Form.Label>
                        </Form.Group>
                    </Row>

                    <Button variant="outline-success" type="button" id="alterButton2" onClick={handleSubmit(onSubmit3)} >
                        <i class="fa-solid fa-check"></i> Gravar Senha
                    </Button>

                </Form>
            </div>
        )
    }

};

export default ResetSenha;