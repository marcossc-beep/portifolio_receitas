import { useState } from "react";
import BarraNavegacao from "../componentes/BarraNavegacao";

export default function Busca({
  receitas = [],
  navegar,
  onAbrirDetalhes
}) {
  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const categorias = ["Café da manhã", "Almoço", "Jantar"];

  const alternarCategoria = (cat) => {
    setCategoriaAtiva((atual) => (atual === cat ? "Todas" : cat));
  };

  const termoNormalizado = termoBusca.trim().toLowerCase();

  const receitasFiltradas = receitas.filter((receita) => {
    const bateCategoria =
      categoriaAtiva === "Todas" || receita.categoria === categoriaAtiva;

    if (!termoNormalizado) return bateCategoria;

    const bateTitulo = receita.titulo.toLowerCase().includes(termoNormalizado);
    const bateAutor = (receita.autor || "").toLowerCase().includes(termoNormalizado);
    const bateIngrediente = (receita.ingredientes || []).some((ing) =>
      ing.nome.toLowerCase().includes(termoNormalizado)
    );

    return bateCategoria && (bateTitulo || bateAutor || bateIngrediente);
  });

  const populares = receitasFiltradas.slice(0, 5);
  const escolhaEditor = receitasFiltradas.filter((r) => r.escolhaEditor);
  const listaEditor =
    escolhaEditor.length > 0 ? escolhaEditor : receitasFiltradas;

  return (
    <main className="pagina-conteudo">
      <header className="barra-topo">
        <button
          type="button"
          className="btn-icone"
          onClick={() => navegar("home")}
          aria-label="Voltar para o início"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <h1 className="barra-topo-titulo">Buscar</h1>

        <div style={{ width: "44px" }} aria-hidden="true" />
      </header>

      <div className="campo-busca">
        <svg
          className="campo-busca-icone"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          placeholder="Buscar receitas ou ingredientes..."
          aria-label="Buscar receitas por nome ou ingrediente"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
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

      {receitasFiltradas.length === 0 ? (
        <div className="estado-vazio" style={{ marginTop: "24px" }}>
          <p>Nenhuma receita encontrada para "{termoBusca}".</p>
          <button
            type="button"
            className="btn-secundario"
            onClick={() => {
              setTermoBusca("");
              setCategoriaAtiva("Todas");
            }}
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <>
          <section aria-labelledby="busca-popular">
            <div className="secao-header">
              <h2 id="busca-popular" className="secao-titulo">Receitas Populares</h2>
              <button
                type="button"
                className="btn-ver-tudo"
                onClick={() => {
                  setTermoBusca("");
                  setCategoriaAtiva("Todas");
                }}
              >
                Ver tudo
              </button>
            </div>

            <div className="carrossel-horizontal">
              {populares.map((receita) => (
                <article
                  key={receita.id}
                  className="card-mini-receita"
                  onClick={() => onAbrirDetalhes(receita)}
                >
                  <img
                    src={receita.imagem}
                    alt={receita.titulo}
                    loading="lazy"
                  />
                  <p>{receita.titulo}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="busca-editor">
            <div className="secao-header">
              <h2 id="busca-editor" className="secao-titulo">Escolha do Editor</h2>
              <button
                type="button"
                className="btn-ver-tudo"
                onClick={() => {
                  setTermoBusca("");
                  setCategoriaAtiva("Todas");
                }}
              >
                Ver tudo
              </button>
            </div>

            <div className="lista-vertical">
              {listaEditor.map((receita) => (
                <article
                  key={receita.id}
                  className="card-horizontal"
                  onClick={() => onAbrirDetalhes(receita)}
                >
                  <img
                    src={receita.imagem}
                    alt={receita.titulo}
                    className="card-horizontal-img"
                    loading="lazy"
                  />

                  <div className="card-horizontal-info">
                    <h4>{receita.titulo}</h4>
                    <div className="autor-mini" style={{ color: "var(--texto-suave)", fontSize: "0.82rem" }}>
                      <img src={receita.avatarAutor} alt={receita.autor} />
                      <span>{receita.autor}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-seta-escura"
                    aria-label={`Ver detalhes de ${receita.titulo}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      <BarraNavegacao telaAtual="busca" navegar={navegar} />
    </main>
  );
}
