import api from "./api";

export async function getVendas() {
  try {
    const response = await api.get("/vendas");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    throw error;
  }
}

export async function filtrarVendas(inicio: string, fim: string) {
  try {
    const response = await api.post("/vendas/filtrar", {
      inicio,
      fim,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao filtrar vendas:", error);
    throw error;
  }
}
export async function gerarPdf(inicio: string, fim: string) {
  try {
    const response = await api.post("/vendas/gerar-pdf", {
      inicio,
      fim,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw error;
  }
}
