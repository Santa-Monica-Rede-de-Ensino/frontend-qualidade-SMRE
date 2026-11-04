import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import { useNavigate, useParams } from "react-router-dom";

import Axios from 'axios';

import { toast } from 'react-toastify';

import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

import './upload.css';

const UploadCC = () => {

    const [file, setFile] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await Axios.post(`${process.env.REACT_APP_BACKEND}/importa_excel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("XXX=", res);
            if (res.statusText === 'OK') {
                toast.success("Arquivo de dados carregado com sucesso!");
                //alert('Arquivo de dados carregado com sucesso!');
            } else {
                toast.error('Erro ao enviar o arquivo!');

            }
            console.log(res.data);
        } catch (err) {
            console.error(err);
            toast.error('Erro ao enviar o arquivo');

        }
    }
    return (
        <Container className='Meio01'>

            <div className="container mt-5">
                <h1 className='h11'>Upload de arquivo de funcionários XLS</h1>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">Selecione o arquivo XLS:</label>
                        <input type="file" className="form-control" id="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className='Meio02'>
                        <Row>
                            <Col md={6} lg={6} >

                                <Button type="submit" className="btn1 btn-primary">Enviar</Button>
                            </Col>
                            <Col md={6} lg={6} >
                                <Button className="but2" variant="primary" onClick={(e) => navigate(`/`)} > <i className="fa-solid fa-left-long"></i> VOLTAR </Button>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>

        </Container>

    )

}
export default UploadCC;