import React from "react";

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
          <ul
            className="grid grid-cols-12 py-5 px-4 text-[16px]"
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
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
