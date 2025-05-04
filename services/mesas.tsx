/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export async function getMesas() {
  try {
    const response = await api.get("/mesas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar mesas:", error);
    throw error;
  }
}

export async function getMesa(id: string | number) {
  try {
    const response = await api.get(`/mesas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar mesa:", error);
    throw error;
  }
}

export async function postMesa(data: {
  identificacao: string;
  capacidade: number;
  status?: string;
  observacoes?: string;
}) {
  try {
    const response = await api.post("/mesas", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar mesa:", error);
    throw error;
  }
}

export async function updateMesa(
  id: string | number,
  data: {
    identificacao?: string;
    capacidade?: number;
    status?: string;
    observacoes?: string;
  }
) {
  try {
    const response = await api.put(`/mesas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar mesa:", error);
    throw error;
  }
}

export async function deleteMesa(id: string | number) {
  try {
    const response = await api.delete(`/mesas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar mesa:", error);
    throw error;
  }
}

export async function reservarMesa(
  id: string | number,
  data: {
    nome_reserva: string;
    telefone_reserva: string;
    horario_reserva: string;
    observacoes?: string;
  }
) {
  try {
    const response = await api.post(`/mesas/${id}/reservar`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao reservar mesa:", error);
    throw error;
  }
}

export async function ocuparMesa(id: string | number, numeroComanda: string) {
  try {
    const response = await api.post(`/mesas/${id}/ocupar`, { numero_comanda: numeroComanda });
    return response.data;
  } catch (error) {
    console.error("Erro ao ocupar mesa:", error);
    throw error;
  }
}

export async function liberarMesa(id: string | number) {
  try {
    const response = await api.post(`/mesas/${id}/liberar`);
    return response.data;
  } catch (error) {
    console.error("Erro ao liberar mesa:", error);
    throw error;
  }
}

export async function vincularComanda(id: string | number, numeroComanda: string) {
  try {
    const response = await api.post(`/mesas/${id}/vincular-comanda/${numeroComanda}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao vincular comanda à mesa:", error);
    throw error;
  }
}

export async function desvincularComanda(id: string | number) {
  try {
    const response = await api.post(`/mesas/${id}/desvincular-comanda`);
    return response.data;
  } catch (error) {
    console.error("Erro ao desvincular comanda da mesa:", error);
    throw error;
  }
}

export async function getStatusMesa(id: string | number) {
  try {
    const response = await api.get(`/mesas/${id}/status`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar status da mesa:", error);
    throw error;
  }
}