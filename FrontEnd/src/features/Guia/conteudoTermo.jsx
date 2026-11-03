import React from 'react';
import { FileSignature } from 'lucide-react';
import MiniVideo from './MiniVideo';
import {
    Digita, QrCodeFormulario, LINK_FORMULARIO_TERMO, TelaTermoForm, OpcoesUnidade, OpcoesArea, DicaToken,
    TelaEmailToken, TelaTermoCaixas, SucessoTermo,
} from './telasTermo';
import {
    TermoFormCel, OpcoesUnidadeCel, OpcoesAreaCel, DicaTokenCel, EmailTokenCel, TermoCaixasCel, SucessoTermoCel,
    ALVOS_TERMO_CEL as T,
} from './telasTermoCel';

const Cel = (props) => <MiniVideo cel {...props} />;

// Dados do Leozinho usados em todas as telas do termo (fictícios).
const LEOZINHO = { nome: 'Leozinho Parente', unidade: 'Central Administrativa', area: 'CSC - Qualidade', cpf: '000.000.000-00', email: 'leozinho@email.com' };

export const TEMA_TERMO = {
    id: 'termo',
    titulo: 'Termos de Compromisso',
    sub: 'Como assinar eletronicamente os termos do Código de Ética e Conduta e das Políticas Internas do SMREDE.',
    qtd: '13 passos',
    Icone: FileSignature,
    grupos: [{
        passos: [
            {
                acao: 'Acesse o formulário pelo QR CODE abaixo.',
                expl: (
                    <>
                        Aponte a câmera do celular para o QR CODE e toque no link exibido na tela. Ou clique aqui:{' '}
                        <a href={LINK_FORMULARIO_TERMO} target="_blank" rel="noopener noreferrer">Termos de compromisso</a>.
                    </>
                ),
                cena: <QrCodeFormulario />,
            },
            {
                acao: 'Preencha seu nome completo.',
                cenaCel: <Cel x0="60%" y0="90%" x1={T.nome.x} y1={T.nome.y}><TermoFormCel nome={<Digita n={16}>{LEOZINHO.nome}</Digita>} /></Cel>,
                expl: 'Digite seu nome completo, sem abreviações.',
                cena: (
                    <MiniVideo x0="60%" y0="85%" x1="30%" y1="17.5%">
                        <TelaTermoForm nome={<Digita n={16}>{LEOZINHO.nome}</Digita>} />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Em Unidade, escolha o local de atuação.',
                cenaCel: <Cel x0="60%" y0="90%" x1={T.unidade.x} y1={T.unidade.y}><TermoFormCel nome={LEOZINHO.nome} unidade={<span className="surge tarde">{LEOZINHO.unidade}</span>} /><OpcoesUnidadeCel /></Cel>,
                expl: 'O Leozinho trabalha na Central Administrativa.',
                cena: (
                    <MiniVideo x0="60%" y0="85%" x1="50%" y1="29.5%">
                        <TelaTermoForm nome={LEOZINHO.nome} unidade={<span className="surge tarde">{LEOZINHO.unidade}</span>} />
                        <OpcoesUnidade />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Em Área, escolha o seu setor.',
                cenaCel: <Cel x0="60%" y0="90%" x1={T.area.x} y1={T.area.y}><TermoFormCel nome={LEOZINHO.nome} unidade={LEOZINHO.unidade} area={<span className="surge tarde">{LEOZINHO.area}</span>} /><OpcoesAreaCel /></Cel>,
                expl: 'A lista apresenta todas as áreas da rede em ordem alfabética.',
                cena: (
                    <MiniVideo x0="60%" y0="85%" x1="50%" y1="41.5%">
                        <TelaTermoForm nome={LEOZINHO.nome} unidade={LEOZINHO.unidade} area={<span className="surge tarde">{LEOZINHO.area}</span>} />
                        <OpcoesArea />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Informe seu CPF e seu e-mail pessoal.',
                cenaCel: <Cel x0="60%" y0="90%" x1={T.cpf.x} y1={T.cpf.y}><TermoFormCel nome={LEOZINHO.nome} unidade={LEOZINHO.unidade} area={LEOZINHO.area} cpf={<Digita n={14}>{LEOZINHO.cpf}</Digita>} email={<Digita n={18} tarde>{LEOZINHO.email}</Digita>} /></Cel>,
                expl: 'Informe um e-mail que você possa acessar agora. É nele que você receberá o token.',
                cena: (
                    <MiniVideo x0="60%" y0="88%" x1="30%" y1="53.5%">
                        <TelaTermoForm
                            nome={LEOZINHO.nome}
                            unidade={LEOZINHO.unidade}
                            area={LEOZINHO.area}
                            cpf={<Digita n={14}>{LEOZINHO.cpf}</Digita>}
                            email={<Digita n={18} tarde>{LEOZINHO.email}</Digita>}
                        />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Clique no botão “Enviar Token” para receber o código.',
                cenaCel: <Cel x0="60%" y0="95%" x1={T.enviarToken.x} y1={T.enviarToken.y}><TermoFormCel {...LEOZINHO} apertaToken /><DicaTokenCel /></Cel>,
                expl: 'Uma mensagem será exibida orientando você a verificar sua caixa de e-mail.',
                cena: (
                    <MiniVideo x0="60%" y0="88%" x1="9.5%" y1="76.5%">
                        <TelaTermoForm {...LEOZINHO} apertaToken />
                        <DicaToken />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Acesse seu e-mail e confira o token recebido.',
                cenaCel: <Cel semClique x0="70%" y0="95%" x1={T.emailToken.x} y1={T.emailToken.y}><EmailTokenCel /></Cel>,
                expl: 'Você receberá um e-mail da Ouvidoria SMREDE com o assunto “TOKEN - Termos de compromisso SMREDE”. Se não encontrá-lo na caixa de entrada, verifique no spam.',
                cena: (
                    <MiniVideo semClique x0="75%" y0="90%" x1="50%" y1="56%">
                        <TelaEmailToken />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Volte ao formulário e digite o token recebido no campo “Informe o token aqui”.',
                cenaCel: <Cel x0="60%" y0="95%" x1={T.token.x} y1={T.token.y}><TermoFormCel {...LEOZINHO} token={<Digita n={4}>4827</Digita>} /></Cel>,
                expl: 'São 4 dígitos.',
                cena: (
                    <MiniVideo x0="60%" y0="88%" x1="24%" y1="76.5%">
                        <TelaTermoForm {...LEOZINHO} token={<Digita n={4}>4827</Digita>} />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Leia os documentos e marque, uma a uma, as cinco caixas “Declaro que li e compreendi...”.',
                cenaCel: <Cel x0="60%" y0="95%" x1={T.caixa1.x} y1={T.caixa1.y}><TermoCaixasCel docs="animar" /></Cel>,
                expl: 'Clique no nome de cada documento para abrir e ler o conteúdo.',
                cena: (
                    <MiniVideo x0="60%" y0="90%" x1="6.5%" y1="14.75%">
                        <TelaTermoCaixas docs="animar" />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Marque a caixa referente à proteção de dados.',
                cenaCel: <Cel x0="60%" y0="95%" x1={T.lgpd.x} y1={T.lgpd.y}><TermoCaixasCel docs="sim" lgpd="animar" /></Cel>,
                expl: 'Essa declaração trata do uso e da proteção dos seus dados pessoais, conforme a LGPD.',
                cena: (
                    <MiniVideo x0="60%" y0="90%" x1="6.5%" y1="68.5%">
                        <TelaTermoCaixas docs="sim" lgpd="animar" />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Marque a opção “Não sou um robô”.',
                cenaCel: <Cel x0="60%" y0="60%" x1={T.captcha.x} y1={T.captcha.y}><TermoCaixasCel docs="sim" lgpd="sim" captcha="animar" /></Cel>,
                expl: 'Essa verificação ajuda a garantir a segurança do formulário.',
                cena: (
                    <MiniVideo x0="60%" y0="60%" x1="7.4%" y1="82.75%">
                        <TelaTermoCaixas docs="sim" lgpd="sim" captcha="animar" />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Para finalizar, clique em “Enviar formulário”.',
                cenaCel: <Cel x0="70%" y0="60%" x1={T.enviar.x} y1={T.enviar.y}><TermoCaixasCel docs="sim" lgpd="sim" captcha="sim" ativo aperta /><SucessoTermoCel /></Cel>,
                expl: 'Importante: o botão ficará azul somente quando todos os campos estiverem preenchidos e todas as opções estiverem marcadas.',
                cena: (
                    <MiniVideo x0="70%" y0="60%" x1="50%" y1="93.25%">
                        <TelaTermoCaixas docs="sim" lgpd="sim" captcha="sim" ativo aperta />
                        <SucessoTermo />
                    </MiniVideo>
                ),
            },
            {
                acao: 'Pronto! Guarde o e-mail de confirmação com seu número de registro.',
                cenaCel: <Cel semClique x0="70%" y0="90%" x1={T.registro.x} y1={T.registro.y}><TermoCaixasCel docs="sim" lgpd="sim" captcha="sim" ativo /><SucessoTermoCel fixo pulsa /></Cel>,
                expl: 'O número de registro comprova que você assinou os termos de compromisso.',
                cena: (
                    <MiniVideo semClique x0="75%" y0="90%" x1="52%" y1="66%">
                        <TelaTermoCaixas docs="sim" lgpd="sim" captcha="sim" ativo />
                        <SucessoTermo fixo pulsa />
                    </MiniVideo>
                ),
            },
        ],
    }],
};
