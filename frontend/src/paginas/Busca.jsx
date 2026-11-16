import { useEffect, useState } from "react";
import BarraNavegacao from "../componentes/BarraNavegacao";
import { API, AVATAR_PADRAO, FOTO_PADRAO } from "../api";

const CATEGORIAS = ["Café da manhã", "Almoço", "Jantar"];

// A busca é feita pela API: GET /receitas?busca=termo&categoria=Almoço (ILIKE no banco)
export default function Busca({ navegar, onAbrirDetalhes }) {
  const [termo, setTermo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [resultado, setResultado] = useState([]);

  // Toda vez que o termo ou a categoria mudam, busca de novo
  useEffect(() => {
    const buscar = async () => {
      const resposta = await fetch(
        `${API}/receitas?busca=${encodeURIComponent(termo)}&categoria=${encodeURIComponent(categoria)}`
      );
      setResultado(await resposta.json());
    };
    buscar().catch(() => setResultado([]));
  }, [termo, categoria]);

  return (
    <main className="pagina-conteudo">
      <header className="barra-topo">
        <button type="button" className="btn-icone" onClick={() => navegar("home")} aria-label="Voltar para o início">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 className="barra-topo-titulo">Buscar</h1>
        <div style={{ width: "44px" }} aria-hidden="true" />
      </header>

      <div className="campo-busca">
        <svg className="campo-busca-icone" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          placeholder="Nome da receita ou ingrediente..."
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
        />
      </div>

      <div className="filtros-categoria">
        {CATEGORIAS.map((item) => (
          <button
            key={item}
            type="button"
            className={`pilula-categoria ${categoria === item ? "ativa" : ""}`}
            onClick={() => setCategoria(categoria === item ? "" : item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="secao-header">
        <h2 className="secao-titulo">{resultado.length} receita(s)</h2>
      </div>

      {resultado.length === 0 ? (
        <div className="estado-vazio">
          <p>Nenhuma receita encontrada.</p>
        </div>
      ) : (
        <div className="lista-vertical">
          {resultado.map((receita) => (
            <article key={receita.id} className="card-horizontal" onClick={() => onAbrirDetalhes(receita)}>
              <img src={receita.imagem || FOTO_PADRAO} alt={receita.nome} className="card-horizontal-img" loading="lazy" />
              <div className="card-horizontal-info">
                <h4>{receita.nome}</h4>
                <div className="autor-mini" style={{ color: "var(--texto-suave)", fontSize: "0.82rem" }}>
                  <img src={receita.autor_foto || AVATAR_PADRAO} alt={receita.autor} />
                  <span>{receita.autor} • {receita.categoria}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <BarraNavegacao telaAtual="busca" navegar={navegar} />
    </main>
  );
}
