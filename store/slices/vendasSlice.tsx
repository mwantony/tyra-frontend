/* eslint-disable @typescript-eslint/no-explicit-any */
// store/slices/vendasSlice.ts
import Venda from "@/interfaces/Venda";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
