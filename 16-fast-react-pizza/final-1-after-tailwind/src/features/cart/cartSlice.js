import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incrQuantity: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decrQuantity: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, incrQuantity, decrQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (store) => store.cart.cart;
export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.unitPrice, 0);
export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
