import React from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { CartProvider } from "../contexts/CartContext";

const ReactPage: React.FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Supermarket - React Version</h1>
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
          <ProductList />
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
};

export default ReactPage;
