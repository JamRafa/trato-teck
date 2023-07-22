import { Outlet } from 'react-router-dom'
import NavBar from '../navBar'
import styles from './PaginaPadrao.module.scss'
import Footer from '../Footer'

export default function PaginaPadrao() {
    return(
        <div className={styles.container}> 
            <NavBar></NavBar>
            <div className={styles['container-outlet']}>
                <Outlet></Outlet>
            </div>
            <div className={styles.Footer}>
                <Footer></Footer>
            </div>
        </div>
    )
}