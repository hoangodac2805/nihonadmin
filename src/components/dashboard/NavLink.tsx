import React from "react";
import { ISidebarListItem } from "../../types/SidebarListType";
import { NavLink } from "react-router-dom";

interface INavLinkProps {
  sidebarLink: ISidebarListItem;
}
let navLinkClass =
  "flex items-center cursor-pointer py-3 transition hover:bg-gray-400 px-2";
const CNavLink: React.FC<INavLinkProps> = ({ sidebarLink }: INavLinkProps) => {
  return (
    <NavLink
      to={sidebarLink.link}
      className={({ isActive }) =>
        isActive ? `bg-gray-400 ${navLinkClass}` : navLinkClass
      }
    >
      {<sidebarLink.icon className="mr-3" size={30} />}
      {sidebarLink.label}
    </NavLink>
  );
};

export default CNavLink;
