import Footer from "../../../components/customer/footer/Footer";
import Header from "../../../components/customer/header/Header";
import HeadSection from "../../../components/customer/home/head-section/HeadSection";
import DateNav from "../../../components/customer/ticket-price/film/date-nav/DateNav";
import Film from "../../../components/customer/ticket-price/film/Film";
import Information from "../../../components/customer/ticket-price/information/Information";
import Price from "../../../components/customer/ticket-price/price/Price";

const TicketPrice = () => {
  return(
    <div>
        <Header />
        <main>
            <HeadSection />
            <Film />
            <div className="grid md:grid-cols-2 grid-cols-1 mt-8 bg-white p-6 rounded-lg shadow-md mb-2">
              <Price />
              <Information />
            </div>
        </main>
        <Footer />
    </div>
  );
};

export default TicketPrice;
