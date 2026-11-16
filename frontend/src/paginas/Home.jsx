import { useState } from "react";
import BarraNavegacao from "../componentes/BarraNavegacao";
import CardReceita from "../componentes/CardReceita";
import { AVATAR_PADRAO, FOTO_PADRAO } from "../api";

const CATEGORIAS = ["Café da manhã", "Almoço", "Jantar"];

export default function Home({ receitas, erroApi, usuarioLogado, favoritos, totalItensLista, navegar, onAbrirDetalhes, onAlternarFavorito }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");

  // destaque = coluna destaque da tabela receita
  const destaques = receitas.filter((receita) => receita.destaque);

  // clicar de novo na mesma categoria volta para "Todas"
  const alternarCategoria = (categoria) => {
    setCategoriaAtiva(categoriaAtiva === categoria ? "Todas" : categoria);
  };

  const receitasFiltradas =
    categoriaAtiva === "Todas" ? receitas : receitas.filter((receita) => receita.categoria === categoriaAtiva);

  return (
    <main className="pagina-conteudo">
      <header className="home-header">
        <div>
          <div className="saudacao-linha">
            <span>Olá,</span>
          </div>
          <h1 className="home-nome-usuario">{usuarioLogado ? usuarioLogado.nome : "visitante"}</h1>
        </div>

        <button type="button" className="btn-icone" onClick={() => navegar("carrinho")} aria-label="Abrir lista de compras">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItensLista > 0 && <span className="badge-contador">{totalItensLista}</span>}
        </button>
      </header>

      {erroApi && <div className="alerta alerta-erro" role="alert">{erroApi}</div>}

      <section>
        <div className="secao-header" style={{ marginTop: 0 }}>
          <h2 className="secao-titulo">Destaques</h2>
        </div>

        <div className="carrossel-horizontal">
          {destaques.map((receita) => (
            <article key={receita.id} className="card-featured" onClick={() => onAbrirDetalhes(receita)}>
              <img src={receita.imagem || FOTO_PADRAO} alt={receita.nome} className="card-featured-img" />
              <h3 className="card-featured-titulo">{receita.nome}</h3>
              <div className="card-featured-meta">
                <div className="autor-mini">
                  <img src={receita.autor_foto || AVATAR_PADRAO} alt={receita.autor} />
                  <span>{receita.autor}</span>
                </div>
                <div className="tempo-mini">
                  <span>{receita.tempo_preparo_minutos} min</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="secao-header">
          <h2 className="secao-titulo">Categorias</h2>
          <button type="button" className="btn-ver-tudo" onClick={() => setCategoriaAtiva("Todas")}>
            Ver tudo
          </button>
        </div>

        <div className="filtros-categoria">
          {CATEGORIAS.map((categoria) => (
            <button
              key={categoria}
              type="button"
              className={`pilula-categoria ${categoriaAtiva === categoria ? "ativa" : ""}`}
              onClick={() => alternarCategoria(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="secao-header">
          <h2 className="secao-titulo">Receitas</h2>
          <button type="button" className="btn-ver-tudo" onClick={() => navegar("busca")}>
            Buscar
          </button>
        </div>

        {receitasFiltradas.length === 0 ? (
          <div className="estado-vazio">
            <p>Nenhuma receita encontrada.</p>
          </div>
        ) : (
          <div className="grade-receitas">
            {receitasFiltradas.map((receita) => (
              <CardReceita
                key={receita.id}
                receita={receita}
                favoritado={favoritos.includes(receita.id)}
                onAlternarFavorito={onAlternarFavorito}
                onAbrirDetalhes={onAbrirDetalhes}
              />
            ))}
          </div>
        )}
      </section>

      <BarraNavegacao telaAtual="home" navegar={navegar} />
    </main>
  );
}
