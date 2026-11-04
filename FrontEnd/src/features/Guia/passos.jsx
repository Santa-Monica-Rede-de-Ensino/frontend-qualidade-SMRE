import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCelular } from './MiniVideo';

function Passo({ numero, acao, expl, cena, cenaCel, aberto, onAlternar }) {
    const celular = useCelular();
    return (
        <li className="passo-item">
            <button type="button" className="passo-cab" aria-expanded={aberto} onClick={onAlternar}>
                <span className="passo-num">{numero}</span>
                <span className="passo-acao">{acao}</span>
                <ChevronDown className="passo-seta" strokeWidth={2.2} />
            </button>
            {aberto && (
                <div className="passo-corpo">
                    {celular && cenaCel ? cenaCel : cena}
                    <p className="passo-expl">{expl}</p>
                </div>
            )}
        </li>
    );
}

function ListaPassos({ passos }) {
    const [aberto, setAberto] = useState(null);

    return (
        <ol className="passos">
            {passos.map((passo, i) => (
                <Passo
                    key={passo.acao}
                    numero={i + 1}
                    {...passo}
                    aberto={aberto === i}
                    onAlternar={() => setAberto(aberto === i ? null : i)}
                />
            ))}
        </ol>
    );
}

export default ListaPassos;
