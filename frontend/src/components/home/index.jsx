import React from "react";
import Navbar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <main className={"max-w-screen overflow-hidden"}>
      <Navbar />
      <div>
        <Link to='/login'><button>

          Go to Login
        </button></Link>

        <Link to='/signup'><button>

          Go to Signup
        </button></Link>

      </div>
      <Footer />
    </main>
  );
};

export default Home;
