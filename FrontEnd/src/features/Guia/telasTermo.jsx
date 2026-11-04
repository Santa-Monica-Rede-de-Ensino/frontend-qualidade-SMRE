// Telas simuladas do formulário do termo (Hello Ethics); dados do Leozinho, token e registro são fictícios.
import React from 'react';
import LogoColorida from '../../img/logomarca.png';
import QrCodeTermo from '../../img/Portal_Func/qrcode-termo.png';

const Chevron = () => (
    <svg viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="11" fill="#fff" /><path d="m7 10 5 5 5-5" fill="none" stroke="#0a66b7" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const Visto = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);

// Texto que aparece letra por letra; n = número de letras (define os degraus da animação).
export function Digita({ n, tarde, children }) {
    return <span className={tarde ? 't-digita tarde' : 't-digita'} style={{ '--n': n }}>{children}</span>;
}

export const LINK_FORMULARIO_TERMO = 'https://www.helloethics.com/ouvidoriasmrede/form/';

export function QrCodeFormulario() {
    return (
        <a className="t-qr-real" href={LINK_FORMULARIO_TERMO} target="_blank" rel="noopener noreferrer">
            <img src={QrCodeTermo} alt="QR CODE do formulário dos Termos de Compromisso" />
        </a>
    );
}

export function MuralQrCode() {
    return (
        <div className="t-mural">
            <div className="t-cartaz">
                <b>TERMO DE COMPROMISSO</b>
                <small>Código de Ética e Conduta e Políticas Internas</small>
                <img src={QrCodeTermo} alt="" />
                <small>Aponte a câmera do celular</small>
            </div>
        </div>
    );
}

export function CameraQrCode() {
    return (
        <div className="t-camera">
            <img src={QrCodeTermo} alt="" />
            <span className="t-mira" />
            <span className="t-link-qr">helloethics.com/ouvidoriasmrede/form</span>
        </div>
    );
}

export function FoneFormulario() {
    return (
        <div className="t-fone-form">
            <div className="t-topo">Termos de compromisso - Código de Ética e Conduta e Políticas Internas</div>
            <img src={LogoColorida} alt="" />
            <p>Olá, Colaborador!</p>
            <i style={{ top: '40%' }} /><i style={{ top: '44%' }} /><i style={{ top: '48%', right: '30%' }} />
            <span className="campo" style={{ top: '56%' }} />
            <span className="lista" style={{ top: '64%' }} />
            <span className="lista" style={{ top: '72%' }} />
            <span className="campo" style={{ top: '80%' }} />
        </div>
    );
}

export function TelaTermoForm({ nome, unidade, area, cpf, email, token, apertaToken }) {
    return (
        <div className="t-tela">
            <div className="t-topo">Termos de compromisso - Código de Ética e Conduta e Políticas Internas</div>
            <span className="t-rot" style={{ top: '10.5%' }}>*Nome Completo:</span>
            <div className="t-campo" style={{ top: '14.5%' }}>{nome}</div>
            <span className="t-rot" style={{ top: '22.5%' }}>*Unidade:</span>
            <div className="t-lista" style={{ top: '26.5%' }}>{unidade}<Chevron /></div>
            <span className="t-rot" style={{ top: '34.5%' }}>*Área:</span>
            <div className="t-lista" style={{ top: '38.5%' }}>{area}<Chevron /></div>
            <span className="t-rot" style={{ top: '46.5%' }}>*CPF:</span>
            <div className="t-campo" style={{ top: '50.5%' }}>{cpf}</div>
            <span className="t-rot" style={{ top: '58.5%' }}>*E-mail:</span>
            <div className="t-campo" style={{ top: '62.5%' }}>{email}</div>
            <div className={`t-token t-btn-token${apertaToken ? ' anima-aperta' : ''}`}>Enviar Token</div>
            <div className="t-token t-campo-token">{token ? <b>{token}</b> : 'Informe o token aqui'}</div>
            <div className="t-linha" />
        </div>
    );
}

export function OpcoesUnidade() {
    return (
        <div className="t-opcoes surge breve" style={{ top: '32.5%' }}>
            <div className="on">Central Administrativa</div>
            <div>Central de Manutenção</div>
            <div>Unidade Barra da Tijuca</div>
            <div>Unidade Bento Ribeiro</div>
            <div>Unidade Campo Grande</div>
            <div>Unidade Cascadura</div>
        </div>
    );
}

