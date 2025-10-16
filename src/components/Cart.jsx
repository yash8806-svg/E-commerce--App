import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
  const cart = useSelector(state => state.cart.cartItems);

  const total = useMemo(
    () => cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [cart]
  );

  return (
    <div className="max-w-6xl mx-auto p-4" >
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className='text-4xl font-bold mb-5'>Total Amount: ${total.toFixed(2)}</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">No items in cart</p>
      ) : (
        cart.map(item => (
          <CartItem key={item.id} item={item} />
        ))
      )}

      {cart.length > 0 && (
        <Link
          to="/checkout"
          className="inline-block mt-4 px-6 py-3 bg-blue-900 text-white font-bold rounded-2xl transition-colors duration-300 hover:bg-blue-950"
        >
          Proceed to Checkout
        </Link>
      )}
    </div>
    </div>
  );
};

export default Cart;
