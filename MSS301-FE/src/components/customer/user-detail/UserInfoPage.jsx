import React, { useState } from "react";
import { userData, spendingData, transactionHistory } from "./sampleData";
import UserProfile from "./UserProfile";
import TabNavigation from "./TabNavigation";
import TransactionHistory from "./TransactionHistory";
import Header from "../header/Header";
import UserDetail from "./UserDetail";

const UserInfoPage = () => {
  const [tab, setTab] = useState("history");

  return (
    <>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', background: '#fafafa', minHeight: '100vh', padding: 32 }}>
        <div style={{ marginRight: 48 }}>
          <UserProfile user={userData} spending={spendingData} />
        </div>
        <div style={{ flex: 1, maxWidth: 900, borderRadius: 16, padding: 32, paddingTop: 0 }}>
          <TabNavigation tab={tab} setTab={setTab} />
          {tab === "history" && <TransactionHistory transactions={transactionHistory} />}
          {tab === "profile" && <UserDetail userData={userData} />}
        </div>
      </div>
    </>
  );
};

export default UserInfoPage; 
