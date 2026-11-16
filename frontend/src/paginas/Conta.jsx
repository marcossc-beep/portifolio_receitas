import BarraNavegacao from "../componentes/BarraNavegacao";
import CardReceita from "../componentes/CardReceita";
import { AVATAR_PADRAO, FOTO_PADRAO } from "../api";

export default function Conta({ usuarioLogado, receitas, favoritos, navegar, onAbrirDetalhes, onAlternarFavorito, onDeletarReceita, onSair }) {
  const receitasFavoritas = receitas.filter((receita) => favoritos.includes(receita.id));
  const minhasReceitas = receitas.filter((receita) => receita.usuario_id === usuarioLogado.id);

  return (
    <main className="pagina-conteudo">
      <header className="barra-topo">
        <div style={{ width: "44px" }} aria-hidden="true" />
        <h1 className="barra-topo-titulo">Minha conta</h1>
        <button type="button" className="btn-icone" onClick={() => navegar("usuarios")} aria-label="Gerenciar usuários" title="Gerenciar usuários">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </button>
      </header>

      <section className="card-perfil">
        <img src={usuarioLogado.foto || AVATAR_PADRAO} alt={usuarioLogado.nome} className="avatar-perfil" />
        <div className="perfil-info">
          <h3>{usuarioLogado.nome}</h3>
          <p>{usuarioLogado.email}</p>
        </div>
        <button type="button" className="btn-secundario" onClick={onSair}>
          Sair
        </button>
      </section>

      <section>
        <div className="secao-header">
          <h2 className="secao-titulo">Meus favoritos</h2>
        </div>

        {receitasFavoritas.length === 0 ? (
          <div className="estado-vazio">
            <p>Você ainda não favoritou nenhuma receita.</p>
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

      <section>
        <div className="secao-header">
          <h2 className="secao-titulo">Minhas receitas</h2>
          <button type="button" className="btn-ver-tudo" onClick={() => navegar("nova-receita")}>
            Nova receita
          </button>
        </div>

        {minhasReceitas.length === 0 ? (
          <div className="estado-vazio">
            <p>Você ainda não cadastrou receitas.</p>
          </div>
        ) : (
          <div className="lista-vertical">
            {minhasReceitas.map((receita) => (
              <article key={receita.id} className="card-horizontal" onClick={() => onAbrirDetalhes(receita)}>
                <img src={receita.imagem || FOTO_PADRAO} alt={receita.nome} className="card-horizontal-img" />
                <div className="card-horizontal-info">
                  <h4>{receita.nome}</h4>
                  <span style={{ fontSize: "0.82rem", color: "var(--texto-suave)" }}>{receita.categoria}</span>
                </div>
                <button
                  type="button"
                  className="btn-perigo"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletarReceita(receita);
                  }}
                >
                  Excluir
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <BarraNavegacao telaAtual="conta" navegar={navegar} />
    </main>
  );
}
