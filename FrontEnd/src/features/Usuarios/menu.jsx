import {React,useContext} from 'react';
import { AuthContext } from "../../contexts/auth";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Logo from '../../img/logomarca.png'

import '../../shared/components/components.css';

function Menu(){
     
  const { logout } = useContext(AuthContext);

  return (
    <div className='Menu1'>
    {['sm'].map((expand) => (
      <Navbar key={expand} bg="light" expand={expand} className="mb-3">
        <Container fluid>
        
          <Navbar.Brand href="#"><img className='logo1' src={Logo}  alt=""  /></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Santa Mônica Rede de Ensino
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Inicio</Nav.Link>
                <NavDropdown
                  title="Gestão Escolar "
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item href="#action3"> Resete Senha</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Novo Acesso
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Financeiro "
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item href="#action3">Financeiro</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                  Financeiro
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                
                  title="Financeiro Alunos "
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item href="#action3">Financeiro Alunos</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                  Financeiro Alunos
                  </NavDropdown.Item>
                </NavDropdown>


              </Nav>
             
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
  </div>
  );
}

  export default Menu;
