import React, { useState,useContext, useEffect } from 'react';
import { ProductContext } from '../utils/context';

const Orders = () => {
  const { orders } = useContext(ProductContext);
  const recentOrders = orders.slice(-5).reverse();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {recentOrders.map((ord) => (
            <div
              key={ord.id}
              className="border rounded-2xl p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <p className="text-gray-600 font-medium">
                  <span className="font-bold">Order Date:</span> {ord.date}
                </p>
                <p className="text-red-600 font-bold text-lg">
                  Total: ${ord.total.toFixed(2)}
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-2">Items:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {ord.items &&
                    ord.items.map((item, i) => (
                      <li key={i} className="flex justify-between items-center">
                        <span className="text-gray-700">{item.title}</span>
                        <span className="text-gray-500">x{item.quantity}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

