/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface Comanda {
  id: number;
  restaurante_id: number;
  numero_comanda: string;
  status: string;
  fechada_em: string | null;
  created_at: string;
  updated_at: string;
  produtos: any[];
}
