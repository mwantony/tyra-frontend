import api from "./api";

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
