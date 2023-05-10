import React, { useState } from "react";
import Header from "../components/Header/Header";
import { Button, Card, Table } from "antd";
import CreateBill from "../components/Cart/CreateBill";

function CartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <React.Fragment>
      <Header />
      <div className="px-6">
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={false}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>549.00₺</span>
            </div>
            <div className="flex justify-between text-red-600 my-2">
              <span>KDV Toplam %8</span>
              <span>+43.92₺</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Toplam</span>
              <span>592.92₺</span>
            </div>
            <Button
              type="primary"
              size="large"
              className="mt-4 w-full bg-blue-500"
              onClick={() => setIsModalOpen(true)}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </React.Fragment>
  );
}

export default CartPage;
