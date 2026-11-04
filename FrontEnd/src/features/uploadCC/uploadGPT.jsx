import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import { useNavigate, useParams } from "react-router-dom";

import Axios from 'axios';

import { toast } from 'react-toastify';

import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

const UploadGPT = () => {
    const [matricula, setMatricula] = useState('');
    const [ano, setAno] = useState('');
    const [mes, setMes] = useState('');
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('matricula', matricula);
        formData.append('ano_ref', ano);
        formData.append('mes_ref', mes);
        for (const file of files) {
            formData.append('comprovantes', file);
        }

        console.log("ano", ano);


        // Axios.post("https://httpbin.org/anything", formData)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/upload_GPT`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                toast.success("Comprovantes enviados com sucesso!");
                alert('Comprovantes enviados com sucesso!');
            } else {
                toast.error('Erro ao enviar o arquivo');

            }
        } catch (error) {
            console.error(error);
            toast.error('Erro ao enviar o arquivo');

        }
    };

    return (
        <div className="upload">
            <br></br>
            <h2 className='h11'> Upload de Comprovantes</h2>

            <Container className='Meio01'>

                <div className="titulo">

                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="matricula">
                        <Form.Label><b>Tipo de Documentos</b></Form.Label>
                        <Form.Control type="text" placeholder="Digite o tipo de Documentos" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="ano">
                        <Form.Label>Ano</Form.Label>
                        <Form.Control type="number" placeholder="Digite o ano dos comprovantes" value={ano} onChange={(e) => setAno(parseInt(e.target.value))} required />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="mes">
                        <Form.Label>Mês</Form.Label>
                        <Form.Control as="select" value={mes} onChange={(e) => setMes(parseInt(e.target.value))} required>
                            <option value={0}>Selecione um mês</option>
                            <option value={1}>Janeiro</option>
                            <option value={2}>Fevereiro</option>
                            <option value={3}>Março</option>
                            <option value={4}>Abril</option>
                            <option value={5}>Maio</option>
                            <option value={6}>Junho</option>
                            <option value={7}>Julho</option>
                            <option value={8}>Agosto</option>
                            <option value={9}>Setembro</option>
                            <option value={10}>Outubro</option>
                            <option value={11}>Novembro</option>
                            <option value={12}>Dezembro</option>
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="comprovantes">
                        <Form.Label>Comprovantes</Form.Label>
                        <Form.Control type="file" multiple onChange={(e) => setFiles(e.target.files)} required />
                    </Form.Group>
                    <br />
                    <div className='Meio02'>
                        <Row>
                            <Col md={6} lg={6} >
                                <Button className="but2" variant="primary" onClick={(e) => navigate(`/`)} > <i className="fa-solid fa-left-long"></i> VOLTAR </Button>
                            </Col>
                            <Col md={6} lg={6} >
                                <Button type="submit">Enviar</Button>

                            </Col>
                        </Row>
                    </div>

                </Form>
            </Container>

        </div>
    );
}
export default UploadGPT;