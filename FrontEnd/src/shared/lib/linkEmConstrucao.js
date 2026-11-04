// Fora da página para evitar import circular: a página importa homepage_menu, que usa este link.
export const linkEmConstrucao = (pagina) => `/emConstrucao?pagina=${encodeURIComponent(pagina)}`;
