import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    mudarCarrinho: (state, { payload }) => {
      const temItem = state.some(item => item.id === payload);
      if (!temItem) return [
        ...state,
        {
          id: payload,
          quantidade: 1
        }
      ];
      return state.filter(item => item.id !== payload);
    },
    mudarQuantidade: (state, {payload}) => {
        state = state.map(itemNocarrinho => {
            if (itemNocarrinho.id === payload.id) itemNocarrinho.quantidade += payload.quantidade
            return itemNocarrinho
        })
    },
    restarCarrinho: () => initialState
  }
});

export const { mudarCarrinho, mudarQuantidade, restarCarrinho } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;