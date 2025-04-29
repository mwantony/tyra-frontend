/* eslint-disable @typescript-eslint/no-explicit-any */

import Comanda from "@/interfaces/Comanda";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComandaState {
  comandas: Comanda[];
}

const initialState: ComandaState = {
  comandas: [],
};

export const comandasSlice = createSlice({
  name: "comandas",
  initialState,
  reducers: {
    setComandas: (state, action: PayloadAction<Comanda[]>) => {
      state.comandas = action.payload;
    },
  },
});

export const { setComandas } = comandasSlice.actions;
export default comandasSlice.reducer;
