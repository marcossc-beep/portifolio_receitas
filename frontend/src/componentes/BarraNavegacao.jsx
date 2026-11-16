// Barra fixa no rodapé: início, busca, nova receita (botão do meio), lista de compras e conta
export default function BarraNavegacao({ telaAtual, navegar }) {
  return (
    <nav className="barra-navegacao" aria-label="Navegação principal">
      <button type="button" className={`nav-item ${telaAtual === "home" ? "ativo" : ""}`} onClick={() => navegar("home")} aria-label="Início">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      </button>

      <button type="button" className={`nav-item ${telaAtual === "busca" ? "ativo" : ""}`} onClick={() => navegar("busca")} aria-label="Buscar receitas">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      <button type="button" className="nav-botao-central" onClick={() => navegar("nova-receita")} aria-label="Nova receita" title="Nova receita">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <button type="button" className={`nav-item ${telaAtual === "carrinho" ? "ativo" : ""}`} onClick={() => navegar("carrinho")} aria-label="Lista de compras">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </button>

      <button type="button" className={`nav-item ${telaAtual === "conta" ? "ativo" : ""}`} onClick={() => navegar("conta")} aria-label="Minha conta">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      </button>
    </nav>
  );
}
