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
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          {/* Logo and brand name */}
          <div className="flex shrink-0 items-center cursor-pointer">
            <Img src={logo} alt="logo" height={28} width={28} />
            <p className="text-gray-900 text-xl font-medium ml-2">JPMMSS</p>
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
            <Img
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
