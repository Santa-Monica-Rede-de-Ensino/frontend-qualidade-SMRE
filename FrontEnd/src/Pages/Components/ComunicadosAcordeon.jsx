import { useState, useEffect, useMemo } from 'react';
import { Accordion } from 'react-bootstrap';
import './ComunicadosAcordeon.css';

const API_URL = 'https://auto.smrede.tec.br/webhook/Emails';

// Quem pesquisa costuma digitar sem acento: "reuniao" precisa achar "Reunião".
const normalizar = (txt) => String(txt ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// E-mail traz CSS e scripts no corpo; sem tirá-los, buscar "color" acharia todos.
function textoDoHtml(html) {
    const doc = new DOMParser().parseFromString(html || '', 'text/html');
    doc.querySelectorAll('script, style').forEach((el) => el.remove());
    return doc.body.textContent || '';
}

function formatarData(isoString) {
    if (!isoString) return '—';
    const d = new Date(isoString);
    if (isNaN(d)) return '—';
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const RETRY_MS = 5000;
const POLL_MS = 60000;

const ComunicadosAcordeon = () => {
    const [comunicados, setComunicados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [busca, setBusca] = useState('');

    const fetchComunicados = (showLoading = false) => {
        if (showLoading) setLoading(true);
        setErro(false);
        fetch(API_URL)
            .then(r => r.json())
            .then(data => {
                const ordenados = [...data]
                    .sort((a, b) => new Date(b.data) - new Date(a.data))
                    .map((item) => ({ ...item, indice: normalizar(`${item.assunto} ${textoDoHtml(item.html)}`) }));
                setComunicados(ordenados);
                setLoading(false);
            })
            .catch(() => {
                if (showLoading) setErro(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchComunicados(true);
        const poll = setInterval(() => fetchComunicados(false), POLL_MS);
        return () => clearInterval(poll);
    }, []);

    const termo = normalizar(busca.trim());
    const visiveis = useMemo(
        () => (termo ? comunicados.filter((item) => item.indice.includes(termo)) : comunicados),
        [comunicados, termo],
    );

    useEffect(() => {
        if (!erro) return;
        const timer = setInterval(() => fetchComunicados(true), RETRY_MS);
        return () => clearInterval(timer);
    }, [erro]);

    return (
        <div className="comunicados-wrapper">
            <div className="comunicados-header-bar">
                <svg className="comunicados-icone-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <h5 className="comunicados-titulo">ÚLTIMOS COMUNICADOS</h5>
            </div>

            {loading && (
                <div className="comunicados-estado">Carregando comunicados...</div>
            )}

            {!loading && !erro && (
                <div className="comunicados-busca">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>
                    <input
                        type="search"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="Pesquisar comunicados"
                        aria-label="Pesquisar comunicados"
                    />
                </div>
            )}

            {!loading && !erro && termo && visiveis.length === 0 && (
                <div className="comunicados-estado" role="status">Nenhum comunicado encontrado.</div>
            )}

            {!loading && !erro && visiveis.length > 0 && (
                <Accordion flush className="comunicados-accordion">
                    {visiveis.map((item) => (
                        <Accordion.Item key={item.id} eventKey={String(item.id)} className="comunicado-item">
                            <Accordion.Header>
                                <div className="comunicado-header-content">
                                    <span className="comunicado-titulo-texto">{item.assunto}</span>
                                    <span className="comunicado-data-badge">{formatarData(item.data)}</span>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className="comunicado-body">
                                {item.html
                                    ? <div dangerouslySetInnerHTML={{ __html: item.html }} />
                                    : <p className="comunicado-sem-conteudo">Conteúdo do comunicado não disponível.</p>
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </div>
    );
};

export default ComunicadosAcordeon;
