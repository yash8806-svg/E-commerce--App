import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (cartItems) => {
    try {
        localStorage.setItem("carts", JSON.stringify(cartItems));
    } catch (e) {
        console.error("Failed to save cart:", e);
    }
};


const initialState = {
    cartItems: JSON.parse(localStorage.getItem("carts")) || [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
            const item = action.payload;
            const existing = state.cartItems.find(i => i.id === item.id);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
            saveToLocalStorage(state.cartItems);
        },
        removeCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            saveToLocalStorage(state.cartItems);
        },
        updateCart: (state, action) => {
            const { id, quantity } = action.payload;
            const existing = state.cartItems.find(item => item.id === id);
            if (existing) {
                existing.quantity = quantity;
            }
            saveToLocalStorage(state.cartItems);
        }

    }
})

export const { addCart, removeCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;