import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const updateProductArray = (product, quantity) => {
    const updatedProducts = selectedProducts.map((p) =>
      p.id === product.id ? { ...p, quantity } : p
    );

    if (!updatedProducts.some((p) => p.id === product.id)) {
      updatedProducts.push({ ...product, quantity });
    }

    setSelectedProducts(updatedProducts);
    console.log("Selected Products:", updatedProducts);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateProductArray(product, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateProductArray(product, newQuantity);
    }
  };

  return (
    <div className="border p-4 rounded shadow-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-gray-900 font-semibold">${product.price.toFixed(2)}</p>
      <div className="flex items-center mt-4">
        <button
          onClick={handleDecrement}
          className="bg-customOrange text-white px-3 py-1 rounded mr-2"
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          onClick={handleIncrement}
          className="bg-customOrange text-white px-3 py-1 rounded ml-2"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;