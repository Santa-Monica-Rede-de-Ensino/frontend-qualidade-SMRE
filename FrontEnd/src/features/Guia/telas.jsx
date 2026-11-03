// Telas simuladas dos mini vídeos do Guia; nomes e números são fictícios.
import React from 'react';
import Logo from '../../img/Portal_Func/SMRE_logo_negativo.png';
import Leozinho from '../../img/Portal_Func/leozinho-avatar.png';
import { atalhosVisiveis } from '../../shared/components/Atalhos';
import { itensMenuVisiveis } from '../../shared/components/homepage_menu';
import { areas as AREAS_QUALIDADE } from '../Qualidade/qualidade';

const pct = (n) => `${n}%`;

// Mesma regra da tela inicial real: até 3 atalhos numa coluna estreita; mais que isso, em duas.
export function layoutHome() {
  const lista = atalhosVisiveis();
  const cols = lista.length <= 3 ? 1 : 2;
  const linhas = Math.ceil(lista.length / cols);
  const area = { left: 4, top: 17, width: cols === 1 ? 21 : 38, height: 78 };
  const w = (area.width - (cols - 1) * 3) / cols;
  const h = (area.height - (linhas - 1) * 3) / linhas;
  const cartoes = lista.map((botao, i) => {
    const left = area.left + (i % cols) * (w + 3);
    const top = area.top + Math.floor(i / cols) * (h + 3);
    return { ...botao, left, top, w, h, cx: left + w / 2, cy: top + h / 2 };
  });
  return { cartoes, area, compacto: linhas > 2, comunicadosLeft: area.left + area.width + 3 };
}

export function centroAtalho(nome) {
  const cartao = layoutHome().cartoes.find((b) => b.nome === nome);
  return cartao ? { x: pct(cartao.cx), y: pct(cartao.cy) } : { x: '20%', y: '50%' };
}

export function NavCena() {
  return (
    <div className="c-nav">
      <img className="c-logo" src={Logo} alt="" />
      <span className="c-nav-dir">Olá, Leozinho! <img className="c-av" src={Leozinho} alt="" /><svg className="c-pontos" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg></span>
    </div>
  );
}

export function Voltar() {
  return (
    <div className="c-botoes"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></i><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></i></div>
  );
}

export function TelaHome({ hover, children }) {
  const { cartoes, compacto, comunicadosLeft } = layoutHome();
  return (
    <>
      {children}
      {cartoes.map(({ id, nome, Icon, left, top, w, h }) => (
        <div
          key={id}
          className={`c-atalho${compacto ? ' mini' : ''}${hover === nome ? ' anima-hover' : ''}`}
          style={{ left: pct(left), top: pct(top), width: pct(w), height: pct(h) }}
        >
          <Icon strokeWidth={1.5} />
          <b>{nome}</b>
        </div>
      ))}
      <div className="c-comunicados" style={{ left: pct(comunicadosLeft) }}>
        <b className="c-com-cab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>ÚLTIMOS COMUNICADOS</b>
        <div className="c-com-item" style={{ top: '9%' }}><b>Comunicação | Agenda da semana</b><small>22/09/2026</small></div>
        <div className="c-com-item" style={{ top: '20.5%' }}><b>Qualidade | Organograma atualizado</b><small>21/09/2026</small></div>
        <div className="c-com-item" style={{ top: '32%' }}><b>Gente & Gestão | Calendário de feriados</b><small>18/09/2026</small></div>
        <div className="c-com-item" style={{ top: '43.5%' }}><b>Eventos | Festa da primavera</b><small>15/09/2026</small></div>
        <div className="c-com-item" style={{ top: '55%' }}><b>TI | Atualização do Portal</b><small>12/09/2026</small></div>
      </div>
    </>
  );
}

