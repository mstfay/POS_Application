import { Button, Card, Form, Input, Modal, Select } from "antd";
import React from "react";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
          <div className="flex justify-end">
            <Button
              type="primary"
              className="mt-4 bg-blue-500"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
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
