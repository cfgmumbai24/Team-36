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
          Welcome to Janardan Prasad Memorial Multipurpose Social Service Society (JPMMSS)
          </h1>
          <p className="text-lg mb-6 text-white">
          Empowering Rural Artisans: Discover our handcrafted Banana Fiber Products, Terracotta Ornaments, and Home Décor Items, each piece telling a story of tradition, creativity, and financial independence. Join us in preserving heritage and enhancing the socio-economic conditions of our rural communities.
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
              <h3 className="text-white text-2xl font-bold mb-4">Empower Rural Artisans</h3>
              <p className="text-white">
              We support and promote the crafts of rural women artisans, providing them with the platforms they need to sell their handmade products. By listing their creations on Amazon and showcasing them at various exhibitions, we help preserve traditional crafts and enable artisans to achieve financial independence.
              </p>
            </div>
            <div className="bg-[#F08000] p-6 rounded-lg shadow-lg">
              <h3 className="text-white text-2xl font-bold mb-4">Skill Development and Livelihood</h3>
              <p className="text-white">
              Through targeted initiatives, we offer skill development programs that equip individuals with the knowledge and tools necessary to enhance their livelihoods. Our focus on science and technology ensures that our community members are prepared for modern challenges, fostering a culture of continuous learning and growth.
              </p>
            </div>
            <div className="bg-customBlue p-6 rounded-lg shadow-lg">
              <h3 className="text-white text-2xl font-bold mb-4">Sustainable Development</h3>
              <p className="text-white">
              We are committed to fostering sustainable development by improving the socio-economic conditions of rural communities. Our efforts ensure that the benefits of progress are shared by all, leading to a more equitable and thriving society. By promoting environmentally friendly practices and supporting local artisans, we contribute to the long-term well-being of the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
