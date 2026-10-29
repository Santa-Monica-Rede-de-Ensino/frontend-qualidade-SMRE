// Telas simuladas do Suporte CSC (osTicket) para os tutoriais de abertura de ticket.
// Leozinho, colaboradores e valores preenchidos são fictícios.
import React from 'react';
import { House, FilePlus, FileText, CirclePlus, ChevronDown, Trash2 } from 'lucide-react';
import LogoCsc from '../../img/Portal_Func/csc-logo.png';
import MiniVideo, { Tela } from './MiniVideo';
import './telasHelpdesk.css';

export const LINK_CSC = 'https://helpdesk.smrede.net.br/';
const VAZIO_TOPICO = '— Selecione um Tópico de Ajuda —';

// Cada passo monta a mesma cena para o computador e para o celular (cel muda medidas e o toque).
export const ambos = (montar) => ({ cena: montar(false), cenaCel: montar(true) });

export function Video({ cel, de = ['55%', '88%'], para, semClique, children }) {
    return (
        <MiniVideo cel={cel} semClique={semClique} x0={de[0]} y0={de[1]} x1={para.x} y1={para.y}>
            {children}
        </MiniVideo>
    );
}

export const surgeTarde = (conteudo) => <span className="surge tarde">{conteudo}</span>;

export const TOPICO_DESLIGAMENTO = 'G&G - Desligamento e Contratação';
export const TOPICO_ANALISE = 'G&G - Análise de Desligamento';

// Pilha de linhas: h = altura em % da cena (hCel no celular); larg = largura do campo em % da
// cena [computador, celular]. Todo tópico abre com INICIO_FORMULARIO e fecha com FIM_FORMULARIO.
export const INICIO_FORMULARIO = [
    { id: 'topo', tipo: 'topo', h: 13, hCel: 9 },
    { id: 'nav', tipo: 'nav', h: 7, hCel: 6 },
    { id: 'pagina', tipo: 'h1', h: 7, texto: 'Abrir Novo Ticket' },
    { id: 'intro', tipo: 'texto', h: 6, hCel: 8, texto: 'Por favor, preencha o formulário abaixo para abrir um novo ticket.' },
    { id: 'cliente', tipo: 'cliente', h: 9, risco: true },
    { id: 'topico', tipo: 'select', h: 10, risco: true, rotulo: 'Tópico de ajuda', obrigDepois: true, larg: [31, 86], vazio: '— Selecione um Tópico de Ajuda —' },
    { id: 'solicitacao', tipo: 'h3', h: 9, risco: true, texto: 'Solicitação' },
    { id: 'titulo', tipo: 'campo', h: 8, rotulo: 'Título', obrig: true, larg: [40, 92] },
];

export const FIM_FORMULARIO = [
    { id: 'botoes', tipo: 'botoes', h: 9, risco: true },
    { id: 'rodape', tipo: 'rodape', h: 6 },
];

// Itens do menu e botões com posição fixa (% da cena) para a setinha saber onde clicar.
const NAV = {
    principal: { pc: [10.5, 12.5], cel: [5, 27], texto: 'Página Principal', Icone: House },
    novo: { pc: [24, 13.5], cel: [34, 29], texto: 'Abrir Novo Ticket', Icone: FilePlus },
    tickets: { pc: [38.5, 9.5], cel: [66, 22], texto: 'Tickets', Icone: FileText },
};
const BOTOES = {
    criar: { pc: [36, 9], cel: [5, 26], texto: 'Criar Ticket' },
    recomecar: { pc: [46, 14], cel: [33, 38], texto: 'Recomeçar Formulário' },
    cancelar: { pc: [61, 7.5], cel: [73, 22], texto: 'Cancelar' },
};

// 1em da linha em % da altura da cena (.42em no computador, .62em no celular) e margem esquerda.
const EM = { pc: 1.68, cel: 1.74 };
const X0 = { pc: 8.5, cel: 4 };
const LARGURA_LINHA = { pc: 83, cel: 92 };
const RISCO = 0.6;
const ROTULO = 1.55;
const ALTURA_CAMPO = { select: 1.8, campo: 1.8, area: 4.5, multi: 2, caixa: 0.9, arquivos: 1.3 };

// A animação do dedo troca o translate(-50%) por scale, então o canto dele fica no alvo:
// recuamos meio dedo (2.2em de 5cqw) para o centro cair no campo.
const MEIO_DEDO = { x: 5.5, y: 3.1 };

const chave = (cel) => (cel ? 'cel' : 'pc');
const pct = (n) => `${n}%`;

