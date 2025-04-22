/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export async function getPlanos() {
  try {
    const response = await api.get(`/planos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar comandas:", error);
    throw error;
  }
}
export async function getPlano(id: any) {
  try {
    const response = await api.get(`/planos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar comandas:", error);
    throw error;
  }
}
