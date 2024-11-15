import { useMemo } from "react";
import { useAsync } from "react-use";
import DataTableAPI from "../features/DataTable/services/DataTableAPI";
import Papa from "papaparse";
import { preparedColumns } from "../features/DataTable/constants";
import { DateTime } from "luxon";

export const useParsedCoogleSheetData = () => {
  const {
    value: csvText,
    error,
    loading,
  } = useAsync(async () => {
    const csvData = await DataTableAPI.fetchGoogleSheetData();
    return csvData;
  }, []);

  const parsedCoogleSheetData = useMemo(() => {
    if (!csvText) return [];

    const parsedCoogleSheetData: any[] = [];
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        parsedCoogleSheetData.push(...result.data); // Append the parsed data to the array
      },
    });
    return parsedCoogleSheetData.map((dataItem: any) => ({
      ...dataItem,
      created_dt: DateTime.fromJSDate(new Date(dataItem.created_dt)).toFormat(
        "dd LLL, yyyy hh:MM a"
      ),
      data_source_modified_dt: DateTime.fromJSDate(
        new Date(dataItem.data_source_modified_dt)
      ).toFormat("dd LLL, yyyy hh:MM a"),
      date_week:
        "Week " +
        DateTime.fromJSDate(new Date(dataItem.created_dt)).toFormat(`W`) +
        ` (${DateTime.fromJSDate(new Date(dataItem.created_dt))
          .startOf("week")
          .toFormat("d MMM, yyyy")} - ${DateTime.fromJSDate(
          new Date(dataItem.created_dt)
        )
          .endOf("week")
          .toFormat("d MMM, yyyy")})`,
      date_month: DateTime.fromJSDate(new Date(dataItem.created_dt)).toFormat(
        "LLLL"
      ),
      date_year: DateTime.fromJSDate(new Date(dataItem.created_dt)).toFormat(
        "yyyy"
      ),
    }));
  }, [csvText]);

  const columns = useMemo(() => {
    if (!parsedCoogleSheetData.length) return preparedColumns;

    return Object.keys(parsedCoogleSheetData[0]).map((key) => ({
      header: key.replace(/_/g, " ").toUpperCase(),
      enableColumnOrdering: true,
      accessorKey: key,
      muiEditTextFieldProps: () => ({
        type: ["created_dt", "data_source_modified_dt"].includes(key)
          ? "date"
          : "text",
      }),
    }));
  }, [parsedCoogleSheetData]);

  return { parsedCoogleSheetData, columns, loading, error };
};
