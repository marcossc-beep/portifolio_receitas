import BarraNavegacao from "../componentes/BarraNavegacao";
import CardReceita from "../componentes/CardReceita";

export default function Conta({
  usuarioLogado,
  receitas = [],
  favoritos = [],
  navegar,
  onAbrirDetalhes,
  onAlternarFavorito,
  onLogout
}) {
  const receitasFavoritas = receitas.filter((receita) =>
    favoritos.includes(receita.id)
  );

  const sairDaConta = () => {
    if (onLogout) {
      onLogout();
    } else {
      navegar("boas-vindas");
    }
  };

  return (
    <main className="pagina-conteudo">
      <header className="barra-topo">
        <div style={{ width: "44px" }} aria-hidden="true" />

        <h1 className="barra-topo-titulo">Minha Conta</h1>

        <button
          type="button"
          className="btn-icone"
          onClick={() => navegar("usuarios")}
          aria-label="Configurações e gerenciamento de usuários"
          title="Gerenciar usuários"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </header>

      <section className="card-perfil" aria-label="Dados do perfil">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
          alt={usuarioLogado?.nome || "Alena Sabyan"}
          className="avatar-perfil"
        />

        <div className="perfil-info">
          <h3>{usuarioLogado?.nome || "Alena Sabyan"}</h3>
          <p>{usuarioLogado?.email || "Criadora de Receitas"}</p>
        </div>

        <button
          type="button"
          className="btn-seta-escura"
          onClick={sairDaConta}
          aria-label="Sair da conta"
          title="Sair da conta"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </section>

      <section aria-labelledby="titulo-favoritos">
        <div className="secao-header">
          <h2 id="titulo-favoritos" className="secao-titulo">Meus Favoritos</h2>
          <button
            type="button"
            className="btn-ver-tudo"
            onClick={() => navegar("busca")}
          >
            Ver tudo
          </button>
        </div>

        {receitasFavoritas.length === 0 ? (
          <div className="estado-vazio">
            <p>Você ainda não favoritou nenhuma receita.</p>
            <button
              type="button"
              className="btn-verde"
              onClick={() => navegar("home")}
            >
              Explorar receitas
            </button>
          </div>
        ) : (
          <div className="grade-receitas">
            {receitasFavoritas.map((receita) => (
              <CardReceita
                key={receita.id}
                receita={receita}
                favoritado={true}
                onAlternarFavorito={onAlternarFavorito}
                onAbrirDetalhes={onAbrirDetalhes}
                mostrarAutor={true}
              />
            ))}
          </div>
        )}
      </section>

      <BarraNavegacao telaAtual="conta" navegar={navegar} />
    </main>
  );
}
