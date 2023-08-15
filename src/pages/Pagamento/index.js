import { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import Header from '../../Components/Header'
import Select from '../../Components/Select'
import styles from './Pagamento.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { carregarPagamento, finalizarPagamento } from '../../store/reducers/carrinho'

export default function Pagamento() {
    const dispatch = useDispatch()
    const usuario = useSelector(state => state.ususario)
    const total = useSelector(state => state.carrinho.total)

    const [formaDePagamento, setFormaDePagamento] = useState('-')
    const valorTotal = formaDePagamento === '-' ? total : total * formaDePagamento.taxa

    function mudarFormaDePagamento(ev) {
        if (ev.target.value === '-') return setFormaDePagamento('-')
        setFormaDePagamento(usuario.cartoes.find(cartao => cartao.id === ev.target.value))
    }

    function finalizar() {
        dispatch(finalizarPagamento({valorTotal, formaDePagamento}))
    }

    useEffect(() => {
        dispatch(carregarPagamento())
    }, [dispatch])

    return (
        <div className={styles.containe}>
            <Header titulo={'pagamento'} />
            <div className={styles.dados}>
                <p className={styles.forma}>Ola {usuario.nome} escolha a forma de pagamento:</p>
                <Select value={formaDePagamento.id} onChange={mudarFormaDePagamento} placeholder="forma de pagamento" alt='Forma de pagamento'>
                    <option value={'-'}>Forma de pagamento</option>
                    {usuario.cartoes?.map(cartao =>
                        <option key={cartao.id} value={cartao.id}>{cartao.nome}</option>
                    )}
                </Select>
                <div className={styles.content}>
                    {formaDePagamento !== '-' && (
                        <>
                            <p>A forma de pagamento {formaDePagamento.nome} tem taxa de {formaDePagamento.taxa}x</p>
                            <p> O saldo desse cartao é de {formaDePagamento.saldo.toFixed(2)}</p>
                        </>
                    )}
                    <p>Total com taxas: R$ {valorTotal.toFixed(2)} </p>
                </div>
                <div className={styles.finalizar}>
                    <Button
                        disabled={valorTotal === 0 || formaDePagamento === '-'}
                        onClick={finalizar}
                    >Finalizar compra</Button>
                </div>
            </div>
        </div>
    )
}