import Loader from "@/components/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <Loader />
    </div>
  );
};

export default loading;
