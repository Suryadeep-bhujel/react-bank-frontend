import React, { useState } from "react";
import { useCountryState } from "@states/useCountryState";
import DataTableV1 from "@shared/DataTableV1";
import DialogModal from "@shared/DialogModal";

const Countries: React.FC = () => {
  const {
    countryList,
    tableColumns,
    currentPage,
    totalPages,
    limit,
    total,
    startFrom,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    formStructure,
    formModal,
    formTitle,
    errors,
    submitForm,
    openAddDialog,
    isLoading
  } = useCountryState();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCountry = () => {
    openAddDialog();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveCountry = async (formData: Record<string, any>) => {
    try {
      const response = await submitForm(formData);
      if(response && response.success){
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error saving country:", error);
      // Keep dialog open to show errors
    }
  };

  // Add edit action to table columns
  const enhancedTableColumns = tableColumns.map(col => {
    if (col.fieldName === "actions") {
      return {
        ...col,
        actions: col.actions?.map(action => ({
          ...action,
          action: (record: any) => {
            action.action(record);
            setIsDialogOpen(true);
          }
        }))
      };
    }
    return col;
  });

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Countries List</h1>
          <button
            onClick={handleAddCountry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Country
          </button>
        </div>

        <DataTableV1
          tableColumns={enhancedTableColumns}
          records={countryList}
          currentPage={currentPage}
          totalPages={totalPages}
          limit={limit}
          total={total}
          startFrom={startFrom}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          handleSearch={handleSearch}
        />

        <DialogModal
          isDialogOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveCountry}
          dialogTitle={formTitle}
          formStructure={formStructure}
          formModal={formModal}
          formErrors={errors}
          rows={2}
        />
      </div>
    </>
  );
};

export default Countries;
