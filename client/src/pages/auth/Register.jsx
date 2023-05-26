import React, { useState } from "react";
import { Form, Input, Button, Carousel, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; chartset=UTF-8" },
      });
      if (response.status === 200) {
        message.success("Kayıt işlemi başarılı.");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Kullanıcı Adı alanı boş bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                { required: true, message: "E-mail alanı boş bırakılamaz!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                { required: true, message: "Şifre alanı boş bırakılamaz!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                { required: true, message: "Şifrenizi tekrar giriniz!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Girilen şifreler eşleşmiyor")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="lg"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız mı var?&nbsp;
            <Link to={"/login"} className="text-blue-600">
              Şimdi giriş yap.
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full justify items-center">
            <Carousel autoplay>
              <AuthCarousel
                image="/images/responsive.svg"
                header="Responsive"
                describe="Tüm Cihaz Boyutlarıyla Uyumluluk"
              />
              <AuthCarousel
                image="/images/statistic.svg"
                header="İstatistikler"
                describe="Geniş Tutulan İstatislikler"
              />
              <AuthCarousel
                image="/images/customer.svg"
                header="Müşteri Memnuniyeti"
                describe="Deneyim Sonunda Üründen Memnun Müşteriler"
              />
              <AuthCarousel
                image="/images/admin.svg"
                header="Yönetici Panali"
                describe="Tek Yerden Yönetim"
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
