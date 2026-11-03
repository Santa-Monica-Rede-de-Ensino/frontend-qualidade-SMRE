import React from 'react';
import PaginaTutorial from './PaginaTutorial';
import { TEMA_TERMO } from './conteudoTermo';

// Publicada à parte (build tutorial-termo) enquanto o Portal novo não é divulgado.
function TutorialTermo() {
    return <PaginaTutorial tema={TEMA_TERMO} tituloAba="Como assinar os Termos de Compromisso | SMREDE" />;
}

export default TutorialTermo;
