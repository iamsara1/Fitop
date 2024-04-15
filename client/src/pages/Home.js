import React from "react";
import { useState } from "react";
import Announcement from "../composants/Announcement";
import Categories from "../composants/Categories";
import Footer from "../composants/Footer";
import Navbar from "../composants/Navbar";
import Nouveautes from "../composants/Nouveautes";
import Products from "../composants/Products";
import Slider from "../composants/Slider";

function Home() {
  
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Nouveautes />
      <Footer />
    </div>
  );
}

export default Home;
