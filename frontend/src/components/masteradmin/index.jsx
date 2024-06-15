import React, { useState } from "react";
// import ComponentA from "./ComponentA";
// import ComponentB from "./ComponentB";
// import ComponentC from "./ComponentC";

const MasterAdmin = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderContent = () => {
    // switch (activeTab) {
    //   case "tab1":
    //     return <ComponentA />;
    //   case "tab2":
    //     return <ComponentB />;
    //   case "tab3":
    //     return <ComponentC />;
    //   default:
    //     return <ComponentA />;
    // }
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Master Admin</h2>
          <nav className="mt-4">
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab("tab1")}
                  className={`w-full text-left px-4 py-2 mb-2 rounded ${
                    activeTab === "tab1" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Tab 1
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("tab2")}
                  className={`w-full text-left px-4 py-2 mb-2 rounded ${
                    activeTab === "tab2" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Tab 2
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("tab3")}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeTab === "tab3" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Tab 3
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <section className="flex-1 p-8">
        {renderContent()}
      </section>
    </main>
  );
};

export default MasterAdmin;
