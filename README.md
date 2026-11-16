# Receitas Saudáveis

Aplicativo de receitas com front-end em **React** e API em **Node.js + Fastify**, guardando tudo em um banco **PostgreSQL**: usuários, receitas (com o link da foto), favoritos e lista de compras.

## O que o sistema faz

- Cadastro e login de usuário (e-mail e senha).
- Lista de receitas com destaques e filtro por categoria (Café da manhã, Almoço, Jantar).
- Busca por nome da receita ou por ingrediente.
- Detalhes da receita: ingredientes, modo de preparo, tempo e informações nutricionais.
- Favoritar e desfavoritar receitas.
- Lista de compras: adicionar os ingredientes de uma receita, mudar a quantidade, remover e limpar.
- Cadastrar e excluir as suas próprias receitas.
- Tela de gerenciamento de usuários (listar, editar e excluir).

## Pastas

```text
portifolio_receitas/
├── backend/            API (Node.js + Fastify + pg)
│   ├── banco.sql       script que cria as tabelas e os dados de exemplo
│   ├── server.js       rotas da API
│   └── referencias.http  testes das rotas (extensão REST Client do VS Code)
└── frontend/           aplicativo React (Vite)
    └── src/
        ├── App.jsx     troca de telas e chamadas à API
        ├── api.js      endereço da API
        ├── paginas/    uma tela por arquivo
        └── componentes/
```

## O que precisa estar instalado

- [Node.js](https://nodejs.org/) (versão 20 ou mais nova)
- [PostgreSQL](https://www.postgresql.org/download/) com o **pgAdmin**
- [VS Code](https://code.visualstudio.com/) e [Git](https://git-scm.com/)

## Como rodar

### 1. Baixar o projeto

```bash
git clone https://github.com/marcossc-beep/portifolio_receitas.git
```

Abra a pasta `portifolio_receitas` no VS Code.

### 2. Criar o banco de dados

1. Abra o **pgAdmin** e entre no servidor PostgreSQL.
2. Clique com o botão direito em **Databases > Create > Database...**, coloque o nome **`receitas`** e clique em **Save**.
3. Clique com o botão direito no banco **`receitas`** que acabou de aparecer e escolha **Query Tool**.
4. No VS Code, abra o arquivo `backend/banco.sql`, selecione tudo (**Ctrl + A**) e copie (**Ctrl + C**).
5. Cole no Query Tool (**Ctrl + V**) e execute com **F5**.

O script cria as tabelas `usuario`, `receita`, `favorito` e `item_compra` e já cadastra 3 usuários e 8 receitas.
Ele começa com um `DROP TABLE`, então pode ser rodado de novo sempre que quiser voltar o banco ao início.

### 3. Conferir a conexão com o banco

No arquivo `backend/server.js`, a conexão está assim:

```js
const sql = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    port: 5432,
    database: 'receitas'
})
```

Troque `password` (e `port`, se for diferente de 5432) pelos dados do PostgreSQL da sua máquina.

### 4. Rodar a API (back-end)

Abra um terminal no VS Code (**Ctrl + '**) e rode, um comando por vez:

```bash
cd backend
```

```bash
npm install
```

```bash
npm start
```

O terminal deve mostrar `API rodando em http://localhost:3000`. Deixe esse terminal aberto.

Para testar as rotas sem o front, abra `backend/referencias.http` (extensão **REST Client**) e clique em **Send Request** acima de cada requisição.

### 5. Rodar o aplicativo (front-end)

Abra **outro** terminal (botão **+** no painel do terminal) e rode:

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

Abra no navegador o endereço que aparecer, normalmente **http://localhost:5173**.

### 6. Entrar no sistema

Usuários de teste já cadastrados pelo `banco.sql`:

| E-mail | Senha |
|---|---|
| alena@email.com | 123456 |
| james@email.com | 123456 |
| marina@email.com | 123456 |

Também dá para criar uma conta nova pela tela **Criar Nova Conta**.

> O `npm install` só precisa ser feito na primeira vez (ele cria a pasta `node_modules`). Nas próximas vezes, basta `npm start` no backend e `npm run dev` no frontend.

## Banco de dados

| Tabela | Guarda |
|---|---|
| `usuario` | nome, e-mail, senha e o link da foto |
| `receita` | nome, descrição, categoria, ingredientes e modo de preparo (um item por linha), tempo, calorias, nutrientes, link da foto e quem cadastrou (`usuario_id`) |
| `favorito` | quais receitas cada usuário favoritou |
| `item_compra` | a lista de compras de cada usuário |

As fotos são **links** de imagens da internet: para trocar a foto de uma receita, basta trocar o link na coluna `imagem`.

## Rotas da API

| Método | Rota | O que faz |
|---|---|---|
| POST | `/login` | confere e-mail e senha |
| GET | `/usuarios` | lista os usuários |
| POST | `/usuarios` | cadastra usuário |
| PUT | `/usuarios/:id` | edita usuário |
| DELETE | `/usuarios/:id` | exclui usuário |
| GET | `/receitas` | lista as receitas com o nome e a foto do autor; aceita `?busca=` e `?categoria=` |
| POST | `/receitas` | cadastra receita |
| DELETE | `/receitas/:id` | exclui receita |
| GET | `/favoritos/:usuario_id` | ids das receitas favoritas |
| POST | `/favoritos` | favorita uma receita |
| DELETE | `/favoritos/:usuario_id/:receita_id` | desfavorita |
| GET | `/compras/:usuario_id` | lista de compras do usuário |
| POST | `/compras` | adiciona item (se já existir, soma a quantidade) |
| PUT | `/compras/:id` | muda a quantidade |
| DELETE | `/compras/:id` | remove um item |
| DELETE | `/compras/usuario/:usuario_id` | limpa a lista |

## Problemas comuns

| Problema | Solução |
|---|---|
| `password authentication failed for user "postgres"` | a senha do `Pool` no `server.js` está diferente da senha do PostgreSQL |
| `database "receitas" does not exist` | o banco não foi criado (passo 2) ou foi criado com outro nome |
| `relation "receita" does not exist` | o `banco.sql` foi executado em outro banco; abra o Query Tool **dentro** do banco `receitas` |
| `EADDRINUSE: address already in use :::3000` | a API já está rodando em outro terminal |
| O aplicativo mostra "Não foi possível conectar à API" | a API não está rodando: `npm start` na pasta `backend` |
| `'vite' não é reconhecido` ou `Cannot find module` | faltou o `npm install` na pasta |
