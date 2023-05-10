import React from "react";

const AuthCarousel = ({ image, header, describe }) => {
  return (
    <div className="!flex flex-col items-center justify-center !h-full mb-10 px-6">
      <img src={image} alt="" className="w-[600px] h-[500px]"></img>
      <h3 className="text-4xl text-white text-center font-bold">{header}</h3>
      <p className="mt-5 text-2xl text-white text-center">{describe}</p>
    </div>
  );
};

export default AuthCarousel;
