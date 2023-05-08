import React from "react";
import Header from "../components/Header/Header"
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CartTotals from "../components/Cart/CartTotals";

function HomePage() {
  return (
    <React.Fragment>
      <Header />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
          <Categories />
        </div>
        <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_112px)] pb-10">
          <Products />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <CartTotals />
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
