import { createListenerMiddleware } from "@reduxjs/toolkit";
import { carregarUmaCategoria } from "../reducers/categorias";
import criarTarefa from "./utils/criarTarefa";
import itensService from "../../Services/item";
import { adicionarItens } from "../reducers/itens";

export const itensListener = createListenerMiddleware();

itensListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { fork, dispatch, unsubscribe, getState }) => {
    const { itens } = getState();

    if (itens.lenght === 25) return unsubscribe;

    const nomeCategoria = action.payload;

    const itensCarregados = itens.some(
      (item) => item.categoria === nomeCategoria
    );

    if (itensCarregados) return;

    await criarTarefa({
      fork,
      dispatch,
      action: adicionarItens,
      busca: () => itensService.buscarDeCategorias(nomeCategoria),
      textoCarregando: `carregando itens da categoria ${nomeCategoria}`,
      textoSucesso: `itens carregados da categoria ${nomeCategoria}`,
      textoErro: `erro ao carregar itens da categoria ${nomeCategoria}`,
    });
  },
});
