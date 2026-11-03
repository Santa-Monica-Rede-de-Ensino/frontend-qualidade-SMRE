import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Construction } from 'lucide-react';
import Menu from '../../shared/components/homepage_menu';
import Footer from '../../shared/components/footer';
import { busca_foto } from '../../services/api';
import './emConstrucao.css';

function EmConstrucao() {
    const [foto, setFoto] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const pagina = searchParams.get('pagina');

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

    const voltar = () => window.history.length > 1 ? navigate(-1) : navigate('/');
    const irParaInicio = () => navigate('/');

    return (
        <div className="EmConstrucao">
            <Menu foto={foto} nome={nomeFormatado} />
            <Container fluid className="px-4 em-construcao-body">
                <div className="em-construcao-nav-bar">
                    <button className="em-construcao-nav-btn" onClick={voltar} title="Página anterior">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className="em-construcao-nav-btn" onClick={irParaInicio} title="Início">
                        <i className="fa-solid fa-house"></i>
                    </button>
                </div>

                <div className="em-construcao-faixa">{pagina || 'Em construção'}</div>

                <div className="em-construcao-caixa">
                    <div className="em-construcao-fita" aria-hidden="true" />
                    <div className="em-construcao-conteudo">
                        <div className="em-construcao-icone" aria-hidden="true">
                            <Construction strokeWidth={1.5} />
                        </div>
                        <div className="em-construcao-texto">
                            <div className="em-construcao-selo">EM CONSTRUÇÃO</div>
                            <h1>Estamos preparando esta página</h1>
                            <p>
                                {pagina
                                    ? <>O conteúdo de <b>{pagina}</b> ainda está sendo organizado.</>
                                    : 'O conteúdo desta página ainda está sendo organizado.'}
                                {' '}Em breve ele estará disponível aqui no Portal.
                            </p>
                            <div className="em-construcao-botoes">
                                <button className="em-construcao-btn-voltar" onClick={voltar}>
                                    <i className="fa-solid fa-arrow-left"></i> Voltar
                                </button>
                                <button className="em-construcao-btn-inicio" onClick={irParaInicio}>
                                    <i className="fa-solid fa-house"></i> Ir para o início
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="em-construcao-fita" aria-hidden="true" />
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default EmConstrucao;
