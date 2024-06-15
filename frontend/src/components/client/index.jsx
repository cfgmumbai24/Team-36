import React, { useEffect, useState } from "react";
import ProductCard from "./productcard";
import FormComponent from "./form";

const Client = () => {

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/getProducts`, {
      method: "GET",  // Corrected 'methods' to 'method'
      headers: {
        'accept': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      setProducts(data);
    }).catch(error => {
      // Handle errors
      console.error('There was an error!', error);
    });
  }, []);

  // Handle product updates (e.g., selection or modification)
  const handleProductUpdate = (updatedProduct) => {
    setSelectedProducts((prevSelectedProducts) => {
      const isAlreadySelected = prevSelectedProducts.some(product => product._id === updatedProduct._id);
      if (isAlreadySelected) {
        return prevSelectedProducts.filter(product => product._id !== updatedProduct._id);
      } else {
        return [...prevSelectedProducts, updatedProduct];
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              selectedProducts={[]} // Assuming you manage selectedProducts elsewhere
              onProductUpdate={(updatedProducts) => {
                // Logic to handle product update if needed
              }}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            selectedProducts={selectedProducts}
            onProductUpdate={handleProductUpdate}
          />
        ))}
      </div>
      <FormComponent products={[]} /> {/* Assuming selectedProducts management elsewhere */}
    </div>
  );
};

export default Client;

