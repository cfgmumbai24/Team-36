import { Button } from "./components/ui/button";
import React, { Suspense } from "react";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Client from "./components/client/index";

const Home = React.lazy(() => import("./components/home/index"));
const Login = React.lazy(() => import("./components/login/index"));
const Signup = React.lazy(() => import("./components/signup/index"));
const Cluster = React.lazy(() => import("./components/cluster/index"));
const NotFound = React.lazy(() => import("./components/notfound/404page"));

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cluster" element={<Cluster />} />
              <Route path="/client" element={<Client />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
