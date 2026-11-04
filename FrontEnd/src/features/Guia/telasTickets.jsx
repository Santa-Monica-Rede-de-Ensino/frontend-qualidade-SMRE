// Tela "Tickets" do Suporte CSC (osTicket): lista de tickets com o filtro por Tópico de ajuda.
import React from 'react';
import { ChevronDown, CircleX, FileText, RefreshCw } from 'lucide-react';
import { CabecalhoCsc, pontoCena } from './telasHelpdesk';
import './telasHelpdesk.css';

export const TODOS_TOPICOS = '— Todos os tópicos de ajuda —';

// Blocos em % da cena: [top, left, largura, altura]. 1em = EM% da altura da cena
// (.42em no computador e .62em no celular, as mesmas medidas do formulário).
const EM = { pc: 1.68, cel: 1.74 };
const POS = {
    pc: {
        filtro: [21, 8.5, 83, 11.5],
        busca: [22.8, 10, 26],
        pesquisar: [22.8, 36.8, 8],
        rotulo: [22.8, 46, 17],
        topico: [22.8, 63.5, 26.5],
        limpar: [27.8, 10],
        titulo: [35, 8.5],
        contagem: [35, 74.5, 17],
        tabela: [42, 8.5, 83],
    },
    cel: {
        filtro: [16, 3, 94, 17.5],
        busca: [17.5, 5, 60],
        pesquisar: [17.5, 67, 28],
        rotulo: [22.8, 5, 30],
        topico: [22.8, 36, 59],
        limpar: [28.6, 5],
        titulo: [35, 4],
        contagem: [35, 46, 50],
        tabela: [42, 3, 94],
    },
};
const ALTURA_SELECT = 1.8;
const ALTURA_OPCAO = 1.7;
const ALTURA_CONTAGEM = 2.4;

const chave = (cel) => (cel ? 'cel' : 'pc');
const pct = (n) => `${n}%`;
const lugar = ([top, left, width, height]) => ({
    top: pct(top), left: pct(left), width: width && pct(width), height: height && pct(height),
});

const topoLista = (cel) => POS[chave(cel)].topico[0] + EM[chave(cel)] * ALTURA_SELECT;

// Centro do campo "Tópico de ajuda".
export function alvoTopico(cel) {
    const k = chave(cel);
    const [top, left, larg] = POS[k].topico;
    return pontoCena(left + larg / 2, top + (EM[k] * ALTURA_SELECT) / 2, cel);
}

// Opção `i` da lista de tópicos aberta.
export function alvoOpcao(i, cel) {
    const k = chave(cel);
    return pontoCena(POS[k].topico[1] + 14, topoLista(cel) + EM[k] * ALTURA_OPCAO * (i + 0.5), cel);
}

// Moldura em volta de "Aberto (n) | Encerrado (n)" e o ponto no meio dela.
export function caixaContagem(cel) {
    const k = chave(cel);
    const [top, left, larg] = POS[k].contagem;
    const alt = EM[k] * ALTURA_CONTAGEM;
    return { left: pct(left - 1), top: pct(top - 0.5), width: pct(larg + 2.5), height: pct(alt + 1) };
}

// Logo abaixo da moldura, para a setinha (ou o dedo) não cobrir os números.
export function alvoContagem(cel) {
    const k = chave(cel);
    const [top, left, larg] = POS[k].contagem;
    const abaixo = cel ? 5 : 1.5;
    return pontoCena(left + larg / 2, top + EM[k] * ALTURA_CONTAGEM + abaixo, cel);
}

export function ListaTopicos({ cel, opcoes, on, fixa }) {
    const [, left, larg] = POS[chave(cel)].topico;
    return (
        <div
            className={fixa ? 'h-opcoes' : 'h-opcoes surge'}
            style={{ top: pct(topoLista(cel)), left: pct(left), minWidth: pct(larg) }}
        >
            {opcoes.map((texto, i) => <div key={texto} className={i === on ? 'on' : undefined}>{texto}</div>)}
        </div>
    );
}

function Tabela({ cel, lista }) {
    const colunas = cel
        ? [['Número', '22%'], ['Status', '30%'], ['Assunto', '48%']]
        : [['Número do ticket', '14%'], ['Data de Criação', '14%'], ['Status', '15%'], ['Assunto', '40%'], ['Departamento', '17%']];
    return (
        <table>
            <colgroup>{colunas.map(([nome, w]) => <col key={nome} style={{ width: w }} />)}</colgroup>
            <thead>
                <tr><th colSpan={colunas.length} className="hk-mostrando">Mostrando 1 - {lista.abertos} de {lista.abertos} Tickets Abertos</th></tr>
                <tr>{colunas.map(([nome]) => <th key={nome}>{nome}</th>)}</tr>
            </thead>
            <tbody>
                {lista.tickets.map(([numero, data, status, assunto, depto]) => (
                    <tr key={numero}>
                        <td><u className="hk-numero"><FileText strokeWidth={1.8} />{numero}</u></td>
                        {!cel && <td>{data}</td>}
                        <td>{status}</td>
                        <td className="hk-assunto"><u>{assunto}</u></td>
                        {!cel && <td>{depto}</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

/**
 * Tela do Suporte CSC: `inicio` mostra a Página Principal; senão, a lista de tickets filtrada
 * por `lista` ({ topico, abertos, encerrados, tickets: [número, data, status, assunto, depto] }).
 */
export function TelaTickets({ cel, inicio, lista, qtdTickets }) {
    const p = POS[chave(cel)];
    return (
        <div className={cel ? 'h-tela cel' : 'h-tela'}>
            <div className="h-folha" style={{ top: 0, height: '100%' }} />
            <CabecalhoCsc cel={cel} ativo={inicio ? 'principal' : 'tickets'} qtdTickets={qtdTickets} />
            {inicio ? (
                <div className="h-linha h-inicio" style={{ top: pct(p.filtro[0]), height: '60%' }}>
                    <i style={{ width: '45%' }} /><i /><i /><i style={{ width: '70%' }} />
                    <span className="h-bloco" /><span className="h-bloco" />
                </div>
            ) : (
                <>
                    <div className="hk-filtro" style={lugar(p.filtro)} />
                    <div className="hk-bloco hk-busca" style={lugar(p.busca)} />
                    <div className="hk-bloco hk-btn" style={lugar(p.pesquisar)}>Pesquisar</div>
                    <div className="hk-bloco hk-rotulo" style={lugar(p.rotulo)}>Tópico de ajuda:</div>
                    <div className="hk-bloco" style={lugar(p.topico)}>
                        <span className="h-sel"><span className="h-valor">{lista.topico}</span><ChevronDown strokeWidth={3} /></span>
                    </div>
                    <div className="hk-bloco hk-limpar" style={lugar(p.limpar)}><CircleX strokeWidth={2} />Limpar todos os filtros e classificar</div>
                    <div className="hk-bloco hk-titulo" style={lugar(p.titulo)}><RefreshCw strokeWidth={3} /><span>Tickets</span></div>
                    <div className="hk-bloco hk-contagem" style={lugar(p.contagem)}>
                        <u className="on"><FileText strokeWidth={2} />Aberto ({lista.abertos})</u>
                        <span className="hk-sep">|</span>
                        <u><FileText strokeWidth={2} />Encerrado ({lista.encerrados})</u>
                    </div>
                    <div className="hk-bloco hk-tabela" style={lugar(p.tabela)}><Tabela cel={cel} lista={lista} /></div>
                </>
            )}
        </div>
    );
}
