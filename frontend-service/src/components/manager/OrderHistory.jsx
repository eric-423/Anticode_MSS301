import React, { useEffect, useState } from "react";
import {
  getEmailByUserId,
  getOrderHistory,
  getPageOrderHistory,
} from "../../utils/api-dashboard";

const formatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const OrderHistory = () => {
  const title = [
    {
      name: "Order Code",
      column: 1.5,
    },
    {
      name: "Customer",
      column: 2,
    },
    {
      name: "Film",
      column: 2.5,
    },
    {
      name: "Concession",
      column: 2,
    },
    {
      name: "Total Price",
      column: 1.25,
    },
    {
      name: "Date",
      column: 1.25,
    },
    {
      name: "Status",
      column: 1,
    },
    {
      name: "",
      column: 0.5,
    },
  ];

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const fecthGetPage = async () => {
      const pageRes = (await getPageOrderHistory()).data;
      setPage(pageRes);
    };
    fecthGetPage();
  }, []);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const orderRes = await getOrderHistory(activePage, 9);
      const ordersHandle = await Promise.all(
        orderRes.data.map(async (item) => {
          return {
            id: item.id,
            customer: (await getEmailByUserId(item.userID)).data,
            film: item.film,
            concession:
              item.bookingConcessionList === undefined ||
              item.bookingConcessionList === null ||
              item.bookingConcessionList?.length === 0
                ? "N/A"
                : item.bookingConcessionList
                    .map((concession) => `${concession.concessionName}`)
                    .join(", "),
            price: item.totalPrice,
            date: formatter.format(new Date(item.bookDate)),
            status: item.bookingStatus,
          };
        })
      );

      setOrders(ordersHandle);
    };
    if (page) fetchOrderHistory();
  }, [page, activePage]);

  const caculateFrame = () => {
    return title.map((item) => `${item.column}fr `).join("");
  };

  return (
    <div className="p-[32px]">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <ul
          className="grid grid-cols-12 text-[12px] text-gray-700 uppercase bg-gray-100 py-5 px-4 rounded-[.375rem] font-bold gap-x-[20px]"
          style={{
            gridTemplateColumns: caculateFrame(),
          }}
        >
          {title.map((item) => (
            <li>{item.name}</li>
          ))}
        </ul>
        <div className="min-h-[68vh]">
          {orders &&
            orders.map((order) => (
              <ul
                className="grid grid-cols-12 py-5 px-4 text-[16px] gap-x-[20px]"
                style={{
                  gridTemplateColumns: caculateFrame(),
                }}
              >
                {Object.values(order).map((item) => (
                  <li className="line-clamp-1">{item}</li>
                ))}
                <li>
                  <button className="font-medium text-blue-600 hover:underline mr-4 cursor-pointer">
                    Xem
                  </button>
                </li>
              </ul>
            ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 gap-x-[20px]">
        {page > 1 && Array.from({ length: page }).map((_, index) => (
          <div
            onClick={() => setActivePage(index)}
            className={`w-[30px] h-[30px]  flex justify-center items-center cursor-pointer rounded-[.375rem]  ${
              activePage === index
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            } `}
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
