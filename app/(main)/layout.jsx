import React from "react";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
