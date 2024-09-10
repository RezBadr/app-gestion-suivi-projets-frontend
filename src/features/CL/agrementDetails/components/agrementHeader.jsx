import * as React from "react";
import Box from "@mui/material/Box";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingIcon from "@mui/icons-material/Pending";
import { downloadFile } from "../service/index";
import {formatName} from '../../../../utils/utils'


export default function AgrementHeader({
  title,
  statusCp,
  handleClickModifyButton,
  agrementId,
}) {
  const theme = useTheme();
  const handleDownloadClick = () => {
    downloadFile(agrementId);
  };

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
          flex: "1 0 0", // Flex-grow to use available space
          justifyContent: "flex-start", // Align items to the start
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
          <Typography variant="h2">{formatName(`${title}`,20)}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px",
          }}
        >
          {statusCp == null ? (
            <PendingIcon
              sx={{ color: theme.Other.pending.main, fontSize: "40px" }}
            />
          ) : statusCp == true ? (
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

      {/* Box au dernier */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Align items to the end
          flex: "0 0 auto", // Prevent flex-grow
        }}
      >
        <Stack direction="row" spacing={2}>
          <IconButton>
            <ArrowDownwardIcon
              onClick={handleDownloadClick}
              sx={{ color: `${theme.palette.info.main}`, fontSize: "40px" }}
            />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
