import React, { useState } from 'react';
import ChatPanel from './ChatPanel';
import './ChatButton.css';

const ChatButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {open && <ChatPanel onClose={() => setOpen(false)} />}

            <button
                className={`chat-fab ${open ? 'chat-fab--active' : ''}`}
                onClick={() => setOpen(prev => !prev)}
                aria-label="Atendimento"
            >
                <span className="chat-fab-ring" />
                <span className="chat-fab-inner">
                    {open ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" className="chat-fab-icon">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            className="chat-fab-icon"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M24 4H4C2.9 4 2 4.9 2 6V20C2 21.1 2.9 22 4 22H8L12 26V22H24C25.1 22 26 21.1 26 20V6C26 4.9 25.1 4 24 4Z"
                                stroke="white"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                                fill="none"
                            />
                            <circle cx="9" cy="13" r="1.4" fill="white" />
                            <circle cx="14" cy="13" r="1.4" fill="white" />
                            <circle cx="19" cy="13" r="1.4" fill="white" />
                        </svg>
                    )}
                </span>
            </button>
        </>
    );
};

export default ChatButton;
