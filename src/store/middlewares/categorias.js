import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  adicionarTodasCategorias,
  adicionarUmaCategoria,
  carregarCategorias,
  carregarUmaCategoria,
} from "../reducers/categorias";
import categoriasService from "../../Services/categorias";
import criarTarefa from "./utils/criarTarefa";

export const categoriasListener = createListenerMiddleware();

categoriasListener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { fork, dispatch, unsubscribe }) => {
    const resposta = await criarTarefa({
      fork,
      dispatch,
      action: adicionarTodasCategorias,
      busca: categoriasService.buscar,
      textoCarregando: "carregando",
      textoSucesso: "Categorias carregadas",
      textoErro: "erro ao carregar",
    });
    if (resposta.status === "ok") {
      unsubscribe();
    }
  },
});

categoriasListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { fork, dispatch, getState, unsubscribe }) => {
    const { categorias } = getState();
    const nomeCategoria = action.payload;
    const categoriaCarregada = categorias.some(
      (categoria) => categoria.id === nomeCategoria
    );

    if (categoriaCarregada) return;
    if (categorias.lenth === 5) return unsubscribe;
    await criarTarefa({
      fork,
      dispatch,
      action: adicionarUmaCategoria,
      busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
      textoCarregando: `carregando ${nomeCategoria}`,
      textoSucesso: `Categorias ${nomeCategoria} carregadas`,
      textoErro: `erro ao carregar ${nomeCategoria}`,
    });
  },
});
