import instance from "../Common/config/api";

const cartoesService = {
    buscarPorIdUsusario: async (ususriosId) => {
        const resposta = await instance.get(`/cartoes?usuarioId=${ususriosId}`);

        return resposta.data;
    }
}
export default cartoesService;