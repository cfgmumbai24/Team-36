import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardWithForm from "./cardWithForm";
import ViewUploadedProducts from "./viewUploadedProducts"; // Import your ViewUploadedProducts component

export default function Cluster() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("card_with_form");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "cluster-admin") {
      navigate("*");
    }
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "card_with_form":
        return <CardWithForm />;
      case "view_uploaded_products":
        return <ViewUploadedProducts />;
      default:
        return <CardWithForm />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left sidebar for tabs */}
      <aside
        className="w-48 p-4"
        style={{
          backgroundColor: "#f2dec7",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <nav>
          <ul>
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded-lg ${
                  activeTab === "card_with_form" ? "bg-red-500 text-white" : "text-gray-800"
                }`}
                onClick={() => handleTabClick("card_with_form")}
                style={{
                  backgroundColor: activeTab === "card_with_form" ? "#D8543A" : "transparent",
                }}
              >
                Card With Form
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded-lg ${
                  activeTab === "view_uploaded_products" ? "bg-red-500 text-white" : "text-gray-800"
                }`}
                onClick={() => handleTabClick("view_uploaded_products")}
                style={{
                  backgroundColor: activeTab === "view_uploaded_products" ? "#D8543A" : "transparent",
                }}
              >
                View Uploaded Products
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
}