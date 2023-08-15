import { createSlice } from "@reduxjs/toolkit";

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: {},
    reducers: {
        adicionarUsusario: (statte, { payload }) => {
            return payload
        }
    }
})

export const { adicionarUsusario } = usuarioSlice.actions

export default usuarioSlice.reducer