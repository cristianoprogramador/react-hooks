import React, { createContext, useReducer, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; id: number }
  | { type: "DECREASE_QUANTITY"; id: number }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.product.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { product: action.product, quantity: 1 }],
        };
      }
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.id),
      };
    }
    case "DECREASE_QUANTITY": {
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.product.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
      };
    }
    default:
      return state;
  }
};

const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
  calculateTotal: () => 0,
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  const addToCart = (product: Product) =>
    dispatch({ type: "ADD_TO_CART", product });
  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_FROM_CART", id });
  const decreaseQuantity = (id: number) =>
    dispatch({ type: "DECREASE_QUANTITY", id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const calculateTotal = () => {
    return state.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
