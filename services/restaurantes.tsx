/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export async function getRestaurante(id: any) {
  try {
    const response = await api.get(`/restaurantes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar restaurante:", error);
    throw error;
  }
}
export async function putRestaurante(id: any, restaurante) {
  try {
    const response = await api.put(`/restaurantes/${id}`, restaurante);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar restaurante:", error);
    throw error;
  }
}
export async function deleteRestaurante(id: any) {
  try {
    const response = await api.delete(`/restaurantes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar restaurante:", error);
    throw error;
  }
}
