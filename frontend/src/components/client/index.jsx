import React from "react";
import ProductCard from "./productcard";
import FormComponent from "./form";

const Client = () => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <FormComponent />
    </div>
  );
};

export default Client;
