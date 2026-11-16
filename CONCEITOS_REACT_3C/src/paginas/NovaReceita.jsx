import { useState } from "react";
import BarraNavegacao from "../componentes/BarraNavegacao";

export default function NovaReceita({
  usuarioLogado,
  navegar,
  onReceitaCriada
}) {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("Almoço");
  const [tempo, setTempo] = useState("20");
  const [calorias, setCalorias] = useState("250 Kcal");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [ingredientesTexto, setIngredientesTexto] = useState("");
  const [instrucoesTexto, setInstrucoesTexto] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const salvarReceita = async (e) => {
    e.preventDefault();
    setErro("");

    if (!nome.trim() || !ingredientesTexto.trim() || !instrucoesTexto.trim()) {
      setErro("Preencha o nome da receita, os ingredientes e o modo de preparo.");
      return;
    }

    const listaIngredientes = ingredientesTexto
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean)
      .map((itemNome, index) => ({
        id: Date.now() + index,
        nome: itemNome,
        quantidade: 1,
        icone: "🥗"
      }));

    const listaInstrucoes = instrucoesTexto
      .split(/\r?\n/)
      .map((passo) => passo.trim())
      .filter(Boolean);

    const imagemFinal =
      imagem.trim() ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

    const payload = {
      nome: nome.trim(),
      categoria,
      tempo_preparo_minutos: Number(tempo) || 15,
      calorias: calorias.trim() || "220 Kcal",
      carboidratos: "32g carb.",
      proteinas: "18g prot.",
      gorduras: "9g gord.",
      descricao: descricao.trim() || "Receita saudável adicionada pelo chef.",
      imagem: imagemFinal,
      ingredientes: listaIngredientes,
      instrucoes: listaInstrucoes,
      usuario_id: usuarioLogado?.id || 1
    };

    setSalvando(true);
    try {
      const resposta = await fetch("http://localhost:3000/receitas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (resposta.ok) {
        const criadaNoBanco = await resposta.json();
        onReceitaCriada({
          ...criadaNoBanco,
          autor: usuarioLogado?.nome || criadaNoBanco.autor || "Alena Sabyan"
        });
        return;
      }
    } catch {
      // Fallback local caso o servidor esteja offline
    } finally {
      setSalvando(false);
    }

    onReceitaCriada({
      id: Date.now(),
      titulo: payload.nome,
      nome: payload.nome,
      categoria: payload.categoria,
      autor: usuarioLogado?.nome || "Alena Sabyan",
      avatarAutor:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      tempo: `${payload.tempo_preparo_minutos} Min`,
      calorias: payload.calorias,
      carboidratos: payload.carboidratos,
      proteinas: payload.proteinas,
      gorduras: payload.gorduras,
      descricao: payload.descricao,
      imagem: payload.imagem,
      destaque: true,
      escolhaEditor: false,
      ingredientes: payload.ingredientes,
      instrucoes: payload.instrucoes
    });
  };

  return (
    <main className="pagina-conteudo">
      <header className="barra-topo">
        <button
          type="button"
          className="btn-icone"
          onClick={() => navegar("home")}
          aria-label="Voltar para o início"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <h1 className="barra-topo-titulo">Nova Receita</h1>

        <div style={{ width: "44px" }} aria-hidden="true" />
      </header>

      {erro && <div className="alerta alerta-erro" role="alert">{erro}</div>}

      <form onSubmit={salvarReceita}>
        <div className="form-grupo">
          <label htmlFor="receita-nome">Nome do prato</label>
          <input
            type="text"
            id="receita-nome"
            className="input-campo"
            placeholder="Ex: Salada Tropical com Manga"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="form-grupo">
            <label htmlFor="receita-categoria">Categoria</label>
            <select
              id="receita-categoria"
              className="input-campo"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Café da manhã">Café da manhã</option>
              <option value="Almoço">Almoço</option>
              <option value="Jantar">Jantar</option>
            </select>
          </div>

          <div className="form-grupo">
            <label htmlFor="receita-tempo">Tempo (min)</label>
            <input
              type="number"
              id="receita-tempo"
              className="input-campo"
              min="1"
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="form-grupo">
            <label htmlFor="receita-calorias">Calorias</label>
            <input
              type="text"
              id="receita-calorias"
              className="input-campo"
              placeholder="Ex: 240 Kcal"
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)}
            />
          </div>

          <div className="form-grupo">
            <label htmlFor="receita-imagem">URL da foto (opcional)</label>
            <input
              type="url"
              id="receita-imagem"
              className="input-campo"
              placeholder="https://..."
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />
          </div>
        </div>

        <div className="form-grupo">
          <label htmlFor="receita-descricao">Descrição curta</label>
          <textarea
            id="receita-descricao"
            className="input-campo"
            rows="2"
            placeholder="Conte um pouco sobre essa receita..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="receita-ingredientes">Ingredientes (um por linha ou separados por vírgula)</label>
          <textarea
            id="receita-ingredientes"
            className="input-campo"
            rows="3"
            placeholder={"Abacate\nTomate-cereja\nAzeite de oliva"}
            value={ingredientesTexto}
            onChange={(e) => setIngredientesTexto(e.target.value)}
            required
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="receita-instrucoes">Modo de preparo (um passo por linha)</label>
          <textarea
            id="receita-instrucoes"
            className="input-campo"
            rows="3"
            placeholder={"Corte os ingredientes em cubos.\nTempere com azeite e sirva."}
            value={instrucoesTexto}
            onChange={(e) => setInstrucoesTexto(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primario"
          disabled={salvando}
          style={{ marginTop: "6px" }}
        >
          {salvando ? "Salvando receita..." : "Publicar Receita"}
        </button>
      </form>

      <BarraNavegacao telaAtual="nova-receita" navegar={navegar} />
    </main>
  );
}
