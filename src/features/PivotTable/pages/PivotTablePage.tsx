import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import { useParsedCoogleSheetData } from "../../../utils/useParsedData";
import { MaterialTable } from "../../../ui/components/MaterialTable/MaterialTable";
import { PivotTableChart } from "../components/PivotTableChart";

export const PivotTablePage = () => {
  const { parsedCoogleSheetData, columns, loading } =
    useParsedCoogleSheetData();
  const [groupedBy, setGroupedBy] = React.useState<string>("date_month");

  const handleGroupingChange = useCallback((groupedBy: string[]) => {
    setGroupedBy(groupedBy[0]);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <MaterialTable
        data={parsedCoogleSheetData}
        columns={columns}
        loading={loading}
        isPivotTable={true}
        storageKey="pivotTable"
        onGroupingChange={handleGroupingChange}
      />
      <Box sx={{ mt: "1rem" }}>
        <PivotTableChart
          data={parsedCoogleSheetData}
          grouping={groupedBy}
          loading={loading}
        />
      </Box>
    </Box>
  );
};
