import { Label } from "@radix-ui/react-label";
import React, { useState, useEffect } from "react";

const ProductCard = ({ product, onProductUpdate, selectedProducts }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
    updateProductArray(product, newQuantity);
  };

  const updateProductArray = (product, quantity) => {
    const existingProductIndex = selectedProducts.findIndex(
      (p) => p._id === product._id
    );

    let updatedProducts = [...selectedProducts];

    if (existingProductIndex !== -1) {
      if (quantity > 0) {
        updatedProducts[existingProductIndex] = { ...product, quantity };
      } else {
        updatedProducts.splice(existingProductIndex, 1);
      }
    } else if (quantity > 0) {
      updatedProducts.push({ ...product, quantity });
    }

    onProductUpdate(updatedProducts);
  };

  useEffect(() => {
    const existingProduct = selectedProducts.find((p) => p._id === product._id);
    if (existingProduct) {
      setQuantity(existingProduct.quantity);
    }
  }, [product, selectedProducts]);

  return (
    <div className="border p-4 rounded shadow-lg">
      <img
        src= {`data:image/jpeg;base64,${product.image}`}
        alt={product.name}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-gray-900 font-semibold">${product.price}</p>
      <p className="text-gray-900 font-semibold">${product.price}</p>
      <div className="flex items-center mt-4">
        <label className="mr-2">Quantity:</label>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 border rounded px-2 py-1"
        />
      </div>
    </div>
  );
};

export default ProductCard;