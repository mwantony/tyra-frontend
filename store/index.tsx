// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import vendasFiltradasReducer from "./slices/vendasFiltradasSlice";
import vendasReducer from "./slices/vendasSlice";
import produtosReducer from "./slices/produtosSlice";
import comandasReducer from "./slices/comandasSlice";

export const store = configureStore({
  reducer: {
    vendasFiltradas: vendasFiltradasReducer,
    vendas: vendasReducer,
    produtos: produtosReducer,
    comandas: comandasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
