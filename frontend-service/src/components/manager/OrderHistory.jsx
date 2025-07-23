import React, { useEffect, useState } from "react";
import { getEmailByUserId, getOrderHistory } from "../../utils/api-dashboard";

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

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const orderRes = await getOrderHistory(0, 10);
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
    fetchOrderHistory();
  }, []);

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
        <div>
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
    </div>
  );
};

export default OrderHistory;
