import { call, delay, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { carregarPagamento, finalizarPagamento, mudarCarrinho, mudarQuantidade, mudarTotal, restarCarrinho } from "../reducers/carrinho";
import ususariosService from "../../Services/usuarios";
import cartoesService from "../../Services/cartoes";
import bandeirasService from "../../Services/bandeiras";
import { adicionarUsusario } from "../reducers/ususario";
import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

const ususarioLogado = 2

function* carregarPagamentoSaga() {
    try {
        const usuario = yield call(ususariosService.buscarporId, ususarioLogado)
        const cartoes = yield call(cartoesService.buscarPorIdUsusario, ususarioLogado)
        const bandeirasId = yield cartoes.map(cartao => cartao.bandeiraId)
        const bandeiras = yield call(bandeirasService.buscarPorId, bandeirasId)
        console.log(bandeiras, cartoes)
        const cartoesComBandeiras = cartoes.map(cartao => {
            const bandeiraDocartao = bandeiras.find(bandeira => bandeira.id === cartao.bandeiraId)

            return { ...cartao, taxa: bandeiraDocartao.taxa, bandeira: bandeiraDocartao.nome }
        })

        yield put(adicionarUsusario({ ...usuario, cartoes: cartoesComBandeiras }))
    } catch (erro) {

    }
}

function* calcularTotal() {
    yield delay(500)
    const state = yield select()
    const total = state.carrinho.data.reduce((total, itemNoCarrinho) => {
        const item = state.itens.find(item => item.id === itemNoCarrinho.id);
        return total + item.preco * itemNoCarrinho.quantidade
    }, 0);
    yield put(mudarTotal(total))
}

function* finalizarPagamentoSaga({ payload }) {
    const { valorTotal, formaDePagamento } = payload

    if (valorTotal > formaDePagamento.saldo) {
        return yield toast({
            title: 'Erro',
            description: 'saldo insuficiente',
            status: 'error',
            duration: 2000,
            isClosable: true
        });
    } else {
        yield toast({
            title: 'Sucesso!',
            description: 'Categoria carregadas',
            status: 'success',
            duration: 2000,
            isClosable: true
        });
        yield put(restarCarrinho())
    }
}

export function* carrinhoSaga() {
    yield takeLatest(carregarPagamento, carregarPagamentoSaga)
    yield takeEvery([mudarQuantidade, mudarCarrinho], calcularTotal)
    yield takeLatest(finalizarPagamento, finalizarPagamentoSaga)
}