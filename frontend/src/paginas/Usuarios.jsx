import { useEffect, useState } from "react";
import { API } from "../api";

export default function Usuarios({ navegar }) {
  const [cont, setCont] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [id, setId] = useState(0);

  const aumenta = () => {
    setCont(cont + 1);
  };

  const buscarUsuarios = async () => {
    try {
      const resultado = await fetch(`${API}/usuarios`);
      const data = await resultado.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (erro) {
      console.error("Erro ao buscar usuários:", erro);
    }
  };

  useEffect(() => {
    document.title = `Contador: ${cont}`;
    buscarUsuarios();
  }, [cont]);

  const editar = (usuario) => {
    setModal(true);
    setEmail(usuario.email);
    setNome(usuario.nome);
    setSenha(usuario.senha);
    setId(usuario.id);
  };

  const confirmarEdicao = async () => {
    const resultado = await fetch(`${API}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nome, senha })
    });
    await resultado.json();
    buscarUsuarios();
    setModal(false);
  };

  const deletar = async (usuario) => {
    if (!window.confirm(`Deseja excluir o usuário ${usuario.nome || usuario.email}?`)) {
      return;
    }
    await fetch(`${API}/usuarios/${usuario.id}`, {
      method: "DELETE"
    });
    buscarUsuarios();
  };

  return (
    <main className="pagina-sem-barra">
      <header className="barra-topo">
        <button
          type="button"
          className="btn-icone"
          onClick={() => navegar && navegar("conta")}
          aria-label="Voltar para conta"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <h1 className="barra-topo-titulo">Usuários</h1>

        <button
          type="button"
          className="btn-secundario"
          onClick={() => aumenta()}
          title="Atualizar contador e lista"
        >
          {cont} +
        </button>
      </header>

      {usuarios.length === 0 ? (
        <div className="estado-vazio">
          <p>Nenhum usuário encontrado ou servidor offline.</p>
          <button type="button" className="btn-verde" onClick={buscarUsuarios}>
            Tentar novamente
          </button>
        </div>
      ) : (
        <ul className="lista-vertical" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="card-usuario">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                <div>
                  <strong style={{ display: "block", fontSize: "1rem" }}>
                    {usuario.nome || "Usuário"}
                  </strong>
                  <span style={{ fontSize: "0.88rem", color: "var(--texto-suave)" }}>
                    {usuario.email}
                  </span>
                </div>
                <span className="status-badge">
                  STATUS: {usuario.ativo ? "Ativo" : "Inativo"}
                </span>
              </div>

              <div className="card-usuario-acoes">
                <button
                  type="button"
                  className="btn-secundario"
                  style={{ flex: 1 }}
                  onClick={() => editar(usuario)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn-perigo"
                  onClick={() => deletar(usuario)}
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {modal && (
        <div className="fundo-modal">
          <div className="modal-content">
            <h2>Editar Usuário</h2>

            <div className="form-grupo" style={{ marginBottom: 0 }}>
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                id="email"
                className="input-campo"
                value={email}
                placeholder="Digite o e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-grupo" style={{ marginBottom: 0 }}>
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                className="input-campo"
                value={nome}
                placeholder="Digite o nome"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="form-grupo" style={{ marginBottom: 0 }}>
              <label htmlFor="senha">Senha</label>
              <input
                type="text"
                id="senha"
                className="input-campo"
                value={senha}
                placeholder="Digite a senha"
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className="modal-botoes">
              <button
                type="button"
                className="btn-secundario"
                style={{ flex: 1 }}
                onClick={() => setModal(false)}
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn-primario"
                style={{ flex: 1, minHeight: "44px" }}
                onClick={() => confirmarEdicao()}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
