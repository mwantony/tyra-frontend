/* eslint-disable @typescript-eslint/no-explicit-any */

import Venda from "@/interfaces/Venda";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VendaFiltradaState {
  vendasFiltradas: Venda[];
}

const initialState: VendaFiltradaState = {
  vendasFiltradas: [],
};

export const vendasFiltradasSlice = createSlice({
  name: "vendasFiltradas",
  initialState,
  reducers: {
    setVendasFiltradas: (state, action: PayloadAction<Venda[]>) => {
      state.vendasFiltradas = action.payload;
    },
  },
});

export const { setVendasFiltradas } = vendasFiltradasSlice.actions;
export default vendasFiltradasSlice.reducer;
