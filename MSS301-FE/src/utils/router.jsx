import Film from "../pages/customer/film/Film";
import Home from "../pages/customer/home/Home";
import TicketPrice from "../pages/customer/ticket-price/TicketPrice";
import Product from "../pages/customer/product/Product";
import Booking from "../pages/customer/booking/Booking";
import BookingTickets from "../pages/customer/booking-tickets/BookingTickets";

const ROUTER = [
  {
    name: "customer",
    path: "/",
    page: <Home />,
    title: "Home",
    subRouter: [],
  },
  {
    name: "customer",
    path: "/ticket-price",
    page: <TicketPrice />,
    title: "Ticket Price",
    subRouter: [],
  },
  {
    name: "customer",
    path: "/film",
    page: <Film />,
    title: "Home",
    subRouter: [],
  },
  {
    name: "customer",
    path: "/product",
    page: <Product />,
    title: "Product",
    subRouter: [],
  },
  {
    name: "booking",
    path: "/booking",
    page: <Booking />,
    title: "Booking",
    subRouter: [],
  },
   {
    name: "booking",
    path: "/booking-ticket",
    page: <BookingTickets />,
    title: "Booking",
    subRouter: [],
  },
];

export default ROUTER;
