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