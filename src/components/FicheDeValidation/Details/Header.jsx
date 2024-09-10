import * as React from "react";
import Box from "@mui/material/Box";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PendingIcon from "@mui/icons-material/Pending";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloseIcon from "@mui/icons-material/Close";
import { getUserRole } from "../../../services/userService";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function Header({ prestation, statusCp, handleClickInfo ,handleClickModify }) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        width: "100%",
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
          <Typography variant="h2">{prestation}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px",
          }}
        >
          {statusCp === null ? (
            <PendingIcon
              sx={{ color: theme.Other.pending.main, fontSize: "40px" }}
            />
          ) : statusCp === true ? (
            <VerifiedIcon
              sx={{ color: theme.Other.success.main, fontSize: "40px" }}
            />
          ) : (
            <CloseIcon
              sx={{ color: theme.Other.error.main, fontSize: "40px" }}
            />
          )}
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
          {getUserRole() === "RQ" && (
            <IconButton onClick={handleClickModify}>
              <EditNoteIcon
                sx={{ color: `${theme.palette.info.main}`, fontSize: "40px" }}
              />
            </IconButton>
          )}
          <IconButton onClick={handleClickInfo}>
            <InfoIcon
              sx={{ color: `${theme.palette.info.main}`, fontSize: "40px" }}
            />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
