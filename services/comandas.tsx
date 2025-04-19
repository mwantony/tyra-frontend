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
