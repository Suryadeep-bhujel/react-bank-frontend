import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg';
import "./App.css";
import Dashboard from "@src/pages/admin/Dashboard";
import Login from "@src/pages/Login";
import { AuthProvider } from "@context/AuthContext";
import ProtectedRoute from "@context/ProtectedRoute";
import BranchList from "@src/pages/admin/branch/BranchList";
import DashboardOutlet from "@src/pages/admin/DashboardOutlet";
import UserList from "@src/pages/admin/users/UserList";
import MyProfile from "@src/pages/admin/profile/MyProfile";
import RoleList from "@src/pages/admin/users/RoleList";
import PermissionList from "@src/pages/admin/users/PermissionList";
import BranchManagerList from "@src/pages/admin/branch/BranchManagerList";
import CustomerList from "@src/pages/admin/customers/CustomerList";
import CustomerApplicationList from "@src/pages/admin/customer-application/CustomerApplication";
import { LoadingProvider, useLoading } from "@context/LoadingContext";
import PermissionDetail from "@src/pages/admin/users/PermissionDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countries from "./pages/admin/countries/Countries";

const Home: React.FC = () => {
    // const [count, setCount] = useState(0);
    //   const { formData, handleChange, handleSubmit } = useContactForm();
    return (
        <>
            <div className="relative isolate px-6 lg:px-12">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
};

const App: React.FC = () => {
    const Loader = () => {
        const { isLoading } = useLoading();
        return isLoading ? (
            <div className="loader-container">
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        ) : null;
    }
    return (
        <>
         <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // or "light" | "dark"
      />
            <LoadingProvider>
                <Loader />
                <Home></Home>
                <ToastContainer />
                <AuthProvider>
                    <Router>
                        <Routes>
                            {/* ✅ Public login route at root "/" */}
                            <Route path="/" element={<Login />} />

                            {/* ✅ Protected layout for all dashboard pages */}
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <DashboardOutlet />
                                    </ProtectedRoute>
                                }
                            >
                                {/* 👇 These are nested under /dashboard and /branch-list */}
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="branch-list" element={<BranchList />} />
                                <Route path="branch-managers" element={<BranchManagerList />} />
                                <Route path="user-list" element={<UserList />} />
                                <Route path="roles" element={<RoleList />} />
                                <Route path="role/permissions/:oid" element={<PermissionDetail />} />
                                <Route path="role/add-role" element={<PermissionDetail />} />
                                <Route path="permissions" element={<PermissionList />} />
                                <Route path="my-profile" element={<MyProfile />} />
                                <Route path="customer-list" element={<CustomerList />} />
                                <Route path="customer-applications" element={<CustomerApplicationList />} />
                                <Route path="country-list" element={<Countries />} />
                            </Route>
                        </Routes>
                    </Router>
                </AuthProvider>
            </LoadingProvider>
        </>
    );
};

export default App;
