import React, { useState } from "react";
import { close, logo, menu } from "../../assets";
import { navLinks } from "../../constants";
import { Img } from "react-image";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="w-full flex flex-wrap py-2 sm:py-6 justify-between items-center px-4 md:px-8 lg:px-16 xl:px-20"
      style={{
        background: "#ef652220",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Logo and brand name */}
      <div className="flex items-center cursor-pointer">
        <Img src={logo} alt="logo" height={50} width={50} />
        <p className="text-blue text-2xl font-poppins ml-2">Trustflow</p>
      </div>

      {/* Desktop navigation */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1 text-black">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            onClick={() => navigate(`${nav.id}`)}
            className={`font-poppins font-normal cursor-pointer text-base ${
              index === navLinks.length - 1 ? "mr-0" : "mr-10"
            }`}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
        <li className="ml-10">
          <button
            onClick={handleLogout}
            className="font-poppins font-normal cursor-pointer text-base bg-red-500 text-white py-1 px-4 rounded"
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Mobile navigation */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        {/* Hamburger menu */}
        <Img
          src={toggle ? close : menu}
          className="w-6 h-6 cursor-pointer"
          alt="menu"
          onClick={() => setToggle((prev) => !prev)}
        />

        {/* Mobile menu */}
        {toggle && (
          <div className="absolute top-20 right-0 mx-4 my-2 bg-white rounded-xl shadow-lg z-20 w-60">
            <ul className="list-none">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  onClick={() => {
                    setToggle(false);
                    navigate(`${nav.id}`);
                  }}
                  className={`font-poppins font-normal cursor-pointer text-base py-2 px-4 ${
                    index === navLinks.length - 1 ? "border-b" : ""
                  }`}
                >
                  <Link to={`/${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
              <li className="py-2 px-4">
                <button
                  onClick={handleLogout}
                  className="font-poppins font-normal cursor-pointer text-base bg-red-500 text-white py-1 px-4 rounded w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