export function TelaHomeRodape() {
  return (
    <>
      <div className="c-atalho" style={{ left: '4%', top: '14%', height: '30%' }}><b>GESTÃO DA QUALIDADE</b></div>
      <div className="c-atalho" style={{ left: '24.5%', top: '14%', height: '30%' }}><b>SISTEMA MONITORA</b></div>
      <div className="c-comunicados" style={{ top: '12%', bottom: '56%', borderRadius: '0 0 .8em .8em' }}><div className="c-com-texto" style={{ marginTop: '6%' }}><i className="linha"></i><i className="linha"></i><i className="linha" style={{ width: '60%' }}></i></div></div>
      <div className="c-rodape">
        <span className="c-rodape-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
        <span className="c-rodape-txt"><b>OUVIDORIA SMREDE</b><small>Canal de escuta ativa, transparente e acessível!</small></span>
        <span className="c-rodape-copy">© 2026 Santa Mônica Rede de Ensino — Portal do Colaborador</span>
      </div>
    </>
  );
}

export function TelaRamais() {
  return (
    <>
      <Voltar />
      <div className="c-titulo">Ramais Telefônicos</div>
      <div className="c-busca"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>Buscar por setor, responsável ou número do ramal...</div>
      <div className="c-abas" style={{ top: '33.5%' }}><span className="on">CENTRAL ADMINISTRATIVA</span><span>UNIDADES</span><span>BENTO RIBEIRO</span></div>
      <div className="c-lista" style={{ top: '38.6%', bottom: '5%' }}>
        <div className="lin cab" style={{ gridTemplateColumns: '38% 42% 20%' }}><span>SETOR</span><span>RESPONSÁVEL</span><span>RAMAL</span></div>
        <div className="lin" style={{ gridTemplateColumns: '38% 42% 20%' }}><b>Arquivo</b><span>Paulo</span><span className="azul">9630</span></div>
        <div className="lin" style={{ gridTemplateColumns: '38% 42% 20%' }}><b>Cobrança</b><span>Renata</span><span className="azul">9614</span></div>
        <div className="lin" style={{ gridTemplateColumns: '38% 42% 20%' }}><b>Comercial / SAC</b><span>Tiago / Vera</span><span className="azul">9572</span></div>
        <div className="lin" style={{ gridTemplateColumns: '38% 42% 20%' }}><b>Compras</b><span>Lúcia</span><span className="azul">9591</span></div>
        <div className="lin" style={{ gridTemplateColumns: '38% 42% 20%' }}><b>Contabilidade</b><span>Marcos / Sônia</span><span className="azul">9628</span></div>
        <div className="lin" style={{ gridTemplateColumns: '38% 42% 20%' }}><b>DGP</b><span>Helena</span><span className="azul">9602</span></div>
      </div>
    </>
  );
}

export function TelaRamaisUnidades() {
  return (
    <>
      <Voltar />
      <div className="c-titulo">Ramais Telefônicos</div>
      <div className="c-busca"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>Buscar por setor, responsável ou número do ramal...</div>
      <div className="c-abas" style={{ top: '33.5%' }}><span>CENTRAL ADMINISTRATIVA</span><span className="on">UNIDADES</span><span>BENTO RIBEIRO</span></div>
      <div className="c-lista" style={{ top: '38.6%', bottom: '5%' }}>
        <div className="lin cab" style={{ gridTemplateColumns: '30% 30% 18% 22%' }}><span>UNIDADE</span><span>GESTOR DE UNIDADE</span><span>RAMAL</span><span>TELEFONE</span></div>
        <div className="lin" style={{ gridTemplateColumns: '30% 30% 18% 22%' }}><b>Barra da Tijuca</b><span>Fábio</span><span className="azul">9408</span><span className="azul">2493-4554</span></div>
        <div className="lin" style={{ gridTemplateColumns: '30% 30% 18% 22%' }}><b>Bento Ribeiro</b><span>Clara / Ivo</span><span className="azul">9557</span><span className="azul">3369-9595</span></div>
        <div className="lin" style={{ gridTemplateColumns: '30% 30% 18% 22%' }}><b>Campo Grande</b><span>Rui</span><span className="azul">9407</span><span className="azul">3394-6740</span></div>
        <div className="lin" style={{ gridTemplateColumns: '30% 30% 18% 22%' }}><b>Cascadura</b><span>Luís / Gil</span><span className="azul">9405</span><span className="azul">2594-2836</span></div>
        <div className="lin" style={{ gridTemplateColumns: '30% 30% 18% 22%' }}><b>Freguesia</b><span>Otávio</span><span className="azul">9411</span><span className="azul">3116-4601</span></div>
        <div className="lin" style={{ gridTemplateColumns: '30% 30% 18% 22%' }}><b>Ilha do Governador</b><span>Sílvia</span><span className="azul">9410</span><span className="azul">2466-1600</span></div>
      </div>
    </>
  );
}

