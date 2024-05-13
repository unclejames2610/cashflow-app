import HomeLayout from "@/views/HomeLayout";
import React, { FC, ReactNode } from "react";

const layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <HomeLayout children={children} />
    </div>
  );
};

export default layout;
