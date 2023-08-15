import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PaginaPadrao from './Components/PaginaPadrao';
import Categoria from './pages/Categoria';
import Carrinho from './pages/Carrinho';
import Anuncie from './pages/Anuncie';
import Pagamento from './pages/Pagamento';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaPadrao />}>
          <Route index element={<Home></Home>} />
          <Route path='/categoria/:nomeCategoria' element={<Categoria></Categoria>} />
          <Route path='/carrinho' element={<Carrinho></Carrinho>} />
          <Route path='/anuncie/:nomeCategoria' element={<Anuncie />} />
          <Route path='/anuncie' element={<Anuncie />} />
          <Route path='/pagamento' element={<Pagamento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}