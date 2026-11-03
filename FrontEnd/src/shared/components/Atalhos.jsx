import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PartyPopper, HeartPulse, FileText, Palmtree, Receipt, BadgeCheck, MonitorCheck } from 'lucide-react';
import { emProducao } from '../../config/fase';
import { linkEmConstrucao } from '../lib/linkEmConstrucao';
import './Atalhos.css';

const botoes = [
    { id: 1, nome: 'ANIVERSARIANTES', Icon: PartyPopper, link: '/aniversariantes' },
    { id: 2, nome: 'BENEFÍCIOS', Icon: HeartPulse, link: linkEmConstrucao('Benefícios'), ocultoEmProducao: true },
    { id: 3, nome: 'CONTRACHEQUE', Icon: FileText, link: '/contraCheque' },
    { id: 4, nome: 'FÉRIAS', Icon: Palmtree, link: linkEmConstrucao('Férias'), ocultoEmProducao: true },
    { id: 5, nome: 'GESTÃO DA QUALIDADE', Icon: BadgeCheck, link: '/qualidade' },
    { id: 6, nome: 'INFORME DE RENDIMENTOS', Icon: Receipt, link: linkEmConstrucao('Informe de Rendimentos'), ocultoEmProducao: true },
    { id: 7, nome: 'SISTEMA MONITORA', Icon: MonitorCheck, link: 'https://monitora.smrede.net.br/', externo: true },
];

export const contarAtalhosVisiveis = () =>
    botoes.filter((botao) => !(emProducao && botao.ocultoEmProducao)).length;

export const atalhosVisiveis = () => botoes.filter((botao) => !(emProducao && botao.ocultoEmProducao));

const Atalhos = () => {
    const itensVisiveis = botoes.filter((botao) => !(emProducao && botao.ocultoEmProducao));
    const colunas = itensVisiveis.length <= 3 ? 1 : 2;

    return (
        <div className="atalhos-grid-wrapper" style={{ '--atalhos-cols': colunas }}>
            {itensVisiveis.map((botao) => <AtalhoItem key={botao.id} botao={botao} />)}
        </div>
    );
};

const AtalhoItem = ({ botao }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { Icon } = botao;

    const conteudo = (
        <div
            className={`atalho-card-simples ${isHovered ? 'is-hover' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="atalho-body">
                <Icon
                    size={52}
                    strokeWidth={1.5}
                    className="atalho-lucide-icon"
                />
                <div className="atalho-nome">{botao.nome}</div>
            </div>
        </div>
    );

    return (
        botao.externo
            ? <a href={botao.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none atalho-grid-item">{conteudo}</a>
            : <Link to={botao.link} className="text-decoration-none atalho-grid-item">{conteudo}</Link>
    );
};

export default Atalhos;
