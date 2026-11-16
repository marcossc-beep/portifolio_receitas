import BarraNavegacao from "../componentes/BarraNavegacao";

// Lista de compras do usuário logado (tabela item_compra)
export default function Carrinho({ itens, onAlterarQuantidade, onRemoverItem, onLimparLista, navegar }) {
  return (
    <main className="pagina-conteudo">
      <header className="barra-topo">
        <button type="button" className="btn-icone" onClick={() => navegar("home")} aria-label="Voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <h1 className="barra-topo-titulo">Lista de compras</h1>

        {itens.length > 0 ? (
          <button type="button" className="btn-ver-tudo" onClick={onLimparLista}>
            Limpar
          </button>
        ) : (
          <div style={{ width: "44px" }} aria-hidden="true" />
        )}
      </header>

      {itens.length === 0 ? (
        <div className="estado-vazio">
          <p>Sua lista de compras está vazia.</p>
          <p style={{ fontSize: "0.85rem" }}>
            Abra uma receita e clique em <strong>Adicionar à lista de compras</strong>.
          </p>
          <button type="button" className="btn-verde" onClick={() => navegar("home")}>
            Ver receitas
          </button>
        </div>
      ) : (
        <div className="lista-vertical">
          {itens.map((item) => (
            <div key={item.id} className="item-ingrediente">
              <div className="ingrediente-icone" aria-hidden="true">🥗</div>
              <span className="ingrediente-nome">{item.nome}</span>

              <div className="controle-qtd">
                <button type="button" className="btn-qtd" onClick={() => onAlterarQuantidade(item, -1)} aria-label={`Diminuir ${item.nome}`}>
                  -
                </button>
                <span className="valor-qtd">{item.quantidade}</span>
                <button type="button" className="btn-qtd" onClick={() => onAlterarQuantidade(item, 1)} aria-label={`Aumentar ${item.nome}`}>
                  +
                </button>
                <button type="button" className="btn-qtd" onClick={() => onRemoverItem(item)} aria-label={`Remover ${item.nome}`} title="Remover">
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BarraNavegacao telaAtual="carrinho" navegar={navegar} />
    </main>
  );
}
