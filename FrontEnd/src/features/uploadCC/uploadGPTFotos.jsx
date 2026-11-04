import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import { useNavigate, useParams } from "react-router-dom";

import Axios from 'axios';

import { toast } from 'react-toastify';

import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

const UploadGPTFotos = () => {
    const [matricula, setMatricula] = useState('');
    const [ano, setAno] = useState('');
    const [mes, setMes] = useState('');
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        for (const file of files) {
            formData.append('fotos', file);
        }

        console.log("ano", ano);


        // Axios.post("https://httpbin.org/anything", formData)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/upload_GPTFotos`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                toast.success("Fotos enviadas com sucesso!");
                // alert('Comprovantes enviados com sucesso!');
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
            <h2 className='h11'> Upload de Fotos</h2>

            <Container className='Meio01'>

                <div className="titulo">

                </div>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="fotos">
                        <Form.Label>Fotos</Form.Label>
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
export default UploadGPTFotos;