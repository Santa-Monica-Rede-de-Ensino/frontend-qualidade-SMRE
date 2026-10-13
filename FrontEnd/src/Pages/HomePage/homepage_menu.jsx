import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PartyPopper, HeartPulse, FileText, Palmtree, Receipt, BadgeCheck, Phone, MonitorCheck, BookOpen } from 'lucide-react';
import { emProducao } from '../../config/fase';
import { linkEmConstrucao } from '../EmConstrucao/linkEmConstrucao';
import { useAniversarioHoje, useConfeteDaSessao } from './aniversarioHoje';
import './menu.css';

import LogoNegativa from '../../img/Portal_Func/SMRE_logo_negativo.png';
import IconMenu from '../../img/Portal_Func/Três pontos Desktop - Menu de Usuário.png';

const ITENS_MENU = [
    { id: 1, nome: 'ANIVERSARIANTES', Icon: PartyPopper, link: '/aniversariantes' },
    { id: 2, nome: 'BENEFÍCIOS', Icon: HeartPulse, link: linkEmConstrucao('Benefícios'), ocultoEmProducao: true },
    { id: 3, nome: 'CONTRACHEQUE', Icon: FileText, link: '/contraCheque' },
    { id: 4, nome: 'FÉRIAS', Icon: Palmtree, link: linkEmConstrucao('Férias'), ocultoEmProducao: true },
    { id: 5, nome: 'GESTÃO DA QUALIDADE', Icon: BadgeCheck, link: '/qualidade' },
    { id: 9, nome: 'GUIA DO PORTAL', Icon: BookOpen, link: '/guia' },
    { id: 6, nome: 'INFORME DE RENDIMENTOS', Icon: Receipt, link: linkEmConstrucao('Informe de Rendimentos'), ocultoEmProducao: true },
    { id: 7, nome: 'RAMAIS', Icon: Phone, link: '/ramais' },
    { id: 8, nome: 'SISTEMA MONITORA', Icon: MonitorCheck, link: 'https://monitora.smrede.net.br/', externo: true },
];

export const itensMenuVisiveis = () => ITENS_MENU.filter((botao) => !(emProducao && botao.ocultoEmProducao));

const CORES_CONFETE = ['#F5821F', '#FFC94A', '#FFFFFF', '#00A6E4'];
const CONFETES = Array.from({ length: 16 }, (_, i) => {
    const angulo = (i / 16) * Math.PI * 2 + (i % 2 ? 0.2 : -0.1);
    const distancia = 46 + (i % 3) * 14;
    return {
        '--x': `${Math.cos(angulo) * distancia}px`,
        '--y': `${Math.sin(angulo) * distancia}px`,
        '--r': `${(i % 2 ? 1 : -1) * (180 + i * 25)}deg`,
        '--c': CORES_CONFETE[i % CORES_CONFETE.length],
        '--d': `${(i % 4) * 0.05}s`,
    };
});

const cpfLogado = () => {
    try {
        return JSON.parse(localStorage.getItem('user'))?.[0]?.cpf;
    } catch {
        return undefined;
    }
};

function FotoUsuario({ fotoSrc, nome, aniversario, confete, decorativa, onErro }) {
    const classe = `navbar-user-foto${aniversario ? ' aniversario' : ''}${confete ? ' festa' : ''}`;
    return (
        <span className={classe}>
            {fotoSrc ? (
                <img src={fotoSrc} alt={decorativa ? '' : 'Foto do colaborador'} className="navbar-user-avatar" onError={onErro} />
            ) : (
                <div className="navbar-user-placeholder">{nome ? nome.charAt(0) : ''}</div>
            )}
            {aniversario && (
                <span className="navbar-aniversario-selo" aria-hidden="true"><PartyPopper strokeWidth={2.2} /></span>
            )}
            {confete && (
                <span className="navbar-aniversario-confetes" aria-hidden="true">
                    {CONFETES.map((estilo, i) => <i key={i} style={estilo} />)}
                </span>
            )}
        </span>
    );
}

