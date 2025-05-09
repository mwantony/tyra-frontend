export const limitarTexto = (texto, limite) =>
  texto.length > limite ? texto.slice(0, limite) + "..." : texto;

// Uso:
