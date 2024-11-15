import axios from "axios";

const SPREADSHEET_ID = "1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE"; // Replace with your actual sheet ID
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv`;

const DataTableAPI = {
  fetchGoogleSheetData: async (): Promise<string> => {
    const response = await axios.get(CSV_URL, { responseType: "text" });
    return response.data;
  },
};

export default DataTableAPI;
