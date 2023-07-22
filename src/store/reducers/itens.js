import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import itensService from "../../Services/item";

const initialState = [];

export const buscarItens = createAsyncThunk(
  "itens/buscar",
  itensService.buscar
);

const itensSlice = createSlice({
  name: "itens",
  initialState,
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    cadastarItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() });
    },
    mudarItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload.id);
      Object.assign(state[index], payload.item); //nao muda o objeto na memoria e pode sar map tambem
    },
    deletarItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload.id);
      state.splice(index, 1);
      // return state.filter(item => item.id !== payload)
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(buscarItens.fulfilled, (state, { payload }) => {
      console.log('aqui')
      return payload;
    })
    .addCase(
      buscarItens.pending, (state, {payload}) => {
        console.log("carregando itens")
      }
    )
    .addCase(
      buscarItens.rejected,
      (state, {payload}) => {
        console.log('busca rejeitada')
      }
    )
  },
});

export const {
  mudarFavorito,
  cadastarItem,
  mudarItem,
  deletarItem,
} = itensSlice.actions;
export default itensSlice.reducer;
