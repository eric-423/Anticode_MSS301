import React from "react";
import Header from "../../../components/customer/header/Header";
import HeadSection from "../../../components/customer/home/head-section/HeadSection";
import Film from "../../../components/customer/home/film/Film";
import CinemaCorner from "../../../components/customer/home/cinema-corner/CinemaCorner";
import Promotions from "../../../components/customer/home/promotions/Promotions";
import DownloadApp from "../../../components/customer/home/download-app/DownloadApp";
import Information from "../../../components/customer/home/information/Information";
import Footer from "../../../components/customer/footer/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HeadSection />
        <Film />
        <div className="h-[6px] w-full bg-[#f4f4f4]"></div>
        <CinemaCorner />
        <div className="h-[6px] w-full bg-[#f4f4f4]"></div>
        <Promotions />
        <DownloadApp />
        <Information />
      </main>
      <Footer />
    </>
  );
};

export default Home;
