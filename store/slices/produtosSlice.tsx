/* eslint-disable @typescript-eslint/no-explicit-any */

import Produto from "@/interfaces/Produto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProdutoState {
  produtos: Produto[];
}

const initialState: ProdutoState = {
  produtos: [],
};

export const produtosSlice = createSlice({
  name: "produtos",
  initialState,
  reducers: {
    setProdutos: (state, action: PayloadAction<Produto[]>) => {
      state.produtos = action.payload;
    },
  },
});

export const { setProdutos } = produtosSlice.actions;
export default produtosSlice.reducer;
