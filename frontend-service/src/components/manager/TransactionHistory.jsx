import React, { useEffect, useState } from "react";
import { getTransactionHistory } from "../../utils/api-dashboard";

const formatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const TransactionHistory = () => {
  const title = [
    {
      name: "Transaction Code",
      column: 2,
    },
    {
      name: "Order Code",
      column: 2.5,
    },
    {
      name: "Customer",
      column: 2,
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
      column: 1,
    },
  ];

  const [transactions, setTransactions] = useState([]);
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

    fetchTransactionHistory();
  }, []);

  const caculateFrame = () => {
    return title.map((item) => `${item.column}fr `).join("");
  };
  return (
    <div className="p-[32px]">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <ul
          className="grid grid-cols-12 text-[12px] text-gray-700 uppercase bg-gray-100 py-5 px-4 rounded-[.375rem] font-bold"
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
        <div>
          {transactions &&
            transactions.map((transaction) => (
              <ul
                className="grid grid-cols-12 py-5 px-4 text-[16px]"
                style={{
                  gridTemplateColumns: caculateFrame(),
                }}
              >
                {Object.values(transaction).map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
