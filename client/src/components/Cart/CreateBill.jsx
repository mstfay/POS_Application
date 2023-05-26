import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/CartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total.toFixed(2),
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; chartset=UTF-8" },
      });
      if(response.status === 200){
        message.success("Fatura başarılı bir şekilde oluşturuldu.")
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.")
      console.log(error);
    }
  };
  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Müşteri Adı"
          name={"customerName"}
          rules={[
            { required: true, message: "Müşteri Adı alanı boş geçilemez" },
          ]}
        >
          <Input placeholder="Müşteri Adı Giriniz" />
        </Form.Item>
        <Form.Item
          label="Telefon Numarası"
          name={"phoneNumber"}
          rules={[
            { required: true, message: "Telefon Numarası alanı boş geçilemez" },
          ]}
        >
          <Input placeholder="Telefon Numarası Giriniz" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Ödeme Yöntemi"
          name={"paymentMethod"}
          rules={[
            { required: true, message: "Ödeme Yöntemi alanı boş geçilemez" },
          ]}
        >
          <Select placeholder="Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card>
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
          <div className="flex justify-end">
            <Button
              type="primary"
              className="mt-4 bg-blue-500"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
