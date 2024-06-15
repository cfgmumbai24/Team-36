import React, { useState } from "react";
import UserCreation from "../usercreation";
import TableDemo from "../inventorymaster";
// import ComponentA from "./ComponentA";
// import ComponentB from "./ComponentB";
// import ComponentC from "./ComponentC";



const MasterAdmin = () => {
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
          console.log(user.role);
        if (user.role==="master-admin") {
          
          // Redirect to login if user is not logged in
        }else{
          navigate("*")
        }
      })
    
  const [activeTab, setActiveTab] = useState("tab1");

  const renderContent = () => {
    switch (activeTab) {
      //   case "Add Category":
      //     return <ComponentA />;
         case "View Inventory":
           return <TableDemo />;
      //   case "Create Users":
      //     return <ComponentC />;
      default:
        return <UserCreation />;
    }
  };

  return (
    <main className="flex min-h-screen">
      <aside
        className="w-64 shadow-md"
        style={{
          background: "#ef652220",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold font-nexa">Master Admin</h2>
          <nav className="mt-4">
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab("Add Category")}
                  className={`w-full text-left px-4 py-2 mb-2 rounded ${
                    activeTab === "tab1" ? "bg-[#F08000]" : "bg-gray-200"
                  }`}
                >
                  Add Category
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("View Inventory")}
                  className={`w-full text-left px-4 py-2 mb-2 rounded ${
                    activeTab === "tab2"
                      ? "bg-[#F08000] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  View Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("Create Users")}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeTab === "tab3"
                      ? "bg-[#F08000] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Create Users
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <section className="flex-1">{renderContent()}</section>
    </main>
  );
};

export default MasterAdmin;
