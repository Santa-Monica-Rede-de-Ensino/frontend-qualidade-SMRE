// Versão celular das telas do termo (Hello Ethics); mesmos dados fictícios de telasTermo.jsx.
import React from 'react';
import LogoColorida from '../../img/logomarca.png';
import { Digita } from './telasTermo';
import './telasTermoCel.css';

export { Digita };

const Chevron = () => (
    <svg viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="11" fill="#fff" /><path d="m7 10 5 5 5-5" fill="none" stroke="#0a66b7" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const Visto = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);

const pct = (v) => `${v}%`;

const ALT_CAMPO = 5.5;
const TOPO_CAMPO = { nome: 13, unidade: 24, area: 35, cpf: 46, email: 57 };
const ALT_ROTULO = 2.8;
const BTN_TOKEN = { top: 66, alt: 6 };
const CAMPO_TOKEN = { top: 74, alt: 6, esq: 5, larg: 55 };
const FOLGA_OPCOES = 0.5;

const TOPO_CARTOES = [8, 19, 30, 41, 52];
const ALT_CARTAO = 10;
const LGPD = { top: 63.5, alt: 10 };
const CAPTCHA = { top: 75, alt: 8 };
const ENVIAR = { top: 86.5, alt: 6.5 };
// Caixas medem .9em e 1.2em; 1em = 2.8125% da altura da cena (9:16, fonte 5cqw).
const CAIXA = { esq: 7.5, meiaLarg: 2.25, meiaAlt: 1.27 };
const CAIXA_CAPTCHA = { esq: 9, meiaLarg: 3, meiaAlt: 1.69 };

const TOKEN_MAIL = { top: 53, alt: 10 };
const CARTAO_SUCESSO = { top: 28, alt: 44 };
const REGISTRO = { top: 61, alt: 6 };

const centroY = ({ top, alt }) => top + alt / 2;
const topoCaixa = (cartaoTop, cartaoAlt) => pct(cartaoTop + cartaoAlt / 2 - CAIXA.meiaAlt);
const campo = (chave) => ({ top: TOPO_CAMPO[chave], alt: ALT_CAMPO });

export const ALVOS_TERMO_CEL = {
    nome: { x: '50%', y: pct(centroY(campo('nome'))) },
    unidade: { x: '50%', y: pct(centroY(campo('unidade'))) },
    area: { x: '50%', y: pct(centroY(campo('area'))) },
    cpf: { x: '50%', y: pct(centroY(campo('cpf'))) },
    enviarToken: { x: '50%', y: pct(centroY(BTN_TOKEN)) },
    token: { x: pct(CAMPO_TOKEN.esq + CAMPO_TOKEN.larg / 2), y: pct(centroY(CAMPO_TOKEN)) },
    caixa1: { x: pct(CAIXA.esq + CAIXA.meiaLarg), y: pct(TOPO_CARTOES[0] + ALT_CARTAO / 2) },
    lgpd: { x: pct(CAIXA.esq + CAIXA.meiaLarg), y: pct(centroY(LGPD)) },
    captcha: { x: pct(CAIXA_CAPTCHA.esq + CAIXA_CAPTCHA.meiaLarg), y: pct(centroY(CAPTCHA)) },
    enviar: { x: '50%', y: pct(centroY(ENVIAR)) },
    registro: { x: '50%', y: pct(centroY(REGISTRO)) },
    emailToken: { x: '50%', y: pct(centroY(TOKEN_MAIL)) },
};

const Topo = () => (
    <div className="mt-topo">Termos de compromisso - Código de Ética<br />e Conduta e Políticas Internas</div>
);

function Rotulo({ chave, children }) {
    return <span className="mt-rot" style={{ top: pct(TOPO_CAMPO[chave] - ALT_ROTULO) }}>{children}</span>;
}

