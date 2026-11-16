import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./api";
import BoasVindas from "./paginas/BoasVindas";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Home from "./paginas/Home";
import Busca from "./paginas/Busca";
import DetalhesReceita from "./paginas/DetalhesReceita";
import NovaReceita from "./paginas/NovaReceita";
import Conta from "./paginas/Conta";
import Carrinho from "./paginas/Carrinho";
import Usuarios from "./paginas/Usuarios";

// Telas que só abrem com alguém logado
const TELAS_COM_LOGIN = ["conta", "carrinho", "nova-receita", "usuarios"];

function App() {
  // O usuário logado fica guardado no navegador para não perder o login ao recarregar
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

  const [tela, setTela] = useState(usuarioSalvo ? "home" : "boas-vindas");
  const [telaAnterior, setTelaAnterior] = useState("home");
  const [usuarioLogado, setUsuarioLogado] = useState(usuarioSalvo);
  const [receitas, setReceitas] = useState([]);
  const [erroApi, setErroApi] = useState("");
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [compras, setCompras] = useState([]);

  // ---------- dados vindos da API ----------

  const carregarReceitas = async () => {
    try {
      const resposta = await fetch(`${API}/receitas`);
      setReceitas(await resposta.json());
      setErroApi("");
    } catch {
      setErroApi("Não foi possível conectar à API. Confira se o back-end está rodando (npm start na pasta backend).");
    }
  };

  const carregarFavoritos = async (usuario) => {
    if (!usuario) return setFavoritos([]);
    const resposta = await fetch(`${API}/favoritos/${usuario.id}`);
    setFavoritos(await resposta.json());
  };

  const carregarCompras = async (usuario) => {
    if (!usuario) return setCompras([]);
    const resposta = await fetch(`${API}/compras/${usuario.id}`);
    setCompras(await resposta.json());
  };

  useEffect(() => {
    carregarReceitas();
  }, []);

  // Sempre que o usuário muda (login ou logout), recarrega favoritos e lista de compras
  useEffect(() => {
    carregarFavoritos(usuarioLogado).catch(() => {});
    carregarCompras(usuarioLogado).catch(() => {});
  }, [usuarioLogado]);

  // ---------- navegação ----------

  const navegar = (novaTela) => {
    if (TELAS_COM_LOGIN.includes(novaTela) && !usuarioLogado) {
      novaTela = "login";
    }
    if (novaTela !== "detalhes") {
      setTelaAnterior(novaTela);
    }
    setTela(novaTela);
    window.scrollTo(0, 0);
  };

  const voltar = () => {
    setTela(telaAnterior || "home");
    window.scrollTo(0, 0);
  };

  const abrirDetalhes = (receita) => {
    setTelaAnterior(tela);
    setReceitaSelecionada(receita);
    setTela("detalhes");
    window.scrollTo(0, 0);
  };

  // ---------- login ----------

  const entrar = (usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUsuarioLogado(usuario);
    navegar("home");
  };

  const sair = () => {
    localStorage.removeItem("usuario");
    setUsuarioLogado(null);
    setTela("boas-vindas");
  };

  // ---------- receitas ----------

  const receitaCriada = () => {
    carregarReceitas();
    navegar("home");
  };

  const deletarReceita = async (receita) => {
    if (!window.confirm(`Deseja excluir a receita "${receita.nome}"?`)) return;
    await fetch(`${API}/receitas/${receita.id}`, { method: "DELETE" });
    carregarReceitas();
    carregarFavoritos(usuarioLogado);
  };

  // ---------- favoritos ----------

  const alternarFavorito = async (receitaId) => {
    if (!usuarioLogado) return navegar("login");

    if (favoritos.includes(receitaId)) {
      await fetch(`${API}/favoritos/${usuarioLogado.id}/${receitaId}`, { method: "DELETE" });
    } else {
      await fetch(`${API}/favoritos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id: usuarioLogado.id, receita_id: receitaId })
      });
    }
    carregarFavoritos(usuarioLogado);
  };

  // ---------- lista de compras ----------

  const adicionarNaLista = async (ingredientes) => {
    if (!usuarioLogado) return navegar("login");

    for (const nome of ingredientes) {
      await fetch(`${API}/compras`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id: usuarioLogado.id, nome })
      });
    }
    carregarCompras(usuarioLogado);
  };

  const alterarQuantidade = async (item, mudanca) => {
    const quantidade = item.quantidade + mudanca;
    if (quantidade < 1) return;

    await fetch(`${API}/compras/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantidade })
    });
    carregarCompras(usuarioLogado);
  };

  const removerItem = async (item) => {
    await fetch(`${API}/compras/${item.id}`, { method: "DELETE" });
    carregarCompras(usuarioLogado);
  };

  const limparLista = async () => {
    await fetch(`${API}/compras/usuario/${usuarioLogado.id}`, { method: "DELETE" });
    carregarCompras(usuarioLogado);
  };

  const totalItensLista = compras.reduce((soma, item) => soma + item.quantidade, 0);

  // ---------- telas ----------

  const renderizarTela = () => {
    if (tela === "login") {
      return <Login navegar={navegar} onLoginSucesso={entrar} />;
    }
    if (tela === "cadastro") {
      return <Cadastro navegar={navegar} />;
    }
    if (tela === "home") {
      return (
        <Home
          receitas={receitas}
          erroApi={erroApi}
          usuarioLogado={usuarioLogado}
          favoritos={favoritos}
          totalItensLista={totalItensLista}
          navegar={navegar}
          onAbrirDetalhes={abrirDetalhes}
          onAlternarFavorito={alternarFavorito}
        />
      );
    }
    if (tela === "busca") {
      return <Busca navegar={navegar} onAbrirDetalhes={abrirDetalhes} />;
    }
    if (tela === "detalhes") {
      return (
        <DetalhesReceita
          receita={receitaSelecionada}
          favoritado={receitaSelecionada ? favoritos.includes(receitaSelecionada.id) : false}
          onAlternarFavorito={alternarFavorito}
          onAdicionarNaLista={adicionarNaLista}
          onVoltar={voltar}
        />
      );
    }
    if (tela === "nova-receita") {
      return <NovaReceita usuarioLogado={usuarioLogado} navegar={navegar} onReceitaCriada={receitaCriada} />;
    }
    if (tela === "conta") {
      return (
        <Conta
          usuarioLogado={usuarioLogado}
          receitas={receitas}
          favoritos={favoritos}
          navegar={navegar}
          onAbrirDetalhes={abrirDetalhes}
          onAlternarFavorito={alternarFavorito}
          onDeletarReceita={deletarReceita}
          onSair={sair}
        />
      );
    }
    if (tela === "carrinho") {
      return (
        <Carrinho
          itens={compras}
          onAlterarQuantidade={alterarQuantidade}
          onRemoverItem={removerItem}
          onLimparLista={limparLista}
          navegar={navegar}
        />
      );
    }
    if (tela === "usuarios") {
      return <Usuarios navegar={navegar} />;
    }
    return <BoasVindas navegar={navegar} />;
  };

  return <div className="app-container">{renderizarTela()}</div>;
}

export default App;
