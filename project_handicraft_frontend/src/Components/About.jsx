import React from "react";
import HomeCarousel from "../ui/home-carousel";
import Highlights from "../ui/highlights";
import ProductGrid from "../ui/product-grid";
import AboutUs from "../ui/about-us";
import Footer from "../ui/footer";
import MyNavBar from "./MyNavBar";

function About() {
  return (
    <section
      style={{
        backgroundColor: "rgb(34,193,195)",
        backgroundImage:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
      }}
    >
      <MyNavBar />
      <HomeCarousel />
      <Highlights />
      <ProductGrid />
      <AboutUs />
      <Footer />
    </section>
  );
}

export default About;
