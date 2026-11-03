import React from 'react';
import { Star, LayoutDashboard, Compass, LayoutGrid } from 'lucide-react';
import MiniVideo, { Tela, Fone, Destaque } from './MiniVideo';
import {
    NavCena, TelaHome, TelaHomeRodape, TelaAniversariantes,
    TelaContracheque, TelaGrade, TelaArea, FonePortal, FoneInicio, NavegadorPC, MenuChrome,
    MenuPontos, ComunicadoAberto, ToastEnviado, MenuMes, MenuUnidades, layoutHome, centroAtalho,
} from './telas';
import {
    NavCel, TopoAbertoCel, MenuCel, HomeCel, HomeComunicadosCel, ComunicadoAbertoCel, HomeRodapeCel,
    layoutHomeCel, centroAtalhoCel, ALVOS_CEL,
} from './telasCel';
import {
    AniversariantesCel, MenuMesCel, MenuUnidadesCel, ContrachequeCel, MarcaLinhaCel, ToastCel, GradeCel, AreaCel,
    ALVOS_CEL2,
} from './telasCel2';
import { TEMA_TERMO } from './conteudoTermo';

const Cel = (props) => <MiniVideo cel {...props} />;
const caixa = (b, folga = 0) => ({
    left: `${b.left - folga}%`, top: `${b.top - folga}%`, width: `${b.width + 2 * folga}%`, height: `${b.height + 2 * folga}%`,
});
const centro = (b) => ({ x: `${b.left + b.width / 2}%`, y: `${b.top + b.height / 2}%` });
const AREA_CEL = layoutHomeCel().area;
const CONTRACHEQUE_CEL = centroAtalhoCel('CONTRACHEQUE');
const ANIVERSARIANTES_CEL = centroAtalhoCel('ANIVERSARIANTES');

// Posições calculadas a partir dos atalhos reais do ambiente (beta mostra mais atalhos que produção).
const AREA_ATALHOS = layoutHome().area;
const CONTRACHEQUE = centroAtalho('CONTRACHEQUE');
const ANIVERSARIANTES = centroAtalho('ANIVERSARIANTES');