function Menu({ foto, nome }) {
    const [fotoComErro, setFotoComErro] = useState(false);
    const fotoValida = typeof foto === 'string' && foto.length > 100 && !fotoComErro;
    const fotoSrc = fotoValida && (foto.startsWith('data:image') ? foto : `data:image/jpeg;base64,${foto}`);
    const aniversario = useAniversarioHoje(cpfLogado());
    const confete = useConfeteDaSessao(aniversario);
    const saudacao = aniversario ? `Feliz Aniversário, ${nome}!` : `Olá, ${nome}!`;

    const botoes = itensMenuVisiveis();

    return (
        <>
            <Navbar expand="lg" variant="dark" className={aniversario ? 'custom-navbar aniversario-hoje' : 'custom-navbar'}>
                <Container fluid className="navbar-container">

                    {/* Lado Esquerdo: Logo e Título conforme imagem de marketing */}
                    <Navbar.Brand as={Link} to="/" className="brand-section">
                        <img src={LogoNegativa} alt="Santa Mônica" className="logo-sm" />
                        <div className="vertical-divider"></div>
                        <h2 className="portal-title">PORTAL DO COLABORADOR</h2>
                    </Navbar.Brand>

                    {/* No celular a foto fica atrás do ☰; no aniversário, esta cópia aparece */}
                    {aniversario && (
                        <span className="navbar-aniversario-cel d-lg-none ms-auto me-2" role="img" aria-label={saudacao}>
                            <FotoUsuario fotoSrc={fotoSrc} nome={nome} aniversario confete={confete} decorativa onErro={() => setFotoComErro(true)} />
                        </span>
                    )}

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto align-items-center" style={{ gap: '12px' }}>

                            {(foto || nome) && (
                                <div className="navbar-user-info">
                                    <span className={confete ? 'navbar-user-greeting festa' : 'navbar-user-greeting'}>{saudacao}</span>
                                    <FotoUsuario
                                        fotoSrc={fotoSrc}
                                        nome={nome}
                                        aniversario={aniversario}
                                        confete={confete}
                                        onErro={() => setFotoComErro(true)}
                                    />
                                </div>
                            )}


                            <NavDropdown
                                title={<img src={IconMenu} alt="Opções" className="nav-icon-img" style={{ height: '2.5em', width: 'auto' }} />}
                                id="colaborador-dropdown"
                                align="end"
                                className="custom-dropdown"
                            >
                                {/* Botões do Menu */}
                                {botoes.map(({ id, nome, Icon, link, externo }) => (
                                    <NavDropdown.Item
                                        key={id}
                                        {...(externo
                                            ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
                                            : { as: Link, to: link })}
                                    >
                                        <Icon size={15} strokeWidth={1.8} style={{ marginRight: '0.5rem', verticalAlign: 'middle', color: '#006CB5' }} />
                                        {nome}
                                    </NavDropdown.Item>
                                ))}

                                {/* <NavDropdown.Divider />
                                <NavDropdown.Item href="/qualidade">
                                    <i className="fa-regular fa-star me-2"></i> Portal da Qualidade
                                </NavDropdown.Item> */}

                                {/* Links restritos ao perfil de gestão */}
                                {/* {isGestao && (
                                    <>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Header className="dropdown-header-custom">Gestão</NavDropdown.Header>
                                        <NavDropdown.Item href="/uploadCC">Atualizar Funcionários</NavDropdown.Item>
                                        <NavDropdown.Item href="/uploadGPT">Importar Comprovantes</NavDropdown.Item>
                                        <NavDropdown.Item href="/uploadGPTFotos">Importar Fotos</NavDropdown.Item>
                                        <NavDropdown.Item href="/contaDocs">Verificar Importações</NavDropdown.Item>
                                    </>
                                )} */}

                                {/* <NavDropdown.Divider />
                                <NavDropdown.Item href="/login" className="text-danger">
                                    <i className="fa-solid fa-right-from-bracket me-2"></i> Sair
                                </NavDropdown.Item> */}
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Menu;