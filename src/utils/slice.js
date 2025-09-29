import { createSlice } from "@reduxjs/toolkit";

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
            localStorage.setItem("carts", JSON.stringify(state.cartItems));
        },
        removeCart:(state,action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
               localStorage.setItem("carts", JSON.stringify(state.cartItems));
        },
        updateCart:(state,action) => {
            const {id,quantity} = action.payload;
            const existing = state.cartItems.find(item => item.id === id);
            if(existing){
                existing.quantity = quantity;
            }
               localStorage.setItem("carts", JSON.stringify(state.cartItems));
        }

    }
})

export const { addCart,removeCart,updateCart } = cartSlice.actions;

export default cartSlice.reducer;