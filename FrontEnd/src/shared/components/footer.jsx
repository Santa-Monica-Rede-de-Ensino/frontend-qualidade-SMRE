import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer-ouvidoria">
            <div className="footer-ouvidoria-inner">

                <div className="footer-ouvidoria-content">
                    <a 
                        href="https://www.helloethics.com/ouvidoriasmrede/pt/main.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-ouvidoria-brand"
                    >
                        <div className="footer-ouvidoria-icon-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="footer-ouvidoria-icon">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <div className="footer-ouvidoria-info">
                            <span className="footer-ouvidoria-label">OUVIDORIA SMREDE</span>
                            <span className="footer-ouvidoria-desc">Canal de escuta ativa, transparente e acessível!</span>
                        </div>
                    </a>
                </div>

                <div className="footer-divider" />

                <div className="footer-copy">
                    © {new Date().getFullYear()} Santa Mônica Rede de Ensino &mdash; Portal do Colaborador
                </div>

            </div>
        </footer>
    );
};

export default Footer;
