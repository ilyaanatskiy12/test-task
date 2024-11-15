import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: grey[300] }}>
        <Toolbar variant="dense" sx={{ justifyContent: "center" }}>
          <div>
            <Link to="/">
              <Button sx={{ mr: 2 }} variant="outlined">
                Data Table
              </Button>
            </Link>
            <Link to="/pivot-table" style={{ textDecoration: "none" }}>
              <Button variant="outlined">Pivot Table</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
