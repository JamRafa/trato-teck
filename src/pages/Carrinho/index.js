import styles from './Carrinho.module.scss';
import { useSelector } from 'react-redux';
import Header from '../../Components/Header';
import Item from '../../Components/item';
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';


export default function Carrinho() {
    const nav = useNavigate()

    const { carrinho, total } = useSelector(state => {
        let total = 0
        const regexp = new RegExp(state.busca, 'i')
        const carrinhoReduce = state.carrinho.data.reduce((itens, itemNoCarrinho) => {
            const item = state.itens.find(item => item.id === itemNoCarrinho.id);
            if (item.titulo.match(regexp)) {
                itens.push({
                    ...item,
                    quantidade: itemNoCarrinho.quantidade,
                });
            }
            return itens;
        }, []);
        return {
            carrinho: carrinhoReduce,
            total: state.carrinho.total
        }

    });
    return (
        <div>
            <Header
                titulo='Carrinho de compras'
                descricao='Confira produtos que você adicionou ao carrinho.'
            />
            <div className={styles.carrinho}>
                {carrinho.map(item => <Item key={item.id} {...item} carrinho />)}
                <div className={styles.total}>
                    <strong>
                        Resumo da compra
                    </strong>
                    <span>
                        Subtotal: <strong>{total.toFixed(2)}</strong>
                    </span>
                </div>

                <Button onClick={() => nav('/pagamento')}>
                    Finalizar compra
                </Button>
            </div>
        </div>
    )
}