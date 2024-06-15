import React, { useState } from "react";
import { Link } from "react-router-dom";
// import ComponentA from "./ComponentA";
// import ComponentB from "./ComponentB";

const Subadmin = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderContent = () => {
    // switch (activeTab) {
    //   case "tab1":
    //     return <ComponentA />; // inventory
    //   case "tab2":
    //     return <ComponentB />; // approvals
    //   default:
    //     return <ComponentA />;
    // }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Subadmin Dashboard</h1>
          <div className="mt-4">
            <button
              onClick={() => setActiveTab("tab1")}
              className={`px-4 py-2 mr-2 ${
                activeTab === "tab1" ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded`}
            >
              Tab 1
            </button>
            <button
              onClick={() => setActiveTab("tab2")}
              className={`px-4 py-2 ${
                activeTab === "tab2" ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded`}
            >
              Tab 2
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </main>
  );
};

export default Subadmin;
