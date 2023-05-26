import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import { Card, Table } from "antd";

const CustomerPage = () => {
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bills/get-all");
        const data = await response.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  }, []);

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];
  return (
    <React.Fragment>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Müşterilerim</h1>
        <Table
          dataSource={billItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{ x: 1000, y: 300 }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72"></Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomerPage;
