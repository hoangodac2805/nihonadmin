import React from "react";
import {  Outlet } from "react-router-dom";
import noavatar from "../assets/noavatar.jpeg";
import { SidebarList } from "../datas/SidebarList";
import { ISidebarList, ISidebarListItem } from "../types/SidebarListType";
import CNavLink from "../components/dashboard/NavLink";

interface IDashboardProps {}


const Dashboard: React.FC<IDashboardProps> = ({}: IDashboardProps) => {
 
  return (
    <main className="min-h-screen flex">
      {/* Sidebar */}
      <div className="max-w-[250px] w-1/4 bg-neutral-200 shadow-md flex flex-col pt-5">
        <div className="flex flex-col justify-center items-center px-2 pb-4 border-b border-b-white">
          <div className="p-1 border border-slate-500 rounded-full">
            <div className="rounded-full w-20 h-20 border border-slate-500">
              <img src={noavatar} alt="avatar" />
            </div>
          </div>
          <p className="">hoangodac@gmail.com</p>
          <div
            onClick={() => {
              if (confirm("Do you want to log out?")) {
                alert("Log out successfully");
              }
            }}
            className="mt-4 rounded-md border border-neutral-400 px-3 py-1 transition cursor-pointer hover:text-white hover:bg-neutral-400"
          >
            Log out
          </div>
        </div>

        <div className="px-2 py-4 overflow-y-auto max-h-[80vh]">
          {SidebarList.map((sidebarItem: ISidebarList) => {
            return (
              <div key={sidebarItem.label} className=" bg-slate-100 mb-2">
                <CNavLink sidebarLink={sidebarItem} />

                <div className="pl-4 mt-1">
                  {sidebarItem.children?.map((item: ISidebarListItem) => (
                    <CNavLink sidebarLink={item} />
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        <p className="mt-auto text-center p-2 border-t border-white">©DacHoa</p>
      </div>
      {/* Sidebar */}
      {/* Main */}
      <div className="w-3/4 flex-grow p-3">
        <Outlet />
      </div>
      {/* Main */}
    </main>
  );
};

export default Dashboard;
