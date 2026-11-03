import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate, useParams } from "react-router-dom";

import { lista_proventos, envia_CC, busca_foto } from "../../services/api";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { set, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Checkbox from "../../shared/components/checkbox";

// import { Row, Form, Button, Container, Tab, Tabs, Table, Col } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";


import Carrocel from './carrocel';

import Atalhos from '../../shared/components/Atalhos';

import Menu from "../../shared/components/homepage_menu";

import './index.css';

import Footer from '../../shared/components/footer';
import { Container } from "react-bootstrap";


const schema = yup.object({}).required();

const Homepage = () => {

    const funcionario = JSON.parse(localStorage.getItem("user"));

    // CONTROLE(FUNCIONARIO,TOKEN,COD_UNI)

    console.log(funcionario);

    console.log("cpf: ", funcionario[0].cpf)

    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [comprovantes, setComprovantes] = useState([])
    const [foto, setFoto] = useState(null);
    const [funcionarios, setFuncionarios] = useState([]);

    const {
        register,
        setValue,
        handleSubmit,
        setFocus,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        (async () => {
            const resultado1 = await lista_proventos(funcionario[0].cpf);
            setComprovantes(resultado1);
            const resultado2 = await busca_foto(funcionario[0].cpf);
            setFoto(resultado2.data);
        })();
    }, []);


    console.log("COMPROVANTES: ", comprovantes);

    function createitem(item) {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td><Button onClick={(e) => enviaCC(item.id)}><i className="fa-regular fa-envelope"></i>  </Button> </td>
                <td>{item.nome}</td>
                <td>{item.matricula}</td>
                <td>{item.tipo_doc}</td>
                <td>{item.mes_ref}</td>
                <td>{item.ano_ref}</td>

            </tr>
        );
    };

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


    return (
        <div className="Homepage">
            <Menu
                foto={foto}
                nome={funcionario[0].nome.split(' ')[0].charAt(0).toUpperCase() + funcionario[0].nome.split(' ')[0].slice(1).toLowerCase()}
            />
            <Atalhos />
            <Carrocel />
            <div className="Footer">
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default Homepage;
