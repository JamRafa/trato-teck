import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "../../Services/categorias";
import { createStandaloneToast } from "@chakra-ui/toast";
import { restarCarrinho } from "./carrinho";

const { toast } = createStandaloneToast();

const initialState = [];

export const carregarCategorias = createAction("categorias/carregarCategorias");
export const carregarUmaCategoria = createAction("categoria/carregarUmaCategoria")

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    adicionarTodasCategorias: (state, { payload }) => {
      return payload
    },
    adicionarUmaCategoria: (state, {payload}) => {
      state.push(payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(restarCarrinho.type, () => {
        toast({
          title: "sucsses",
          status: "success",
          description: "carrinho deletado",
          duration: 2000,
          isClosable: true,
        });
      });
  },
});

export const { adicionarTodasCategorias, adicionarUmaCategoria } = categoriasSlice.actions

export default categoriasSlice.reducer;