export function OpcoesArea() {
    return (
        <div className="t-opcoes surge breve" style={{ top: '44.5%' }}>
            <div>CSC - Gente &amp; Gestão</div>
            <div>CSC - Infraestrutura e Obras</div>
            <div>CSC - Marketing</div>
            <div className="on">CSC - Qualidade</div>
            <div>CSC - TI</div>
            <div>DGP</div>
        </div>
    );
}

export function DicaToken() {
    return (
        <div className="t-dica surge">
            Por favor, verifique sua caixa de e-mail e insira o token. Após clique em Enviar Formulário.
        </div>
    );
}

export function TelaEmailToken() {
    return (
        <div className="t-mail">
            <div className="t-mail-assunto">TOKEN - Termos de compromisso SMREDE <em>Caixa de entrada</em></div>
            <div className="t-mail-de"><i /><span><b>Ouvidoria SMREDE &lt;noreply@helloethics.com&gt;</b> para mim</span></div>
            <div className="t-mail-corpo">
                <img src={LogoColorida} alt="" />
                <p>Olá, Colaborador!</p>
                <p>Segue abaixo o seu <b>TOKEN</b> para dar continuidade ao processo de aceite aos termos de compromisso.</p>
                <div className="t-mail-token pulsa">4827</div>
                <p>Acesse novamente a plataforma e insira o token para concluir a etapa.</p>
            </div>
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
const TOPO_CARTOES = [10, 20.5, 31, 41.5, 52];

// estado: undefined = vazia, 'sim' = já marcada, 'animar' = marca no clique do vídeo
function Marca({ estado, top, atraso, className = '' }) {
    if (!estado) return null;
    const animada = estado === 'animar';
    return (
        <span
            className={`t-marca ${className}${animada ? ' surge' : ''}${animada && atraso ? ' cascata' : ''}`}
            style={{ top, animationDelay: animada && atraso ? `${atraso}s` : undefined }}
        >
            <Visto />
        </span>
    );
}

export function TelaTermoCaixas({ docs, lgpd, captcha, ativo, aperta }) {
    return (
        <div className="t-tela">
            <div className="t-topo">Termos de compromisso - Código de Ética e Conduta e Políticas Internas</div>
            {DOCUMENTOS.map(([titulo, resumo], i) => (
                <React.Fragment key={titulo}>
                    <div className="t-cartao" style={{ top: `${TOPO_CARTOES[i]}%` }}><b>{titulo}</b><small>{resumo}</small></div>
                    <span className="t-caixa" style={{ top: `${TOPO_CARTOES[i] + 3.3}%` }} />
                    <Marca estado={docs} top={`${TOPO_CARTOES[i] + 3.3}%`} atraso={docs === 'animar' ? i * 0.3 : 0} />
                </React.Fragment>
            ))}
            <div className="t-cartao lgpd" style={{ top: '62.5%' }}>
                <b>Declaro estar ciente de que meus dados pessoais informados nos termos de compromisso serão coletados nesta plataforma da Hello Ethics e compartilhados com o SMREDE, conforme a LGPD.</b>
            </div>
            <span className="t-caixa" style={{ top: '67.05%' }} />
            <Marca estado={lgpd} top="67.05%" />
            <div className="t-captcha">Não sou um robô<span className="t-recaptcha">reCAPTCHA</span></div>
            <span className="t-caixa captcha" />
            <Marca estado={captcha} top="81%" className="captcha" />
            <div className={`t-enviar${ativo ? ' ativo' : ''}${aperta ? ' anima-aperta' : ''}`}>Enviar Formulário</div>
        </div>
    );
}

export function SucessoTermo({ fixo, pulsa }) {
    return (
        <div className={fixo ? 't-fundo' : 't-fundo surge'}>
            <div className="t-sucesso">
                <i><Visto /></i>
                <strong>Formulário enviado com sucesso!</strong>
                <span>Guarde o número de registro da sua assinatura:</span>
                <span className={pulsa ? 't-registro pulsa' : 't-registro'}>Nº 482719</span>
            </div>
        </div>
    );
}
