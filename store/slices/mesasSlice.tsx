/* eslint-disable @typescript-eslint/no-explicit-any */

import Mesa from "@/interfaces/Mesa";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MesaState {
  mesas: Mesa[];
}

const initialState: MesaState = {
  mesas: [],
};

export const mesasSlice = createSlice({
  name: "mesas",
  initialState,
  reducers: {
    setMesas: (state, action: PayloadAction<Mesa[]>) => {
      state.mesas = action.payload;
    },
  },
});

export const { setMesas } = mesasSlice.actions;
export default mesasSlice.reducer;
