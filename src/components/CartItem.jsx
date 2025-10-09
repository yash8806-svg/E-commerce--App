import React, { useMemo } from 'react';
import { updateCart, removeCart } from '../utils/slice';
import { useDispatch } from 'react-redux';
import Stars from './Stars';

const CartItem = React.memo(({ item }) => {
  const dispatch = useDispatch();

  const quantityOptions = useMemo(
    () => [...Array(30)].map((_, i) => (
      <option key={i} value={i + 1}>{i + 1}</option>
    )),
    []
  );

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

        <div className="w-28 rounded-2xl p-0.5 pl-1.5 flex mb-2 bg-yellow-500 font-bold">
          <label htmlFor="quantity">Quantity</label>
          <select
            className='bg-transparent outline-none cursor-pointer'
            value={item.quantity}
            onChange={(e) =>
              dispatch(updateCart({ id: item.id, quantity: Number(e.target.value) }))
            }
          >
            {quantityOptions}
          </select>
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