// Ponto (em % da cena) para onde a setinha vai; no celular, recuado para o centro do dedo.
export const pontoCena = (x, y, cel) => (cel ? { x: pct(x - MEIO_DEDO.x), y: pct(y - MEIO_DEDO.y) } : { x: pct(x), y: pct(y) });
const porTela = (par, cel) => (Array.isArray(par) ? par[cel ? 1 : 0] : par);

// Dica em itálico acima do campo; dicaLinhas = [computador, celular] quando ela quebra.
const alturaDica = (l, cel) => (l.dica ? 0.6 + 1.3 * (porTela(l.dicaLinhas, cel) ?? 1) : 0);
const alturaCampo = (l, cel) => porTela(l.altura, cel) ?? ALTURA_CAMPO[l.tipo];

// Topo do campo na linha (unidade em). linhasAcima: linhas antes do campo que já reservam o
// lugar, como os anexos que só surgem no vídeo.
const inicioCampo = (l, cel) => (l.risco ? RISCO : 0) + ROTULO + alturaDica(l, cel) + 1.3 * (l.linhasAcima ?? 0);

// Valor de lista que troca do vazio para o escolhido quando a lista do vídeo fecha.
export function Escolhe({ de = '— Selecionar —', children }) {
    return (
        <span className="h-troca">
            <span className="sai">{de}</span>
            <span className="entra">{children}</span>
        </span>
    );
}

export const Chips = ({ itens }) => itens.map((item) => <span key={item} className="h-chip">× {item}</span>);

// Arquivos já enviados; o osTicket mostra nome e tamanho colados ("arquivo.pdf15.2kB").
export const Anexados = ({ itens, className = '' }) => (
    <span className={`h-anexados ${className}`}>
        {itens.map(([nome, tamanho]) => (
            <span key={nome} className="h-anexo">{nome}{tamanho}<Trash2 strokeWidth={2.2} /></span>
        ))}
    </span>
);

const Rotulo = ({ l }) => (
    <span className={l.obrig || l.obrigDepois ? 'h-rot obrig' : 'h-rot'}>{l.rotulo}{l.obrig && <i> *</i>}</span>
);

function Campo({ l, valor, cel }) {
    const width = l.larg && `${porTela(l.larg, cel)}cqw`;
    switch (l.tipo) {
        case 'select':
            return (
                <span className="h-com-obrig">
                    <span className="h-sel" style={{ width }}>
                        <span className="h-valor">{valor ?? l.vazio ?? '— Selecionar —'}</span>
                        <ChevronDown strokeWidth={3} />
                    </span>
                    {l.obrigDepois && <i> *</i>}
                </span>
            );
        case 'campo':
            return <span className="h-campo" style={{ width }}>{valor}</span>;
        case 'area':
            return (
                <span className={l.altura ? 'h-campo h-area texto-longo' : 'h-campo h-area'} style={{ width, height: l.altura && `${porTela(l.altura, cel)}em` }}>
                    {valor}
                </span>
            );
        case 'multi':
            return (
                <span className="h-campo h-multi" style={{ width }}>
                    {valor ?? <span className="h-vazio">Selecionar</span>}
                </span>
            );
        case 'caixa':
            return <span className="h-caixa" />;
        default:
            return null;
    }
}

function Linha({ l, valor, cel, ativo, aperta, qtdTickets = 3, className = '' }) {
    const k = chave(cel);
    const classe = `h-linha${l.risco ? ' risco' : ''} ${className}`;
    const style = { top: pct(l.top), height: pct(l.h) };

    switch (l.tipo) {
        case 'topo':
            return (
                <div className={`${classe} h-topo`} style={style}>
                    <img className="h-logo" src={LogoCsc} alt="" />
                    <span className="h-usuario">
                        Leozinho Parente | <u>Perfil</u> | <u>Tickets <b>({qtdTickets})</b></u> -<br /><u>Registrar Saída</u>
                    </span>
                </div>
            );
        case 'nav':
            return (
                <div className="h-linha cheia" style={style}>
                    <div className="h-nav" />
                    {Object.entries(NAV).map(([id, { texto, Icone, ...pos }]) => (
                        <span
                            key={id}
                            className={id === ativo ? 'h-nav-item on' : 'h-nav-item'}
                            style={{ left: pct(pos[k][0]), width: pct(pos[k][1]) }}
                        >
                            <Icone strokeWidth={1.8} />{id === 'tickets' ? `${texto} (${qtdTickets})` : texto}
                        </span>
                    ))}
                </div>
            );
        case 'h1':
            return <div className={classe} style={style}><span className="h-h1">{l.texto}</span></div>;
        case 'h3':
            return <div className={classe} style={style}><span className="h-h3">{l.texto}</span></div>;
        case 'texto':
            return <div className={classe} style={style}><span className="h-texto">{l.texto}</span></div>;
        case 'cliente':
            return (
                <div className={classe} style={style}>
                    <span className="h-cliente">
                        <span>Email:</span><span>leozinho@email.com</span>
                        <span>Cliente:</span><span>Leozinho Parente</span>
                    </span>
                </div>
            );
        case 'arquivos':
            return (
                <div className={classe} style={style}>
                    <Rotulo l={l} />
                    {l.dica && <span className="h-dica">{l.dica}</span>}
                    {valor}
                    <span className="h-arquivos"><CirclePlus strokeWidth={2.4} />Arraste e solte os arquivos aqui ou <u>selecione-os</u></span>
                </div>
            );
        case 'botoes':
            return (
                <div className={`h-linha cheia risco ${className}`} style={style}>
                    {Object.entries(BOTOES).map(([id, { texto, ...pos }]) => (
                        <span key={id} className={`h-btn ${id}${aperta && id === 'criar' ? ' anima-aperta' : ''}`} style={{ left: pct(pos[k][0]), width: pct(pos[k][1]) }}>
                            {texto}
                        </span>
                    ))}
                </div>
            );
        case 'rodape':
            return (
                <div className={`h-linha cheia ${className}`} style={style}>
                    <span className="h-rodape">Copyright © 2026 CSC - SMREDE - All rights reserved.</span>
                </div>
            );
        default:
            return (
                <div className={classe} style={style}>
                    <Rotulo l={l} />
                    {l.dica && <span className="h-dica">{l.dica}</span>}
                    <Campo l={l} valor={valor} cel={cel} />
                </div>
            );
    }
}

