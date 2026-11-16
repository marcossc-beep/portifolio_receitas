import { useState } from "react";
import BarraNavegacao from "../componentes/BarraNavegacao";
import { API } from "../api";

// Cadastro de receita: tudo vai para a tabela receita pela rota POST /receitas
export default function NovaReceita({ usuarioLogado, navegar, onReceitaCriada }) {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("Almoço");
  const [tempo, setTempo] = useState("");
  const [calorias, setCalorias] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [instrucoes, setInstrucoes] = useState("");
  const [erro, setErro] = useState("");

  const salvar = async (e) => {
    e.preventDefault();

    const receita = {
      nome,
      categoria,
      tempo_preparo_minutos: Number(tempo),
      calorias: calorias ? Number(calorias) : null,
      imagem,
      descricao,
      ingredientes, // texto do textarea: um ingrediente por linha
      instrucoes,   // texto do textarea: um passo por linha
      usuario_id: usuarioLogado.id
    };

    const resposta = await fetch(`${API}/receitas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(receita)
    });
    const dados = await resposta.json();

    if (!resposta.ok) {
      setErro(dados.error);
      return;
    }
    onReceitaCriada();
  };

  return (
    <main className="pagina-conteudo">
      <header className="barra-topo">
        <button type="button" className="btn-icone" onClick={() => navegar("home")} aria-label="Voltar para o início">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 className="barra-topo-titulo">Nova receita</h1>
        <div style={{ width: "44px" }} aria-hidden="true" />
      </header>

      {erro && <div className="alerta alerta-erro" role="alert">{erro}</div>}

      <form onSubmit={salvar}>
        <div className="form-grupo">
          <label htmlFor="nome">Nome do prato</label>
          <input id="nome" className="input-campo" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="form-grupo">
            <label htmlFor="categoria">Categoria</label>
            <select id="categoria" className="input-campo" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option>Café da manhã</option>
              <option>Almoço</option>
              <option>Jantar</option>
            </select>
          </div>

          <div className="form-grupo">
            <label htmlFor="tempo">Tempo (min)</label>
            <input id="tempo" type="number" min="1" className="input-campo" value={tempo} onChange={(e) => setTempo(e.target.value)} required />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px" }}>
          <div className="form-grupo">
            <label htmlFor="calorias">Calorias (Kcal)</label>
            <input id="calorias" type="number" min="0" className="input-campo" value={calorias} onChange={(e) => setCalorias(e.target.value)} />
          </div>

          <div className="form-grupo">
            <label htmlFor="imagem">Link da foto</label>
            <input id="imagem" type="url" className="input-campo" placeholder="https://..." value={imagem} onChange={(e) => setImagem(e.target.value)} />
          </div>
        </div>

        <div className="form-grupo">
          <label htmlFor="descricao">Descrição</label>
          <textarea id="descricao" className="input-campo" rows="2" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>

        <div className="form-grupo">
          <label htmlFor="ingredientes">Ingredientes (um por linha)</label>
          <textarea id="ingredientes" className="input-campo" rows="4" placeholder={"Abacate\nTomate-cereja\nAzeite"} value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} required />
        </div>

        <div className="form-grupo">
          <label htmlFor="instrucoes">Modo de preparo (um passo por linha)</label>
          <textarea id="instrucoes" className="input-campo" rows="4" value={instrucoes} onChange={(e) => setInstrucoes(e.target.value)} required />
        </div>

        <button type="submit" className="btn-primario">Publicar receita</button>
      </form>

      <BarraNavegacao telaAtual="nova-receita" navegar={navegar} />
    </main>
  );
}
