import { AVATAR_PADRAO, FOTO_PADRAO } from "../api";

// Card de uma receita: foto (link guardado no banco), nome, botão de favorito e rodapé
export default function CardReceita({ receita, favoritado = false, onAlternarFavorito, onAbrirDetalhes, mostrarAutor = false }) {
  const clicarFavorito = (e) => {
    e.stopPropagation(); // não abre os detalhes quando clica no coração
    onAlternarFavorito(receita.id);
  };

  return (
    <article className="card-receita" onClick={() => onAbrirDetalhes(receita)}>
      <div className="card-receita-topo">
        <img src={receita.imagem || FOTO_PADRAO} alt={receita.nome} loading="lazy" />

        <button
          type="button"
          className={`btn-favorito ${favoritado ? "ativo" : ""}`}
          onClick={clicarFavorito}
          aria-label={favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={favoritado ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <h3 className="card-receita-titulo">{receita.nome}</h3>

      <div className="card-receita-rodape">
        {mostrarAutor ? (
          <div className="autor-mini">
            <img src={receita.autor_foto || AVATAR_PADRAO} alt={receita.autor} />
            <span>{receita.autor}</span>
          </div>
        ) : (
          <>
            {receita.calorias && <span>{receita.calorias} Kcal</span>}
            {receita.calorias && <span>•</span>}
            <span>{receita.tempo_preparo_minutos} min</span>
          </>
        )}
      </div>
    </article>
  );
}
