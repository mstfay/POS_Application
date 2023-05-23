import React from "react";
import Header from "../components/Header/Header";
import EditProduct from "../components/Products/EditProduct";

const ProductPage = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-5" >Ürünler</h1>
        <EditProduct />
      </div>
    </React.Fragment>
  );
};

export default ProductPage;
