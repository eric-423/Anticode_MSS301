
import Film from '../pages/customer/film/Film'
import Home from '../pages/customer/home/Home'
import TicketPrice from '../pages/customer/ticket-price/TicketPrice'
import Product from '../pages/customer/product/Product'
import ProductDetail from '../pages/customer/product-detail/product-detail'
import Login from '../components/customer/auth/login'
import Booking from "../pages/customer/booking/Booking";
import UserInfoPage from "../components/customer/user-detail/UserInfoPage";



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
    path: '/detail',
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
    path: "/booking",
    page: <Booking />,
    title: "Booking",
    subRouter: [],
  },
  {
    name: "admin",
    path: "",
    page: "",
  },
  {
    name: "staff",
    path: "",
    page: "",
  },
  {
    name: "manager",
    path: "",
    page: "",
  },
];

export default ROUTER;
