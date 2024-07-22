import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const Cart: React.FC = () => {
  const { cart, removeFromCart, decreaseQuantity, clearCart, calculateTotal } =
    useContext(CartContext);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      <ul className="bg-white shadow-md p-4 rounded-lg space-y-4">
        {cart.length === 0 ? (
          <li className="text-center text-gray-600">Your cart is empty</li>
        ) : (
          cart.map((item) => (
            <li
              key={item.product.id}
              className="flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{item.product.name}</div>
                <div className="text-gray-600">
                  ${item.product.price} x {item.quantity}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.product.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 transition duration-200"
                >
                  Decrease
                </button>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      {cart.length > 0 && (
        <ul className="bg-white shadow-md p-4 rounded-lg space-y-4 mt-5">
          <li className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                Total: ${calculateTotal().toFixed(2)}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearCart}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
              >
                Clear Cart
              </button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Cart;
