const receitasMock = [
  {
    id: 1,
    titulo: "Macarrão asiático branco com frutos do mar",
    categoria: "Almoço",
    autor: "James Spader",
    avatarAutor: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    tempo: "20 Min",
    calorias: "320 Kcal",
    carboidratos: "65g carb.",
    proteinas: "27g prot.",
    gorduras: "15g gord.",
    descricao: "Macarrão oriental leve preparado com camarões frescos, mexilhões, caldo aromático de gengibre e cebolinha.",
    imagem: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    destaque: true,
    escolhaEditor: false,
    ingredientes: [
      { id: 101, nome: "Macarrão de arroz", quantidade: 2, icone: "🍜" },
      { id: 102, nome: "Camarão limpo", quantidade: 6, icone: "🦐" },
      { id: 103, nome: "Ovo cozido", quantidade: 2, icone: "🥚" },
      { id: 104, nome: "Cebolinha verde", quantidade: 3, icone: "🌿" }
    ],
    instrucoes: [
      "Cozinhe o macarrão de arroz em água fervente por 5 minutos e escorra.",
      "Salteie os camarões com alho e gengibre por 3 minutos.",
      "Monte a tigela com o caldo quente, o macarrão, os frutos do mar e finalize com ovo e cebolinha."
    ]
  },
  {
    id: 2,
    titulo: "Tacos saudáveis de tortilha com carne e abacate",
    categoria: "Almoço",
    autor: "Alice Fala",
    avatarAutor: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    tempo: "15 Min",
    calorias: "120 Kcal",
    carboidratos: "45g carb.",
    proteinas: "24g prot.",
    gorduras: "18g gord.",
    descricao: "Tortilhas integrais tostadas recheadas com tiras de carne grelhada, pasta cremosa de abacate, tomate e coentro fresco.",
    imagem: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    destaque: true,
    escolhaEditor: false,
    ingredientes: [
      { id: 201, nome: "Tortilha integral", quantidade: 3, icone: "🌮" },
      { id: 202, nome: "Abacate maduro", quantidade: 2, icone: "🥑" },
      { id: 203, nome: "Repolho roxo", quantidade: 1, icone: "🥬" },
      { id: 204, nome: "Tomate-cereja", quantidade: 4, icone: "🍅" },
      { id: 205, nome: "Coentro fresco", quantidade: 2, icone: "🌿" }
    ],
    instrucoes: [
      "Aqueça as tortilhas em uma frigideira seca por 30 segundos de cada lado.",
      "Amasse o abacate com limão e uma pitada de sal.",
      "Recheie as tortilhas com a carne grelhada, repolho fatiado, tomate e o creme de abacate."
    ]
  },
  {
    id: 3,
    titulo: "Bowl nutritivo com ovo caipira e salada fresca",
    categoria: "Café da manhã",
    autor: "Natalia Luca",
    avatarAutor: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    tempo: "20 Min",
    calorias: "260 Kcal",
    carboidratos: "38g carb.",
    proteinas: "22g prot.",
    gorduras: "14g gord.",
    descricao: "Tigela equilibrada com folhas crocantes, tomate-cereja, pepino, sementes de abóbora e ovos cozidos no ponto certo.",
    imagem: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    destaque: false,
    escolhaEditor: false,
    ingredientes: [
      { id: 301, nome: "Ovos caipiras", quantidade: 2, icone: "🥚" },
      { id: 302, nome: "Mix de folhas verdes", quantidade: 2, icone: "🥗" },
      { id: 303, nome: "Abacate fatiado", quantidade: 1, icone: "🥑" },
      { id: 304, nome: "Grão-de-bico cozido", quantidade: 1, icone: "🫘" }
    ],
    instrucoes: [
      "Cozinhe os ovos por 7 minutos para manter a gema cremosa.",
      "Disponha as folhas, o grão-de-bico e o abacate em uma tigela funda.",
      "Adicione os ovos cortados ao meio e regue com azeite de oliva."
    ]
  },
  {
    id: 4,
    titulo: "Torrada integral com ovo e abacate",
    categoria: "Café da manhã",
    autor: "Alice Fala",
    avatarAutor: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    tempo: "15 Min",
    calorias: "210 Kcal",
    carboidratos: "32g carb.",
    proteinas: "16g prot.",
    gorduras: "14g gord.",
    descricao: "Fatia de pão de fermentação natural dourada com creme de abacate temperado e ovo pochê finalizado com pimenta-do-reino.",
    imagem: "https://images.unsplash.com/photo-1525351484163-7529414342d8?auto=format&fit=crop&w=600&q=80",
    destaque: false,
    escolhaEditor: false,
    ingredientes: [
      { id: 401, nome: "Pão integral", quantidade: 2, icone: "🍞" },
      { id: 402, nome: "Abacate", quantidade: 1, icone: "🥑" },
      { id: 403, nome: "Ovo", quantidade: 2, icone: "🥚" }
    ],
    instrucoes: [
      "Toste as fatias de pão até ficarem crocantes.",
      "Espalhe o abacate amassado com limão sobre o pão.",
      "Finalize com o ovo por cima e sirva imediatamente."
    ]
  },
  {
    id: 5,
    titulo: "Panquecas fofas de banana com mel",
    categoria: "Café da manhã",
    autor: "James Spader",
    avatarAutor: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    tempo: "18 Min",
    calorias: "290 Kcal",
    carboidratos: "52g carb.",
    proteinas: "12g prot.",
    gorduras: "9g gord.",
    descricao: "Panquecas leves feitas com aveia e banana madura, servidas com rodelas de fruta fresca e um fio de mel puro.",
    imagem: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
    destaque: false,
    escolhaEditor: true,
    ingredientes: [
      { id: 501, nome: "Banana madura", quantidade: 2, icone: "🍌" },
      { id: 502, nome: "Aveia em flocos", quantidade: 1, icone: "🌾" },
      { id: 503, nome: "Ovo", quantidade: 2, icone: "🥚" },
      { id: 504, nome: "Mel puro", quantidade: 1, icone: "🍯" }
    ],
    instrucoes: [
      "Bata a banana, os ovos e a aveia até formar uma massa homogênea.",
      "Doure pequenas porções em frigideira antiaderente por 2 minutos de cada lado.",
      "Empilhe as panquecas e finalize com rodelas de banana e mel."
    ]
  },
  {
    id: 6,
    titulo: "Filé de salmão grelhado com legumes",
    categoria: "Jantar",
    autor: "Natalia Luca",
    avatarAutor: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    tempo: "25 Min",
    calorias: "380 Kcal",
    carboidratos: "18g carb.",
    proteinas: "34g prot.",
    gorduras: "20g gord.",
    descricao: "Posta de salmão grelhada com ervas finas acompanhada de aspargos, brócolis no vapor e rodelas de limão-siciliano.",
    imagem: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    destaque: true,
    escolhaEditor: false,
    ingredientes: [
      { id: 601, nome: "Filé de salmão", quantidade: 2, icone: "🐟" },
      { id: 602, nome: "Limão-siciliano", quantidade: 1, icone: "🍋" },
      { id: 603, nome: "Brócolis fresco", quantidade: 1, icone: "🥦" }
    ],
    instrucoes: [
      "Tempere o salmão com sal, pimenta, alho e suco de limão.",
      "Grelhe com a pele para baixo por 5 minutos e vire por mais 3 minutos.",
      "Sirva acompanhado dos legumes cozidos no vapor."
    ]
  },
  {
    id: 7,
    titulo: "Frango refogado rápido com brócolis",
    categoria: "Jantar",
    autor: "James Spader",
    avatarAutor: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    tempo: "12 Min",
    calorias: "240 Kcal",
    carboidratos: "16g carb.",
    proteinas: "31g prot.",
    gorduras: "8g gord.",
    descricao: "Cubos de peito de frango dourados em fogo alto com floretes de brócolis crocantes, gergelim e molho leve.",
    imagem: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    destaque: false,
    escolhaEditor: true,
    ingredientes: [
      { id: 701, nome: "Peito de frango", quantidade: 2, icone: "🍗" },
      { id: 702, nome: "Brócolis", quantidade: 1, icone: "🥦" },
      { id: 703, nome: "Cenoura fatiada", quantidade: 1, icone: "🥕" }
    ],
    instrucoes: [
      "Corte o frango em cubos pequenos e tempere a gosto.",
      "Refogue em frigideira bem quente até dourar.",
      "Acrescente o brócolis e a cenoura e salteie por mais 4 minutos."
    ]
  },
  {
    id: 8,
    titulo: "Salada mediterrânea de grão-de-bico e tomate",
    categoria: "Almoço",
    autor: "Alice Fala",
    avatarAutor: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    tempo: "10 Min",
    calorias: "195 Kcal",
    carboidratos: "28g carb.",
    proteinas: "11g prot.",
    gorduras: "7g gord.",
    descricao: "Salada refrescante de grão-de-bico, tomate-cereja, pepino japonês, cebola roxa e azeite extravirgem.",
    imagem: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    destaque: false,
    escolhaEditor: false,
    ingredientes: [
      { id: 801, nome: "Grão-de-bico", quantidade: 2, icone: "🫘" },
      { id: 802, nome: "Tomate-cereja", quantidade: 6, icone: "🍅" },
      { id: 803, nome: "Pepino", quantidade: 1, icone: "🥒" }
    ],
    instrucoes: [
      "Misture o grão-de-bico cozido com os tomates cortados ao meio e o pepino picado.",
      "Tempere com azeite, limão, sal e salsinha fresca.",
      "Sirva gelada ou em temperatura ambiente."
    ]
  }
];

export default receitasMock;
