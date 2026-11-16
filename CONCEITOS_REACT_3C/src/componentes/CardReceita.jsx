export default function CardReceita({
  receita,
  favoritado = false,
  onAlternarFavorito,
  onAbrirDetalhes,
  mostrarAutor = false
}) {
  const lidarComFavorito = (e) => {
    e.stopPropagation();
    if (onAlternarFavorito) {
      onAlternarFavorito(receita.id);
    }
  };

  return (
    <article
      className="card-receita"
      onClick={() => onAbrirDetalhes && onAbrirDetalhes(receita)}
    >
      <div className="card-receita-topo">
        <img
          src={receita.imagem}
          alt={receita.titulo}
          loading="lazy"
        />

        <button
          type="button"
          className={`btn-favorito ${favoritado ? "ativo" : ""}`}
          onClick={lidarComFavorito}
          aria-label={favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          title={favoritado ? "Remover dos favoritos" : "Favoritar"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={favoritado ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <h3 className="card-receita-titulo">{receita.titulo}</h3>

      {mostrarAutor ? (
        <div className="card-receita-rodape">
          <div className="autor-mini">
            <img
              src={receita.avatarAutor}
              alt={receita.autor}
            />
            <span>{receita.autor}</span>
          </div>
        </div>
      ) : (
        <div className="card-receita-rodape">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
            {receita.calorias}
          </span>
          <span>•</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {receita.tempo}
          </span>
        </div>
      )}
    </article>
  );
}
