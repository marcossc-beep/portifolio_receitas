import { useState } from "react";
import { FOTO_PADRAO, linhas } from "../api";

export default function DetalhesReceita({ receita, favoritado, onAlternarFavorito, onAdicionarNaLista, onVoltar }) {
  const [aba, setAba] = useState("ingredientes");
  const [aviso, setAviso] = useState("");

  if (!receita) {
    return (
      <main className="pagina-sem-barra">
        <div className="estado-vazio">
          <p>Nenhuma receita selecionada.</p>
          <button type="button" className="btn-primario" onClick={onVoltar}>Voltar</button>
        </div>
      </main>
    );
  }

  // No banco os ingredientes e o modo de preparo são texto, um item por linha
  const ingredientes = linhas(receita.ingredientes);
  const passos = linhas(receita.instrucoes);

  const adicionarTodos = async () => {
    await onAdicionarNaLista(ingredientes);
    setAviso("Ingredientes adicionados à lista de compras!");
  };

  const nutrientes = [
    { valor: receita.carboidratos, unidade: "g carboidratos" },
    { valor: receita.proteinas, unidade: "g proteínas" },
    { valor: receita.calorias, unidade: " Kcal" },
    { valor: receita.gorduras, unidade: "g gorduras" }
  ];

  return (
    <main className="tela-detalhes">
      <div className="detalhes-capa">
        <img src={receita.imagem || FOTO_PADRAO} alt={receita.nome} />

        <div className="detalhes-acoes-topo">
          <button type="button" className="btn-icone" onClick={onVoltar} aria-label="Fechar detalhes">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            type="button"
            className="btn-icone"
            onClick={() => onAlternarFavorito(receita.id)}
            aria-label={favoritado ? "Remover dos favoritos" : "Favoritar receita"}
            style={{ color: favoritado ? "var(--verde-agua)" : "var(--azul-escuro)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={favoritado ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      <section className="detalhes-painel">
        <div className="puxador-painel" aria-hidden="true" />

        <div className="detalhes-cabecalho">
          <h1>{receita.nome}</h1>
          <div className="detalhes-tempo">
            <span>{receita.tempo_preparo_minutos} min</span>
          </div>
        </div>

        <p className="detalhes-descricao">{receita.descricao}</p>
        <p style={{ fontSize: "0.85rem", color: "var(--texto-suave)", marginTop: 0 }}>
          {receita.categoria} • por {receita.autor}
        </p>

        <div className="grade-nutrientes">
          {nutrientes
            .filter((item) => item.valor !== null && item.valor !== undefined)
            .map((item) => (
              <div key={item.unidade} className="item-nutriente">
                <span>{item.valor}{item.unidade}</span>
              </div>
            ))}
        </div>

        <div className="abas-detalhes" role="tablist">
          <button type="button" className={`aba-btn ${aba === "ingredientes" ? "ativa" : ""}`} onClick={() => setAba("ingredientes")}>
            Ingredientes
          </button>
          <button type="button" className={`aba-btn ${aba === "preparo" ? "ativa" : ""}`} onClick={() => setAba("preparo")}>
            Modo de preparo
          </button>
        </div>

        {aviso && <div className="alerta alerta-sucesso" role="status">{aviso}</div>}

        {aba === "ingredientes" ? (
          <div>
            <div className="secao-header" style={{ marginTop: 0 }}>
              <h2 className="secao-titulo">{ingredientes.length} ingredientes</h2>
              <button type="button" className="btn-ver-tudo" onClick={adicionarTodos}>
                Adicionar à lista de compras
              </button>
            </div>

            <div className="lista-vertical">
              {ingredientes.map((ingrediente) => (
                <div key={ingrediente} className="item-ingrediente">
                  <div className="ingrediente-icone" aria-hidden="true">🥗</div>
                  <span className="ingrediente-nome">{ingrediente}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ol className="lista-instrucoes">
            {passos.map((passo, indice) => (
              <li key={indice} className="item-instrucao">
                <span className="numero-passo">{indice + 1}</span>
                <span>{passo}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
