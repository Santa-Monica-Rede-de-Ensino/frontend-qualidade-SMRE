import React, { useState, useEffect, useRef } from 'react';
import './ChatPanel.css';

const BOT_MESSAGE = {
    id: 1,
    type: 'bot',
    lines: [
        { type: 'text', content: 'Olá! 👋 Seja bem-vindo(a) ao canal de Gente & Gestão!' },
        { type: 'text', content: 'Nosso atendimento humano funciona de seg. a sex., das 8h às 18h.' },
        { type: 'spacer' },
        { type: 'text', content: '📄 Veio buscar seu Contracheque ou Informe de Rendimentos?' },
        { type: 'text', content: 'É só acessar direto o ' },
        { type: 'link', content: 'Portal do Colaborador', href: '/' },
        { type: 'text', content: '(Lembrete: Seu login é o CPF).' },
        { type: 'spacer' },
        { type: 'text', content: '👇 Para outros assuntos, escolha uma categoria:' },
    ],
    categories: [
        { id: 1, label: 'Saúde, Férias e Desligamento' },
        { id: 2, label: 'Cadastros' },
        { id: 3, label: 'Benefícios e Transporte' },
        { id: 4, label: 'Contratos Trabalhistas' },
        { id: 5, label: 'Recrutamento e Seleção' },
        { id: 6, label: 'Atendente' },
    ],
};

const ChatPanel = ({ onClose }) => {
    const [input, setInput] = useState('');
    const [visible, setVisible] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
        setTimeout(() => inputRef.current?.focus(), 400);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 280);
    };

    const handleCategory = (cat) => {
        setInput(cat.label);
        inputRef.current?.focus();
    };

    return (
        <div className={`chat-panel ${visible ? 'chat-panel--open' : ''}`}>
            {/* Header */}
            <div className="chat-panel-header">
                <div className="chat-panel-header-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" width="20" height="20">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                </div>
                <div className="chat-panel-header-info">
                    <span className="chat-panel-header-title">Gente &amp; Gestão</span>
                    <span className="chat-panel-header-status">
                        <span className="chat-panel-status-dot" />
                        Online
                    </span>
                </div>
                <button className="chat-panel-close" onClick={handleClose} aria-label="Fechar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" width="18" height="18">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Messages */}
            <div className="chat-panel-messages">
                <div className="chat-bubble chat-bubble--bot">
                    <div className="chat-bubble-content">
                        {BOT_MESSAGE.lines.map((line, i) => {
                            if (line.type === 'spacer') return <div key={i} className="chat-bubble-spacer" />;
                            if (line.type === 'link') return (
                                <a key={i} href={line.href} className="chat-bubble-link">{line.content}</a>
                            );
                            return <span key={i}>{line.content}</span>;
                        })}
                    </div>
                    <div className="chat-categories">
                        {BOT_MESSAGE.categories.map((cat) => (
                            <button
                                key={cat.id}
                                className="chat-category-chip"
                                onClick={() => handleCategory(cat)}
                            >
                                <span className="chat-category-num">{cat.id}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Input */}
            <div className="chat-panel-input-bar">
                <input
                    ref={inputRef}
                    className="chat-panel-input"
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && input.trim() && setInput('')}
                />
                <button
                    className="chat-panel-send"
                    disabled={!input.trim()}
                    onClick={() => setInput('')}
                    aria-label="Enviar"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatPanel;
