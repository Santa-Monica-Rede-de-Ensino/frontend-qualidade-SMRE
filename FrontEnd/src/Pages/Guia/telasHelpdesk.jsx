// Telas simuladas do CSC (osTicket) para o tutorial do ticket de Desligamento e Contratação.
// Leozinho, colaborador desligado e valores preenchidos são fictícios.
import React from 'react';
import { House, FilePlus, FileText, CirclePlus, ChevronDown } from 'lucide-react';
import LogoCsc from '../../img/Portal_Func/csc-logo.png';
import './telasHelpdesk.css';

export const TOPICO = 'G&G - Desligamento e Contratação';
const NOTA_REQUISICAO = "Preencha com 'Não aplicável' quando a reposição da vaga não atender ao requisito.";

// O formulário é uma pilha de linhas: h = altura em % da cena (hCel quando o texto quebra no
// celular) e larg = largura do campo em % da cena [computador, celular]. A rolagem só desloca a pilha.
const LINHAS = [
    { id: 'topo', tipo: 'topo', h: 13, hCel: 9 },
    { id: 'nav', tipo: 'nav', h: 7, hCel: 6 },
    { id: 'pagina', tipo: 'h1', h: 7, texto: 'Abrir Novo Ticket' },
    { id: 'intro', tipo: 'texto', h: 6, hCel: 8, texto: 'Por favor, preencha o formulário abaixo para abrir um novo ticket.' },
    { id: 'cliente', tipo: 'cliente', h: 9, risco: true },
    { id: 'topico', tipo: 'select', h: 10, risco: true, rotulo: 'Tópico de ajuda', obrigDepois: true, larg: [31, 86], vazio: '— Selecione um Tópico de Ajuda —' },
    { id: 'solicitacao', tipo: 'h3', h: 9, risco: true, texto: 'Solicitação' },
    { id: 'titulo', tipo: 'campo', h: 8, rotulo: 'Título', obrig: true, larg: [40, 92] },
    { id: 'desligamento', tipo: 'h3', h: 6.5, risco: true, texto: 'G&G - Desligamento' },
    { id: 'padrao', tipo: 'texto', h: 6, hCel: 8.5, texto: 'Título padrão: [ SIGLA DA UND ] - [ MODALIDADE DO DESLIGAMENTO ] - CARGO' },
    { id: 'unidade', tipo: 'select', h: 8, rotulo: 'Unidade', obrig: true, larg: [25, 60] },
    { id: 'nome', tipo: 'area', h: 13, rotulo: 'Nome completo do Colaborador', obrig: true, larg: [83, 92] },
    { id: 'cargo', tipo: 'campo', h: 8, rotulo: 'Cargo', obrig: true, larg: [19, 50] },
    { id: 'iniciativa', tipo: 'select', h: 8, rotulo: 'Iniciativa', obrig: true, larg: [16, 42] },
    { id: 'motivo', tipo: 'select', h: 8, rotulo: 'Motivo de Desligamento', obrig: true, larg: [27, 66] },
    { id: 'aviso', tipo: 'select', h: 8, rotulo: 'Aviso prévio', obrig: true, larg: [16, 42] },
    { id: 'cipa', tipo: 'caixa', h: 7, rotulo: 'CIPA' },
    { id: 'reposicao', tipo: 'select', h: 8, rotulo: 'Haverá necessidade de reposição da vaga?', obrig: true, larg: [16, 42] },
    { id: 'anexos', tipo: 'arquivos', h: 7.5, rotulo: 'Anexos' },
    { id: 'requisicao', tipo: 'h3', h: 6.5, risco: true, texto: 'G&G - Requisição de Pessoal' },
    { id: 'notaRequisicao', tipo: 'texto', h: 6, hCel: 8.5, texto: NOTA_REQUISICAO },
    { id: 'tipoVaga', tipo: 'select', h: 8, rotulo: 'Tipo de Vaga', obrig: true, larg: [16, 42] },
    { id: 'contratacao', tipo: 'select', h: 8, rotulo: 'Tipo de Contratação', obrig: true, larg: [16, 42] },
    { id: 'indicacao', tipo: 'select', h: 8, rotulo: 'Indicação', larg: [35, 86] },
    { id: 'extras', tipo: 'arquivos', h: 11, hCel: 12, rotulo: 'Arquivos Extras', dica: 'Em caso de indicação, anexe o currículo aqui.' },
    { id: 'cargoVaga', tipo: 'campo', h: 8, rotulo: 'Cargo', obrig: true, larg: [19, 50] },
    { id: 'horario', tipo: 'campo', h: 11.5, hCel: 14, rotulo: 'Horário', obrig: true, larg: [19, 50], dica: 'Informe o horário de trabalho esperado. Exemplo: 8:00 às 18:00h' },
    { id: 'professor', tipo: 'h3', h: 6.5, hCel: 10, risco: true, texto: 'G&G - Requisição de Pessoal - Professor e Monitor de Disciplina' },
    { id: 'notaProfessor', tipo: 'texto', h: 6, hCel: 8.5, texto: NOTA_REQUISICAO },
    { id: 'dias', tipo: 'multi', h: 9, rotulo: 'Dias da Semana', obrig: true, larg: [44, 92] },
    { id: 'turno', tipo: 'campo', h: 11.5, hCel: 14, rotulo: 'Horário / Turno', obrig: true, larg: [19, 50], dica: 'Informe o horário de trabalho esperado. Exemplo: 8:00 às 8:50h' },
    { id: 'tempos', tipo: 'campo', h: 8, rotulo: 'Qtd de Tempos', obrig: true, larg: [19, 50] },
    { id: 'turmas', tipo: 'campo', h: 8, rotulo: 'Turmas', obrig: true, larg: [19, 50] },
    { id: 'segmento', tipo: 'multi', h: 9, rotulo: 'Segmento', obrig: true, larg: [44, 92] },
    { id: 'disciplina', tipo: 'campo', h: 8, rotulo: 'Disciplina', obrig: true, larg: [19, 50] },
    { id: 'botoes', tipo: 'botoes', h: 9, risco: true },
    { id: 'rodape', tipo: 'rodape', h: 6 },
];