export function TermoFormCel({ nome, unidade, area, cpf, email, token, apertaToken }) {
    const alto = (chave) => ({ top: pct(TOPO_CAMPO[chave]), height: pct(ALT_CAMPO) });
    return (
        <div className="mt-tela">
            <Topo />
            <Rotulo chave="nome">*Nome Completo:</Rotulo>
            <div className="mt-campo" style={alto('nome')}>{nome}</div>
            <Rotulo chave="unidade">*Unidade:</Rotulo>
            <div className="mt-lista" style={alto('unidade')}>{unidade}<Chevron /></div>
            <Rotulo chave="area">*Área:</Rotulo>
            <div className="mt-lista" style={alto('area')}>{area}<Chevron /></div>
            <Rotulo chave="cpf">*CPF:</Rotulo>
            <div className="mt-campo" style={alto('cpf')}>{cpf}</div>
            <Rotulo chave="email">*E-mail:</Rotulo>
            <div className="mt-campo" style={alto('email')}>{email}</div>
            <div
                className={`mt-btn-token${apertaToken ? ' anima-aperta' : ''}`}
                style={{ top: pct(BTN_TOKEN.top), height: pct(BTN_TOKEN.alt) }}
            >
                Enviar Token
            </div>
            <div
                className="mt-campo-token"
                style={{
                    top: pct(CAMPO_TOKEN.top), height: pct(CAMPO_TOKEN.alt),
                    left: pct(CAMPO_TOKEN.esq), width: pct(CAMPO_TOKEN.larg),
                }}
            >
                {token ? <b>{token}</b> : 'Informe o token aqui'}
            </div>
            <div className="mt-linha" />
        </div>
    );
}

export function OpcoesUnidadeCel() {
    return (
        <div className="mt-opcoes surge breve" style={{ top: pct(TOPO_CAMPO.unidade + ALT_CAMPO + FOLGA_OPCOES) }}>
            <div className="on">Central Administrativa</div>
            <div>Central de Manutenção</div>
            <div>Unidade Barra da Tijuca</div>
            <div>Unidade Bento Ribeiro</div>
            <div>Unidade Campo Grande</div>
            <div>Unidade Cascadura</div>
        </div>
    );
}

export function OpcoesAreaCel() {
    return (
        <div className="mt-opcoes surge breve" style={{ top: pct(TOPO_CAMPO.area + ALT_CAMPO + FOLGA_OPCOES) }}>
            <div>CSC - Gente &amp; Gestão</div>
            <div>CSC - Infraestrutura e Obras</div>
            <div>CSC - Marketing</div>
            <div className="on">CSC - Qualidade</div>
            <div>CSC - TI</div>
            <div>DGP</div>
        </div>
    );
}

export function DicaTokenCel() {
    return (
        <div className="mt-dica surge" style={{ top: pct(CAMPO_TOKEN.top + CAMPO_TOKEN.alt + 1.5) }}>
            Por favor, verifique sua caixa de e-mail e insira o token. Após clique em Enviar Formulário.
        </div>
    );
}

export function EmailTokenCel() {
    return (
        <div className="mt-mail">
            <div className="mt-mail-assunto">TOKEN - Termos de compromisso SMREDE <em>Caixa de entrada</em></div>
            <div className="mt-mail-de"><i /><span><b>Ouvidoria SMREDE &lt;noreply@helloethics.com&gt;</b> para mim</span></div>
            <div className="mt-mail-corpo" />
            <img className="mt-mail-logo" src={LogoColorida} alt="" />
            <p className="mt-mail-ola">Olá, Colaborador!</p>
            <p className="mt-mail-texto">Segue abaixo o seu <b>TOKEN</b> para dar continuidade ao processo de aceite aos termos de compromisso.</p>
            <div className="mt-mail-token pulsa" style={{ top: pct(TOKEN_MAIL.top), height: pct(TOKEN_MAIL.alt) }}>4827</div>
            <p className="mt-mail-fim">Acesse novamente a plataforma e insira o token para concluir a etapa.</p>
        </div>
    );
}

const DOCUMENTOS = [
    ['Declaro que li e compreendi a versão vigente do Código de Ética e Conduta do SMREDE.', 'Documento que estabelece os princípios e regras que orientam o comportamento esperado de todos os colaboradores.'],
    ['Declaro que li e compreendi a versão vigente do Código de Vestimenta do SMREDE.', 'Documento que orienta os colaboradores quanto ao uso de uniformes e acessórios.'],
    ['Declaro que li e compreendi a versão vigente da Política de Medida Disciplinar do SMREDE.', 'Documento que estabelece as regras e procedimentos para lidar com condutas inadequadas.'],
    ['Declaro que li e compreendi a versão vigente da Política de Privacidade do SMREDE.', 'Documento que explica como a organização coleta, utiliza e protege os dados pessoais.'],
    ['Declaro que li e compreendi a versão vigente da Política de Segurança da Informação do SMREDE.', 'Conjunto de diretrizes e regras que definem como a organização protege seus dados e sistemas.'],
];