/**
 * Passos 1 e 2, iguais em todo tópico: abrir o formulário e escolher o tópico.
 * listaTopicos: a lista aberta no vídeo, com o próprio tópico; null vira barra cinza.
 */
export function passosIniciais({ TelaCsc, ListaCsc, alvo }, topico, listaTopicos) {
    if (!listaTopicos.includes(topico)) throw new Error(`listaTopicos precisa ter "${topico}"`);
    const opcoes = [VAZIO_TOPICO, ...listaTopicos];
    return [
        {
            acao: 'No Suporte CSC, clique em “Abrir Novo Ticket”.',
            expl: (
                <>
                    Acesse o sistema <a href={LINK_CSC} target="_blank" rel="noopener noreferrer">Suporte CSC</a> e
                    entre com o seu e-mail e senha. A opção fica no menu, abaixo da logo.
                </>
            ),
            ...ambos((cel) => (
                <Video cel={cel} de={['50%', '80%']} para={alvo('novo', 0, cel)}>
                    <Tela fase="antes"><TelaCsc cel={cel} inicio ativo="principal" /></Tela>
                    <Tela fase="depois"><TelaCsc cel={cel} ocultaApos="topico" /></Tela>
                </Video>
            )),
        },
        {
            acao: `Em “Tópico de ajuda”, escolha “${topico}”.`,
            expl: 'Ao selecionar este tópico, os campos da solicitação serão exibidos logo abaixo.',
            ...ambos((cel) => (
                <Video cel={cel} para={alvo('topico', 0, cel)}>
                    <TelaCsc cel={cel} revelaApos="topico" anima={{ topico: <Escolhe de={VAZIO_TOPICO}>{topico}</Escolhe> }} />
                    <ListaCsc cel={cel} rolar={0} de="topico" opcoes={opcoes} on={opcoes.indexOf(topico)} />
                </Video>
            )),
        },
    ];
}

const CABECALHO = INICIO_FORMULARIO.slice(0, 2);

// Logo, usuário e menu, para as telas do Suporte CSC que não são o formulário.
export function CabecalhoCsc({ cel, ativo, qtdTickets }) {
    return empilhar(CABECALHO, cel).map((l) => <Linha key={l.id} l={l} cel={cel} ativo={ativo} qtdTickets={qtdTickets} />);
}

export const alvoMenu = (id, cel) => formularioCsc(CABECALHO, {}).alvo(id, 0, cel);

function empilhar(linhas, cel) {
    let topo = 0;
    return linhas.map((l) => {
        const h = cel && l.hCel ? l.hCel : l.h;
        const linha = { ...l, top: topo, h };
        topo += h;
        return linha;
    });
}

/**
 * Monta as telas de um tópico a partir das suas linhas e dos valores do exemplo preenchido.
 * Devolve TelaCsc e ListaCsc para as cenas, e rolagem/alvo/caixaLinha para posicionar a setinha.
 */
