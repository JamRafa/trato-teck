import styles from './NavBar.module.scss';
import classNames from 'classnames';
import {RiShoppingCartLine, RiShoppingCartFill} from 'react-icons/ri'
import Busca from '../Busca';
import {ReactComponent as Logo} from './../../assets/logo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const iconeProps ={ 
    color: 'white' ,
    size: 24
}

function NavBar() {
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <nav className={styles.nav}>
            <Logo  className={styles.logo} onClick={() => navigate('/')}></Logo>
            <div className={styles.links}>
                <Link to='/' className={classNames(styles.link, {
                    [styles.selected]: location.pathname === '/'
                })}>
                    pagina inicial
                </Link>
            </div>
            <div className={styles.busca}>
                <Busca></Busca>
            </div>
            <div className={styles.icones}>
                <Link to='/carrinho'>
                {location.pathname === '/carrinho'
                ? <RiShoppingCartFill {...iconeProps}></RiShoppingCartFill> 
                : <RiShoppingCartLine {...iconeProps}></RiShoppingCartLine>
            }
                </Link>
            </div>
        </nav>

    )

}
export default NavBar