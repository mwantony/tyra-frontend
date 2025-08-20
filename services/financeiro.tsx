import api from "./api";

export async function getDadosFinanceiros(inicio: string, fim: string) {
  try {
    const response = await api.post("/financeiro/dados", {
      inicio,
      fim,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao filtrar vendas:", error);
    throw error;
  }
}
export async function getDadosFinanceirosPdf(inicio: string, fim: string) {
  try {
    const response = await api.post(
      "/financeiro/dados/gerar-pdf",
      { inicio, fim },
      {
        responseType: "blob", 
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatorio-financeiro.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao gerar relatório financeiro:", error);
    throw error;
  }
}

