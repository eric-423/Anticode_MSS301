import Film from '../pages/customer/film/FilmPage'
import Home from '../pages/customer/home/Home'
import TicketPrice from '../pages/customer/ticket-price/TicketPrice'
import Product from '../pages/customer/product/Product'
import ProductDetail from '../pages/customer/product-detail/product-detail'
import Login from '../components/customer/auth/login'
import Booking from "../pages/customer/booking/Booking";
import BookingTickets from "../pages/customer/booking-tickets/BookingTickets";
import UserInfoPage from "../components/customer/user-detail/UserInfoPage";
import ManageDashboardPage from '../pages/manager/ManageDashboardPage'
import BookingHistoryPage from '../pages/customer/BookingHistoryPage'

import ConcessionsPage from "../pages/customer/concessions/ConcessionsPage";
import BookingSuccess from '../components/customer/booking-status/booking-success'
import BookingFail from '../components/customer/booking-status/booking-fail'
import TicketReceiptPage from '../components/customer/ticket-receipt/TicketReceiptPage'


const ROUTER = [
  {
    name: "customer",
    path: "/",
    page: <Home />,
    title: "Home",
    subRouter: [],
  },
  {
    name: "user-detail",
    path: "/user-detail",
    page: <UserInfoPage />,
    title: "User Info",
    subRouter: [],
  },
  {
    name: "booking-history",
    path: "/booking-history",
    page: <BookingHistoryPage />,
    title: "Booking History",
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
    name: 'customer',
    path: '/login',
    page: <Login />,
    title: 'Login',
    subRouter: [],
  },
  {
    name: 'customer',
    path: '/film',
    page: <Film />,
    title: "Home",
    subRouter: [],
  },
  {
    name: 'customer',
    path: '/product/:productId',
    page: <ProductDetail />,
    title: 'Product Detail',
    subRouter: [],
  },
  {
    name: 'customer',
    path: '/product',
    page: <Product />,
    title: "Product",
    subRouter: [],
  },
  {
    name: "booking",
    path: "/booking/:movieId",
    page: <Booking />,
    title: "Booking",
    subRouter: [],
  },
  {
    name: "manager",
    path: "/manager",
    page: <ManageDashboardPage />,
    title: "Manage Dashboard",
    subRouter: [],
  },
  {
    name: "booking",
    path: "/booking-ticket/:movieId",
    page: <BookingTickets />,
    title: "Booking",
    subRouter: [],
  },
  {
    name: "booking",
    path: "/concessions",
    page: <ConcessionsPage />,
    title: "Concessions",
    subRouter: [],
  },
  {
    name: "booking",
    path: "/booking-success",
    page: <BookingSuccess />,
    title: "Booking Success",
    subRouter: [],
  },
  {
    name: "booking",
    path: "/booking-fail",
    page: <BookingFail />,
    title: "Booking Fail",
    subRouter: [],
  },
  {
    name: "booking",
    path: "/ticket-receipt",
    page: <TicketReceiptPage />,
    title: "Ticket Receipt",
    subRouter: [],
  },
];

export default ROUTER;
