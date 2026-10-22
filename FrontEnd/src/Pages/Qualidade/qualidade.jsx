import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Tab, Tabs, Accordion, Button, Modal } from "react-bootstrap";

import Menu from "../HomePage/homepage_menu";
import Footer from "../Components/footer";
import { linkEmConstrucao } from "../EmConstrucao/linkEmConstrucao";
import { busca_foto } from "../../services/api";
import './qualidade.css';

// Regra da Qualidade: só documento de processo com fluxo pronto ganha o botão (Políticas não têm
// fluxo). Para mostrar, preencha `fluxo` no documento com o link do fluxo.
function CorpoDocumento({ doc }) {
    return (
        <>
            {doc.corpo}
            {doc.fluxo && (
                <>
                    {/* Abre em nova aba, como o PDF do documento, para não tirar a pessoa da área aberta */}
                    <Button
                        as="a"
                        href={doc.fluxo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-visualizar-doc btn-fluxo-processo"
                    >
                        FLUXO DO PROCESSO <i className="fa-solid fa-diagram-project"></i>
                    </Button>
                    <div style={{ clear: 'both' }}></div>
                </>
            )}
        </>
    );
}

export const areas = [
    { id: 'comercial', nome: 'COMERCIAL', tipo: 'PROCESSOS DE NEGÓCIO', color: '#4ea8de' },
    { id: 'dgp', nome: 'DGP', tipo: 'PROCESSOS DE NEGÓCIO', color: '#4ea8de' },
    { id: 'gente', nome: 'GENTE\n&\nGESTÃO', tipo: 'PROCESSOS DE SUPORTE', color: '#0d47a1' },
    { id: 'produtos', nome: 'GESTÃO\nDE\nPRODUTOS', tipo: 'PROCESSOS DE SUPORTE', color: '#0d47a1' },
    { id: 'gestao-financeira', nome: 'GESTÃO\nFINANCEIRA', tipo: 'PROCESSOS ESTRATÉGICOS', color: '#6c757d' },
    { id: 'gov', nome: 'GOVERNANÇA\nCORPORATIVA', tipo: 'PROCESSOS ESTRATÉGICOS', color: '#6c757d' },
    { id: 'juridico', nome: 'JURÍDICO', tipo: 'PROCESSOS ESTRATÉGICOS', color: '#6c757d' },
    { id: 'operacoes', nome: 'OPERAÇÕES', tipo: 'PROCESSOS DE SUPORTE', color: '#0d47a1' },
    { id: 'qualidade', nome: 'QUALIDADE', tipo: 'PROCESSOS ESTRATÉGICOS', color: '#6c757d' },
    { id: 'suprimentos', nome: 'SUPRIMENTOS', tipo: 'PROCESSOS DE SUPORTE', color: '#0d47a1' },
    { id: 'ti', nome: 'TECNOLOGIA\nDA\nINFORMAÇÃO', tipo: 'PROCESSOS DE SUPORTE', color: '#0d47a1' },
    { id: 'unidades', nome: 'UNIDADES', tipo: 'PROCESSOS DE NEGÓCIO', color: '#4ea8de' },
];

// Organograma da área: salve o SVG em public/organograma/ e preencha `organogramaSvg` no areaDetails da área.
// Aceita um nome de arquivo (usa o título da área) ou uma lista de { titulo, svg } para vários organogramas.
function OrganogramaImagemSecao({ titulo, svg }) {
    const [ampliado, setAmpliado] = useState(false);
    const src = `${process.env.PUBLIC_URL}/organograma/${svg}`;

    return (
        <section className="organograma-setor">
            <div className="organograma-setor-cabecalho">
                <h3 className="organograma-setor-titulo">{titulo}</h3>
                <button className="organograma-ampliar-btn" onClick={() => setAmpliado(true)} title="Ver em tela cheia">
                    <i className="fa-solid fa-expand"></i> Ampliar
                </button>
            </div>

            <button className="organograma-img-btn" onClick={() => setAmpliado(true)} title="Ver em tela cheia" aria-label={`Ampliar organograma - ${titulo}`}>
                <img src={src} alt={`Organograma - ${titulo}`} className="organograma-img" />
            </button>

            <Modal show={ampliado} onHide={() => setAmpliado(false)} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title className="organograma-setor-titulo">{titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="organograma-modal-body">
                    <img src={src} alt={`Organograma - ${titulo}`} className="organograma-img" />
                </Modal.Body>
            </Modal>
        </section>
    );
}

function OrganogramaArea({ titulo, svg }) {
    const itens = Array.isArray(svg) ? svg : (svg ? [{ titulo, svg }] : []);

    if (itens.length === 0) {
        return (
            <section className="organograma-setor">
                <div className="organograma-setor-cabecalho">
                    <h3 className="organograma-setor-titulo">{titulo}</h3>
                </div>
                <div className="organograma-setor-vazio">Organograma em breve.</div>
            </section>
        );
    }

    return (
        <div className="organograma-lista-area">
            {itens.map((item) => (
                <OrganogramaImagemSecao key={item.svg} titulo={item.titulo} svg={item.svg} />
            ))}
        </div>
    );
}

const normalizar = (txt) => txt.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const ordenarPorTexto = (lista, extrairTexto) =>
    [...lista].sort((a, b) => normalizar(extrairTexto(a)).localeCompare(normalizar(extrairTexto(b))));

const buscarPorTexto = (itens, extrairTexto, termo) => {
    const alvo = normalizar(termo);
    if (alvo === '') return itens;
    return itens.filter((item) => normalizar(extrairTexto(item)).includes(alvo));
};

const areaDetails = {
    qualidade: {
        titulo: 'QUALIDADE',
        objetivo: (
            <div className="qualidade-texto-politica">
                <p>A Política da Qualidade do Santa Mônica Rede de Ensino atribui-se à nossa missão, sendo assim, buscamos integralmente a satisfação das famílias e alunos, o aperfeiçoamento da qualidade dos nossos serviços através da melhoria contínua dos nossos processos, da confiabilidade e segurança da informação e cumprindo com a responsabilidade social e ambiental, sempre respeitando as diferenças.</p>
                <p>A área da Qualidade tem como principal objetivo assegurar que os serviços e processos atendam aos requisitos definidos e às expectativas dos alunos e famílias, promovendo a melhoria contínua.</p>
            </div>
        ),
        organogramaSvg: 'qualidade.svg',
        documentos: [
            { eventKey: '0', titulo: 'PE.01-1.1 - Macroprocessos', corpo: <p>Conteúdo do documento PE.01-1.1 - Macroprocessos</p> },
            { eventKey: '1', titulo: 'PE.01-1.1.1 - Política da Qualidade', corpo: <p>Conteúdo do documento PE.01-1.1.1 - Política da Qualidade</p> },
            {
                eventKey: '2',
                titulo: 'PE.01-1.2.1 - Controle de Informação Documentada',
                corpo: (
                    <>
                        <p>Este documento regulamenta os critérios do processo <strong>PG.01-1.2.1 IP - Controle de Informação Documentada</strong>, relacionado à área da Qualidade, com o objetivo de determinar a metodologia para criação, emissão, aprovação, revisão e controle da informação documentada provida e mantida (documentos) pelo Sistema de Gestão da Qualidade (SGQ), bem como, demonstrar a sistemática aplicada para identificar, armazenar, proteger, recuperar, tempo de reter e disponibilizar o SGQ e seus registros.</p>
                        <p>O processo se aplica à área da Qualidade, como executor das atividades e aos Facilitadores, Gestores de Processos e a Alta Direção, como responsáveis pela elaboração, auxílio e análise crítica dos documentos.</p>
                        <Button className="btn-visualizar-doc">
                            VISUALIZAR DOCUMENTO <i className="fa-solid fa-angles-right"></i>
                        </Button>
                        <div style={{ clear: 'both' }}></div>
                    </>
                ),
            },
            { eventKey: '3', titulo: 'PE.01-1.2.1.5 IT - Elaborar fluxo de processos', corpo: <p>Conteúdo do documento PE.01-1.2.1.5 IT - Elaborar fluxo de processos</p> },
        ],
        defaultDocKey: '2',
        subareas: null,
    },
    gov: {
        titulo: 'GOVERNANÇA CORPORATIVA',
        objetivo: (
            <div className="qualidade-texto-politica">
                <p>A Governança Corporativa do SMREDE estabelece diretrizes, responsabilidades e processos para uma gestão ética, transparente e integrada, promovendo o alinhamento entre a Central Administrativa e as Unidades, a tomada de decisões responsável, a redução de riscos e a sustentabilidade da instituição, sempre em consonância com seus valores e objetivos educacionais.</p>
                <p><strong>Estrutura:</strong></p>
                <ul>
                    <li><strong>Conselho Diretor</strong> - Órgão máximo de decisão. Responsável pela estratégia e supervisão da gestão.</li>
                    <li><strong>Diretoria Executiva</strong> - Responsável pela gestão do dia a dia.</li>
                    <li><strong>Comitês (Comitê de Segurança da Informação e Comitê de Ética e Conduta)</strong> - Controle e fiscalização.</li>
                </ul>
            </div>
        ),
        organogramaSvg: [
            { titulo: 'CONSELHO DIRETOR', svg: 'governanca-corporativa.svg' },
            { titulo: 'ALTA DIREÇÃO', svg: 'alta-direcao.svg' },
        ],
        documentos: [
            {
                eventKey: '0',
                titulo: 'PE.02-0.1 - Estrutura Organizacional',
                corpo: (
                    <>
                        <p>A estrutura organizacional é uma representação com base nos objetivos traçados pela instituição, diz respeito ao desenho de cargos, funções e departamentos, além da relação entre líderes e seus liderados.</p>
                        <p>Ela é essencial para organizar departamentos e seus profissionais, processos e atividades, de forma que todos compreendam suas responsabilidades e seus papéis.</p>
                    </>
                ),
            },
            {
                eventKey: '1',
                titulo: 'PE.02-0.2 - Identidade Organizacional',
                corpo: (
                    <>
                        <p>A <strong>Identidade Organizacional</strong>, constituída por nossa <strong>Missão, Visão e Valores</strong>, tem como função orientar as decisões estratégicas, alinhar as equipes em torno de um propósito comum e fortalecer a essência e a cultura da instituição. Além disso, contribui para aumentar o engajamento, aprimorar a comunicação com as famílias e parceiros e facilitar o processo da Qualidade, por estar diretamente relacionada às Políticas Internas do SMREDE, aos objetivos institucionais e aos processos de melhoria contínua.</p>
                        <Button
                            as="a"
                            href={`${process.env.PUBLIC_URL}/documentos/PE.02-0.2-identidade-organizacional.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-visualizar-doc"
                        >
                            VISUALIZAR DOCUMENTO <i className="fa-solid fa-angles-right"></i>
                        </Button>
                        <div style={{ clear: 'both' }}></div>
                    </>
                ),
            },
            {
                eventKey: '2',
                titulo: 'PE.02-0.3 - Código de Ética e Conduta',
                corpo: (
                    <>
                        <p>O <strong>Santa Mônica Rede de Ensino</strong> tem como compromisso oferecer uma educação de excelência, promovendo o desenvolvimento integral dos alunos nos aspectos intelectual, social, emocional, físico e ético. A instituição busca formar cidadãos conscientes, solidários, criativos e preparados para enfrentar desafios, contando, para isso, com uma equipe comprometida com seus princípios e valores.</p>
                        <p>Para preservar sua reputação e credibilidade, a instituição estabelece como fundamentos de atuação a <strong>honestidade, o respeito, a integridade e a ética</strong>. A conduta de seus profissionais deve estar alinhada a esses princípios, bem como às políticas, normas e procedimentos internos.</p>
                        <p>O <strong>Código de Ética e Conduta</strong>, fundamentado na Missão, Visão e Valores da instituição, orienta o comportamento esperado de administradores, diretores, colaboradores, estagiários, jovens aprendizes e terceiros que mantêm relacionamento com o Santa Mônica Rede de Ensino. Seu objetivo é assegurar uma atuação ética e responsável, fortalecendo a confiança de alunos, famílias, fornecedores, parceiros e da sociedade.</p>
                        <Button
                            as="a"
                            href={`${process.env.PUBLIC_URL}/documentos/PE.02-0.3-codigo-de-etica-e-conduta.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-visualizar-doc"
                        >
                            VISUALIZAR DOCUMENTO <i className="fa-solid fa-angles-right"></i>
                        </Button>
                        <div style={{ clear: 'both' }}></div>
                    </>
                ),
            },
        ],
        defaultDocKey: '0',
        subareas: [
            {
                id: 'planejamento-estrategico',
                nome: 'PE.02-1 - Planejamento Estratégico',
                documentos: [],
            },
            {
                id: 'novos-negocios',
                nome: 'PE.02-2 - Novos Negócios',
                documentos: [],
            },
        ],
    },
    ti: {
        titulo: 'TECNOLOGIA DA INFORMAÇÃO',
        objetivo: (
            <div className="qualidade-texto-politica">
                <p>A área de Tecnologia da Informação (TI) tem como objetivo garantir que toda a infraestrutura tecnológica do SMREDE funcione de forma segura, eficiente, integrada e disponível, apoiando as atividades pedagógicas, administrativas e operacionais da Central Administrativa e das Unidades.</p>
                <p><strong>Entre suas principais responsabilidades estão:</strong></p>
                <ul>
                    <li>Gestão e manutenção da <strong>infraestrutura de TI</strong>, incluindo redes, internet, servidores, computadores, notebooks, equipamentos e periféricos;</li>
                    <li>Suporte técnico aos <strong>colaboradores, professores e demais usuários</strong>;</li>
                    <li>Administração de <strong>sistemas, plataformas educacionais, ferramentas corporativas e recursos tecnológicos</strong>;</li>
                    <li>Gestão de <strong>acessos, segurança da informação, proteção de dados, backups e continuidade dos serviços</strong>;</li>
                    <li>Apoio à implementação de <strong>novas tecnologias e projetos de inovação</strong>, contribuindo para a transformação digital do SMREDE;</li>
                    <li>Planejamento de <strong>aquisições, contratos, licenças, fornecedores e renovação do parque tecnológico</strong>;</li>
                    <li>Gestão da infraestrutura de <strong>CFTV (Circuito Fechado de Televisão)</strong>, contemplando câmeras, gravadores, armazenamento, monitoramento e disponibilidade do sistema, em apoio à <strong>segurança patrimonial e operacional</strong> das Unidades.</li>
                </ul>
            </div>
        ),
        organogramaSvg: [
            { titulo: 'DIRETORIA TI', svg: 'diretoria-ti.svg' },
        ],
        documentos: [
            {
                eventKey: '0',
                titulo: 'PS.06-0.1 - Política de Privacidade',
                corpo: (
                    <>
                        <p>No Santa Mônica Rede de Ensino, privacidade e segurança são prioridades inegociáveis. Comprometemo-nos com a total transparência no tratamento de dados pessoais de nossos usuários, em estrita conformidade com a legislação vigente. Esta política detalha os procedimentos de coleta, uso e transferência de informações de clientes (famílias e alunos) e demais usuários que acessam ou utilizam nosso site.</p>
                        <Button
                            as="a"
                            href={`${process.env.PUBLIC_URL}/documentos/PS.06-0.1-politica-de-privacidade.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-visualizar-doc"
                        >
                            VISUALIZAR DOCUMENTO <i className="fa-solid fa-angles-right"></i>
                        </Button>
                        <div style={{ clear: 'both' }}></div>
                    </>
                ),
            },
            {
                eventKey: '1',
                titulo: 'PS.06-0.2 - Política de Segurança da Informação',
                corpo: (
                    <>
                        <p>Esta política estabelece diretrizes e normas obrigatórias para proteger os ativos de informação do SMREDE, garantindo a confidencialidade, integridade, disponibilidade, autenticidade e rastreabilidade (CIDAR). Também orienta o uso seguro, responsável e monitorado dos recursos tecnológicos e informacionais da instituição, em conformidade com a legislação aplicável, especialmente a <strong>Lei Geral de Proteção de Dados Pessoais</strong> (LGPD), bem como com boas práticas e referenciais de mercado.</p>
                        <Button
                            as="a"
                            href={`${process.env.PUBLIC_URL}/documentos/PS.06-0.2-politica-de-seguranca-da-informacao.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-visualizar-doc"
                        >
                            VISUALIZAR DOCUMENTO <i className="fa-solid fa-angles-right"></i>
                        </Button>
                        <div style={{ clear: 'both' }}></div>
                    </>
                ),
            },
        ],
        defaultDocKey: '0',
        subareas: [
            {
                id: 'ps-06-1-infraestrutura',
                nome: 'PS.06.1 - Infraestrutura',
                documentos: [
                    {
                        eventKey: 'ps-06-1-1',
                        titulo: 'PS.06.1.1 - Procedimento de Gestão de Backups e Recuperação de Dados',
                        corpo: (
                            <>
                                <p>Este documento regulamenta os critérios do processo <strong>PS.06.1.1 - Procedimento de Gestão de Backups e Recuperação de Dados</strong>, relacionado à área de TI, com o objetivo de estabelecer o processo para a salvaguarda e recuperação dos dados institucionais, garantindo a disponibilidade dos serviços acadêmicos e administrativos em caso de falhas críticas, erros humanos ou ataques cibernéticos.</p>
                                <p>O processo se aplica à área de TI, tendo a equipe de Infraestrutura como principal executora das atividades.</p>
                                <Button
                                    as="a"
                                    href={`${process.env.PUBLIC_URL}/documentos/PS.06.1.1-procedimento-de-gestao-de-backups-e-recuperacao-de-dados.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-visualizar-doc"
                                >
                                    VISUALIZAR DOCUMENTO <i className="fa-solid fa-angles-right"></i>
                                </Button>
                                <div style={{ clear: 'both' }}></div>
                            </>
                        ),
                    },
                ],
            },
            {
                id: 'ps-06-2-sistemas',
                nome: 'PS.06.2 - Sistemas',
                documentos: [],
            },
            {
                id: 'ps-06-3-tecnica',
                nome: 'PS.06.3 - Técnica',
                documentos: [],
            },
        ],
    },
};

Object.values(areaDetails).forEach((area) => {
    area.documentos = ordenarPorTexto(area.documentos, (d) => d.titulo);
    if (area.subareas) {
        // Subáreas mantêm a ordem em que foram declaradas; só os documentos são ordenados.
        area.subareas = area.subareas.map((sub) => ({
            ...sub,
            documentos: ordenarPorTexto(sub.documentos, (d) => d.titulo),
        }));
    }
});

function Breadcrumb({ trilha }) {
    return (
        <div className="qualidade-breadcrumb">
            {trilha.map((item, i) => (
                <span key={i}>
                    {i > 0 && <i className="fa-solid fa-angle-right qualidade-breadcrumb-sep"></i>}
                    {item.onClick ? (
                        <button className="qualidade-breadcrumb-link" onClick={item.onClick}>{item.label}</button>
                    ) : (
                        <span className="qualidade-breadcrumb-atual">{item.label}</span>
                    )}
                </span>
            ))}
        </div>
    );
}

function TabTitle({ icone, texto }) {
    return (
        <span className="qualidade-tab-label">
            <i className={`fa-solid ${icone} qualidade-tab-icon`}></i>
            <span className="qualidade-tab-text">{texto}</span>
        </span>
    );
}

function BuscaDocumentos({ valor, onChange, placeholder }) {
    return (
        <div className="qualidade-busca-wrapper qualidade-busca-wrapper-inline">
            <i className="fa-solid fa-magnifying-glass qualidade-busca-icon"></i>
            <input
                type="text"
                className="qualidade-busca-input"
                placeholder={placeholder}
                value={valor}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

function SubareaSidebar({ subareas, subareaAtiva, onSelecionar, busca, onBuscaChange }) {
    const buscando = busca.trim() !== '';
    const flatDocs = ordenarPorTexto(
        subareas.flatMap((sub) => sub.documentos.map((doc) => ({ ...doc, subareaNome: sub.nome }))),
        (d) => d.titulo
    );
    const resultados = buscando ? buscarPorTexto(flatDocs, (d) => d.titulo, busca) : [];
    const sub = subareas.find((s) => s.id === subareaAtiva) || subareas[0];

    return (
        <div className="qualidade-sidebar-wrap">
            <div className="qualidade-sidebar-menu">
                {subareas.map((s) => (
                    <button
                        key={s.id}
                        className={`qualidade-sidebar-item ${!buscando && sub && s.id === sub.id ? 'is-active' : ''}`}
                        onClick={() => onSelecionar(s.id)}
                    >
                        {s.nome}
                    </button>
                ))}
            </div>
            <div className="qualidade-sidebar-content">
                <BuscaDocumentos valor={busca} onChange={onBuscaChange} placeholder="Pesquisar documento..." />
                {buscando ? (
                    resultados.length === 0 ? (
                        <div className="qualidade-texto-politica">Nenhum documento encontrado.</div>
                    ) : (
                        <Accordion>
                            {resultados.map((doc) => (
                                <Accordion.Item key={doc.eventKey} eventKey={doc.eventKey} className="accordion-item-custom">
                                    <Accordion.Header>{doc.titulo} <span className="qualidade-busca-item-caminho" style={{ marginLeft: 10 }}>({doc.subareaNome})</span></Accordion.Header>
                                    <Accordion.Body><CorpoDocumento doc={doc} /></Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    )
                ) : !sub || sub.documentos.length === 0 ? (
                    <div className="qualidade-texto-politica">Nenhum documento encontrado.</div>
                ) : (
                    <Accordion>
                        {sub.documentos.map((doc) => (
                            <Accordion.Item key={doc.eventKey} eventKey={doc.eventKey} className="accordion-item-custom">
                                <Accordion.Header>{doc.titulo}</Accordion.Header>
                                <Accordion.Body><CorpoDocumento doc={doc} /></Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    );
}

function AreaDetail({ config, onVoltar, onHome }) {
    const [subareaSidebar, setSubareaSidebar] = useState(config.subareas?.[0]?.id || null);
    const [buscaDocs, setBuscaDocs] = useState('');
    const [buscaSub, setBuscaSub] = useState('');

    const documentosFiltrados = buscarPorTexto(config.documentos, (d) => d.titulo, buscaDocs);

    const trilha = [{ label: 'Qualidade', onClick: onVoltar }, { label: config.titulo }];

    return (
        <>
            <Breadcrumb trilha={trilha} />
            <div className="qualidade-nav-bar">
                <button className="qualidade-nav-btn" onClick={onVoltar} title="Voltar ao menu">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button className="qualidade-nav-btn" onClick={onHome} title="Início">
                    <i className="fa-solid fa-house"></i>
                </button>
            </div>
            <div className="qualidade-header-bar" style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ flexGrow: 1 }}>{config.titulo}</span>
            </div>

            <div className="qualidade-tabs">
                <Tabs defaultActiveKey="objetivo" id="qualidade-tab" className="mb-0">
                    <Tab eventKey="objetivo" title={<TabTitle icone="fa-bullseye" texto="OBJETIVO" />}>
                        <div className="qualidade-tab-content">
                            {config.objetivo || (
                                <div className="qualidade-texto-politica">Objetivo em breve.</div>
                            )}
                        </div>
                    </Tab>
                    <Tab eventKey="organograma" title={<TabTitle icone="fa-sitemap" texto="ORGANOGRAMA" />}>
                        <div className="qualidade-tab-content qualidade-pdf-wrapper">
                            <OrganogramaArea titulo={config.titulo} svg={config.organogramaSvg} />
                        </div>
                    </Tab>
                    <Tab eventKey="documentos" title={<TabTitle icone="fa-file-lines" texto="DOCUMENTOS" />}>
                        <div className="qualidade-tab-content">
                            <BuscaDocumentos valor={buscaDocs} onChange={setBuscaDocs} placeholder="Pesquisar documento..." />
                            {documentosFiltrados.length === 0 ? (
                                <div className="qualidade-texto-politica">Nenhum documento encontrado.</div>
                            ) : (
                                <Accordion defaultActiveKey={config.defaultDocKey}>
                                    {documentosFiltrados.map((doc) => (
                                        <Accordion.Item key={doc.eventKey} eventKey={doc.eventKey} className="accordion-item-custom">
                                            <Accordion.Header>{doc.titulo}</Accordion.Header>
                                            <Accordion.Body><CorpoDocumento doc={doc} /></Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            )}
                        </div>
                    </Tab>
                    {config.subareas !== null && (
                        <Tab eventKey="subareas" title={<TabTitle icone="fa-layer-group" texto="SUBÁREAS" />}>
                            <div className="qualidade-tab-content">
                                {config.subareas.length === 0 ? (
                                    <div className="qualidade-texto-politica">Em breve novas subáreas serão adicionadas.</div>
                                ) : (
                                    <SubareaSidebar
                                        subareas={config.subareas}
                                        subareaAtiva={subareaSidebar}
                                        onSelecionar={setSubareaSidebar}
                                        busca={buscaSub}
                                        onBuscaChange={setBuscaSub}
                                    />
                                )}
                            </div>
                        </Tab>
                    )}
                </Tabs>
            </div>
        </>
    );
}

const Qualidade = () => {
    const [view, setView] = useState('menu');
    const [foto, setFoto] = useState(null);
    const navigate = useNavigate();

    const funcionario = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!funcionario || !funcionario[0]) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
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
        <div className="Qualidade">
            <Menu foto={foto} nome={nomeFormatado} />
            <Container fluid className="px-4 qualidade-body">
                {view === 'menu' && (
                    <>
                        <div className="qualidade-nav-bar">
                            <button className="qualidade-nav-btn" onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')} title="Página anterior">
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <button className="qualidade-nav-btn" onClick={() => navigate('/')} title="Início">
                                <i className="fa-solid fa-house"></i>
                            </button>
                            <span className="qualidade-nav-titulo">Gestão da Qualidade</span>
                        </div>
                        <div className="areas-grid">
                            {areas.map(area => (
                                <div
                                    key={area.id}
                                    className="area-card"
                                    onClick={() => {
                                        if (areaDetails[area.id]) {
                                            setView(area.id);
                                        } else {
                                            navigate(linkEmConstrucao(area.nome.replace(/\n/g, ' ')));
                                        }
                                    }}
                                >
                                    <div className="area-card-title" style={{ whiteSpace: 'pre-line' }}>{area.nome}</div>
                                    <div className="area-card-badge" style={{ backgroundColor: area.color }}>
                                        {area.tipo}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {areaDetails[view] && (
                    <AreaDetail
                        config={areaDetails[view]}
                        onVoltar={() => setView('menu')}
                        onHome={() => navigate('/')}
                    />
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default Qualidade;
