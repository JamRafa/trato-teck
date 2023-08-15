import instance from "../Common/config/api"

const ususariosService = {
    buscarporId: async (id) => {
        const resposta = await instance.get(`/usuarios/${id}`)
        return resposta.data
    }
}

export default ususariosService