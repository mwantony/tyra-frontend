export function formatCurrency(value) {
    if (!value) return "R$ 0,00";
  
    const numericValue = value.replace(/\D/g, "");
  
    const float = parseFloat(numericValue) / 100;
  
    return float.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  export function unformatCurrency(value) {
    if (!value) return 0;
  
    const numericValue = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  
    return parseFloat(numericValue);
  }
  