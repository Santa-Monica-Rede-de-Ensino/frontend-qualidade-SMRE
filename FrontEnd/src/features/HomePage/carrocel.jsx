import React from 'react';
import { Carousel, Row, Col, Container, Card } from 'react-bootstrap';
import './carrocel.css';

// Importação das artes e ícones conforme diretórios do projeto
import imagemCarrocel1 from '../../img/Portal_Func/Ouvidoria.jpeg';
import imagemCarrocel2 from '../../img/Portal_Func/imagem01.jpeg';
import imagemCarrocel3 from '../../img/img3.jpg';
import SetaEsq from '../../img/Portal_Func/Seta esquerda.png';
import SetaDir from '../../img/Portal_Func/Seta direita.png';
import Aniversariante from '../../img/Portal_Func/ANIVERSARIO_AJUSTE_01.png';
import AniversariantePDF from '../../img/Portal_Func/Aniversariantes do mês - Junho.2026.pdf';


const Carrocel = () => {

  // Configuração das setas personalizadas para reuso
  const setasCustom = {
    prevIcon: <img src={SetaEsq} className="custom-nav-icon" alt="Anterior" />,
    nextIcon: <img src={SetaDir} className="custom-nav-icon" alt="Próximo" />
  };

  return (
    <Container fluid className="mt-4 px-4">
      <Row>
        {/* Carrossel Principal (8 Colunas) */}
        <Col lg={4} md={12} className="mb-4">
          <div className="Card_aniversariante">
            <Card className="card-aniversariante">
              <a href={AniversariantePDF}>
                <Card.Img variant="top" src={Aniversariante} />
              </a>
            </Card>
          </div>
        </Col>
        <Col lg={8} md={12} className="mb-4">
          <div className="carrocel-container">
            <Carousel
              interval={50000}
              {...setasCustom}
              indicators={true}
            >
              <Carousel.Item>
                <a href="https://www.helloethics.com/ouvidoriasmrede/pt/main.html">
                  <img className="carrocel-img" src={imagemCarrocel1} alt="Ouvidoria" />
                </a>
              </Carousel.Item>
              <Carousel.Item>
                <img className="carrocel-img" src={imagemCarrocel2} alt="Slide 2" />
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>

        {/* Card Aniversariante (4 Colunas) */}

      </Row>
    </Container>
  );
}

export default Carrocel;