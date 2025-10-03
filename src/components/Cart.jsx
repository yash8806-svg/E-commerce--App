import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { removeCart, updateCart } from '../utils/slice';
import Stars from './Stars';
import { useMemo } from 'react';


const Cart = () => {
  const cart = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const quantityOptions = useMemo(() => [...Array(30)].map((_, i) => (
      <option key={i} value={i + 1}>{i + 1}</option>
    ))
  )

  return (
    <>
      <h1 className='text-4xl font-bold mb-5.5' >Total-Amount:${total.toFixed(2)}</h1>
      <div className="m-4">
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map(c => (
            <div key={c.id} className=" mb-3 flex items-center border-1 p-4">
              <img style={{ height: "200px" }} src={c.image} alt={c.title} loading='lazy' />
              <div className='ml-8' >
                <h2 className='font-medium mb-3' >Category:{c.category}</h2>
                <h3 className='font-bold mb-3'>{c.description}</h3>
                <div className=" w-28 rounded-2xl p-0.5  pl-1.5 flex mb-2 bg-yellow-500 font-bold ">
                  <label htmlFor="quantity">Quantity</label>
                  <select className='border-0 bg-transparent outline-none cursor-pointer' value={c.quantity} onChange={(e) => dispatch(updateCart({ id: c.id, quantity: Number(e.target.value) }))}>
                    {quantityOptions}
                  </select>
                </div>
                <h4 className='flex items-center mt-2'> <Stars rating={c.rating?.rate || 0} /> <span className="text-gray-600 text-sm" >({c.rating?.count} reviews)</span></h4>
                <h1 className='text-red-700 font-bold mb-2'>Price:${c.price}</h1>
                <button className='rounded-2xl p-1 w-50 flex justify-center  bg-red-700 text-white transition-all duration-300 cursor-pointer hover:bg-red-800' onClick={() => dispatch(removeCart(c.id))}>Remove</button>
              </div>
            </div>
          ))
        )
        }
      </div>
      {cart.length > 0 && <Link to="/checkout">Procedd to Checkout</Link>}
    </>
  )
}

export default Cart
