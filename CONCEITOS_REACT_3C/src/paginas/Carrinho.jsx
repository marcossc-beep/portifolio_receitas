import BarraNavegacao from "../componentes/BarraNavegacao";

export default function Carrinho({
  itensCarrinho = [],
  onAtualizarQuantidade,
  onRemoverItem,
  onLimparCarrinho,
  navegar,
  onVoltar
}) {
  const totalUnidades = itensCarrinho.reduce(
    (soma, item) => soma + (item.quantidade || 1),
    0
  );

  const voltar = () => {
    if (onVoltar) {
      onVoltar();
    } else if (navegar) {
      navegar("home");
    }
  };

  return (
    <main className="pagina-conteudo">
      <header className="barra-topo">
        <button
          type="button"
          className="btn-icone"
          onClick={voltar}
          aria-label="Voltar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <h1 className="barra-topo-titulo">Lista de Compras</h1>

        {itensCarrinho.length > 0 ? (
          <button
            type="button"
            className="btn-ver-tudo"
            onClick={onLimparCarrinho}
          >
            Limpar
          </button>
        ) : (
          <div style={{ width: "44px" }} aria-hidden="true" />
        )}
      </header>

      {itensCarrinho.length === 0 ? (
        <div className="estado-vazio" style={{ marginTop: "16px" }}>
          <p>Sua lista de compras está vazia.</p>
          <p style={{ fontSize: "0.85rem" }}>
            Abra uma receita e clique em <strong>Adicionar ao Carrinho</strong> para listar os ingredientes aqui.
          </p>
          <button
            type="button"
            className="btn-verde"
            onClick={() => navegar && navegar("home")}
          >
            Ver receitas
          </button>
        </div>
      ) : (
        <>
          <div className="secao-header" style={{ marginTop: "4px" }}>
            <h2 className="secao-titulo">Ingredientes</h2>
            <span style={{ fontSize: "0.85rem", color: "var(--texto-suave)", fontWeight: 600 }}>
              {totalUnidades} {totalUnidades === 1 ? "item" : "itens"}
            </span>
          </div>

          <div className="lista-vertical">
            {itensCarrinho.map((item) => (
              <div key={item.id} className="item-ingrediente">
                <div className="ingrediente-icone" aria-hidden="true">
                  {item.icone || "🥗"}
                </div>

                <span className="ingrediente-nome">{item.nome}</span>

                <div className="controle-qtd">
                  <button
                    type="button"
                    className="btn-qtd"
                    onClick={() => onAtualizarQuantidade && onAtualizarQuantidade(item.id, -1)}
                    aria-label={`Diminuir ${item.nome}`}
                  >
                    -
                  </button>
                  <span className="valor-qtd">{item.quantidade}</span>
                  <button
                    type="button"
                    className="btn-qtd"
                    onClick={() => onAtualizarQuantidade && onAtualizarQuantidade(item.id, 1)}
                    aria-label={`Aumentar ${item.nome}`}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoverItem && onRemoverItem(item.id)}
                    aria-label={`Remover ${item.nome}`}
                    title="Remover item"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "var(--erro)",
                      cursor: "pointer",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              type="button"
              className="btn-primario"
              onClick={onLimparCarrinho}
            >
              Concluir compras
            </button>
          </div>
        </>
      )}

      <BarraNavegacao telaAtual="carrinho" navegar={navegar} />
    </main>
  );
}
