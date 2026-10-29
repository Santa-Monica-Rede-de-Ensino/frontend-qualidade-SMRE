import React from 'react';
import PaginaTutorial from './PaginaTutorial';
import { TEMA_CONSULTA_TICKETS } from './conteudoConsultaTickets';

function TutorialConsultaTickets() {
    return <PaginaTutorial tema={TEMA_CONSULTA_TICKETS} tituloAba="Como consultar os tickets por tópico de ajuda | SMREDE" />;
}

export default TutorialConsultaTickets;
