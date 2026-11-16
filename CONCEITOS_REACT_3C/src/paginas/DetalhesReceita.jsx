import { useEffect, useState } from "react";

export default function DetalhesReceita({
  receita,
  favoritado = false,
  onAlternarFavorito,
  onAdicionarCarrinho,
  onVoltar
}) {
  const [abaAtiva, setAbaAtiva] = useState("ingredientes");
  const [descricaoExpandida, setDescricaoExpandida] = useState(false);
  const [ingredientesLocais, setIngredientesLocais] = useState([]);
  const [avisoCarrinho, setAvisoCarrinho] = useState("");

  useEffect(() => {
    if (receita?.ingredientes) {
      setIngredientesLocais(receita.ingredientes.map((item) => ({ ...item })));
    } else {
      setIngredientesLocais([]);
    }
    setDescricaoExpandida(false);
    setAbaAtiva("ingredientes");
    setAvisoCarrinho("");
  }, [receita]);

  if (!receita) {
    return (
      <main className="pagina-sem-barra">
        <div className="estado-vazio">
          <p>Nenhuma receita selecionada.</p>
          <button type="button" className="btn-primario" onClick={onVoltar}>
            Voltar para o início
          </button>
        </div>
      </main>
    );
  }

  const alterarQuantidade = (idIngrediente, delta) => {
    setIngredientesLocais((listaAtual) =>
      listaAtual.map((item) =>
        item.id === idIngrediente
          ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
          : item
      )
    );
  };

  const lidarComAdicionarTodos = () => {
    if (onAdicionarCarrinho && ingredientesLocais.length > 0) {
      onAdicionarCarrinho(ingredientesLocais);
      setAvisoCarrinho("Ingredientes adicionados à sua lista de compras!");
      setTimeout(() => setAvisoCarrinho(""), 2500);
    }
  };

  const descricaoTexto = receita.descricao || "";
  const descricaoCurta =
    descricaoTexto.length > 88 && !descricaoExpandida
      ? descricaoTexto.slice(0, 88) + "..."
      : descricaoTexto;

  return (
    <main className="tela-detalhes">
      <div className="detalhes-capa">
        <img src={receita.imagem} alt={receita.titulo} />

        <div className="detalhes-acoes-topo">
          <button
            type="button"
            className="btn-icone"
            onClick={onVoltar}
            aria-label="Fechar detalhes"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            type="button"
            className="btn-icone"
            onClick={() => onAlternarFavorito && onAlternarFavorito(receita.id)}
            aria-label={favoritado ? "Remover dos favoritos" : "Favoritar receita"}
            style={{ color: favoritado ? "var(--verde-agua)" : "var(--azul-escuro)" }}
          >
            <svg
              width="20"
              height="20"
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
      </div>

      <section className="detalhes-painel">
        <div className="puxador-painel" aria-hidden="true" />

        <div className="detalhes-cabecalho">
          <h1>{receita.titulo}</h1>
          <div className="detalhes-tempo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{receita.tempo}</span>
          </div>
        </div>

        <p className="detalhes-descricao">
          {descricaoCurta}
          {descricaoTexto.length > 88 && (
            <button
              type="button"
              className="btn-view-more"
              onClick={() => setDescricaoExpandida(!descricaoExpandida)}
            >
              {descricaoExpandida ? "Ver menos" : "Ver mais"}
            </button>
          )}
        </p>

        <div className="grade-nutrientes">
          <div className="item-nutriente">
            <div className="icone-nutriente" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M8 6l4 4 4-4M8 12l4 4 4-4M8 18l4 4 4-4" />
              </svg>
            </div>
            <span>{receita.carboidratos}</span>
          </div>

          <div className="item-nutriente">
            <div className="icone-nutriente" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3C7.5 3 4 7.5 4 13a8 8 0 0 0 16 0c0-5.5-3.5-10-8-10z" />
                <circle cx="12" cy="14" r="3" />
              </svg>
            </div>
            <span>{receita.proteinas}</span>
          </div>

          <div className="item-nutriente">
            <div className="icone-nutriente" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
            </div>
            <span>{receita.calorias}</span>
          </div>

          <div className="item-nutriente">
            <div className="icone-nutriente" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 19h20L12 2z" />
                <circle cx="12" cy="14" r="1.5" />
              </svg>
            </div>
            <span>{receita.gorduras}</span>
          </div>
        </div>

        <div className="abas-detalhes" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={abaAtiva === "ingredientes"}
            className={`aba-btn ${abaAtiva === "ingredientes" ? "ativa" : ""}`}
            onClick={() => setAbaAtiva("ingredientes")}
          >
            Ingredientes
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={abaAtiva === "instrucoes"}
            className={`aba-btn ${abaAtiva === "instrucoes" ? "ativa" : ""}`}
            onClick={() => setAbaAtiva("instrucoes")}
          >
            Modo de Preparo
          </button>
        </div>

        {avisoCarrinho && (
          <div className="alerta alerta-sucesso" role="status">
            {avisoCarrinho}
          </div>
        )}

        {abaAtiva === "ingredientes" ? (
          <div>
            <div className="secao-header" style={{ marginTop: 0 }}>
              <div>
                <h2 className="secao-titulo">Ingredientes</h2>
                <span style={{ fontSize: "0.82rem", color: "var(--texto-suave)" }}>
                  {ingredientesLocais.length} {ingredientesLocais.length === 1 ? "Item" : "Itens"}
                </span>
              </div>

              <button
                type="button"
                className="btn-ver-tudo"
                onClick={lidarComAdicionarTodos}
              >
                Adicionar ao Carrinho
              </button>
            </div>

            <div className="lista-vertical">
              {ingredientesLocais.map((item) => (
                <div key={item.id} className="item-ingrediente">
                  <div className="ingrediente-icone" aria-hidden="true">
                    {item.icone || "🥗"}
                  </div>

                  <span className="ingrediente-nome">{item.nome}</span>

                  <div className="controle-qtd">
                    <button
                      type="button"
                      className="btn-qtd"
                      onClick={() => alterarQuantidade(item.id, -1)}
                      aria-label={`Diminuir quantidade de ${item.nome}`}
                    >
                      -
                    </button>
                    <span className="valor-qtd">{item.quantidade}</span>
                    <button
                      type="button"
                      className="btn-qtd"
                      onClick={() => alterarQuantidade(item.id, 1)}
                      aria-label={`Aumentar quantidade de ${item.nome}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="secao-header" style={{ marginTop: 0 }}>
              <h2 className="secao-titulo">Modo de Preparo</h2>
            </div>

            <ol className="lista-instrucoes">
              {(receita.instrucoes || []).map((passo, indice) => (
                <li key={indice} className="item-instrucao">
                  <span className="numero-passo">{indice + 1}</span>
                  <span>{passo}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </main>
  );
}
