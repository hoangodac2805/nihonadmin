import React from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

type IAddLinkButton = {
  label: string;
  ICON: IconType;
  link: string;
};

const AddLinkButton: React.FC<IAddLinkButton> = ({label,link,ICON}: IAddLinkButton) => {
  const navigate = useNavigate();

  return (
    <div className="my-5 flex justify-end">
      <div onClick={()=>{
        navigate(link)
      }} className="flex cursor-pointer items-center border border-black py-1 px-2 rounded-lg gap-2 transition hover:bg-black hover:text-white">
        <ICON size={30} />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
};

export default AddLinkButton;
