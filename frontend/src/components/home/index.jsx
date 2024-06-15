import React from "react";
import { Link } from "react-router-dom";
import landingImage from "../../assets/images/landing_image.jpg"; // Replace with your image path

const Home = (props) => {
  return (
    <main className="max-w-screen overflow-hidden">
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-stone-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${landingImage})` }}
        ></div>
        <div className="relative p-8 rounded-lg shadow-lg text-center mx-4 lg:mx-0">
          <h1 className="text-6xl font-bold mb-4 text-white">
            Welcome to Our Website
          </h1>
          <p className="text-lg mb-6 text-white">
            More than a decade old organization founded by a group of like
            minded young social entrepreneurs
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <Link to="/login">
              <button className="px-4 py-2 bg-customBlue text-white rounded hover:bg-blue-600 transition duration-300">
                Go to Login
              </button>
            </Link>
          </div>
          <div className="flex justify-center space-x-4">
            <Link to="/client">
              <button className="px-4 py-2 bg-[#F08000] text-white rounded hover:bg-blue-600 transition duration-300">
                Visit Our Marketplace
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-grey-400 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-customBlue p-6 rounded-lg shadow-lg">
              <h3 className="text-white text-2xl font-bold mb-4">Service 1</h3>
              <p className="text-white">
                Description of what service 1 entails and how it benefits the
                users.
              </p>
            </div>
            <div className="bg-[#F08000] p-6 rounded-lg shadow-lg">
              <h3 className="text-white text-2xl font-bold mb-4">Service 2</h3>
              <p className="text-white">
                Description of what service 2 entails and how it benefits the
                users.
              </p>
            </div>
            <div className="bg-customBlue p-6 rounded-lg shadow-lg">
              <h3 className="text-white text-2xl font-bold mb-4">Service 3</h3>
              <p className="text-white">
                Description of what service 3 entails and how it benefits the
                users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
