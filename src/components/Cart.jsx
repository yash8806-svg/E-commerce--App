import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { removeCart,updateCart } from '../utils/slice';


const Cart = () => {
  const cart = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const total = cart.reduce((acc,curr) => acc + curr.price * curr.quantity,0);

  return (
    <>
      <div className="cart-container">
        <h1>Total:${total.toFixed(2)}</h1>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map(c => (
            <div key={c.id} className="cart">
              <img style={{ height: "200px" }} src={c.image} alt={c.title} />
              <h1>Price:${c.price}</h1>
              <h2>Category:{c.category}</h2>
              <h3>{c.description}</h3>
              <label htmlFor="quantity">Quantity</label>
              <select style={{cursor:"pointer"}} value={c.quantity} onChange={(e)=>dispatch(updateCart({id:c.id,quantity:Number(e.target.value)}))}>
                {[...Array(30)].map((_,i)=>(
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <h4>Rating:(Rate{c.rating?.rate},Count:{c.rating?.count})</h4>
              <button onClick={()=>dispatch(removeCart(c.id))}>Remove</button>
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
