import { ProductProvider } from './utils/context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import ProductItem from './components/ProductItem';
import Cart from './components/Cart';
import Navbar from './pages/Navbar';
import WishList from './components/WishList';
import CheckOut from './components/CheckOut';
import Orders from './components/Orders';

function App() {
  return (
    <>
      <BrowserRouter>
        <ProductProvider>
          <h1>E-Commerce App</h1>
          <Navbar />
          <Routes>
            <Route path='/' element={<ProductsList />} />
            <Route path='/details/:id' element={<ProductItem />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/favorite' element={<WishList/>} />
            <Route path='/checkout' element={<CheckOut/>} />
            <Route path='/orders' element={<Orders/>} />
          </Routes >
        </ProductProvider>
      </BrowserRouter>
    </>
  )
}

export default App
