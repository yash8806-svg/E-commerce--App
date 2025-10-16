import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductContext } from '../utils/context';
import { removeCart } from '../utils/slice';

const CheckOut = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const { addOnOrder } = useContext(ProductContext);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "cod"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert("Please fill all the fields!");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      user: form,
      items: cart.map((item) => ({
        id: item.id,
        title: item.description,
        quantity: item.quantity,
        price: item.price
      })),
      total,
      date: new Date().toLocaleString()
    };

    addOnOrder(newOrder);

    // Clear cart
    cart.forEach(item => dispatch(removeCart(item.id)));

    alert("✅ Order placed successfully!");
    setForm({ name: "", email: "", address: "", payment: "cod" });
  };

  return (
    <div className="max-w-6xl mx-auto p-4" >
      <div className="checkout-container max-w-4xl mx-auto p-6">
        <div className="summary mb-6 border p-4 rounded-md bg-white shadow">
          <h2 className="font-bold text-2xl mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="carts flex justify-between mb-2">
              <span>{item.description} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <h3 className="font-bold mt-4">Total: ${total.toFixed(2)}</h3>
        </div>

        <div className="form border p-4 rounded-md bg-white shadow">
          <h2 className="font-bold text-2xl mb-4">Enter Details</h2>
          <form onSubmit={handleOrder} className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Name"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="address"
              value={form.address}
              placeholder="Address"
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <div className="flex gap-4 mt-2">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={handleChange}
                />{" "}
                Cash on Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={form.payment === "UPI"}
                  onChange={handleChange}
                />{" "}
                UPI Payment
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={form.payment === "card"}
                  onChange={handleChange}
                />{" "}
                Card
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
