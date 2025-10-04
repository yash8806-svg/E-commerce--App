import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { ProductContext } from '../utils/context';

const CheckOut = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const { addOnOrder } = useContext(ProductContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "cod"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOrder = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert("Please fill the boxes!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      user: form,
      item: cart,
      total,
      date: new Date().toLocaleString()
    }
    addOnOrder(newOrder);
    alert("✅ Order placed successfully!");
    setForm({ name: "", email: "", address: "", payment: "cod" });
  }

  return (
    <>
      <div className="summary">
        {cart.map((item) => (
          <div key={item.id} className="carts">
            <span>{item.title}(x{item.quantity})</span>
            <span>${(item.price * item.quantity.toFixed(2))}</span>
          </div>
        ))}
        <h3>Total:${total.toFixed(2)}</h3>
      </div>

      <div className="form">
        <form onSubmit={handleOrder}>
          <input type="text" name='name' value={form.name} placeholder='Name' onChange={handleChange} />
          <input type="text" name="email" value={form.email} placeholder='Enter email' onChange={handleChange} />
          <input type="text" name='address' value={form.address} placeholder='Enter address' onChange={handleChange} />

          <div>
            <label> <input type="radio" name='payment' value="cod" checked={form.payment === "cod"} onChange={handleChange} />Cash on Delivery</label>
            <label> <input type="radio" name='payment' value="UPI" checked={form.payment === "UPI"} onChange={handleChange} /> UPI Payment</label>
            <label> <input type="radio" name='payment' value="card" checked={form.payment === "card"} onChange={handleChange} /> Card</label>
          </div>

          <button type='submit'>Order</button>
        </form>
      </div>
    </>
  )
}

export default CheckOut