export const VALORES = {
    topico: TOPICO,
    titulo: 'CG - DEMISSÃO VOLUNTÁRIA - PROFESSOR',
    unidade: 'UND. Campo Grande',
    nome: 'João Exemplo da Silva',
    cargo: 'Professor',
    iniciativa: 'Funcionário',
    motivo: 'Baixo desempenho',
    aviso: 'Trabalhado',
    reposicao: 'SIM',
    tipoVaga: 'Efetiva',
    contratacao: 'CLT',
    indicacao: 'NÃO - Processo Seletivo Normal',
    cargoVaga: 'Professor',
    horario: '7:00 às 12:20h',
    dias: ['Segunda-feira', 'Quarta-feira'],
    turno: '7:00 às 12:20h',
    tempos: '6',
    turmas: '6º ano A e 6º ano B',
    segmento: ['Fundamental II'],
    disciplina: 'Matemática',
};

// Itens do menu e botões com posição fixa (% da cena) para a setinha saber onde clicar.
const NAV = {
    principal: { pc: [10.5, 12.5], cel: [5, 27], texto: 'Página Principal', Icone: House },
    novo: { pc: [24, 13.5], cel: [34, 29], texto: 'Abrir Novo Ticket', Icone: FilePlus },
    tickets: { pc: [38.5, 9.5], cel: [66, 22], texto: 'Tickets (3)', Icone: FileText },
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
const DICA = 1.9;
const ALTURA_CAMPO = { select: 1.8, campo: 1.8, area: 4.5, multi: 2, caixa: 0.9 };

function empilhar(cel) {
    let topo = 0;
    return LINHAS.map((l) => {
        const h = cel && l.hCel ? l.hCel : l.h;
        const linha = { ...l, top: topo, h };
        topo += h;
        return linha;
    });
}
const PILHA = { pc: empilhar(false), cel: empilhar(true) };
const chave = (cel) => (cel ? 'cel' : 'pc');
const achar = (id, cel) => PILHA[chave(cel)].find((l) => l.id === id);
const pct = (n) => `${n}%`;

// Topo do campo dentro da linha, em em.
const inicioCampo = (l) => (l.risco ? RISCO : 0) + ROTULO + (l.dica ? DICA : 0);

// Rolagem que deixa a linha `id` a `y`% do topo da cena.
export function rolagem(id, y, cel) {
    return achar(id, cel).top - y;
}

// A animação do dedo troca o translate(-50%) por scale, então o canto dele fica no alvo:
// recuamos meio dedo (2.2em de 5cqw) para o centro cair no campo.
const MEIO_DEDO = { x: 5.5, y: 3.1 };

// Centro do campo da linha (ou do item do menu / botão), em % da cena.
export function alvo(id, rolar, cel) {
    const { x, y } = centro(id, rolar, cel);
    return cel ? { x: pct(x - MEIO_DEDO.x), y: pct(y - MEIO_DEDO.y) } : { x: pct(x), y: pct(y) };
}

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
    const meio = inicioCampo(l) + ALTURA_CAMPO[l.tipo] / 2;
    const larg = l.tipo === 'caixa' ? 1 : l.larg[cel ? 1 : 0];
    return { x: X0[k] + Math.min(larg, 40) / 2, y: l.top - rolar + EM[k] * meio };
}

