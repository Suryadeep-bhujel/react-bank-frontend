import React from "react";
import { Link } from "react-router-dom";
const AddUpdateBankAccount: React.FC = () => {
    return (
        <>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">Add/Update Account</h1>
                    
                    <Link to="/accounts" className="bg-sky-900 text-white px-4 py-2 rounded">
                        Account List
                    </Link>
                </div>

            </div>
        </>
    );
};
export default AddUpdateBankAccount;
