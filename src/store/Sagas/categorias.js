import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { adicionarTodasCategorias, carregarCategorias } from '../reducers/categorias'
import { createStandaloneToast } from '@chakra-ui/toast';
import categoriasService from '../../Services/categorias';

const { toast } = createStandaloneToast();


function* observarCategorias() {
    toast({
        title: 'Carregando',
        description: 'Categorias carregando',
        status: 'loading',
        duration: 2000,
        isClosable: true
    });
    try {
        yield delay(1000)
        const categorias = yield call(categoriasService.buscar);
        yield put(adicionarTodasCategorias(categorias))
        toast({
            title: 'Sucesso!',
            description: 'Categoria carregadas',
            status: 'success',
            duration: 2000,
            isClosable: true
        });
    } catch (error) {
        toast({
            title: 'Erro',
            description: 'erro ao carregar',
            status: 'error',
            duration: 2000,
            isClosable: true
        });
    }
}

export function* categoriasSaga() {
    const tarefa = yield takeLatest(carregarCategorias, observarCategorias)
    yield takeLatest(adicionarTodasCategorias, () => {
        tarefa.cancel()
    })
}
