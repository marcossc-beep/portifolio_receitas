import { useState } from "react";
import { API } from "../api";

export default function Cadastro({ navegar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const cadastrar = async (e) => {
    if (e) e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome || !email || !senha) {
      setErro("Preencha nome, e-mail e senha para cadastrar.");
      return;
    }

    setCarregando(true);
    try {
      const resultado = await fetch(`${API}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, nome })
      });
      const data = await resultado.json();

      if (!resultado.ok) {
        setErro(data.error || "Erro ao cadastrar usuário.");
      } else {
        setSucesso("Conta criada com sucesso! Redirecionando...");
        setTimeout(() => {
          navegar("login");
        }, 900);
      }
    } catch {
      setErro("Não foi possível conectar ao servidor. Verifique se o back-end está rodando.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="tela-auth">
      <div className="barra-topo">
        <button
          type="button"
          className="btn-icone"
          onClick={() => navegar("boas-vindas")}
          aria-label="Voltar para boas-vindas"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      </div>

      <div className="auth-cabecalho">
        <h1>Criar Nova Conta</h1>
        <p>Cadastre-se para salvar receitas favoritas e organizar seus ingredientes.</p>
      </div>

      {erro && <div className="alerta alerta-erro" role="alert">{erro}</div>}
      {sucesso && <div className="alerta alerta-sucesso" role="status">{sucesso}</div>}

      <form onSubmit={cadastrar}>
        <div className="form-grupo">
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            id="nome"
            className="input-campo"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoFocus
            required
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            className="input-campo"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="senha">Senha</label>
          <div style={{ position: "relative" }}>
            <input
              type={mostrarSenha ? "text" : "password"}
              id="senha"
              className="input-campo"
              style={{ paddingRight: "78px" }}
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                color: "var(--verde-agua-escuro)",
                fontWeight: "700",
                fontSize: "0.82rem",
                cursor: "pointer"
              }}
            >
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primario"
          disabled={carregando}
          style={{ marginTop: "8px" }}
        >
          {carregando ? "Cadastrando..." : "Criar Conta"}
        </button>
      </form>

      <div className="auth-rodape">
        Já possui uma conta?{" "}
        <button
          type="button"
          className="btn-link-destaque"
          onClick={() => navegar("login")}
        >
          Entrar
        </button>
      </div>
    </main>
  );
}
