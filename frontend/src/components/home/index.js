import React from "react";
import Navbar from "../../components/navbar/index";
import Footer from "../../components/footer/index";

const Home = (props) => {
  return (
    <>
      <main className={"max-w-screen overflow-hidden"}>
        <Navbar />
        <Footer />
      </main>
    </>
  );
};

export default Home;
