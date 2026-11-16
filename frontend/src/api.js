// Endereço da API (pasta backend, rodando com npm start)
export const API = "http://localhost:3000";

// Ingredientes e modo de preparo ficam no banco como texto, um item por linha.
// Esta função transforma o texto em lista: "Ovo\nLeite" -> ["Ovo", "Leite"]
export function linhas(texto) {
  return (texto || "")
    .split("\n")
    .map((linha) => linha.trim())
    .filter((linha) => linha !== "");
}

// Imagem usada quando a receita ou o usuário não tem link de foto
export const FOTO_PADRAO =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
export const AVATAR_PADRAO =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80";
