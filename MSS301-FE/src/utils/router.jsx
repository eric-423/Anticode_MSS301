import Film from '../pages/customer/film/film'
import Home from '../pages/customer/home/Home'
import TicketPrice from '../pages/customer/ticket-price/TicketPrice'
import Product from '../pages/customer/product/Product'

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
    path: '',
    page: '',
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

export default ROUTER
