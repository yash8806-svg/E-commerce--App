import { updateCart, removeCart } from '../utils/slice';
import { useDispatch } from 'react-redux';
import Stars from './Stars';
import { useState } from 'react';
import React from 'react';

const CartItem = React.memo(({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  return (
    <div className="mb-3 flex items-center border-1 border-gray-300 shadow-lg p-4">
      <img
        style={{ height: "200px" }}
        src={item.image}
        alt={item.title}
      />
      <div className='ml-8'>
        <h2 className='font-medium mb-3'>Category: {item.category}</h2>
        <h3 className='font-bold mb-3'>{item.description}</h3>

        <div className="w-28 rounded-2xl pr-2 p-1 pl-2 flex justify-between mb-2 border-3 border-amber-300 font-bold">
          <button disabled={quantity === 1} onClick={()=>{setQuantity(quantity - 1); dispatch(updateCart({ id: item.id, quantity:quantity - 1}))}} className='cursor-pointer' >-</button>
             <p>{quantity}</p>
          <button onClick={()=> { setQuantity(quantity + 1); dispatch(updateCart({ id: item.id, quantity:quantity + 1}))}} className='cursor-pointer' >+</button>
        </div>
 
        <h4 className='flex items-center mt-2'>
          <Stars rating={item.rating?.rate || 0} />
          <span className="text-gray-600 text-sm">({item.rating?.count} reviews)</span>
        </h4>

        <h1 className='text-red-700 font-bold mb-2'>Price: ${item.price}</h1>

        <button
          className='rounded-2xl p-1 w-50 flex justify-center bg-red-700 text-white transition-colors duration-300 cursor-pointer hover:bg-red-800'
          onClick={() => dispatch(removeCart(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
});

export default CartItem;
