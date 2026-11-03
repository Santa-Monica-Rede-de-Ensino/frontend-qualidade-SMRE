import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { permite_acesso, grava_Pessoa, grava_email, grava_telefone, grava_endereco } from "../../services/api";

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

import FoundationMenu from "../../shared/components/foundation_menu";
import PessoaMenu from "./pessoas_menu";



const schema = yup.object({}).required();

const NovaPessoa = () => {
    let params = useParams();

    const [validated, setValidated] = useState(false);
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
            const resultado2 = await permite_acesso("NovaPessoa", unidade);
            setAcesso(resultado2);

        })();
    }, []);


    if (!acesso) {
        return <div> ACESSO NEGADO !!</div>;
    }

    setValue("nome", "");
    setValue("rg", "");
    setValue("emissor", "");
    setValue("cpf", "");
    setValue("data_nascimento", "");
    setValue("estado_civil", "");
    setValue("profissao", "");
    setValue("nat", "");
    setValue("nac", "");
    // Tabela telefone 
    setValue("telefone", "");
    setValue("tipo_tel", "");
    // Tabela Email
    setValue("email", "");
    setValue("tipo-email", "");
    //Table Endereco
    setValue("endereco", "");
    setValue("numero", "");
    setValue("complmento", "");
    setValue("cep", "");
    setValue("bairro", "");
    setValue("estado", "");
    setValue("tipo-end", "");

    async function gravaPessoa(dados) {
        const resultado = await grava_Pessoa(dados);
        return resultado;

    }


    const handleSubmit2 = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        let erro = false;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            erro = true;
        }
        setValidated(true);


        if (!erro) {
            //  alert("sem erro");
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
            console.log('pessoa=', dados_pessoa);

            let email_pessoa = form.email.value;
            let telefone_pessoa = form.telefone.value;
            let endereco_pessoa = form.endereco.value;
            let numero_pessoa = form.endereco.value;
            let complemento_pessoa = form.complemento.valeu;
            let cep_pessoa = form.cep.value;
            let bairro_pessoa = form.bairro.value;
            let cidade_pessoa = form.cidade.value;
            let estado_pessoa = form.UF.value;

            let id_pessoa = '';
            try {
                const resultado = await grava_Pessoa(dados_pessoa);
                id_pessoa = resultado.data;
            } catch (error) {
                console.log("error=", error);
                alert("ERRO!");
            };

            const dados_email = {
                "id_pessoa": id_pessoa,
                "email": email_pessoa,
                "tipo": 1,
                "comunicar": true,
            };

            const dados_telefone = {
                "id_pessoa": id_pessoa,
                "telefone": telefone_pessoa,
                "tipo": 1,
                "comunicar": true,
            };

            const dados_endereco = {
                "id_pessoa": id_pessoa,
                "endereco": endereco_pessoa,
                "numero": numero_pessoa,
                "complemento": complemento_pessoa,
                "cep": cep_pessoa,
                "bairro": bairro_pessoa,
                "cidade": cidade_pessoa,
                "estado": estado_pessoa,
                "tipo": 1,
            }

            console.log('dados_email', dados_email);


            try {
                const kct = await grava_email(dados_email);
                console.log("kct", kct);
            } catch (error) {

                alert("ERRO EMAIL!");
            };

            try {
                const kct = await grava_telefone(dados_telefone);
                console.log("kct", kct);
            } catch (error) {

                alert("ERRO TELEFONE!");
            };

            try {
                const kct = await grava_endereco(dados_endereco);
                console.log("kct", kct);
            } catch (error) {

                alert("ERRO ENDERECO!");
            };

            //navigate("/listaPessoa");
        }
        else {


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
            console.log('pessoa', dados_pessoa);

            //console.log("json pessoa =", JSON.parse(dados_pessoa))

            alert('com erro');
        }
    };


    return (
        <div className="editaPessoa">
            <FoundationMenu />
            <PessoaMenu />
            <Container>
                <br />
                <Form noValidate validated={validated} onSubmit={handleSubmit2}>
                    <Row>
                        <br />
                        <h3> Cadastro de nova Pessoa:</h3>
                    </Row>
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
                    <Row>
                        <Col md={12} lg={6}>
                            <Form.Group className="form-floating">
                                <Form.Control
                                    required
                                    type="text"
                                    name="telefone"
                                    placeholder="Telefone"
                                    {...register("telefone", { required: true })}
                                />
                                <Form.Label htmlFor="floatingInput">Telefone Principal:</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={12} lg={6}>
                            <Form.Group className="form-floating">
                                <Form.Control
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    {...register("email", { required: true })}
                                />
                                <Form.Label htmlFor="floatingInput">E-mail Principal:</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
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
                        <Col md={12} lg={3}>
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
                        <br />
                    </Row>

                    <Row>
                        <Button
                            variant="outline-success"
                            type="submit"
                            id="alterButton2"
                        // onClick={handleSubmit(handleSubmit2)}
                        >
                            {" "}
                            <i className="fa-solid fa-check"></i> Confirmar{" "}
                        </Button>
                    </Row>
                    <Row>
                        <Button
                            variant="outline-danger"
                            type="submit"
                            id="voltar"
                        // onClick={handleSubmit(onVoltar)}
                        >
                            {" "}
                            <i className="fa-regular fa-hand-point-left"></i> Voltar
                        </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    );

};

export default NovaPessoa;