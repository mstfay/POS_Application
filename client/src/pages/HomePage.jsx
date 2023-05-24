import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CartTotals from "../components/Cart/CartTotals";

function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/categories/get-all"
        );
        const data = await response.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
          <Categories categories={categories} setCategories={setCategories} />
        </div>
        <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_112px)] pb-10">
          <Products categories={categories} />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <CartTotals />
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
