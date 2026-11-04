// Telas simuladas do Portal no celular (cena 9:16); nomes e números são fictícios.
import React from 'react';
import { areas as AREAS_QUALIDADE } from '../Qualidade/qualidade';
import './telasCel2.css';

const pct = (n) => `${+n.toFixed(2)}%`;

// Altura em % da cena vira largura em % multiplicando por 16/9 (cena 9:16).
const PROPORCAO = 16 / 9;
const MARGEM = 6;

const BARRA = { top: 10.5, h: 5 };
const BTN_W = BARRA.h * PROPORCAO;
const BTN_VOLTAR_LEFT = MARGEM;
const BTN_INICIO_LEFT = BTN_VOLTAR_LEFT + BTN_W + 2.5;
const TITULO_LEFT = BTN_INICIO_LEFT + BTN_W + 3.5;

const FILTRO_H = 5.5;
const BUSCA_TOP = 18;
const UNIDADES_TOP = 25;
const MES_TOP = 32;
const TABELA_TOP = 40;

const CC = { left: 4, width: 92, top: 18, cabH: 5, linhaH: 6.5 };
const CC_COLS = [16, 16, 36, 14, 18];
const CC_LINHA1_TOP = CC.top + CC.cabH;
const centroColuna = (i) => {
  const antes = CC_COLS.slice(0, i).reduce((a, b) => a + b, 0);
  return CC.left + (CC.width * (antes + CC_COLS[i] / 2)) / 100;
};

const CARD_W = 38.5;
const CARD_GAP_X = 2.6;
const CARD_H = CARD_W / PROPORCAO;
const CARD_GAP_Y = 1.6;
const GRADE_TOP = 18;
const GRADE_LEFT = (100 - 2 * CARD_W - CARD_GAP_X) / 2;

export const ALVOS_CEL2 = {
  voltar: { x: pct(BTN_VOLTAR_LEFT + BTN_W / 2), y: pct(BARRA.top + BARRA.h / 2) },
  inicio: { x: pct(BTN_INICIO_LEFT + BTN_W / 2), y: pct(BARRA.top + BARRA.h / 2) },
  mes: { x: '50%', y: pct(MES_TOP + FILTRO_H / 2) },
  unidades: { x: '50%', y: pct(UNIDADES_TOP + FILTRO_H / 2) },
  envelope: { x: pct(centroColuna(1)), y: pct(CC_LINHA1_TOP + CC.linhaH / 2) },
  mesLinha: { x: pct(centroColuna(3)), y: pct(CC_LINHA1_TOP + CC.linhaH / 2) },
};

const IcSeta = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const IcCasa = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 2.5 11.2a.8.8 0 0 0 .5 1.4H5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-7.4h2a.8.8 0 0 0 .5-1.4Z"/></svg>;
const IcBusca = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>;
const IcPredio = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4h2a2 2 0 0 1 2 2v10h-6v-4h-4v4Z"/></svg>;
const IcCalendario = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2Zm-2 7v11h14V9Z"/></svg>;
const IcSeletor = () => <svg className="mn-fim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="m6 9 6 6 6-6"/></svg>;
const IcCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
const IcEnvelope = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;

export function BarraVoltarCel({ titulo }) {
  const alto = { top: pct(BARRA.top), height: pct(BARRA.h), width: pct(BTN_W) };
  return (
    <>
      <i className="mn-btn" style={{ ...alto, left: pct(BTN_VOLTAR_LEFT) }}><IcSeta /></i>
      <i className="mn-btn" style={{ ...alto, left: pct(BTN_INICIO_LEFT) }}><IcCasa /></i>
      {titulo && <b className="mn-titulo" style={{ top: pct(BARRA.top), height: pct(BARRA.h), left: pct(TITULO_LEFT) }}>{titulo}</b>}
    </>
  );
}

const ANIVERSARIANTES = [
  ['01/09', 'Ana Souza', 'Barra', 'Secretaria'],
  ['02/09', 'Bruno Lima', 'Cascadura', 'Ensino Fundamental II'],
  ['03/09', 'Carla Nunes', 'Freguesia', 'Coordenação'],
  ['05/09', 'Diego Alves', 'Taquara', 'Serviços Gerais'],
  ['08/09', 'Elisa Rocha', 'Recreio', 'Educação Infantil'],
  ['11/09', 'Felipe Dias', 'Madureira', 'Inspetoria'],
  ['12/09', 'Gabriela Melo', 'Bento Ribeiro', 'Biblioteca'],
];

const filtro = (top) => ({ left: pct(MARGEM), right: pct(MARGEM), top: pct(top), height: pct(FILTRO_H) });

export function AniversariantesCel() {
  return (
    <>
      <BarraVoltarCel titulo="Aniversariantes do Mês" />
      <div className="mn-filtro cinza" style={filtro(BUSCA_TOP)}><IcBusca />Buscar por nome ou setor...</div>
      <div className="mn-filtro" style={filtro(UNIDADES_TOP)}><IcPredio />Todas as unidades (131)<IcSeletor /></div>
      <div className="mn-filtro" style={filtro(MES_TOP)}><IcCalendario />Setembro<IcSeletor /></div>
      <div className="mn-tabela" style={{ left: pct(MARGEM), right: pct(MARGEM), top: pct(TABELA_TOP), bottom: 0 }}>
        <div className="mn-niver cab"><span>DIA</span><span>NOME</span><span>SETOR</span></div>
        {ANIVERSARIANTES.map(([dia, nome, unidade, setor]) => (
          <div key={nome} className="mn-niver"><b>{dia}</b><span><b>{nome}</b><small>{unidade}</small></span><span>{setor}</span></div>
        ))}
      </div>
    </>
  );
}

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function MenuMesCel() {
  return (
    <div className="mn-menu surge" style={{ left: pct(MARGEM), right: pct(MARGEM), top: pct(MES_TOP + FILTRO_H + 1) }}>
      <div className="mn-menu-cab"><span>MÊS</span></div>
      <div className="mn-meses">
        {MESES.map((mes) => <span key={mes} className={mes === 'Setembro' ? 'on' : undefined}>{mes}</span>)}
      </div>
    </div>
  );
}