export const TEMAS = [
    {
        id: 'primeiro-acesso',
        titulo: 'Primeiro Acesso',
        sub: 'Tenha acesso ao Portal de forma rápida e prática.',
        qtd: '3 passos',
        Icone: Star,
        grupos: [{
            passos: [
                {
                    acao: 'No computador, clique na estrela da barra de endereço.',
                    expl: 'Salve o Portal nos favoritos do navegador e acesse com apenas um clique.',
                    cena: <MiniVideo x0="50%" y0="70%" x1="89.2%" y1="11.5%"><NavegadorPC /></MiniVideo>,
                },
                {
                    acao: 'No celular, abra o menu do navegador.',
                    cenaCel: <Cel x0="50%" y0="80%" x1="90%" y1="8%"><Fone cheio><Tela><FonePortal /></Tela><MenuChrome className="surge" /></Fone></Cel>,
                    expl: 'No Chrome, são os três pontinhos no canto superior direito, ao lado do endereço.',
                    cena: (
                        <MiniVideo x0="50%" y0="80%" x1="62%" y1="11.4%">
                            <Fone><Tela><FonePortal /></Tela><MenuChrome className="surge" /></Fone>
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Toque em “Adicionar à tela inicial”.',
                    cenaCel: <Cel x0="50%" y0="85%" x1="64%" y1="54.5%"><Fone cheio><Tela fase="antes"><FonePortal><MenuChrome /></FonePortal></Tela><Tela fase="depois"><FoneInicio /></Tela><Destaque tarde style={{ left: '25%', top: '26.5%', width: '25%', height: '16%' }} /></Fone></Cel>,
                    expl: 'Pronto! Agora o Portal está junto aos seus aplicativos, a um clique de distância.',
                    cena: (
                        <MiniVideo x0="45%" y0="85%" x1="54.5%" y1="54.2%">
                            <Fone>
                                <Tela fase="antes"><FonePortal><MenuChrome /></FonePortal></Tela>
                                <Tela fase="depois"><FoneInicio /></Tela>
                                <Destaque tarde style={{ left: '25%', top: '26.5%', width: '25%', height: '16%' }} />
                            </Fone>
                        </MiniVideo>
                    ),
                },
            ],
        }],
    },
    {
        id: 'conhecendo',
        titulo: 'Conhecendo o Portal',
        sub: 'Explore a tela inicial!',
        qtd: '4 passos',
        Icone: LayoutDashboard,
        grupos: [{
            passos: [
                {
                    acao: 'No topo da tela, você encontra uma saudação personalizada e a sua foto.',
                    cenaCel: <Cel x0="50%" y0="70%" x1={ALVOS_CEL.hamburguer.x} y1={ALVOS_CEL.hamburguer.y}><Tela><HomeCel /></Tela><NavCel /><TopoAbertoCel className="surge" /><Destaque tarde style={caixa(ALVOS_CEL.saudacaoBox, 1)} /></Cel>,
                    expl: 'O “Olá, Leozinho!” confirma que você entrou com a sua conta.',
                    cena: (
                        <MiniVideo semClique x0="50%" y0="70%" x1="91.5%" y1="6%">
                            <Tela><TelaHome /></Tela><NavCena />
                            <Destaque style={{ left: '70%', top: '1.5%', width: '24%', height: '9%' }} />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'À esquerda, você encontra os atalhos que facilitam a sua navegação.',
                    cenaCel: <Cel semClique x0="50%" y0="90%" x1={centro(AREA_CEL).x} y1={centro(AREA_CEL).y}><Tela><HomeCel /></Tela><NavCel /><Destaque style={caixa(AREA_CEL, 1.5)} /></Cel>,
                    expl: 'Por meio dos atalhos, você acessa facilmente as opções do menu.',
                    cena: (
                        <MiniVideo
                            semClique
                            x0="70%"
                            y0="85%"
                            x1={`${AREA_ATALHOS.left + AREA_ATALHOS.width / 2}%`}
                            y1={`${AREA_ATALHOS.top + AREA_ATALHOS.height / 2}%`}
                        >
                            <Tela><TelaHome /></Tela><NavCena />
                            <Destaque
                                style={{
                                    left: `${AREA_ATALHOS.left - 1.5}%`,
                                    top: `${AREA_ATALHOS.top - 1.5}%`,
                                    width: `${AREA_ATALHOS.width + 3}%`,
                                    height: `${AREA_ATALHOS.height + 3}%`,
                                }}
                            />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'À direita, você encontra os comunicados mais recentes.',
                    cenaCel: <Cel x0="50%" y0="90%" x1={ALVOS_CEL.comunicado1.x} y1={ALVOS_CEL.comunicado1.y}><Tela><HomeComunicadosCel /></Tela><NavCel /><ComunicadoAbertoCel /></Cel>,
                    expl: 'Clique no título para visualizar o comunicado completo. Para fechá-lo, clique novamente.',
                    cena: (
                        <MiniVideo x0="30%" y0="85%" x1="62%" y1="28.5%">
                            <Tela><TelaHome /></Tela><NavCena /><ComunicadoAberto />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'No rodapé da página, você encontra o acesso à Ouvidoria SMREDE.',
                    cenaCel: <Cel semClique x0="50%" y0="30%" x1={centro(ALVOS_CEL.ouvidoriaBox).x} y1={centro(ALVOS_CEL.ouvidoriaBox).y}><Tela><HomeRodapeCel /></Tela><NavCel /><Destaque style={caixa(ALVOS_CEL.ouvidoriaBox, 1)} /></Cel>,
                    expl: 'Ao final de todas as páginas, você encontra a Ouvidoria SMREDE, um canal de escuta aberto a todos.',
                    cena: (
                        <MiniVideo semClique x0="60%" y0="30%" x1="12%" y1="66%">
                            <Tela><TelaHomeRodape /></Tela><NavCena />
                            <Destaque style={{ left: '2%', top: '55%', width: '38%', height: '21%' }} />
                        </MiniVideo>
                    ),
                },
            ],
        }],
    },
    {
        id: 'navegar',
        titulo: 'Como Navegar',
        sub: 'Explore o Portal de forma simples e intuitiva.',
        qtd: '3 passos',
        Icone: Compass,
        grupos: [{
            passos: [
                {
                    acao: 'Clique nos três pontinhos e confira as opções do menu.',
                    cenaCel: <Cel x0="50%" y0="85%" x1={ALVOS_CEL.pontos.x} y1={ALVOS_CEL.pontos.y}><Tela><HomeCel /></Tela><NavCel /><TopoAbertoCel /><MenuCel destaque="GUIA DO PORTAL" className="surge" /></Cel>,
                    expl: 'No canto superior direito, você encontra o menu do Portal e também o acesso a este Guia.',
                    cena: (
                        <MiniVideo x0="55%" y0="85%" x1="95.35%" y1="6%">
                            <Tela><TelaHome /></Tela><NavCena /><MenuPontos destaque="GUIA DO PORTAL" className="surge" />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Para retornar à página anterior, clique na seta.',
                    cenaCel: <Cel x0="60%" y0="85%" x1={ALVOS_CEL2.voltar.x} y1={ALVOS_CEL2.voltar.y}><Tela fase="antes"><AreaCel /></Tela><Tela fase="depois"><GradeCel /></Tela><NavCel /></Cel>,
                    expl: 'Nas páginas internas, ela fica sempre disponível logo abaixo do cabeçalho.',
                    cena: (
                        <MiniVideo x0="60%" y0="85%" x1="6.25%" y1="19.6%">
                            <Tela fase="antes"><TelaArea /></Tela><Tela fase="depois"><TelaGrade /></Tela><NavCena />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Para voltar ao início, clique na casinha ou na logo do Portal.',
                    cenaCel: <Cel x0="60%" y0="85%" x1={ALVOS_CEL2.inicio.x} y1={ALVOS_CEL2.inicio.y}><Tela fase="antes"><AreaCel /></Tela><Tela fase="depois"><HomeCel /></Tela><NavCel /></Cel>,
                    expl: 'Você encontra o ícone ao lado da seta.',
                    cena: (
                        <MiniVideo x0="65%" y0="85%" x1="12%" y1="19.6%">
                            <Tela fase="antes"><TelaArea /></Tela><Tela fase="depois"><TelaHome /></Tela><NavCena />
                        </MiniVideo>
                    ),
                },
            ],
        }],
    },
    {
        id: 'funcionalidades',
        titulo: 'Principais Funcionalidades',
        sub: 'Contracheque e aniversariantes',
        qtd: '2 temas',
        Icone: LayoutGrid,
        grupos: [
            {
                titulo: 'CONTRACHEQUE',
                passos: [
                    {
                        acao: 'Para acessar, clique em Contracheque na tela inicial.',
                    cenaCel: <Cel x0="50%" y0="90%" x1={CONTRACHEQUE_CEL.x} y1={CONTRACHEQUE_CEL.y}><Tela fase="antes"><HomeCel hover="CONTRACHEQUE" /></Tela><Tela fase="depois"><ContrachequeCel /></Tela><NavCel /></Cel>,
                        expl: 'Ao clicar, você verá a lista dos seus comprovantes.',
                        cena: (
                            <MiniVideo x0="70%" y0="85%" x1={CONTRACHEQUE.x} y1={CONTRACHEQUE.y}>
                                <Tela fase="antes"><TelaHome hover="CONTRACHEQUE" /></Tela>
                                <Tela fase="depois"><TelaContracheque /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Localize o mês que você deseja consultar.',
                    cenaCel: <Cel x0="50%" y0="85%" x1={ALVOS_CEL2.mesLinha.x} y1={ALVOS_CEL2.mesLinha.y}><Tela><ContrachequeCel /></Tela><NavCel /><MarcaLinhaCel /></Cel>,
                        expl: 'Cada linha corresponde a um comprovante. Nas duas últimas colunas, você encontra o mês e o ano de referência.',
                        cena: (
                            <MiniVideo x0="45%" y0="88%" x1="79.4%" y1="45%">
                                <Tela><TelaContracheque /></Tela><NavCena />
                                <div className="anima-marca" style={{ left: '4%', top: '39%', width: '92%', height: '12%' }} />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Na linha do comprovante desejado, clique no ícone da cartinha.',
                    cenaCel: <Cel x0="60%" y0="85%" x1={ALVOS_CEL2.envelope.x} y1={ALVOS_CEL2.envelope.y}><Tela><ContrachequeCel aperta /></Tela><NavCel /><ToastCel /></Cel>,
                        expl: 'Pronto! O comprovante será enviado para o seu e-mail cadastrado e a mensagem “Comprovante enviado.” aparecerá na tela.',
                        cena: (
                            <MiniVideo x0="55%" y0="88%" x1="16.4%" y1="45%">
                                <Tela><TelaContracheque aperta /></Tela><NavCena /><ToastEnviado />
                            </MiniVideo>
                        ),
                    },
                ],
            },
            {
                titulo: 'ANIVERSARIANTES',
                passos: [
                    {
                        acao: 'Para acessar, clique em Aniversariantes na tela inicial.',
                    cenaCel: <Cel x0="50%" y0="90%" x1={ANIVERSARIANTES_CEL.x} y1={ANIVERSARIANTES_CEL.y}><Tela fase="antes"><HomeCel hover="ANIVERSARIANTES" /></Tela><Tela fase="depois"><AniversariantesCel /></Tela><NavCel /></Cel>,
                        expl: 'A lista abre automaticamente no mês atual, exibindo todas as unidades.',
                        cena: (
                            <MiniVideo x0="60%" y0="88%" x1={ANIVERSARIANTES.x} y1={ANIVERSARIANTES.y}>
                                <Tela fase="antes"><TelaHome hover="ANIVERSARIANTES" /></Tela>
                                <Tela fase="depois"><TelaAniversariantes /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Para consultar outro mês, é bem simples.',
                    cenaCel: <Cel x0="50%" y0="85%" x1={ALVOS_CEL2.mes.x} y1={ALVOS_CEL2.mes.y}><Tela><AniversariantesCel /></Tela><NavCel /><MenuMesCel /></Cel>,
                        expl: 'Clique no mês atual e selecione o mês desejado.',
                        cena: (
                            <MiniVideo x0="50%" y0="80%" x1="90.5%" y1="28.5%">
                                <Tela><TelaAniversariantes /></Tela><NavCena /><MenuMes />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Prefere visualizar somente a sua Unidade?',
                    cenaCel: <Cel x0="50%" y0="85%" x1={ALVOS_CEL2.unidades.x} y1={ALVOS_CEL2.unidades.y}><Tela><AniversariantesCel /></Tela><NavCel /><MenuUnidadesCel /></Cel>,
                        expl: 'Clique no botão “Todas as unidades” e selecione apenas a unidade que deseja visualizar.',
                        cena: (
                            <MiniVideo x0="45%" y0="85%" x1="74.75%" y1="28.5%">
                                <Tela><TelaAniversariantes /></Tela><NavCena /><MenuUnidades />
                            </MiniVideo>
                        ),
                    },
                ],
            },
        ],
    },
    TEMA_TERMO,
];
