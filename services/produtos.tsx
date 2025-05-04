/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export async function getProdutos() {
  try {
    const response = await api.get("/produtos");

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}
export async function getProduto(id: any) {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

export async function putProduto(id: any, produto: any) {
  try {
    const response = await api.put(`/produtos/${id}`, produto);

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
}
export async function postProduto(produto: any) {
  try {
    const response = await api.post(`/produtos`, produto);

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
}

export async function deleteProduto(id: any) {
  try {
    const response = await api.delete(`/produtos/${id}`);

    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
}

export async function getCardapio() {
  try {
    const response = await api.get(`/produtos/cardapio`, {
      responseType: "blob", // Isso é essencial para receber arquivos binários
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cardápio:", error);
    throw error;
  }
}
export async function visualizarCardapio() {
  try {
    const blob = await getCardapio();
    const url = window.URL.createObjectURL(
      new Blob([blob], { type: "application/pdf" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "cardapio.pdf"); // ou apenas link.href = url para abrir em nova aba
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Erro ao visualizar o cardápio:", err);
  }
}
