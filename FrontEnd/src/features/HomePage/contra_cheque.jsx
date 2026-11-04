import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

import { lista_proventos, envia_CC, busca_foto } from "../../services/api";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import Menu from "../../shared/components/homepage_menu";
import Footer from '../../shared/components/footer';

import './index.css';

const schema = yup.object({}).required();

const ContraCheque = () => {

    const funcionario = JSON.parse(localStorage.getItem("user"));

    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [comprovantes, setComprovantes] = useState([]);
    const [foto, setFoto] = useState(null);

    const { register, setValue, handleSubmit, setFocus, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!funcionario || !funcionario[0]) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
            return;
        }
        (async () => {
            try {
                const resultado = await lista_proventos(funcionario[0].cpf);
                setComprovantes(Array.isArray(resultado) ? resultado : []);
            } catch (error) {
                console.log(error);
                toast.error("Não foi possível carregar os contracheques.");
            }
        })();
        (async () => {
            try {
                const resultado = await busca_foto(funcionario[0].cpf);
                setFoto(resultado.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    if (!funcionario || !funcionario[0]) return null;

    const nomePrimeiro = funcionario[0].nome.split(' ')[0];
    const nomeFormatado = nomePrimeiro.charAt(0).toUpperCase() + nomePrimeiro.slice(1).toLowerCase();

    function createitem(item) {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td><Button onClick={() => enviaCC(item.id)}><i className="fa-regular fa-envelope"></i></Button></td>
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
            <Menu foto={foto} nome={nomeFormatado} />
            <div className="qualidade-nav-bar" style={{ padding: '16px 32px 0' }}>
                <button className="qualidade-nav-btn" onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')} title="Página anterior">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button className="qualidade-nav-btn" onClick={() => navigate('/')} title="Início">
                    <i className="fa-solid fa-house"></i>
                </button>
            </div>
            <div className="ListaComprovante" style={{ flex: 1, overflowY: 'auto' }}>
                <Table striped className="tableComprovante">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ação</th>
                            <th>Unidade</th>
                            <th>Matricula</th>
                            <th>Doc</th>
                            <th>Mês</th>
                            <th>Ano</th>
                        </tr>
                    </thead>
                    <tbody className="tabela-scroll">
                        {comprovantes.map(createitem)}
                    </tbody>
                </Table>
            </div>
            <Footer />
        </div>
    );
};

export default ContraCheque;
