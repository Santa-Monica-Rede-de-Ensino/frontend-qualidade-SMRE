import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Logo from '../../img/logo_foundation.png'

function FoundationMenu() {
    return (

        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">

                    Foundation
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <NavDropdown title="Modulo 1" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Ação 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Ação 2
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Ação 3</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Ação 4
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Modulo 2" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Ação 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Ação 2
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Ação 3</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Ação 4
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
}

export default FoundationMenu;