import React, { FC } from "react";

interface SettingsCardProps {
  text: string;
  subText: string;
}

const SettingsCard: FC<SettingsCardProps> = ({ text, subText }) => {
  return (
    <div className="flex flex-col gap-1 text-xs md:text-sm">
      <p>{text}</p>
      <p className="text-gray-400 capitalize">{subText}</p>
    </div>
  );
};

export default SettingsCard;
