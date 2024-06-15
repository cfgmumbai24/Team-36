import React, { useEffect, useState } from "react";
import ProductCard from "./productcard";
import FormComponent from "./form";

const Client = () => {

  const[products,setProducts]=useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/getProducts`, {
      methods: "GET",
      headers: {
        'accept': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      setProducts(data)
    }).catch(error => {
      // Handle errors
      console.error('There was an error!', error);
    });
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            selectedProducts={selectedProducts}
            onProductUpdate={handleProductUpdate}
          />
        ))}
      </div>
      <FormComponent products={selectedProducts} />
    </div>
  );
};

export default Client;