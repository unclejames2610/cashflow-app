import React from "react";
import { ThreeDots } from "react-loader-spinner";

const LoaderSmall = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <ThreeDots
        visible={true}
        height="50"
        width="50"
        color="#ffffff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoaderSmall;
