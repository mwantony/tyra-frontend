/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export async function getVendas() {
  try {
    const response = await api.get("/vendas");
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
    return response.data;
  } catch (error) {
    console.error("Erro ao filtrar vendas:", error);
    throw error;
  }
}
export async function gerarPdf(inicio: string, fim: string) {
  try {
    const response = await api
      .post(
        "/vendas/gerar-pdf",
        { inicio, fim },
        { responseType: "blob" } // importante para receber o PDF como Blob
      )

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `relatorio-vendas-${inicio}_a_${fim}.pdf`;
    document.body.appendChild(link);
    link.click();

    // Limpa o link
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    return error;
  }
  
}
