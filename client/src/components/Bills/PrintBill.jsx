import React from "react";
import { Button, Modal } from "antd";

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
            </div>
            <div className="bill-details">
              <div className="grid md:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura Detayı:</p>
                  <p> Fake Street 123 </p>
                  <p> San Javier </p>
                  <p> CA 1234 </p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura:</p>
                  <p>The Boring Company</p>
                  <p> Tesla Street 007 </p>
                  <p> Frisco </p>
                  <p> CA 0000 </p>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700">Fatura Numarası:</p>
                    <p>000{Math.floor(Math.random() * 100)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">
                      Fatura Tarihi:
                    </p>
                    <p>{customer?.createdAt.substring(0, 10)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <div>
                    <p className="font-bold text-slate-700">Şartlar:</p>
                    <p>3 Gün</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">Vade</p>
                    <p>13.05.2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Görsel
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0"
                    >
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-end text-sm font-normal text-slate-700 md:pl-0"
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems.map((item) => {
                    return(
                    <tr className="border-b border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src={item.image}
                          alt=""
                          className="w-12 h-12 object-hover"
                        ></img>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block font-xs">
                            {`1 Adet ${item.price}₺`}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{item.price.toFixed(2)}₺</span>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{(item.price * item.quantity).toFixed(2)} ₺</span>
                      </td>
                    </tr>);
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Ara Toplam
                      </span>
                    </th>
                    <th className="text-left pt-4 sm:hidden" scope="row">
                      <p className="font-normal text-slate-700">Ara Toplam</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.subTotal.toFixed(2)} ₺
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">KDV</span>
                    </th>
                    <th className="text-left pt-4 sm:hidden" scope="row">
                      <p className="font-normal text-slate-700">KDV</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">+{customer?.tax.toFixed(2)} ₺</span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Genel Toplam
                      </span>
                    </th>
                    <th className="text-left pt-4 sm:hidden" scope="row">
                      <p className="font-normal text-slate-700">Genel Toplam</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.totalAmount.toFixed(2)} ₺
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç
                    Ödenmesi Yasası 0000'e göre, serbest çalışanların bu süreden
                    sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti
                    talep etme hakkına sahip olduklarını ve bu noktada bu ücrete
                    ek olarak yeni bir fatura sunulacağını lütfen unutmayın.
                    Revize faturanın 14 gün içinde ödenmemesi durumunda, vadesi
                    geçmiş hesaba ek faiz ve %8 yasal oran artı %0,5 Bank of
                    England tabanı olmak üzere toplam %8,5 uygulanacaktır.
                    Taraflar Kanun hükümleri dışında sözleşme yapamazlar.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large">
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
