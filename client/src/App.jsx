import React from "react";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import CartTotals from "./components/Cart/CartTotals";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="home px-6 flex justify-between gap-10">
        <div className="categories overflow-auto max-h-[calc(100vh-_-112px)] pb-64">
          <Categories />
        </div>
        <div className="products flex-[8]">
          <Products />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <CartTotals />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
