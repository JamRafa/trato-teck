import { configureStore } from "@reduxjs/toolkit";
import categoriasSlice from "./reducers/categorias";
import itensSlice from "./reducers/itens";
import carrinhoSlice from "./reducers/carrinho";
import buscaSlice from "./reducers/busca";
import { categoriasListener } from "./middlewares/categorias";
import { itensListener } from "./middlewares/itens";
import createSagaMiddleware from 'redux-saga'
import { categoriasSaga } from "./Sagas/categorias";
import { carrinhoSaga } from "./Sagas/carrinho";
import usuarioSlice from './reducers/ususario'

const sagaMid = createSagaMiddleware();

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice,
    ususario: usuarioSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      categoriasListener.middleware,
      itensListener.middleware,
      sagaMid
    ),
});

sagaMid.run(categoriasSaga)
sagaMid.run(carrinhoSaga)

export default store;
