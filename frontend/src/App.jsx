import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Client from "./components/client/index";
import Home from "./components/home/index";
import Login from "./components/login/index";
import Signup from "./components/signup/index";
import Cluster from "./components/cluster/index";
import NotFound from "./components/notfound/404page";
import InventoryMaster from "./components/inventorymaster/index";
import Inventory from "./components/inventory/inventory";
import Masteradmin from "./components/masteradmin/index";
import Subadmin from "./components/subadmin/index";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cluster" element={<Cluster />} />
            <Route path="/client" element={<Client />} />
            <Route path="/masteradmin" element={<Masteradmin />}  />
            <Route path="/subadmin" element={<Subadmin />}  />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventorymaster" element={<InventoryMaster />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