const UNIDADES = [['Todas as unidades', 131], ['Central Administrativa', 10], ['Barra', 4], ['Bento Ribeiro', 10], ['Campo Grande', 8], ['Cascadura', 9]];

export function MenuUnidadesCel() {
  return (
    <div className="mn-menu surge" style={{ left: pct(MARGEM), right: pct(MARGEM), top: pct(UNIDADES_TOP + FILTRO_H + 1) }}>
      <div className="mn-menu-cab"><span>UNIDADES</span><span>16 DE 16</span></div>
      {UNIDADES.map(([nome, total], i) => (
        <div key={nome} className={i === 0 ? 'mn-marca-lin todas' : 'mn-marca-lin'}><i><IcCheck /></i>{nome}<em>{total}</em></div>
      ))}
      <div className="mn-menu-rodape"><span className="limpar">Limpar</span><span className="marcar">Marcar todas</span></div>
    </div>
  );
}

const CONTRACHEQUES = [['10231', '08'], ['9874', '07'], ['9520', '06']];
const colunasCc = CC_COLS.map((c) => `${c}%`).join(' ');

export function ContrachequeCel({ aperta }) {
  const faixa = (top, h) => ({ left: pct(CC.left), width: pct(CC.width), top: pct(top), height: pct(h), gridTemplateColumns: colunasCc });
  return (
    <>
      <BarraVoltarCel />
      <div className="mn-cc cab" style={faixa(CC.top, CC.cabH)}><span>ID</span><span>AÇÃO</span><span>UNIDADE</span><span>MÊS</span><span>ANO</span></div>
      {CONTRACHEQUES.map(([id, mes], i) => (
        <div key={id} className={i === CONTRACHEQUES.length - 1 ? 'mn-cc ultima' : 'mn-cc'} style={faixa(CC_LINHA1_TOP + i * CC.linhaH, CC.linhaH)}>
          <span>{id}</span>
          <span><i className={aperta && i === 0 ? 'mn-env anima-aperta' : 'mn-env'}><IcEnvelope /></i></span>
          <span>Central Administrativa</span>
          <span>{mes}</span>
          <span>2026</span>
        </div>
      ))}
    </>
  );
}

export function MarcaLinhaCel() {
  return <div className="anima-marca" style={{ left: pct(CC.left), width: pct(CC.width), top: pct(CC_LINHA1_TOP), height: pct(CC.linhaH) }} />;
}

export function ToastCel() {
  return (
    <div className="mn-toast surge" style={{ left: pct(MARGEM), right: pct(MARGEM), top: '11%' }}>
      <i><IcCheck /></i><span>Comprovante enviado.</span><em />
    </div>
  );
}

export function GradeCel({ hover }) {
  return (
    <>
      <BarraVoltarCel titulo="Gestão da Qualidade" />
      {AREAS_QUALIDADE.map((area, i) => {
        const top = GRADE_TOP + Math.floor(i / 2) * (CARD_H + CARD_GAP_Y);
        if (top >= 100) return null;
        return (
          <div
            key={area.id}
            className={hover === area.id ? 'mn-card anima-hover' : 'mn-card'}
            style={{ left: pct(GRADE_LEFT + (i % 2) * (CARD_W + CARD_GAP_X)), top: pct(top), width: pct(CARD_W), height: pct(CARD_H) }}
          >
            <b>{area.nome}</b>
            <span style={{ background: area.color }}>{area.tipo}</span>
          </div>
        );
      })}
    </>
  );
}

export function AreaCel() {
  return (
    <>
      <BarraVoltarCel />
      <div className="mn-faixa" style={{ left: pct(MARGEM), right: pct(MARGEM), top: '18%', height: '8%' }}>TECNOLOGIA DA INFORMAÇÃO</div>
      {/* Abas cortadas na borda direita imitam a rolagem horizontal do celular. */}
      <div className="mn-abas" style={{ left: pct(MARGEM), right: 0, top: '28.5%', height: '4.5%' }}><span className="on">OBJETIVO</span><span>ORGANOGRAMA</span><span>DOCUMENTOS</span></div>
      <div className="mn-painel" style={{ left: pct(MARGEM), right: pct(MARGEM), top: '34.5%', bottom: '3%' }}>
        <i className="mn-linha" /><i className="mn-linha" /><i className="mn-linha" style={{ width: '70%' }} />
        <i className="mn-linha" style={{ marginTop: '1.2em', width: '55%' }} />
        <i className="mn-linha" /><i className="mn-linha" /><i className="mn-linha" style={{ width: '80%' }} />
        <i className="mn-linha" /><i className="mn-linha" style={{ width: '60%' }} />
      </div>
    </>
  );
}
