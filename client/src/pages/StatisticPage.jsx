import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import StatisticCard from "../components/Statistics/StatisticCard";
import { Area, Pie } from "@ant-design/plots";

const StatisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products/get-all"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch("http://localhost:5000/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const configArea = {
    data: data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
    tooltip: {
      formatter: (datum) => {
        return { name: 'Toplam', value: `${datum.subTotal.toFixed(2)}₺` };
      },
    },
  };

  const configDonut = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return amount.toFixed(2);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="px-6 md:pb-0 pb-20">
        <h1 className="text-4xl font-bold text-center mb-4">İstatisliklerim</h1>
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş geldin{" "}
            <span className="text-green-700 font-bold text-xl">admin</span>
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={data?.length}
              image={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={`${totalAmount()}₺`}
              image={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={data?.length}
              image={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={products?.length}
              image={"images/product.png"}
            />
          </div>
          <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
            <div className="lg:w-1/2 lg:h-full h-72">
              <Area {...configArea} />
            </div>
            <div className="lg:w-1/2 lg:h-full h-72">
              <Pie {...configDonut} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StatisticPage;
