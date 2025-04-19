import api from "./api";

export async function getProdutos() {
  try {
    const response = await api.get("/produtos");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

