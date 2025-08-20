/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export async function getPlanos() {
  try {
    const response = await api.get(`/planos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar planos:", error);
    throw error;
  }
}
export async function getPlano(id: any) {
  try {
    const response = await api.get(`/planos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar plano:", error);
    throw error;
  }
}
export async function associarPlano(id: any, plano) {
  try {
    const response = await api.put(`/restaurantes/${id}/associar-plano`, plano);
    return response.data;
  } catch (error) {
    console.error("Erro ao associar plano:", error);
    throw error;
  }
}
export async function criarPagamento(planoId: number, dadosPagamento) {
  try {
    const response = await api.post(
      `/planos/${planoId}/pagamento`,
      dadosPagamento
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    throw error;
  }
}

export async function buscarPagamento(
  paymentId: string
): Promise<{ status: string; payment: any }> {
  try {
    const response = await api.get(`/pagamentos/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pagamento:", error);
    throw error;
  }
}
