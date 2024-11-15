import {
  MaterialReactTable,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useParsedCoogleSheetData } from "../../../utils/useParsedData";
import { DateTime } from "luxon";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { Share } from "@mui/icons-material";
import { MaterialTable } from "../../../ui/components/MaterialTable/MaterialTable";

export const PivotTable = () => {
  const { parsedCoogleSheetData, columns, loading } =
    useParsedCoogleSheetData();

  return (
    <div>
      {/* <MaterialReactTable table={tableComponent} /> */}
      <MaterialTable
        data={parsedCoogleSheetData}
        columns={columns}
        loading={loading}
        isPivotTable={true}
      />
    </div>
  );
};