// estado: undefined = vazia, 'sim' = já marcada, 'animar' = marca no clique do vídeo
function Marca({ estado, top, atraso, className = '' }) {
    if (!estado) return null;
    const animada = estado === 'animar';
    return (
        <span
            className={`mt-marca ${className}${animada ? ' surge' : ''}${animada && atraso ? ' cascata' : ''}`}
            style={{ top, animationDelay: animada && atraso ? `${atraso}s` : undefined }}
        >
            <Visto />
        </span>
    );
}

export function TermoCaixasCel({ docs, lgpd, captcha, ativo, aperta }) {
    const topoCaptcha = pct(centroY(CAPTCHA) - CAIXA_CAPTCHA.meiaAlt);
    return (
        <div className="mt-tela">
            <Topo />
            {DOCUMENTOS.map(([titulo, resumo], i) => (
                <React.Fragment key={titulo}>
                    <div className="mt-cartao" style={{ top: pct(TOPO_CARTOES[i]), height: pct(ALT_CARTAO) }}>
                        <b>{titulo}</b><small>{resumo}</small>
                    </div>
                    <span className="mt-caixa" style={{ top: topoCaixa(TOPO_CARTOES[i], ALT_CARTAO) }} />
                    <Marca estado={docs} top={topoCaixa(TOPO_CARTOES[i], ALT_CARTAO)} atraso={docs === 'animar' ? i * 0.3 : 0} />
                </React.Fragment>
            ))}
            <div className="mt-cartao lgpd" style={{ top: pct(LGPD.top), height: pct(LGPD.alt) }}>
                <b>Declaro estar ciente de que meus dados pessoais informados nos termos de compromisso serão coletados nesta plataforma da Hello Ethics e compartilhados com o SMREDE, conforme a LGPD.</b>
            </div>
            <span className="mt-caixa" style={{ top: topoCaixa(LGPD.top, LGPD.alt) }} />
            <Marca estado={lgpd} top={topoCaixa(LGPD.top, LGPD.alt)} />
            <div className="mt-captcha" style={{ top: pct(CAPTCHA.top), height: pct(CAPTCHA.alt) }}>
                Não sou um robô<span className="mt-recaptcha">reCAPTCHA</span>
            </div>
            <span className="mt-caixa captcha" style={{ top: topoCaptcha }} />
            <Marca estado={captcha} top={topoCaptcha} className="captcha" />
            <div
                className={`mt-enviar${ativo ? ' ativo' : ''}${aperta ? ' anima-aperta' : ''}`}
                style={{ top: pct(ENVIAR.top), height: pct(ENVIAR.alt) }}
            >
                Enviar Formulário
            </div>
        </div>
    );
}

export function SucessoTermoCel({ fixo, pulsa }) {
    // Registro posicionado em % do cartão para o alvo do toque cair em coordenadas exatas da cena.
    const registroNoCartao = {
        top: pct(((REGISTRO.top - CARTAO_SUCESSO.top) / CARTAO_SUCESSO.alt) * 100),
        height: pct((REGISTRO.alt / CARTAO_SUCESSO.alt) * 100),
    };
    return (
        <div className={fixo ? 'mt-fundo' : 'mt-fundo surge'}>
            <div className="mt-sucesso" style={{ top: pct(CARTAO_SUCESSO.top), height: pct(CARTAO_SUCESSO.alt) }}>
                <i><Visto /></i>
                <strong>Formulário enviado com sucesso!</strong>
                <span>Guarde o número de registro da sua assinatura:</span>
                <span className={pulsa ? 'mt-registro pulsa' : 'mt-registro'} style={registroNoCartao}>Nº 482719</span>
            </div>
        </div>
    );
}
