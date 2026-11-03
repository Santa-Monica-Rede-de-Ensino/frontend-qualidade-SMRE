// Telas simuladas do Guia no celular; nomes e números são fictícios.
import React from 'react';
import Logo from '../../img/Portal_Func/SMRE_logo_negativo.png';
import Leozinho from '../../img/Portal_Func/leozinho-avatar.png';
import { atalhosVisiveis } from '../../shared/components/Atalhos';
import { itensMenuVisiveis } from '../../shared/components/homepage_menu';
import './telasCel.css';

const pct = (n) => `${n}%`;
// Cena 9:16 com fonte de 5% da largura: 1em vale 2,8125% da altura.
const alturaEm = (em) => em * 2.8125;

const NAV_H = 9;
const LOGO = { left: 8, width: 12 };
const HAMB = { right: 6, width: 11, height: alturaEm(1.7) };
const SAUDACAO = { left: 8, top: 11, height: 5.5 };
const PONTOS_Y = 22.5;
const MENU_TOP = 27;
const CARTAO = { top: 11, w: 42, h: 18.7, gap: 2, colunas: [5, 53] };
const CAB_EM = 2.5;
const ITEM_EM = 4.3;
const BLOCO_TOP = 22;
const RODAPE_TOP = 72;
const OUVIDORIA_TOP = 76;

const COMUNICADOS = [
  { titulo: 'Comunicação Interna | Agenda da semana e avisos gerais', data: '22/09/2026' },
  { titulo: 'Qualidade | Nosso organograma está atualizado!', data: '21/09/2026' },
  { titulo: 'Gente & Gestão | Calendário de feriados do segundo semestre', data: '18/09/2026' },
  { titulo: 'Eventos | Convite: Festa da primavera nas unidades', data: '15/09/2026' },
  { titulo: 'TI | Atualização do Portal do Colaborador', data: '12/09/2026' },
];

export const ALVOS_CEL = {
  hamburguer: { x: pct(100 - HAMB.right - HAMB.width / 2), y: pct(NAV_H / 2) },
  pontos: { x: '50%', y: pct(PONTOS_Y) },
  logo: { x: pct(LOGO.left + LOGO.width / 2), y: pct(NAV_H / 2) },
  comunicado1: { x: '50%', y: pct(+(BLOCO_TOP + alturaEm(CAB_EM) + alturaEm(ITEM_EM) / 2).toFixed(2)) },
  saudacaoBox: { left: SAUDACAO.left - 3, top: SAUDACAO.top - 0.5, width: 45, height: SAUDACAO.height + 1 },
  ouvidoriaBox: { left: 3, top: OUVIDORIA_TOP - 1.5, width: 94, height: alturaEm(2.5) + 3 },
};

const Sino = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);

const Seta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const CabecalhoComunicados = () => (
  <div className="mc-com-cab"><Sino /><b>ÚLTIMOS COMUNICADOS</b></div>
);

const ItensComunicados = () => COMUNICADOS.map(({ titulo, data }) => (
  <div key={titulo} className="mc-com-item"><span className="mc-com-txt"><b>{titulo}</b><small>{data}</small></span><Seta /></div>
));

function Cartao({ nome, Icon, left, top, w, h, hover }) {
  return (
    <div
      className={hover ? 'mc-atalho anima-hover' : 'mc-atalho'}
      style={{ left: pct(left), top: pct(top), width: pct(w), height: pct(h) }}
    >
      <Icon strokeWidth={1.6} />
      <b>{nome}</b>
    </div>
  );
}

export function layoutHomeCel() {
  const cartoes = atalhosVisiveis().map((botao, i) => {
    const left = CARTAO.colunas[i % 2];
    const top = CARTAO.top + Math.floor(i / 2) * (CARTAO.h + CARTAO.gap);
    return { ...botao, left, top, w: CARTAO.w, h: CARTAO.h, cx: left + CARTAO.w / 2, cy: top + CARTAO.h / 2 };
  });
  const linhas = Math.ceil(cartoes.length / 2);
  const area = { left: 5, top: CARTAO.top, width: 90, height: linhas * CARTAO.h + (linhas - 1) * CARTAO.gap };
  return { cartoes, area };
}

export function centroAtalhoCel(nome) {
  const cartao = layoutHomeCel().cartoes.find((b) => b.nome === nome);
  return cartao ? { x: pct(cartao.cx), y: pct(cartao.cy) } : { x: '50%', y: '30%' };
}

