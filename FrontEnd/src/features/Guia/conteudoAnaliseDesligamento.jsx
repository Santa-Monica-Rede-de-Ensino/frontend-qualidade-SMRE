import React from 'react';
import { FileExclamationPoint } from 'lucide-react';
import { Digita } from './telasTermo';
import {
    INICIO_FORMULARIO, FIM_FORMULARIO, formularioCsc, passosIniciais, ambos, Video, surgeTarde, Escolhe,
    Anexados, TOPICO_DESLIGAMENTO, TOPICO_ANALISE,
} from './telasHelpdesk';

const MOTIVOS = ['— Selecionar —', 'Baixo desempenho', 'Condutas graves', 'Falta de comprometimento',
    'Incompatibilidade com a função', 'Questões comportamentais', 'Outros'];

const LINHAS = [
    ...INICIO_FORMULARIO,
    { id: 'analise', tipo: 'h3', h: 7, risco: true, texto: 'G&G - Analise Desligamento' },
    { id: 'unidade', tipo: 'select', h: 8, rotulo: 'Unidade', obrig: true, larg: [25, 60] },
    { id: 'nome', tipo: 'campo', h: 8, rotulo: 'Nome completo do Colaborador', obrig: true, larg: [19, 50] },
    { id: 'cargo', tipo: 'campo', h: 8, rotulo: 'Cargo', obrig: true, larg: [19, 50] },
    { id: 'motivo', tipo: 'select', h: 8, rotulo: 'Motivo do desligamento', obrig: true, larg: [27, 66] },
    { id: 'evidencias', tipo: 'arquivos', h: 11, rotulo: 'Registros, advertências e demais evidências', alvoX: [28, 64], linhasAcima: 2 },
    {
        id: 'justificativa', tipo: 'area', h: 18, hCel: 31, rotulo: 'Justifique a solicitação de desligamento', obrig: true,
        larg: [83, 92], altura: [5, 9], dicaLinhas: [2, 4],
        dica: 'Orientação: Descreva os fatos de forma objetiva, informando ocorrências relevantes, datas, feedbacks '
            + 'realizados, plano de ação aplicado e demais evidências que fundamentem a solicitação.',
    },
    { id: 'reposicao', tipo: 'select', h: 8, rotulo: 'Haverá necessidade de reposição da vaga?:', obrig: true, larg: [16, 42] },
    ...FIM_FORMULARIO,
];

const V = {
    topico: TOPICO_ANALISE,
    titulo: '[ BT ] - INSPETOR',
    unidade: 'UND. Barra da Tijuca',
    nome: 'FULANO DE TAL',
    cargo: 'INSPETOR',
    motivo: 'Condutas graves',
    evidencias: [['ADVERTÊNCIA 17.08.2026.pdf', '15.2kB'], ['ADVERTÊNCIA 14.04.2026.pdf', '15.2kB']],
    justificativa: 'Devido ao histórico de duas advertências aplicadas e após alinhamento com a Supervisão '
        + 'Pedagógica da Unidade, optamos pelo desligamento do colaborador, uma vez que não houve melhoria em sua '
        + 'conduta no relacionamento com os alunos e colegas de trabalho.',
    reposicao: 'SIM',
};

const FORM = formularioCsc(LINHAS, V);
const { TelaCsc, ListaCsc, alvo, rolagem } = FORM;

