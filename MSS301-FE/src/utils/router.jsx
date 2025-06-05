import Film from '../pages/customer/film/film';
import Home from '../pages/customer/home/Home';
import TicketPrice from '../pages/customer/ticket-price/TicketPrice';
import Product from '../pages/customer/product/Product';
import AdminLayout from '../components/admin/Layout';
import Dashboard from '../pages/admin/Dashboard';
import Films from '../pages/admin/Films';
import Users from '../pages/admin/Users';

const ROUTER = [
  {
    name: 'customer',
    path: '/',
    page: <Home />,
    title: 'Home',
    subRouter: [
      {
        name: '',
        path: '',
        page: '',
        title: '',
        subRouter: null,
      },
    ],
  },
  {
    name: 'customer',
    path: '/ticket-price',
    page: <TicketPrice />,
    title: 'Ticket Price',
    subRouter: [
      {
        name: '',
        path: '',
        page: '',
        title: '',
        subRouter: null,
      },
    ],
  },
  {
    name: 'customer',
    path: '/film',
    page: <Film />,
    title: 'Home',
    subRouter: [
      {
        name: '',
        path: '',
        page: '',
        title: '',
        subRouter: null,
      },
    ],
  },
  {
    name: 'customer',
    path: '/product',
    page: <Product />,
    title: 'Product',
    subRouter: [
      {
        name: '',
        path: '',
        page: '',
        title: '',
        subRouter: null,
      },
    ],
  },
  {
    name: 'admin',
    path: '/admin',
    page: <AdminLayout />,
    title: 'Admin',
    subRouter: [
      {
        name: 'dashboard',
        path: '',
        page: <Dashboard />,
        title: 'Dashboard',
      },
      {
        name: 'films',
        path: 'films',
        page: <Films />,
        title: 'Films',
      },
      {
        name: 'users',
        path: 'users',
        page: <Users />,
        title: 'Users',
      },
    ],
  },
  {
    name: 'staff',
    path: '',
    page: '',
  },
  {
    name: 'manager',
    path: '',
    page: '',
  },
]

export default ROUTER;
