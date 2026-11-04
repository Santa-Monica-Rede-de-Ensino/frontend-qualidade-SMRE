import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Atalhos.css';

// Importação das imagens (Normal e Hover)
import IconContracheque from '../../img/Portal_Func/Contracheque Colorido.svg';
import HoverContracheque from '../../img/Portal_Func/Contracheque Branco.svg';
import IconIR from '../../img/Portal_Func/Imposto de Renda Colorido.svg';
import HoverIR from '../../img/Portal_Func/Imposto de Renda Branco.svg';
import IconFerias from '../../img/Portal_Func/Férias Colorido.svg';
import HoverFerias from '../../img/Portal_Func/Férias Branco.svg';
import IconQualidade from '../../img/Portal_Func/Selo Qualidade Colorido.svg';
import HoverQualidade from '../../img/Portal_Func/Selo Qualidade Branco.svg';
import IconBeneficios from '../../img/Portal_Func/Benefícios Colorido.svg';
import HoverBeneficios from '../../img/Portal_Func/Benefícios Branco.svg';
import AniversarianteColorido from '../../img/Portal_Func/Aniversariante Colorido.svg';
import AniversarianteBranco from '../../img/Portal_Func/Aniversariante Branco.svg';


const Atalhos = () => {
    // Array de configuração dos botões
    const botoes = [
        { id: 1, nome: 'BENEFÍCIOS', img: IconBeneficios, hover: HoverBeneficios, link: '#' },
        { id: 2, nome: 'FÉRIAS', img: IconFerias, hover: HoverFerias, link: '#' },
        { id: 3, nome: 'INFORME DE RENDIMENTOS', img: IconIR, hover: HoverIR, link: '#' },
        { id: 4, nome: 'CONTRACHEQUE', img: IconContracheque, hover: HoverContracheque, link: '/contraCheque' },
        { id: 5, nome: 'GESTÃO DA QUALIDADE', img: IconQualidade, hover: HoverQualidade, link: '/qualidade' },
    ];

    return (
        <Container className="mt-5 mb-5">
            {/* <h5 className="atalhos-titulo">ATALHOS RÁPIDOS</h5> */}
            <Row className="justify-content-center g-2">
                {botoes.map((botao) => (
                    <Col key={botao.id} xs="auto">
                        <AtalhoItem botao={botao} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

// Sub-componente para gerenciar o estado de hover individualmente
const AtalhoItem = ({ botao }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a href={botao.link} className="text-decoration-none">
            <Card
                className={`atalho-card-simples ${isHovered ? 'is-hover' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                size="sm"

            >
                <Card.Body className="atalho-body">
                    <Card.Title className="atalho-nome">
                        <center>
                            <img
                                src={isHovered ? botao.hover : botao.img}
                                alt={botao.nome}
                                className="atalho-img"

                            />
                            <div style={{ wordWrap: 'break-word', width: '3em', height: '3em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {botao.nome}
                            </div>
                        </center>
                    </Card.Title>
                </Card.Body>
            </Card>
        </a>
    );
};

export default Atalhos;
