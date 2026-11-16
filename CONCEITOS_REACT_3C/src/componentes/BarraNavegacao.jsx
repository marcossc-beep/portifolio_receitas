export default function BarraNavegacao({ telaAtual, navegar }) {
  return (
    <nav className="barra-navegacao" aria-label="Navegação principal">
      <button
        type="button"
        className={`nav-item ${telaAtual === "home" ? "ativo" : ""}`}
        onClick={() => navegar("home")}
        aria-label="Início"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      </button>

      <button
        type="button"
        className={`nav-item ${telaAtual === "busca" ? "ativo" : ""}`}
        onClick={() => navegar("busca")}
        aria-label="Buscar receitas"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      <button
        type="button"
        className="nav-botao-central"
        onClick={() => navegar("busca")}
        aria-label="Explorar receitas do chef"
        title="Explorar receitas"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
          <line x1="6" y1="17" x2="18" y2="17" />
        </svg>
      </button>

      <button
        type="button"
        className={`nav-item ${telaAtual === "carrinho" ? "ativo" : ""}`}
        onClick={() => navegar("carrinho")}
        aria-label="Lista de compras"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>

      <button
        type="button"
        className={`nav-item ${telaAtual === "conta" ? "ativo" : ""}`}
        onClick={() => navegar("conta")}
        aria-label="Minha conta"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      </button>
    </nav>
  );
}
