import React, { useEffect, useState } from "react";
import {
  getEmailByUserId,
  getPageTransactionHistory,
  getTransactionHistory,
} from "../../utils/api-dashboard";

const formatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const TransactionHistory = () => {
  const title = [
    {
      name: "Transaction Code",
      column: 1.5,
    },
    {
      name: "Order Code",
      column: 1.5,
    },
    {
      name: "Customer",
      column: 3,
    },
    {
      name: "Method",
      column: 2,
    },
    {
      name: "Date",
      column: 1.5,
    },
    {
      name: "Amount",
      column: 1,
    },
    {
      name: "Status",
      column: 1.5,
    },
  ];

  const [page, setPage] = useState();
  const [activePage, setActivePage] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fecthGetPage = async () => {
      const pageRes = (await getPageTransactionHistory()).data;
      setPage(pageRes);
    };
    fecthGetPage();
  }, []);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const transactionsRes = await getTransactionHistory(0, 10);
      const transactionHandle = await Promise.all(
        transactionsRes.data.map(async (item) => {
          return {
            transactionCode: item.id,
            orderCode: item.bookingId,
            customer: (await getEmailByUserId(item.userId)).data,
            method: item.paymentMethod,
            date: formatter.format(new Date(item.transactionDate)),
            amount: item.amount,
            status: item.paymentStatus,
          };
        })
      );
      setTransactions(transactionHandle);
    };
    if (page) fetchTransactionHistory();
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
          {title.map((item, index) => (
            <li
              className={`${
                index === title.length - 1 ? "text-center" : null
              } `}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="min-h-[68vh] ">
          {transactions &&
            transactions.map((transaction) => (
              <ul
                className="grid grid-cols-12 py-5 px-4 text-[16px] gap-x-[20px]"
                style={{
                  gridTemplateColumns: caculateFrame(),
                }}
              >
                {Object.values(transaction).map((item, index) => (
                  <li
                    className={`${
                      index === title.length - 1 ? "text-center" : null
                    } `}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 gap-x-[20px]">
          {page > 1 && Array.from({ length: page }).map((_, index) => (
            <div
              className={`w-[30px] h-[30px]  flex justify-center items-center cursor-pointer rounded-[.375rem]  ${
                activePage === index
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } `}

              onClick={() => setActivePage(index)}
            >
              {index}
            </div>
          ))}
        </div>
    </div>
  );
};

export default TransactionHistory;
