import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableDemo from "../inventory/inventory";

const Subadmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "sub-admin") {
      navigate("*");
    }
  }, [navigate]);

  return (
    <main className="min-h-screen bg-[#ef652220]">
      <div className="container mx-auto px-4 py-8">
        <TableDemo />
      </div>
    </main>
  );
};

export default Subadmin;
