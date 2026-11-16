export default function BoasVindas({ navegar }) {
  return (
    <main className="tela-boas-vindas">
      <div className="topo-boas-vindas">
        <button
          type="button"
          className="btn-later"
          onClick={() => navegar("home")}
        >
          Pular
        </button>
      </div>

      <div className="ilustracao-boas-vindas" aria-hidden="true">
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M110 10 C105 75, 220 55, 210 110 C200 165, 300 130, 315 115"
            stroke="#52989D"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M5 145 C65 140, 125 190, 110 245 C95 295, 250 305, 315 265"
            stroke="#52989D"
            strokeWidth="1.5"
            fill="none"
          />

          <g transform="translate(55, 55)">
            <path
              d="M25 12 C45 4, 72 15, 76 36 C80 57, 62 76, 42 74 C24 72, 6 58, 8 38 C10 22, 14 16, 25 12 Z"
              fill="#F5F7F7"
            />
            <circle cx="51" cy="43" r="15" fill="#E8AE38" />
            <circle cx="47" cy="39" r="4" fill="#F6CE73" />
          </g>

          <g transform="translate(195, 55) rotate(22)">
            <rect x="0" y="0" width="84" height="44" rx="16" fill="#E59B6B" />
            <path d="M14 2 Q22 22 14 42" stroke="#F4C5A3" strokeWidth="2.5" fill="none" />
            <path d="M30 2 Q38 22 30 42" stroke="#F4C5A3" strokeWidth="2.5" fill="none" />
            <path d="M46 2 Q54 22 46 42" stroke="#F4C5A3" strokeWidth="2.5" fill="none" />
            <path d="M62 2 Q70 22 62 42" stroke="#F4C5A3" strokeWidth="2.5" fill="none" />
          </g>

          <g transform="translate(78, 145) rotate(-32)">
            <path
              d="M0 16 C18 2, 46 2, 64 16 C46 30, 18 30, 0 16 Z"
              fill="#B3D364"
            />
            <circle cx="20" cy="16" r="7" fill="#9EC14D" />
            <circle cx="36" cy="16" r="7" fill="#9EC14D" />
            <circle cx="50" cy="16" r="5" fill="#9EC14D" />
          </g>

          <g transform="translate(175, 130)">
            <circle cx="24" cy="24" r="22" fill="#F4C44E" />
            <circle cx="24" cy="24" r="18" fill="#FFF7DF" />
            <circle cx="24" cy="24" r="15" fill="#F4C44E" />
            <line x1="24" y1="7" x2="24" y2="41" stroke="#FFF7DF" strokeWidth="2" />
            <line x1="7" y1="24" x2="41" y2="24" stroke="#FFF7DF" strokeWidth="2" />
            <line x1="12" y1="12" x2="36" y2="36" stroke="#FFF7DF" strokeWidth="2" />
            <line x1="36" y1="12" x2="12" y2="36" stroke="#FFF7DF" strokeWidth="2" />
          </g>

          <g transform="translate(52, 198) rotate(12)">
            <polygon points="10,65 55,0 82,58" fill="#F6C84C" />
            <circle cx="48" cy="26" r="5" fill="#DFAA28" />
            <circle cx="35" cy="48" r="6" fill="#DFAA28" />
            <circle cx="62" cy="45" r="4" fill="#DFAA28" />
          </g>

          <g transform="translate(172, 225) rotate(-32)">
            <rect x="0" y="14" width="38" height="10" rx="5" fill="#F3E5D0" />
            <circle cx="2" cy="14" r="6" fill="#F3E5D0" />
            <circle cx="2" cy="24" r="6" fill="#F3E5D0" />
            <path
              d="M32 10 C55 -4, 95 -2, 102 19 C95 40, 55 42, 32 28 Z"
              fill="#C38757"
            />
            <circle cx="66" cy="14" r="2" fill="#9E6539" />
            <circle cx="76" cy="19" r="2" fill="#9E6539" />
            <circle cx="68" cy="24" r="2" fill="#9E6539" />
          </g>

          <ellipse cx="42" cy="122" rx="6" ry="3" transform="rotate(35 42 122)" fill="#7EB458" />
          <ellipse cx="290" cy="95" rx="7" ry="3.5" transform="rotate(-35 290 95)" fill="#7EB458" />
          <ellipse cx="256" cy="166" rx="7" ry="3.5" transform="rotate(-70 256 166)" fill="#7EB458" />
          <circle cx="158" cy="92" r="3" fill="#FFF3D1" />
          <circle cx="222" cy="182" r="3" fill="#FFF3D1" />
          <circle cx="76" cy="134" r="3" fill="#FFF3D1" />
          <circle cx="292" cy="160" r="3.5" fill="#FFF3D1" />
        </svg>
      </div>

      <div className="rodape-boas-vindas">
        <h1 className="titulo-boas-vindas">
          Alcance seus objetivos de saúde com alegria e sabor
        </h1>

        <button
          type="button"
          className="btn-primario"
          onClick={() => navegar("login")}
        >
          Entrar
        </button>

        <button
          type="button"
          className="btn-link-branco"
          onClick={() => navegar("cadastro")}
        >
          Criar Nova Conta
        </button>
      </div>
    </main>
  );
}
