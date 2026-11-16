import Fastify from 'fastify'
import { Pool } from 'pg'
import cors from '@fastify/cors'

const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    port: 5432,
    database: "receitas"
})

const servidor = Fastify()

servidor.register(cors, {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
})

// Converte texto JSON ou texto simples salvo no banco para array no front-end
function converterLista(texto, tipo) {
    try {
        const parsed = JSON.parse(texto)
        if (Array.isArray(parsed)) return parsed
    } catch {
        // Fallback caso tenha sido inserido texto puro manualmente no banco
    }
    const linhas = String(texto || '')
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean)

    if (tipo === 'ingredientes') {
        return linhas.map((nome, index) => ({
            id: Date.now() + index,
            nome,
            quantidade: 1,
            icone: '🥗'
        }))
    }
    return linhas
}

function formatarReceita(row) {
    return {
        id: row.id,
        titulo: row.nome,
        nome: row.nome,
        categoria: row.categoria || 'Lunch',
        autor: row.autor || 'Alena Sabyan',
        avatarAutor: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        tempo: `${row.tempo_preparo_minutos} Min`,
        tempo_preparo_minutos: row.tempo_preparo_minutos,
        calorias: row.calorias || '200 Kcal',
        carboidratos: row.carboidratos || '30g carbs',
        proteinas: row.proteinas || '15g proteins',
        gorduras: row.gorduras || '8g fats',
        descricao: row.descricao || 'Receita saudável preparada com ingredientes frescos.',
        imagem: row.imagem || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
        destaque: Boolean(row.destaque),
        escolhaEditor: Boolean(row.escolha_editor),
        usuario_id: row.usuario_id,
        ingredientes: converterLista(row.ingredientes, 'ingredientes'),
        instrucoes: converterLista(row.instrucoes, 'instrucoes')
    }
}

// ================= ROTAS DE USUÁRIOS E LOGIN =================

servidor.get('/usuarios', async () => {
    const resultado = await sql.query('SELECT * FROM usuario ORDER BY id ASC')
    return resultado.rows
})

servidor.post('/usuarios', async (request, reply) => {
    const nome = request.body?.nome
    const senha = request.body?.senha
    const email = request.body?.email

    if (!nome || !senha || !email) {
        return reply.status(400).send(
            { error: "nome, senha, email são obrigatórios!" }
        )
    }

    try {
        const resultado = await sql.query(
            'INSERT INTO usuario (nome, senha, email) VALUES ($1, $2, $3) RETURNING id, nome, email, ativo',
            [nome, senha, email]
        )
        return reply.status(201).send({ mensagem: "Deu certo!", usuario: resultado.rows[0] })
    } catch (erro) {
        if (erro.code === '23505') {
            return reply.status(400).send({ error: "Este e-mail já está cadastrado!" })
        }
        return reply.status(500).send({ error: "Erro ao cadastrar usuário." })
    }
})

servidor.put('/usuarios/:id', async (request, reply) => {
    const body = request.body
    const id = request.params.id

    if (!body || !body.nome || !body.senha || !body.email) {
        return reply.status(400).send(
            { error: "nome, senha, email são obrigatórios!" }
        )
    } else if (!id) {
        return reply.status(400).send({
            error: "Faltou o id!"
        })
    }

    const existe = await sql.query('SELECT * FROM usuario WHERE id = $1', [id])

    if (existe.rows.length === 0) {
        return reply.status(400).send({
            error: `Usuário com o id: ${id} não existe`
        })
    }

    await sql.query(
        'UPDATE usuario SET nome = $1, senha = $2, email = $4 WHERE id = $3',
        [body.nome, body.senha, id, body.email]
    )
    return reply.send({ message: "Usuário alterado!" })
})

servidor.delete('/usuarios/:id', async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM usuario WHERE id = $1', [id])
    return reply.status(204).send()
})

