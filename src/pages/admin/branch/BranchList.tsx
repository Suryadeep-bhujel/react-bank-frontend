import React, { useEffect, useState } from "react";
import { BranchState } from "@states/BranchState"
import Pagination from "@shared/Pagination";

const BranchList: React.FC = () => {
    const {branchList, getBranchList, handlePageChange, search, currentPage, total, totalPages, startFrom ,isLoading} = BranchState()
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        getBranchList();
    }, [])
  return (
    <>
      <div className="">
        <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
        <h1 className="text-2xl font-bold text-cyan-900 mb-4">Branch List</h1>
          <div className="text-gray-500 justify-end">
            <a href="" className="bg-sky-900 text-white px-4 py-2 rounded">
              Add Branch
            </a>
          </div>
        </div>
        {/* content Area */}
        {/* <pre>{JSON.stringify(branchList, null, 2)}</pre> */}
        <table className="table-auto w-full border-collapse border border-green-600">
          {/* <!-- <caption className="text-lg font-semibold text-gray-700 mb-4">Authors</caption> --> */}
          <thead>
            <tr className="bg-gray-200">
              <th className="w-1/4 px-4 py-2">ID</th>
              <th className="w-1/4 px-4 py-2">Branch Name</th>
              <th className="w-1/4 px-4 py-2">Branch Code</th>
              <th className="w-1/4 px-4 py-2">Branch Address</th>
              <th className="w-1/4 px-4 py-2">Branch Phone No.</th>
              <th className="w-1/4 px-4 py-2">Branch Email</th>
              <th className="w-1/4 px-4 py-2">Branch Type</th>
              <th className="w-1/4 px-4 py-2">Branch Status</th>
              <th className="w-1/4 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branchList.map((branchItem) => (
              <tr className="border-b" key={branchItem.id}>
                <>
                  <td className="px-4 py-2">{branchItem?.id} </td>
                  <td className="px-4 py-2">{branchItem?.branchName} </td>
                  <td className="px-4 py-2"> {branchItem.branchCode} </td>
                  <td className="px-4 py-2"> {branchItem?.branchAddress} </td>
                  <td className="px-4 py-2"> {branchItem.branchPhoneNumber} </td>
                  <td className="px-4 py-2"> {branchItem?.branchEmail} </td>
                  <td className="px-4 py-2"> {branchItem?.branchType} </td>
                  <td className="px-4 py-2">{branchItem.branchStatus} </td>
                  <td className="px-4 py-2 flex justify-center-safe">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline ml-2">
                      Delete
                    </button>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-center py-2" colSpan={4}>
                {!isLoading && (
                  <Pagination
                    totalPages={totalPages}
                    startFrom={startFrom}
                    records={branchList.length}
                    total={total}
                    currentPage={currentPage}
                    pageChanged={handlePageChange}
                  />
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
export default BranchList;