export function TelaRamaisBusca() {
  return (
    <>
      <Voltar />
      <div className="c-titulo">Ramais Telefônicos</div>
      <div className="c-busca" style={{ borderColor: 'var(--azul)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg><span className="c-digitado">Contabilidade</span></div>
      <div className="c-lista surge tarde" style={{ top: '34%', bottom: '40%', borderRadius: '.5em' }}>
        <div className="lin cab" style={{ gridTemplateColumns: '30% 30% 22% 18%' }}><span>SETOR</span><span>RESPONSÁVEL</span><span>UNIDADE</span><span>RAMAL</span></div>
        <div className="lin" style={{ gridTemplateColumns: '30% 30% 22% 18%' }}><b>Contabilidade</b><span>Marcos / Sônia</span><span>Central Administrativa</span><span className="azul">9628</span></div>
        <div className="lin" style={{ gridTemplateColumns: '30% 30% 22% 18%' }}><b>Contabilidade</b><span>Jorge</span><span>Central Administrativa</span><span className="azul">9627</span></div>
      </div>
    </>
  );
}

export function TelaAniversariantes() {
  return (
    <>
      <Voltar />
      <div className="c-titulo">Aniversariantes do Mês</div>
      <div className="c-filtro cinza" style={{ left: '4%', width: '60.5%' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>Buscar por nome ou setor...</div>
      <div className="c-filtro" style={{ left: '65.5%', width: '18.5%' }}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4h2a2 2 0 0 1 2 2v10h-6v-4h-4v4Z"/></svg>Todas as unidades (131)<svg className="fim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m6 9 6 6 6-6"/></svg></div>
      <div className="c-filtro" style={{ left: '85%', width: '11%' }}><svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="5" width="18" height="16" rx="2"/></svg>Setembro<svg className="fim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m6 9 6 6 6-6"/></svg></div>
      <div className="c-lista" style={{ top: '36%', bottom: '5%', borderRadius: '.5em' }}>
        <div className="lin cab" style={{ gridTemplateColumns: '14% 42% 28% 16%' }}><span>DIA</span><span>NOME</span><span>SETOR</span><span>UNIDADE</span></div>
        <div className="lin" style={{ gridTemplateColumns: '14% 42% 28% 16%' }}><b>01/09</b><b>Ana Souza</b><span>Secretaria</span><span>Barra</span></div>
        <div className="lin" style={{ gridTemplateColumns: '14% 42% 28% 16%' }}><b>02/09</b><b>Bruno Lima</b><span>Ensino Fundamental II</span><span>Cascadura</span></div>
        <div className="lin" style={{ gridTemplateColumns: '14% 42% 28% 16%' }}><b>03/09</b><b>Carla Nunes</b><span>Coordenação</span><span>Freguesia</span></div>
        <div className="lin" style={{ gridTemplateColumns: '14% 42% 28% 16%' }}><b>05/09</b><b>Diego Alves</b><span>Serviços Gerais</span><span>Taquara</span></div>
        <div className="lin" style={{ gridTemplateColumns: '14% 42% 28% 16%' }}><b>08/09</b><b>Elisa Rocha</b><span>Educação Infantil</span><span>Recreio</span></div>
        <div className="lin" style={{ gridTemplateColumns: '14% 42% 28% 16%' }}><b>11/09</b><b>Felipe Dias</b><span>Inspetoria</span><span>Madureira</span></div>
      </div>
    </>
  );
}

export function TelaContracheque({ aperta }) {
  return (
    <>
      <Voltar />
      <div className="c-lista" style={{ top: '30%', height: '45%', borderRadius: '.5em' }}>
        <div className="lin cab" style={{ gridTemplateColumns: '9% 9% 22% 16% 20% 12% 12%' }}><span>ID</span><span>AÇÃO</span><span>UNIDADE</span><span>MATRÍCULA</span><span>DOC</span><span>MÊS</span><span>ANO</span></div>
        <div className="lin" style={{ gridTemplateColumns: '9% 9% 22% 16% 20% 12% 12%' }}><span>10231</span><span><i className={aperta ? 'c-env anima-aperta' : 'c-env'}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></i></span><span>Central Administrativa</span><span>000123</span><span>Contracheque</span><span>08</span><span>2026</span></div>
        <div className="lin" style={{ gridTemplateColumns: '9% 9% 22% 16% 20% 12% 12%' }}><span>9874</span><span><i className="c-env"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></i></span><span>Central Administrativa</span><span>000123</span><span>Contracheque</span><span>07</span><span>2026</span></div>
        <div className="lin" style={{ gridTemplateColumns: '9% 9% 22% 16% 20% 12% 12%' }}><span>9520</span><span><i className="c-env"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></i></span><span>Central Administrativa</span><span>000123</span><span>Contracheque</span><span>06</span><span>2026</span></div>
      </div>
    </>
  );
}

// Grade real da Qualidade no computador: 6 quadros quadrados por linha.
export function TelaGrade({ hover }) {
  const w = (92 - 5 * 1.5) / 6;
  const h = w * 1.6;
  return (
    <>
      <Voltar />
      <div className="c-titulo">Gestão da Qualidade</div>
      {AREAS_QUALIDADE.map((area, i) => (
        <div
          key={area.id}
          className={hover === area.id ? 'c-area anima-hover' : 'c-area'}
          style={{ left: pct(4 + (i % 6) * (w + 1.5)), top: pct(28 + Math.floor(i / 6) * (h + 2.4)), width: pct(w), height: pct(h) }}
        >
          <b>{area.nome}</b>
          <span style={{ background: area.color }}>{area.tipo}</span>
        </div>
      ))}
    </>
  );
}

export function TelaArea() {
  return (
    <>
      <Voltar />
      <div className="c-faixa">TECNOLOGIA DA INFORMAÇÃO</div>
      <div className="c-abas centro" style={{ top: '41%' }}><span className="on">OBJETIVO</span><span>ORGANOGRAMA</span><span>DOCUMENTOS</span><span>SUBÁREAS</span></div>
      <div className="c-painel" style={{ top: '46.1%', bottom: '6%' }}><i className="linha"></i><i className="linha"></i><i className="linha"></i><i className="linha"></i><i className="linha" style={{ width: '60%' }}></i></div>
    </>
  );
}

export function TelaAreaDocs() {
  return (
    <>
      <Voltar />
      <div className="c-faixa">TECNOLOGIA DA INFORMAÇÃO</div>
      <div className="c-abas centro" style={{ top: '41%' }}><span>OBJETIVO</span><span>ORGANOGRAMA</span><span className="on">DOCUMENTOS</span><span>SUBÁREAS</span></div>
      <div className="c-painel" style={{ top: '46.1%', bottom: '4%' }}></div>
      <div className="c-busca" style={{ left: '8%', right: '8%', top: '49.5%', height: '5%' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>Pesquisar documento...</div>
      <div className="c-doc-cab"><span>PS.06-0.1 - Política de Privacidade</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m18 15-6-6-6 6"/></svg></div>
      <div className="c-doc-corpo"><i className="linha"></i><i className="linha" style={{ width: '55%' }}></i></div>
      <div className="c-btn-doc" style={{ top: '74%' }}>VISUALIZAR DOCUMENTO »</div>
      <div className="c-btn-doc" style={{ top: '81.5%' }}>FLUXO DO PROCESSO</div>
    </>
  );
}

// Atalhos do celular: duas colunas; a altura encolhe quando há mais de 4 atalhos.
function gradeFone() {
  const lista = atalhosVisiveis();
  const linhas = Math.ceil(lista.length / 2);
  const h = Math.min(17, (40 - (linhas - 1) * 2) / linhas);
  return { lista, linhas, h };
}

function topoComunicadosFone() {
  const { linhas, h } = gradeFone();
  return 21 + linhas * (h + 2) + 1;
}

function atalhosFone() {
  const { lista, linhas, h } = gradeFone();
  return lista.map(({ id, nome, Icon }, i) => (
    <div
      key={id}
      className={`f-atalho${linhas > 2 ? ' mini' : ''}`}
      style={{ left: i % 2 === 0 ? '5%' : '53%', top: pct(21 + Math.floor(i / 2) * (h + 2)), height: pct(h) }}
    >
      <Icon strokeWidth={1.6} />
      <b>{nome}</b>
    </div>
  ));
}

export function FonePortal({ children }) {
  return (
    <>
      <div className="f-status"><span>9:41</span><span>▮▮▮ ◔</span></div>
      <div className="f-chrome"><span className="f-url">🔒 maycon-mb.github.io/front…</span><svg className="f-pontos" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg></div>
      <div className="f-portal"><span>PORTAL DO COLABORADOR</span><img src={Leozinho} alt="" /></div>
      {atalhosFone()}
      <div className="f-com" style={{ top: pct(topoComunicadosFone()) }}><b>ÚLTIMOS COMUNICADOS</b><i className="linha"></i><i className="linha"></i><i className="linha"></i></div>
      {children}
    </>
  );
}

export function FoneInicio() {
  return (
    <div className="f-inicio">
      <div className="f-status" style={{ color: '#fff' }}><span>9:42</span><span>▮▮▮ ◔</span></div>
      <span className="f-app" style={{ left: '4.5%', top: '12%' }}><i style={{ background: '#34a853' }}></i><b>Telefone</b></span>
      <span className="f-app" style={{ left: '29.5%', top: '12%' }}><i style={{ background: '#fbbc04' }}></i><b>Mensagens</b></span>
      <span className="f-app" style={{ left: '54.5%', top: '12%' }}><i style={{ background: '#ea4335' }}></i><b>Câmera</b></span>
      <span className="f-app" style={{ left: '79.5%', top: '12%' }}><i style={{ background: '#4285f4' }}></i><b>Fotos</b></span>
      <span className="f-app" style={{ left: '4.5%', top: '29%' }}><i style={{ background: '#a142f4' }}></i><b>Agenda</b></span>
      <span className="f-app portal" style={{ left: '29.5%', top: '29%' }}><i><img src={Logo} alt="" /></i><b>Portal</b></span>
      <span className="f-app" style={{ left: '54.5%', top: '29%' }}><i style={{ background: '#24c1e0' }}></i><b>E-mail</b></span>
      <span className="f-app" style={{ left: '79.5%', top: '29%' }}><i style={{ background: '#f06292' }}></i><b>Relógio</b></span>
    </div>
  );
}

function atalhosNavegador() {
  const lista = atalhosVisiveis();
  const linhas = Math.ceil(lista.length / 2);
  const h = (64 - (linhas - 1) * 4) / linhas;
  return lista.map(({ id, nome }, i) => (
    <div key={id} className="c-atalho" style={{ left: i % 2 === 0 ? '4%' : '24%', top: pct(30 + Math.floor(i / 2) * (h + 4)), width: '17%', height: pct(h) }}>
      <b>{nome}</b>
    </div>
  ));
}

export function NavegadorPC() {
  return (
    <>
      <div className="c-guias"><span className="c-guia"><i></i>Portal do Colaborador</span></div>
      <div className="c-barra-end">
        <span className="icones"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg></span>
        <span className="c-url"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>maycon-mb.github.io/frontend-qualidade-SMRE</span>
      </div>
      <svg className="c-estrela" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <svg className="c-estrela cheia surge" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <div className="c-mini-nav"><span>PORTAL DO COLABORADOR</span><span>Olá, Leozinho!</span></div>
      {atalhosNavegador()}
      <div className="c-comunicados" style={{ top: '30%' }}><b className="c-com-cab" style={{ height: '12%' }}>ÚLTIMOS COMUNICADOS</b></div>
      <div className="c-popup surge"><strong>Favorito adicionado</strong><span>Nome</span><span className="campo">Portal do Colaborador</span><span>Pasta</span><span className="campo">Barra de favoritos</span><span className="botoes"><span>Remover</span><span className="azul">Concluído</span></span></div>
    </>
  );
}

export function MenuChrome({ className }) {
  return (
    <div className={className ? `f-menu ${className}` : 'f-menu'}><div>Nova guia</div><div>Nova guia anônima</div><div>Favoritos</div><div>Histórico</div><div>Downloads</div><div>Compartilhar…</div><div className="alvo">Adicionar à tela inicial</div><div>Configurações</div></div>
  );
}

export function MenuPontos({ destaque, className }) {
  return (
    <div className={className ? `c-drop ${className}` : 'c-drop'}>
      {itensMenuVisiveis().map(({ id, nome }) => (
        <div key={id} className={destaque === nome ? 'guia' : undefined}>{nome}</div>
      ))}
    </div>
  );
}

export function ComunicadoAberto() {
  return (
    <div className="c-com-aberto surge">
      <div className="c-com-item"><b>Comunicação | Agenda da semana</b><small>22/09/2026</small></div>
      <div className="c-banner">COMUNICADO</div>
      <div className="c-com-texto"><strong>Agenda da semana</strong><i className="linha"></i><i className="linha"></i><i className="linha" style={{ width: '70%' }}></i></div>
    </div>
  );
}

export function ToastEnviado() {
  return (
    <div className="c-toast surge"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></i><span>Comprovante enviado.</span></div>
  );
}

export function MenuMes() {
  return (
    <div className="c-menu surge" style={{ left: '76%', right: '4%', top: '33%' }}>
      <div className="c-menu-cab">MÊS</div>
      <div className="c-meses"><span>Janeiro</span><span>Fevereiro</span><span>Março</span><span>Abril</span><span>Maio</span><span>Junho</span><span>Julho</span><span>Agosto</span><span className="on">Setembro</span><span>Outubro</span><span>Novembro</span><span>Dezembro</span></div>
    </div>
  );
}

export function MenuUnidades() {
  return (
    <div className="c-menu surge" style={{ left: '65%', width: '23%', top: '33%' }}>
      <div className="c-menu-cab"><span>UNIDADES</span><span>16 DE 16</span></div>
      <div className="c-marca-lin"><i>✓</i>Todas as unidades<em>131</em></div>
      <div className="c-marca-lin"><i>✓</i>Central Administrativa<em>10</em></div>
      <div className="c-marca-lin"><i>✓</i>Barra<em>4</em></div>
      <div className="c-marca-lin"><i>✓</i>Bento Ribeiro<em>10</em></div>
      <div className="c-marca-lin"><i>✓</i>Campo Grande<em>8</em></div>
      <div className="c-marca-lin"><i>✓</i>Cascadura<em>9</em></div>
      <div className="c-menu-rodape"><span className="limpar">Limpar</span><span className="todas">Marcar todas</span></div>
    </div>
  );
}

export function JanelaPdf() {
  return (
    <div className="c-janela surge">
      <div className="c-abas-nav"><span>Portal do Colaborador</span><span className="on">PS.06-0.1-politica-de-privacidade.pdf</span></div>
      <div className="c-endereco"><span>maycon-mb.github.io/…/documentos/PS.06-0.1-politica-de-privacidade.pdf</span></div>
      <div className="c-janela-corpo"><div className="c-pdf"><strong>Política de Privacidade</strong><i className="linha"></i><i className="linha"></i><i className="linha"></i><i className="linha" style={{ width: '60%' }}></i><i className="linha"></i><i className="linha"></i></div></div>
    </div>
  );
}

export function JanelaMonitora() {
  return (
    <div className="c-janela surge">
      <div className="c-abas-nav"><span>Portal do Colaborador</span><span className="on">Sistema Monitora</span></div>
      <div className="c-endereco"><span>monitora.smrede.net.br</span></div>
      <div className="c-janela-corpo"><div className="c-monitora"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/><path d="m9 10 2 2 4-4"/></svg><b>SISTEMA MONITORA</b></div></div>
    </div>
  );
}
