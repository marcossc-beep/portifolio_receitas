import Fastify from 'fastify'
import cors from '@fastify/cors'
import { Pool } from 'pg'

const servidor = Fastify()

servidor.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// Conexão com o PostgreSQL: usuário, senha e porta do Postgres da sua máquina
const sql = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    port: 5432,
    database: 'receitas'
})

// ================= LOGIN =================

servidor.post('/login', async (request, reply) => {
    const body = request.body

    if (!body || !body.email || !body.senha) {
        return reply.status(400).send({ error: 'E-mail e senha são obrigatórios!' })
    }

    const resultado = await sql.query(
        'SELECT id, nome, email, foto FROM usuario WHERE email = $1 AND senha = $2',
        [body.email, body.senha]
    )

    if (resultado.rows.length === 0) {
        return reply.status(401).send({ error: 'E-mail ou senha inválidos!' })
    }

    reply.send({ message: 'Login realizado!', usuario: resultado.rows[0] })
})

// ================= USUÁRIOS =================

servidor.get('/usuarios', async (request, reply) => {
    const resultado = await sql.query('SELECT * FROM usuario ORDER BY id')
    reply.send(resultado.rows)
})

servidor.post('/usuarios', async (request, reply) => {
    const body = request.body

    if (!body || !body.nome || !body.email || !body.senha) {
        return reply.status(400).send({ error: 'Nome, e-mail e senha são obrigatórios!' })
    }

    const existe = await sql.query('SELECT id FROM usuario WHERE email = $1', [body.email])
    if (existe.rows.length > 0) {
        return reply.status(400).send({ error: 'Este e-mail já está cadastrado!' })
    }

    await sql.query(
        'INSERT INTO usuario (nome, email, senha, foto) VALUES ($1, $2, $3, $4)',
        [body.nome, body.email, body.senha, body.foto || null]
    )

    reply.status(201).send({ message: 'Usuário cadastrado!' })
})

servidor.put('/usuarios/:id', async (request, reply) => {
    const body = request.body
    const id = request.params.id

    if (!body || !body.nome || !body.email || !body.senha) {
        return reply.status(400).send({ error: 'Nome, e-mail e senha são obrigatórios!' })
    }

    const resultado = await sql.query(
        'UPDATE usuario SET nome = $2, email = $3, senha = $4 WHERE id = $1',
        [id, body.nome, body.email, body.senha]
    )

    if (resultado.rowCount === 0) {
        return reply.status(404).send({ error: 'Usuário não existe!' })
    }

    reply.send({ message: 'Usuário alterado!' })
})

servidor.delete('/usuarios/:id', async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM usuario WHERE id = $1', [id])
    reply.send({ message: 'Usuário deletado!' })
})

// ================= RECEITAS =================

// GET /receitas                    -> todas
// GET /receitas?busca=ovo          -> nome ou ingredientes que contêm "ovo"
// GET /receitas?categoria=Almoço   -> só a categoria
// O JOIN traz o nome e a foto de quem cadastrou a receita.
servidor.get('/receitas', async (request, reply) => {
    const busca = request.query.busca
    const categoria = request.query.categoria

    let consulta = `
        SELECT receita.*, usuario.nome AS autor, usuario.foto AS autor_foto
        FROM receita
        INNER JOIN usuario ON receita.usuario_id = usuario.id
        WHERE 1 = 1
    `
    const valores = []

    if (busca) {
        valores.push(`%${busca}%`)
        consulta += ` AND (receita.nome ILIKE $${valores.length} OR receita.ingredientes ILIKE $${valores.length})`
    }
    if (categoria) {
        valores.push(categoria)
        consulta += ` AND receita.categoria = $${valores.length}`
    }

    consulta += ' ORDER BY receita.id'

    const resultado = await sql.query(consulta, valores)
    reply.send(resultado.rows)
})

