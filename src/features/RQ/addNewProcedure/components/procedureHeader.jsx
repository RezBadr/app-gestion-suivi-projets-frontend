import * as React from "react";
import Box from "@mui/material/Box";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import IconButton from "@mui/material/IconButton";

export default function ProcedureHeader({title, setAddProcedureFormOpen }) {
  const theme = useTheme();
  const handleAddClick = () => {
    setAddProcedureFormOpen(true);
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        // width : '100%'
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flex: "1 0 0",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px",
          }}
        >
          <InsertDriveFileIcon sx={{ color: "#201E43", fontSize: "40px" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="h2">{title}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flex: "0 0 auto",
        }}
      >
        <Stack direction="row" spacing={2}>
          <IconButton onClick={handleAddClick}>
            <NoteAddRoundedIcon
              sx={{ color: `${theme.palette.info.main}`, fontSize: "40px" }}
            />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
