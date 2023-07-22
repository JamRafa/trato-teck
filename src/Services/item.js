import instance from "../Common/config/api";

const itensService = {
  buscar: async () => {
    console.log('aaa')
    const resposta = await instance.get("/itens");
    return resposta.data;
  },
};

export default itensService;