// Moldura da linha inteira, para marcar um texto (ex.: o título padrão).
export function caixaLinha(id, rolar, cel) {
    const k = chave(cel);
    const l = achar(id, cel);
    return { left: pct(X0[k] - 1), top: pct(l.top - rolar), width: pct(LARGURA_LINHA[k] + 2), height: pct(l.h - 1) };
}

// Valor de lista que troca do vazio para o escolhido quando a lista do vídeo fecha.
export function Escolhe({ de = '— Selecionar —', children }) {
    return (
        <span className="h-troca">
            <span className="sai">{de}</span>
            <span className="entra">{children}</span>
        </span>
    );
}

const Rotulo = ({ l }) => (
    <span className={l.obrig || l.obrigDepois ? 'h-rot obrig' : 'h-rot'}>{l.rotulo}{l.obrig && <i> *</i>}</span>
);

export const Chips = ({ itens }) => itens.map((item) => <span key={item} className="h-chip">× {item}</span>);

function Campo({ l, valor, cel }) {
    const width = l.larg && `${l.larg[cel ? 1 : 0]}cqw`;
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
            return <span className="h-campo h-area" style={{ width }}>{valor}</span>;
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

function Linha({ l, valor, cel, ativo, aperta, className = '' }) {
    const k = chave(cel);
    const classe = `h-linha${l.risco ? ' risco' : ''} ${className}`;
    const style = { top: pct(l.top), height: pct(l.h) };

    switch (l.tipo) {
        case 'topo':
            return (
                <div className={`${classe} h-topo`} style={style}>
                    <img className="h-logo" src={LogoCsc} alt="" />
                    <span className="h-usuario">
                        Leozinho Parente | <u>Perfil</u> | <u>Tickets <b>(3)</b></u> -<br /><u>Registrar Saída</u>
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
                            <Icone strokeWidth={1.8} />{texto}
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

function valorPadrao(id, preenchido) {
    if (!preenchido) return undefined;
    const v = VALORES[id];
    return Array.isArray(v) ? <Chips itens={v} /> : v;
}

// Lista aberta logo abaixo do campo; opção null vira uma barra cinza (opções que não importam).
export function ListaCsc({ de, opcoes, on, rolar, cel }) {
    const k = chave(cel);
    const l = achar(de, cel);
    const top = l.top - rolar + EM[k] * (inicioCampo(l) + ALTURA_CAMPO.select);
    return (
        <div
            className="h-opcoes surge breve"
            style={{ top: pct(top), left: pct(X0[k]), minWidth: `${l.larg[cel ? 1 : 0]}cqw` }}
        >
            {opcoes.map((texto, i) => (
                <div key={i} className={i === on ? 'on' : undefined}>{texto ?? <span className="h-barra" />}</div>
            ))}
        </div>
    );
}

/**
 * Formulário do CSC rolado até `rolar` (% da cena).
 * ate: última linha já preenchida; anima: valores animados por linha (sobrepõem os preenchidos);
 * ocultaApos / revelaApos: esconde ou faz surgir as linhas depois desse id (antes de escolher o tópico).
 * inicio: só cabeçalho e menu (Página Principal); aperta: anima o clique em "Criar Ticket".
 */
export function TelaCsc({ cel, rolar = 0, ate, anima = {}, ocultaApos, revelaApos, ativo = 'novo', inicio, aperta }) {
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
                    const valor = anima[l.id] ?? valorPadrao(l.id, i <= fimPreenchido);
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
}
