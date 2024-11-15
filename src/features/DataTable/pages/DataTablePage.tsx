import React, { useState } from "react";
import { Box } from "@mui/material";
import { MaterialTable } from "../../../ui/components/MaterialTable/MaterialTable";
import { useParsedCoogleSheetData } from "../../../utils/useParsedData";
import { DataChart } from "../components/DataChart";

export const DataTablePage = () => {
  const { parsedCoogleSheetData, columns, loading } =
    useParsedCoogleSheetData();

  const [tableFilteredRows, setTableFilteredRows] = useState<Array<any>>([]);
  const handleFilteredRowChange = (table: any) => {
    setTableFilteredRows(table.map((item) => item.original));
  };

  return (
    <Box sx={{ p: 2 }}>
      <MaterialTable
        data={parsedCoogleSheetData}
        columns={columns}
        loading={loading}
        storageKey="dataTable"
        onFilteredRowChange={handleFilteredRowChange}
      />
      <Box sx={{ mt: "1rem" }}>
        <DataChart data={tableFilteredRows} loading={loading} />
      </Box>
    </Box>
  );
};
