import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "../../assets/images/background.svg";

const UserCreation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the data to the console
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNo);
    console.log("Password:", password);
    console.log("Role:", role);

    try {
      const response = await axios.post(
        "http://localhost:5000/masterAdmin/addAdmin",
        {
          name,
          email,
          phone_no: phoneNo,
          password,
          role,
        }
      );
      console.log("User created:", response.data);
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <main
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-full max-w-md p-8 rounded-lg shadow-md"
        style={{
          background: "#F2DAC9",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="phoneNo">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              className="w-full px-3 py-2 text-gray-400 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="master-admin">Master Admin</option>
              <option value="sub-admin">Sub Admin</option>
              <option value="cluster-admin">Cluster Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D8543A] text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create User
          </button>
        </form>
      </div>
    </main>
  );
};

export default UserCreation;
