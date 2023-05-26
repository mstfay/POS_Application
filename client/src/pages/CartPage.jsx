import React, { useState } from "react";
import Header from "../components/Header/Header";
import CreateBill from "../components/Cart/CreateBill";
import { Button, Card, Popconfirm, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { increase, decrease, deleteCart } from "../redux/CartSlice";
import "../index.css";

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
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
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
      <div className="scrollable" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'scroll' }}>
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          scroll={{ x: 1200, y: 300 }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between text-red-600 my-2">
              <span>KDV %{cart.tax}</span>
              <span>
                {(cart.total * cart.tax) / 100 > 0
                  ? "+" + ((cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Genel Toplam</span>
              <span>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <Button
              type="primary"
              size="large"
              className="mt-4 w-full bg-blue-500"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
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
