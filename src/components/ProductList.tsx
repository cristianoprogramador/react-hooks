import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

const mockProducts: Product[] = [
  { id: 1, name: "Apple", price: 1.50, img: "https://i.imgur.com/1kpkHfX.jpg" },
  { id: 2, name: "Banana", price: 1.99, img: "https://i.imgur.com/GpSyH4v.jpg" },
  { id: 3, name: "Carrot", price: 3, img: "https://i.imgur.com/MSiIfh3.jpg" },
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = () => {
      return new Promise<Product[]>((resolve) => {
        setTimeout(() => {
          resolve(mockProducts);
        }, 1000);
      });
    };

    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-24 h-24 object-contain mb-2"
            />
            <div className="text-lg font-medium">{product.name}</div>
            <div className="text-gray-600">${product.price}</div>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
