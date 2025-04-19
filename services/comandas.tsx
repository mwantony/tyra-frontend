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
