import { Box } from "@mui/material";
import React from "react";

function DataBox({ heading, data, color ='#000', height = "5rem" }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: height,
        borderRadius: "0.5rem",
        paddingX: "1rem",
        marginRight: "1rem",
        marginTop: "1rem",
        boxShadow: '0px 4px 6px -2px #00000008, 0px 12px 16px -4px #00000014',
        background: '#fff'
      }}
    >
      <Box sx={{ fontSize: "0.8rem", marginTop: "0.7rem" }}>{heading}</Box>
      <Box sx={{ fontSize: "1.25rem", marginTop: "0.9rem", fontWeight: "500", color:color }}>
        {data}
      </Box>
    </Box>
  );
}

export default DataBox;
