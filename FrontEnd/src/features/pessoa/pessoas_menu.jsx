import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Logo from '../../img/logo_foundation.png'

function PessoaMenu() {
    return (

        <Navbar bg="light" expand="lg">
            <Container>
                Adminstração de Pessoas
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={`${process.env.REACT_APP_FRONTEND}/novaPessoa`} > <i class="fa-solid fa-user-plus"></i> Adicionar</Nav.Link>
                        <Nav.Link href="#features"> <i class="fa-solid fa-list"></i> Relatórios</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder=""
                        className="sm-2"
                    />
                    <Button variant="outline-primary" size="sm">Pesquisar</Button>
                </Form>
            </Container>
        </Navbar>

    );
}

export default PessoaMenu;