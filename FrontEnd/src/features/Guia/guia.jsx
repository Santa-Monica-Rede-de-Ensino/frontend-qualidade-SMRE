import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ChevronDown } from 'lucide-react';
import Menu from '../../shared/components/homepage_menu';
import Footer from '../../shared/components/footer';
import { busca_foto } from '../../services/api';
import { TEMAS } from './conteudo';
import ListaPassos from './passos';
import './guia.css';

function Tema({ tema, aberto, onAlternar }) {
    const { Icone } = tema;

    return (
        <div className="acc-item">
            <button type="button" className="acc-cab" aria-expanded={aberto} onClick={onAlternar}>
                <span className="acc-ic"><Icone strokeWidth={2} /></span>
                <span className="acc-titulo">{tema.titulo}</span>
                <span className="acc-sub">{tema.sub}</span>
                <span className="acc-qtd">{tema.qtd}</span>
                <ChevronDown className="acc-seta" strokeWidth={2.2} />
            </button>
            {aberto && (
                <div className="acc-corpo">
                    {tema.grupos.map((grupo) => (grupo.titulo ? (
                        <div className="funcao" key={grupo.titulo}>
                            <h4>{grupo.titulo}</h4>
                            <ListaPassos passos={grupo.passos} />
                        </div>
                    ) : (
                        <ListaPassos key={tema.id} passos={grupo.passos} />
                    )))}
                </div>
            )}
        </div>
    );
}

function Guia() {
    const [foto, setFoto] = useState(null);
    const [temaAberto, setTemaAberto] = useState(TEMAS[0].id);
    const navigate = useNavigate();

    const funcionario = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!funcionario || !funcionario[0]) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }
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

    return (
        <div className="GuiaPortal">
            <Menu foto={foto} nome={nomeFormatado} />
            <Container fluid className="px-4 guia-body">
                <div className="guia-nav-bar">
                    <button className="guia-nav-btn" onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')} title="Página anterior">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className="guia-nav-btn" onClick={() => navigate('/')} title="Início">
                        <i className="fa-solid fa-house"></i>
                    </button>
                    <span className="guia-nav-titulo">Guia do Portal</span>
                </div>
                <p className="guia-intro">Aprenda a usar o Portal em poucos minutos. Abra um dos temas e clique para visualizar o passo a passo.</p>

                <div className="acordeao">
                    {TEMAS.map((tema) => (
                        <Tema
                            key={tema.id}
                            tema={tema}
                            aberto={temaAberto === tema.id}
                            onAlternar={() => setTemaAberto(temaAberto === tema.id ? null : tema.id)}
                        />
                    ))}
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default Guia;
