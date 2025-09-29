import React, { useContext } from 'react'
import { ProductContext } from '../utils/context'

const Orders = () => {
    const { orders } = useContext(ProductContext);
    return (
        <div>
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                orders.map(ord => (
                    <div key={ord.id}>
                        <p><strong>Date:</strong> {ord.date}</p>
                        <p><strong>Total:</strong> ${ord.total}</p>
                        <ul>
                            { ord.items && ord.items.map((item, i) => (
                                <li key={i}>{item.title} x{item.quantity}</li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    )
}

export default Orders
