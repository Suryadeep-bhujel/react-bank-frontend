import React, { useEffect, useState } from "react";
// import { useUserList, type User } from "./Users";
// import Pagination from "@src/shared/Pagination";
import { DashboardService } from "@src/pages/admin/dashboard-store";
import LineChart from "@src/shared/charts/LineChart";
// import { Outlet } from "react-router-dom";
const Dashboard: React.FC = () => {
    const { getUsersList, users, currentPage, total, totalPages, startFrom } =
        DashboardService();

    //   let users = [];
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // async function load() {
        //   try {
        //     await getUsersList();
        //     console.log("usersusersusers dashboard : ", users);
        //   } catch (err) {
        //     console.error("Failed to load users:", err);
        //   } finally {
        //     setLoading(false);
        //   }
        // }

        getUsersList();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <>
            <h1 className="text-2xl font-bold text-cyan-900 mb-4">Admin Dashboard</h1>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <LineChart />
                    {/* <div className="text-gray-500 justify-end">
                        <ul>
                            <li>
                                <h1>File upload code chatgpt : </h1>
                                <a target="_blank" href="https://chatgpt.com/c/682f6ecd-33f4-8006-aee1-fb286343fc60">
                                    https://chatgpt.com/c/682f6ecd-33f4-8006-aee1-fb286343fc60
                                </a>
                            </li>
                            <li>

                            </li>
                            <li>
                                <h1>nest sql </h1>
                                <a href="https://chatgpt.com/c/68262c35-3ec8-8006-a93e-4f556bf4b023" target="_blank">
                                    https://chatgpt.com/c/68262c35-3ec8-8006-a93e-4f556bf4b023
                                </a>
                            </li>
                            <li>
                                <h1>Open api in react </h1>
                                <a href="https://chatgpt.com/c/6832bd76-e36c-8006-9d22-f2d10fdecffb" target="_blank">
                                    https://chatgpt.com/c/6832bd76-e36c-8006-9d22-f2d10fdecffb
                                </a>
                            </li>
                            <li>
                                <h1>React Material UI</h1>
                                <a href="https://mui.com/material-ui/react-table/" target="_blank">
                                    https://mui.com/material-ui/react-table/
                                </a>
                            </li>
                            <li>
                                <a href="https://chatgpt.com/c/68866217-b430-8006-abcc-783bf760e42f">
                                    https://chatgpt.com/c/68866217-b430-8006-abcc-783bf760e42f
                                </a>
                            </li>
                            <li>
                                <a href="https://chatgpt.com/c/688d2fc7-6d78-8006-8dda-119fb1edde35">
                                    https://chatgpt.com/c/688d2fc7-6d78-8006-8dda-119fb1edde35
                                </a>
                            </li>
                            <li>
                                <h1>Nest JS Commands</h1>
                                <a href="https://docs.nestjs.com/cli/usages">
                                    https://docs.nestjs.com/cli/usages
                                </a>
                            </li>
                        </ul>
                    </div> */}
                </div>

            </div>
        </>
    );
};

export default Dashboard;
