import { useEffect, useState } from "react";
import "./App.css";
import receitasMock from "./dados/receitasMock";
import BoasVindas from "./paginas/BoasVindas";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Home from "./paginas/Home";
import Busca from "./paginas/Busca";
import DetalhesReceita from "./paginas/DetalhesReceita";
import Conta from "./paginas/Conta";
import Carrinho from "./paginas/Carrinho";
import Usuarios from "./paginas/Usuarios";

function App() {
  const [tela, setTela] = useState("boas-vindas");
  const [telaAnterior, setTelaAnterior] = useState("home");
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [receitas, setReceitas] = useState(receitasMock);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const [favoritos, setFavoritos] = useState([4, 5, 6, 8]);
  const [carrinho, setCarrinho] = useState([]);

  // Busca receitas do back-end (se estiver rodando); caso contrário mantém receitasMock
  useEffect(() => {
    const carregarReceitas = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/receitas");
        if (resposta.ok) {
          const dados = await resposta.json();
          if (Array.isArray(dados) && dados.length > 0) {
            setReceitas(dados);
          }
        }
      } catch {
        // Servidor offline: segue usando receitasMock normalmente
      }
    };

    carregarReceitas();
  }, []);

  const trocarDeTela = (novaTela) => {
    if (novaTela !== "detalhes" && novaTela !== "carrinho") {
      setTelaAnterior(novaTela);
    }
    setTela(novaTela);
    window.scrollTo(0, 0);
  };

  const voltarTelaAnterior = () => {
    setTela(telaAnterior || "home");
    window.scrollTo(0, 0);
  };

  const lidarComLogin = async (usuario) => {
    setUsuarioLogado(usuario);
    setTelaAnterior("home");
    setTela("home");

    if (usuario?.id) {
      try {
        const resp = await fetch(`http://localhost:3000/favoritos/${usuario.id}`);
        if (resp.ok) {
          const idsFavoritos = await resp.json();
          if (Array.isArray(idsFavoritos)) {
            setFavoritos(idsFavoritos);
          }
        }
      } catch {
        // Mantém favoritos locais se o servidor estiver offline
      }
    }
  };

  const lidarComLogout = () => {
    setUsuarioLogado(null);
    setTela("boas-vindas");
  };

  const abrirDetalhes = (receita) => {
    setTelaAnterior(tela);
    setReceitaSelecionada(receita);
    setTela("detalhes");
    window.scrollTo(0, 0);
  };

  const alternarFavorito = async (receitaId) => {
    setFavoritos((listaAtual) =>
      listaAtual.includes(receitaId)
        ? listaAtual.filter((id) => id !== receitaId)
        : [...listaAtual, receitaId]
    );

    if (usuarioLogado?.id) {
      try {
        const resp = await fetch("http://localhost:3000/favoritos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario_id: usuarioLogado.id,
            receita_id: receitaId
          })
        });
        if (resp.ok) {
          const atualizados = await resp.json();
          if (Array.isArray(atualizados)) {
            setFavoritos(atualizados);
          }
        }
      } catch {
        // Mantém atualização otimista local
      }
    }
  };

  const adicionarAoCarrinho = (novosIngredientes) => {
    setCarrinho((carrinhoAtual) => {
      const copia = [...carrinhoAtual];
      novosIngredientes.forEach((novo) => {
        const indiceExistente = copia.findIndex(
          (item) => item.nome.toLowerCase() === novo.nome.toLowerCase()
        );
        if (indiceExistente >= 0) {
          copia[indiceExistente] = {
            ...copia[indiceExistente],
            quantidade: copia[indiceExistente].quantidade + (novo.quantidade || 1)
          };
        } else {
          copia.push({ ...novo, quantidade: novo.quantidade || 1 });
        }
      });
      return copia;
    });
  };

  const atualizarQuantidadeCarrinho = (idIngrediente, delta) => {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((item) =>
        item.id === idIngrediente
          ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
          : item
      )
    );
  };

  const removerItemCarrinho = (idIngrediente) => {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter((item) => item.id !== idIngrediente)
    );
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const totalItensCarrinho = carrinho.reduce(
    (soma, item) => soma + (item.quantidade || 1),
    0
  );

  const renderizarTela = () => {
    switch (tela) {
      case "boas-vindas":
        return <BoasVindas navegar={trocarDeTela} />;

      case "login":
        return (
          <Login
            navegar={trocarDeTela}
            onLoginSucesso={lidarComLogin}
          />
        );

      case "cadastro":
        return <Cadastro navegar={trocarDeTela} />;

      case "home":
        return (
          <Home
            receitas={receitas}
            usuarioLogado={usuarioLogado}
            favoritos={favoritos}
            totalItensCarrinho={totalItensCarrinho}
            navegar={trocarDeTela}
            onAbrirDetalhes={abrirDetalhes}
            onAlternarFavorito={alternarFavorito}
          />
        );

      case "busca":
        return (
          <Busca
            receitas={receitas}
            navegar={trocarDeTela}
            onAbrirDetalhes={abrirDetalhes}
          />
        );

      case "detalhes":
        return (
          <DetalhesReceita
            receita={receitaSelecionada}
            favoritado={
              receitaSelecionada
                ? favoritos.includes(receitaSelecionada.id)
                : false
            }
            onAlternarFavorito={alternarFavorito}
            onAdicionarCarrinho={adicionarAoCarrinho}
            onVoltar={voltarTelaAnterior}
          />
        );

      case "conta":
        return (
          <Conta
            usuarioLogado={usuarioLogado}
            receitas={receitas}
            favoritos={favoritos}
            navegar={trocarDeTela}
            onAbrirDetalhes={abrirDetalhes}
            onAlternarFavorito={alternarFavorito}
            onLogout={lidarComLogout}
          />
        );

      case "carrinho":
        return (
          <Carrinho
            itensCarrinho={carrinho}
            onAtualizarQuantidade={atualizarQuantidadeCarrinho}
            onRemoverItem={removerItemCarrinho}
            onLimparCarrinho={limparCarrinho}
            navegar={trocarDeTela}
            onVoltar={voltarTelaAnterior}
          />
        );

      case "usuarios":
        return <Usuarios navegar={trocarDeTela} />;

      default:
        return <BoasVindas navegar={trocarDeTela} />;
    }
  };

  return <div className="app-container">{renderizarTela()}</div>;
}

export default App;
