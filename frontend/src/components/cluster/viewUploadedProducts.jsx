import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../client/productcard"; // Import your ProductCard component
import backgroundImage from "../../assets/images/background.svg";

const ViewUploadedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // Redirect if user is not logged in
      // You may adjust this logic based on your authentication setup
      // Example: navigate("/login");
      return;
    }

    // Function to fetch products uploaded by the logged-in user
    const fetchUploadedProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/clusterAdmin/getProducts", {
          params: {
            _id: user._id,
          },
        });
        const data = response.data;

        // Access the products array within the response object
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching uploaded products:", error);
      }
      setLoading(false);
    };

    fetchUploadedProducts(); // Call the function to fetch products on component mount
  }, []);

  const handleProductUpdate = (updatedProducts) => {
    // Handle updated products here (if needed)
    console.log("Updated Products:", updatedProducts);
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center py-32">
        <div className="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && <p>Loading...</p>}
          {!loading && Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                selectedProducts={products} // Pass the products array as selectedProducts
                onProductUpdate={handleProductUpdate} // Handle product updates if needed
              />
            ))
          ) : (
            !loading && <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUploadedProducts;