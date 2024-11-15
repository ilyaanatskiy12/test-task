import React, { useCallback, useEffect } from "react";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import Button from "@mui/material/Button";
import Share from "@mui/icons-material/Share";
import { usePersistentGlobalFilter } from "./usePersistentGlobalFilter";
import Box from "@mui/material/Box";

type Props = {
  data: any;
  columns: any;
  loading?: boolean;
  isPivotTable?: boolean;
  storageKey: string;
  onFilteredRowChange?: (table: any) => void;
  onGroupingChange?: (rows: string[]) => void;
};

export const MaterialTable = (props: Props) => {
  const {
    data,
    columns,
    loading = false,
    isPivotTable = false,
    storageKey,
    onFilteredRowChange,
    onGroupingChange,
  } = props;
  const { globalFilter, setGlobalFilter, clearGlobalFilter } =
    usePersistentGlobalFilter(storageKey);

  const handleCopyUrlClick = useCallback(async () => {
    try {
      const baseUrl = window.location.origin + window.location.pathname;
      const shareableUrl = `${baseUrl}?globalFilter=${encodeURIComponent(
        globalFilter
      )}`;
      await navigator.clipboard.writeText(shareableUrl);
      alert("URL copied to clipboard successfully.");
    } catch {
      alert("Failed to copy URL to clipboard.");
    }
  }, [globalFilter]);

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    muiTableBodyRowProps: {
      sx: {
        fontSize: 14,
      },
    },
    muiTablePaperProps: {
      sx: { border: "2px solid gray", height: "100%" },
    },
    muiTableContainerProps: { sx: { height: "80%" } },
    muiPaginationProps: {
      shape: "rounded",
      variant: "outlined",
    },
    initialState: {
      columnVisibility: {
        dateMonth: false,
        dateYear: false,
        dateWeek: false,
      },
      ...(isPivotTable ? { grouping: ["date_month"] } : {}),
    },
    renderBottomToolbarCustomActions: () => (
      <Box>
        <Button
          aria-controls="date-share-btn"
          aria-haspopup="true"
          onClick={handleCopyUrlClick}
          variant="contained"
          disabled={loading}
          sx={{ mr: 1 }}
        >
          <Share />
        </Button>
        <Button
          aria-controls="date-reset-btn"
          aria-haspopup="true"
          onClick={() => {
            clearGlobalFilter();
          }}
          variant="contained"
          disabled={loading}
        >
          Reset Filters
        </Button>
      </Box>
    ),
    paginationDisplayMode: "pages",
    enableGrouping: isPivotTable,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableCellActions: isPivotTable,
    enableRowActions: isPivotTable,
    enableEditing: true,
    editDisplayMode: "cell",
    enableColumnResizing: true,
    enableColumnDragging: true,
    enableColumnOrdering: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      showGlobalFilter: true,
      globalFilter,
      density: "compact",
      isLoading: loading,
    },
    autoResetAll: true,
  });

  useEffect(() => {
    if (!onFilteredRowChange) return;
    onFilteredRowChange(table.getFilteredRowModel().rows);
  }, [table.getFilteredRowModel().rows]);

  useEffect(() => {
    if (!onGroupingChange) return;
    onGroupingChange(table.getState().grouping);
  }, [table.getState().grouping]);

  return <MaterialReactTable table={table} />;
};
