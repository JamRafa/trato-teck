import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = { data: [], total: 0 };

export const carregarPagamento = createAction('carrinho/carregarPagamento')
export const finalizarPagamento = createAction('carrinho/finalizarPagamento')

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    mudarCarrinho: (state, { payload }) => {
      const temItem = state.data.some(item => item.id === payload);
      if (!temItem) return {
        total: state.total,
        data: [
          ...state.data,
          {
            id: payload,
            quantidade: 1
          }
        ]
      };
      return {
        total: state.total,
        data: state.data.filter(item => item.id !== payload)
      }
    },
    mudarQuantidade: (state, { payload }) => {
      state.data = state.data.map(itemNocarrinho => {
        if (itemNocarrinho.id === payload.id) itemNocarrinho.quantidade += payload.quantidade
        return itemNocarrinho
      })
    },
    restarCarrinho: () => initialState,
    mudarTotal: (state, { payload }) => {
      state.total = payload
    }
  }
});

export const { mudarCarrinho, mudarQuantidade, restarCarrinho, mudarTotal } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;