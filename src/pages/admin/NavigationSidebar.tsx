import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navigationList } from "@src/shared/Navigation"
import type { RouteType } from "shared/Navigation";
const NavigationSidebar: React.FC = () => {

    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})
    const checkIsActiveRoute = (path: string) => {
        const location = useLocation()
        //  console.log("locationlocation", location)
        return (path?.toLowerCase() === location.pathname.toLowerCase())
            ? 'flex items-center px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold shadow-lg transform scale-105 transition-all duration-200'
            :
            'flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200 hover:transform hover:scale-105';
    }
    const checkIsActiveSubRoute = (path: string) => {
        const location = useLocation()
        return (path?.toLowerCase() === location.pathname.toLowerCase()) ?
            'flex items-center px-6 py-2 text-blue-600 bg-blue-100 rounded-md font-medium ml-6 border-l-2 border-blue-600' :
            'flex items-center px-6 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium ml-6 transition-all duration-500';
    }

    const toggleSubmenu = (key: string) => {
        console.log("keykeykeykeykey", key)
        setExpandedMenus(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }
    return (
        <>
            <div className="fixed z-40 md:static w-full lg:w-full bg-gradient-to-b from-white to-gray-50 shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out -translate-x-full md:translate-x-0">
                <div className="px-6 py-8 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
                        Bank Admin
                    </h1>
                    <p className="text-sm text-gray-500 text-center mt-1">Management Portal</p>
                </div>
                <nav className="px-4 py-6 space-y-2 max-h-[calc(100vh-140px)] overflow-y-auto">
                    {navigationList && navigationList.length && navigationList.filter(item => item.showInSidebar).map((item: RouteType, index) => (
                        <>
                         {/* <Link to={item.path} className={checkIsActiveRoute(item.path)} key={index}>
                                <div className="flex">
                                    <div
                                        className="icon"
                                        dangerouslySetInnerHTML={{ __html: item.leftIcon }}
                                    />
                                    <div className="navTitle">
                                        {item.title}
                                    </div>
                                    <div
                                        className={`text-gray-400 group-hover:text-blue-600 transition-all duration-200 ${expandedMenus[item.key] ? 'rotate-90' : 'rotate-0'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: item.rightIcon || '' }}
                                    />

                                </div>
                            </Link> */}
                            <div key={`nav${index}`}>
                                {item.isParent && item?.subMenus?.length ? (
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
                                                className={`text-gray-400 group-hover:text-blue-600 transition-all duration-200 ${expandedMenus[item.key] ? 'rotate-90' : 'rotate-0'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: item.rightIcon || '' }}
                                            />
                                        </button>

                                        {/* Submenu */}
                                        {expandedMenus[item.key] && item.subMenus && (
                                            <div className="mt-2 mb-4 space-y-1 transition-all duration-300">
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
                                    <>
                                        <Link to={item.path} className={checkIsActiveRoute(item.path)}>
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="text-current"
                                                    dangerouslySetInnerHTML={{ __html: item.leftIcon || '' }}
                                                />
                                                <span>{item.title}</span>
                                                <div
                                                    className={`text-gray-400 group-hover:text-blue-600 transition-all duration-200 ${expandedMenus[item.key] ? 'rotate-90' : 'rotate-0'
                                                        }`}
                                                    dangerouslySetInnerHTML={{ __html: item.rightIcon || '' }}
                                                />
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default NavigationSidebar;
