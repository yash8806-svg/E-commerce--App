import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const cart = useSelector(state => state.cart.cartItems);
  console.log(cart)

  return (
    <>
      <div className="flex align-middle justify-center gap-3 mb-12 mt-4 w-screen font-bold  ">
        <h1>E-commerece App</h1>
        <Link  to="/">Home</Link> 
        <Link to="/cart">Your Cart</Link> 
        <Link to="/favorite">Fav</Link> 
        <Link to="/orders">Orders</Link>
      </div>
    </>
  )
}

export default Navbar
