// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import vendasReducer from "./slices/vendasSlice";
import produtosReducer from "./slices/produtosSlice";
import comandasReducer from "./slices/comandasSlice";
import mesasReducer from "./slices/mesasSlice";

export const store = configureStore({
  reducer: {
    vendas: vendasReducer,
    produtos: produtosReducer,
    comandas: comandasReducer,
    mesas: mesasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
