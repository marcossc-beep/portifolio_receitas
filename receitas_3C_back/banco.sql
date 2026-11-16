CREATE TABLE IF NOT EXISTS USUARIO (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS RECEITA (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ingredientes TEXT NOT NULL,
    instrucoes TEXT NOT NULL,
    tempo_preparo_minutos INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL REFERENCES USUARIO(id) ON DELETE CASCADE,
    categoria VARCHAR(50) DEFAULT 'Lunch',
    calorias VARCHAR(50) DEFAULT '200 Kcal',
    carboidratos VARCHAR(50) DEFAULT '30g carbs',
    proteinas VARCHAR(50) DEFAULT '15g proteins',
    gorduras VARCHAR(50) DEFAULT '8g fats',
    descricao TEXT DEFAULT '',
    imagem TEXT DEFAULT 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    destaque BOOLEAN DEFAULT FALSE,
    escolha_editor BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS FAVORITO (
    usuario_id INTEGER NOT NULL REFERENCES USUARIO(id) ON DELETE CASCADE,
    receita_id INTEGER NOT NULL REFERENCES RECEITA(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, receita_id)
);

-- Usuário padrão para testes e autoria das receitas iniciais
INSERT INTO USUARIO (nome, email, senha)
VALUES ('Alena Sabyan', 'alena@email.com', '123456')
ON CONFLICT (email) DO NOTHING;

-- Receitas iniciais (insere apenas se a tabela estiver vazia)
INSERT INTO RECEITA (
    nome, ingredientes, instrucoes, tempo_preparo_minutos, usuario_id,
    categoria, calorias, carboidratos, proteinas, gorduras, descricao, imagem, destaque, escolha_editor
)
SELECT * FROM (
    VALUES
    (
        'Asian white noodle with extra seafood',
        '[{"id":101,"nome":"White Rice Noodles","quantidade":2,"icone":"🍜"},{"id":102,"nome":"Fresh Shrimp","quantidade":6,"icone":"🦐"},{"id":103,"nome":"Cherry Tomatoes","quantidade":4,"icone":"🍅"},{"id":104,"nome":"Sesame Oil","quantidade":1,"icone":"🫗"}]',
        '["Cozinhe o macarrão de arroz em água fervente por 5 minutos e escorra.","Salteie os camarões em fogo alto com óleo de gergelim por 3 minutos.","Adicione o macarrão, os tomates cortados ao meio e finalize com cebolinha."]',
        20, 1, 'Dinner', '340 Kcal', '48g carbs', '28g proteins', '8g fats',
        'Macarrão oriental leve salteado com camarões frescos, lula, tomate cereja e toque de gengibre e gergelim.',
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        TRUE, FALSE
    ),
    (
        'Healthy Taco Salad with fresh vegetable',
        '[{"id":201,"nome":"Tortilla Chips","quantidade":2,"icone":"🌮"},{"id":202,"nome":"Avocado","quantidade":1,"icone":"🥑"},{"id":203,"nome":"Red Cabbage","quantidade":9,"icone":"🥬"},{"id":204,"nome":"Sweet Corn","quantidade":3,"icone":"🌽"},{"id":205,"nome":"Red Onion","quantidade":1,"icone":"🧅"},{"id":206,"nome":"Fresh Lime","quantidade":2,"icone":"🍋"}]',
        '["Lave bem as folhas verdes e corte o repolho roxo em tiras bem finas.","Fatie o abacate em cubos médios e regue com suco de limão para não escurecer.","Monte a tigela com as folhas, o milho, o abacate e finalize com tortilla chips crocantes."]',
        15, 1, 'Lunch', '120 Kcal', '65g carbs', '27g proteins', '91g fats',
        'This Healthy Taco Salad is the universal delight of taco night, combinando folhas crocantes, abacate fresco, repolho roxo e nachos assados.',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
        TRUE, FALSE
    ),
    (
        'Japanese-style Pancakes Recipe',
        '[{"id":301,"nome":"Free-range Eggs","quantidade":2,"icone":"🥚"},{"id":302,"nome":"Oat Flour","quantidade":1,"icone":"🌾"},{"id":303,"nome":"Fresh Blueberries","quantidade":8,"icone":"🫐"},{"id":304,"nome":"Orange Slices","quantidade":3,"icone":"🍊"}]',
        '["Bata as claras em neve firme e incorpore delicadamente às gemas com farinha de aveia.","Asse em frigideira antiaderente tampada em fogo baixo por 4 minutos de cada lado.","Sirva com os mirtilos e as fatias de laranja por cima."]',
        12, 1, 'Breakfast', '64 Kcal', '32g carbs', '12g proteins', '6g fats',
        'Panquecas fofinhas estilo suflê japonês servidas com mirtilos frescos, fatias de laranja e um fio de mel.',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
        FALSE, FALSE
    ),
    (
        'Sunny Egg & Toast Avocado',
        '[{"id":401,"nome":"Whole Grain Bread","quantidade":2,"icone":"🍞"},{"id":402,"nome":"Avocado","quantidade":1,"icone":"🥑"},{"id":403,"nome":"Free-range Eggs","quantidade":1,"icone":"🍳"}]',
        '["Toste as fatias de pão integral até ficarem douradas e crocantes.","Acomode as fatias de abacate temperadas com sal e limão sobre o pão.","Prepare o ovo na frigideira com gema mole e coloque por cima."]',
        10, 1, 'Breakfast', '210 Kcal', '24g carbs', '14g proteins', '11g fats',
        'Torrada integral crocante coberta com abacate fatiado, ovo caipira estalado e pimenta-do-reino moída na hora.',
        'https://images.unsplash.com/photo-1525351484163-7529414342d8?auto=format&fit=crop&w=600&q=80',
        FALSE, FALSE
    ),
    (
        'Bowl of noodle with beef',
        '[{"id":501,"nome":"Beef Strips","quantidade":2,"icone":"🥩"},{"id":502,"nome":"Ramen Noodles","quantidade":1,"icone":"🍜"},{"id":503,"nome":"Broccoli Florets","quantidade":5,"icone":"🥦"}]',
        '["Sele as tiras de carne em frigideira bem quente por 4 minutos.","Cozinhe o macarrão e os floretes de brócolis no caldo temperado.","Monte a tigela com o macarrão, os legumes e finalize com a carne."]',
        25, 1, 'Lunch', '410 Kcal', '52g carbs', '31g proteins', '12g fats',
        'Tigela nutritiva de macarrão oriental com tiras de carne grelhada, legumes salteados e caldo aromático.',
        'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        FALSE, FALSE
    ),
    (
        'Easy homemade beef burger',
        '[{"id":601,"nome":"Ground Beef","quantidade":2,"icone":"🍔"},{"id":602,"nome":"Brioche Bun","quantidade":2,"icone":"🥯"},{"id":603,"nome":"Red Cabbage","quantidade":3,"icone":"🥬"}]',
        '["Modele os discos de carne temperados apenas com sal e pimenta-do-reino.","Grelhe por 4 minutos de cada lado até formar crosta dourada.","Monte no pão brioche selado com a salada de repolho roxo."]',
        30, 1, 'Dinner', '480 Kcal', '42g carbs', '35g proteins', '19g fats',
        'Hambúrguer artesanal suculento feito em casa com salada de repolho roxo agridoce no pão brioche tostado.',
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        FALSE, TRUE
    ),
    (
        'Blueberry with egg for breakfast',
        '[{"id":701,"nome":"Fresh Blueberries","quantidade":10,"icone":"🫐"},{"id":702,"nome":"Free-range Eggs","quantidade":2,"icone":"🥚"},{"id":703,"nome":"Fresh Figs","quantidade":2,"icone":"🍇"}]',
        '["Cozinhe os ovos por 7 minutos para manter a gema cremosa.","Lave os mirtilos e corte os figos frescos em rodelas.","Disponha tudo em um prato fundo e sirva imediatamente."]',
        12, 1, 'Breakfast', '185 Kcal', '22g carbs', '15g proteins', '5g fats',
        'Combinação equilibrada de proteínas e antioxidantes com mirtilos frescos, figos e ovos cozidos no ponto certo.',
        'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80',
        FALSE, TRUE
    ),
    (
        'Half boiled egg sandwich',
        '[{"id":801,"nome":"Whole Grain Bread","quantidade":2,"icone":"🍞"},{"id":802,"nome":"Free-range Eggs","quantidade":1,"icone":"🥚"},{"id":803,"nome":"Ripe Tomato","quantidade":2,"icone":"🍅"}]',
        '["Fatie o tomate e tempere com uma pitada de sal e orégano.","Prepare o ovo cozido macio por 6 minutos e descasque com cuidado.","Monte o sanduíche com folhas frescas, tomate e o ovo fatiado."]',
        8, 1, 'Breakfast', '230 Kcal', '28g carbs', '16g proteins', '7g fats',
        'Sanduíche rápido e leve com pão de forma integral, tomate maduro, folhas verdes e ovo com gema macia.',
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
        FALSE, FALSE
    )
) AS dados
WHERE NOT EXISTS (SELECT 1 FROM RECEITA);
