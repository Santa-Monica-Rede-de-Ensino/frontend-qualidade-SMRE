import React from 'react';
import { ListFilter } from 'lucide-react';
import { Tela, Destaque } from './MiniVideo';
import { LINK_CSC, ambos, Video, alvoMenu } from './telasHelpdesk';
import { TelaTickets, ListaTopicos, TODOS_TOPICOS, alvoTopico, alvoOpcao, alvoContagem, caixaContagem } from './telasTickets';

// Exemplo da Pamela (prints de 29/10): "TI - Sistemas" com 15 tickets, 6 abertos e 9 encerrados.
const QTD_TICKETS = 83;
const TOPICO = 'TI - Sistemas (15)';

const TOPICOS = [
    TODOS_TOPICOS, 'Compras - Produtos (7)', 'G&G - Agendamento Férias (1)', 'G&G - Análise de Desligamento (1)',
    'G&G - Desligamento e Contratação (8)', 'G&G – Requisição de Pessoal (2)', 'MKT - Comunicação Digital (1)',
    'TI - Acesso a Sistemas (1)', 'TI - Cabeamento de Redes (1)', 'TI - Manutenção (4)', 'TI - Problemas com o Ticket (11)',
    'TI - Redes e Servidores (3)', 'TI - Redes e Servidores / E-mail (3)', 'TI - Redes e Servidores / Internet (3)',
    TOPICO, 'TI - Telefonia (1)',
];

const TODOS = {
    topico: TODOS_TOPICOS,
    abertos: 17,
    encerrados: 66,
    tickets: [
        ['641108', '29/09/2026', 'Aguardando Aprovação', 'TESTE - DESLIG. & CONTRATAÇÃO', 'Gente e Gestão'],
        ['825064', '01/10/2026', 'Aberto', '[ CSC ] - [ G&G ] - TESTE', 'Gente e Gestão'],
        ['532523', '14/10/2026', 'Aberto', '[ NI ] - INSPETOR', 'Gente e Gestão'],
        ['413728', '21/10/2026', 'Aberto', '[ NI ] - [ VOLUNTARIA ] - ASG', 'Gente e Gestão'],
        ['836851', '22/10/2026', 'Em Andamento', '[ IG ] - [ VOLUNTARIA ] - ASG', 'Gente e Gestão'],
        ['360602', '24/06/2026', 'Aberto', '[DGP] - View do Alterdata', 'Infra'],
        ['901926', '16/01/2026', 'Aguardando Aprovação', '[CSC] - [G&G] - Criar novo tópico de ajuda G&G', 'Sistemas'],
        ['766213', '13/07/2026', 'Aguardando Aprovação', '[CSC] - [G&G] - Criação de Tópico de Ajuda', 'Sistemas'],
        ['419758', '16/07/2026', 'Aberto', '[CSC] - [G&G] - Manutenção Impressora CSC', 'Técnica'],
    ],
};

const SISTEMAS = {
    topico: TOPICO,
    abertos: 6,
    encerrados: 9,
    tickets: [
        ['991890', '29/10/2026', 'Aberto', '[ CSC ] - [ G&G ] Ajustes nos tópicos', 'Sistemas'],
        ['242999', '24/09/2026', 'Aberto', '[CSC] - [G&G] - Criação de FLAG (PRO Demissão)', 'Sistemas'],
        ['393894', '14/08/2026', 'Aberto', '[CSC] - [G&G] - Criação de Tópico de Ajuda "Meu RH"', 'Sistemas'],
        ['722182', '05/08/2026', 'Aguardando Aprovação', '[CSC] - [G&G] - Criação de Tópico de Ajuda "Desligamento"', 'Sistemas'],
        ['766213', '13/07/2026', 'Aguardando Aprovação', '[CSC] - [G&G] - Criação de Tópico de Ajuda', 'Sistemas'],
        ['901926', '16/01/2026', 'Aguardando Aprovação', '[CSC] - [G&G] - Criar novo tópico de ajuda G&G', 'Sistemas'],
    ],
};

export const TEMA_CONSULTA_TICKETS = {
    id: 'helpdesk-consulta-tickets',
    titulo: 'Consultar Tickets',
    sub: 'Como encontrar os seus tickets por tópico de ajuda no Suporte CSC.',
    qtd: '4 passos',
    Icone: ListFilter,
    grupos: [{
        passos: [
            {
                acao: 'No Suporte CSC, clique no menu “Tickets”.',
                expl: (
                    <>
                        Acesse o sistema <a href={LINK_CSC} target="_blank" rel="noopener noreferrer">Suporte CSC</a> e
                        entre com o seu e-mail e senha. A opção fica no menu, abaixo da logo.
                    </>
                ),
                ...ambos((cel) => (
                    <Video cel={cel} de={['50%', '80%']} para={alvoMenu('tickets', cel)}>
                        <Tela fase="antes"><TelaTickets cel={cel} inicio qtdTickets={QTD_TICKETS} /></Tela>
                        <Tela fase="depois"><TelaTickets cel={cel} lista={TODOS} qtdTickets={QTD_TICKETS} /></Tela>
                    </Video>
                )),
            },
            {
                acao: 'Clique no campo “Tópico de ajuda”.',
                expl: 'Este campo funciona como um filtro de pesquisa, agrupando os tickets por tópicos de ajuda para '
                    + 'facilitar a localização das informações. O número apresentado entre parênteses ( ) corresponde à '
                    + 'quantidade de tickets existentes para este tópico de ajuda.',
                ...ambos((cel) => (
                    <Video cel={cel} para={alvoTopico(cel)}>
                        <TelaTickets cel={cel} lista={TODOS} qtdTickets={QTD_TICKETS} />
                        <ListaTopicos cel={cel} opcoes={TOPICOS} on={0} />
                    </Video>
                )),
            },
            {
                acao: 'Escolha o tópico de ajuda.',
                expl: 'Neste exemplo, o tópico de ajuda selecionado é “TI - Sistemas”. O número apresentado indica que '
                    + 'existem 15 (quinze) tickets vinculados a esse tópico.',
                ...ambos((cel) => (
                    <Video cel={cel} de={['60%', '90%']} para={alvoOpcao(TOPICOS.indexOf(TOPICO), cel)}>
                        <Tela fase="antes">
                            <TelaTickets cel={cel} lista={TODOS} qtdTickets={QTD_TICKETS} />
                            <ListaTopicos cel={cel} opcoes={TOPICOS} on={TOPICOS.indexOf(TOPICO)} fixa />
                        </Tela>
                        <Tela fase="depois"><TelaTickets cel={cel} lista={SISTEMAS} qtdTickets={QTD_TICKETS} /></Tela>
                    </Video>
                )),
            },
            {
                acao: 'Veja quantos tickets estão em aberto e encerrados.',
                expl: 'Neste exemplo, dos 15 (quinze) tickets existentes, 6 (seis) estão em aberto e 9 (nove) estão encerrados. Você pode '
                    + 'visualizar essas informações acima da lista, no lado direito da tela.',
                ...ambos((cel) => (
                    <Video cel={cel} de={['40%', '85%']} para={alvoContagem(cel)} semClique>
                        <TelaTickets cel={cel} lista={SISTEMAS} qtdTickets={QTD_TICKETS} />
                        <Destaque style={caixaContagem(cel)} />
                    </Video>
                )),
            },
        ],
    }],
};
