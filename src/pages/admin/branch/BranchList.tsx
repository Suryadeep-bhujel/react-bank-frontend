import React from "react";
import { BranchState } from "@states/BranchState"
// import Pagination from "@shared/Pagination";
import DataTableV1 from "@src/pages/shared/DataTableV1";
import DialogModal from "@shared/DialogModal";
import { useDialogueState } from "@states/useDialogueState";
const BranchList: React.FC = () => {
  const {
    branchList,
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
    errors,
    formTitle,
    formStructure,
    dialogType,
    formModal,
    submitForm
  } = BranchState()

  const { isDialogOpen, setIsDialogOpen } = useDialogueState();

  const handleFormSubmit = (data: any) => {
    console.log("Form data to be submitted:", data);
    console.log("saving customer data", data)
    submitForm(data).then((res) => {
        console.log("response after saving customer", res);
        console.log("resresresresres", res.message)
        if (res.success) {
            setIsDialogOpen(false);
        }
    });
  }
  return (
    <>
      <div className="">
        <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
          <h1 className="text-2xl font-bold text-cyan-900 mb-4">Branch List</h1>
          <div className="text-gray-500 justify-end">
            <button onClick={() => setIsDialogOpen(true)} className="bg-sky-500 hover:bg-blue-600 focus:bg-blue-500 focus:ring-4 focus:ring-blue-500 text-white px-4 py-2 rounded">
              Add Branch
            </button>
          </div>
        </div>
        <DataTableV1
          tableColumns={tableColumns}
          records={branchList}
          totalPages={totalPages}
          currentPage={currentPage}
          limit={limit}
          actions={actionItems}
          startFrom={startFrom}
          total={total}
          paginationSpace="top"
          handleSearch={handleSearch}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
        {isDialogOpen && (
          <DialogModal
            formModal={formModal}
            formStructure={formStructure}
            dialogType={dialogType}
            dialogTitle={formTitle}
            isDialogOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSave={(data) => handleFormSubmit(data)}
            formErrors={errors}
            rows={1}
          />
        )}
      </div>
    </>
  );
};
export default BranchList;
