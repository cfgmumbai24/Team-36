import React, { useState } from "react";
import { close, logo, menu } from "../../assets"; // Ensure these paths are correct
import { navLinks } from "../../constants"; // Ensure this path is correct
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
        <img src={logo} alt="logo" height={50} width={50} />
        <p className="text-blue text-2xl font-poppins ml-2">Trustflow</p>
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
        {navLinks.map((nav) => (
          <Link
            key={nav.id}
            to={`/${nav.id}`}
            onClick={() => navigate(`/${nav.id}`)}
            className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100"
          >
            {nav.title}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>

      {/* Mobile navigation */}
      <div className="flex items-center justify-end md:hidden">
        {/* Hamburger menu */}
        <img
          src={toggle ? close : menu}
          className="w-6 h-6 cursor-pointer"
          alt="menu"
          onClick={() => setToggle((prev) => !prev)}
        />

        {/* Mobile menu */}
        {toggle && (
          <div className="absolute top-16 right-6 w-48 bg-white rounded-lg shadow-lg z-50">
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className="font-medium cursor-pointer text-lg"
                  onClick={() => {
                    setToggle(false);
                    navigate(`/${nav.id}`);
                  }}
                >
                  <Link to={`/${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left font-medium cursor-pointer text-lg bg-red-500 text-white py-1 px-4 rounded"
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
