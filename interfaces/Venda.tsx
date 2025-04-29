export default interface Venda {
    id: number;
    comanda_id: number;
    total_faturado: number;
    total_vendas: number;
    media_vendas_por_dia: number;
    ultimas_vendas: number
    numero_comanda: string;
    restaurante_id: number;
    status: string;
    total: string;
    data_venda: string;
    created_at: string;
    updated_at: string;
  }
  