import React, { useEffect } from 'react';
import Logo from '../../img/Portal_Func/SMRE_logo_negativo.png';
import ListaPassos from './passos';
import './guia.css';
import './paginaTutorial.css';

// Página de um tema só, publicada à parte do Portal (builds tutorial-*).
function PaginaTutorial({ tema, tituloAba }) {
    const { Icone } = tema;

    useEffect(() => {
        document.title = tituloAba;
    }, [tituloAba]);

    return (
        <div className="GuiaPortal">
            <header className="tt-topo">
                <img src={Logo} alt="Santa Mônica Rede de Ensino" />
            </header>
            <main className="guia-body tt-corpo">
                <div className="tt-titulo">
                    <span className="acc-ic"><Icone strokeWidth={2} /></span>
                    <div>
                        <h1>{tema.titulo}</h1>
                        <p>{tema.sub}</p>
                    </div>
                </div>
                <p className="guia-intro">Clique em cada passo para ver o mini vídeo.</p>
                <div className="acordeao">
                    <div className="acc-item">
                        <div className="acc-corpo">
                            {tema.grupos.map((grupo, i) => <ListaPassos key={i} passos={grupo.passos} />)}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PaginaTutorial;
