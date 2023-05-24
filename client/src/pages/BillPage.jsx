import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import PrintBill from "../components/Bills/PrintBill";
import { Button, Table } from "antd";

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState();

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
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        const date = new Date(text);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // JavaScript ayları 0'dan başlayarak sayar, bu yüzden 1 eklenir.
        const year = date.getFullYear();

        const formattedDate = `${year}-${month}-${day}`;

        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <span>{text.toFixed(2)}₺</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (item) => {
        return <Button type="link" className="pl-0" onClick={() => setIsModalOpen(true)}>Yazdır</Button>;
      },
    },
  ];

  return (
    <React.Fragment>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
        <Table
          dataSource={billItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{ x: 1000, y: 400 }}
        />
      </div>
      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </React.Fragment>
  );
};

export default BillPage;
