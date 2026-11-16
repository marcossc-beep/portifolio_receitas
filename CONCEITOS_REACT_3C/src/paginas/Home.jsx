import { useState } from "react";
import BarraNavegacao from "../componentes/BarraNavegacao";
import CardReceita from "../componentes/CardReceita";

export default function Home({
  receitas = [],
  usuarioLogado,
  favoritos = [],
  totalItensCarrinho = 0,
  navegar,
  onAbrirDetalhes,
  onAlternarFavorito
}) {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const categorias = ["Café da manhã", "Almoço", "Jantar"];

  const receitasDestaque = receitas.filter((r) => r.destaque);
  const receitasFiltradas =
    categoriaAtiva === "Todas"
      ? receitas
      : receitas.filter((r) => r.categoria === categoriaAtiva);

  const alternarCategoria = (cat) => {
    setCategoriaAtiva((atual) => (atual === cat ? "Todas" : cat));
  };

  return (
    <main className="pagina-conteudo">
      <header className="home-header">
        <div>
          <div className="saudacao-linha">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6CB0B5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
              <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
              <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
            </svg>
            <span>Bom dia</span>
          </div>
          <h1 className="home-nome-usuario">
            {usuarioLogado?.nome || "Alena Sabyan"}
          </h1>
        </div>

        <button
          type="button"
          className="btn-icone"
          onClick={() => navegar("carrinho")}
          aria-label="Abrir lista de compras"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItensCarrinho > 0 && (
            <span className="badge-contador">{totalItensCarrinho}</span>
          )}
        </button>
      </header>

      <section aria-labelledby="titulo-featured">
        <div className="secao-header" style={{ marginTop: 0 }}>
          <h2 id="titulo-featured" className="secao-titulo">Destaques</h2>
        </div>

        <div className="carrossel-horizontal">
          {(receitasDestaque.length > 0 ? receitasDestaque : receitas.slice(0, 3)).map((receita) => (
            <article
              key={receita.id}
              className="card-featured"
              onClick={() => onAbrirDetalhes(receita)}
            >
              <img
                src={receita.imagem}
                alt={receita.titulo}
                className="card-featured-img"
              />
              <h3 className="card-featured-titulo">{receita.titulo}</h3>
              <div className="card-featured-meta">
                <div className="autor-mini">
                  <img src={receita.avatarAutor} alt={receita.autor} />
                  <span>{receita.autor}</span>
                </div>
                <div className="tempo-mini">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{receita.tempo}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="titulo-category">
        <div className="secao-header">
          <h2 id="titulo-category" className="secao-titulo">Categorias</h2>
          <button
            type="button"
            className="btn-ver-tudo"
            onClick={() => setCategoriaAtiva("Todas")}
          >
            Ver tudo
          </button>
        </div>

        <div className="filtros-categoria">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`pilula-categoria ${categoriaAtiva === cat ? "ativa" : ""}`}
              onClick={() => alternarCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="titulo-popular">
        <div className="secao-header">
          <h2 id="titulo-popular" className="secao-titulo">Receitas Populares</h2>
          <button
            type="button"
            className="btn-ver-tudo"
            onClick={() => navegar("busca")}
          >
            Ver tudo
          </button>
        </div>

        {receitasFiltradas.length === 0 ? (
          <div className="estado-vazio">
            <p>Nenhuma receita encontrada nessa categoria.</p>
            <button
              type="button"
              className="btn-secundario"
              onClick={() => setCategoriaAtiva("Todas")}
            >
              Mostrar todas
            </button>
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
