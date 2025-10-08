import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const cart = useSelector(state => state.cart.cartItems);
  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <>
      <div className="flex items-center justify-between p-4 px-8 gap-3  w-screen font-bold bg-blue-950 text-white ">
        <div className="logo">
          <h1 className='text-3xl' >E-commerece App</h1>
        </div>
        <div className="flex justify-around gap-4 cursor-pointer w-100">
          <Link to="/" className='hover:underline' >Home</Link>
          <Link to="/cart" className='hover:no-underline' >
            <span className='ml-1 hover:underline '>Cart</span>
            <span className="hover:no-underline">🛒</span>
            {totalItems > 0 && (
              <>
               <span className="right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span> <br />
              </>
            )}
          </Link>
          <Link to="/favorite" className='hover:underline' >WishList</Link>
          <Link to="/orders" className='hover:underline' >Orders</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
