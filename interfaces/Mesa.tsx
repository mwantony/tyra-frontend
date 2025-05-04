/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface Mesa {
  id: number;
  restaurante_id: number;
  identificacao: string;
  capacidade: number;
  status: string;
  nome_reserva: string | null;
  telefone_reserva: string | null;
  horario_reserva: string | null;
  numero_comanda: string | null;
  observacoes: string | null;
  created_at: string;
  updated_at: string;
}
