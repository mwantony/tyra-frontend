// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import vendasReducer from "./slices/vendasSlice";
import produtosReducer from "./slices/produtosSlice";

export const store = configureStore({
  reducer: {
    vendas: vendasReducer,
    produtos: produtosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