servidor.post('/login', async (request, reply) => {
    const body = request.body || {}
    const resultado = await sql.query(
        'SELECT * FROM usuario WHERE email = $1 AND senha = $2',
        [body.email, body.senha]
    )

    if (resultado.rows.length === 0) {
        return reply.status(401).send({ error: 'email ou senha inválidos!' })
    }

    const usuario = resultado.rows[0]
    return reply.status(200).send({
        mensagem: "login realizado com sucesso!",
        ok: true,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    })
})

// ================= ROTAS DE RECEITAS =================

servidor.get('/receitas', async () => {
    const resultado = await sql.query(`
        SELECT r.*, u.nome AS autor
        FROM receita r
        LEFT JOIN usuario u ON u.id = r.usuario_id
        ORDER BY r.id ASC
    `)
    return resultado.rows.map(formatarReceita)
})

servidor.post('/receitas', async (request, reply) => {
    const {
        nome,
        titulo,
        ingredientes,
        instrucoes,
        tempo_preparo_minutos,
        usuario_id = 1,
        categoria = 'Lunch',
        calorias = '220 Kcal',
        carboidratos = '30g carbs',
        proteinas = '18g proteins',
        gorduras = '7g fats',
        descricao = '',
        imagem = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
    } = request.body || {}

    const nomeReceita = nome || titulo
    if (!nomeReceita || !ingredientes || !instrucoes || !tempo_preparo_minutos) {
        return reply.status(400).send({
            error: "nome, ingredientes, instrucoes e tempo_preparo_minutos são obrigatórios!"
        })
    }

    const ingredientesTexto = typeof ingredientes === 'string' ? ingredientes : JSON.stringify(ingredientes)
    const instrucoesTexto = typeof instrucoes === 'string' ? instrucoes : JSON.stringify(instrucoes)

    const resultado = await sql.query(
        `INSERT INTO receita (
            nome, ingredientes, instrucoes, tempo_preparo_minutos, usuario_id,
            categoria, calorias, carboidratos, proteinas, gorduras, descricao, imagem
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *`,
        [
            nomeReceita,
            ingredientesTexto,
            instrucoesTexto,
            Number(tempo_preparo_minutos),
            Number(usuario_id),
            categoria,
            calorias,
            carboidratos,
            proteinas,
            gorduras,
            descricao,
            imagem
        ]
    )

    return reply.status(201).send(formatarReceita(resultado.rows[0]))
})

servidor.delete('/receitas/:id', async (request, reply) => {
    const id = request.params.id
    await sql.query('DELETE FROM receita WHERE id = $1', [id])
    return reply.status(204).send()
})

// ================= ROTAS DE FAVORITOS =================

servidor.get('/favoritos/:usuarioId', async (request) => {
    const { usuarioId } = request.params
    const resultado = await sql.query(
        'SELECT receita_id FROM favorito WHERE usuario_id = $1',
        [usuarioId]
    )
    return resultado.rows.map((r) => r.receita_id)
})

servidor.post('/favoritos', async (request, reply) => {
    const { usuario_id, receita_id } = request.body || {}
    if (!usuario_id || !receita_id) {
        return reply.status(400).send({ error: 'usuario_id e receita_id são obrigatórios!' })
    }

    const existe = await sql.query(
        'SELECT 1 FROM favorito WHERE usuario_id = $1 AND receita_id = $2',
        [usuario_id, receita_id]
    )

    if (existe.rows.length > 0) {
        await sql.query(
            'DELETE FROM favorito WHERE usuario_id = $1 AND receita_id = $2',
            [usuario_id, receita_id]
        )
    } else {
        await sql.query(
            'INSERT INTO favorito (usuario_id, receita_id) VALUES ($1, $2)',
            [usuario_id, receita_id]
        )
    }

    const atualizados = await sql.query(
        'SELECT receita_id FROM favorito WHERE usuario_id = $1',
        [usuario_id]
    )
    return reply.send(atualizados.rows.map((r) => r.receita_id))
})

servidor.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Servidor rodando em ${address}`)
})
