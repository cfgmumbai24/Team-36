import React, { useState } from "react";
import { Link } from "react-router-dom";
import TableDemo from "../inventory/inventory";
// import ComponentA from "./ComponentA";
// import ComponentB from "./ComponentB";



const Subadmin = () => {

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
          console.log(user.role);
        if (user.role==="sub-admin") {
          
          // Redirect to login if user is not logged in
        }else{
          navigate("*")
        }
      })
    

  const [activeTab, setActiveTab] = useState("tab1");

  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return <TableDemo />; // inventory
      //   case "tab2":
      //     return <ComponentB />; // approvals
      default:
        return <TableDemo />;
    }
  };

  return (
    <main className="min-h-screen bg-[#ef652220]">
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
      <div className="container mx-auto px-4 py-8">{renderContent()}</div>
    </main>
  );
};

export default Subadmin;
