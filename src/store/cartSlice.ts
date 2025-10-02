import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
};

const initialState: CartState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const recalcTotals = (state: CartState) => {
  state.totalCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      recalcTotals(state);
    },
    updateCartQuantity: (state, action: PayloadAction<{ id: string; name?: string; price?: number; image?: string; quantity: number }>) => {
      const { id, name, price, image, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      } else if (quantity > 0) {
        if (!name || !price || !image) return;
        state.items.push({ id, name, price, image, quantity });
      }
      recalcTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      recalcTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      recalcTotals(state);
    },
  },
});

export const { addToCart, updateCartQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
