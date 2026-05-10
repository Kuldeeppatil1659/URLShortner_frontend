import React, { useState } from "react";
import Link from "./Link";
import QrCode from "./QrCode";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Link");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=" min-h-screen">
      <div role="tablist" className="tabs tabs-boxed">
        <div
          className={`tab ${activeTab === "Link" ? "tab-active" : ""}`}
          onClick={() => toggleTab("Link")}
        >
          Link
        </div>
        <div
          className={`tab ${activeTab === "QrCode" ? "tab-active" : ""}`}
          onClick={() => toggleTab("QrCode")}
        >
          QR Code
        </div>
      </div>

      <div className=" mt-4   ">
        {activeTab === "Link" && (
          <div>
            <Link />
          </div>
        )}
        {activeTab === "QrCode" && (
          <div>
            <QrCode />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
