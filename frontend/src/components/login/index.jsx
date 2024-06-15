import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("master-admin"); // Default role set to master-admin
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log email, password, and role to the console
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);

    try {
      const result = await axios.post("http://localhost:5000/user/signin", {
        email,
        password,
        role,
      });
      if (result.status === 200) {
        const userDetails = { email, password, role };
        localStorage.setItem("user", JSON.stringify(userDetails));
        console.log(result.data);

        // Navigate based on the role
        switch (role) {
          case "master-admin":
            navigate("/masteradmin");
            break;
          case "sub-admin":
            navigate("/subadmin");
            break;
          case "cluster-admin":
            navigate("/cluster");
            break;
          default:
            navigate("/dashboard"); // Default route if role is not recognized
            break;
        }
      } else {
        console.log(result.status);
        console.log("Login failed:", result.data);
      }
    } catch (err) {
      console.error("Error occurred during login:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#ef652220]">
      <Link to="/">
        {/* <button className="absolute top-4 right-4 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
          Home
        </button> */}
      </Link>

      <div
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        style={{
          background: "rgba(255, 255, 255, 0.34)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#F08000]">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[#F08000] text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-[#F08000] text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-[#F08000] text-sm font-bold mb-2"
            >
              Role
            </label>
            <select
              name="role"
              className="w-full text-[#F08000] px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="master-admin">Master Admin</option>
              <option value="sub-admin">Sub Admin</option>
              <option value="cluster-admin">Cluster Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F08000] text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">Don't have an account?</p>
        <Link to="/signup">
          <button className="w-full mt-2 bg-[#F08000] text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Register Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
