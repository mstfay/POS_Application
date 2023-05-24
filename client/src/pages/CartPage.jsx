import React, { useState } from "react";
import Header from "../components/Header/Header";
import CreateBill from "../components/Cart/CreateBill";
import { Button, Card, Popconfirm, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { increase, decrease, deleteCart } from "../redux/CartSlice";

function CartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "image",
      key: "image",
      width: "125px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (item) => {
        return <span>{item.toFixed(2)}₺</span>;
      },
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (item, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={
                <PlusCircleOutlined
                  onClick={() => dispatch(increase(record))}
                />
              }
            />
            <span className="w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={
                <MinusCircleOutlined
                  onClick={() => {
                    if (record.quantity === 1) {
                      if (window.confirm("Ürün sepetinizden silinsin mi?")) {
                        dispatch(decrease(record));
                        message.success("Ürün sepetten kaldırıldı.");
                      }
                    }
                    if (record.quantity > 1) {
                      dispatch(decrease(record));
                    }
                  }}
                />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (item, record) => {
        return <span>{(record.price * record.quantity).toFixed(2)}₺</span>;
      },
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Popconfirm
            title={`${record.title} ürününü sepetinizden kaldırmak istediğinize emin misiniz?`}
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success(record.title + " ürünü sepetinizden kaldırıldı.");
            }}
          >
            <Button type="link" danger>
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
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
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </React.Fragment>
  );
}

export default CartPage;
