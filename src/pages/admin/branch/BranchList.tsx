import React, { useEffect, useState } from "react";
import { BranchState } from "@states/BranchState"
// import Pagination from "@shared/Pagination";
import DataTableV1 from "@src/pages/shared/DataTableV1";

const BranchList: React.FC = () => {
  const {
    branchList,
    getBranchList,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    currentPage,
    total,
    totalPages,
    startFrom,
    tableColumns,
    limit,
    actionItems,

  } = BranchState()
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
        <DataTableV1
          tableColumns={tableColumns}
          records={branchList}
          totalPages={totalPages}
          currentPage={currentPage}
          limit={limit}
          updatePermission={() => { }}
          actions={actionItems}
          startFrom={startFrom}
          total={total}
          paginationSpace="top"
          handleSearch={handleSearch}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>
    </>
  );
};
export default BranchList;
