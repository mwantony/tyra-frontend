/* eslint-disable @typescript-eslint/no-explicit-any */
// store/slices/vendasSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Venda {
  id: number;
  comanda_id: number;
  numero_comanda: string;
  restaurante_id: number;
  total: string;
  data_venda: string;
  created_at: string;
  status: string;
  updated_at: string;
}

interface VendasState {
  vendas: Venda[];
}

const initialState: VendasState = {
  vendas: [],
};

export const vendasSlice = createSlice({
  name: "vendas",
  initialState,
  reducers: {
    setVendas: (state, action: PayloadAction<Venda[]>) => {
      state.vendas = action.payload;
    },
  },
});

export const { setVendas } = vendasSlice.actions;
export default vendasSlice.reducer;
