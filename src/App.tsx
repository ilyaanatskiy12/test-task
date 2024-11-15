import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./ui/components/Navbar/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { DataTablePage } from "./features/DataTable/pages/DataTablePage";
import { PivotTablePage } from "./features/PivotTable/pages/PivotTablePage";

function App() {
  return (
    <Router>
      <Navbar />
      <CssBaseline />
      <Routes>
        <Route path="/" element={<DataTablePage />} />
        <Route path="/pivot-table" element={<PivotTablePage />} />
      </Routes>
    </Router>
  );
}

export default App;
