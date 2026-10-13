import { useEffect, useState } from 'react';
import { emProducao } from '../../config/fase';

const URL_ANIVERSARIO = 'https://auto.smrede.tec.br/webhook/niver/hoje';
const CHAVE_CACHE = 'aniversarioHoje';
const CHAVE_CONFETE = 'aniversarioConfeteTocado';
const CHAVE_FORCADO = 'aniversarioForcado';

// O webhook compara a data no fuso de Brasília; o cache usa o mesmo dia para não virar
// à meia-noite UTC.
const hojeEmBrasilia = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());

// O armazenamento pode estar bloqueado (aba anônima, política do navegador): a festa nunca
// pode quebrar o cabeçalho.
function ler(armazenamento, chave) {
    try {
        return JSON.parse(armazenamento.getItem(chave));
    } catch {
        return null;
    }
}

function gravar(armazenamento, chave, valor) {
    try {
        armazenamento.setItem(chave, JSON.stringify(valor));
    } catch {
        // sem armazenamento, a consulta só se repete na próxima página
    }
}

// Fora de produção, ?aniversario=1 liga a festa pela sessão toda. É lido ao carregar o app
// porque, depois do login, a URL já perdeu o parâmetro.
if (!emProducao && new URLSearchParams(window.location.search).get('aniversario') === '1') {
    gravar(sessionStorage, CHAVE_FORCADO, true);
}

const forcado = () => !emProducao && ler(sessionStorage, CHAVE_FORCADO) === true;

function valorInicial(cpf) {
    if (forcado()) return true;
    const cache = ler(localStorage, CHAVE_CACHE);
    if (cache && cache.cpf === cpf && cache.data === hojeEmBrasilia()) return cache.aniversario === true;
    return null;
}

/**
 * Diz se hoje é aniversário do CPF. Consulta o webhook no máximo uma vez por dia por pessoa;
 * qualquer falha conta como "não é aniversário" e não fica no cache.
 */
export function useAniversarioHoje(cpfBruto) {
    const cpf = String(cpfBruto ?? '').replace(/\D/g, '');
    const [aniversario, setAniversario] = useState(() => valorInicial(cpf));

    useEffect(() => {
        if (!cpf || aniversario !== null) return undefined;
        const controle = new AbortController();

        fetch(`${URL_ANIVERSARIO}?cpf=${cpf}`, { signal: controle.signal })
            .then((resposta) => (resposta.ok ? resposta.json() : Promise.reject(resposta.status)))
            .then((dados) => {
                if (typeof dados?.aniversario !== 'boolean') throw new Error('resposta sem aniversario');
                gravar(localStorage, CHAVE_CACHE, { cpf, data: hojeEmBrasilia(), aniversario: dados.aniversario });
                setAniversario(dados.aniversario);
            })
            .catch(() => {
                if (!controle.signal.aborted) setAniversario(false);
            });

        return () => controle.abort();
    }, [cpf, aniversario]);

    return aniversario === true;
}

/**
 * Diz se o confete deve tocar: só na primeira página da sessão em que `ativo` é verdadeiro.
 * O Menu remonta a cada página, e confete a cada clique cansa.
 */
export function useConfeteDaSessao(ativo) {
    // Só lê: o StrictMode chama o inicializador duas vezes; quem marca como tocado é o efeito.
    const [tocar] = useState(() => ler(sessionStorage, CHAVE_CONFETE) !== true);

    useEffect(() => {
        if (ativo && tocar) gravar(sessionStorage, CHAVE_CONFETE, true);
    }, [ativo, tocar]);

    return ativo && tocar;
}
