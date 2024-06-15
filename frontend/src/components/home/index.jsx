import React from "react";
import { Link } from "react-router-dom";
import landingImage from "../../assets/images/landing_image.png"; // Replace with your image path

const Home = (props) => {
  return (
    <main className="max-w-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen py-12  bg-customBlue">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="text-left lg:w-1/2 px-6">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
            <p className="text-lg mb-6">
              Discover our services and offerings. We provide top-notch
              solutions for all your needs.
            </p>
            <div className="flex space-x-4">
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                  Go to Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
                  Go to Signup
                </button>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                  Visit Our Marketplace
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src={landingImage}
              alt="Landing"
              className="w-full h-auto rounded shadow"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