export const TEMA_ANALISE_DESLIGAMENTO = {
    id: 'helpdesk-analise-desligamento',
    titulo: 'Análise de Desligamento',
    sub: 'Como abrir o ticket de análise de desligamento no Suporte CSC.',
    qtd: '9 passos',
    Icone: FileExclamationPoint,
    grupos: [{
        passos: [
            ...passosIniciais(FORM, TOPICO_ANALISE, [null, TOPICO_ANALISE, TOPICO_DESLIGAMENTO, null, null]),
            {
                acao: 'Preencha o título conforme o padrão indicado.',
                expl: `Informe a sigla da unidade entre colchetes e o cargo do colaborador. Exemplo: ${V.titulo}.`,
                ...ambos((cel) => {
                    const rolar = rolagem('solicitacao', 6, cel);
                    return (
                        <Video cel={cel} para={alvo('titulo', rolar, cel)}>
                            <TelaCsc cel={cel} rolar={rolar} ate="topico" anima={{ titulo: <Digita n={V.titulo.length}>{V.titulo}</Digita> }} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Informe a unidade, o nome completo e o cargo do colaborador.',
                expl: 'Escreva o nome completo, sem abreviações.',
                ...ambos((cel) => {
                    const rolar = rolagem('analise', 4, cel);
                    return (
                        <Video cel={cel} para={alvo('unidade', rolar, cel)}>
                            <TelaCsc
                                cel={cel}
                                rolar={rolar}
                                ate="titulo"
                                anima={{
                                    unidade: <Escolhe>{V.unidade}</Escolhe>,
                                    nome: <Digita n={V.nome.length} tarde>{V.nome}</Digita>,
                                    cargo: <Digita n={V.cargo.length} tarde>{V.cargo}</Digita>,
                                }}
                            />
                            <ListaCsc
                                cel={cel}
                                rolar={rolar}
                                de="unidade"
                                opcoes={['— Selecionar —', 'CSC - TI', 'DGP', 'Jurídico', 'Tesouraria Central', V.unidade, 'UND. Bento Ribeiro', 'UND. Campo Grande']}
                                on={5}
                            />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Escolha o motivo do desligamento.',
                expl: 'Selecione a opção que melhor descreve a situação.',
                ...ambos((cel) => {
                    const rolar = rolagem('analise', 4, cel);
                    return (
                        <Video cel={cel} para={alvo('motivo', rolar, cel)}>
                            <TelaCsc cel={cel} rolar={rolar} ate="cargo" anima={{ motivo: <Escolhe>{V.motivo}</Escolhe> }} />
                            <ListaCsc cel={cel} rolar={rolar} de="motivo" opcoes={MOTIVOS} on={MOTIVOS.indexOf(V.motivo)} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Anexe os registros, advertências e demais evidências.',
                expl: 'Clique em “selecione-os” ou arraste os arquivos para o campo. Você pode anexar mais de um arquivo.',
                ...ambos((cel) => {
                    const rolar = rolagem('cargo', 4, cel);
                    return (
                        <Video cel={cel} para={alvo('evidencias', rolar, cel)}>
                            <TelaCsc cel={cel} rolar={rolar} ate="motivo" anima={{ evidencias: <Anexados itens={V.evidencias} className="surge tarde" /> }} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Justifique a solicitação de desligamento.',
                expl: 'Siga a orientação do campo: descreva os fatos de forma objetiva, com datas, feedbacks realizados e o plano de ação aplicado.',
                ...ambos((cel) => {
                    const rolar = rolagem('motivo', 4, cel);
                    return (
                        <Video cel={cel} para={alvo('justificativa', rolar, cel)}>
                            <TelaCsc cel={cel} rolar={rolar} ate="evidencias" anima={{ justificativa: surgeTarde(V.justificativa) }} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Informe se haverá reposição da vaga.',
                expl: 'Escolha “SIM” ou “NÃO”.',
                ...ambos((cel) => {
                    const rolar = rolagem('justificativa', 6, cel);
                    return (
                        <Video cel={cel} para={alvo('reposicao', rolar, cel)}>
                            <TelaCsc cel={cel} rolar={rolar} ate="justificativa" anima={{ reposicao: <Escolhe>{V.reposicao}</Escolhe> }} />
                            <ListaCsc cel={cel} rolar={rolar} de="reposicao" opcoes={['— Selecionar —', 'SIM', 'NÃO']} on={1} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Para concluir a solicitação, clique no botão “Criar Ticket”.',
                expl: 'Pronto! Sua solicitação foi criada. Para acompanhar o andamento, acesse o menu “Tickets” no sistema Suporte CSC.',
                ...ambos((cel) => {
                    const rolar = rolagem('botoes', 70, cel);
                    return (
                        <Video cel={cel} de={['60%', '30%']} para={alvo('criar', rolar, cel)}>
                            <TelaCsc cel={cel} rolar={rolar} ate="reposicao" aperta />
                        </Video>
                    );
                }),
            },
        ],
    }],
};
