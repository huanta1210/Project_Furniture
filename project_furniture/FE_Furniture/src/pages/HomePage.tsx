import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <MainPage />
      <Footer />
    </>
  );
};

const MainPage: React.FC = () => {
  return (
    <>
      <h2>Phần thân</h2>
    </>
  );
};

export default HomePage;
