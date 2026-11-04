import React, { Children, useContext } from "react";

import {
    HashRouter as Router,
    Route,
    Routes,
    Navigate,
    useParams,
    useLocation
} from "react-router-dom";

import LoginPage from './features/LoginPage';
import ChatButton from './features/chat/ChatButton';
import HomePage from './features/HomePage/index.jsx';
import EnviaReset from './features/LoginPage/enviaReset.jsx';
import ResetSenha from './features/Usuarios/resetsenha.jsx';
import UploadCC from './features/uploadCC/uploadCC.jsx';
import UploadGPT from './features/uploadCC/uploadGPT.jsx';
import ContaDocs from './features/uploadCC/contaDocs.jsx';
import ListaDocs from "./features/uploadCC/listaDocs";
import Qualidade from "./features/Qualidade/qualidade";
import UploadGPTFotos from "./features/uploadCC/uploadGPTFotos.jsx";
import ContraCheque from "./features/HomePage/contra_cheque.jsx";
import Ramais from "./features/Ramais/ramais.jsx";
import Aniversariantes from "./features/Aniversariantes/aniversariantes.jsx";
import EmConstrucao from "./features/EmConstrucao/emConstrucao.jsx";
import Guia from "./features/Guia/guia.jsx";
import { emProducao } from "./config/fase";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider, AuthContext } from "./contexts/auth";

const AppContent = () => {
    const location = useLocation();

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>;
        }
        if (!authenticated) {
            return <Navigate to="/login" />
        }
        return children;
    }

    return (
        <AuthProvider>
            <Routes>
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/enviaReset" element={<EnviaReset />} />
                <Route exact path="/" element={<Private><HomePage /></Private>} />
                <Route exact path="/uploadCC" element={<Private><UploadCC /></Private>} />
                <Route exact path="/uploadGPT" element={<Private><UploadGPT /></Private>} />
                <Route exact path="/contaDocs" element={<Private><ContaDocs /></Private>} />
                <Route exact path="/listaDocs" element={<Private><ListaDocs /></Private>} />
                <Route exact path="/resetSenha/:token" element={<ResetSenha />} />
                <Route exact path="/qualidade" element={<Private><Qualidade /></Private>} />
                <Route exact path="/contraCheque" element={<Private><ContraCheque /></Private>} />
                <Route exact path="/uploadGPTFotos" element={<Private><UploadGPTFotos /></Private>} />
                <Route exact path="/ramais" element={<Private><Ramais /></Private>} />
                <Route exact path="/aniversariantes" element={<Private><Aniversariantes /></Private>} />
                <Route exact path="/emConstrucao" element={<Private><EmConstrucao /></Private>} />
                <Route exact path="/guia" element={<Private><Guia /></Private>} />

            </Routes>
            <ToastContainer />
            {location.pathname !== "/login" && !emProducao && <ChatButton />}
        </AuthProvider>
    )
}

const AppRoutes = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default AppRoutes;