export function NavCel() {
  return (
    <>
      <div className="mc-nav" style={{ height: pct(NAV_H) }}></div>
      <img className="mc-logo" src={Logo} alt="" style={{ left: pct(LOGO.left), width: pct(LOGO.width) }} />
      <b className="mc-nav-tit" style={{ left: pct(LOGO.left + LOGO.width + 2), height: pct(NAV_H) }}>PORTAL DO COLABORADOR</b>
      <span
        className="mc-hamb"
        style={{ right: pct(HAMB.right), width: pct(HAMB.width), height: pct(HAMB.height), top: pct((NAV_H - HAMB.height) / 2) }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
      </span>
    </>
  );
}

export function TopoAbertoCel({ className }) {
  return (
    <div className={className ? `mc-topo ${className}` : 'mc-topo'}>
      <div className="mc-topo-fundo" style={{ top: pct(NAV_H), height: pct(MENU_TOP - 1 - NAV_H) }}></div>
      <div className="mc-saudacao" style={{ left: pct(SAUDACAO.left), top: pct(SAUDACAO.top), height: pct(SAUDACAO.height) }}>
        <b>Olá, Leozinho!</b><img src={Leozinho} alt="" />
      </div>
      <div className="mc-divisor"></div>
      <svg className="mc-pontos" style={{ top: pct(PONTOS_Y) }} viewBox="0 0 24 8" fill="currentColor"><circle cx="4" cy="4" r="2.6"/><circle cx="12" cy="4" r="2.6"/><circle cx="20" cy="4" r="2.6"/></svg>
    </div>
  );
}

export function MenuCel({ destaque, className }) {
  return (
    <div className={className ? `mc-menu ${className}` : 'mc-menu'} style={{ top: pct(MENU_TOP) }}>
      {itensMenuVisiveis().map(({ id, nome, Icon }) => (
        <div key={id} className={destaque === nome ? 'mc-menu-lin on' : 'mc-menu-lin'}>
          <Icon strokeWidth={1.8} />{nome}
        </div>
      ))}
    </div>
  );
}

export function HomeCel({ hover, children }) {
  const { cartoes, area } = layoutHomeCel();
  const blocoTop = area.top + area.height + 3;
  return (
    <>
      {children}
      {cartoes.map((c) => <Cartao key={c.id} {...c} hover={hover === c.nome} />)}
      {blocoTop + alturaEm(CAB_EM) <= 100 && (
        <div className="mc-com" style={{ top: pct(blocoTop), bottom: '-10%' }}>
          <CabecalhoComunicados />
          <ItensComunicados />
        </div>
      )}
    </>
  );
}

export function HomeComunicadosCel() {
  const { cartoes } = layoutHomeCel();
  const ultimaLinha = cartoes.slice(Math.floor((cartoes.length - 1) / 2) * 2);
  const topo = BLOCO_TOP - CARTAO.gap - CARTAO.h;
  return (
    <>
      {ultimaLinha.map((c) => <Cartao key={c.id} {...c} top={topo} />)}
      <div className="mc-com" style={{ top: pct(BLOCO_TOP) }}>
        <CabecalhoComunicados />
        <ItensComunicados />
      </div>
    </>
  );
}

export function ComunicadoAbertoCel() {
  const { titulo, data } = COMUNICADOS[0];
  return (
    <div
      className="mc-com-aberto surge"
      style={{ top: pct(BLOCO_TOP + alturaEm(CAB_EM)), height: pct(alturaEm(COMUNICADOS.length * ITEM_EM)) }}
    >
      <div className="mc-com-item"><span className="mc-com-txt"><b>{titulo}</b><small>{data}</small></span><Seta /></div>
      <div className="mc-banner"><span>COMUNICADO</span></div>
      <div className="mc-com-corpo">
        <strong>Agenda da semana</strong>
        <i className="linha"></i><i className="linha"></i><i className="linha"></i><i className="linha" style={{ width: '70%' }}></i>
      </div>
    </div>
  );
}

export function HomeRodapeCel() {
  return (
    <>
      <div className="mc-com fim" style={{ top: '-8%', bottom: pct(100 - (RODAPE_TOP - 10)) }}>
        <ItensComunicados />
      </div>
      <div className="mc-rodape" style={{ top: pct(RODAPE_TOP) }}></div>
      <div className="mc-ouv" style={{ top: pct(OUVIDORIA_TOP), height: pct(alturaEm(2.5)) }}>
        <span className="mc-ouv-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
        <span className="mc-ouv-txt"><b>OUVIDORIA SMREDE</b><small>Canal de escuta ativa, transparente e acessível!</small></span>
      </div>
      <div className="mc-rodape-lin" style={{ top: '89%' }}></div>
      <div className="mc-rodape-copy" style={{ top: '91%', height: '6%' }}>© 2026 Santa Mônica Rede de Ensino — Portal do Colaborador</div>
    </>
  );
}
