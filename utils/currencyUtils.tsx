export function formatCurrency(value) {
    if (!value) return "R$ 0,00";
  
    // Remove tudo que não for número
    const numericValue = value.replace(/\D/g, "");
  
    // Converte para número e divide por 100 para representar centavos
    const float = parseFloat(numericValue) / 100;
  
    // Formata para BRL com símbolo
    return float.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  export function unformatCurrency(value) {
    if (!value) return 0;
  
    // Remove o símbolo R$ e qualquer outro caractere não numérico
    const numericValue = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  
    // Converte o valor para float
    return parseFloat(numericValue);
  }
  