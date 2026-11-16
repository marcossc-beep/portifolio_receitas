import { useState } from "react";

export default function Login({ navegar, onLoginSucesso }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const entrar = async (e) => {
    if (e) e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha o e-mail e a senha para entrar.");
      return;
    }

    setCarregando(true);
    try {
      const resultado = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });
      const data = await resultado.json();

      if (!resultado.ok) {
        setErro(data.error || "E-mail ou senha inválidos.");
      } else {
        if (onLoginSucesso) {
          onLoginSucesso(data.usuario || { nome: email.split("@")[0], email });
        } else {
          navegar("home");
        }
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
        <h1>Bem-vindo de volta</h1>
        <p>Entre na sua conta para acessar suas receitas favoritas e lista de compras.</p>
      </div>

      {erro && <div className="alerta alerta-erro" role="alert">{erro}</div>}

      <form onSubmit={entrar}>
        <div className="form-grupo">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            className="input-campo"
            placeholder="alena@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
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
              placeholder="Digite sua senha"
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
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="auth-rodape">
        Ainda não tem conta?{" "}
        <button
          type="button"
          className="btn-link-destaque"
          onClick={() => navegar("cadastro")}
        >
          Criar Nova Conta
        </button>
      </div>
    </main>
  );
}
