import React from 'react';
import { Ticket } from 'lucide-react';
import { Digita } from './telasTermo';
import {
    INICIO_FORMULARIO, FIM_FORMULARIO, formularioCsc, passosIniciais, ambos, Video, surgeTarde, Escolhe, Chips,
    TOPICO_DESLIGAMENTO,
} from './telasHelpdesk';
const NOTA_REQUISICAO = "Preencha com 'Não aplicável' quando a reposição da vaga não atender ao requisito.";

const LINHAS = [
    ...INICIO_FORMULARIO,
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
    ...FIM_FORMULARIO,
];

const V = {
    topico: TOPICO_DESLIGAMENTO,
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

const FORM = formularioCsc(LINHAS, V);
const { TelaCsc, ListaCsc, alvo, rolagem, caixaLinha } = FORM;

export const TEMA_HELPDESK = {
    id: 'helpdesk-desligamento',
    titulo: 'Desligamento e Contratação',
    sub: 'Como abrir o ticket de desligamento e contratação no Suporte CSC.',
    qtd: '8 passos',
    Icone: Ticket,
    grupos: [{
        passos: [
            ...passosIniciais(FORM, TOPICO_DESLIGAMENTO, [null, null, TOPICO_DESLIGAMENTO, null, null]),
            {
                acao: 'Preencha o título conforme o padrão indicado.',
                expl: (
                    <>
                        Informe a sigla da unidade, a modalidade do desligamento e o cargo, seguindo o padrão apresentado no
                        vídeo.<br />
                        Observação: Para a modalidade do desligamento, selecione uma das seguintes opções: Demissão
                        Involuntária, Demissão Voluntária ou Experiência (45 ou 90 dias).
                    </>
                ),
                ...ambos((cel) => {
                    const rolar = rolagem('solicitacao', 6, cel);
                    return (
                        <Video cel={cel} para={alvo('titulo', rolar, cel)}>
                            <TelaCsc cel={cel} rolar={rolar} ate="topico" anima={{ titulo: <Digita n={V.titulo.length}>{V.titulo}</Digita> }} />
                            <div className="anima-marca" style={caixaLinha('padrao', rolar, cel)} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Informe a unidade, o nome completo e o cargo do colaborador.',
                expl: 'Escreva o nome completo, sem abreviações.',
                ...ambos((cel) => {
                    const rolar = rolagem('desligamento', 4, cel);
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
                                opcoes={['— Selecionar —', 'CSC - TI', 'DGP', 'Jurídico', 'Tesouraria Central', 'UND. Barra da Tijuca', 'UND. Bento Ribeiro', V.unidade, 'UND. Cascadura']}
                                on={7}
                            />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Escolha a iniciativa, o motivo do desligamento e o aviso prévio.',
                expl: 'Caso o colaborador faça parte da CIPA, marque a opção “CIPA”.',
                ...ambos((cel) => {
                    const rolar = rolagem('cargo', 4, cel);
                    return (
                        <Video cel={cel} para={alvo('iniciativa', rolar, cel)}>
                            <TelaCsc
                                cel={cel}
                                rolar={rolar}
                                ate="cargo"
                                anima={{
                                    iniciativa: <Escolhe>{V.iniciativa}</Escolhe>,
                                    motivo: <Escolhe>{V.motivo}</Escolhe>,
                                    aviso: <Escolhe>{V.aviso}</Escolhe>,
                                }}
                            />
                            <ListaCsc cel={cel} rolar={rolar} de="iniciativa" opcoes={['— Selecionar —', 'Empresa', 'Funcionário']} on={2} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Informe se haverá reposição da vaga.',
                expl: 'Se escolher a opção “SIM”, você deverá preencher os dados nos formulários de Requisição. Caso escolha a opção “NÃO”, os campos também deverão ser preenchidos, utilizando “N/A” ou “Não aplicável”',
                ...ambos((cel) => {
                    const rolar = rolagem('reposicao', 6, cel);
                    return (
                        <Video cel={cel} para={alvo('reposicao', rolar, cel)}>
                            <TelaCsc
                                cel={cel}
                                rolar={rolar}
                                ate="cipa"
                                anima={{
                                    reposicao: <Escolhe>{V.reposicao}</Escolhe>,
                                    tipoVaga: <Escolhe>{V.tipoVaga}</Escolhe>,
                                    contratacao: <Escolhe>{V.contratacao}</Escolhe>,
                                    indicacao: <Escolhe>{V.indicacao}</Escolhe>,
                                    cargoVaga: surgeTarde(V.cargoVaga),
                                    horario: surgeTarde(V.horario),
                                }}
                            />
                            <ListaCsc cel={cel} rolar={rolar} de="reposicao" opcoes={['— Selecionar —', 'SIM', 'NÃO']} on={1} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Vaga de Professor ou Monitor? Preencha também os dados solicitados no segundo formulário de Requisição.',
                expl: 'Preencha todos os campos do formulário de Requisição de Pessoal – Professor e Monitor de Disciplina. Todos os campos são obrigatórios.',
                ...ambos((cel) => {
                    const rolar = rolagem('professor', 4, cel);
                    return (
                        <Video cel={cel} para={alvo('dias', rolar, cel)}>
                            <TelaCsc
                                cel={cel}
                                rolar={rolar}
                                ate="horario"
                                anima={{
                                    dias: surgeTarde(<Chips itens={V.dias} />),
                                    turno: <Digita n={V.turno.length} tarde>{V.turno}</Digita>,
                                    tempos: <Digita n={V.tempos.length} tarde>{V.tempos}</Digita>,
                                    turmas: <Digita n={V.turmas.length} tarde>{V.turmas}</Digita>,
                                    segmento: surgeTarde(<Chips itens={V.segmento} />),
                                    disciplina: <Digita n={V.disciplina.length} tarde>{V.disciplina}</Digita>,
                                }}
                            />
                            <ListaCsc
                                cel={cel}
                                rolar={rolar}
                                de="dias"
                                opcoes={['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']}
                                on={2}
                            />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Para concluir a solicitação, clique no botão “Criar Ticket”.',
                expl: 'Pronto! Sua solicitação foi criada. Para acompanhar o andamento, acesse o menu “Tickets” no sistema Suporte CSC.',
                ...ambos((cel) => {
                    const rolar = rolagem('botoes', 78, cel);
                    return (
                        <Video cel={cel} de={['60%', '30%']} para={alvo('criar', rolar, cel)}>
                            <TelaCsc cel={cel} rolar={rolar} ate="disciplina" aperta />
                        </Video>
                    );
                }),
            },
        ],
    }],
};