export function formularioCsc(linhas, valores) {
    const PILHA = { pc: empilhar(linhas, false), cel: empilhar(linhas, true) };
    const achar = (id, cel) => PILHA[chave(cel)].find((l) => l.id === id);

    function centro(id, rolar, cel) {
        const k = chave(cel);
        if (NAV[id]) {
            const l = achar('nav', cel);
            const [left, larg] = NAV[id][k];
            return { x: left + larg / 2, y: l.top - rolar + l.h / 2 };
        }
        if (BOTOES[id]) {
            const l = achar('botoes', cel);
            const [left, larg] = BOTOES[id][k];
            return { x: left + larg / 2, y: l.top - rolar + EM[k] * (RISCO + 1.4) };
        }
        const l = achar(id, cel);
        const y = l.top - rolar + EM[k] * (inicioCampo(l, cel) + alturaCampo(l, cel) / 2);
        // Em anexos, o clique é no link "selecione-os", no fim da frase.
        if (l.alvoX) return { x: porTela(l.alvoX, cel), y };
        const larg = l.tipo === 'caixa' ? 1 : porTela(l.larg, cel);
        return { x: X0[k] + Math.min(larg, 40) / 2, y };
    }

    function valorPadrao(l, preenchido) {
        if (!preenchido) return undefined;
        const v = valores[l.id];
        if (l.tipo === 'arquivos') return v && <Anexados itens={v} />;
        return Array.isArray(v) ? <Chips itens={v} /> : v;
    }

    return {
        // Rolagem que deixa a linha `id` a `y`% do topo da cena.
        rolagem: (id, y, cel) => achar(id, cel).top - y,

        // Centro do campo da linha (ou do item do menu / botão), em % da cena.
        alvo(id, rolar, cel) {
            const { x, y } = centro(id, rolar, cel);
            return pontoCena(x, y, cel);
        },

        // Moldura da linha inteira, para marcar um texto (ex.: o título padrão).
        caixaLinha(id, rolar, cel) {
            const k = chave(cel);
            const l = achar(id, cel);
            return { left: pct(X0[k] - 1), top: pct(l.top - rolar), width: pct(LARGURA_LINHA[k] + 2), height: pct(l.h - 1) };
        },

        // Lista aberta abaixo do campo; opção null vira barra cinza (opção que não importa).
        ListaCsc({ de, opcoes, on, rolar, cel }) {
            const k = chave(cel);
            const l = achar(de, cel);
            const top = l.top - rolar + EM[k] * (inicioCampo(l, cel) + ALTURA_CAMPO.select);
            return (
                <div
                    className="h-opcoes surge breve"
                    style={{ top: pct(top), left: pct(X0[k]), minWidth: `${porTela(l.larg, cel)}cqw` }}
                >
                    {opcoes.map((texto, i) => (
                        <div key={i} className={i === on ? 'on' : undefined}>{texto ?? <span className="h-barra" />}</div>
                    ))}
                </div>
            );
        },

        // Formulário rolado até `rolar` (% da cena), preenchido até a linha `ate`; `anima` troca
        // valores por versões animadas e `ocultaApos`/`revelaApos` tratam o tópico ainda vazio.
        TelaCsc({ cel, rolar = 0, ate, anima = {}, ocultaApos, revelaApos, ativo = 'novo', inicio, aperta }) {
            const pilha = PILHA[chave(cel)];
            const fimPreenchido = ate ? pilha.findIndex((l) => l.id === ate) : -1;
            const corte = ocultaApos || revelaApos;
            const iCorte = corte ? pilha.findIndex((l) => l.id === corte) : Infinity;
            const rodape = achar('rodape', cel);
            const visiveis = inicio ? pilha.filter((l) => l.id === 'topo' || l.id === 'nav') : pilha;

            return (
                <div className={cel ? 'h-tela cel' : 'h-tela'}>
                    <div className="h-folha" style={{ top: pct(-rolar), height: pct(inicio ? 100 : rodape.top) }} />
                    <div className="h-pilha" style={{ top: pct(-rolar) }}>
                        {visiveis.map((l, i) => {
                            const depoisDoCorte = i > iCorte && l.id !== 'rodape';
                            if (depoisDoCorte && ocultaApos) return null;
                            const valor = anima[l.id] ?? valorPadrao(l, i <= fimPreenchido);
                            return (
                                <Linha key={l.id} l={l} valor={valor} cel={cel} ativo={ativo} aperta={aperta} className={depoisDoCorte ? 'h-revela' : ''} />
                            );
                        })}
                        {inicio && (
                            <div className="h-linha h-inicio" style={{ top: pct(achar('pagina', cel).top), height: '60%' }}>
                                <i style={{ width: '45%' }} /><i /><i /><i style={{ width: '70%' }} />
                                <span className="h-bloco" /><span className="h-bloco" />
                            </div>
                        )}
                    </div>
                </div>
            );
        },
    };
}
