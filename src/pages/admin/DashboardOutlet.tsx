import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavigationSidebar from "@src/pages/admin/NavigationSidebar";
const DashboardOutlet: React.FC = () => {
  const [isExpandedProfile, setExpand] = useState<Boolean>(false)
  const expandProfileDropDowan = () => {
    setExpand(isExpandedProfile ? false : true)
  }
  return (
    <>
      <div className="grid grid-cols-[16%_auto] min-h-screen bg-gray-50">
        <NavigationSidebar />
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
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          Profile
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
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
