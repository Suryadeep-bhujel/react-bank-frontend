import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {navigationList} from "@src/shared/Navigation"
import type { RouteType } from "shared/Navigation";
const DashboardOutlet: React.FC = () => {
    const [isExpandedProfile, setExpand] = useState<Boolean>(false)
    const expandProfileDropDowan = () => {
        setExpand(isExpandedProfile ? false : true)
    }
    const checkIsActiveRoute = (path:string) => {
        const location = useLocation()
          //  console.log("locationlocation", location)
        return (path?.toLowerCase() === location.pathname.toLowerCase())? 
        'block px-4 py-2 rounded bg-blue-200    font-semibold hover:bg-blue-100' : 'block px-4 py-2  font-semibold hover:bg-blue-100';
    }
  return (
    <>
      <div className="flex min-h-screen">
        <div className="fixed z-40 md:static w-64 bg-white shadow-md px-4 py-6 transition-transform duration-300 ease-in-out -translate-x-full md:translate-x-0">
          <h1 className="text-xl font-bold text-blue-600 mb-8 text-center">
            Admin Panel
          </h1>
          <nav className="space-y-2">
            {navigationList && navigationList.length && navigationList.map((item :RouteType, index) => (
                 <Link to={item.path} className={checkIsActiveRoute(item.path)} key={index}>
                 {item.title}
                 </Link>
            ))}
          </nav>
        </div>
        <div className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30" />

        <div className="flex-1 flex flex-col">
          <main>
            <div className="relative isolate ">
              <header className="w-full bg-white shadow px-4 py-3 flex justify-between items-center">
                <h1 className="text-lg font-bold text-blue-600"></h1>

                <div className="flex items-center space-x-4">
                  <button className="relative text-gray-600 hover:text-blue-600 focus:outline-none">
                    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  <div className="relative">
                    <button onClick={expandProfileDropDowan} className="flex items-center space-x-2 focus:outline-none  cursor-pointer ">
                      <img
                        src="https://i.pravatar.cc/32"
                        className="w-8 h-8 rounded-full"
                        alt="User avatar"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Admin
                      </span>
                    </button>
                    {isExpandedProfile && (
                    <div
                      className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </a>
                    </div>

                    )}
                  </div>
                </div>
              </header>

              <div className="py-5 px-5">
                {/* <h1 className="text-2xl font-bold text-blue-300 mb-4">
                  Dashboard
                </h1> */}
                {/* load page wise components */}
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default DashboardOutlet;
