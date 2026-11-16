-- Banco de dados do projeto Receitas Saudáveis
-- Rodar no pgAdmin, no Query Tool aberto DENTRO do banco "receitas".
-- O DROP da primeira linha apaga as tabelas antigas: o script pode ser rodado de novo quando quiser recomeçar.

DROP TABLE IF EXISTS item_compra, favorito, receita, usuario;

-- Quem usa o sistema (login com e-mail e senha). A foto é o link de uma imagem.
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cada receita pertence a um usuário (usuario_id).
-- ingredientes e instrucoes: um item por linha.
-- imagem: link de uma imagem da internet.
-- calorias em kcal; carboidratos, proteinas e gorduras em gramas.
CREATE TABLE receita (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(50) NOT NULL,
    ingredientes TEXT NOT NULL,
    instrucoes TEXT NOT NULL,
    tempo_preparo_minutos INTEGER NOT NULL,
    calorias INTEGER,
    carboidratos INTEGER,
    proteinas INTEGER,
    gorduras INTEGER,
    imagem TEXT,
    destaque BOOLEAN DEFAULT FALSE,
    usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE
);

-- Receitas favoritas de cada usuário (uma linha por par usuário + receita).
CREATE TABLE favorito (
    usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    receita_id INTEGER NOT NULL REFERENCES receita(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, receita_id)
);

-- Lista de compras de cada usuário.
CREATE TABLE item_compra (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 1
);

INSERT INTO usuario (nome, email, senha, foto) VALUES
('Alena Sabyan', 'alena@email.com', '123456', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'),
('James Spader', 'james@email.com', '123456', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'),
('Marina Costa', 'marina@email.com', '123456', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80');

INSERT INTO receita (nome, descricao, categoria, ingredientes, instrucoes, tempo_preparo_minutos, calorias, carboidratos, proteinas, gorduras, imagem, destaque, usuario_id) VALUES
(
    'Macarrão asiático com frutos do mar',
    'Macarrão oriental leve, salteado com camarões, tomate-cereja e um toque de gergelim.',
    'Jantar',
    'Macarrão de arroz
Camarão limpo
Tomate-cereja
Óleo de gergelim
Cebolinha',
    'Cozinhe o macarrão de arroz em água fervente por 5 minutos e escorra.
Salteie os camarões no óleo de gergelim por 3 minutos.
Junte o macarrão e os tomates cortados ao meio e finalize com cebolinha.',
    20, 340, 48, 28, 8,
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    TRUE, 2
),
(
    'Salada de taco com legumes frescos',
    'Folhas crocantes, abacate, repolho roxo, milho e tortilha assada.',
    'Almoço',
    'Tortilha assada
Abacate
Repolho roxo
Milho
Cebola roxa
Limão',
    'Lave as folhas e corte o repolho roxo em tiras finas.
Corte o abacate em cubos e regue com suco de limão.
Monte a tigela com as folhas, o milho e o abacate e finalize com a tortilha.',
    15, 120, 65, 27, 9,
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    TRUE, 1
),
(
    'Panqueca japonesa de aveia',
    'Panquecas fofinhas estilo suflê, servidas com mirtilos e laranja.',
    'Café da manhã',
    'Ovos
Farinha de aveia
Mirtilos
Laranja',
    'Bata as claras em neve e misture com as gemas e a farinha de aveia.
Asse em frigideira tampada em fogo baixo por 4 minutos de cada lado.
Sirva com os mirtilos e as fatias de laranja.',
    12, 164, 32, 12, 6,
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
    TRUE, 3
),
(
    'Torrada com abacate e ovo',
    'Pão integral crocante com abacate temperado e ovo de gema mole.',
    'Café da manhã',
    'Pão integral
Abacate
Ovo
Limão',
    'Toste as fatias de pão integral.
Amasse o abacate com sal e limão e espalhe sobre o pão.
Prepare o ovo com a gema mole e coloque por cima.',
    10, 210, 24, 14, 11,
    'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=600&q=80',
    FALSE, 1
),
(
    'Tigela de macarrão com carne',
    'Macarrão oriental com tiras de carne grelhada, brócolis e caldo temperado.',
    'Almoço',
    'Tiras de carne
Macarrão tipo lámen
Brócolis
Shoyu',
    'Sele as tiras de carne em frigideira bem quente por 4 minutos.
Cozinhe o macarrão e o brócolis no caldo temperado com shoyu.
Monte a tigela com o macarrão, o brócolis e a carne por cima.',
    25, 410, 52, 31, 12,
    'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
    FALSE, 2
),
(
    'Hambúrguer caseiro com salada de repolho',
    'Hambúrguer artesanal no pão brioche com salada de repolho roxo.',
    'Jantar',
    'Carne moída
Pão brioche
Repolho roxo
Sal e pimenta-do-reino',
    'Modele os discos de carne temperados com sal e pimenta.
Grelhe por 4 minutos de cada lado.
Monte no pão brioche com a salada de repolho roxo.',
    30, 480, 42, 35, 19,
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    FALSE, 2
),
(
    'Mirtilos com ovos e figos',
    'Café da manhã equilibrado com mirtilos, figos frescos e ovos cozidos.',
    'Café da manhã',
    'Mirtilos
Ovos
Figos',
    'Cozinhe os ovos por 7 minutos.
Lave os mirtilos e corte os figos em rodelas.
Sirva tudo junto em um prato fundo.',
    12, 185, 22, 15, 5,
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80',
    FALSE, 3
),
(
    'Sanduíche de ovo e tomate',
    'Sanduíche rápido com pão integral, tomate e ovo de gema macia.',
    'Almoço',
    'Pão integral
Ovo
Tomate
Folhas verdes',
    'Fatie o tomate e tempere com sal e orégano.
Cozinhe o ovo por 6 minutos e descasque.
Monte o sanduíche com as folhas, o tomate e o ovo fatiado.',
    8, 230, 28, 16, 7,
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    FALSE, 1
);

INSERT INTO favorito (usuario_id, receita_id) VALUES
(1, 1),
(1, 3),
(2, 2);

INSERT INTO item_compra (usuario_id, nome, quantidade) VALUES
(1, 'Abacate', 2),
(1, 'Ovos', 6),
(2, 'Limão', 3);
