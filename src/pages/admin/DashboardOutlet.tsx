import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { navigationList } from "@src/shared/Navigation"
import type { RouteType } from "shared/Navigation";

const DashboardOutlet: React.FC = () => {
  const [isExpandedProfile, setExpand] = useState<Boolean>(false)
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})
  
  const expandProfileDropDowan = () => {
    setExpand(isExpandedProfile ? false : true)
  }

  const toggleSubmenu = (key: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const checkIsActiveRoute = (path: string) => {
    const location = useLocation()
    return (path?.toLowerCase() === location.pathname.toLowerCase()) ?
      'flex items-center px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold shadow-lg transform scale-105 transition-all duration-200' : 
      'flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200 hover:transform hover:scale-105';
  }

  const checkIsActiveSubRoute = (path: string) => {
    const location = useLocation()
    return (path?.toLowerCase() === location.pathname.toLowerCase()) ?
      'flex items-center px-6 py-2 text-blue-600 bg-blue-100 rounded-md font-medium ml-6 border-l-2 border-blue-600' : 
      'flex items-center px-6 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium ml-6 transition-all duration-200';
  }
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar - Increased width by 10% */}
        <div className="fixed z-40 md:static w-64 lg:w-72 bg-gradient-to-b from-white to-gray-50 shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out -translate-x-full md:translate-x-0">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
              Bank Admin
            </h1>
            <p className="text-sm text-gray-500 text-center mt-1">Management Portal</p>
          </div>
          
          {/* Navigation */}
          <nav className="px-4 py-6 space-y-2 max-h-[calc(100vh-140px)] overflow-y-auto">
            {navigationList && navigationList.length && navigationList.filter(item => item.showInSidebar).map((item: RouteType, index) => (
              <div key={index}>
                {item.isParent ? (
                  <>
                    {/* Parent Menu Item */}
                    <button
                      onClick={() => toggleSubmenu(item.key)}
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200 hover:transform hover:scale-105 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200"
                          dangerouslySetInnerHTML={{ __html: item.leftIcon || '' }}
                        />
                        <span className="font-semibold">{item.title}</span>
                      </div>
                      <div 
                        className={`text-gray-400 group-hover:text-blue-600 transition-all duration-200 ${
                          expandedMenus[item.key] ? 'rotate-90' : 'rotate-0'
                        }`}
                        dangerouslySetInnerHTML={{ __html: item.rightIcon || '' }}
                      />
                    </button>
                    
                    {/* Submenu */}
                    {expandedMenus[item.key] && item.subMenus && (
                      <div className="mt-2 mb-4 space-y-1">
                        {item.subMenus.map((subItem: RouteType, subIndex) => (
                          <Link 
                            key={subIndex}
                            to={subItem.path} 
                            className={checkIsActiveSubRoute(subItem.path)}
                          >
                            <div className="flex items-center space-x-3">
                              <div 
                                className="text-current"
                                dangerouslySetInnerHTML={{ __html: subItem.leftIcon || '' }}
                              />
                              <span>{subItem.title}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* Regular Menu Item */
                  <Link to={item.path} className={checkIsActiveRoute(item.path)}>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="text-current"
                        dangerouslySetInnerHTML={{ __html: item.leftIcon || '' }}
                      />
                      <span>{item.title}</span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        {/* Mobile overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30" />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1">{/* Main content area */}
            <div className="relative isolate bg-white min-h-screen">
              {/* Header */}
              <header className="w-full bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Notification button */}
                  <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Profile dropdown */}
                  <div className="relative">
                    <button 
                      onClick={expandProfileDropDowan} 
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors duration-200"
                    >
                      <img
                        src="https://i.pravatar.cc/40"
                        className="w-10 h-10 rounded-full border-2 border-blue-200"
                        alt="User avatar"
                      />
                      <div className="hidden md:block text-left">
                        <span className="block text-sm font-medium text-gray-700">Admin User</span>
                        <span className="block text-xs text-gray-500">Administrator</span>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </button>
                    
                    {isExpandedProfile && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-2">
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                          </svg>
                          Profile
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z" clipRule="evenodd"/>
                          </svg>
                          Logout
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {/* Content */}
              <div className="p-6">
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
