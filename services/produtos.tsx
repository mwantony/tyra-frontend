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


