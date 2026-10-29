# Portal do Colaborador SMREDE

Front-end do Portal do Colaborador da Santa Mônica Rede: contracheque, ramais, aniversariantes,
documentos da Qualidade e o Guia do Portal. Usa o mesmo login e o mesmo backend do
[site original](https://portaldocolaborador.smrede.net.br/).

## Requisitos

Node 22 e npm 10.

## Instalação

Na pasta `FrontEnd`:

```
npm ci
cp .env.example .env
npm start
```

Abra http://localhost:3000/frontend-qualidade-SMRE/. O caminho vem do `homepage` do `package.json`.

> **Atenção:** o ambiente local e o beta usam o backend de produção. Login, upload e cadastro
> mexem em dados reais.

## Configuração

| Variável | Para que |
|---|---|
| `REACT_APP_BACKEND` | Endereço da API. O padrão do `.env.example` é o backend de produção. |

O `.env` não vai para o Git e só é lido quando o `npm start` ou o build começa. Um build feito
sem ele sai sem backend, e o login para de funcionar.

Os scripts de build preenchem `REACT_APP_FASE` (esconde menus em construção na produção) e
`REACT_APP_ALVO` (gera só um tutorial avulso). Não coloque essas duas no `.env`.

Além do backend, o Portal lê webhooks do n8n em `https://auto.smrede.tec.br/webhook/`:

| Webhook | Tela |
|---|---|
| `ramais` | Ramais (dados da planilha do Drive) |
| `niver/?mes=N` | Aniversariantes |
| `Emails` | Comunicados da tela inicial |

## Publicar

Tudo vai para o GitHub Pages da organização, cada versão numa pasta da branch `gh-pages`, em
https://santa-monica-rede-de-ensino.github.io/frontend-qualidade-SMRE/. Rode na pasta `FrontEnd`.

| Comando | Pasta | O que é |
|---|---|---|
| `npm run deploy:beta` | `/beta/` | Sempre primeiro, para conferir |
| `npm run deploy` | raiz | Produção, depois do beta aprovado (veja abaixo) |
| `npm run deploy:tutorial-termo` | `/tutorial-termo/` | Tutorial dos Termos de Compromisso, sem login |
| `npm run deploy:tutorial-helpdesk` | `/tutorial-helpdesk/` | Tutorial do ticket de Desligamento e Contratação no Suporte CSC, sem login |
| `npm run deploy:tutorial-analise-desligamento` | `/tutorial-analise-desligamento/` | Tutorial do ticket de Análise de Desligamento no Suporte CSC, sem login |
| `npm run deploy:tutorial-consulta-tickets` | `/tutorial-consulta-tickets/` | Tutorial de consulta dos tickets por tópico de ajuda no Suporte CSC, sem login |

Os tutoriais usam os arquivos do Guia (`src/Pages/Guia/conteudo*.jsx`), e cada endereço só muda
depois do seu próprio deploy. Para ver um tutorial na máquina: `npm run start:tutorial-<nome>`. Os
tutoriais do Suporte CSC dividem as telas em `telasHelpdesk.jsx` (formulário) e `telasTickets.jsx`
(lista de tickets); cada tópico tem seu `conteudo*.jsx`.

Se o deploy falhar com `Filename too long` (o Windows limita o caminho dos PDFs da pasta `public`),
no PowerShell rode `npx gh-pages-clean` e repita o `gh-pages` com o Git aceitando caminhos longos:

```
$env:GIT_CONFIG_COUNT='1'; $env:GIT_CONFIG_KEY_0='core.longpaths'; $env:GIT_CONFIG_VALUE_0='true'
npx gh-pages -d build -e <pasta>
```

### Produção

A `main` costuma ter coisas que ainda estão só no beta. Produção sai da branch `producao`, que
guarda o que está no ar:

1. `git worktree add --detach ../FQ-producao origin/producao` e `git cherry-pick` dos commits que vão
   para produção.
2. Copie `FrontEnd/.env` para o worktree e rode `npm ci` lá dentro. Não faça link para o
   `node_modules` do projeto: o `git worktree remove` apaga o destino do link.
3. `npm run predeploy` e confira que `build/static/js/main.*.js` tem `backportaldocolaborador`.
4. `npx gh-pages -d build --add`. O `--add` mantém as pastas do beta, dos tutoriais e dos mockups.
5. Envie o commit publicado para a branch `producao`.

## Mockups

Decisão visual começa num mockup em `mockups/<assunto>/`: um HTML só, fora do build, com as opções
lado a lado para aprovação. Para publicar, na pasta `FrontEnd`:

```
npx gh-pages -d ../mockups/<assunto> -e <assunto> --add
```

O mockup fica em `/<assunto>/` no mesmo endereço do Pages.
