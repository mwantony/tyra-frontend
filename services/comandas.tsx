/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export async function getComandas() {
  try {
    const response = await api.get("/comandas");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar comandas:", error);
    throw error;
  }
}
export async function getComanda(numeroComanda: any) {
  try {
    const response = await api.get(`/comandas/${numeroComanda}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao busca comanda:", error);
    throw error;
  }
}
export async function postComanda() {
  try {
    const response = await api.post(`/comandas`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar comanda:", error);
    throw error;
  }
}
export async function comandaAdicionar(numeroComanda, produtos) {
  try {
    const response = await api.post(
      `/comandas/${numeroComanda}/adicionar`,
      produtos
    );
    console.log("Produtos adicionados:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar produtos na comanda:", error);
    throw error;
  }
}
export async function fechaComanda(numeroComanda) {
  try {
    const response = await api.put(`/comandas/${numeroComanda}/fechar`);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar produtos na comanda:", error);
    throw error;
  }
}
export async function cancelaComanda(numeroComanda) {
  try {
    const response = await api.put(`/comandas/${numeroComanda}/cancelar`);
    return response.data;
  } catch (error) {
    console.error("Erro ao cancelar comanda:", error);
    throw error;
  }
}

export async function getComandaCodigo(numeroComanda: string) {
  try {
    const response = await api.get(
      `/comandas/${numeroComanda}/codigo-de-barras`,
      {
        responseType: "blob", // 👈 importante para arquivos
      }
    );

    return response.data; // isso é o Blob
  } catch (error) {
    console.error("Erro ao baixar código:", error);
    throw error;
  }
}

export async function deleteComanda(numeroComanda: any) {
  try {
    const response = await api.delete(`/comandas/${numeroComanda}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar comanda:", error);
    throw error;
  }
}