servidor.post('/receitas', async (request, reply) => {
    const body = request.body

    if (!body || !body.nome || !body.categoria || !body.ingredientes || !body.instrucoes || !body.tempo_preparo_minutos || !body.usuario_id) {
        return reply.status(400).send({ error: 'Nome, categoria, ingredientes, modo de preparo, tempo e usuário são obrigatórios!' })
    }

    await sql.query(
        `INSERT INTO receita (nome, descricao, categoria, ingredientes, instrucoes, tempo_preparo_minutos,
                              calorias, carboidratos, proteinas, gorduras, imagem, usuario_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
            body.nome, body.descricao, body.categoria, body.ingredientes, body.instrucoes, body.tempo_preparo_minutos,
            body.calorias || null, body.carboidratos || null, body.proteinas || null, body.gorduras || null,
            body.imagem || null, body.usuario_id
        ]
    )

    reply.status(201).send({ message: 'Receita cadastrada!' })
})

servidor.delete('/receitas/:id', async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM receita WHERE id = $1', [id])
    reply.send({ message: 'Receita deletada!' })
})

// ================= FAVORITOS =================

// Devolve só os ids das receitas favoritas do usuário: [1, 3]
servidor.get('/favoritos/:usuario_id', async (request, reply) => {
    const resultado = await sql.query(
        'SELECT receita_id FROM favorito WHERE usuario_id = $1',
        [request.params.usuario_id]
    )
    reply.send(resultado.rows.map((linha) => linha.receita_id))
})

servidor.post('/favoritos', async (request, reply) => {
    const body = request.body

    if (!body || !body.usuario_id || !body.receita_id) {
        return reply.status(400).send({ error: 'usuario_id e receita_id são obrigatórios!' })
    }

    // ON CONFLICT DO NOTHING: se já for favorita, não duplica
    await sql.query(
        'INSERT INTO favorito (usuario_id, receita_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [body.usuario_id, body.receita_id]
    )

    reply.status(201).send({ message: 'Receita favoritada!' })
})

servidor.delete('/favoritos/:usuario_id/:receita_id', async (request, reply) => {
    await sql.query(
        'DELETE FROM favorito WHERE usuario_id = $1 AND receita_id = $2',
        [request.params.usuario_id, request.params.receita_id]
    )
    reply.send({ message: 'Receita removida dos favoritos!' })
})

// ================= LISTA DE COMPRAS =================

servidor.get('/compras/:usuario_id', async (request, reply) => {
    const resultado = await sql.query(
        'SELECT * FROM item_compra WHERE usuario_id = $1 ORDER BY id',
        [request.params.usuario_id]
    )
    reply.send(resultado.rows)
})

// Se o item já estiver na lista, soma a quantidade; se não, cadastra.
servidor.post('/compras', async (request, reply) => {
    const body = request.body

    if (!body || !body.usuario_id || !body.nome) {
        return reply.status(400).send({ error: 'usuario_id e nome são obrigatórios!' })
    }

    const quantidade = body.quantidade || 1

    const existe = await sql.query(
        'SELECT id FROM item_compra WHERE usuario_id = $1 AND nome ILIKE $2',
        [body.usuario_id, body.nome]
    )

    if (existe.rows.length > 0) {
        await sql.query(
            'UPDATE item_compra SET quantidade = quantidade + $2 WHERE id = $1',
            [existe.rows[0].id, quantidade]
        )
    } else {
        await sql.query(
            'INSERT INTO item_compra (usuario_id, nome, quantidade) VALUES ($1, $2, $3)',
            [body.usuario_id, body.nome, quantidade]
        )
    }

    reply.status(201).send({ message: 'Item adicionado à lista!' })
})

servidor.put('/compras/:id', async (request, reply) => {
    const body = request.body

    if (!body || !body.quantidade || body.quantidade < 1) {
        return reply.status(400).send({ error: 'A quantidade precisa ser 1 ou mais!' })
    }

    const resultado = await sql.query(
        'UPDATE item_compra SET quantidade = $2 WHERE id = $1',
        [request.params.id, body.quantidade]
    )

    if (resultado.rowCount === 0) {
        return reply.status(404).send({ error: 'Item não existe!' })
    }

    reply.send({ message: 'Quantidade atualizada!' })
})

servidor.delete('/compras/:id', async (request, reply) => {
    await sql.query('DELETE FROM item_compra WHERE id = $1', [request.params.id])
    reply.send({ message: 'Item removido!' })
})

// Limpa a lista inteira de um usuário
servidor.delete('/compras/usuario/:usuario_id', async (request, reply) => {
    await sql.query('DELETE FROM item_compra WHERE usuario_id = $1', [request.params.usuario_id])
    reply.send({ message: 'Lista de compras limpa!' })
})

servidor.listen({ port: 3000 }).then(() => console.log('API rodando em http://localhost:3000'))
