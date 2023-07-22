import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "../../Services/categorias";
import { createStandaloneToast } from "@chakra-ui/toast";
import { restarCarrinho } from "./carrinho";

const { toast } = createStandaloneToast();

const initialState = [];

//export const carregarCategorias = createAction("categorias/carregarCategorias");

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(buscarCategorias.fulfilled, (state, { payload }) => {
        toast({
          title: "sucsses",
          status: "success",
          description: "categorias carregadas",
          duration: 2000,
          isClosable: true,
        });
        return payload;
      })
      .addCase(buscarCategorias.pending, (state, { payload }) => {
        toast({
          title: "carregando",
          status: "loading",
          description: "categorias carregando ...",
          duration: 2000,
          isClosable: true,
        });
      })
      .addCase(buscarCategorias.rejected, (state, { payload }) => {
        toast({
          title: "erro",
          status: "error",
          description: "erro na busca",
          duration: 2000,
          isClosable: true,
        });
      })
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

export default categoriasSlice.reducer;
