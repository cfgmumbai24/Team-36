import React from "react";
import ProductCard from "./productcard";

export const checkout = () => {
  const products = [
    {
      _id: "1",
      name: "Product 1",
      description: "Description for product 1",
      price: 19.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      name: "Product 2",
      description: "Description for product 2",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "3",
      name: "Product 3",
      description: "Description for product 3",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "4",
      name: "Product 4",
      description: "Description for product 4",
      price: 49.99,
      imageUrl: "https://via.placeholder.com/150",
    },
  ];
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Product Items</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div className="border p-4 rounded shadow-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-900 font-semibold">
                ${product.price.toFixed(2)}
              </p>
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
          ))}
        </div>
      </div>
    </>
  );
};
